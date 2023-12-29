"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*是否加载完成*/
      loadding: true,
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      DataList: [],
      /*当前页面*/
      page: 1,
      /*每页条数*/
      list_rows: 10
    };
  },
  mounted() {
    common_vendor.index.showLoading({
      title: "加载中"
    });
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      self._get(
        "coupon.coupon/lists",
        {
          page: self.page,
          list_rows: self.list_rows
        },
        function(res) {
          self.DataList = res.data.list;
          self.loadding = false;
          common_vendor.index.hideLoading();
        }
      );
    },
    /*查看规则*/
    lookRule(item) {
      item.rule = true;
    },
    /*关闭规则*/
    closeRule(item) {
      item.rule = false;
    },
    /*领取优惠券*/
    receive(e) {
      let self = this;
      common_vendor.index.showLoading({
        title: "领取中"
      });
      self._post(
        "user.coupon/receive",
        {
          coupon_id: e
        },
        function(res) {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "领取成功",
            duration: 2e3,
            icon: "success"
          });
        }
      );
      self.getData();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loadding
  }, !$data.loadding ? common_vendor.e({
    b: $data.DataList.length > 0
  }, $data.DataList.length > 0 ? {
    c: common_vendor.f($data.DataList, (item, index, i0) => {
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
        n: item.state.value > 0
      }, item.state.value > 0 ? {
        o: common_vendor.o(($event) => $options.receive(item.coupon_id), index)
      } : {
        p: common_vendor.t(item.state.text),
        q: common_vendor.o(() => {
        }, index)
      }, {
        r: common_vendor.n("coupon-item coupon-item-" + item.color.text),
        s: common_vendor.o(($event) => $options.lookRule(item), index),
        t: item.apply_range == 20
      }, item.apply_range == 20 ? {
        v: common_vendor.o(($event) => _ctx.gotoPage("/pages/coupon/detail?coupon_id=" + item.coupon_id + "&apply_range=" + item.apply_range), index)
      } : item.apply_range == 30 ? {
        x: common_vendor.o(($event) => _ctx.gotoPage("/pages/coupon/detail?coupon_id=" + item.coupon_id + "&apply_range=" + item.apply_range), index)
      } : {}, {
        w: item.apply_range == 30,
        y: index
      });
    })
  } : {}, {
    d: _ctx.theme(),
    e: common_vendor.n(_ctx.theme() || "")
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/coupon/coupon.vue"]]);
wx.createPage(MiniProgramPage);
