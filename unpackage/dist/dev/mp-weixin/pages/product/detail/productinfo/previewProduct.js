"use strict";
const common_vendor = require("../../../../common/vendor.js");
const Countdown = () => "../../../../components/countdown/countdown-act.js";
const _sfc_main = {
  components: {
    Countdown
  },
  data() {
    return {};
  },
  props: ["detail", "is_fav"],
  methods: {
    sendFunc(e) {
      this.$emit("send", e);
    },
    returnValFunc(e) {
    }
  }
};
if (!Array) {
  const _component_Countdown = common_vendor.resolveComponent("Countdown");
  _component_Countdown();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t(_ctx.subPrice($props.detail.product_price, "1")),
    b: common_vendor.t(_ctx.subPrice($props.detail.product_price, "2")),
    c: common_vendor.t($props.detail.product_sku.line_price),
    d: common_vendor.sr("countdown", "cdcacaec-0"),
    e: common_vendor.o($options.returnValFunc),
    f: common_vendor.p({
      activeName: "previewProduct",
      config: {
        startstamp: $props.detail.preview.start_time,
        endstamp: $props.detail.preview.end_time,
        type: "preview"
      },
      start_name: "距开始仅剩",
      end_name: "距开始仅剩"
    }),
    g: common_vendor.t($props.detail.product_name),
    h: $props.detail.selling_point
  }, $props.detail.selling_point ? {
    i: common_vendor.t($props.detail.selling_point)
  } : {}, {
    j: common_vendor.o(($event) => $options.sendFunc("showShare")),
    k: common_vendor.n($props.is_fav ? "icon-shoucang2 dominant" : "icon-shoucang1"),
    l: common_vendor.n($props.is_fav ? "dominant" : "gray9"),
    m: common_vendor.o(($event) => $options.sendFunc("favorite"))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/product/detail/productinfo/previewProduct.vue"]]);
wx.createComponent(Component);
