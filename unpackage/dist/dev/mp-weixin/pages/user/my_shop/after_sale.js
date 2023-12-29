"use strict";
const common_vendor = require("../../../common/vendor.js");
const uniLoadMore = () => "../../../components/uni-load-more.js";
const _sfc_main = {
  components: {
    uniLoadMore
  },
  data() {
    return {
      /*手机高度*/
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      /*选中状态*/
      state_active: -1,
      /*页面数据*/
      tableData: [],
      list_rows: 5,
      last_page: 0,
      page: 1,
      no_more: false,
      loading: true,
      /*顶部刷新*/
      topRefresh: false,
      shop_supplier_id: ""
    };
  },
  computed: {
    /*加载中状态*/
    loadingType() {
      if (this.loading) {
        return 1;
      } else {
        if (this.tableData.length != 0 && this.no_more) {
          return 2;
        } else {
          return 0;
        }
      }
    }
  },
  onLoad(e) {
    this.shop_supplier_id = e.shop_supplier_id;
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
    /*页面数据*/
    getData() {
      let self = this;
      self.loading = true;
      let page = self.page;
      let state = self.state_active;
      let list_rows = self.list_rows;
      self._get("user.refund/lists", {
        shop_supplier_id: self.shop_supplier_id,
        state,
        page: page || 1,
        list_rows,
        type: 2
      }, function(data) {
        self.loading = false;
        self.tableData = self.tableData.concat(data.data.list.data);
        self.last_page = data.data.list.last_page;
        if (self.last_page <= 1) {
          self.no_more = true;
          return false;
        }
      });
    },
    /*类别切换*/
    stateFunc(e) {
      let self = this;
      if (self.state_active != e) {
        self.tableData = [];
        self.loading = true;
        self.page = 1;
        self.state_active = e;
        self.getData();
      }
    },
    /*查看售后详情*/
    gotoRefundDetail(e) {
      this.gotoPage("/pages/order/refund/detail/detail?source=supplier&order_refund_id=" + e);
    },
    /*可滚动视图区域到底触发*/
    scrolltolowerFunc() {
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
    }
  }
};
if (!Array) {
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  _component_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.n($data.state_active == -1 ? "tab-item active" : "tab-item"),
    b: common_vendor.o(($event) => $options.stateFunc(-1)),
    c: common_vendor.n($data.state_active == 0 ? "tab-item active" : "tab-item"),
    d: common_vendor.o(($event) => $options.stateFunc(0)),
    e: common_vendor.f(3, (circle, n, i0) => {
      return {
        a: n
      };
    }),
    f: common_vendor.n($data.topRefresh ? "top-refresh open" : "top-refresh"),
    g: common_vendor.f($data.tableData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.create_time),
        b: common_vendor.t(item.state_text),
        c: item.orderproduct.image.file_path,
        d: common_vendor.t(item.orderproduct.product_name),
        e: common_vendor.t(item.orderproduct.line_price),
        f: common_vendor.t(item.orderproduct.total_price),
        g: common_vendor.o(($event) => $options.gotoRefundDetail(item.order_refund_id), index),
        h: index
      };
    }),
    h: $data.tableData.length == 0 && !$data.loading
  }, $data.tableData.length == 0 && !$data.loading ? {} : {
    i: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    j: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    k: common_vendor.o((...args) => _ctx.scrolltoupperFunc && _ctx.scrolltoupperFunc(...args)),
    l: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my_shop/after_sale.vue"]]);
wx.createPage(MiniProgramPage);
