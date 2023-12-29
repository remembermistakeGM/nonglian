"use strict";
const common_vendor = require("../../../common/vendor.js");
const Popup = () => "../../../components/uni-popup.js";
const _sfc_main = {
  components: {
    Popup
  },
  data() {
    return {
      /*弹窗是否打开*/
      isPopup: false,
      /*是否阅读了规则*/
      is_read: false,
      agreement: "",
      is_applying: false,
      referee_name: "",
      words: {},
      is_agent: "",
      /*顶部背景*/
      top_background: "",
      /*小程序订阅消息*/
      temlIds: []
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    getBtnTxt() {
      if (this.words && this.words.apply && this.words.apply.words && this.words.apply.words.goto_mall && this.words.apply.words.goto_mall.value) {
        return this.words.apply.words.goto_mall.value;
      }
      return "";
    }
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._get("user.agent/apply", {
        platform: self.getPlatform(),
        referee_id: common_vendor.index.getStorageSync("referee_id")
      }, function(res) {
        common_vendor.index.hideLoading();
        self.top_background = res.data.background;
        self.is_applying = res.data.is_applying;
        self.referee_name = res.data.referee_name != null ? res.data.referee_name : "平台";
        self.is_agent = res.data.is_agent;
        self.words = res.data.words;
        self.temlIds = res.data.template_arr;
        self.agreement = res.data.license;
        common_vendor.index.setNavigationBarTitle({
          title: self.words.apply.title.value
        });
        if (self.is_agent) {
          common_vendor.index.navigateBack({});
        }
      });
    },
    /*申请*/
    formSubmit: function(e) {
      let formdata = e.detail.value;
      formdata.referee_id = common_vendor.index.getStorageSync("referee_id");
      let self = this;
      if (formdata.name == "") {
        common_vendor.index.showToast({
          title: "请输入姓名！",
          icon: "none"
        });
        return;
      }
      if (formdata.mobile.length == "") {
        common_vendor.index.showToast({
          title: "请输入手机号！",
          icon: "none"
        });
        return;
      }
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(formdata.mobile)) {
        common_vendor.index.showToast({
          title: "手机有误,请重填！",
          icon: "none"
        });
        return;
      }
      if (!self.is_read) {
        common_vendor.index.showToast({
          title: "请同意协议！",
          icon: "none"
        });
        return;
      }
      let callback = function() {
        common_vendor.index.showLoading({
          title: "正在提交",
          mask: true
        });
        self._post("plus.agent.apply/submit", formdata, function(res) {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "申请成功"
          });
          self.getData();
        });
      };
      self.subMessage(self.temlIds, callback);
    },
    /*去商城看看*/
    gotoShop() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    },
    /*同意协议*/
    changeFunc(e) {
      if (e.detail.value.length > 0) {
        this.is_read = true;
      } else {
        this.is_read = false;
      }
    }
  }
};
if (!Array) {
  const _component_Popup = common_vendor.resolveComponent("Popup");
  _component_Popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.top_background != ""
  }, $data.top_background != "" ? {
    b: $data.top_background
  } : {}, {
    c: !$data.is_applying
  }, !$data.is_applying ? {
    d: common_vendor.t($data.words && $data.words.apply && $data.words.apply.words && $data.words.apply.words.title.value || ""),
    e: common_vendor.t($data.referee_name || ""),
    f: $data.is_read,
    g: common_vendor.o((...args) => $options.changeFunc && $options.changeFunc(...args)),
    h: common_vendor.t($data.words && $data.words.apply && $data.words.apply.words && $data.words.apply.words.license.value || ""),
    i: common_vendor.o(($event) => $data.isPopup = true),
    j: common_vendor.t($data.words && $data.words.apply && $data.words.apply.words && $data.words.apply.words.submit.value || ""),
    k: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args)),
    l: common_vendor.o((...args) => _ctx.formReset && _ctx.formReset(...args))
  } : {}, {
    m: $data.is_applying
  }, $data.is_applying ? {
    n: common_vendor.t($data.words && $data.words.apply && $data.words.apply.words && $data.words.apply.words.wait_audit && $data.words.apply.words.wait_audit.value || ""),
    o: common_vendor.t($options.getBtnTxt),
    p: common_vendor.o((...args) => $options.gotoShop && $options.gotoShop(...args))
  } : {}, {
    q: common_vendor.t($data.agreement),
    r: common_vendor.o(($event) => $data.isPopup = false),
    s: common_vendor.p({
      show: $data.isPopup,
      msg: "申请协议"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/agent/apply/apply.vue"]]);
wx.createPage(MiniProgramPage);
