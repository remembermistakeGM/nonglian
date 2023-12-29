"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_utils = require("../../../common/utils.js");
const Countdown = () => "../../../components/countdown/countdown.js";
const Mpservice = () => "../../../components/mpservice/Mpservice.js";
const MoreBill = () => "./popup/MoreBill.js";
const Spec = () => "./popup/Spec.js";
const Bill = () => "./part/Bill.js";
const guarantee = () => "../../../components/guarantee.js";
const _sfc_main = {
  components: {
    Spec,
    Countdown,
    Mpservice,
    Bill,
    MoreBill,
    guarantee
  },
  data() {
    return {
      from_type: 10,
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
      /*商品id*/
      product_id: null,
      /*产品图片展示*/
      imagList: [],
      /*活动详情*/
      activeDetail: {},
      alreadyChioce: "",
      /*详情*/
      detail: {
        product_sku: {},
        show_sku: {
          assemble_price: "",
          product_sku_id: 0,
          line_price: "",
          stock_num: 0,
          sku_image: "",
          assemble_product_sku_id: 0
        },
        show_point_sku: {}
      },
      /*已购买用户*/
      bill: [],
      /*是否确定购买弹窗*/
      isPopup: false,
      /*商品属性*/
      specData: null,
      /*子级页面传参*/
      productModel: {},
      /*拼团商品ID*/
      assemble_product_id: 0,
      /*倒计时配置*/
      countdownConfig: {
        /*开始时间*/
        startstamp: 0,
        /*结束时间*/
        endstamp: 0
      },
      /*是否打开客服*/
      isMpservice: false,
      /*是否打开更多*/
      ismore: false,
      /*拼团ID*/
      assemble_bill_id: null,
      /*当前用户id*/
      user_id: null,
      /*商品规格*/
      productSku: [],
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
    this.user_id = this.getUserId();
    this.assemble_product_id = e.assemble_product_id;
    this.assemble_bill_id = e.assemble_bill_id;
  },
  mounted() {
    this.init();
    this.getData();
  },
  onHide() {
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
            h = _this.phoneHeight;
            _this.scrollviewHigh = h;
          }).exec();
        }
      });
    },
    /*获取数据*/
    getData() {
      let self = this;
      self.loadding = true;
      self._get(
        "plus.assemble.product/detail",
        {
          assemble_product_id: self.assemble_product_id
        },
        function(res) {
          if (res.data.mp_service == null) {
            self.service_type = 10;
          } else {
            self.service_type = res.data.mp_service.service_type;
          }
          self.countdownConfig.startstamp = res.data.active.start_time;
          self.countdownConfig.endstamp = res.data.active.end_time;
          self.activeDetail = res.data.active;
          res.data.detail.product.content = common_utils.utils.format_content(res.data.detail.product.content);
          if (res.data.detail.product.spec_type == 20) {
            self.initSpecData(res.data.detail.assembleSku, res.data.specData);
          }
          self.store_open = res.data.store_open;
          self.detail = res.data.detail;
          self.shop_info = res.data.detail.supplier;
          self.bill = res.data.bill;
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
      if (this.activeDetail.is_single == 1 && e == "order" && this.bill.length == 0 || this.activeDetail.is_single == 0 && e == "order" || e != "order") {
        if (e == "order" && this.assemble_bill_id == null) {
          this.assemble_bill_id = 0;
        }
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
            assemble_bill_id: this.assemble_bill_id,
            sum: 1
          },
          productSku: this.productSku,
          type: e
        };
        this.productModel = obj;
        console.log("isPopup");
        this.isPopup = true;
      } else {
        console.log("ismore");
        this.ismore = true;
      }
    },
    confirm() {
      this.$refs.countdown.clear();
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
      this.$refs.countdown.clear();
      this.gotoPage("/pages/product/detail/detail?product_id=" + this.detail.product_id);
    },
    /*打开关闭更多*/
    openMoreFunc(e) {
      this.ismore = e;
    },
    closeGuarantee() {
      this.isguarantee = false;
    },
    showGuarantee() {
      this.isguarantee = true;
    },
    /*去拼团*/
    gobillFunc(e) {
      this.$refs.countdown.clear();
      this.ismore = false;
      for (let i = 0; i < e.billUser.length; i++) {
        let user = e.billUser[i];
        if (this.user_id === user.user_id) {
          this.gotoPage("/pagesPlus/assemble/fight-group-detail/fight-group-detail?assemble_bill_id=" + e.assemble_bill_id);
          return;
        }
      }
      this.assemble_bill_id = e.assemble_bill_id;
      this.openPopup();
    },
    /*倒计时返回值*/
    returnValFunc(e) {
    },
    //跳转店铺首页
    goto_shop() {
      let self = this;
      self.gotoPage("/pages/shop/shop?shop_supplier_id=" + self.detail.supplier.shop_supplier_id);
    }
  },
  destroyed() {
  }
};
if (!Array) {
  const _component_Countdown = common_vendor.resolveComponent("Countdown");
  const _component_Bill = common_vendor.resolveComponent("Bill");
  const _component_spec = common_vendor.resolveComponent("spec");
  const _component_Mpservice = common_vendor.resolveComponent("Mpservice");
  const _component_guarantee = common_vendor.resolveComponent("guarantee");
  const _component_MoreBill = common_vendor.resolveComponent("MoreBill");
  (_component_Countdown + _component_Bill + _component_spec + _component_Mpservice + _component_guarantee + _component_MoreBill)();
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
    g: common_vendor.sr("countdown", "77d71e16-0"),
    h: common_vendor.o($options.returnValFunc),
    i: common_vendor.p({
      config: $data.countdownConfig
    }),
    j: common_vendor.t($data.detail.assemble_price),
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
    x: common_vendor.o($options.openMoreFunc),
    y: common_vendor.o($options.gobillFunc),
    z: common_vendor.p({
      bill: $data.bill
    }),
    A: $data.store_open
  }, $data.store_open ? {
    B: $data.shop_info.logos,
    C: common_vendor.t($data.shop_info.name),
    D: common_vendor.t($data.shop_info.category_name),
    E: common_vendor.t($data.shop_info.product_sales),
    F: common_vendor.t($data.shop_info.server_score),
    G: common_vendor.o(($event) => $options.goto_shop())
  } : {}, {
    H: $data.detail.product.is_picture == 0
  }, $data.detail.product.is_picture == 0 ? {
    I: $data.detail.product.content
  } : {}, {
    J: $data.detail.product.is_picture == 1
  }, $data.detail.product.is_picture == 1 ? {
    K: common_vendor.f($data.detail.product.contentImage, (item, index, i0) => {
      return {
        a: item.file_path,
        b: index
      };
    })
  } : {}, {
    L: common_vendor.s("height:" + $data.scrollviewHigh + "px;")
  }) : {}, {
    M: !$data.loadding
  }, !$data.loadding ? {
    N: common_vendor.o(($event) => _ctx.gotoPage("/pages/index/index")),
    O: common_vendor.o((...args) => $options.openMaservice && $options.openMaservice(...args)),
    P: common_vendor.t($data.detail.product.product_price),
    Q: common_vendor.o(($event) => $options.gotoProducntDetail()),
    R: common_vendor.t($data.detail.assemble_price),
    S: common_vendor.o(($event) => $options.openPopup("order"))
  } : {}, {
    T: common_vendor.o($options.confirm),
    U: common_vendor.o($options.closePopup),
    V: common_vendor.p({
      isPopup: $data.isPopup,
      productModel: $data.productModel
    }),
    W: $data.isMpservice
  }, $data.isMpservice ? {
    X: common_vendor.o($options.closeMpservice),
    Y: common_vendor.p({
      isMpservice: $data.isMpservice
    })
  } : {}, {
    Z: common_vendor.o($options.closeGuarantee),
    aa: common_vendor.p({
      isguarantee: $data.isguarantee,
      server: $data.detail.server
    }),
    ab: $data.ismore
  }, $data.ismore ? {
    ac: common_vendor.o($options.openMoreFunc),
    ad: common_vendor.o($options.gobillFunc),
    ae: common_vendor.p({
      bill: $data.bill,
      ismore: true
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/assemble/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
