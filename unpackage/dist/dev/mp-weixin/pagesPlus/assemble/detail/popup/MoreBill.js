"use strict";
const common_vendor = require("../../../../common/vendor.js");
const Popup = () => "../../../../components/uni-popup.js";
const Countdown = () => "../../../../components/countdown/countdown.js";
const _sfc_main = {
  components: {
    Popup,
    Countdown
  },
  data() {
    return {
      /*是否显示*/
      isPopup: false,
      /*展示类别*/
      type: 0,
      /*宽度*/
      width: 600,
      /*高度*/
      height: 1200,
      /*背景颜色*/
      backgroundColor: "none",
      /*阴影*/
      boxShadow: "none"
    };
  },
  props: ["ismore", "bill"],
  watch: {},
  created() {
    this.isPopup = this.ismore;
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
    /*关闭弹窗*/
    hidePopupFunc() {
      this.$emit("closeMore", false);
    },
    /*去拼单*/
    goBill(e) {
      this.$emit("gobill", e);
    }
  }
};
if (!Array) {
  const _component_Countdown = common_vendor.resolveComponent("Countdown");
  const _component_Popup = common_vendor.resolveComponent("Popup");
  (_component_Countdown + _component_Popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($props.bill, (item, index, i0) => {
      return {
        a: item.user.avatarUrl,
        b: common_vendor.t(item.user.nickName),
        c: common_vendor.t(item.dif_people),
        d: "9af3267a-1-" + i0 + ",9af3267a-0",
        e: common_vendor.p({
          config: $options.rturnObjec(item)
        }),
        f: common_vendor.o(($event) => $options.goBill(item), index),
        g: index,
        h: index >= 10 ? 1 : ""
      };
    }),
    b: $props.bill.length > 10
  }, $props.bill.length > 10 ? {} : {}, {
    c: common_vendor.o($options.hidePopupFunc),
    d: common_vendor.p({
      show: $data.isPopup,
      width: $data.width,
      height: $data.height,
      type: "middle",
      backgroundColor: $data.backgroundColor,
      boxShadow: $data.boxShadow,
      padding: 0
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/assemble/detail/popup/MoreBill.vue"]]);
wx.createComponent(Component);
