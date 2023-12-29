"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      data: {
        gifPrice: 0,
        orderCount: 0,
        totalPrice: 0,
        shop_supplier_id: ""
      }
    };
  },
  onLoad(e) {
    this.shop_supplier_id = e.shop_supplier_id;
  },
  onShow() {
    this.getData();
  },
  methods: {
    gosupPage(path) {
      this.gotoPage(path + "?shop_supplier_id=" + this.shop_supplier_id);
    },
    // 获取用户数据
    getData() {
      let self = this;
      self._get("plus.live.Room/livedata", {}, function(res) {
        self.data = res.data.data;
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.data.totalPrice == null ? 0 : $data.data.totalPrice),
    b: common_vendor.t($data.data.orderCount == null ? 0 : $data.data.orderCount),
    c: common_vendor.t($data.data.gifPrice),
    d: common_vendor.o(($event) => _ctx.gotoPage("/pages/user/my_shop/my_live/my-live/record")),
    e: common_vendor.o(($event) => _ctx.gotoPage("/pages/user/my_shop/my_live/notice/notice")),
    f: common_vendor.o(($event) => $options.gosupPage("/pages/user/my_shop/my_live/live-order/live-order"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my_shop/my_live/my-live/my-live.vue"]]);
wx.createPage(MiniProgramPage);
