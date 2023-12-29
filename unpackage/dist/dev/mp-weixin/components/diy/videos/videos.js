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
    a: $props.itemData.style.height * 2 + "rpx",
    b: $props.itemData.style.topRadio * 2 + "rpx",
    c: $props.itemData.style.topRadio * 2 + "rpx",
    d: $props.itemData.style.bottomRadio * 2 + "rpx",
    e: $props.itemData.style.bottomRadio * 2 + "rpx",
    f: $props.itemData.params.videoUrl,
    g: $props.itemData.params.poster,
    h: $props.itemData.params.autoplay == "1",
    i: $props.itemData.style.bgcolor,
    j: $props.itemData.style.paddingLeft * 2 + "rpx",
    k: $props.itemData.style.paddingLeft * 2 + "rpx",
    l: $props.itemData.style.paddingTop * 2 + "rpx",
    m: $props.itemData.style.paddingBottom * 2 + "rpx"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/diy/videos/videos.vue"]]);
wx.createComponent(Component);
