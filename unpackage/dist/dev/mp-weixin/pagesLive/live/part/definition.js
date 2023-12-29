"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      popupVisible: false,
      type: 0
    };
  },
  beforeCreate() {
  },
  methods: {
    show() {
      let vd = common_vendor.index.getStorageSync("vd");
      if (vd) {
        this.type = vd;
      } else {
        this.type = 0;
      }
      this.popupVisible = true;
    },
    defFunc(n) {
      this.type = n;
      this.$emit("liveSet", n);
    },
    close() {
      this.popupVisible = false;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.popupVisible
  }, $data.popupVisible ? {
    b: common_vendor.o((...args) => $options.close && $options.close(...args)),
    c: common_vendor.n($data.type == 0 ? "def-btn-active" : ""),
    d: common_vendor.o(($event) => $options.defFunc(0)),
    e: common_vendor.n($data.type == 1 ? "def-btn-active" : ""),
    f: common_vendor.o(($event) => $options.defFunc(1)),
    g: common_vendor.n($data.type == 2 ? "def-btn-active" : ""),
    h: common_vendor.o(($event) => $options.defFunc(2)),
    i: common_vendor.o((...args) => $options.close && $options.close(...args)),
    j: common_vendor.o(() => {
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5d28767b"], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/part/definition.nvue"]]);
wx.createComponent(Component);
