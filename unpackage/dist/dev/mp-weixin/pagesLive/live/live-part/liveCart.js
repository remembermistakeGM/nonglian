"use strict";
const common_vendor = require("../../../common/vendor.js");
const uniLoadMore = () => "../../../components/uni-load-more.js";
const _sfc_main = {
  components: {
    uniLoadMore
  },
  data() {
    return {
      popupVisible: false,
      /*当前讲解商品*/
      product_active: "",
      /*总条数*/
      total: 0,
      /*是否展示商品*/
      open_products: false,
      /*已关联商品id*/
      relationIds: [],
      /*商品列表*/
      productList: [],
      /*是否展开订单*/
      open_order: false,
      /*是否展开添加产品*/
      open_addproduct: false,
      /*没有更多*/
      no_more: false,
      /*商品列表*/
      listData: [],
      /*当前页面*/
      page: 1,
      /*一页多少条*/
      list_rows: 10,
      /*已选商品*/
      productIds: [],
      // 是否打开订单
      open_Order: false,
      loading: false
    };
  },
  props: ["isCaster", "room_id", "shop_supplier_id"],
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
  methods: {
    show(index) {
      this.popupVisible = true;
      this.getProduct();
    },
    /*请求对象*/
    getRequest() {
      let self = this;
      return self;
    },
    /*获取商品*/
    getProduct() {
      let self = this;
      self.open_addproduct = false;
      self.relationIds = [];
      common_vendor.index.showLoading({
        title: "正在加载",
        mask: true
      });
      self.getRequest()._get(
        "plus.live.RoomApply/liveproduct",
        {
          shop_supplier_id: self.shop_supplier_id
        },
        function(res) {
          common_vendor.index.hideLoading();
          if (res.data.list != null) {
            self.productList = res.data.list.data;
            for (let i = 0; i < self.productList.length; i++) {
              self.relationIds.push(self.productList[i].product_id);
            }
            self.total = res.data.list.total;
          }
        },
        false,
        function() {
          common_vendor.index.hideLoading();
        }
      );
    },
    /*添加商品*/
    addProductFunc() {
      this.open_addproduct = true;
      this.productIds = [];
      this.relationIds.forEach((item) => {
        this.productIds.push(item);
      });
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
      self.getRequest()._get(
        "plus.live.RoomApply/product_list",
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
    /*判断是否关联*/
    isrelation(e) {
      if (this.productIds.indexOf(e.product_id) != -1) {
        return true;
      } else {
        return false;
      }
    },
    /*设置商品*/
    relationProduct(e) {
      this.productIds.push(e.product_id);
    },
    /*确认商品*/
    confirmFunc() {
      let self = this;
      let e = self.productIds;
      if (e.length > 0) {
        for (let i = 0; i < e.length; i++) {
          if (self.relationIds.indexOf(e[i]) != -1) {
            e.splice(i, 1);
            i--;
          }
        }
      } else {
        self.getProduct();
        return;
      }
      if (e.length == 0) {
        self.getProduct();
        return;
      }
      self.getRequest()._post(
        "plus.live.RoomApply/addProduct",
        {
          productIds: e
        },
        function(res) {
          self.getProduct();
        }
      );
    },
    /*设置商品*/
    setProduct(item) {
      let self = this;
      common_vendor.index.showLoading({
        title: "设置中",
        mask: true
      });
      self.getRequest()._post(
        "plus.live.room/set_product",
        {
          room_id: self.room_id,
          product_id: item.product_id
        },
        function(res) {
          self.product_active = item.product_id;
          self.$emit("setProduct", item.product_id);
          self.close();
        }
      );
    },
    /*跳转商品详情*/
    gotoProduct(e) {
      let url = "/pages/product/detail/detail?product_id=" + e.product_id + "&room_id=" + this.room_id;
      this.getRequest().gotoPage(url);
    },
    openOrder() {
      this.popupVisible = false;
      this.$emit("openOrder");
    },
    close() {
      if (this.open_addproduct) {
        this.open_addproduct = false;
      } else {
        this.popupVisible = false;
      }
    }
  }
};
if (!Array) {
  const _component_cell = common_vendor.resolveComponent("cell");
  const _component_list = common_vendor.resolveComponent("list");
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  (_component_cell + _component_list + _component_uni_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.popupVisible
  }, $data.popupVisible ? common_vendor.e({
    b: common_vendor.o((...args) => $options.close && $options.close(...args)),
    c: !$data.open_addproduct
  }, !$data.open_addproduct ? common_vendor.e({
    d: $props.isCaster
  }, $props.isCaster ? {
    e: common_vendor.o((...args) => $options.addProductFunc && $options.addProductFunc(...args))
  } : {}, {
    f: common_vendor.t($data.total),
    g: common_vendor.o((...args) => $options.openOrder && $options.openOrder(...args)),
    h: common_vendor.f($data.productList, (item, index, i0) => {
      return common_vendor.e({
        a: item.image[0].file_path,
        b: common_vendor.t(item.product_name),
        c: common_vendor.t(item.product_price),
        d: $props.isCaster && $data.product_active != item.product_id
      }, $props.isCaster && $data.product_active != item.product_id ? {
        e: common_vendor.o(($event) => $options.setProduct(item), index)
      } : {}, {
        f: $data.product_active == item.product_id
      }, $data.product_active == item.product_id ? {} : {}, !$props.isCaster ? {
        g: common_vendor.o(($event) => $options.gotoProduct(item), index)
      } : {}, {
        h: index,
        i: "88c88500-1-" + i0 + ",88c88500-0"
      });
    }),
    i: !$props.isCaster
  }) : {}, {
    j: $data.open_addproduct
  }, $data.open_addproduct ? common_vendor.e({
    k: common_vendor.o(($event) => $options.confirmFunc(true)),
    l: common_vendor.f($data.listData, (item, index, i0) => {
      return common_vendor.e({
        a: item.product_image,
        b: common_vendor.t(item.product_name),
        c: common_vendor.t(item.product_price),
        d: !$options.isrelation(item)
      }, !$options.isrelation(item) ? {
        e: common_vendor.o(($event) => $options.relationProduct(item), index)
      } : {}, {
        f: $options.isrelation(item)
      }, $options.isrelation(item) ? {} : {}, {
        g: index
      });
    }),
    m: $data.listData.length == 0 && !$data.loading
  }, $data.listData.length == 0 && !$data.loading ? {} : {
    n: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    o: common_vendor.o((...args) => $options.loadmoreFunc && $options.loadmoreFunc(...args))
  }) : {}, {
    p: common_vendor.o(() => {
    })
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-88c88500"], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/live-part/liveCart.nvue"]]);
wx.createComponent(Component);
