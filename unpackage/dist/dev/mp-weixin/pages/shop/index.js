"use strict";
const common_vendor = require("../../common/vendor.js");
const register = () => "./register2.js";
const application = () => "./application_status2.js";
const _sfc_main = {
  components: {
    register,
    application
  },
  data() {
    return {
      supplierStatus: -1,
      loading: true
    };
  },
  onShow() {
    this.getData();
  },
  methods: {
    getData() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      self.loading = true;
      self._get("user.index/detail", {}, (res) => {
        self.loading = false;
        self.supplierStatus = res.data.supplierStatus;
        if (self.supplierStatus == 2) {
          self.gotoPage("pages/user/my_shop/my_shop", "redirect");
        } else if (self.supplierStatus == 3) {
          common_vendor.index.hideLoading();
          common_vendor.index.showModal({
            content: "店铺异常,请联系客服处理"
          });
        } else {
          let title = "";
          if (self.supplierStatus == 0) {
            title = "申请入驻";
          } else {
            title = "申请审核中";
          }
          common_vendor.index.setNavigationBarTitle({
            title
          });
          common_vendor.index.hideLoading();
        }
      });
    }
  }
};
if (!Array) {
  const _component_register = common_vendor.resolveComponent("register");
  const _component_application = common_vendor.resolveComponent("application");
  (_component_register + _component_application)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loading && $data.supplierStatus != 2
  }, !$data.loading && $data.supplierStatus != 2 ? common_vendor.e({
    b: $data.supplierStatus == 0
  }, $data.supplierStatus == 0 ? {} : {}, {
    c: $data.supplierStatus == 1
  }, $data.supplierStatus == 1 ? {} : {}) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/shop/index.vue"]]);
wx.createPage(MiniProgramPage);
