"use strict";
const common_vendor = require("../../../common/vendor.js");
const uniLoadMore = () => "../../../components/uni-load-more.js";
const recharge = () => "./part/recharge.js";
const _sfc_main = {
  components: {
    uniLoadMore,
    recharge
  },
  data() {
    return {
      isPop: false,
      /*是否加载完成*/
      loadding: true,
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      /*顶部刷新*/
      topRefresh: false,
      /*手机高度*/
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      /*数据列表*/
      tableData: [],
      /*最后一页码数*/
      last_page: 0,
      /*当前页面*/
      page: 1,
      /*每页条数*/
      list_rows: 20,
      no_more: false,
      loading: true,
      points: 0,
      is_open: false,
      discount_ratio: "0",
      is_trans_balance: false
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
  onReady() {
    common_vendor.index.setNavigationBarTitle({
      title: this.points_name()
    });
  },
  mounted() {
    this.getData();
  },
  onReachBottom() {
    let self = this;
    if (self.page < self.last_page) {
      self.page++;
      self.getData();
    }
    self.no_more = true;
  },
  methods: {
    closePop(e) {
      if (e != null) {
        this.page = 1;
        this.tableData = [];
        this.getData();
      }
      this.isPop = false;
    },
    /*获取数据*/
    getData() {
      let self = this;
      let page = self.page;
      let list_rows = self.list_rows;
      self._get("points.log/index", {
        page: page || 1,
        list_rows
      }, function(data) {
        self.loading = false;
        self.points = data.data.points;
        self.discount_ratio = data.data.discount_ratio;
        self.is_open = data.data.is_open;
        self.is_trans_balance = data.data.is_trans_balance;
        self.tableData = self.tableData.concat(data.data.list.data);
        self.last_page = data.data.list.last_page;
        if (data.data.list.last_page <= 1) {
          self.no_more = true;
          return false;
        }
      });
    },
    /*跳转积分商城*/
    gotoShop() {
      this.gotoPage("/pagesPlus/points/list/list");
    }
  }
};
if (!Array) {
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  const _component_recharge = common_vendor.resolveComponent("recharge");
  (_component_uni_load_more + _component_recharge)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t(_ctx.points_name()),
    b: common_vendor.t($data.points),
    c: $data.is_trans_balance
  }, $data.is_trans_balance ? {
    d: common_vendor.o(($event) => $data.isPop = true)
  } : {}, {
    e: $data.is_open
  }, $data.is_open ? {
    f: common_vendor.t(_ctx.points_name()),
    g: common_vendor.o((...args) => $options.gotoShop && $options.gotoShop(...args))
  } : {}, {
    h: common_vendor.f($data.tableData, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(_ctx.points_name(item.describe)),
        b: common_vendor.t(item.create_time),
        c: item.value > 0
      }, item.value > 0 ? {
        d: common_vendor.t(item.value)
      } : {
        e: common_vendor.t(item.value)
      }, {
        f: index
      });
    }),
    i: $data.tableData.length == 0 && !$data.loading
  }, $data.tableData.length == 0 && !$data.loading ? {} : {
    j: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    k: common_vendor.o($options.closePop),
    l: common_vendor.p({
      isPop: $data.isPop,
      discount_ratio: $data.discount_ratio
    }),
    m: _ctx.theme(),
    n: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/points/points.vue"]]);
wx.createPage(MiniProgramPage);
