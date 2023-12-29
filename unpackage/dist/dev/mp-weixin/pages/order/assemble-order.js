"use strict";
const common_vendor = require("../../common/vendor.js");
const common_pay = require("../../common/pay.js");
const Popup = () => "../../components/uni-popup.js";
const uniLoadMore = () => "../../components/uni-load-more.js";
const _sfc_main = {
  components: {
    Popup,
    uniLoadMore
  },
  data() {
    return {
      /*手机高度*/
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      /*状态选中*/
      state_active: 0,
      /*顶部刷新*/
      topRefresh: false,
      /*数据*/
      listData: [],
      /*数据类别*/
      dataType: 10,
      /*是否显示支付类别弹窗*/
      isPayPopup: false,
      /*支付方式*/
      pay_type: 20,
      /*订单id*/
      order_id: 0,
      /*最后一页码数*/
      last_page: 0,
      /*当前页面*/
      page: 1,
      /*每页条数*/
      list_rows: 10,
      /*有没有等多*/
      no_more: false,
      /*是否正在加载*/
      loading: true,
      /*是否显示核销二维码*/
      isCodeImg: false,
      codeImg: "",
      /*是否显示支付宝支付，只有在h5，非微信内打开才显示*/
      showAlipay: false,
      isfirst: false
    };
  },
  computed: {
    /*加载中状态*/
    loadingType() {
      if (this.loading) {
        return 1;
      } else {
        if (this.listData.length != 0 && this.no_more) {
          return 2;
        } else {
          return 0;
        }
      }
    }
  },
  onLoad(e) {
    if (typeof e.dataType != "undefined") {
      this.dataType = e.dataType;
    }
    if (this.dataType == "payment") {
      this.state_active = 1;
    } else if (this.dataType == "received") {
      this.state_active = 3;
    } else if (this.dataType == "comment") {
      this.state_active = 4;
    } else if (this.dataType == "delivery") {
      this.state_active = 2;
    }
  },
  mounted() {
    this.init();
    this.initData();
    this.getData();
  },
  onShow() {
    if (this.isfirst) {
      this.initData();
      this.getData();
    }
  },
  methods: {
    initData() {
      let self = this;
      self.page = 1;
      self.listData = [];
      self.no_more = false;
    },
    cancelAdvance(e) {
      let self = this;
      let order_id = e;
      common_vendor.index.showModal({
        title: "提示",
        content: "您确定要取消吗?",
        success: function(o) {
          if (o.confirm) {
            common_vendor.index.showLoading({
              title: "正在处理"
            });
            self._get(
              "plus.advance.Order/cancelFront",
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
                self.listData = [];
                self.getData();
              }
            );
          }
        }
      });
    },
    depositPay(e) {
      this.gotoPage("/pages/order/confirm-order?order_type=retainage&order_id=" + e);
    },
    /*初始化*/
    init() {
      let self = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          self.phoneHeight = res.windowHeight;
          let view = common_vendor.index.createSelectorQuery().in(self).select(".top-tabbar");
          view.boundingClientRect((data) => {
            let h = self.phoneHeight - data.height;
            self.scrollviewHigh = h;
          }).exec();
        }
      });
    },
    /*状态切换*/
    stateFunc(e) {
      console.log(11111, e);
      let self = this;
      if (self.state_active != e) {
        self.page = 1;
        self.loading = true;
        self.state_active = e;
        switch (e) {
          case 0:
            self.listData = [];
            self.dataType = 10;
            break;
          case 1:
            self.listData = [];
            self.dataType = 20;
            break;
          case 2:
            self.listData = [];
            self.dataType = 30;
            break;
          case 3:
            self.listData = [];
            self.dataType = 40;
            break;
          case 4:
            self.listData = [];
            self.dataType = 50;
            break;
        }
        self.getData();
      }
    },
    /*可滚动视图区域到底触发*/
    scrolltolowerFunc() {
      let self = this;
      if (self.no_more) {
        return;
      }
      self.page++;
      if (self.page <= self.last_page) {
        self.getData();
      } else {
        self.no_more = true;
      }
    },
    /*获取数据*/
    getData() {
      let self = this;
      self.loading = true;
      let dataType = self.dataType;
      self._get(
        "user.Assemble/lists",
        {
          type: dataType,
          page: self.page,
          pay_source: self.getPlatform(),
          list_rows: self.list_rows
        },
        function(res) {
          self.loading = false;
          self.listData = self.listData.concat(res.data.list.data);
          self.last_page = res.data.list.last_page;
          if (res.data.list.last_page <= 1) {
            self.no_more = true;
          } else {
            self.no_more = false;
          }
          if (res.data.show_alipay) {
            self.showAlipay = true;
          }
          self.isfirst = true;
        }
      );
    },
    /*跳转页面*/
    gotoOrder(e) {
      this.gotoPage("/pages/order/order-detail?order_id=" + e);
    },
    /*隐藏支付方式*/
    hidePopupFunc() {
      this.isPayPopup = false;
    },
    toShop(id) {
      this.gotoPage("/pages/shop/shop?shop_supplier_id=" + id);
    },
    /*去支付*/
    payTypeFunc(payType) {
      let self = this;
      self.isPayPopup = false;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._post(
        "user.order/pay",
        {
          payType,
          order_id: self.order_id,
          pay_source: self.getPlatform()
        },
        function(res) {
          common_pay.pay(res, self);
        }
      );
    },
    /*支付方式选择*/
    onPayOrder(orderId) {
      let self = this;
      self.gotoPage("/pages/order/cashier?order_type=1&order_id=" + orderId);
    },
    /*确认收货*/
    orderReceipt(order_id) {
      let self = this;
      common_vendor.index.showModal({
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
                self.listData = [];
                self.getData();
              }
            );
          } else {
            common_vendor.index.showToast({
              title: "取消收货",
              duration: 1e3,
              icon: "none"
            });
          }
        }
      });
    },
    /*计算时分秒*/
    countDown(t) {
      let time = t - Date.now() / 1e3;
      let day = Math.floor(time / (60 * 60 * 24));
      let modulo = time % (60 * 60 * 24);
      let hour = Math.floor(modulo / (60 * 60));
      modulo = modulo % (60 * 60);
      let minute = Math.floor(modulo / 60);
      let second = modulo % 60;
      day = this.convertTwo(day);
      hour = this.convertTwo(hour);
      minute = this.convertTwo(minute);
      second = this.convertTwo(second);
      let text = parseInt(day) > 0 ? parseInt(day) + "天 " : "" + parseInt(hour) + "时" + parseInt(minute) + "分" + parseInt(second) + "秒";
      return text;
    },
    /*取消订单*/
    cancelOrder(e) {
      let self = this;
      let order_id = e;
      common_vendor.index.showModal({
        title: "提示",
        content: "您确定要取消吗?",
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
                self.listData = [];
                self.getData();
              }
            );
          }
        }
      });
    },
    /*去评论*/
    gotoEvaluate(e) {
      this.gotoPage("/pages/order/evaluate/evaluate?order_id=" + e);
    },
    /*核销码*/
    onQRCode(e) {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      let order_id = e;
      let source = self.getPlatform();
      self._get(
        "user.order/qrcode",
        {
          order_id,
          source
        },
        function(res) {
          common_vendor.index.hideLoading();
          self.isCodeImg = true;
          self.codeImg = res.data.qrcode;
        }
      );
    },
    nowOverTime(t) {
      let now = (/* @__PURE__ */ new Date()).getTime();
      let time = new Date(t * 1e3).getTime();
      return now >= time;
    },
    /*关闭核销二维码*/
    hideCodePopupFunc() {
      this.isCodeImg = false;
    },
    /*分享拼团*/
    gotoAssembleShare(e) {
      this.gotoPage("/pagesPlus/assemble/fight-group-detail/fight-group-detail?assemble_bill_id=" + e);
    }
  }
};
if (!Array) {
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  const _component_Popup = common_vendor.resolveComponent("Popup");
  (_component_uni_load_more + _component_Popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.n($data.state_active == 0 ? "tab-item active" : "tab-item"),
    b: common_vendor.o(($event) => $options.stateFunc(0)),
    c: common_vendor.n($data.state_active == 1 ? "tab-item active" : "tab-item"),
    d: common_vendor.o(($event) => $options.stateFunc(1)),
    e: common_vendor.n($data.state_active == 2 ? "tab-item active" : "tab-item"),
    f: common_vendor.o(($event) => $options.stateFunc(2)),
    g: common_vendor.n($data.state_active == 3 ? "tab-item active" : "tab-item"),
    h: common_vendor.o(($event) => $options.stateFunc(3)),
    i: common_vendor.n($data.state_active == 4 ? "tab-item active" : "tab-item"),
    j: common_vendor.o(($event) => $options.stateFunc(4)),
    k: common_vendor.f(3, (circle, n, i0) => {
      return {
        a: n
      };
    }),
    l: common_vendor.n($data.topRefresh ? "top-refresh open" : "top-refresh"),
    m: common_vendor.f($data.listData, (item, index, i0) => {
      return common_vendor.e({
        a: item.supplier
      }, item.supplier ? {
        b: common_vendor.t(item.supplier.name)
      } : {}, {
        c: common_vendor.o(($event) => $options.toShop(item.supplier.shop_supplier_id), index),
        d: common_vendor.t(item.state_text),
        e: common_vendor.t(item.order_source_text),
        f: common_vendor.t(item.order_no),
        g: item.product.length > 1
      }, item.product.length > 1 ? {
        h: common_vendor.f(item.product, (img, num, i1) => {
          return {
            a: img.image.file_path,
            b: num
          };
        }),
        i: common_vendor.t(item.pay_price),
        j: common_vendor.t(item.product.length),
        k: common_vendor.o(($event) => $options.gotoOrder(item.order_id), index)
      } : common_vendor.e({
        l: common_vendor.f(item.product, (img, num, i1) => {
          return {
            a: img.image.file_path,
            b: num
          };
        }),
        m: common_vendor.t(item.product[0].product_name),
        n: item.order_source == 70
      }, item.order_source == 70 ? {
        o: common_vendor.t((item.pay_price * 1 + item.advance.pay_price * 1).toFixed(2))
      } : {
        p: common_vendor.t(item.pay_price)
      }, {
        q: common_vendor.t(item.product[0].total_num),
        r: common_vendor.o(($event) => $options.gotoOrder(item.order_id), index)
      }), {
        s: item.order_status.value == 10
      }, item.order_status.value == 10 ? common_vendor.e({
        t: item.pay_status.value == 10
      }, item.pay_status.value == 10 ? {
        v: common_vendor.o(($event) => $options.cancelOrder(item.order_id), index)
      } : {}, {
        w: item.pay_status.value == 20 && item.delivery_status.value == 10
      }, item.pay_status.value == 20 && item.delivery_status.value == 10 ? {
        x: common_vendor.o(($event) => $options.cancelOrder(item.order_id), index)
      } : {}, {
        y: item.pay_status.value == 20 && item.delivery_type.value == 20 && item.delivery_status.value == 10
      }, item.pay_status.value == 20 && item.delivery_type.value == 20 && item.delivery_status.value == 10 ? common_vendor.e({
        z: item.order_source == 30 && item.assemble_status == 20
      }, item.order_source == 30 && item.assemble_status == 20 ? {
        A: common_vendor.o(($event) => $options.onQRCode(item.order_id), index)
      } : {}, {
        B: item.order_source != 30
      }, item.order_source != 30 ? {
        C: common_vendor.o(($event) => $options.onQRCode(item.order_id), index)
      } : {}) : {}, {
        D: item.pay_status.value == 10
      }, item.pay_status.value == 10 ? {
        E: common_vendor.o(($event) => $options.onPayOrder(item.order_id), index)
      } : {}, {
        F: item.delivery_status.value == 20 && item.receipt_status.value == 10
      }, item.delivery_status.value == 20 && item.receipt_status.value == 10 ? {
        G: common_vendor.o(($event) => $options.orderReceipt(item.order_id), index)
      } : {}) : {}, {
        H: item.order_status.value == 21
      }, item.order_status.value == 21 ? {} : {}, {
        I: item.order_status.value == 30 && item.is_comment == 0
      }, item.order_status.value == 30 && item.is_comment == 0 ? {
        J: common_vendor.o(($event) => $options.gotoEvaluate(item.order_id), index)
      } : {}, {
        K: item.assemble_status == 10 && item.order_source == 30
      }, item.assemble_status == 10 && item.order_source == 30 ? {
        L: common_vendor.o(($event) => $options.gotoAssembleShare(item.product[0].bill_source_id), index)
      } : {}, {
        M: index
      });
    }),
    n: $data.listData.length == 0 && !$data.loading
  }, $data.listData.length == 0 && !$data.loading ? {} : {
    o: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    p: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    q: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args)),
    r: $data.codeImg,
    s: common_vendor.o($options.hideCodePopupFunc),
    t: common_vendor.p({
      show: $data.isCodeImg,
      type: "middle"
    }),
    v: _ctx.theme(),
    w: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/order/assemble-order.vue"]]);
wx.createPage(MiniProgramPage);
