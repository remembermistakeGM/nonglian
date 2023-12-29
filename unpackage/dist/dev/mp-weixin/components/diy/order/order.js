"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      orderItem: [
        { name: "待付款", url: "/pages/order/myorder?dataType=payment", pop: "payment" },
        { name: "待发货", url: "/pages/order/myorder?dataType=delivery", pop: "delivery" },
        { name: "待收货", url: "/pages/order/myorder?dataType=received", pop: "received" },
        { name: "待评价", url: "/pages/order/myorder?dataType=comment", pop: "comment" },
        { name: "退款/售后", url: "/pages/order/refund/index/index", pop: "refund" }
      ]
    };
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
  return {
    a: common_vendor.f($data.orderItem, (item, index, i0) => {
      return common_vendor.e({
        a: "/static/order/" + $props.itemData.style.type + "-" + index + ".png"
      }, $props.userInfo.orderCount ? common_vendor.e({
        b: $props.userInfo.orderCount[item.pop] != null && $props.userInfo.orderCount[item.pop] > 0
      }, $props.userInfo.orderCount[item.pop] != null && $props.userInfo.orderCount[item.pop] > 0 ? {
        c: common_vendor.t($props.userInfo.orderCount[item.pop])
      } : {}) : {}, {
        d: common_vendor.t(item.name),
        e: index,
        f: common_vendor.o(($event) => _ctx.gotoPage(item.url), index)
      });
    }),
    b: $props.userInfo.orderCount,
    c: $props.itemData.style.background,
    d: $props.itemData.style.topRadio * 2 + "rpx " + $props.itemData.style.topRadio * 2 + "rpx " + $props.itemData.style.bottomRadio * 2 + "rpx " + $props.itemData.style.bottomRadio * 2 + "rpx",
    e: $props.itemData.style.bgcolor,
    f: $props.itemData.style.paddingTop * 2 + "rpx " + $props.itemData.style.paddingLeft * 2 + "rpx " + $props.itemData.style.paddingBottom * 2 + "rpx " + $props.itemData.style.paddingLeft * 2 + "rpx"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1c44d870"], ["__file", "D:/workspace/p/nc/nc_app/components/diy/order/order.vue"]]);
wx.createComponent(Component);
