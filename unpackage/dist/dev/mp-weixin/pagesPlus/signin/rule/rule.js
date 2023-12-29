"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_utils = require("../../../common/utils.js");
const _sfc_main = {
  data() {
    return {
      detail: ""
    };
  },
  mounted() {
    common_vendor.index.showLoading({
      title: "加载中"
    });
    this.getData();
  },
  methods: {
    getData() {
      let self = this;
      self._get("plus.sign.sign/getSign", {}, function(res) {
        res.data.detail = common_utils.utils.format_content(res.data.detail);
        self.detail = res.data.detail;
        common_vendor.index.hideLoading();
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.detail
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/signin/rule/rule.vue"]]);
wx.createPage(MiniProgramPage);
