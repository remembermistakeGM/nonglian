"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*是否可见*/
      Visible: false,
      poster_img: ""
    };
  },
  props: ["isguarantee", "server"],
  watch: {
    "isguarantee": function(n, o) {
      if (n != o) {
        this.Visible = n;
      }
    }
  },
  methods: {
    /*关闭弹窗*/
    closePopup(type) {
      this.$emit("close", {
        type,
        poster_img: this.poster_img
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args)),
    b: common_vendor.f($props.server, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.describe),
        c: index
      };
    }),
    c: common_vendor.o(() => {
    }),
    d: common_vendor.n($data.Visible ? "bottom-panel open" : "bottom-panel close"),
    e: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/guarantee.vue"]]);
wx.createComponent(Component);
