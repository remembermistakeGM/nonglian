"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*是否显示点*/
      indicatorDots: false,
      /*是否自动*/
      autoplay: true,
      /*切换时间*/
      interval: 5e3,
      /*动画过渡时间*/
      duration: 1e3,
      /*数据列表*/
      listData: []
    };
  },
  props: ["itemData"],
  created() {
    this.listData = this.itemData.data;
  },
  methods: {
    scroll(e) {
    },
    /**
     * 领取优惠券
     */
    receiveCoupon: function(index) {
      let self = this;
      let item = self.listData[index];
      if (item.state.value == 0) {
        return false;
      }
      self._post(
        "user.coupon/receive",
        {
          coupon_id: item.coupon_id
        },
        function(result) {
          common_vendor.index.showToast({
            title: "领取成功",
            icon: "success",
            mask: true,
            duration: 2e3
          });
          item.state.value = 0;
          item.state.text = "已领取";
        }
      );
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.listData && $data.listData.length > 0
  }, $data.listData && $data.listData.length > 0 ? common_vendor.e({
    b: $props.itemData.style.bgtype == 2
  }, $props.itemData.style.bgtype == 2 ? {
    c: $props.itemData.style.bgimage,
    d: $props.itemData.style.topRadio * 2 + "rpx",
    e: $props.itemData.style.topRadio * 2 + "rpx",
    f: $props.itemData.style.bottomRadio * 2 + "rpx",
    g: $props.itemData.style.bottomRadio * 2 + "rpx"
  } : {}, {
    h: common_vendor.f($data.listData, (coupon, index, i0) => {
      return common_vendor.e({
        a: coupon.coupon_type.value == 10
      }, coupon.coupon_type.value == 10 ? {
        b: common_vendor.t(coupon.reduce_price * 1)
      } : {}, {
        c: coupon.coupon_type.value == 20
      }, coupon.coupon_type.value == 20 ? {
        d: common_vendor.t(coupon.discount)
      } : {}, {
        e: common_vendor.t(coupon.min_price > 0 ? "满" + coupon.min_price * 1 + "元可用" : "无门槛"),
        f: coupon.apply_range == 10
      }, coupon.apply_range == 10 ? {} : {}, {
        g: coupon.apply_range == 20
      }, coupon.apply_range == 20 ? {} : {}, {
        h: coupon.apply_range == 30
      }, coupon.apply_range == 30 ? {} : {}, {
        i: coupon.state.value == 1
      }, coupon.state.value == 1 ? {
        j: common_vendor.t($props.itemData.params.btntext),
        k: common_vendor.o(($event) => $options.receiveCoupon(index), index),
        l: $props.itemData.style.btnTxtcolor,
        m: $props.itemData.style.btnRadio + "px",
        n: $props.itemData.style.btncolor
      } : {
        o: common_vendor.t(coupon.state.text),
        p: $props.itemData.style.btnTxtcolor,
        q: $props.itemData.style.btnRadio + "px",
        r: $props.itemData.style.btncolor
      }, {
        s: index
      });
    }),
    i: $props.itemData.style.pricecolor,
    j: $props.itemData.style.cillcolor,
    k: $props.itemData.style.descolor,
    l: $props.itemData.style.btncolor,
    m: $props.itemData.style.bgtype == 1 ? $props.itemData.style.background : "none",
    n: $props.itemData.style.topRadio * 2 + "rpx",
    o: $props.itemData.style.topRadio * 2 + "rpx",
    p: $props.itemData.style.bottomRadio * 2 + "rpx",
    q: $props.itemData.style.bottomRadio * 2 + "rpx",
    r: $props.itemData.style.bgcolor,
    s: $props.itemData.style.paddingLeft * 2 + "rpx",
    t: $props.itemData.style.paddingLeft * 2 + "rpx",
    v: $props.itemData.style.paddingTop * 2 + "rpx",
    w: $props.itemData.style.paddingBottom * 2 + "rpx"
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/diy/coupon/coupon.vue"]]);
wx.createComponent(Component);
