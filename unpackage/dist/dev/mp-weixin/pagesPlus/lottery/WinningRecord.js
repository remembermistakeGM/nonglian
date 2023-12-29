"use strict";
const common_vendor = require("../../common/vendor.js");
const uniLoadMore = () => "../../components/uni-load-more.js";
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
      type: 0
    };
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
    stateFunc(n) {
      if (this.type == n || this.loading) {
        return;
      }
      this.type = n;
      this.page = 1;
      this.listData = [];
      this.getData();
    },
    /*获取数据*/
    getData() {
      let self = this;
      self.loading = true;
      self._post(
        "plus.lottery.lottery/record",
        {
          page: self.page || 1,
          list_rows: self.list_rows,
          type: self.type
        },
        function(res) {
          self.loading = false;
          if (res.data.list.data != null) {
            self.listData = self.listData.concat(res.data.list.data);
          }
          self.last_page = res.data.list.last_page;
          if (self.last_page <= 1) {
            self.no_more = true;
          }
        }
      );
    }
  }
};
if (!Array) {
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  _component_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.n($data.type == 0 ? "tab-item active" : "tab-item"),
    b: common_vendor.o(($event) => $options.stateFunc(0)),
    c: common_vendor.n($data.type == 1 ? "tab-item active" : "tab-item"),
    d: common_vendor.o(($event) => $options.stateFunc(1)),
    e: common_vendor.n($data.type == 2 ? "tab-item active" : "tab-item"),
    f: common_vendor.o(($event) => $options.stateFunc(2)),
    g: common_vendor.f($data.listData, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.record_name),
        b: common_vendor.t(item.create_time),
        c: item.status == 0
      }, item.status == 0 ? {
        d: common_vendor.o(($event) => _ctx.gotoPage("/pagesPlus/lottery/receive?record_id=" + item.record_id), index)
      } : common_vendor.e({
        e: item.prize_type != 3
      }, item.prize_type != 3 ? {} : {}, {
        f: item.prize_type == 3 && item.delivery_status == 10
      }, item.prize_type == 3 && item.delivery_status == 10 ? {} : {}, {
        g: item.prize_type == 3 && item.delivery_status == 20
      }, item.prize_type == 3 && item.delivery_status == 20 ? {} : {}), {
        h: index
      });
    }),
    h: $data.listData.length == 0 && !$data.loading
  }, $data.listData.length == 0 && !$data.loading ? {} : {
    i: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    j: _ctx.theme(),
    k: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/lottery/WinningRecord.vue"]]);
wx.createPage(MiniProgramPage);
