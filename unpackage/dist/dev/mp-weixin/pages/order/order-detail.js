"use strict";
const common_vendor = require("../../common/vendor.js");
const common_pay = require("../../common/pay.js");
const Popup = () => "../../components/uni-popup.js";
const Mpservice = () => "../../components/mpservice/Mpservice.js";
const _sfc_main = {
  data() {
    return {
      /*是否加载完成*/
      loadding: true,
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      /*是否显示支付类别弹窗*/
      isPayPopup: false,
      /*订单id*/
      order_id: 0,
      /*订单详情*/
      detail: {
        order_status: [],
        address: {
          region: []
        },
        product: [],
        pay_type: [],
        delivery_type: [],
        pay_status: []
      },
      extractStore: {},
      source: "user",
      service_open: 0,
      service_type: 10,
      isMpservice: false,
      /*是否显示支付宝支付，只有在h5，非微信内打开才显示*/
      showAlipay: false,
      user_id: 0,
      expressList: [],
      express_id: "",
      express_name: "",
      express_no: "",
      status: 1,
      cancel_refuse: "",
      pay_type: 10,
      mch_id: ""
    };
  },
  components: {
    Popup,
    Mpservice
  },
  onLoad(e) {
    this.order_id = e.order_id;
    this.user_id = common_vendor.index.getStorageSync("user_id");
    if (e.source) {
      this.source = e.source;
    }
  },
  mounted() {
    common_vendor.index.showLoading({
      title: "加载中"
    });
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      let order_id = self.order_id;
      let url = "user.order/detail";
      if (this.source == "supplier") {
        url = "supplier.order/detail";
      }
      self.loadding = true;
      self._get(
        url,
        {
          order_id,
          pay_source: self.getPlatform()
        },
        function(res) {
          self.expressList = res.data.expressList;
          self.detail = res.data.order;
          self.extractStore = res.data.order.extractStore;
          self.service_open = res.data.setting.service_open;
          if (res.data.setting.mp_service == null) {
            self.service_type = 10;
          } else {
            self.service_type = res.data.setting.mp_service.service_type;
          }
          if (res.data.show_alipay) {
            self.showAlipay = true;
          }
          self.mch_id = res.data.mch_id;
          self.loadding = false;
          common_vendor.index.hideLoading();
        }
      );
    },
    /*显示支付方式*/
    hidePopupFunc() {
      this.isPayPopup = false;
    },
    /*取消订单*/
    cancelOrder(e) {
      let self = this;
      let order_id = e;
      common_vendor.wx$1.showModal({
        title: "提示",
        content: "您确定要取消当前订单吗?",
        success: function(o) {
          if (o.confirm) {
            common_vendor.index.showLoading({
              title: "正在处理"
            });
            self._get(
              "user.order/cancel",
              {
                order_id
              },
              function(res) {
                common_vendor.index.hideLoading();
                common_vendor.index.showToast({
                  title: "操作成功",
                  duration: 2e3,
                  icon: "success"
                });
                self.getData();
              }
            );
          }
        }
      });
    },
    /*确认收货*/
    orderReceipt(order_id) {
      let self = this;
      common_vendor.wx$1.showModal({
        title: "提示",
        content: "您确定要收货吗?",
        success: function(o) {
          if (o.confirm) {
            common_vendor.index.showLoading({
              title: "正在处理"
            });
            self._post(
              "user.order/receipt",
              {
                order_id
              },
              function(res) {
                common_vendor.index.hideLoading();
                common_vendor.index.showToast({
                  title: res.msg,
                  duration: 2e3,
                  icon: "success"
                });
                self.getData();
              }
            );
          }
        }
      });
    },
    wxOrder(item) {
      let self = this;
      if (common_vendor.wx$1.openBusinessView) {
        common_vendor.wx$1.openBusinessView({
          businessType: "weappOrderConfirm",
          extraData: {
            merchant_id: self.mch_id,
            merchant_trade_no: item.trade_no,
            transaction_id: item.transaction_id
          },
          success() {
            self._post(
              "user.order/receipt",
              {
                order_id: item.order_id
              },
              function(res) {
                common_vendor.index.showToast({
                  title: res.msg,
                  duration: 2e3,
                  icon: "success"
                });
                self.listData = [];
                self.getData();
              }
            );
          },
          fail() {
          },
          complete() {
          }
        });
      }
    },
    /*查看物流*/
    gotoExpress(order_id) {
      this.gotoPage("/pages/order/express/express?order_id=" + order_id);
    },
    /*申请售后*/
    onApplyRefund(e) {
      this.gotoPage("/pages/order/refund/apply/apply?order_product_id=" + e);
    },
    /*去支付*/
    payTypeFunc(payType) {
      let self = this;
      let order_id = self.order_id;
      self.isPayPopup = false;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._post(
        "user.order/pay",
        {
          payType,
          order_id,
          pay_source: self.getPlatform()
        },
        function(res) {
          common_vendor.index.hideLoading();
          common_pay.pay(res, self);
        }
      );
    },
    /*支付方式选择*/
    onPayOrder(orderId) {
      let self = this;
      self.gotoPage("/pages/order/cashier?order_type=1&order_id=" + orderId);
    },
    gotoProduct(item) {
      this.gotoPage("/pages/product/detail/detail?product_id=" + item.product_id);
    },
    tochat() {
      if (this.service_type == 10) {
        this.isMpservice = true;
      }
      if (this.service_type == 20) {
        this.gotoPage("/pagesPlus/chat/chat?user_id=" + this.detail.supplier.supplier_user_id + "&shop_supplier_id=" + this.detail.supplier.shop_supplier_id + "&nickName=" + this.detail.supplier.name + "&order_id=" + this.order_id);
      }
    },
    changeRadio(e) {
      this.status = e.detail.value;
    },
    Cancel() {
      let self = this;
      common_vendor.wx$1.showModal({
        title: "提示",
        content: "您确定审核吗?",
        success: function(o) {
          if (o.confirm) {
            common_vendor.index.showLoading({
              title: "正在处理"
            });
            self._post(
              "supplier.order/confirmCancel",
              {
                order_id: self.detail.order_id,
                is_cancel: self.status,
                cancel_refuse: self.cancel_refuse
              },
              function(res) {
                common_vendor.index.hideLoading();
                self.showSuccess(res.msg);
                self.getData();
              }
            );
          }
        }
      });
    },
    changeSelect(e) {
      console.log(e);
      this.express_name = this.expressList[e.detail.value].express_name;
      this.express_id = this.expressList[e.detail.value].express_id;
    },
    sendPro() {
      let self = this;
      common_vendor.wx$1.showModal({
        title: "提示",
        content: "您确定要发货吗?",
        success: function(o) {
          if (o.confirm) {
            common_vendor.index.showLoading({
              title: "正在处理"
            });
            self._post(
              "supplier.order/delivery",
              {
                order_id: self.detail.order_id,
                express_id: self.express_id,
                express_no: self.express_no
              },
              function(res) {
                common_vendor.index.hideLoading();
                self.showSuccess(res.msg);
                self.getData();
              }
            );
          }
        }
      });
    }
  }
};
if (!Array) {
  const _component_Mpservice = common_vendor.resolveComponent("Mpservice");
  _component_Mpservice();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loadding
  }, !$data.loadding ? common_vendor.e({
    b: $data.detail.state_text == "已付款，待发货"
  }, $data.detail.state_text == "已付款，待发货" ? {} : {}, {
    c: $data.detail.state_text == "待付款"
  }, $data.detail.state_text == "待付款" ? {} : {}, {
    d: $data.detail.state_text == "已发货，待收货"
  }, $data.detail.state_text == "已发货，待收货" ? {} : {}, {
    e: $data.detail.state_text == "已完成"
  }, $data.detail.state_text == "已完成" ? {} : {}, {
    f: $data.detail.state_text == "已取消"
  }, $data.detail.state_text == "已取消" ? {} : {}, {
    g: common_vendor.t($data.detail.state_text),
    h: $data.detail.pay_status.value == 10
  }, $data.detail.pay_status.value == 10 ? {
    i: common_vendor.t($data.detail.pay_price)
  } : {}, {
    j: $data.detail.pay_end_time
  }, $data.detail.pay_end_time ? {
    k: common_vendor.t($data.detail.pay_end_time)
  } : {}, {
    l: $data.detail.delivery_type.value == 10
  }, $data.detail.delivery_type.value == 10 ? {
    m: common_vendor.t($data.detail.address.name),
    n: common_vendor.t($data.detail.address.phone),
    o: common_vendor.t($data.detail.address.region.province),
    p: common_vendor.t($data.detail.address.region.city),
    q: common_vendor.t($data.detail.address.region.region),
    r: common_vendor.t($data.detail.address.detail)
  } : {}, {
    s: $data.detail.delivery_type.value == 20
  }, $data.detail.delivery_type.value == 20 ? {
    t: common_vendor.t($data.extractStore.store_name),
    v: common_vendor.t($data.extractStore.phone),
    w: common_vendor.t($data.extractStore.region.province),
    x: common_vendor.t($data.extractStore.region.city),
    y: common_vendor.t($data.extractStore.region.region),
    z: common_vendor.t($data.extractStore.address)
  } : {}, {
    A: $data.detail.delivery_type.value == 10 && $data.detail.delivery_status.value == 20
  }, $data.detail.delivery_type.value == 10 && $data.detail.delivery_status.value == 20 ? {
    B: common_vendor.t($data.detail.express.express_name),
    C: common_vendor.t($data.detail.express_no),
    D: common_vendor.o(($event) => $options.gotoExpress($data.detail.order_id))
  } : {}, {
    E: common_vendor.t($data.detail.supplier.name),
    F: common_vendor.o(($event) => _ctx.gotoPage("/pages/shop/shop?shop_supplier_id=" + $data.detail.supplier.shop_supplier_id)),
    G: common_vendor.f($data.detail.product, (item, index, i0) => {
      return common_vendor.e({
        a: item.image.file_path,
        b: common_vendor.t(item.product_name),
        c: item.spec_type == 20
      }, item.spec_type == 20 ? {
        d: common_vendor.t(item.product_attr)
      } : {}, {
        e: common_vendor.t(item.product_price),
        f: common_vendor.t(item.total_num),
        g: item.is_user_grade == true
      }, item.is_user_grade == true ? {
        h: common_vendor.t(item.grade_product_price)
      } : {}, $data.source == "user" ? common_vendor.e({
        i: item.refund
      }, item.refund ? {} : $data.detail.isAllowRefund ? {
        k: common_vendor.o(($event) => $options.onApplyRefund(item.order_product_id), index)
      } : {}, {
        j: $data.detail.isAllowRefund
      }) : {}, {
        l: index
      });
    }),
    H: $data.source == "user",
    I: common_vendor.t($data.detail.order_no),
    J: common_vendor.t($data.detail.create_time),
    K: common_vendor.t($data.detail.pay_type.text),
    L: common_vendor.t($data.detail.delivery_type.text),
    M: $data.detail.delivery_type.value == 30 && $data.detail.order_status.value == 30 && $data.detail.virtual_content != ""
  }, $data.detail.delivery_type.value == 30 && $data.detail.order_status.value == 30 && $data.detail.virtual_content != "" ? {
    N: common_vendor.t($data.detail.virtual_content)
  } : {}, {
    O: common_vendor.t($data.detail.buyer_remark),
    P: $data.detail.order_status.value == 20 && $data.detail.cancel_remark != ""
  }, $data.detail.order_status.value == 20 && $data.detail.cancel_remark != "" ? {
    Q: common_vendor.t($data.detail.cancel_remark)
  } : {}, {
    R: $data.detail.order_source != 70
  }, $data.detail.order_source != 70 ? {
    S: common_vendor.t($data.detail.total_price)
  } : {}, {
    T: $data.detail.order_source == 70
  }, $data.detail.order_source == 70 ? {
    U: common_vendor.t($data.detail.advance.pay_price)
  } : {}, {
    V: $data.detail.pay_price && $data.detail.order_source == 70
  }, $data.detail.pay_price && $data.detail.order_source == 70 ? {
    W: common_vendor.t($data.detail.total_price)
  } : {}, {
    X: $data.detail.advance && $data.detail.advance.reduce_money > 0
  }, $data.detail.advance && $data.detail.advance.reduce_money > 0 ? {
    Y: common_vendor.t($data.detail.advance.reduce_money)
  } : {}, {
    Z: common_vendor.t($data.detail.express_price),
    aa: $data.detail.product_reduce_money > 0
  }, $data.detail.product_reduce_money > 0 ? {
    ab: common_vendor.t($data.detail.product_reduce_money)
  } : {}, {
    ac: $data.detail.points_money > 0
  }, $data.detail.points_money > 0 ? {
    ad: common_vendor.t(_ctx.points_name()),
    ae: common_vendor.t($data.detail.points_money)
  } : {}, {
    af: $data.detail.coupon_money > 0
  }, $data.detail.coupon_money > 0 ? {
    ag: common_vendor.t($data.detail.coupon_money)
  } : {}, {
    ah: $data.detail.coupon_money_sys > 0
  }, $data.detail.coupon_money_sys > 0 ? {
    ai: common_vendor.t($data.detail.coupon_money_sys)
  } : {}, {
    aj: $data.detail.fullreduce_money > 0
  }, $data.detail.fullreduce_money > 0 ? {
    ak: common_vendor.t($data.detail.fullreduce_money)
  } : {}, {
    al: $data.detail.order_source == 70
  }, $data.detail.order_source == 70 ? {
    am: common_vendor.t(($data.detail.pay_price * 1 + $data.detail.advance.pay_price * 1).toFixed(2))
  } : {
    an: common_vendor.t($data.detail.pay_price)
  }, {
    ao: $data.detail.pay_status.value == 20 && $data.detail.delivery_type.value == 10 && $data.detail.order_status.value == 10 && $data.detail.delivery_status.value == 10 && $data.source == "supplier"
  }, $data.detail.pay_status.value == 20 && $data.detail.delivery_type.value == 10 && $data.detail.order_status.value == 10 && $data.detail.delivery_status.value == 10 && $data.source == "supplier" ? {
    ap: common_vendor.t($data.express_name || "请选择"),
    aq: common_vendor.o(($event) => $options.changeSelect($event)),
    ar: $data.expressList,
    as: $data.express_no,
    at: common_vendor.o(($event) => $data.express_no = $event.detail.value),
    av: common_vendor.o((...args) => $options.sendPro && $options.sendPro(...args))
  } : {}, {
    aw: $data.detail.pay_status.value == 20 && $data.detail.order_status.value == 21 && $data.source == "supplier"
  }, $data.detail.pay_status.value == 20 && $data.detail.order_status.value == 21 && $data.source == "supplier" ? common_vendor.e({
    ax: $data.status == 1,
    ay: $data.status == 0,
    az: common_vendor.o(($event) => $options.changeRadio($event)),
    aA: $data.status == 0
  }, $data.status == 0 ? {
    aB: $data.cancel_refuse,
    aC: common_vendor.o(($event) => $data.cancel_refuse = $event.detail.value)
  } : {}, {
    aD: common_vendor.o((...args) => $options.Cancel && $options.Cancel(...args))
  }) : {}, {
    aE: $data.detail.order_source != 70
  }, $data.detail.order_source != 70 ? common_vendor.e({
    aF: $data.detail.order_status.value != 20 && $data.detail.order_status.value != 30 && $data.source == "user"
  }, $data.detail.order_status.value != 20 && $data.detail.order_status.value != 30 && $data.source == "user" ? common_vendor.e({
    aG: $data.detail.pay_status.value == 10
  }, $data.detail.pay_status.value == 10 ? {
    aH: common_vendor.o(($event) => $options.cancelOrder($data.detail.order_id))
  } : {}, {
    aI: $data.detail.order_status.value != 21
  }, $data.detail.order_status.value != 21 ? common_vendor.e({
    aJ: $data.detail.pay_status.value == 20 && $data.detail.delivery_status.value == 10
  }, $data.detail.pay_status.value == 20 && $data.detail.delivery_status.value == 10 ? {
    aK: common_vendor.o(($event) => $options.cancelOrder($data.detail.order_id))
  } : {}) : {}, {
    aL: $data.detail.pay_status.value == 10
  }, $data.detail.pay_status.value == 10 ? common_vendor.e({
    aM: $data.detail.pay_status.value == 10
  }, $data.detail.pay_status.value == 10 ? {
    aN: common_vendor.o(($event) => $options.onPayOrder($data.detail.order_id))
  } : {}) : {}, {
    aO: $data.detail.delivery_status.value == 20 && $data.detail.receipt_status.value == 10
  }, $data.detail.delivery_status.value == 20 && $data.detail.receipt_status.value == 10 ? common_vendor.e({
    aP: $data.detail.pay_type.value == 20 && $data.detail.pay_source == "wx"
  }, $data.detail.pay_type.value == 20 && $data.detail.pay_source == "wx" ? {
    aQ: common_vendor.o(($event) => $options.wxOrder($data.detail))
  } : {
    aR: common_vendor.o(($event) => $options.orderReceipt($data.detail.order_id))
  }) : {}) : {}) : {}, {
    aS: $data.isMpservice
  }, $data.isMpservice ? {
    aT: common_vendor.o(_ctx.closeMpservice),
    aU: common_vendor.p({
      isMpservice: $data.isMpservice,
      shopSupplierId: $data.detail.supplier.shop_supplier_id
    })
  } : {}, {
    aV: _ctx.theme(),
    aW: common_vendor.n("order-datail pb100 " + _ctx.theme())
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-820f0a18"], ["__file", "D:/workspace/p/nc/nc_app/pages/order/order-detail.vue"]]);
wx.createPage(MiniProgramPage);
