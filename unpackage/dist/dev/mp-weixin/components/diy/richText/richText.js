"use strict";
const common_utils = require("../../../common/utils.js");
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  props: ["itemData"],
  created() {
  },
  methods: {
    formatContent(e) {
      return common_utils.utils.format_content(e);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $options.formatContent($props.itemData.params.content),
    b: $props.itemData.style.background,
    c: $props.itemData.style.paddingTop + "px " + $props.itemData.style.paddingLeft + "px"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/diy/richText/richText.vue"]]);
wx.createComponent(Component);
