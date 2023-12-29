"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      tableData: [],
      settings: {},
      active: -1,
      pay_type: 20,
      /*套餐id*/
      plan_id: 0,
      /*自定义金额*/
      user_money: "",
      loading: true
    };
  },
  watch: {
    user_money(val) {
      if (val != "") {
        this.active = -1;
        this.plan_id = 0;
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      self.loading = true;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._get(
        "balance.plan/index",
        {
          pay_source: self.getPlatform()
        },
        function(data) {
          self.loading = false;
          common_vendor.index.hideLoading();
          self.tableData = data.data.list;
          self.settings = data.data.settings;
        }
      );
    },
    //选择套餐
    select(index) {
      this.active = index;
      this.user_money = "";
    },
    payTypeFunc(e) {
      this.pay_type = e;
    },
    payFunc() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      if (self.active != -1) {
        self.plan_id = self.tableData[self.active]["plan_id"];
      }
      if (self.plan_id == 0 && self.user_money == "") {
        common_vendor.index.showToast({
          icon: "none",
          title: "请选择充值套餐或输入要充值的金额"
        });
        return;
      }
      self._post("balance.plan/submit", {
        plan_id: self.plan_id,
        user_money: self.user_money
        // pay_source: self.getPlatform()
      }, function(result) {
        self.gotoPage("/pages/order/cashier?order_id=" + result.data.order_id + "&order_type=40");
        common_vendor.index.hideLoading();
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loading
  }, !$data.loading ? common_vendor.e({
    b: common_vendor.f($data.tableData, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.money),
        b: item.give_money > 0
      }, item.give_money > 0 ? {
        c: common_vendor.t(item.give_money)
      } : {}, {
        d: common_vendor.n($data.active == index ? "index-head-bottom-item-active" : "index-head-bottom-item"),
        e: common_vendor.o(($event) => $options.select(index), index),
        f: index
      });
    }),
    c: $data.settings.is_plan == 1
  }, $data.settings.is_plan == 1 ? {
    d: $data.user_money,
    e: common_vendor.o(($event) => $data.user_money = $event.detail.value),
    f: common_vendor.o(($event) => $options.select(-1)),
    g: common_vendor.t($data.settings.min_money)
  } : {}, {
    h: common_vendor.t($data.settings.describe),
    i: common_vendor.o((...args) => $options.payFunc && $options.payFunc(...args)),
    j: _ctx.theme(),
    k: common_vendor.n(_ctx.theme() || "")
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/order/recharge.vue"]]);
wx.createPage(MiniProgramPage);
