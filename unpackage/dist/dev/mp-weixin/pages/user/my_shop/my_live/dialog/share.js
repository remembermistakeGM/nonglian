"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const Popup = () => "../../../../../components/uni-popup.js";
const _sfc_main = {
  components: {
    Popup
  },
  data() {
    return {
      /*是否显示*/
      isPopup: false,
      /*展示类别*/
      type: 0,
      /*宽度*/
      width: 600,
      /*高度*/
      height: 800,
      /*背景颜色*/
      backgroundColor: "none",
      /*阴影*/
      boxShadow: "none",
      form: {},
      coupon: []
    };
  },
  props: ["qrcode"],
  created() {
  },
  mounted() {
    this.setData();
  },
  methods: {
    /*获取弹出层内容*/
    setData() {
      this.isPopup = true;
    },
    /*关闭弹窗*/
    hidePopupFunc(e) {
      this.isPopup = false;
      this.$emit("close");
    },
    //保存海报图片
    savePosterImg() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      common_vendor.index.downloadFile({
        url: self.qrcode,
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
if (!Array) {
  const _component_Popup = common_vendor.resolveComponent("Popup");
  _component_Popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.qrcode,
    b: common_vendor.o((...args) => $options.savePosterImg && $options.savePosterImg(...args)),
    c: common_vendor.o(($event) => $options.hidePopupFunc(true)),
    d: common_vendor.o($options.hidePopupFunc),
    e: common_vendor.p({
      show: $data.isPopup,
      width: $data.width,
      height: $data.height,
      backgroundColor: $data.backgroundColor,
      boxShadow: $data.boxShadow,
      padding: 0
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-61e23576"], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my_shop/my_live/dialog/share.vue"]]);
wx.createComponent(Component);
