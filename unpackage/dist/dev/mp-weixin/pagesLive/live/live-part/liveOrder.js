"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      popupVisible: false,
      /*总条数*/
      total: 0,
      /*没有更多*/
      no_more: false,
      /*商品列表*/
      listData: [],
      /*当前页面*/
      page: 1,
      /*一页多少条*/
      list_rows: 10
    };
  },
  props: ["shop_supplier_id", "room_id"],
  methods: {
    show() {
      this.popupVisible = true;
      this.start();
    },
    /*开始*/
    start() {
      this.loading = true;
      this.no_more = false;
      this.listData = [];
      this.page = 1;
      this.list_rows = 10;
      this.getData();
    },
    /*获取数据*/
    getData() {
      let self = this;
      let page = self.page;
      let list_rows = self.list_rows;
      self.loading = true;
      getApp()._get(
        "plus.live.RoomApply/orderList",
        {
          page: page || 1,
          list_rows,
          shop_supplier_id: self.shop_supplier_id,
          room_id: self.room_id,
          pay_status: 20
        },
        function(res) {
          self.loading = false;
          self.listData = self.listData.concat(res.data.list.data);
          self.last_page = res.data.list.last_page;
          if (res.data.list.last_page <= 1) {
            self.no_more = true;
          }
        }
      );
    },
    /*可滚动视图区域到底触发*/
    loadmoreFunc() {
      let self = this;
      self.bottomRefresh = true;
      self.page++;
      self.loading = true;
      if (self.page > self.last_page) {
        self.loading = false;
        self.no_more = true;
        return;
      }
      self.getData();
    },
    close() {
      this.popupVisible = false;
      this.$emit("closeOrder");
    }
  }
};
if (!Array) {
  const _component_cell = common_vendor.resolveComponent("cell");
  const _component_list = common_vendor.resolveComponent("list");
  (_component_cell + _component_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.popupVisible
  }, $data.popupVisible ? {
    b: common_vendor.o((...args) => $options.close && $options.close(...args)),
    c: common_vendor.o((...args) => $options.close && $options.close(...args)),
    d: common_vendor.f($data.listData, (item, index, i0) => {
      return common_vendor.e({
        a: item.product[0].image.file_path,
        b: common_vendor.t(item.order_no),
        c: common_vendor.t(item.product[0].product_name),
        d: common_vendor.t(item.product[0].product_price),
        e: item.is_settled == 1
      }, item.is_settled == 1 ? {} : {}, {
        f: item.is_settled == 0
      }, item.is_settled == 0 ? {} : {}, {
        g: index,
        h: "54f9120b-1-" + i0 + ",54f9120b-0"
      });
    }),
    e: common_vendor.o(() => {
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-54f9120b"], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/live-part/liveOrder.nvue"]]);
wx.createComponent(Component);
