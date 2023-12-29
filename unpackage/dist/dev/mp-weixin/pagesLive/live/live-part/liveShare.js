"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      popupVisible: false
    };
  },
  beforeCreate() {
  },
  methods: {
    show() {
      this.popupVisible = true;
    },
    getPoster() {
      this.$emit("livePoster");
    },
    close() {
      this.popupVisible = false;
    },
    share() {
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.popupVisible
  }, $data.popupVisible ? {
    b: common_vendor.o((...args) => $options.close && $options.close(...args)),
    c: common_vendor.o((...args) => $options.share && $options.share(...args)),
    d: common_vendor.o((...args) => $options.getPoster && $options.getPoster(...args)),
    e: common_vendor.o(() => {
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-01d2a5e2"], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/live-part/liveShare.nvue"]]);
wx.createComponent(Component);
