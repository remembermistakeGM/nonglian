"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_utils = require("../../../common/utils.js");
const countdown = () => "../../../components/countdown/countdown.js";
const Mpservice = () => "../../../components/mpservice/Mpservice.js";
const Spec = () => "./popup/Spec.js";
const Rule = () => "./popup/Rule.js";
const guarantee = () => "../../../components/guarantee.js";
const _sfc_main = {
  components: {
    Spec,
    Rule,
    countdown,
    Mpservice,
    guarantee
  },
  data() {
    return {
      /*手机高度*/
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      /*是否加载完成*/
      loadding: true,
      /*是否显示面板指示点*/
      indicatorDots: true,
      /*是否知道切换*/
      autoplay: true,
      /*自动切换时间间隔*/
      interval: 2e3,
      /*滑动动画时长*/
      duration: 500,
      /*倒计时配置*/
      countdownConfig: {
        title: "",
        /*开始时间*/
        startstamp: 0,
        /*结束时间*/
        endstamp: 0
      },
      /*详情*/
      detail: {
        product_sku: {},
        show_sku: {
          product_price: "",
          product_sku_id: 0,
          line_price: "",
          stock_num: 0,
          sku_image: ""
        },
        show_point_sku: {}
      },
      alreadyChioce: "",
      /*活动设置*/
      setting: {},
      /*是否确定购买弹窗*/
      isPopup: false,
      /*商品属性*/
      specData: null,
      /*子级页面传参*/
      productModel: {},
      /*规格数组*/
      productSpecArr: [],
      /*是否显示规则*/
      isRule: false,
      /*商品规格*/
      productSku: [],
      /*是否打开客服*/
      isMpservice: false,
      serverList: "",
      //保障
      isguarantee: false,
      shop_info: {},
      store_open: 1,
      service_type: 0
    };
  },
  onLoad(e) {
    common_vendor.index.showLoading({
      title: "加载中"
    });
    this.type_active = 0;
    this.bargain_product_id = e.bargain_product_id;
  },
  mounted() {
    this.init();
    this.getData();
  },
  methods: {
    /*初始化*/
    init() {
      let _this = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          _this.phoneHeight = res.windowHeight;
          let view = common_vendor.index.createSelectorQuery().select(".btns-wrap");
          view.boundingClientRect((data) => {
            let h = _this.phoneHeight - data.height;
            _this.scrollviewHigh = h;
          }).exec();
        }
      });
    },
    /*获取数据*/
    getData() {
      let self = this;
      let bargain_product_id = self.bargain_product_id;
      self._get(
        "plus.bargain.product/detail",
        {
          bargain_product_id,
          url: ""
        },
        function(res) {
          if (res.data.mp_service == null) {
            self.service_type = 10;
          } else {
            self.service_type = res.data.mp_service.service_type;
          }
          self.countdownConfig.startstamp = res.data.active.start_time;
          self.countdownConfig.endstamp = res.data.active.end_time;
          res.data.detail.product.content = common_utils.utils.format_content(res.data.detail.product.content);
          if (res.data.detail.product.spec_type == 20) {
            self.initSpecData(res.data.detail.bargainSku, res.data.specData);
          }
          self.store_open = res.data.store_open;
          self.setting = res.data.setting;
          self.detail = res.data.detail;
          self.shop_info = res.data.detail.supplier;
          self.getServer();
          self.loadding = false;
          common_vendor.index.hideLoading();
        }
      );
    },
    confirm() {
      this.$refs.countdown.clear();
    },
    getServer() {
      let self = this;
      let serverList = [];
      if (self.detail.server) {
        self.detail.server.forEach((item, index) => {
          serverList.push(item.name);
        });
        self.serverList = serverList.join("·");
      }
    },
    closeGuarantee() {
      this.isguarantee = false;
    },
    showGuarantee() {
      this.isguarantee = true;
    },
    /*多规格商品*/
    initSpecData(list, data) {
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        if (item.productSku) {
          let arr = item.productSku.spec_sku_id.split("_").map(Number);
          this.productSku.push(arr);
        }
      }
      for (let i in data.spec_attr) {
        for (let j = 0; j < data.spec_attr[i].spec_items.length; j++) {
          let item = data.spec_attr[i].spec_items[j];
          if (this.hasSpec(item.item_id, i)) {
            item.checked = false;
            item.disabled = false;
          } else {
            data.spec_attr[i].spec_items.splice(j, 1);
            j--;
          }
        }
      }
      this.specData = data;
      if (this.specData.spec_attr) {
        this.specData.spec_attr.forEach((item) => {
          this.alreadyChioce += item.group_name;
          this.alreadyChioce += " / ";
        });
        this.alreadyChioce = this.alreadyChioce.replace(/(\s\/\s)$/gi, "");
      }
    },
    /*判断有没有规格*/
    hasSpec(id, _index) {
      let flag = false;
      for (let i = 0; i < this.productSku.length; i++) {
        let arr = this.productSku[i];
        if (arr[_index] == id) {
          flag = true;
          break;
        }
      }
      return flag;
    },
    openPopup(e) {
      let obj = {
        specData: this.specData,
        detail: this.detail,
        productSpecArr: this.specData != null ? new Array(this.specData.spec_attr.length) : [],
        show_sku: {
          sku_image: "",
          bargain_price: 0,
          product_sku_id: 0,
          line_price: 0,
          bargain_stock: 0,
          bargain_product_sku_id: 0,
          sum: 1
        },
        productSku: this.productSku,
        type: e
      };
      this.productModel = obj;
      this.isPopup = true;
    },
    /*关闭弹窗*/
    closePopup(e, cart_total_num) {
      this.isPopup = false;
      if (e && e.spec_attr) {
        this.alreadyChioce = "";
        let has = "已选：";
        let noone = "";
        e.spec_attr.forEach((item) => {
          if (item.spec_items) {
            let h = "";
            for (let i = 0; i < item.spec_items.length; i++) {
              let child = item.spec_items[i];
              if (child.checked) {
                h = child.spec_value + " / ";
                break;
              }
            }
            if (h != "") {
              has += h;
            } else {
              noone += item.group_name;
            }
          }
        });
        if (noone != "") {
          this.alreadyChioce = noone;
        } else {
          has = has.replace(/(\s\/\s)$/gi, "");
          this.alreadyChioce = has;
        }
      }
      if (cart_total_num) {
        this.cart_total_num = cart_total_num;
      }
    },
    /*打开客服*/
    openMaservice() {
      if (this.getUserId()) {
        if (this.service_type == 10) {
          this.isMpservice = true;
        }
        if (this.service_type == 20) {
          if (this.detail.chat_user_id && this.detail.chat_user_id != 0) {
            this.gotoPage(
              "/pagesPlus/chat/chat?chat_user_id=" + this.detail.chat_user_id + "&product_id=" + this.detail.product_id + "&shop_supplier_id=" + this.shop_info.shop_supplier_id + "&nickName=" + this.shop_info.name
            );
          } else {
            this.isMpservice = true;
          }
        }
      } else {
        this.doLogin();
      }
    },
    /*关闭客服*/
    closeMpservice() {
      this.isMpservice = false;
    },
    /*跳转商品详情页面*/
    gotoProducntDetail() {
      this.gotoPage("/pages/product/detail/detail?product_id=" + this.detail.product_id);
    },
    /*规则*/
    openRule() {
      this.isRule = true;
    },
    /*关闭规则*/
    closeRule() {
      this.isRule = false;
    },
    /*倒计时返回*/
    returnValFunc() {
    },
    //跳转店铺首页
    goto_shop() {
      let self = this;
      self.gotoPage("/pages/shop/shop?shop_supplier_id=" + self.detail.supplier.shop_supplier_id);
    }
  }
};
if (!Array) {
  const _easycom_countdown2 = common_vendor.resolveComponent("countdown");
  const _component_spec = common_vendor.resolveComponent("spec");
  const _component_Rule = common_vendor.resolveComponent("Rule");
  const _component_Mpservice = common_vendor.resolveComponent("Mpservice");
  const _component_guarantee = common_vendor.resolveComponent("guarantee");
  (_easycom_countdown2 + _component_spec + _component_Rule + _component_Mpservice + _component_guarantee)();
}
const _easycom_countdown = () => "../../../components/countdown/countdown.js";
if (!Math) {
  _easycom_countdown();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loadding
  }, !$data.loadding ? common_vendor.e({
    b: common_vendor.f($data.detail.product.image, (item, index, i0) => {
      return {
        a: item.file_path,
        b: index
      };
    }),
    c: $data.indicatorDots,
    d: $data.autoplay,
    e: $data.interval,
    f: $data.duration,
    g: common_vendor.t($data.detail.bargain_price),
    h: common_vendor.t($data.detail.line_price),
    i: common_vendor.t($data.detail.product.product_name),
    j: common_vendor.t($data.detail.product_sales),
    k: common_vendor.sr("countdown", "07a72c82-0"),
    l: common_vendor.o($options.returnValFunc),
    m: common_vendor.p({
      config: $data.countdownConfig
    }),
    n: common_vendor.o((...args) => $options.openRule && $options.openRule(...args)),
    o: $data.detail.spec_type == 20
  }, $data.detail.spec_type == 20 ? {
    p: common_vendor.t($data.alreadyChioce),
    q: common_vendor.n($data.detail.server != "" ? "border-b-d9" : ""),
    r: common_vendor.o(($event) => $options.openPopup("order"))
  } : {}, {
    s: $data.detail.server != ""
  }, $data.detail.server != "" ? {
    t: common_vendor.t($data.serverList),
    v: common_vendor.o((...args) => $options.showGuarantee && $options.showGuarantee(...args))
  } : {}, {
    w: $data.store_open
  }, $data.store_open ? {
    x: $data.shop_info.logos,
    y: common_vendor.t($data.shop_info.name),
    z: common_vendor.t($data.shop_info.category_name),
    A: common_vendor.t($data.shop_info.product_sales),
    B: common_vendor.t($data.shop_info.server_score),
    C: common_vendor.o(($event) => $options.goto_shop())
  } : {}, {
    D: $data.detail.product.is_picture == 0
  }, $data.detail.product.is_picture == 0 ? {
    E: $data.detail.product.content
  } : {}, {
    F: $data.detail.product.is_picture == 1
  }, $data.detail.product.is_picture == 1 ? {
    G: common_vendor.f($data.detail.product.contentImage, (item, index, i0) => {
      return {
        a: item.file_path,
        b: index
      };
    })
  } : {}, {
    H: common_vendor.s("height:" + $data.scrollviewHigh + "px;")
  }) : {}, {
    I: !$data.loadding
  }, !$data.loadding ? {
    J: common_vendor.o(($event) => _ctx.gotoPage("/pages/index/index")),
    K: common_vendor.o((...args) => $options.openMaservice && $options.openMaservice(...args)),
    L: common_vendor.t($data.detail.product.product_price),
    M: common_vendor.o(($event) => $options.gotoProducntDetail()),
    N: common_vendor.t($data.detail.bargain_price),
    O: common_vendor.o(($event) => $options.openPopup("order")),
    P: common_vendor.o(($event) => $options.openPopup("order"))
  } : {}, {
    Q: common_vendor.o($options.confirm),
    R: common_vendor.o($options.closePopup),
    S: common_vendor.p({
      isPopup: $data.isPopup,
      productModel: $data.productModel
    }),
    T: common_vendor.o($options.closeRule),
    U: common_vendor.p({
      isRule: $data.isRule,
      setting: $data.setting
    }),
    V: $data.isMpservice
  }, $data.isMpservice ? {
    W: common_vendor.o($options.closeMpservice),
    X: common_vendor.p({
      isMpservice: $data.isMpservice
    })
  } : {}, {
    Y: common_vendor.o($options.closeGuarantee),
    Z: common_vendor.p({
      isguarantee: $data.isguarantee,
      server: $data.detail.server
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/bargain/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
