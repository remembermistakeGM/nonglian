"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*手机高度*/
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      /*状态选中*/
      state_active: 0,
      /*列表*/
      DataList: {},
      no_more: false,
      loading: false,
      data_type: "not_use",
      supList: []
    };
  },
  mounted() {
    this.init();
    this.getData();
  },
  methods: {
    /*初始化*/
    init() {
      let self = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          self.phoneHeight = res.windowHeight;
          let view = common_vendor.index.createSelectorQuery().select(".top-tabbar");
          view.boundingClientRect((data) => {
            let h = self.phoneHeight - data.height;
            self.scrollviewHigh = h;
          }).exec();
        }
      });
    },
    /*获取数据*/
    getData() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      let data_type = self.data_type;
      self._get(
        "user.coupon/lists",
        {
          data_type
        },
        function(res) {
          common_vendor.index.hideLoading();
          self.DataList = res.data.list;
          self.getSup();
        }
      );
    },
    /* 优惠券分类 */
    getSup() {
      let self = this;
      let supList = [];
      let platformCoupon = {
        name: "平台优惠券",
        list: []
      };
      self.DataList.forEach((item, index) => {
        console.log(index);
        if (item.supplier == null) {
          platformCoupon.list.push(item);
        } else {
          if (supList == "") {
            supList.push({
              name: item.supplier.name,
              list: [item]
            });
          } else {
            let flag = true;
            supList.forEach((sup_item, sup_index) => {
              if (sup_item.name === item.supplier.name) {
                flag = false;
                sup_item.list.push(item);
              }
            });
            if (flag) {
              supList.push({
                name: item.supplier.name,
                list: [item]
              });
            }
          }
        }
      });
      console.log(supList);
      supList.push(platformCoupon);
      self.supList = supList;
    },
    /*状态切换*/
    stateFunc(e) {
      let self = this;
      if (self.state_active != e) {
        if (e == 0) {
          self.data_type = "not_use";
        }
        if (e == 1) {
          self.data_type = "is_use";
        }
        if (e == 2) {
          self.data_type = "is_expire";
        }
        self.state_active = e;
        self.getData();
      }
    },
    /*可滚动视图区域到顶触发*/
    scrolltoupperFunc() {
      console.log("滚动视图区域到顶");
    },
    /*可滚动视图区域到底触发*/
    scrolltolowerFunc() {
      console.log("滚动视图区域到底");
    },
    /*查看规则*/
    lookRule(item) {
      item.rule = true;
    },
    /*关闭规则*/
    closeRule(item) {
      item.rule = false;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.n($data.state_active == 0 ? "tab-item active" : "tab-item"),
    b: common_vendor.o(($event) => $options.stateFunc(0)),
    c: common_vendor.n($data.state_active == 1 ? "tab-item active" : "tab-item"),
    d: common_vendor.o(($event) => $options.stateFunc(1)),
    e: common_vendor.n($data.state_active == 2 ? "tab-item active" : "tab-item"),
    f: common_vendor.o(($event) => $options.stateFunc(2)),
    g: $data.DataList && $data.DataList.length > 0
  }, $data.DataList && $data.DataList.length > 0 ? {
    h: common_vendor.f($data.supList, (v, idx, i0) => {
      return common_vendor.e({
        a: v.name && v.list && v.list.length > 0
      }, v.name && v.list && v.list.length > 0 ? {
        b: common_vendor.t(v.name)
      } : {}, {
        c: common_vendor.f(v.list, (item, index, i1) => {
          return common_vendor.e({
            a: item.is_use == 1
          }, item.is_use == 1 ? {} : {}, {
            b: item.is_expire == 1
          }, item.is_expire == 1 ? {} : {}, {
            c: common_vendor.t(item.name),
            d: item.expire_type == 10
          }, item.expire_type == 10 ? {
            e: common_vendor.t(item.expire_day)
          } : {}, {
            f: item.expire_type == 20
          }, item.expire_type == 20 ? {
            g: common_vendor.t(item.start_time.text),
            h: common_vendor.t(item.end_time.text)
          } : {}, {
            i: item.coupon_type.value == 10
          }, item.coupon_type.value == 10 ? {
            j: common_vendor.t(item.reduce_price * 1)
          } : {}, {
            k: item.coupon_type.value == 20
          }, item.coupon_type.value == 20 ? {
            l: common_vendor.t(item.discount / 10)
          } : {}, {
            m: common_vendor.t(item.min_price > 0 ? "满" + item.min_price * 1 + "元可用" : "无门槛"),
            n: item.is_expire == 0 && item.is_use == 0
          }, item.is_expire == 0 && item.is_use == 0 ? common_vendor.e({
            o: item.apply_range != 10
          }, item.apply_range != 10 ? {
            p: common_vendor.o(($event) => _ctx.gotoPage("/pages/coupon/detail?coupon_id=" + item.coupon_id + "&apply_range=" + item.apply_range), index)
          } : {
            q: common_vendor.o(($event) => _ctx.gotoPage("/pages/index/index"), index)
          }) : {}, {
            r: common_vendor.n(item.is_expire == 0 && item.is_use == 0 ? "coupon-item coupon-item-" + item.color.text : "coupon-item coupon-item-gray"),
            s: item.apply_range == 20
          }, item.apply_range == 20 ? {
            t: common_vendor.o(($event) => _ctx.gotoPage("/pages/coupon/detail?coupon_id=" + item.coupon_id + "&apply_range=" + item.apply_range), index)
          } : item.apply_range == 30 ? {
            w: common_vendor.o(($event) => _ctx.gotoPage("/pages/coupon/detail?coupon_id=" + item.coupon_id + "&apply_range=" + item.apply_range), index)
          } : {}, {
            v: item.apply_range == 30,
            x: index
          });
        })
      });
    }),
    i: _ctx.index
  } : {}, {
    j: $data.loading
  }, $data.loading ? {} : {}, {
    k: $data.no_more
  }, $data.no_more ? {} : {}, {
    l: $data.DataList.length == 0 && !$data.loading
  }, $data.DataList.length == 0 && !$data.loading ? {} : {}, {
    m: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    n: common_vendor.o((...args) => $options.scrolltoupperFunc && $options.scrolltoupperFunc(...args)),
    o: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args)),
    p: _ctx.theme(),
    q: common_vendor.n(_ctx.theme())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my-coupon/my-coupon.vue"]]);
wx.createPage(MiniProgramPage);
