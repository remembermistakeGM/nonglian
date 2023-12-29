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
  return common_vendor.e({
    a: $props.itemData.style.layout > -1
  }, $props.itemData.style.layout > -1 ? {
    b: common_vendor.f($props.itemData.data, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: index,
        c: common_vendor.o(($event) => $options.gotoPages(item), index)
      };
    }),
    c: common_vendor.n("column__" + $props.itemData.style.layout)
  } : common_vendor.e({
    d: $props.itemData.data[0].imgUrl,
    e: common_vendor.o(($event) => $options.gotoPages($props.itemData.data[0])),
    f: $props.itemData.data.length >= 2
  }, $props.itemData.data.length >= 2 ? {
    g: $props.itemData.data[1].imgUrl,
    h: common_vendor.o(($event) => $options.gotoPages($props.itemData.data[1]))
  } : {}, {
    i: $props.itemData.data.length >= 3
  }, $props.itemData.data.length >= 3 ? {
    j: $props.itemData.data[2].imgUrl,
    k: common_vendor.o(($event) => $options.gotoPages($props.itemData.data[2]))
  } : {}, {
    l: $props.itemData.data.length >= 4
  }, $props.itemData.data.length >= 4 ? {
    m: $props.itemData.data[3].imgUrl,
    n: common_vendor.o(($event) => $options.gotoPages($props.itemData.data[3]))
  } : {}, {
    o: $props.itemData.style.paddingTop + "px " + $props.itemData.style.paddingLeft + "px"
  }), {
    p: $props.itemData.style.background,
    q: $props.itemData.style.paddingTop * 2 + "rpx " + $props.itemData.style.paddingLeft * 2 + "rpx " + $props.itemData.style.paddingBottom * 2 + "rpx " + $props.itemData.style.paddingLeft * 2 + "rpx"
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/diy/window/window.vue"]]);
wx.createComponent(Component);
