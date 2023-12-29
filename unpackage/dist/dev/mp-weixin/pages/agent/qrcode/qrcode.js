"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      qrcode_url: ""
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      let source = self.getPlatform();
      self._get("plus.agent.qrcode/poster", {
        source
      }, function(data) {
        common_vendor.index.hideLoading();
        self.qrcode_url = data.data.qrcode;
      });
    },
    /*保存图片*/
    savePosterImg() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      common_vendor.index.downloadFile({
        url: self.qrcode_url,
        success(res) {
          common_vendor.index.hideLoading();
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(data) {
              common_vendor.index.showToast({
                title: "保存成功",
                icon: "success",
                duration: 2e3
              });
              self.isCreatedImg = false;
            },
            fail(err) {
              console.log(err.errMsg);
              if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                common_vendor.index.showToast({
                  title: "请允许访问相册后重试",
                  icon: "none",
                  duration: 1e3
                });
                setTimeout(() => {
                  common_vendor.index.openSetting();
                }, 1e3);
              }
            },
            complete(res2) {
              console.log("complete");
            }
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.qrcode_url,
    b: common_vendor.o((...args) => $options.savePosterImg && $options.savePosterImg(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/agent/qrcode/qrcode.vue"]]);
wx.createPage(MiniProgramPage);
