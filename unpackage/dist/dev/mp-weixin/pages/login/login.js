"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      background: "",
      listData: []
    };
  },
  onShow() {
  },
  onLoad() {
  },
  methods: {
    /*改变发送验证码按钮文本*/
    changeMsg() {
      if (this.second > 0) {
        this.send_btn_txt = this.second + "秒";
        this.second--;
        setTimeout(this.changeMsg, 1e3);
      } else {
        this.send_btn_txt = "获取验证码";
        this.second = 60;
        this.is_send = false;
      }
    },
    onNotLogin: function() {
      this.gotoPage("/pages/index/index");
    },
    getUserInfo: function() {
      let self = this;
      common_vendor.wx$1.getUserProfile({
        lang: "zh_CN",
        desc: "用于完善会员资料",
        success: (res) => {
          console.log(res);
          if (res.errMsg !== "getUserProfile:ok") {
            return false;
          }
          common_vendor.index.showLoading({
            title: "正在登录",
            mask: true
          });
          common_vendor.wx$1.login({
            success(res_login) {
              self._post("user.user/login", {
                code: res_login.code,
                user_info: res.rawData,
                encrypted_data: encodeURIComponent(res.encryptedData),
                iv: encodeURIComponent(res.iv),
                signature: res.signature,
                referee_id: common_vendor.index.getStorageSync("referee_id"),
                source: "wx"
              }, (result) => {
                common_vendor.index.setStorageSync("token", result.data.token);
                common_vendor.index.setStorageSync("user_id", result.data.user_id);
                common_vendor.index.navigateBack();
              }, false, () => {
                common_vendor.index.hideLoading();
              });
            }
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.getUserInfo && $options.getUserInfo(...args)),
    b: common_vendor.o((...args) => $options.onNotLogin && $options.onNotLogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
