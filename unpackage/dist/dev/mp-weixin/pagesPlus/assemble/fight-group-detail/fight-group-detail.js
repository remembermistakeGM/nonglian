"use strict";
const common_vendor = require("../../../common/vendor.js");
const Countdown = () => "../../../components/countdown/countdown.js";
const share = () => "../../../components/mp-share.js";
const AppShare = () => "../../../components/app-share.js";
const _sfc_main = {
  components: {
    Countdown,
    share,
    AppShare
  },
  data() {
    return {
      /*是否正在加载*/
      loadding: true,
      /*拼团组ID*/
      assemble_bill_id: null,
      /*拼团组对象*/
      billData: {},
      /*商品对象*/
      productData: {},
      /*倒计时配置*/
      countdownConfig: {
        type: "text",
        /*开始时间*/
        startstamp: 0,
        /*结束时间*/
        endstamp: 0
      },
      /*是否分享*/
      isMpShare: false,
      /*还差几人*/
      dif_people: 0,
      /*是否已经参团*/
      reallyAssemble: false,
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
    this.assemble_bill_id = e.assemble_bill_id;
  },
  mounted() {
    this.getData();
  },
  /*小程序分享*/
  onShareAppMessage() {
    let self = this;
    let params = self.getShareUrlParams({
      assemble_bill_id: self.assemble_bill_id
    });
    return {
      title: "【仅限" + self.dif_people + "个名额】，快来参与拼团吧",
      path: "/pagesPlus/assemble/fight-group-detail/fight-group-detail?" + params
    };
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._get(
        "plus.assemble.bill/detail",
        {
          assemble_bill_id: self.assemble_bill_id,
          url: self.url
        },
        function(res) {
          self.billData = res.data.bill;
          self.productData = res.data.product;
          self.countdownConfig.startstamp = 0;
          self.countdownConfig.endstamp = self.billData.end_time;
          self.dif_people = self.productData.assemble_num - self.billData.billUser.length < 0 ? 0 : self.productData.assemble_num - self.billData.billUser.length;
          console.log(self.billData.billUser);
          self.reallyAssemble = self.hasAssemble(self.billData.billUser);
          self.loadding = false;
          common_vendor.index.hideLoading();
        }
      );
    },
    /*查看是否已经拼团*/
    hasAssemble(list) {
      let flag = false;
      let user_id = this.getUserId();
      for (let i = 0; i < list.length; i++) {
        if (user_id == list[i].user_id) {
          flag = true;
          break;
        }
      }
      return flag;
    },
    /*分享*/
    shareFunc() {
      let self = this;
      self.isMpShare = true;
    },
    /*关闭分享*/
    closeShare() {
      this.isMpShare = false;
    },
    //关闭分享
    closeAppShare(data) {
      this.isAppShare = false;
    },
    /*返回状态*/
    returnValFunc() {
    },
    /*去拼团*/
    gotoAssemble(e) {
      let url = "pagesPlus/assemble/detail/detail?assemble_product_id=" + e.assemble_product_id + "&assemble_bill_id=" + e.assemble_bill_id;
      this.gotoPage(url);
    }
  }
};
if (!Array) {
  const _component_Countdown = common_vendor.resolveComponent("Countdown");
  const _component_share = common_vendor.resolveComponent("share");
  const _component_AppShare = common_vendor.resolveComponent("AppShare");
  (_component_Countdown + _component_share + _component_AppShare)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loadding
  }, !$data.loadding ? common_vendor.e({
    b: $data.productData.product.image[0].file_path,
    c: common_vendor.t($data.productData.product.product_name),
    d: common_vendor.t($data.productData.assemble_num),
    e: common_vendor.t($data.productData.assembleSku[0].assemble_price),
    f: common_vendor.f($data.billData.billUser, (item, index, i0) => {
      return common_vendor.e({
        a: index == 0
      }, index == 0 ? {} : {}, {
        b: item.user.avatarUrl,
        c: index
      });
    }),
    g: common_vendor.t($data.dif_people),
    h: common_vendor.o($options.returnValFunc),
    i: common_vendor.p({
      config: $data.countdownConfig
    }),
    j: $data.billData.user.avatarUrl,
    k: common_vendor.t($data.billData.user.nickName),
    l: common_vendor.t($data.billData.create_time),
    m: !$data.reallyAssemble
  }, !$data.reallyAssemble ? {
    n: common_vendor.o(($event) => $options.gotoAssemble($data.billData))
  } : {
    o: common_vendor.o((...args) => $options.shareFunc && $options.shareFunc(...args))
  }, {
    p: common_vendor.o($options.closeShare),
    q: common_vendor.p({
      isMpShare: $data.isMpShare,
      product_id: _ctx.product_id
    }),
    r: common_vendor.o($options.closeAppShare),
    s: common_vendor.p({
      isAppShare: $data.isAppShare,
      appParams: $data.appParams
    })
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/assemble/fight-group-detail/fight-group-detail.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
