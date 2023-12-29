"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      windowHeight: 0,
      windowWidth: 0,
      service: "",
      privacy: ""
    };
  },
  onLoad() {
    const res = common_vendor.index.getSystemInfoSync();
    this.windowWidth = res.windowWidth;
    this.windowHeight = res.windowHeight;
    this.getData();
  },
  methods: {
    getData() {
      let self = this;
      self._get("user.userapple/policy", {
        platform: self.getPlatform(),
        referee_id: common_vendor.index.getStorageSync("referee_id")
      }, function(res) {
        console.log(res);
        self.service = res.data.service;
        self.privacy = res.data.privacy;
      });
    },
    // 同意隐私
    submit() {
      common_vendor.index.setStorageSync("firstEnter", 1);
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    },
    // 退出应用
    quit() {
      plus.runtime.disagreePrivacy();
      plus.runtime.quit();
      plus.ios.import("UIApplication").sharedApplication().performSelector("exit");
    },
    xieyi(type) {
      let url = "";
      if (type == "service") {
        url = this.service;
      } else {
        url = this.privacy;
      }
      common_vendor.index.navigateTo({
        url: "/pages/webview/webview?url=" + url
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.xieyi("service")),
    b: common_vendor.o(($event) => $options.xieyi("privacy")),
    c: common_vendor.o((...args) => $options.quit && $options.quit(...args)),
    d: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    e: common_vendor.s("width: 750rpx;height:" + $data.windowHeight + "px;")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/privacy/privacy.vue"]]);
wx.createPage(MiniProgramPage);
