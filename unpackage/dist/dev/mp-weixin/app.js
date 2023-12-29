"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const common_utils = require("./common/utils.js");
const env_config = require("./env/config.js");
const common_onfire = require("./common/onfire.js");
const common_gotopage = require("./common/gotopage.js");
const utils_request = require("./utils/request.js");
const utils_validator = require("./utils/validator.js");
const store_index = require("./store/index.js");
require("./env/production.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/product/category.js";
  "./pages/login/login.js";
  "./pages/login/mplogin.js";
  "./pages/login/bindmobile.js";
  "./pages/cart/cart.js";
  "./pages/user/userinfo/userinfo.js";
  "./pages/product/list/list.js";
  "./pages/product/detail/detail.js";
  "./pages/order/confirm-order.js";
  "./pages/user/address/address.js";
  "./pages/user/index/index.js";
  "./pages/order/myorder.js";
  "./pages/order/order-detail.js";
  "./pages/user/my-wallet/my-wallet.js";
  "./pages/user/my-wallet/my-balance.js";
  "./pages/order/recharge.js";
  "./pages/user/address/add/add.js";
  "./pages/product/search/search.js";
  "./pages/order/evaluate/evaluate.js";
  "./pages/product/detail/look-evaluate/look-evaluate.js";
  "./pages/order/express/express.js";
  "./pages/order/refund/apply/apply.js";
  "./pages/order/refund/index/index.js";
  "./pages/order/refund/detail/detail.js";
  "./pages/user/address/edit/edit.js";
  "./components/upload/upload.js";
  "./pages/coupon/coupon.js";
  "./pages/user/my-coupon/my-coupon.js";
  "./pages/agent/index/index.js";
  "./pages/agent/apply/apply.js";
  "./pages/agent/cash/apply/apply.js";
  "./pages/agent/cash/list/list.js";
  "./pages/user/points/points.js";
  "./pages/agent/order/order.js";
  "./pages/agent/team/team.js";
  "./pages/agent/qrcode/qrcode.js";
  "./pages/store/address/address.js";
  "./pages/store/clerkorder.js";
  "./pages/diy-page/diy-page.js";
  "./pages/article/list/list.js";
  "./pages/article/detail/detail.js";
  "./pages/order/pay-success/pay-success.js";
  "./pages/user/my-bargain/my-bargain.js";
  "./pages/store/detail/detail.js";
  "./pages/login/weblogin.js";
  "./pages/order/pay-h5/pay-h5.js";
  "./pages/user/set/set.js";
  "./pages/shop/shop_list.js";
  "./pages/shop/register.js";
  "./pages/user/my_attention/my_attention.js";
  "./pages/user/my_collect/my_collect.js";
  "./pages/shop/shop.js";
  "./pages/user/my_shop/my_shop.js";
  "./pages/shop/application_status.js";
  "./pages/user/my_shop/my_shop_order.js";
  "./pages/user/my_shop/after_sale.js";
  "./pages/user/modify-phone/modify-phone.js";
  "./pages/order/deposit-pay.js";
  "./pages/user/my_shop/pro_admin.js";
  "./pages/user/my_shop/my_shop_data.js";
  "./pages/user/my_shop/my_shop_detail.js";
  "./pages/user/my_shop/my_live/notice/notice.js";
  "./pages/user/my_shop/my_live/add/add.js";
  "./pages/user/my_shop/my_live/my-live/edit.js";
  "./pages/user/my_shop/my_live/live/live.js";
  "./pages/user/my_shop/my_live/my-live/record.js";
  "./pages/user/my_shop/my_live/my-live/my-live.js";
  "./pages/user/my_shop/my_live/live-order/live-order.js";
  "./pages/login/openlogin.js";
  "./pages/order/alipay-h5/alipay-h5.js";
  "./pages/coupon/detail.js";
  "./pages/privacy/privacy.js";
  "./pages/webview/webview.js";
  "./pages/order/cashier.js";
  "./pages/user/cash/apply.js";
  "./pages/user/cash/list.js";
  "./pages/shop/index.js";
  "./pages/order/assemble-order.js";
  "./pages/user/evaluate/list.js";
  "./pages/user/my_shop/addProduct.js";
  "./pagesLive/live/index.js";
  "./pagesLive/live/live.js";
  "./pagesLive/live/live-over.js";
  "./pagesLive/live/playback.js";
  "./pagesPlus/chat/chat.js";
  "./pagesPlus/chat/chat_list.js";
  "./pagesPlus/seckill/list/list.js";
  "./pagesPlus/seckill/detail/detail.js";
  "./pagesPlus/assemble/list/list.js";
  "./pagesPlus/assemble/detail/detail.js";
  "./pagesPlus/assemble/fight-group-detail/fight-group-detail.js";
  "./pagesPlus/bargain/list/list.js";
  "./pagesPlus/bargain/detail/detail.js";
  "./pagesPlus/bargain/haggle/haggle.js";
  "./pagesPlus/signin/rule/rule.js";
  "./pagesPlus/signin/signin.js";
  "./pagesPlus/points/list/list.js";
  "./pagesPlus/points/detail/detail.js";
  "./pagesPlus/chat/supplier_chat_list.js";
  "./pagesPlus/chat/supplier_chat.js";
  "./pagesPlus/lottery/lottery.js";
  "./pagesPlus/table/table.js";
  "./pagesPlus/presale/list.js";
  "./pagesPlus/task/index.js";
  "./pagesPlus/lottery/WinningRecord.js";
  "./pagesPlus/lottery/receive.js";
  "./pagesPlus/preview/list.js";
  "./pagesPlus/chat/notice_list.js";
  "./pagesPlus/chat/notice.js";
}
const _sfc_main = {
  onLaunch: function(e) {
    console.log("App Launch");
    this.updateManager();
    this.onStartupScene(e.query);
    this.getNav();
  },
  onShow: function() {
  },
  onHide: function() {
  },
  methods: {
    isFirstEnter() {
      var firstEnter = common_vendor.index.getStorageSync("firstEnter");
      common_vendor.index.getSystemInfo({
        success(data) {
          console.log("firstEnter=" + firstEnter);
          if (data.platform == "ios" && !firstEnter) {
            console.log("---------------");
            common_vendor.index.navigateTo({
              url: "/pages/privacy/privacy"
            });
          }
        }
      });
    },
    updateManager: function() {
      const updateManager = common_vendor.index.getUpdateManager();
      updateManager.onCheckForUpdate(function(res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function(res2) {
            common_vendor.index.showModal({
              title: "更新提示",
              content: "新版本已经准备好，即将重启应用",
              showCancel: false,
              success(res22) {
                if (res22.confirm) {
                  updateManager.applyUpdate();
                }
              }
            });
          });
        }
      });
      updateManager.onUpdateFailed(function(res) {
        common_vendor.index.showModal({
          title: "更新提示",
          content: "检查到有新版本，但下载失败，请检查网络设置",
          showCancel: false
        });
      });
    },
    /**
     * 小程序启动场景
     */
    onStartupScene(query) {
      let scene = common_utils.utils.getSceneData(query);
      let refereeId = query.referee_id;
      if (refereeId > 0) {
        if (!common_vendor.index.getStorageSync("referee_id")) {
          common_vendor.index.setStorageSync("referee_id", refereeId);
        }
      }
      let uid = scene.uid;
      if (uid > 0) {
        if (!common_vendor.index.getStorageSync("referee_id")) {
          common_vendor.index.setStorageSync("referee_id", uid);
        }
      }
    },
    getNav() {
      common_vendor.index.request({
        url: this.config.app_url + "/index.php/api/index/nav",
        data: {
          app_id: this.config.app_id
        },
        success: (result) => {
          let vars = result.data && result.data.data && result.data.data.vars.data;
          let theme = result.data && result.data.data && result.data.data.theme && result.data.data.theme.theme;
          common_vendor.index.setStorageSync("TabBar", vars);
          common_vendor.index.setStorageSync("theme", theme);
        }
      });
    },
    updateWgt(wgtUrl) {
      common_vendor.index.showModal({
        title: "版本更新",
        content: "检查到有新版本，请点击更新",
        confirmText: "更新",
        showCancel: false,
        success: function(e) {
          if (e.confirm) {
            var dtask = plus.downloader.createDownload(wgtUrl, {}, function(d, status) {
              common_vendor.index.showToast({
                title: "下载完成",
                mask: false,
                duration: 1e3
              });
              if (status == 200) {
                plus.runtime.install(
                  d.filename,
                  {
                    force: true
                  },
                  function() {
                    console.log("install success...");
                    plus.nativeUI.alert(
                      "已更新至最新版本，确定后将重启应用",
                      function() {
                        plus.runtime.restart();
                      },
                      "更新提示",
                      "确定"
                    );
                  },
                  function(e2) {
                    console.log(e2);
                    console.log(d.filename);
                    common_vendor.index.showToast({
                      title: "安装失败-01",
                      mask: false,
                      duration: 1500
                    });
                  }
                );
              } else {
                common_vendor.index.showToast({
                  title: "更新失败-02",
                  mask: false,
                  duration: 1500
                });
              }
            });
            try {
              dtask.start();
              var prg = 0;
              var showLoading = plus.nativeUI.showWaiting("正在下载");
              dtask.addEventListener("statechanged", function(task, status) {
                switch (task.state) {
                  case 1:
                    showLoading.setTitle("正在下载");
                    break;
                  case 2:
                    showLoading.setTitle("已连接到服务器");
                    break;
                  case 3:
                    prg = parseInt(parseFloat(task.downloadedSize) / parseFloat(task.totalSize) * 100);
                    showLoading.setTitle("  正在下载" + prg + "%  ");
                    break;
                  case 4:
                    plus.nativeUI.closeWaiting();
                    break;
                }
              });
            } catch (err) {
              plus.nativeUI.closeWaiting();
              common_vendor.index.showToast({
                title: "更新失败-03",
                mask: false,
                duration: 1500
              });
            }
          }
        }
      });
    }
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/workspace/p/nc/nc_app/App.vue"]]);
const headerBar = () => "./components/header.js";
const requestLoading = () => "./components/jjjloading.js";
const tabBar = () => "./components/tabbar/footTabbar.js";
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.component("header-bar", headerBar);
  app.component("request-loading", requestLoading);
  app.component("tabBar", tabBar);
  app.use(store_index.store);
  app.config.globalProperties.$store = store_index.store;
  app.config.globalProperties.footTabberData = {
    active: "home"
  };
  app.config.globalProperties.$fire = new common_onfire.OnFire();
  app.config.globalProperties.config = env_config.config;
  app.config.globalProperties.websiteUrl = env_config.config.app_url;
  app.config.globalProperties.app_id = env_config.config.app_id;
  app.config.globalProperties.gotoPage = common_gotopage.gotopage;
  app.config.globalProperties.font_url = env_config.config.font_url;
  app.config.globalProperties.test = "testtesta";
  app.config.globalProperties.points_name = function(e) {
    if (!e) {
      return store_index.store.state.points_name;
    } else {
      let re = new RegExp("积分", "g");
      return e.replace(re, store_index.store.state.points_name);
    }
  };
  utils_request.requestFun(app);
  utils_validator.validator(app);
  app.config.globalProperties.theme = function() {
    return "theme" + this.$store.state.theme || "";
  };
  app.config.globalProperties.getTabBarLinks = function() {
    let vars = common_vendor.index.getStorageSync("TabBar");
    let theme = common_vendor.index.getStorageSync("theme");
    if (vars != null && vars != "") {
      this.setTabBarLinks(vars, theme);
    } else {
      common_vendor.index.request({
        url: this.config.app_url + "/index.php/api/index/nav",
        data: {
          app_id: this.config.app_id
        },
        success: (result) => {
          let vars2 = result.data.data.vars.data;
          let theme2 = result.data.data.theme.theme;
          this.$store.commit("changeTheme", theme2);
          common_vendor.index.setStorageSync("TabBar", vars2);
          common_vendor.index.setStorageSync("theme", theme2);
          this.setTabBarLinks(vars2, theme2);
        }
      });
    }
  };
  app.config.globalProperties.setTabBarLinks = function(vars, theme) {
    if (vars.is_auto == "0") {
      common_vendor.index.showTabBar();
      vars.list = [];
      let color = [
        "#ff5704",
        "#19ad57",
        "#ffcc00",
        "#1774ff",
        "#e4e4e4",
        "#c8ba97",
        "#623ceb"
      ];
      common_vendor.index.setTabBarStyle({
        color: "#333333",
        selectedColor: color[theme]
      });
      common_vendor.index.setTabBarItem({
        index: 0,
        text: "首页",
        iconPath: "/static/tabbar/home.png",
        selectedIconPath: "/static/tabbar/home_" + theme + ".png"
      });
      common_vendor.index.setTabBarItem({
        index: 1,
        text: "分类",
        iconPath: "/static/tabbar/category.png",
        selectedIconPath: "/static/tabbar/category_" + theme + ".png"
      });
      common_vendor.index.setTabBarItem({
        index: 2,
        text: "店铺",
        iconPath: "/static/tabbar/shop.png",
        selectedIconPath: "/static/tabbar/shop_" + theme + ".png"
      });
      common_vendor.index.setTabBarItem({
        index: 3,
        text: "购物车",
        iconPath: "/static/tabbar/cart.png",
        selectedIconPath: "/static/tabbar/cart_" + theme + ".png"
      });
      common_vendor.index.setTabBarItem({
        index: 4,
        text: "我的",
        iconPath: "/static/tabbar/user.png",
        selectedIconPath: "/static/tabbar/user_" + theme + ".png"
      });
    } else {
      common_vendor.index.hideTabBar();
    }
  };
  app.config.globalProperties.getThemeColor = function() {
    let theme = this.$store.state.theme;
    let color = ["#ff5704", "#19ad57", "#ffcc00", "#1774ff", "#e4e4e4", "#c8ba97", "#623ceb"];
    return color[theme];
  };
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
