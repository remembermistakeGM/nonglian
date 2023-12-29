"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  props: ["Address", "exist_address", "dis"],
  onLoad() {
  },
  mounted() {
  },
  methods: {
    /*添加地址*/
    addAddress() {
      if (this.dis) {
        return;
      }
      let url = "/pages/user/address/address?source=order";
      if (!this.exist_address) {
        url = "/pages/user/address/add/add?delta=1";
      }
      this.gotoPage(url);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.Address == null
  }, $props.Address == null ? {
    b: common_vendor.o(($event) => $options.addAddress())
  } : {
    c: common_vendor.t($props.Address.region.province),
    d: common_vendor.t($props.Address.region.city),
    e: common_vendor.t($props.Address.region.region),
    f: common_vendor.t($props.Address.detail),
    g: common_vendor.t($props.Address.name),
    h: common_vendor.t($props.Address.phone),
    i: common_vendor.o(($event) => $options.addAddress())
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/order/confirm-order/my-info.vue"]]);
wx.createComponent(Component);
