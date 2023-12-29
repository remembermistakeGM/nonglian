"use strict";
const common_vendor = require("../../../common/vendor.js");
const env_config = require("../../../env/config.js");
require("../../../env/production.js");
const _sfc_main = {
  data() {
    return {
      /*是否可见*/
      popupVisible: false,
      /*分享配置*/
      shareConfig: {},
      // logo
      logo: ""
    };
  },
  created() {
    this.getData();
  },
  props: ["appParams"],
  methods: {
    show() {
      this.popupVisible = true;
      this.getData();
    },
    /*请求对象*/
    getRequest() {
      let self = this;
      return self;
    },
    getData() {
      let self = this;
      self.getRequest()._get(
        "settings/appShare",
        {},
        function(res) {
          self.shareConfig = res.data.appshare;
          self.logo = res.data.logo;
          console.log(self.shareConfig);
        }
      );
    },
    /*关闭弹窗*/
    closePopup(type) {
      this.popupVisible = false;
    },
    // 分享
    share: function(shareType, scene) {
      let shareOPtions = {
        provider: "weixin",
        scene,
        //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈
        type: shareType,
        success: function(res) {
          console.log("success:" + JSON.stringify(res));
        },
        fail: function(err) {
          console.log("fail:" + JSON.stringify(err));
        }
      };
      if (this.shareConfig.type != 2) {
        shareOPtions.summary = this.appParams.summary;
        shareOPtions.imageUrl = this.logo;
        shareOPtions.title = this.appParams.title;
        if (this.shareConfig.type == 1) {
          shareOPtions.href = this.shareConfig.open_site + this.appParams.path;
        } else if (this.shareConfig.type == 3) {
          if (this.shareConfig.bind_type == 1) {
            shareOPtions.href = this.shareConfig.down_url;
          } else {
            shareOPtions.href = env_config.config.app_url + "/index.php/api/user.useropen/invite?app_id=" + env_config.config.app_id + "&referee_id=" + common_vendor.index.getStorageSync("user_id");
          }
        }
      } else {
        shareOPtions.scene = "WXSceneSession";
        shareOPtions.type = 5;
        shareOPtions.imageUrl = this.appParams.image ? this.appParams.image : this.logo;
        shareOPtions.title = this.appParams.title;
        shareOPtions.miniProgram = {
          id: this.shareConfig.gh_id,
          path: this.appParams.path,
          webUrl: this.shareConfig.web_url,
          type: 0
        };
      }
      common_vendor.index.share(shareOPtions);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.popupVisible
  }, $data.popupVisible ? common_vendor.e({
    b: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args)),
    c: _ctx.showSlider
  }, _ctx.showSlider ? {
    d: _ctx.value,
    e: common_vendor.o((...args) => _ctx.sliderChange && _ctx.sliderChange(...args)),
    f: common_vendor.o(() => {
    })
  } : {}, {
    g: common_vendor.o(($event) => $options.share(0, "WXSceneSession")),
    h: common_vendor.o(($event) => $options.share(0, "WXSenceTimeline")),
    i: common_vendor.o(() => {
    }),
    j: common_vendor.n(_ctx.Visible ? "bottom-panel open" : "bottom-panel close"),
    k: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args))
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8dbbf87c"], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/live-part/app-nvue-share.vue"]]);
wx.createComponent(Component);
