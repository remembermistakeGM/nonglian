"use strict";
const common_vendor = require("./common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 审核详情
      detail: {}
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      self._post("supplier.apply/detail", {}, function(res) {
        self.detail = res.data.detail;
      });
    },
    //重新注册
    gotoReg() {
      this.gotoPage("/pages/shop/register");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.detail.status == 0
  }, $data.detail.status == 0 ? {} : {}, {
    b: $data.detail.status == 1
  }, $data.detail.status == 1 ? {} : {}, {
    c: $data.detail.status == 2
  }, $data.detail.status == 2 ? {} : {}, {
    d: $data.detail.status == 0
  }, $data.detail.status == 0 ? {} : {}, {
    e: $data.detail.status == 1
  }, $data.detail.status == 1 ? {} : {}, {
    f: $data.detail.status == 2
  }, $data.detail.status == 2 ? {} : {}, {
    g: $data.detail.status == 0
  }, $data.detail.status == 0 ? {} : {}, {
    h: $data.detail.status == 1
  }, $data.detail.status == 1 ? {} : {}, {
    i: $data.detail.status == 2
  }, $data.detail.status == 2 ? {} : {}, {
    j: $data.detail.status == 0
  }, $data.detail.status == 0 ? {} : {}, {
    k: $data.detail.status == 1
  }, $data.detail.status == 1 ? {} : {}, {
    l: $data.detail.status == 2
  }, $data.detail.status == 2 ? {} : {}, {
    m: $data.detail.status == 0
  }, $data.detail.status == 0 ? {} : {}, {
    n: $data.detail.status == 1
  }, $data.detail.status == 1 ? {} : {}, {
    o: $data.detail.status == 2
  }, $data.detail.status == 2 ? {} : {}, {
    p: $data.detail.status == 1
  }, $data.detail.status == 1 ? {} : {}, {
    q: $data.detail.status == 2
  }, $data.detail.status == 2 ? {} : {}, {
    r: $data.detail.status == 2
  }, $data.detail.status == 2 ? {
    s: common_vendor.t($data.detail.content)
  } : {}, {
    t: $data.detail.status == 2
  }, $data.detail.status == 2 ? {
    v: common_vendor.o(($event) => $options.gotoReg())
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/shop/application_status.vue"]]);
exports.MiniProgramPage = MiniProgramPage;
