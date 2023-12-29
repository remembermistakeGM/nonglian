"use strict";
const common_vendor = require("../../../../common/vendor.js");
const Countdown = () => "../../../../components/countdown/countdown.js";
const _sfc_main = {
  components: {
    Countdown
  },
  data() {
    return {};
  },
  props: ["bill"],
  created() {
  },
  methods: {
    /*转换参数*/
    rturnObjec(item) {
      return {
        type: "text",
        startstamp: 0,
        endstamp: item.end_time
      };
    },
    /*查看更多*/
    openMore() {
      this.$emit("openMore", true);
    },
    /*去拼单*/
    goBill(e) {
      this.$emit("gobill", e);
    }
  }
};
if (!Array) {
  const _component_Countdown = common_vendor.resolveComponent("Countdown");
  _component_Countdown();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.bill.length > 0
  }, $props.bill.length > 0 ? {
    b: common_vendor.o((...args) => $options.openMore && $options.openMore(...args)),
    c: common_vendor.f($props.bill, (item, index, i0) => {
      return {
        a: item.user.avatarUrl,
        b: common_vendor.t(item.user.nickName),
        c: common_vendor.t(item.dif_people),
        d: "ea796862-0-" + i0,
        e: common_vendor.p({
          config: $options.rturnObjec(item)
        }),
        f: common_vendor.o(($event) => $options.goBill(item), index),
        g: index
      };
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/assemble/detail/part/Bill.vue"]]);
wx.createComponent(Component);
