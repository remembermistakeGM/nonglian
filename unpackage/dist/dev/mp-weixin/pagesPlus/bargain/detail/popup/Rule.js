"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*是否显示*/
      openRule: false
    };
  },
  props: ["isRule", "setting"],
  watch: {
    isRule: function(n, o) {
      if (n != o) {
        this.openRule = n;
      }
    }
  },
  methods: {
    /*关闭规则*/
    closeRule() {
      this.openRule = false;
      this.$emit("close");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.openRule
  }, $data.openRule ? {
    b: common_vendor.o((...args) => $options.closeRule && $options.closeRule(...args)),
    c: common_vendor.n($data.openRule ? "active" : ""),
    d: common_vendor.o((...args) => $options.closeRule && $options.closeRule(...args)),
    e: $props.setting.bargain_rules,
    f: common_vendor.o(() => {
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/bargain/detail/popup/Rule.vue"]]);
wx.createComponent(Component);
