"use strict";
const common_vendor = require("../../../../common/vendor.js");
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
  props: ["isCoupon", "couponList", "discount"],
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
        this.scrollviewHigh = this.phoneHeight * 0.5;
      } else {
        if (count == 1) {
          this.scrollviewHigh = 250 * this.ratio + 60;
        } else if (count == 2) {
          this.scrollviewHigh = 460 * this.ratio + 60;
        }
      }
    },
    /*选择优惠券*/
    selectCoupon(e, i) {
      let self = this;
      common_vendor.index.showLoading({
        title: "领取中"
      });
      self._post(
        "user.coupon/receive",
        {
          coupon_id: e.coupon_id
        },
        function(res) {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "领取成功",
            duration: 2e3,
            icon: "success"
          });
          self.datalist[i].is_receive = true;
          console.log("1", self.datalist);
        }
      );
    },
    /*关闭弹窗*/
    closePopup() {
      this.$emit("close");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args)),
    b: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args)),
    c: $props.discount.product_reduce.length > 0
  }, $props.discount.product_reduce.length > 0 ? {
    d: common_vendor.f($props.discount.product_reduce, (item, index, i0) => {
      return common_vendor.e({
        a: item.full_type == 1
      }, item.full_type == 1 ? {
        b: common_vendor.t(item.full_value)
      } : {}, {
        c: item.full_type == 2
      }, item.full_type == 2 ? {
        d: common_vendor.t(item.full_value)
      } : {}, {
        e: item.reduce_type == 1
      }, item.reduce_type == 1 ? {
        f: common_vendor.t(item.reduce_value)
      } : {}, {
        g: item.reduce_type == 2
      }, item.reduce_type == 2 ? {
        h: common_vendor.t((100 - item.reduce_value) / 10)
      } : {}, {
        i: index,
        j: item,
        k: index
      });
    })
  } : {}, {
    e: $props.discount.give_points > 0
  }, $props.discount.give_points > 0 ? {
    f: common_vendor.t(_ctx.points_name()),
    g: common_vendor.t(_ctx.points_name()),
    h: common_vendor.t($props.discount.give_points),
    i: common_vendor.t(_ctx.points_name())
  } : {}, {
    j: common_vendor.f($data.datalist, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: item.expire_type == 10
      }, item.expire_type == 10 ? {
        c: common_vendor.t(item.expire_day)
      } : {}, {
        d: item.expire_type == 20
      }, item.expire_type == 20 ? {
        e: common_vendor.t(item.start_time.text),
        f: common_vendor.t(item.end_time.text)
      } : {}, {
        g: item.coupon_type.value == 20
      }, item.coupon_type.value == 20 ? {
        h: common_vendor.t(item.max_price > 0 ? "最多抵扣" + item.max_price * 1 + "元" : "无最高抵扣限制")
      } : {}, {
        i: item.coupon_type.value == 10
      }, item.coupon_type.value == 10 ? {
        j: common_vendor.t(item.reduce_price * 1)
      } : {}, {
        k: item.coupon_type.value == 20
      }, item.coupon_type.value == 20 ? {
        l: common_vendor.t(item.discount)
      } : {}, {
        m: common_vendor.t(item.min_price > 0 ? "满" + item.min_price * 1 + "元可用" : "无门槛"),
        n: !item.is_receive
      }, !item.is_receive ? {
        o: common_vendor.o(($event) => $options.selectCoupon(item, index), index)
      } : {}, {
        p: common_vendor.n(item.is_get ? "coupon-item coupon-item-gray" : "coupon-item coupon-item-" + item.color.text),
        q: item.apply_range == 20
      }, item.apply_range == 20 ? {
        r: common_vendor.o(($event) => _ctx.gotoPage("/pages/coupon/detail?coupon_id=" + item.coupon_id + "&apply_range=" + item.apply_range), index)
      } : item.apply_range == 30 ? {
        t: common_vendor.o(($event) => _ctx.gotoPage("/pages/coupon/detail?coupon_id=" + item.coupon_id + "&apply_range=" + item.apply_range), index)
      } : {}, {
        s: item.apply_range == 30,
        v: index
      });
    }),
    k: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    l: common_vendor.o(() => {
    }),
    m: common_vendor.n($data.Visible ? "usable-coupon open" : "usable-coupon close")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-984bfd2a"], ["__file", "D:/workspace/p/nc/nc_app/pages/product/detail/popup/coupon.vue"]]);
wx.createComponent(Component);
