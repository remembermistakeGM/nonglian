"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  props: ["itemData"],
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.itemData.style.height + "px",
    b: $props.itemData.style.background
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/diy/blank/blank.vue"]]);
wx.createComponent(Component);
