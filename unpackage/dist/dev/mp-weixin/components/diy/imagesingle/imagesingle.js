"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  props: ["itemData"],
  methods: {
    /*跳转页面*/
    gotoPages(e) {
      this.gotoPage(e.linkUrl);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.itemData.data, (imageSingle, index, i0) => {
      return {
        a: imageSingle.imgUrl,
        b: index,
        c: common_vendor.o(($event) => $options.gotoPages(imageSingle), index)
      };
    }),
    b: $props.itemData.style.topRadio * 2 + "rpx",
    c: $props.itemData.style.topRadio * 2 + "rpx",
    d: $props.itemData.style.bottomRadio * 2 + "rpx",
    e: $props.itemData.style.bottomRadio * 2 + "rpx",
    f: common_vendor.s("padding-top: " + $props.itemData.style.paddingTop * 2 + "rpx;padding-bottom:" + $props.itemData.style.paddingTop * 2 + "rpx; padding-left:" + $props.itemData.style.paddingLeft * 2 + "rpx;padding-right:" + $props.itemData.style.paddingLeft * 2 + "rpx;  background:" + $props.itemData.style.background)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/diy/imagesingle/imagesingle.vue"]]);
wx.createComponent(Component);
