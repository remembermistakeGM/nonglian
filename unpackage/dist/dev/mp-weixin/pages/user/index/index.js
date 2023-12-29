"use strict";
const common_vendor = require("../../../common/vendor.js");
const diy = () => "../../../components/diy/diy.js";
const _sfc_main = {
  components: {
    diy
  },
  data() {
    return {
      items: [],
      isloadding: true,
      /*是否加载完成*/
      loadding: true,
      detail: {
        balance: 0,
        points: 0,
        grade: {
          name: ""
        }
      },
      orderCount: {},
      coupon: 0,
      user_type: "",
      //用户状态
      msgcount: 0,
      //用户未读消息
      sessionKey: ""
    };
  },
  onPullDownRefresh() {
    let self = this;
    self.getData();
  },
  onShow() {
    this.getData();
    this.getTabBarLinks();
  },
  onLoad() {
    let self = this;
    common_vendor.wx$1.login({
      success(res) {
        self._post(
          "user.user/getSession",
          {
            code: res.code
          },
          (result) => {
            self.sessionKey = result.data.session_key;
          }
        );
      }
    });
  },
  methods: {
    bindMobile() {
      this.gotoPage("/pages/user/modify-phone/modify-phone");
    },
    getPhoneNumber(e) {
      var self = this;
      if (e.detail.errMsg !== "getPhoneNumber:ok") {
        return false;
      }
      common_vendor.index.showLoading({
        title: "加载中"
      });
      common_vendor.index.login({
        success(res) {
          self._post("user.user/bindMobile", {
            session_key: self.sessionKey,
            encrypted_data: e.detail.encryptedData,
            iv: e.detail.iv
          }, (result) => {
            common_vendor.index.showToast({
              title: "绑定成功"
            });
            self.detail.mobile = result.data.mobile;
          }, false, () => {
            common_vendor.index.hideLoading();
          });
        }
      });
    },
    /*获取数据*/
    getData() {
      let self = this;
      self.isloadding = true;
      self._get(
        "user.index/detail",
        {
          url: self.url
        },
        function(res) {
          if (res.data.getPhone) {
            self.gotoPage("/pages/login/bindmobile");
            return;
          }
          self.detail = res.data.userInfo;
          self.coupon = res.data.coupon;
          self.orderCount = res.data.orderCount;
          self.msgcount = res.data.msgcount;
          self.loadding = false;
          common_vendor.index.stopPullDownRefresh();
          self.getPage();
          self.isloadding = false;
        }
      );
    },
    /*获取数据*/
    getPage() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._post("user.index/center", {}, function(res) {
        self.items = res.data.page.items;
        self.setPage(res.data.page.page);
        self.loadding = false;
        common_vendor.index.hideLoading();
      });
    },
    /*设置页面*/
    setPage(page) {
      common_vendor.index.setNavigationBarTitle({
        title: page.params.name
      });
    },
    bindMobile() {
      this.gotoPage("/pages/user/modify-phone/modify-phone");
    },
    /*扫一扫核销*/
    scanQrcode: function() {
      this.gotoPage("/pages/user/scan/scan");
    },
    getPhoneNumber(e) {
      var self = this;
      if (e.detail.errMsg !== "getPhoneNumber:ok") {
        return false;
      }
      common_vendor.index.showLoading({
        title: "加载中"
      });
      common_vendor.index.login({
        success(res) {
          self._post(
            "user.user/bindMobile",
            {
              session_key: self.sessionKey,
              encrypted_data: e.detail.encryptedData,
              iv: e.detail.iv
            },
            (result) => {
              common_vendor.index.showToast({
                title: "绑定成功"
              });
              self.detail.mobile = result.data.mobile;
            },
            false,
            () => {
              common_vendor.index.hideLoading();
            }
          );
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_diy2 = common_vendor.resolveComponent("diy");
  const _component_request_loading = common_vendor.resolveComponent("request-loading");
  const _component_tabBar = common_vendor.resolveComponent("tabBar");
  (_easycom_diy2 + _component_request_loading + _component_tabBar)();
}
const _easycom_diy = () => "../../../components/diy/diy.js";
if (!Math) {
  _easycom_diy();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.detail.mobile
  }, !$data.detail.mobile ? {
    b: common_vendor.o((...args) => $options.getPhoneNumber && $options.getPhoneNumber(...args))
  } : {}, {
    c: common_vendor.p({
      diyItems: $data.items,
      userInfo: {
        detail: $data.detail,
        coupon: $data.coupon,
        orderCount: $data.orderCount,
        msgcount: $data.msgcount
      }
    }),
    d: common_vendor.p({
      loadding: $data.isloadding
    }),
    e: _ctx.theme(),
    f: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/index/index.vue"]]);
wx.createPage(MiniProgramPage);
