"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      loading: true,
      statusBarHeight: 0,
      titleBarHeight: 0,
      titleHeight: 0,
      opacity: 0,
      coupon_id: 0,
      listData: [],
      detail: {
        state: {
          value: 0,
          text: ""
        }
      }
    };
  },
  onPageScroll(e) {
    if (e.scrollTop < 100) {
      this.opacity = e.scrollTop / 100;
    } else {
      this.opacity = 1;
    }
  },
  onLoad(e) {
    this.coupon_id = e.coupon_id;
    this.apply_range = e.apply_range;
    this.GetStatusBarHeight();
  },
  onShow() {
    this.page = 1;
    this.listData = [];
    this.getData();
  },
  methods: {
    GetStatusBarHeight() {
      const SystemInfo = common_vendor.index.getSystemInfoSync();
      SystemInfo.statusBarHeight;
      this.statusBarHeight = common_vendor.index.getMenuButtonBoundingClientRect().top;
      this.titleBarHeight = common_vendor.index.getMenuButtonBoundingClientRect().height;
      this.titleHeight = this.statusBarHeight + this.titleBarHeight + 8;
    },
    getData() {
      let self = this;
      self.loading = true;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self.data_type;
      self._get("coupon.coupon/detail", {
        coupon_id: self.coupon_id
      }, function(res) {
        common_vendor.index.hideLoading();
        self.loading = false;
        self.detail = res.data.model;
        if (self.apply_range == 20) {
          self.listData = res.data.model.product;
        } else if (self.apply_range == 30) {
          self.listData = self.listData.concat(res.data.product_list.data);
          self.last_page = res.data.product_list.last_page;
          if (res.data.product_list.last_page <= 1) {
            self.no_more = true;
          }
        }
      });
    },
    receiveCoupon() {
      let self = this;
      if (self.detail.is_get == 1) {
        return false;
      }
      self._post(
        "user.coupon/receive",
        {
          coupon_id: self.detail.coupon_id
        },
        function(result) {
          common_vendor.index.showToast({
            title: "领取成功",
            icon: "success",
            mask: true,
            duration: 2e3
          });
          self.detail.is_get = 1;
          self.detail.state.text = "已领取";
        }
      );
    },
    goback() {
      common_vendor.index.navigateBack();
    }
  }
};
if (!Array) {
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  _component_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loading
  }, !$data.loading ? common_vendor.e({
    b: common_vendor.s("height:" + $data.statusBarHeight + "px;"),
    c: common_vendor.o((...args) => $options.goback && $options.goback(...args)),
    d: common_vendor.s("height:" + $data.titleBarHeight + "px;z-index:100"),
    e: common_vendor.s("height:" + $data.titleHeight + "px;opacity:" + $data.opacity + ";"),
    f: common_vendor.s("height:" + $data.statusBarHeight + "px;"),
    g: common_vendor.s("height:" + $data.titleBarHeight + " px;"),
    h: common_vendor.s("height:" + $data.titleHeight + "px;"),
    i: common_vendor.t($data.detail.supplier ? $data.detail.supplier.name : "平台通用"),
    j: common_vendor.t($data.detail.name),
    k: $data.detail.expire_type == 10
  }, $data.detail.expire_type == 10 ? {
    l: common_vendor.t($data.detail.expire_day)
  } : {}, {
    m: $data.detail.expire_type == 20
  }, $data.detail.expire_type == 20 ? {
    n: common_vendor.t($data.detail.start_time.text),
    o: common_vendor.t($data.detail.end_time.text)
  } : {}, {
    p: $data.detail.coupon_type == 10
  }, $data.detail.coupon_type == 10 ? {
    q: common_vendor.t($data.detail.reduce_price * 1)
  } : {}, {
    r: $data.detail.coupon_type == 20
  }, $data.detail.coupon_type == 20 ? {
    s: common_vendor.t($data.detail.discount / 10)
  } : {}, {
    t: common_vendor.t($data.detail.min_price > 0 ? "满" + $data.detail.min_price * 1 + "元可用" : "无门槛"),
    v: $data.detail.is_get == 0
  }, $data.detail.is_get == 0 ? {
    w: common_vendor.o(($event) => $options.receiveCoupon())
  } : {
    x: common_vendor.o(($event) => $options.receiveCoupon())
  }, {
    y: common_vendor.n("coupon-item coupon-item-" + $data.detail.color.text),
    z: _ctx.apply_range != 10
  }, _ctx.apply_range != 10 ? common_vendor.e({
    A: common_vendor.f($data.listData, (item, index, i0) => {
      return {
        a: item.product_image || "/static/default.png",
        b: common_vendor.t(item.product_name),
        c: common_vendor.t(item.product_price),
        d: index,
        e: common_vendor.o(($event) => _ctx.gotoPage("/pages/product/detail/detail?product_id=" + item.product_id), index)
      };
    }),
    B: $data.listData.length == 0 && !$data.loading
  }, $data.listData.length == 0 && !$data.loading ? {} : {
    C: common_vendor.p({
      loadingType: _ctx.loadingType
    })
  }) : {}, {
    D: _ctx.theme(),
    E: common_vendor.n(_ctx.theme() || "")
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/coupon/detail.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
