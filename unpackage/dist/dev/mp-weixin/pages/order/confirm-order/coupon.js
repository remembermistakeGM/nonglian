"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*手机高度*/
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      /*是否可见*/
      Visible: false,
      /*优惠券列表*/
      datalist: {},
      /*尺寸比例*/
      ratio: 1
    };
  },
  props: ["isCoupon", "couponList"],
  onLoad() {
  },
  mounted() {
    this.init();
  },
  watch: {
    isCoupon: function(n, o) {
      if (n != o) {
        this.Visible = n;
        this.datalist = this.couponList;
        this.getHeight();
      }
    }
  },
  methods: {
    /*初始化*/
    init() {
      let self = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          self.phoneHeight = res.windowHeight;
          self.ratio = res.windowWidth / 750;
          self.getHeight();
        }
      });
    },
    /*获取高度*/
    getHeight() {
      let count = Object.keys(this.couponList).length;
      if (count > 2) {
        this.scrollviewHigh = this.phoneHeight * 0.6;
      } else {
        if (count == 1) {
          this.scrollviewHigh = 230 * this.ratio;
        } else if (count == 2) {
          this.scrollviewHigh = 460 * this.ratio;
        }
      }
    },
    /*选择优惠券*/
    selectCoupon(e) {
      this.closePopup(e);
    },
    /*关闭弹窗*/
    closePopup(e) {
      this.$emit("close", e);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.closePopup(null)),
    b: common_vendor.f($data.datalist, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.f(6, (circle, num, i1) => {
          return {
            a: num
          };
        }),
        b: common_vendor.t(item.coupon_type.text),
        c: item.coupon_type.value == 10
      }, item.coupon_type.value == 10 ? {
        d: common_vendor.t(item.reduce_price * 1)
      } : {}, {
        e: item.coupon_type.value == 20
      }, item.coupon_type.value == 20 ? {
        f: common_vendor.t(item.discount * 1)
      } : {}, {
        g: common_vendor.t(item.min_price > 0 ? "满" + item.min_price * 1 + "元可用" : "无门槛"),
        h: common_vendor.t(item.start_time.text),
        i: common_vendor.t(item.end_time.text),
        j: common_vendor.o(($event) => $options.selectCoupon(item.user_coupon_id), index),
        k: common_vendor.n("coupon-item coupon-item-" + item.color.text),
        l: index
      });
    }),
    c: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    d: common_vendor.o(($event) => $options.closePopup(0)),
    e: common_vendor.o(() => {
    }),
    f: common_vendor.n($data.Visible ? "usable-coupon open" : "usable-coupon close")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/order/confirm-order/coupon.vue"]]);
wx.createComponent(Component);
