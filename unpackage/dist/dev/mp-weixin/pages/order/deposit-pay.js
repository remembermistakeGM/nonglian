"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      category: {},
      pay_type: 20
      //支付方式,
    };
  },
  onShow() {
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      self._get("supplier.index/deposit", {}, function(res) {
        self.category = res.data.category;
      });
    },
    /*显示支付方式*/
    payTypeFunc(e) {
      this.pay_type = e;
    },
    /*提交订单*/
    SubmitOrder() {
      let self = this;
      self._post(
        "supplier.index/deposit",
        {},
        function(result) {
          self.gotoPage("/pages/order/cashier?order_id=" + result.data.order_id + "&order_type=20");
        }
      );
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.category.name || ""),
    b: common_vendor.t($data.category.deposit_money || "0.00"),
    c: common_vendor.o((...args) => $options.SubmitOrder && $options.SubmitOrder(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/order/deposit-pay.vue"]]);
wx.createPage(MiniProgramPage);
