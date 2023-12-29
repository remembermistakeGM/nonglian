"use strict";
const common_vendor = require("../../common/vendor.js");
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
      loging_password: "",
      register: {
        mobile: "",
        password: "",
        repassword: "",
        code: ""
      },
      resetpassword: {
        mobile: "",
        password: "",
        repassword: "",
        code: ""
      },
      /*是否已发验证码*/
      is_send: false,
      /*发送按钮文本*/
      send_btn_txt: "获取验证码",
      /*当前秒数*/
      second: 60,
      ip: "",
      isShow: true,
      is_login: 1,
      is_code: false,
      phoneHeight: 0,
      isRead: false,
      showWeixin: false,
      showApple: false
    };
  },
  onShow() {
    this.init();
  },
  onLoad() {
    this.getData();
  },
  methods: {
    /*初始化*/
    init() {
      let self = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          self.phoneHeight = res.windowHeight;
        }
      });
      if (plus.runtime.isApplicationExist({ pname: "com.tencent.mm", action: "weixin://" })) {
        self.showWeixin = true;
      }
      common_vendor.index.getSystemInfo({
        success: (res) => {
          res.system.replace(/iOS /, "");
          if (res.platform == "ios") {
            self.showApple = true;
          }
        }
      });
    },
    getData() {
      let self = this;
      self._get("user.userapple/policy", {}, function(res) {
        console.log(res);
        self.service = res.data.service;
        self.privacy = res.data.privacy;
      });
    },
    /*提交*/
    formSubmit() {
      let self = this;
      let formdata = {
        mobile: self.formData.mobile
      };
      let url = "";
      if (!self.isRead) {
        common_vendor.index.showToast({
          title: "请同意并勾选协议内容",
          duration: 2e3,
          icon: "none"
        });
        return;
      }
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(self.formData.mobile)) {
        console.log(self.formData.mobile);
        common_vendor.index.showToast({
          title: "手机有误,请重填！",
          duration: 2e3,
          icon: "none"
        });
        return;
      }
      if (self.is_code) {
        console.log(self.is_code);
        if (self.formData.code == "") {
          common_vendor.index.showToast({
            title: "验证码不能为空！",
            duration: 2e3,
            icon: "none"
          });
          return;
        }
        formdata.code = self.formData.code;
        url = "user.useropen/smslogin";
      } else {
        if (self.loging_password == "") {
          common_vendor.index.showToast({
            title: "密码不能为空！",
            duration: 2e3,
            icon: "none"
          });
          return;
        }
        formdata.password = self.loging_password;
        url = "user.useropen/phonelogin";
      }
      common_vendor.index.showLoading({
        title: "正在提交"
      });
      self._post(
        url,
        formdata,
        (result) => {
          common_vendor.index.setStorageSync("token", result.data.token);
          common_vendor.index.setStorageSync("user_id", result.data.user_id);
          let url2 = common_vendor.index.getStorageSync("currentPage");
          let pageOptions = common_vendor.index.getStorageSync("currentPageOptions");
          if (Object.keys(pageOptions).length > 0) {
            url2 += "?";
            for (let i in pageOptions) {
              url2 += i + "=" + pageOptions[i] + "&";
            }
            url2 = url2.substring(0, url2.length - 1);
          }
          self.gotoPage(url2);
        },
        false,
        () => {
          common_vendor.index.hideLoading();
        }
      );
    },
    /*注册*/
    registerSub() {
      let self = this;
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(self.register.mobile)) {
        console.log(self.register.mobile);
        common_vendor.index.showToast({
          title: "手机有误,请重填！",
          duration: 2e3,
          icon: "none"
        });
        return;
      }
      if (self.register.code == "") {
        common_vendor.index.showToast({
          title: "验证码不能为空！",
          duration: 2e3,
          icon: "none"
        });
        return;
      }
      if (self.register.password.length < 6) {
        common_vendor.index.showToast({
          title: "密码至少6位数！",
          duration: 2e3,
          icon: "none"
        });
        return;
      }
      if (self.register.password !== self.register.repassword) {
        common_vendor.index.showToast({
          title: "两次密码输入不一致！",
          duration: 2e3,
          icon: "none"
        });
        return;
      }
      if (!self.isRead) {
        common_vendor.index.showToast({
          title: "请同意并勾选协议内容",
          duration: 2e3,
          icon: "none"
        });
        return;
      }
      self.register.invitation_id = common_vendor.index.getStorageSync("invitation_id") ? common_vendor.index.getStorageSync("invitation_id") : 0;
      self.register.reg_source = "app";
      self.register.referee_id = common_vendor.index.getStorageSync("referee_id");
      common_vendor.index.showLoading({
        title: "正在提交"
      });
      self._post(
        "user.useropen/register",
        self.register,
        (result) => {
          common_vendor.index.showToast({
            title: "注册成功",
            duration: 3e3
          });
          self.formData.mobile = self.register.mobile;
          self.register = {
            mobile: "",
            password: "",
            repassword: "",
            code: ""
          };
          self.second = 0;
          self.changeMsg();
          self.is_login = 1;
        },
        false,
        () => {
          common_vendor.index.hideLoading();
        }
      );
    },
    resetpasswordSub() {
      let self = this;
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(self.resetpassword.mobile)) {
        common_vendor.index.showToast({
          title: "手机有误,请重填！",
          duration: 2e3,
          icon: "none"
        });
        return;
      }
      if (self.resetpassword.code == "") {
        common_vendor.index.showToast({
          title: "验证码不能为空！",
          duration: 2e3,
          icon: "none"
        });
        return;
      }
      if (self.resetpassword.password.length < 6) {
        common_vendor.index.showToast({
          title: "密码至少6位数！",
          duration: 2e3,
          icon: "none"
        });
        return;
      }
      if (self.resetpassword.password !== self.resetpassword.repassword) {
        common_vendor.index.showToast({
          title: "两次密码输入不一致！",
          duration: 2e3,
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "正在提交"
      });
      self._post(
        "user.useropen/resetpassword",
        self.resetpassword,
        (result) => {
          common_vendor.index.showToast({
            title: "重置成功",
            duration: 3e3
          });
          self.formData.mobile = self.resetpassword.mobile;
          self.resetpassword = {
            mobile: "",
            password: "",
            repassword: "",
            code: ""
          };
          self.second = 0;
          self.changeMsg();
          self.is_login = 1;
        },
        false,
        () => {
          common_vendor.index.hideLoading();
        }
      );
    },
    isCode() {
      if (this.is_code) {
        this.$set(this, "is_code", false);
      } else {
        this.$set(this, "is_code", true);
      }
      console.log(this.is_code);
    },
    /*发送短信*/
    sendCode() {
      let self = this;
      if (self.is_login == 1) {
        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(self.formData.mobile)) {
          common_vendor.index.showToast({
            title: "手机有误,请重填！",
            duration: 2e3,
            icon: "none"
          });
          return;
        }
      } else if (self.is_login == 2) {
        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(self.register.mobile)) {
          common_vendor.index.showToast({
            title: "手机有误,请重填！",
            duration: 2e3,
            icon: "none"
          });
          return;
        }
      } else if (self.is_login == 0) {
        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(self.resetpassword.mobile)) {
          common_vendor.index.showToast({
            title: "手机有误,请重填！",
            duration: 2e3,
            icon: "none"
          });
          return;
        }
      }
      let type = "register";
      let mobile = self.register.mobile;
      if (self.is_login == 1) {
        type = "login";
        mobile = self.formData.mobile;
      } else if (self.is_login == 0) {
        type = "login";
        mobile = self.resetpassword.mobile;
      }
      self._post(
        "user.useropen/sendCode",
        {
          mobile,
          type
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
    login() {
      let self = this;
      plus.oauth.getServices(function(servies) {
        let s = servies[0];
        if (!s.authResult) {
          s.authorize(function(e) {
            common_vendor.index.showLoading({
              title: "登录中",
              mask: true
            });
            self._post("user.useropen/login", {
              code: e.code,
              source: "app"
            }, (result) => {
              common_vendor.index.setStorageSync("token", result.data.token);
              common_vendor.index.setStorageSync("user_id", result.data.user_id);
              let url = common_vendor.index.getStorageSync("currentPage");
              let pageOptions = common_vendor.index.getStorageSync("currentPageOptions");
              if (Object.keys(pageOptions).length > 0) {
                url += "?";
                for (let i in pageOptions) {
                  url += i + "=" + pageOptions[i] + "&";
                }
                url = url.substring(0, url.length - 1);
              }
              self.gotoPage(url);
            }, false, () => {
              common_vendor.index.hideLoading();
            });
          }, function(e) {
            console.log("登陆认证失败!");
            common_vendor.index.showModal({
              title: "认证失败1",
              content: JSON.stringify(e)
            });
          });
        } else {
          console.log("已经登陆认证");
        }
      }, function(e) {
        console.log("获取服务列表失败：" + JSON.stringify(e));
      });
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
    },
    appleLogin() {
      let self = this;
      common_vendor.index.login({
        provider: "apple",
        success: function(loginRes) {
          common_vendor.index.getUserInfo({
            provider: "apple",
            success(res) {
              if (res.errMsg !== "getUserInfo:ok") {
                return false;
              }
              common_vendor.index.showLoading({
                title: "正在登录",
                mask: true
              });
              self._post("user.userapple/login", {
                invitation_id: self.invitation_id,
                openId: res.userInfo.openId,
                nickName: res.userInfo.fullName.giveName ? res.userInfo.fullName.giveName : "",
                referee_id: common_vendor.index.getStorageSync("referee_id"),
                source: "apple"
              }, (result) => {
                common_vendor.index.setStorageSync("token", result.data.token);
                common_vendor.index.setStorageSync("user_id", result.data.user_id);
                let url = common_vendor.index.getStorageSync("currentPage");
                let pageOptions = common_vendor.index.getStorageSync("currentPageOptions");
                if (Object.keys(pageOptions).length > 0) {
                  url += "?";
                  for (let i in pageOptions) {
                    url += i + "=" + pageOptions[i] + "&";
                  }
                  url = url.substring(0, url.length - 1);
                }
                self.gotoPage(url);
              }, false, () => {
                common_vendor.index.hideLoading();
              });
            }
          });
        },
        fail: function(err) {
          console.log("登录失败");
          console.log(err);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => _ctx.gotoPage("/pages/index/index")),
    b: $data.is_login == 2
  }, $data.is_login == 2 ? {
    c: common_vendor.o(($event) => $data.is_login = 1),
    d: $data.is_send,
    e: $data.register.mobile,
    f: common_vendor.o(($event) => $data.register.mobile = $event.detail.value),
    g: $data.register.password,
    h: common_vendor.o(($event) => $data.register.password = $event.detail.value),
    i: $data.register.repassword,
    j: common_vendor.o(($event) => $data.register.repassword = $event.detail.value),
    k: $data.register.code,
    l: common_vendor.o(($event) => $data.register.code = $event.detail.value),
    m: common_vendor.t($data.send_btn_txt),
    n: common_vendor.o((...args) => $options.sendCode && $options.sendCode(...args)),
    o: $data.is_send
  } : {}, {
    p: $data.is_login == 1
  }, $data.is_login == 1 ? common_vendor.e({
    q: common_vendor.o(($event) => $data.is_login = 2),
    r: $data.formData.mobile,
    s: common_vendor.o(($event) => $data.formData.mobile = $event.detail.value),
    t: !$data.is_code
  }, !$data.is_code ? {
    v: $data.loging_password,
    w: common_vendor.o(($event) => $data.loging_password = $event.detail.value)
  } : {}, {
    x: $data.is_code
  }, $data.is_code ? {
    y: $data.formData.code,
    z: common_vendor.o(($event) => $data.formData.code = $event.detail.value),
    A: common_vendor.t($data.send_btn_txt),
    B: common_vendor.o((...args) => $options.sendCode && $options.sendCode(...args)),
    C: $data.is_send
  } : {}) : {}, {
    D: $data.is_login == 0
  }, $data.is_login == 0 ? {
    E: common_vendor.o(($event) => $data.is_login = 1),
    F: $data.is_send,
    G: $data.resetpassword.mobile,
    H: common_vendor.o(($event) => $data.resetpassword.mobile = $event.detail.value),
    I: $data.resetpassword.password,
    J: common_vendor.o(($event) => $data.resetpassword.password = $event.detail.value),
    K: $data.resetpassword.repassword,
    L: common_vendor.o(($event) => $data.resetpassword.repassword = $event.detail.value),
    M: $data.resetpassword.code,
    N: common_vendor.o(($event) => $data.resetpassword.code = $event.detail.value),
    O: common_vendor.t($data.send_btn_txt),
    P: common_vendor.o((...args) => $options.sendCode && $options.sendCode(...args)),
    Q: $data.is_send
  } : {}, {
    R: $data.is_login == 1
  }, $data.is_login == 1 ? common_vendor.e({
    S: !$data.is_code
  }, !$data.is_code ? {
    T: common_vendor.o(($event) => $data.is_login = 0)
  } : {}, {
    U: common_vendor.t($data.is_code ? "使用密码登录" : "使用验证码登录"),
    V: common_vendor.o(($event) => $options.isCode()),
    W: common_vendor.n($data.is_code ? "d-e-c" : "d-b-c")
  }) : {}, {
    X: common_vendor.n($data.isRead ? "active agreement" : "agreement"),
    Y: common_vendor.o(($event) => $options.xieyi("service")),
    Z: common_vendor.o(($event) => $options.xieyi("privacy")),
    aa: common_vendor.o(($event) => $data.isRead = !$data.isRead),
    ab: $data.is_login == 2
  }, $data.is_login == 2 ? {
    ac: common_vendor.o((...args) => $options.registerSub && $options.registerSub(...args))
  } : {}, {
    ad: $data.is_login == 1
  }, $data.is_login == 1 ? {
    ae: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args))
  } : {}, {
    af: $data.is_login == 0
  }, $data.is_login == 0 ? {
    ag: common_vendor.o((...args) => $options.resetpasswordSub && $options.resetpasswordSub(...args))
  } : {}, {
    ah: $data.is_login == 1
  }, $data.is_login == 1 ? common_vendor.e({
    ai: $data.showWeixin
  }, $data.showWeixin ? {
    aj: common_vendor.o((...args) => $options.login && $options.login(...args))
  } : {}, {
    ak: $data.showApple
  }, $data.showApple ? {
    al: common_vendor.o((...args) => $options.appleLogin && $options.appleLogin(...args))
  } : {}) : {}, {
    am: _ctx.theme(),
    an: common_vendor.n(_ctx.theme() || ""),
    ao: common_vendor.s("height: " + $data.phoneHeight + "px;")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-facbca1a"], ["__file", "D:/workspace/p/nc/nc_app/pages/login/openlogin.vue"]]);
wx.createPage(MiniProgramPage);
