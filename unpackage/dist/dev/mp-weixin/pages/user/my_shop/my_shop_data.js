"use strict";
const common_vendor = require("../../../common/vendor.js");
const uniLoadMore = () => "../../../components/uni-load-more.js";
const _sfc_main = {
  data() {
    return {
      order: {},
      visit: {},
      orderList: [],
      /*底部加载*/
      loadding: true,
      /*没有更多*/
      no_more: false,
      /*当前页面*/
      page: 1,
      last_page: 0
    };
  },
  components: {
    uniLoadMore
  },
  computed: {
    /*加载中状态*/
    loadingType() {
      if (this.loadding) {
        return 1;
      } else {
        if (this.orderList.length != 0 && this.no_more) {
          return 2;
        } else {
          return 0;
        }
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    /*可滚动视图区域到底触发*/
    onReachBottom() {
      let self = this;
      if (self.no_more) {
        return;
      }
      self.page++;
      if (self.page <= self.last_page) {
        self.getData();
      } else {
        self.no_more = true;
      }
    },
    //获取数据列表
    getData(e) {
      let self = this;
      let page = self.page;
      self.loadding = true;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._post("supplier.index/storedata", {
        page: page || 1
      }, (res) => {
        self.order = res.data.order;
        self.orderList = self.orderList.concat(res.data.ordersettle.data);
        self.visit = res.data.visit;
        self.last_page = res.data.ordersettle.last_page;
        if (res.data.ordersettle.last_page <= 1) {
          self.no_more = true;
        } else {
          self.no_more = false;
        }
        self.loadding = false;
        common_vendor.index.hideLoading();
      });
    },
    todetail(id) {
      this.gotoPage("/pages/user/my_shop/my_shop_detail?settled_id=" + id);
    }
  }
};
if (!Array) {
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  _component_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loadding
  }, !$data.loadding ? {
    b: common_vendor.t($data.order.order_total_price.today),
    c: common_vendor.t($data.order.order_per_price.today),
    d: common_vendor.t($data.order.order_total.today),
    e: common_vendor.t($data.order.order_user_total.today),
    f: common_vendor.t($data.order.order_refund_money.today),
    g: common_vendor.t($data.order.order_refund_total.today)
  } : {}, {
    h: !$data.loadding
  }, !$data.loadding ? {
    i: common_vendor.t($data.visit.fav_store.today),
    j: common_vendor.t($data.visit.fav_product.today),
    k: common_vendor.t($data.visit.visit_user.today),
    l: common_vendor.t($data.visit.visit_total.today)
  } : {}, {
    m: common_vendor.f($data.orderList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.orderMaster.order_no),
        b: common_vendor.o(($event) => $options.todetail(item.settled_id), index),
        c: common_vendor.t(item.pay_money),
        d: common_vendor.t(item.supplier_money),
        e: index
      };
    }),
    n: $data.orderList.length == 0 && !$data.loadding
  }, $data.orderList.length == 0 && !$data.loadding ? {} : {
    o: common_vendor.p({
      loadingType: $options.loadingType
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6f880281"], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my_shop/my_shop_data.vue"]]);
wx.createPage(MiniProgramPage);
