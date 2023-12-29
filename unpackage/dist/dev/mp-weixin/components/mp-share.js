"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*是否可见*/
      Visible: false,
      poster_img: "",
      /*公众号分享是否显示*/
      wechat_share: false
    };
  },
  props: ["isMpShare"],
  watch: {
    "isMpShare": function(n, o) {
      if (n != o) {
        this.Visible = n;
      }
    }
  },
  methods: {
    /*关闭弹窗*/
    closePopup() {
      this.$emit("close");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n($data.Visible ? "bottom-panel open" : "bottom-panel close"),
    b: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/mp-share.vue"]]);
wx.createComponent(Component);
