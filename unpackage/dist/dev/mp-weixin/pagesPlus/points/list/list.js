"use strict";
const common_vendor = require("../../../common/vendor.js");
const uniLoadMore = () => "../../../components/uni-load-more.js";
const _sfc_main = {
  components: {
    uniLoadMore
  },
  data() {
    return {
      /*是否加载完成*/
      loading: true,
      /*数据列表*/
      listData: [],
      /*最后一页码数*/
      last_page: 0,
      /*当前页面*/
      page: 1,
      /*每页条数*/
      list_rows: 10,
      no_more: false,
      my_points: 0
    };
  },
  onReady() {
    common_vendor.index.setNavigationBarTitle({
      title: this.points_name() + "商城"
    });
  },
  onShow() {
    this.page = 1;
    this.listData = [];
    this.getData();
  },
  computed: {
    /*加载中状态*/
    loadingType() {
      if (this.loading) {
        return 1;
      } else {
        if (this.listData.length != 0 && this.no_more) {
          return 2;
        } else {
          return 0;
        }
      }
    }
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
    /*获取数据*/
    getData() {
      let self = this;
      self.loading = true;
      self._get(
        "plus.points.product/index",
        {
          page: self.page || 1,
          list_rows: self.list_rows
        },
        function(res) {
          self.loading = false;
          self.listData = self.listData.concat(res.data.list.data);
          self.my_points = res.data.points;
          self.last_page = res.data.list.last_page;
          if (res.data.list.last_page <= 1) {
            self.no_more = true;
          }
        }
      );
    },
    /*跳转产品列表*/
    gotoList(e) {
      this.gotoPage("/pagesPlus/points/detail/detail?point_product_id=" + e);
    }
  }
};
if (!Array) {
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  _component_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.my_points),
    b: common_vendor.t(_ctx.points_name()),
    c: common_vendor.t(_ctx.points_name()),
    d: common_vendor.f($data.listData, (item, index, i0) => {
      return common_vendor.e({
        a: item.product_image,
        b: common_vendor.t(item.product.product_name),
        c: common_vendor.t(item.stock),
        d: item.sku[0].point_money != 0
      }, item.sku[0].point_money != 0 ? {
        e: common_vendor.t(item.sku[0].point_money)
      } : {}, {
        f: common_vendor.t(item.sku[0].point_num),
        g: index,
        h: common_vendor.o(($event) => $options.gotoList(item.point_product_id), index)
      });
    }),
    e: common_vendor.t(_ctx.points_name()),
    f: $data.listData.length == 0 && !$data.loading
  }, $data.listData.length == 0 && !$data.loading ? {} : {
    g: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    h: _ctx.theme(),
    i: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/points/list/list.vue"]]);
wx.createPage(MiniProgramPage);
