"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      popupVisible: false,
      activeIndex: 0,
      value: 1
    };
  },
  beforeCreate() {
  },
  methods: {
    show() {
      this.activeIndex = 0;
      this.value = common_vendor.index.getStorageSync("lightening") * 10;
      this.popupVisible = true;
    },
    /*改变*/
    sliderChange(e) {
      let value = e.detail.value / 10;
      if (this.activeIndex == 0) {
        common_vendor.index.setStorageSync("lightening", value);
      }
      if (this.activeIndex == 1) {
        common_vendor.index.setStorageSync("smoothness", value);
      }
      if (this.activeIndex == 2) {
        common_vendor.index.setStorageSync("redness", value);
      }
      if (this.activeIndex == 3) {
        common_vendor.index.setStorageSync("sharpness", value);
      }
      this.$emit("liveSet", "set");
    },
    close() {
      this.popupVisible = false;
      this.$emit("close");
    },
    setBrightness() {
      this.activeIndex = 0;
      this.value = common_vendor.index.getStorageSync("lightening") * 10;
    },
    setSmoothness() {
      this.activeIndex = 1;
      this.value = common_vendor.index.getStorageSync("smoothness") * 10;
    },
    setRedness() {
      this.activeIndex = 2;
      this.value = common_vendor.index.getStorageSync("redness") * 10;
    },
    setSharpness() {
      this.activeIndex = 3;
      this.value = common_vendor.index.getStorageSync("sharpness") * 10;
    },
    resetBeauty() {
      this.$emit("liveSet", "reset");
      if (this.activeIndex == 0) {
        this.value = 6;
      } else if (this.activeIndex == 1) {
        this.value = 5;
      } else if (this.activeIndex == 2) {
        this.value = 1;
      } else if (this.activeIndex == 3) {
        this.value = 3;
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.popupVisible
  }, $data.popupVisible ? {
    b: common_vendor.o((...args) => $options.close && $options.close(...args)),
    c: $data.value,
    d: common_vendor.o((...args) => $options.sliderChange && $options.sliderChange(...args)),
    e: $data.activeIndex == 0 ? 1 : "",
    f: common_vendor.o((...args) => $options.setBrightness && $options.setBrightness(...args)),
    g: $data.activeIndex == 1 ? 1 : "",
    h: common_vendor.o((...args) => $options.setSmoothness && $options.setSmoothness(...args)),
    i: $data.activeIndex == 2 ? 1 : "",
    j: common_vendor.o((...args) => $options.setRedness && $options.setRedness(...args)),
    k: $data.activeIndex == 3 ? 1 : "",
    l: common_vendor.o((...args) => $options.setSharpness && $options.setSharpness(...args)),
    m: common_vendor.o((...args) => $options.resetBeauty && $options.resetBeauty(...args)),
    n: common_vendor.o((...args) => $options.close && $options.close(...args)),
    o: common_vendor.o(() => {
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2222082b"], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/part/beauty.nvue"]]);
wx.createComponent(Component);
