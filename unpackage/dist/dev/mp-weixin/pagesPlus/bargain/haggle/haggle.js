"use strict";
const common_vendor = require("../../../common/vendor.js");
const Popup = () => "../../../components/uni-popup.js";
const countdown = () => "../../../components/countdown/countdown.js";
const Rule = () => "./popup/Rule.js";
const share = () => "../../../components/mp-share.js";
const AppShare = () => "../../../components/app-share.js";
const _sfc_main = {
  components: {
    Popup,
    Rule,
    countdown,
    share,
    AppShare
  },
  data() {
    return {
      /*是否加载完成*/
      loadding: true,
      /*砍价任务ID*/
      bargain_task_id: 0,
      /*是否显示规则*/
      isRule: false,
      /*倒计时配置*/
      countdownConfig: {
        /*开始时间*/
        startstamp: 0,
        /*结束时间*/
        endstamp: 0,
        // /*显示类别*/
        // type: 'text',
        /*文字*/
        title: "活动剩余："
      },
      /*任务对象*/
      task: {},
      /*商品对象*/
      product: {},
      /*活动*/
      active: {},
      /*活动设置*/
      setting: {},
      /*砍价历史*/
      help_list: [],
      /*是否分享*/
      isMpShare: false,
      /*是否是自己的*/
      is_creater: false,
      /*是否已经砍过*/
      is_cut: false,
      /*是否正在提交*/
      submitting: false,
      /*是否显示弹出框*/
      isPopup: false,
      /*我的砍价*/
      my_cut_money: 0,
      /*app分享*/
      isAppShare: false,
      appParams: {
        title: "",
        summary: "",
        path: ""
      }
    };
  },
  onLoad(e) {
    this.bargain_task_id = e.bargain_task_id;
  },
  mounted() {
  },
  onShow() {
    this.submitting = false;
    this.getData();
  },
  computed: {
    /*是否允许砍价*/
    is_bargain: function() {
      if (this.is_cut == false) {
        return true;
      } else {
        return false;
      }
    },
    /*是否允许购买、砍价过程中可购买或者砍到底价，并且砍价成功可购买*/
    is_buy: function() {
      if (this.active.conditions === 0 && this.task.is_buy != 1) {
        console.log("aaaaa");
        return true;
      } else if (this.active.conditions === 1 && this.task.is_floor == 1 && this.task.is_buy != 1) {
        console.log("bbbbbb");
        return true;
      } else {
        return false;
      }
    }
  },
  /*小程序分享*/
  onShareAppMessage() {
    let self = this;
    let params = self.getShareUrlParams({
      bargain_task_id: self.bargain_task_id
    });
    return {
      title: "发现了一个好物，快来帮我砍一刀吧",
      path: "/pagesPlus/bargain/haggle/haggle?" + params
    };
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
        "plus.bargain.task/detail",
        {
          bargain_task_id: self.bargain_task_id,
          url: self.url
        },
        function(res) {
          if (res.data.active != null) {
            self.countdownConfig.startstamp = res.data.active.start_time;
          }
          self.countdownConfig.endstamp = res.data.task.end_time;
          self.is_creater = res.data.is_creater;
          self.is_cut = res.data.is_cut;
          self.task = res.data.task;
          self.active = res.data.active;
          self.product = res.data.product;
          self.setting = res.data.setting;
          self.help_list = res.data.help_list;
          self.loadding = false;
          common_vendor.index.hideLoading();
        }
      );
    },
    /*我要砍价*/
    bargainFunc() {
      console.log(1111);
      let self = this;
      self.submitting = true;
      self._post(
        "plus.bargain.task/cut",
        {
          bargain_task_id: self.bargain_task_id
        },
        function(res) {
          self.my_cut_money = res.data.cut_money;
          self.isPopup = true;
        }
      );
    },
    /*关闭弹出框*/
    hidePopupFunc() {
      this.isPopup = false;
      this.getData();
      this.submitting = false;
    },
    /*确认提交*/
    buyNow() {
      this.createdOrder();
    },
    /*规则*/
    openRule() {
      this.isRule = true;
    },
    /*关闭规则*/
    closeRule() {
      this.isRule = false;
    },
    /*跳转首页*/
    gotoHome() {
      this.gotoPage("/pages/index/index");
    },
    /*创建订单*/
    createdOrder() {
      let self = this;
      let bargain_product_id = self.product.bargain_product_id;
      let product_sku_id = self.task.product_sku_id;
      let bargain_product_sku_id = self.task.bargain_product_sku_id;
      self.gotoPage("/pages/order/confirm-order?bargain_product_id=" + bargain_product_id + "&product_sku_id=" + product_sku_id + "&bargain_product_sku_id=" + bargain_product_sku_id + "&order_type=bargain&bargain_task_id=" + self.bargain_task_id);
    },
    goback() {
      common_vendor.index.navigateBack({});
    },
    /*分享*/
    shareFunc() {
      this.isMpShare = true;
    },
    closeShare() {
      this.isMpShare = false;
    },
    //关闭分享
    closeAppShare(data) {
      this.isAppShare = false;
    },
    /*我要参与*/
    involvedFunc() {
      let url = "pagesPlus/bargain/detail/detail?bargain_product_id=" + this.product.bargain_product_id;
      this.gotoPage(url);
    }
  }
};
if (!Array) {
  const _easycom_countdown2 = common_vendor.resolveComponent("countdown");
  const _component_Rule = common_vendor.resolveComponent("Rule");
  const _component_share = common_vendor.resolveComponent("share");
  const _component_AppShare = common_vendor.resolveComponent("AppShare");
  const _component_Popup = common_vendor.resolveComponent("Popup");
  (_easycom_countdown2 + _component_Rule + _component_share + _component_AppShare + _component_Popup)();
}
const _easycom_countdown = () => "../../../components/countdown/countdown.js";
if (!Math) {
  _easycom_countdown();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loadding
  }, !$data.loadding ? common_vendor.e({
    b: common_vendor.s("height:" + _ctx.topBarTop() + "px;"),
    c: common_vendor.o((...args) => $options.goback && $options.goback(...args)),
    d: common_vendor.s(_ctx.topBarHeight() == 0 ? "" : "height:" + _ctx.topBarHeight() + "px;"),
    e: $data.task.status == 0
  }, $data.task.status == 0 ? {
    f: common_vendor.sr("countdown", "f5e352c2-0"),
    g: common_vendor.p({
      config: $data.countdownConfig
    })
  } : {}, {
    h: common_vendor.o((...args) => $options.gotoHome && $options.gotoHome(...args)),
    i: common_vendor.o((...args) => $options.openRule && $options.openRule(...args)),
    j: $data.task.user.avatarUrl,
    k: common_vendor.t($data.task.user.nickName),
    l: $data.product
  }, $data.product ? {
    m: $data.product.product.image[0].file_path,
    n: common_vendor.t($data.task.product_name),
    o: common_vendor.t($data.task.product_attr),
    p: common_vendor.t($data.product.stock),
    q: common_vendor.t($data.task.bargain_price)
  } : {}, {
    r: common_vendor.t($data.task.cut_money),
    s: common_vendor.s("width:" + $data.task.bargain_rate + "%;"),
    t: common_vendor.t($data.task.bargain_rate + "%"),
    v: common_vendor.s("left:" + $data.task.bargain_rate + "%;"),
    w: common_vendor.t($data.task.product_price),
    x: common_vendor.t($data.task.bargain_price),
    y: $data.task.status == 0 || $data.task.status == 1
  }, $data.task.status == 0 || $data.task.status == 1 ? common_vendor.e({
    z: $options.is_bargain
  }, $options.is_bargain ? {
    A: common_vendor.t($data.is_creater ? "我要砍价" : "帮好友砍一刀"),
    B: $data.submitting,
    C: common_vendor.o((...args) => $options.bargainFunc && $options.bargainFunc(...args))
  } : {}, {
    D: !$options.is_bargain && $data.task.is_floor != 1 && $data.task.is_buy != 1
  }, !$options.is_bargain && $data.task.is_floor != 1 && $data.task.is_buy != 1 ? {
    E: common_vendor.o((...args) => $options.shareFunc && $options.shareFunc(...args))
  } : {}, {
    F: $data.is_creater === true && $data.active != null
  }, $data.is_creater === true && $data.active != null ? common_vendor.e({
    G: $options.is_buy && $data.active.conditions == 0
  }, $options.is_buy && $data.active.conditions == 0 ? common_vendor.e({
    H: $data.task.is_floor == 0
  }, $data.task.is_floor == 0 ? {} : {}, {
    I: $data.task.is_floor == 1
  }, $data.task.is_floor == 1 ? {} : {}, {
    J: common_vendor.o((...args) => $options.buyNow && $options.buyNow(...args))
  }) : {}, {
    K: $options.is_buy && $data.active.conditions == 1
  }, $options.is_buy && $data.active.conditions == 1 ? {
    L: common_vendor.o((...args) => $options.buyNow && $options.buyNow(...args))
  } : {}, {
    M: $data.task.is_buy == 1
  }, $data.task.is_buy == 1 ? {} : {}) : {}, {
    N: $data.is_creater == false
  }, $data.is_creater == false ? {
    O: common_vendor.o((...args) => $options.involvedFunc && $options.involvedFunc(...args))
  } : {}) : {}, {
    P: common_vendor.f($data.help_list, (item, index, i0) => {
      return {
        a: item.user.avatarUrl,
        b: common_vendor.t(item.user.nickName),
        c: common_vendor.t(item.cut_money),
        d: item.is_creater == 0 ? 1 : "",
        e: index
      };
    }),
    Q: common_vendor.o($options.closeRule),
    R: common_vendor.p({
      isRule: $data.isRule,
      setting: $data.setting
    }),
    S: common_vendor.o($options.closeShare),
    T: common_vendor.p({
      isMpShare: $data.isMpShare
    }),
    U: common_vendor.o($options.closeAppShare),
    V: common_vendor.p({
      isAppShare: $data.isAppShare,
      appParams: $data.appParams
    }),
    W: common_vendor.t($data.my_cut_money),
    X: common_vendor.o((...args) => $options.hidePopupFunc && $options.hidePopupFunc(...args)),
    Y: common_vendor.o($options.hidePopupFunc),
    Z: common_vendor.p({
      show: $data.isPopup,
      width: 400,
      height: 300,
      padding: 0
    })
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/bargain/haggle/haggle.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
