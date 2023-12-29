"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  props: ["loadding"],
  computed: {
    //计算属性判断vuex中的显示状态
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.loadding
  }, $props.loadding ? {} : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f806401e"], ["__file", "D:/workspace/p/nc/nc_app/components/jjjloading.vue"]]);
wx.createComponent(Component);
