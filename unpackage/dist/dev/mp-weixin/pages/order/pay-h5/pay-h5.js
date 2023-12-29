"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      urls: "",
      order_id: 0,
      order: {},
      order_type: "",
      /*加载中*/
      loading: true,
      use_balance: 0
    };
  },
  onLoad(e) {
    this.order_id = e.order_id;
    this.order_type = e.order_type;
    this.use_balance = e.use_balance;
    common_vendor.index.showLoading({
      title: "加载中"
    });
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      self._post("user.userweb/payH5", {
        order_id: self.order_id,
        order_type: self.order_type,
        pay_source: "payH5",
        use_balance: self.use_balance
      }, function(res) {
        self.order = res.data.order;
        self.urls = res.data.mweb_url + "&redirect_url=" + res.data.return_Url;
        common_vendor.index.hideLoading();
        self.loading = false;
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loading
  }, !$data.loading ? {
    b: common_vendor.t($data.order.pay_price),
    c: common_vendor.t($data.order.order_no),
    d: $data.urls
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/order/pay-h5/pay-h5.vue"]]);
wx.createPage(MiniProgramPage);
