"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      dataList: [],
      balance: "",
      balance_open: 1,
      cash_open: 1
    };
  },
  onShow() {
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      self.loading = true;
      self._get("balance.log/index", {}, function(res) {
        self.loading = false;
        self.dataList = res.data.list;
        self.balance = res.data.balance;
        self.balance_open = res.data.balance_open;
        self.cash_open = res.data.cash_open;
      });
    },
    gotoList(type) {
      this.gotoPage("/pages/user/my-wallet/my-balance?type=" + type);
    },
    goback() {
      common_vendor.index.navigateBack();
    },
    gotoPay() {
      this.gotoPage("/pages/order/recharge");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.s("height:" + _ctx.topBarTop() + "px;"),
    b: common_vendor.o((...args) => $options.goback && $options.goback(...args)),
    c: common_vendor.s(_ctx.topBarHeight() == 0 ? "" : "height:" + _ctx.topBarHeight() + "px;"),
    d: common_vendor.t($data.balance),
    e: $data.cash_open
  }, $data.cash_open ? {
    f: common_vendor.o(($event) => _ctx.gotoPage("/pages/user/cash/apply")),
    g: common_vendor.o(($event) => _ctx.gotoPage("/pages/user/cash/list"))
  } : {}, {
    h: common_vendor.s("height:" + (368 + _ctx.topBarHeight() * 2 + _ctx.topBarTop() * 2) + "rpx;"),
    i: $data.balance_open
  }, $data.balance_open ? {
    j: common_vendor.o((...args) => $options.gotoPay && $options.gotoPay(...args)),
    k: common_vendor.o(($event) => $options.gotoList("rechange"))
  } : {}, {
    l: common_vendor.o(($event) => $options.gotoList("all")),
    m: common_vendor.f($data.dataList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.scene.text),
        b: item.money > 0
      }, item.money > 0 ? {
        c: common_vendor.t(item.money)
      } : {
        d: common_vendor.t(item.money)
      }, {
        e: common_vendor.t(item.create_time),
        f: index
      });
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my-wallet/my-wallet.vue"]]);
wx.createPage(MiniProgramPage);
