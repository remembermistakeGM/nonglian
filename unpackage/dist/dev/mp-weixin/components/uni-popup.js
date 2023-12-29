"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      //top - 顶部， middle - 居中, bottom - 底部
      default: "middle"
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 800
    },
    padding: {
      type: Number,
      default: 30
    },
    backgroundColor: {
      type: String,
      default: "#ffffff"
    },
    boxShadow: {
      type: String,
      default: "0 0 30upx rgba(0, 0, 0, .1)"
    },
    msg: {
      type: String,
      default: ""
    }
  },
  data() {
    let offsetTop = 0;
    return {
      offsetTop
    };
  },
  methods: {
    hide: function() {
      this.$emit("hidePopup");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.show
  }, $props.show ? {
    b: $data.offsetTop + "px",
    c: common_vendor.o((...args) => $options.hide && $options.hide(...args))
  } : {}, {
    d: $props.show
  }, $props.show ? common_vendor.e({
    e: $props.msg != ""
  }, $props.msg != "" ? {
    f: common_vendor.t($props.msg)
  } : {}, {
    g: common_vendor.n("uni-popup-" + $props.type),
    h: common_vendor.s("width:" + $props.width + "rpx; height:" + $props.height + "rpx;padding:" + $props.padding + "rpx;background-color:" + $props.backgroundColor + ";box-shadow:" + $props.boxShadow + ";")
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/uni-popup.vue"]]);
wx.createComponent(Component);
