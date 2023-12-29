"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  props: ["itemData", "userInfo"],
  created() {
  },
  methods: {
    /*跳转页面*/
    gotoDetail(e) {
      this.gotoPage(e.linkUrl);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.userInfo.detail
  }, $props.userInfo.detail ? common_vendor.e({
    b: common_vendor.o(($event) => _ctx.gotoPage("/pagesPlus/chat/chat_list")),
    c: $props.userInfo.msgcount && $props.userInfo.msgcount != 0
  }, $props.userInfo.msgcount && $props.userInfo.msgcount != 0 ? {
    d: common_vendor.t($props.userInfo.msgcount)
  } : {}, {
    e: $props.userInfo.detail.avatarUrl,
    f: common_vendor.t($props.userInfo.detail.nickName),
    g: $props.userInfo.detail.grade_id > 0
  }, $props.userInfo.detail.grade_id > 0 ? {
    h: common_vendor.t($props.userInfo.detail.grade.name)
  } : {}, {
    i: common_vendor.t($props.userInfo.detail.user_id),
    j: common_vendor.n("bg-base-" + $props.itemData.style.type),
    k: common_vendor.t($props.userInfo.detail.balance),
    l: common_vendor.o(($event) => _ctx.gotoPage("/pages/user/my-wallet/my-wallet")),
    m: common_vendor.t($props.userInfo.detail.points),
    n: common_vendor.t(_ctx.points_name()),
    o: common_vendor.s("padding:0 " + $props.itemData.style.padding * 2 + "rpx;"),
    p: common_vendor.o(($event) => _ctx.gotoPage("/pages/user/points/points")),
    q: common_vendor.t($props.userInfo.coupon),
    r: common_vendor.o(($event) => _ctx.gotoPage("/pages/user/my-coupon/my-coupon")),
    s: $props.itemData.style.background
  }) : {}, {
    t: $props.itemData.style.bgcolor,
    v: $props.itemData.style.paddingTop + "px " + $props.itemData.style.paddingLeft + "px " + $props.itemData.style.paddingBottom + "px " + $props.itemData.style.paddingLeft + "px"
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6cec04ce"], ["__file", "D:/workspace/p/nc/nc_app/components/diy/base/base.vue"]]);
wx.createComponent(Component);
