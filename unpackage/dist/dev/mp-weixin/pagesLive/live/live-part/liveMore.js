"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      popupVisible: false,
      activeIndex: -1,
      // 进度条
      max: 5,
      min: 0,
      progressVal: 0,
      beauty: 9,
      whiteness: 9,
      device_position: "front",
      value: 9,
      showSlider: false
    };
  },
  beforeCreate() {
  },
  methods: {
    show() {
      this.popupVisible = true;
    },
    /*改变*/
    sliderChange(e) {
      console.log(e);
      this.value = e.detail.value;
      if (this.activeIndex == 0) {
        common_vendor.index.setStorageSync("beauty", this.value);
        this.$emit("liveSet", {
          type: "beauty",
          value: this.value
        });
      } else {
        common_vendor.index.setStorageSync("whiteness", this.value);
        this.$emit("liveSet", {
          type: "whiteness",
          value: this.value
        });
      }
    },
    setBeauty() {
      this.activeIndex = 0;
      let beauty = common_vendor.index.getStorageSync("beauty");
      if (beauty) {
        this.value = beauty;
      } else {
        this.value = this.beauty;
      }
      this.showSlider = true;
    },
    setWhiteness() {
      this.activeIndex = 1;
      let whiteness = common_vendor.index.getStorageSync("whiteness");
      if (whiteness) {
        this.value = whiteness;
      } else {
        this.value = this.whiteness;
      }
      this.showSlider = true;
    },
    setDevice() {
      this.$emit("switchCamera");
    },
    close() {
      this.popupVisible = false;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.popupVisible
  }, $data.popupVisible ? common_vendor.e({
    b: common_vendor.o((...args) => $options.close && $options.close(...args)),
    c: $data.showSlider
  }, $data.showSlider ? {
    d: $data.value,
    e: common_vendor.o((...args) => $options.sliderChange && $options.sliderChange(...args)),
    f: common_vendor.o(() => {
    })
  } : {}, {
    g: $data.activeIndex == 0 ? 1 : "",
    h: common_vendor.o((...args) => $options.setBeauty && $options.setBeauty(...args)),
    i: $data.activeIndex == 1 ? 1 : "",
    j: common_vendor.o((...args) => $options.setWhiteness && $options.setWhiteness(...args)),
    k: $data.activeIndex == 2 ? 1 : "",
    l: common_vendor.o((...args) => $options.setDevice && $options.setDevice(...args)),
    m: common_vendor.o(() => {
    })
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bb2b7ead"], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/live-part/liveMore.nvue"]]);
wx.createComponent(Component);
