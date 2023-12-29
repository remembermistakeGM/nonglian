"use strict";
const common_vendor = require("../common/vendor.js");
const env_config = require("../env/config.js");
require("../env/production.js");
const _sfc_main = {
  data() {
    return {
      /*是否可见*/
      Visible: false,
      /*分享配置*/
      shareConfig: {},
      // logo
      logo: ""
    };
  },
  created() {
    this.getData();
  },
  props: ["isAppShare", "appParams"],
  watch: {
    "isAppShare": function(n, o) {
      if (n != o) {
        this.Visible = n;
      }
    }
  },
  methods: {
    getData() {
      let self = this;
      self._get(
        "settings/appShare",
        {},
        function(res) {
          self.shareConfig = res.data.appshare;
          self.logo = res.data.logo;
        }
      );
    },
    /*关闭弹窗*/
    closePopup(type) {
      this.$emit("close");
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
  return {
    a: common_vendor.o(($event) => $options.share(0, "WXSceneSession")),
    b: common_vendor.o(($event) => $options.share(0, "WXSenceTimeline")),
    c: common_vendor.o(($event) => $options.closePopup(1)),
    d: common_vendor.o(() => {
    }),
    e: common_vendor.n($data.Visible ? "bottom-panel open" : "bottom-panel close"),
    f: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-466244a3"], ["__file", "D:/workspace/p/nc/nc_app/components/app-share.vue"]]);
wx.createComponent(Component);
