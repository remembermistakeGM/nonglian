"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  props: ["itemData"],
  methods: {
    /*跳转门店详情*/
    gotoDetail(e) {
      let url = "pages/store/detail/detail?store_id=" + e;
      this.gotoPage(url);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.itemData.data, (store, index, i0) => {
      return {
        a: store.logo_image,
        b: common_vendor.t(store.store_name),
        c: common_vendor.t(store.region.province),
        d: common_vendor.t(store.region.city),
        e: common_vendor.t(store.region.region),
        f: common_vendor.t(store.address),
        g: common_vendor.t(store.phone),
        h: index,
        i: common_vendor.o(($event) => $options.gotoDetail(store.store_id), index)
      };
    }),
    b: $props.itemData.style.background,
    c: $props.itemData.style.topRadio * 2 + "rpx",
    d: $props.itemData.style.topRadio * 2 + "rpx",
    e: $props.itemData.style.bottomRadio * 2 + "rpx",
    f: $props.itemData.style.bottomRadio * 2 + "rpx",
    g: $props.itemData.style.bgcolor,
    h: $props.itemData.style.paddingLeft * 2 + "rpx",
    i: $props.itemData.style.paddingLeft * 2 + "rpx",
    j: $props.itemData.style.paddingTop * 2 + "rpx",
    k: $props.itemData.style.paddingBottom * 2 + "rpx"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/diy/store/store.vue"]]);
wx.createComponent(Component);
