"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      loadding: true,
      /*是否加载完成*/
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      /*支付类别*/
      withdraw_type: 10,
      isData: false,
      agent: {},
      payType: [],
      words: {},
      /*小程序订阅消息*/
      temlIds: [],
      money: "",
      real_name: "",
      hasRealName: false,
      settlement: {}
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self.loadding = true;
      self._get(
        "user.agent/cash",
        {
          platform: self.getPlatform()
        },
        function(res) {
          self.agent = res.data.agent;
          self.words = res.data.words;
          self.payType = res.data.settlement.pay_type;
          self.settlement = res.data.settlement;
          self.agent.isData = true;
          self.temlIds = res.data.template_arr;
          if (self.agent && self.agent.real_name) {
            self.real_name = self.agent.real_name;
            self.hasRealName = true;
          }
          self.loadding = false;
          common_vendor.index.hideLoading();
        }
      );
    },
    /*切换提现方式*/
    TabType(e) {
      this.withdraw_type = e;
    },
    /*判断是否存在*/
    hasType(e) {
      if (this.payType.indexOf(e) != -1) {
        return true;
      } else {
        return false;
      }
    },
    getAll() {
      this.money = this.agent.money;
    },
    /*申请*/
    formSubmit: function(e) {
      let self = this;
      var formdata = e.detail.value;
      formdata.pay_type = self.withdraw_type;
      var data = JSON.stringify(formdata);
      let callback = function() {
        common_vendor.index.showLoading({
          title: "正在提交",
          mask: true
        });
        self._post(
          "plus.agent.cash/submit",
          {
            data
          },
          function(data2) {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "申请成功",
              duration: 2e3,
              icon: "success"
            });
            common_vendor.index.navigateBack(-1);
          }
        );
      };
      self.subMessage(self.temlIds, callback);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loadding
  }, !$data.loadding ? common_vendor.e({
    b: common_vendor.t($data.words.cash_apply.words.money.value),
    c: common_vendor.t($data.words.cash_apply.words.min_money.value + $data.settlement.min_money + "元"),
    d: $data.money,
    e: common_vendor.o(($event) => $data.money = $event.detail.value),
    f: common_vendor.t($data.words.cash_apply.words.capital.value),
    g: common_vendor.t($data.agent.money),
    h: common_vendor.o((...args) => $options.getAll && $options.getAll(...args)),
    i: $options.hasType("10")
  }, $options.hasType("10") ? common_vendor.e({
    j: common_vendor.n($data.withdraw_type == 10 ? "active" : ""),
    k: common_vendor.o(($event) => $options.TabType(10)),
    l: $data.withdraw_type == 10
  }, $data.withdraw_type == 10 ? common_vendor.e({
    m: $data.hasRealName,
    n: $data.real_name,
    o: common_vendor.o(($event) => $data.real_name = $event.detail.value),
    p: !$data.hasRealName
  }, !$data.hasRealName ? {} : {}) : {}) : {}, {
    q: $options.hasType("20")
  }, $options.hasType("20") ? common_vendor.e({
    r: common_vendor.n($data.withdraw_type == 20 ? "active" : ""),
    s: common_vendor.o(($event) => $options.TabType(20)),
    t: $data.withdraw_type == 20
  }, $data.withdraw_type == 20 ? {} : {}) : {}, {
    v: $options.hasType("30")
  }, $options.hasType("30") ? common_vendor.e({
    w: common_vendor.n($data.withdraw_type == 30 ? "active" : ""),
    x: common_vendor.o(($event) => $options.TabType(30)),
    y: $data.withdraw_type == 30
  }, $data.withdraw_type == 30 ? {} : {}) : {}, {
    z: common_vendor.t($data.words.cash_apply.words.submit.value),
    A: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args)),
    B: common_vendor.o((...args) => _ctx.formReset && _ctx.formReset(...args))
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/agent/cash/apply/apply.vue"]]);
wx.createPage(MiniProgramPage);
