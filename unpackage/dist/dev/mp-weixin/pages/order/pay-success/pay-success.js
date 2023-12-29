"use strict";
const common_vendor = require("../../../common/vendor.js");
const recommendProduct = () => "../../../components/recommendProduct/recommendProduct.js";
const _sfc_main = {
  components: {
    recommendProduct
  },
  data() {
    return {
      /*是否加载完成*/
      loadding: true,
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
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
      }
    };
  },
  onLoad(e) {
    this.order_id = e.order_id;
  },
  mounted() {
    common_vendor.index.showLoading({
      title: "加载中"
    });
    this.getData();
  },
  methods: {
    /*获取订单详情*/
    getData() {
      let _this = this;
      let order_id = _this.order_id;
      _this._get(
        "user.order/paySuccess",
        {
          order_id
        },
        function(res) {
          _this.detail = res.data.order;
          _this.loadding = false;
          common_vendor.index.hideLoading();
        }
      );
    },
    /*返回首页*/
    goHome() {
      this.gotoPage("/pages/index/index");
    },
    /*返回我的订单*/
    goMyorder() {
      this.gotoPage("/pages/order/myorder");
    }
  }
};
if (!Array) {
  const _easycom_recommendProduct2 = common_vendor.resolveComponent("recommendProduct");
  _easycom_recommendProduct2();
}
const _easycom_recommendProduct = () => "../../../components/recommendProduct/recommendProduct.js";
if (!Math) {
  _easycom_recommendProduct();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loadding
  }, !$data.loadding ? common_vendor.e({
    b: common_vendor.t($data.detail.pay_price),
    c: $data.detail.points_bonus > 0
  }, $data.detail.points_bonus > 0 ? {
    d: common_vendor.t(_ctx.points_name()),
    e: common_vendor.t($data.detail.points_bonus)
  } : {}, {
    f: common_vendor.o(($event) => $options.goHome()),
    g: common_vendor.o((...args) => $options.goMyorder && $options.goMyorder(...args)),
    h: common_vendor.p({
      location: 30
    })
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/order/pay-success/pay-success.vue"]]);
wx.createPage(MiniProgramPage);
