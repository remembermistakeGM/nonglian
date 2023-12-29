"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uniLoadMore = () => "../../../../../components/uni-load-more.js";
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
      /*当前类别*/
      state_active: 0,
      shop_supplier_id: ""
    };
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
  onLoad(e) {
    this.room_id = e.room_id;
    this.shop_supplier_id = e.shop_supplier_id;
    this.getData();
  },
  mounted() {
    this.init();
  },
  methods: {
    /*初始化*/
    init() {
      let _this = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          _this.scrollviewHigh = res.windowHeight;
        }
      });
    },
    /*状态切换*/
    stateFunc(e) {
      let self = this;
      if (self.state_active != e) {
        self.page = 1;
        self.loading = true;
        self.state_active = e;
        switch (e) {
          case 0:
            self.listData = [];
            self.dataType = "all";
            break;
          case 1:
            self.listData = [];
            self.dataType = "payment";
            break;
          case 2:
            self.listData = [];
            self.dataType = "delivery";
            break;
          case 3:
            self.listData = [];
            self.dataType = "received";
            break;
          case 4:
            self.listData = [];
            self.dataType = "comment";
            break;
        }
        self.getData();
      }
    },
    /*获取数据*/
    getData() {
      let self = this;
      let page = self.page;
      let list_rows = self.list_rows;
      self.loading = true;
      self._get(
        "plus.live.RoomApply/orderList",
        {
          page: page || 1,
          list_rows,
          shop_supplier_id: self.shop_supplier_id
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
    }
  }
};
if (!Array) {
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  _component_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.listData, (item, index, i0) => {
      return common_vendor.e({
        a: item.product[0].image.file_path,
        b: common_vendor.t(item.order_no),
        c: common_vendor.t(item.product[0].product_name),
        d: common_vendor.t(item.product[0].product_price),
        e: item.is_settled == 1
      }, item.is_settled == 1 ? {} : {}, {
        f: item.is_settled == 0
      }, item.is_settled == 0 ? {} : {}, {
        g: index
      });
    }),
    b: $data.listData.length == 0 && !$data.loading
  }, $data.listData.length == 0 && !$data.loading ? {} : {
    c: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    d: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    e: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-66cccfda"], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my_shop/my_live/live-order/live-order.vue"]]);
wx.createPage(MiniProgramPage);
