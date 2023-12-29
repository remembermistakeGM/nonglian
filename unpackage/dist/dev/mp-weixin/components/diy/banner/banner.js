"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      indicatorActiveColor: "#ffffff",
      current: 0
    };
  },
  props: ["itemData"],
  created() {
    this.indicatorActiveColor = this.itemData.style.btnColor;
  },
  methods: {
    changeSwiper(e) {
      this.current = e.detail.current;
    },
    /*跳转页面*/
    gotoPages(e) {
      this.gotoPage(e.linkUrl);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.itemData.data, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.f($props.itemData.data, (item2, index2, i1) => {
          return {
            a: common_vendor.n($data.current == index2 ? "swiper-dot active" : "swiper-dot"),
            b: index2
          };
        }),
        c: index,
        d: common_vendor.o(($event) => $options.gotoPages(item), index)
      };
    }),
    b: $props.itemData.style.height + "rpx",
    c: $props.itemData.style.topRadio * 2 + "rpx " + $props.itemData.style.topRadio * 2 + "rpx " + $props.itemData.style.bottomRadio * 2 + "rpx " + $props.itemData.style.bottomRadio * 2 + "rpx",
    d: common_vendor.s("background-color:" + $data.indicatorActiveColor),
    e: common_vendor.n($props.itemData.style.imgShape),
    f: $props.itemData.style.height + "rpx",
    g: $props.itemData.style.topRadio * 2 + "rpx " + $props.itemData.style.topRadio * 2 + "rpx " + $props.itemData.style.bottomRadio * 2 + "rpx " + $props.itemData.style.bottomRadio * 2 + "rpx",
    h: $data.autoplay,
    i: $data.duration,
    j: common_vendor.o((...args) => $options.changeSwiper && $options.changeSwiper(...args)),
    k: common_vendor.s("height:" + $props.itemData.style.height + "rpx;"),
    l: $props.itemData.style.background,
    m: $props.itemData.style.paddingLeft * 2 + "rpx",
    n: $props.itemData.style.paddingLeft * 2 + "rpx",
    o: $props.itemData.style.paddingTop * 2 + "rpx",
    p: $props.itemData.style.paddingBottom * 2 + "rpx"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/diy/banner/banner.vue"]]);
wx.createComponent(Component);
