"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_utils = require("../../../common/utils.js");
const Spec = () => "./popup/Spec.js";
const Countdown = () => "../../../components/countdown/countdown.js";
const Mpservice = () => "../../../components/mpservice/Mpservice.js";
const guarantee = () => "../../../components/guarantee.js";
const _sfc_main = {
  components: {
    /*选择规格*/
    Spec,
    /*倒计时组件*/
    Countdown,
    /*客服*/
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
      /*是否自动切换*/
      autoplay: true,
      /*自动切换时间间隔*/
      interval: 2e3,
      /*滑动动画时长*/
      duration: 500,
      /*秒杀商品id*/
      seckill_product_id: null,
      /*详情*/
      detail: {
        /*商品规格*/
        product_sku: {},
        /*当前规格对象*/
        show_sku: {
          /*秒杀价格*/
          seckill_price: "",
          /*商品规格ID*/
          product_sku_id: 0,
          /*划线价格*/
          line_price: "",
          /*库存数量*/
          stock_num: 0,
          /*商品规格图片*/
          sku_image: "",
          /*秒杀商品规格ID*/
          seckill_product_sku_id: 0
        },
        /*暂不知晓*/
        show_point_sku: {}
      },
      /*已经选择的规格*/
      alreadyChioce: "",
      /*是否确定购买弹窗*/
      isPopup: false,
      /*倒计时配置*/
      countdownConfig: {
        /*开始时间*/
        startstamp: 0,
        /*结束时间*/
        endstamp: 0
      },
      /*商品属性*/
      specData: null,
      /*子级页面传参*/
      productModel: {},
      /*商品规格*/
      productSku: [],
      /*是否打开客服*/
      isMpservice: false,
      /*购物车商品数量*/
      cart_total_num: 0,
      serverList: "",
      //保障
      isguarantee: false,
      shop_info: {},
      store_open: 1
    };
  },
  onLoad(e) {
    this.seckill_product_id = e.seckill_product_id;
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
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._get(
        "plus.seckill.product/detail",
        {
          seckill_product_id: self.seckill_product_id
        },
        function(res) {
          self.countdownConfig.endstamp = res.data.active.end_time;
          self.countdownConfig.startstamp = res.data.active.start_time;
          res.data.detail.product.content = common_utils.utils.format_content(res.data.detail.product.content);
          if (res.data.detail.product.spec_type == 20) {
            self.initSpecData(res.data.detail.seckillSku, res.data.specData);
          }
          self.store_open = res.data.store_open;
          self.detail = res.data.detail;
          self.shop_info = res.data.detail.supplier;
          self.getServer();
          self.loadding = false;
          common_vendor.index.hideLoading();
        }
      );
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
    /*打开窗口*/
    openPopup(e) {
      let obj = {
        specData: this.specData,
        detail: this.detail,
        productSpecArr: this.specData != null ? new Array(this.specData.spec_attr.length) : [],
        show_sku: {
          sku_image: "",
          seckill_price: 0,
          product_sku_id: 0,
          line_price: 0,
          seckill_stock: 0,
          seckill_product_sku_id: 0,
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
    confirm() {
      this.$refs.countdown.clear();
    },
    /*打开客服*/
    openMaservice() {
      this.isMpservice = true;
    },
    /*关闭客服*/
    closeMpservice() {
      this.isMpservice = false;
    },
    //跳转店铺首页
    goto_shop() {
      let self = this;
      self.gotoPage("/pages/shop/shop?shop_supplier_id=" + self.detail.supplier.shop_supplier_id);
    },
    /*倒计时返回状态*/
    returnValFunc(e) {
    }
  }
};
if (!Array) {
  const _component_Countdown = common_vendor.resolveComponent("Countdown");
  const _component_spec = common_vendor.resolveComponent("spec");
  const _component_Mpservice = common_vendor.resolveComponent("Mpservice");
  const _component_guarantee = common_vendor.resolveComponent("guarantee");
  (_component_Countdown + _component_spec + _component_Mpservice + _component_guarantee)();
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
    g: common_vendor.sr("countdown", "1621c4c8-0"),
    h: common_vendor.o($options.returnValFunc),
    i: common_vendor.p({
      config: $data.countdownConfig
    }),
    j: common_vendor.t($data.detail.seckill_price),
    k: common_vendor.t("￥" + $data.detail.line_price),
    l: common_vendor.t($data.detail.product_sales),
    m: common_vendor.t($data.detail.product.product_name),
    n: $data.detail.product.selling_point
  }, $data.detail.product.selling_point ? {
    o: common_vendor.t($data.detail.product.selling_point)
  } : {}, {
    p: $data.detail.spec_type == 20
  }, $data.detail.spec_type == 20 ? {
    q: common_vendor.t($data.alreadyChioce),
    r: common_vendor.n($data.detail.server != "" ? "border-b-d9" : ""),
    s: common_vendor.o(($event) => $options.openPopup("order"))
  } : {}, {
    t: $data.detail.server != ""
  }, $data.detail.server != "" ? {
    v: common_vendor.t($data.serverList),
    w: common_vendor.o((...args) => $options.showGuarantee && $options.showGuarantee(...args))
  } : {}, {
    x: $data.store_open
  }, $data.store_open ? {
    y: $data.shop_info.logos,
    z: common_vendor.t($data.shop_info.name),
    A: common_vendor.t($data.shop_info.category_name),
    B: common_vendor.t($data.shop_info.product_sales),
    C: common_vendor.t($data.shop_info.server_score),
    D: common_vendor.o(($event) => $options.goto_shop())
  } : {}, {
    E: $data.detail.product.content,
    F: common_vendor.s("height:" + $data.scrollviewHigh + "px;")
  }) : {}, {
    G: common_vendor.o(($event) => _ctx.gotoPage("/pages/index/index")),
    H: common_vendor.o(($event) => $options.openPopup("order")),
    I: common_vendor.o($options.confirm),
    J: common_vendor.o($options.closePopup),
    K: common_vendor.p({
      isPopup: $data.isPopup,
      productModel: $data.productModel
    }),
    L: $data.isMpservice
  }, $data.isMpservice ? {
    M: common_vendor.o($options.closeMpservice),
    N: common_vendor.p({
      isMpservice: $data.isMpservice
    })
  } : {}, {
    O: common_vendor.o($options.closeGuarantee),
    P: common_vendor.p({
      isguarantee: $data.isguarantee,
      server: $data.detail.server
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/seckill/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
