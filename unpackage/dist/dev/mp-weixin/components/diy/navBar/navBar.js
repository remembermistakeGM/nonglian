"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      //单个宽度
      item_width: "25%"
    };
  },
  props: ["itemData"],
  created() {
    this.item_width = 100 / Math.abs(this.itemData.style.rowsNum) + "%";
  },
  methods: {
    /*跳转页面*/
    gotoDetail(e) {
      this.gotoPage(e.linkUrl);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.itemData.data, (item, index, i0) => {
      return {
        a: item.imgUrl,
        b: common_vendor.t(item.text),
        c: item.color,
        d: index,
        e: common_vendor.o(($event) => $options.gotoDetail(item), index)
      };
    }),
    b: common_vendor.s("width:" + $data.item_width + ";"),
    c: $props.itemData.style.background,
    d: $props.itemData.style.topRadio * 2 + "rpx " + $props.itemData.style.topRadio * 2 + "rpx " + $props.itemData.style.bottomRadio * 2 + "rpx " + $props.itemData.style.bottomRadio * 2 + "rpx",
    e: $props.itemData.style.bgcolor,
    f: $props.itemData.style.paddingTop * 2 + "rpx " + $props.itemData.style.paddingLeft * 2 + "rpx " + $props.itemData.style.paddingBottom * 2 + "rpx " + $props.itemData.style.paddingLeft * 2 + "rpx"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/diy/navBar/navBar.vue"]]);
wx.createComponent(Component);
