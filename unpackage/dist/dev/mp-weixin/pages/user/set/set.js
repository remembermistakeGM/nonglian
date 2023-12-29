"use strict";
const common_vendor = require("../../../common/vendor.js");
const Upload = () => "../../../components/upload/uploadOne.js";
const Popup = () => "../../../components/uni-popup.js";
const _sfc_main = {
  components: {
    Upload,
    Popup
  },
  data() {
    return {
      userInfo: {},
      isUpload: false,
      isPopup: false,
      newName: "",
      type: "",
      version_no: "",
      imageList: []
    };
  },
  onShow() {
    this.getData();
  },
  methods: {
    onChooseAvatar(e) {
      let self = this;
      console.log(e);
      self.uploadFile([e.detail.avatarUrl]);
    },
    /*获取数据*/
    getData() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._get("user.index/setting", {}, function(res) {
        self.userInfo = res.data.userInfo;
        common_vendor.index.hideLoading();
      });
    },
    gotoBind() {
      this.gotoPage("/pages/user/modify-phone/modify-phone");
    },
    logout() {
      common_vendor.index.removeStorageSync("token");
      common_vendor.index.removeStorageSync("user_id");
      this.gotoPage("/pages/index/index");
    },
    changeName(type) {
      let self = this;
      if (type == "mobile") {
        self.oldmobile = self.userInfo.mobile;
      }
      self.type = type;
      self.newName = self.userInfo[type];
      self.isPopup = true;
    },
    hidePopupFunc() {
      this.newName = "";
      this.isPopup = false;
    },
    changeinput(e) {
      this.newName = e.detail.value;
    },
    clearName() {
      this.newName = "";
    },
    subName(e) {
      let self = this;
      if (self.loading) {
        return;
      }
      self.newName = e.detail.value.newName;
      self.userInfo[self.type] = this.newName;
      self.update();
    },
    /* 修改头像 */
    changeAvatarUrl() {
      let self = this;
      self.isUpload = true;
    },
    /*上传图片*/
    uploadFile: function(tempList) {
      let self = this;
      let i = 0;
      let img_length = tempList.length;
      let params = {
        token: common_vendor.index.getStorageSync("token"),
        app_id: self.getAppId()
      };
      common_vendor.index.showLoading({
        title: "图片上传中"
      });
      tempList.forEach(function(filePath, fileKey) {
        common_vendor.index.uploadFile({
          url: self.websiteUrl + "/index.php?s=/api/file.upload/image",
          filePath,
          name: "iFile",
          formData: params,
          success: function(res) {
            let result = typeof res.data === "object" ? res.data : JSON.parse(res.data);
            if (result.code === 1) {
              self.imageList.push(result.data);
            } else {
              self.showError(result.msg);
            }
          },
          complete: function() {
            i++;
            if (img_length === i) {
              common_vendor.index.hideLoading();
              self.getImgsFunc(self.imageList);
            }
          }
        });
      });
    },
    /*获取上传的图片*/
    getImgsFunc(e) {
      if (e && typeof e != "undefined") {
        let self = this;
        self.userInfo.avatarUrl = e[0].file_path;
        self.update();
        self.isUpload = false;
      }
    },
    update() {
      let self = this;
      if (self.loading) {
        return;
      }
      common_vendor.index.showLoading({
        title: "加载中"
      });
      let params = self.userInfo;
      self.loading = true;
      self._post("user.user/updateInfo", params, function(res) {
        self.showSuccess(
          "修改成功",
          function() {
            self.loading = false;
            self.isPopup = false;
            common_vendor.index.hideLoading();
            self.getData();
          },
          function(err) {
            common_vendor.index.hideLoading();
            self.loading = false;
            self.isPopup = false;
          }
        );
      });
    },
    deleteAccount() {
      let self = this;
      common_vendor.index.showModal({
        title: "提示",
        content: "是否确认删除账号？删除后您将无法用此账号登录，此账户下的数据也将删除",
        success: function(res) {
          if (res.confirm) {
            self._post("user.user/deleteAccount", {}, (result) => {
              self.showSuccess("删除成功", () => {
                common_vendor.index.removeStorageSync("token");
                common_vendor.index.removeStorageSync("user_id");
                self.gotoPage("/pages/index/index");
              });
            }, false, () => {
              common_vendor.index.hideLoading();
            });
          }
        }
      });
    }
  }
};
if (!Array) {
  const _component_Popup = common_vendor.resolveComponent("Popup");
  const _component_Upload = common_vendor.resolveComponent("Upload");
  (_component_Popup + _component_Upload)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.userInfo.avatarUrl || "/static/default.png",
    b: common_vendor.o((...args) => $options.onChooseAvatar && $options.onChooseAvatar(...args)),
    c: common_vendor.t($data.userInfo.user_id),
    d: common_vendor.t($data.userInfo.nickName),
    e: common_vendor.o(($event) => $options.changeName("nickName")),
    f: $data.userInfo.mobile
  }, $data.userInfo.mobile ? {
    g: common_vendor.t($data.userInfo.mobile)
  } : {}, {
    h: common_vendor.o(($event) => $options.logout()),
    i: $data.type == "mobile" || $data.type == "nickName" || $data.type == "user_name" || $data.type == "email" || $data.type == "idcard"
  }, $data.type == "mobile" || $data.type == "nickName" || $data.type == "user_name" || $data.type == "email" || $data.type == "idcard" ? {
    j: $data.type == "nickName" ? "nickname" : "text",
    k: $data.newName,
    l: common_vendor.o((...args) => $options.changeinput && $options.changeinput(...args)),
    m: common_vendor.o((...args) => $options.clearName && $options.clearName(...args))
  } : {}, {
    n: common_vendor.o((...args) => $options.hidePopupFunc && $options.hidePopupFunc(...args)),
    o: common_vendor.o((...args) => $options.subName && $options.subName(...args)),
    p: common_vendor.o($options.hidePopupFunc),
    q: common_vendor.p({
      show: $data.isPopup,
      type: "bottom",
      width: 750,
      padding: 0
    }),
    r: $data.isUpload
  }, $data.isUpload ? {
    s: common_vendor.o($options.getImgsFunc)
  } : {}, {
    t: _ctx.theme(),
    v: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/set/set.vue"]]);
wx.createPage(MiniProgramPage);
