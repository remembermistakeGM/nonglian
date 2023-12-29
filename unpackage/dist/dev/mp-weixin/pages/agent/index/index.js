"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*是否加载完成*/
      loadding: true,
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      /*0：不是分销商，1：分销商申请中，2：已经是分销商*/
      is_agent: false,
      isData: false,
      agent: {},
      /*顶部背景*/
      top_background: "",
      /*基本信息*/
      info_words: {},
      words: {},
      user: {},
      titel: ""
    };
  },
  onLoad(e) {
    if (e.is_agent) {
      this.is_agent = e.is_agent;
    }
  },
  onShow() {
    common_vendor.index.showLoading({
      title: "加载中"
    });
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      self._get("user.agent/center", {}, function(data) {
        self.info_words = data.data.words;
        self.titel = data.data.words.index.title.value;
        common_vendor.index.setNavigationBarTitle({
          title: self.titel
        });
        self.is_agent = data.data.is_agent;
        self.top_background = data.data.background;
        self.agent = data.data.agent;
        self.user = data.data.user;
        self.isData = true;
        self.loadding = false;
        common_vendor.index.hideLoading();
      });
    },
    /*申请分销商*/
    applyagent() {
      this.gotoPage("/pages/agent/apply/apply");
    },
    /*去商城逛逛*/
    gotoShop() {
      this.gotoPage("/pages/index/index");
    },
    /*去提现*/
    gotoCash() {
      this.gotoPage("/pages/agent/cash/apply/apply");
    },
    goback() {
      common_vendor.index.navigateBack();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loadding
  }, !$data.loadding ? common_vendor.e({
    b: $data.top_background,
    c: $data.is_agent && $data.isData
  }, $data.is_agent && $data.isData ? common_vendor.e({
    d: $data.user.avatarUrl,
    e: $data.agent.grade_id > 0
  }, $data.agent.grade_id > 0 ? {
    f: common_vendor.t($data.agent.grade.name)
  } : {}, {
    g: common_vendor.t($data.user.nickName),
    h: common_vendor.t($data.info_words.index.words.referee.value || ""),
    i: common_vendor.t($data.agent.referee ? $data.agent.referee.nickName : "平台"),
    j: common_vendor.t($data.agent.money),
    k: common_vendor.t($data.info_words.index.words.money.value),
    l: common_vendor.t($data.agent.freeze_money),
    m: common_vendor.t($data.info_words.index.words.freeze_money.value),
    n: common_vendor.t($data.agent.total_money),
    o: common_vendor.t($data.info_words.index.words.total_money.value),
    p: common_vendor.t($data.info_words.index.words.cash.value),
    q: common_vendor.o((...args) => $options.gotoCash && $options.gotoCash(...args)),
    r: common_vendor.t($data.info_words.cash_list.title.value),
    s: common_vendor.o(($event) => _ctx.gotoPage("/pages/agent/cash/list/list")),
    t: common_vendor.t($data.info_words.order.title.value),
    v: common_vendor.o(($event) => _ctx.gotoPage("/pages/agent/order/order")),
    w: common_vendor.t($data.info_words.team.title.value),
    x: common_vendor.o(($event) => _ctx.gotoPage("/pages/agent/team/team")),
    y: common_vendor.t($data.info_words.qrcode.title.value),
    z: common_vendor.o(($event) => _ctx.gotoPage("/pages/agent/qrcode/qrcode"))
  }) : {}, {
    A: !$data.is_agent && $data.isData
  }, !$data.is_agent && $data.isData ? {
    B: common_vendor.t($data.info_words.index.words.not_agent.value),
    C: common_vendor.t($data.info_words.index.words.apply_now.value),
    D: common_vendor.o((...args) => $options.applyagent && $options.applyagent(...args))
  } : {}, {
    E: _ctx.theme(),
    F: common_vendor.n(_ctx.theme() || "")
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/agent/index/index.vue"]]);
wx.createPage(MiniProgramPage);
