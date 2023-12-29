"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      showPlanView: false,
      /*是否打开充值*/
      open_plan: false,
      /*个人信息*/
      userInfo: {},
      /*礼物币名称*/
      planList: [],
      /*10余额，20微信支付*/
      payType: 20,
      choose_id: 0
    };
  },
  props: ["giftName"],
  beforeCreate() {
  },
  methods: {
    show() {
      this.showPlanView = true;
      this.getUser();
      this.getPlan();
    },
    /*请求对象*/
    getRequest() {
      let self = this;
      return self;
    },
    /*获取用户信息*/
    getUser() {
      let self = this;
      self.getRequest()._get("user.user/detail", {}, function(res) {
        self.userInfo = res.data.userInfo;
      });
    },
    /*获取礼物类别*/
    getPlan() {
      let self = this;
      self.getRequest()._get("plus.live.plan/lists", {}, function(res) {
        self.planList = res.data.list;
      });
    },
    chooseplan(item) {
      this.choose_id = item.plan_id;
    },
    /*充值*/
    submit() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self.getRequest()._post("plus.live.plan/submit", {
        plan_id: self.choose_id
      }, function(result) {
        getApp().gotoPage("/pages/order/cashier?order_id=" + result.data.order_id + "&order_type=30");
      });
    },
    /**
     * 显示失败提示框
     */
    showError(msg, callback) {
      common_vendor.index.showModal({
        title: "友情提示",
        content: msg,
        showCancel: false,
        success: function(res) {
          callback && callback();
        }
      });
    },
    /**
     * 显示失败提示框
     */
    showSuccess(msg, callback) {
      common_vendor.index.showModal({
        title: "友情提示",
        content: msg,
        showCancel: false,
        success: function(res) {
          callback && callback();
        }
      });
    },
    changeType(type) {
      this.payType = type;
    },
    close() {
      this.showPlanView = false;
      this.$emit("closePlan");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showPlanView
  }, $data.showPlanView ? {
    b: common_vendor.o((...args) => $options.close && $options.close(...args)),
    c: common_vendor.t($props.giftName),
    d: common_vendor.t($data.userInfo.gift_money),
    e: common_vendor.f($data.planList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.real_money),
        b: common_vendor.t(item.money),
        c: common_vendor.n($data.choose_id == item.plan_id ? "active_border" : "plan-cell-list"),
        d: index,
        e: common_vendor.o(($event) => $options.chooseplan(item), index)
      };
    }),
    f: common_vendor.t($props.giftName),
    g: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a28d2753"], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/live-part/livePlan.nvue"]]);
wx.createComponent(Component);
