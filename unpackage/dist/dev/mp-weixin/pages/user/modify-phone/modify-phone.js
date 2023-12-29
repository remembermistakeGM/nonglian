"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*表单数据对象*/
      formData: {
        /*手机号*/
        mobile: "",
        /*验证码*/
        code: ""
      },
      /*是否已发验证码*/
      is_send: false,
      /*发送按钮文本*/
      send_btn_txt: "获取验证码",
      /*当前秒数*/
      second: 60,
      ip: ""
    };
  },
  onLoad() {
  },
  methods: {
    /*提交*/
    formSubmit() {
      let self = this;
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(self.formData.mobile)) {
        common_vendor.index.showToast({
          title: "手机有误,请重填！",
          duration: 2e3,
          icon: "none"
        });
        return;
      }
      if (self.formData.code == "") {
        common_vendor.index.showToast({
          title: "验证码不能为空！",
          duration: 2e3,
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "正在提交"
      });
      common_vendor.index.navigateBack();
      self._post(
        "user.userweb/bindMobile",
        self.formData,
        (result) => {
          common_vendor.index.showToast({
            title: "绑定成功",
            duration: 2e3
          });
          setTimeout(function() {
            common_vendor.index.navigateBack();
          }, 2e3);
        },
        false,
        () => {
          common_vendor.index.hideLoading();
        }
      );
    },
    /*发送短信*/
    sendCode() {
      let self = this;
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(self.formData.mobile)) {
        common_vendor.index.showToast({
          title: "手机有误,请重填！",
          duration: 2e3,
          icon: "none"
        });
        return;
      }
      self._post(
        "user.userweb/sendCode",
        {
          mobile: self.formData.mobile
        },
        (result) => {
          if (result.code == 1) {
            common_vendor.index.showToast({
              title: "发送成功"
            });
            self.is_send = true;
            self.changeMsg();
          }
        }
      );
    },
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
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.is_send,
    b: $data.formData.mobile,
    c: common_vendor.o(($event) => $data.formData.mobile = $event.detail.value),
    d: $data.formData.code,
    e: common_vendor.o(($event) => $data.formData.code = $event.detail.value),
    f: common_vendor.t($data.send_btn_txt),
    g: common_vendor.o((...args) => $options.sendCode && $options.sendCode(...args)),
    h: $data.is_send,
    i: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-12b64baa"], ["__file", "D:/workspace/p/nc/nc_app/pages/user/modify-phone/modify-phone.vue"]]);
wx.createPage(MiniProgramPage);
