"use strict";
const common_vendor = require("./common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*需要返回的图片*/
      imageList: []
    };
  },
  props: ["num", "isVideo"],
  onLoad() {
  },
  mounted() {
    this.chooseImageFunc();
  },
  methods: {
    /*打开相机或者相册，选择图片*/
    chooseImageFunc() {
      let self = this;
      if (this.isVideo) {
        common_vendor.index.chooseVideo({
          // 来源相册或者拍摄
          maxDuration: 60,
          // 设置最长时间60s
          camera: "back",
          // 后置摄像头
          success: (res) => {
            console.log(res);
            if (res) {
              let arr = [];
              arr.push(res.tempFilePath);
              console.log(arr);
              self.uploadFile(arr);
            }
          },
          fail(err) {
            console.log(err);
            self.$emit("getImgs", null);
          }
        });
      } else {
        console.log("切换图片");
        common_vendor.index.chooseImage({
          count: self.num || 9,
          //默认9
          mediaType: ["image"],
          sizeType: ["original", "compressed"],
          //可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"],
          //从相册选择
          success: function(res) {
            self.uploadFile(res.tempFilePaths);
          },
          fail: function(res) {
            self.$emit("getImgs", null);
          },
          complete: function(res) {
          }
        });
      }
    },
    /*上传图片*/
    uploadFile: function(tempList) {
      let self = this;
      let i = 0;
      let img_length = tempList.length;
      let params = {
        token: common_vendor.index.getStorageSync("token"),
        app_id: self.getAppId(),
        file_type: self.isVideo ? "video" : "image"
      };
      common_vendor.index.showLoading({
        title: "上传中"
      });
      tempList.forEach(function(filePath, fileKey) {
        common_vendor.index.uploadFile({
          url: self.websiteUrl + "/index.php?s=/api/file.upload/image",
          filePath,
          name: "iFile",
          formData: params,
          success: function(res) {
            let result = typeof res.data === "object" ? res.data : JSON.parse(res.data);
            if (result.code === -1) {
              console.log("登录态失效, 重新登录");
              self.doLogin();
              return;
            }
            if (result.code === 1) {
              self.imageList.push(result.data);
            }
          },
          complete: function() {
            i++;
            if (img_length === i) {
              common_vendor.index.hideLoading();
              self.$emit("getImgs", self.imageList);
            }
          }
        });
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/upload/upload.vue"]]);
exports.MiniProgramPage = MiniProgramPage;
