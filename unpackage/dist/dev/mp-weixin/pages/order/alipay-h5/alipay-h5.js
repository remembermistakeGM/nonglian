"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      order_id: 0,
      order_type: "",
      pay_source: "",
      content: "",
      /*加载中*/
      loading: true,
      intervalId: null,
      use_balance: 0
    };
  },
  onLoad(e) {
    this.order_id = e.order_id;
    this.order_type = e.order_type;
    this.use_balance = e.use_balance;
    if (e.platform) {
      this.pay_source = "payAppH5";
    } else {
      this.pay_source = "payH5";
    }
    common_vendor.index.showLoading({
      title: "加载中"
    });
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      console.log("self.pay_source=" + self.pay_source);
      self._post("user.userweb/alipayH5", {
        order_id: self.order_id,
        order_type: self.order_type,
        pay_source: self.pay_source,
        use_balance: self.use_balance
      }, function(res) {
        common_vendor.index.hideLoading();
        self.loading = false;
        self.content = res.data.payment;
        self.intervalId = setInterval(function() {
          if (document.forms["alipaysubmit"]) {
            clearInterval(self.intervalId);
            document.forms["alipaysubmit"].submit();
          }
        }, 500);
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loading
  }, !$data.loading ? {
    b: $data.content
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/order/alipay-h5/alipay-h5.vue"]]);
wx.createPage(MiniProgramPage);
