"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      /*底部加载*/
      loading: true,
      /*没有更多*/
      no_more: false,
      /*商品列表*/
      listData: [],
      /*当前页面*/
      page: 1,
      /*一页多少条*/
      list_rows: 10,
      /*选择商品列表*/
      productIds: []
    };
  },
  computed: {},
  props: ["open", "relationList"],
  watch: {
    open: function(n, o) {
      if (n != o && n) {
        this.start();
        this.productIds = this.relationList;
      }
    }
  },
  methods: {
    /*判断是否关联*/
    isrelation(e) {
      if (this.productIds.indexOf(e.product_id) != -1) {
        return true;
      } else {
        return false;
      }
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
      self._get(
        "plus.agent.product/lists",
        {
          page: page || 1,
          list_rows
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
    scrolltolowerFunc() {
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
    /*设置商品*/
    relationProduct(e) {
      let i = this.productIds.indexOf(e.product_id);
      if (i != -1) {
        this.productIds.splice(i, 1);
      } else {
        this.productIds.push(e.product_id);
      }
    },
    /*关闭*/
    closeFunc() {
      this.$emit("close", this.productIds);
    },
    /*跳转商品详情*/
    gotoProduct(e) {
      let url = "pages/product/detail/detail?product_id=" + e.product_id + "&room_id=" + this.liveRoomDetal.room_id;
      this.gotoPage(url);
    },
    /*跳转到订单*/
    gotoOrder() {
      this.$parent.exit();
      let url = "pages/order/myorder/myorder";
      this.gotoPage(url);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: !$props.open ? 1 : "",
    b: common_vendor.o((...args) => $options.closeFunc && $options.closeFunc(...args)),
    c: common_vendor.f($data.listData, (item, index, i0) => {
      return common_vendor.e({
        a: item.product.image[0].file_path,
        b: _ctx.product_active == item.product.product_id
      }, _ctx.product_active == item.product.product_id ? {} : {}, {
        c: common_vendor.t(item.product.product_name),
        d: common_vendor.t(item.agent_money),
        e: common_vendor.t(item.product.product_price),
        f: common_vendor.t($options.isrelation(item) ? "已关联" : "关联"),
        g: $options.isrelation(item) ? 1 : "",
        h: common_vendor.o(($event) => $options.relationProduct(item), index),
        i: index
      });
    }),
    d: !$props.open ? 1 : ""
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d20cbf38"], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my_shop/my_live/add/dialog/Products.vue"]]);
wx.createComponent(Component);
