"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  props: ["itemData"],
  created() {
  },
  methods: {
    /*跳转页面*/
    gotoPages(e) {
      this.gotoPage(e.linkUrl);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.itemData.style.type == 5
  }, $props.itemData.style.type == 5 ? {
    b: common_vendor.t($props.itemData.params.subtitle),
    c: $props.itemData.style.subtextColor,
    d: $props.itemData.style.subtextSize * 2 + "rpx"
  } : {}, {
    e: $props.itemData.style.type == 8 && $props.itemData.style.isLine
  }, $props.itemData.style.type == 8 && $props.itemData.style.isLine ? {
    f: $props.itemData.style.lineColor || "",
    g: $props.itemData.style.textSize * 2 + "rpx"
  } : {}, {
    h: $props.itemData.style.type == 6
  }, $props.itemData.style.type == 6 ? {
    i: common_vendor.t($props.itemData.params.subtitle),
    j: $props.itemData.style.subtextColor,
    k: $props.itemData.style.subtextSize * 2 + "rpx"
  } : {}, {
    l: $props.itemData.style.type == 4
  }, $props.itemData.style.type == 4 ? {
    m: $props.itemData.style.textColor,
    n: $props.itemData.style.textColor
  } : {}, {
    o: $props.itemData.style.type == 1
  }, $props.itemData.style.type == 1 ? {
    p: $props.itemData.style.lineColor || "",
    q: $props.itemData.style.lineColor || ""
  } : {}, {
    r: common_vendor.t($props.itemData.params.title),
    s: $props.itemData.style.type == 6 ? 1 : "",
    t: $props.itemData.style.textColor,
    v: $props.itemData.style.background,
    w: $props.itemData.style.textSize * 2 + "rpx",
    x: $props.itemData.style.weight || 400,
    y: $props.itemData.style.type == 4
  }, $props.itemData.style.type == 4 ? {
    z: $props.itemData.style.textColor,
    A: $props.itemData.style.textColor
  } : {}, {
    B: $props.itemData.style.type == 1
  }, $props.itemData.style.type == 1 ? {
    C: $props.itemData.style.lineColor || "",
    D: $props.itemData.style.lineColor || ""
  } : {}, {
    E: $props.itemData.style.type == 2
  }, $props.itemData.style.type == 2 ? {
    F: $props.itemData.style.lineColor || ""
  } : {}, {
    G: $props.itemData.style.type == 3
  }, $props.itemData.style.type == 3 ? {} : {}, {
    H: $props.itemData.style.type == 8
  }, $props.itemData.style.type == 8 ? common_vendor.e({
    I: $props.itemData.style.type == 8 && $props.itemData.style.isSub
  }, $props.itemData.style.type == 8 && $props.itemData.style.isSub ? {
    J: common_vendor.t($props.itemData.params.subtitle),
    K: $props.itemData.style.subtextColor,
    L: $props.itemData.style.subtextSize * 2 + "rpx",
    M: $props.itemData.style.subbackground
  } : {}) : {}, {
    N: $props.itemData.style.type == 8 && $props.itemData.style.isMore
  }, $props.itemData.style.type == 8 && $props.itemData.style.isMore ? {
    O: common_vendor.t($props.itemData.params.moretitle),
    P: common_vendor.o(($event) => _ctx.gotoPage($props.itemData.params.morelinkUrl)),
    Q: $props.itemData.style.moretextColor
  } : {}, {
    R: $props.itemData.style.type == 7
  }, $props.itemData.style.type == 7 ? {
    S: common_vendor.t($props.itemData.params.subtitle),
    T: $props.itemData.style.subtextColor,
    U: $props.itemData.style.subtextSize * 2 + "rpx",
    V: $props.itemData.style.subbackground
  } : {}, {
    W: $props.itemData.style.type == 5
  }, $props.itemData.style.type == 5 ? {} : {}, {
    X: $props.itemData.style.type == 6
  }, $props.itemData.style.type == 6 ? {} : {}, {
    Y: $props.itemData.style.type == 4
  }, $props.itemData.style.type == 4 ? {
    Z: common_vendor.t($props.itemData.params.subtitle),
    aa: $props.itemData.style.subtextColor,
    ab: $props.itemData.style.subtextSize * 2 + "rpx"
  } : {}, {
    ac: common_vendor.n("diy-title-" + $props.itemData.style.type),
    ad: $props.itemData.style.background,
    ae: $props.itemData.style.topRadio * 2 + "rpx " + $props.itemData.style.topRadio * 2 + "rpx " + $props.itemData.style.bottomRadio * 2 + "rpx " + $props.itemData.style.bottomRadio * 2 + "rpx ",
    af: common_vendor.o(($event) => _ctx.gotoPage($props.itemData.params.sublinkUrl)),
    ag: $props.itemData.style.paddingTop * 2 + "rpx " + $props.itemData.style.paddingLeft * 2 + "rpx " + $props.itemData.style.paddingBottom * 2 + "rpx " + $props.itemData.style.paddingLeft * 2 + "rpx",
    ah: $props.itemData.style.bgcolor
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/diy/title/title.vue"]]);
wx.createComponent(Component);
