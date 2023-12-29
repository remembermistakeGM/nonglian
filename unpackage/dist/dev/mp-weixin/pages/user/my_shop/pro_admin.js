"use strict";
const common_vendor = require("../../../common/vendor.js");
const uniLoadMore = () => "../../../components/uni-load-more.js";
const _sfc_main = {
  components: {
    uniLoadMore
  },
  data() {
    return {
      shop_info: "",
      //店铺信息
      product_list: "",
      //商品列表
      adList: "",
      //banner列表
      dataList: "",
      shop_supplier_id: "",
      //店铺ID
      // ***********
      /*是否显示点*/
      indicatorDots: false,
      /*是否自动*/
      autoplay: true,
      /*切换时间*/
      interval: 5e3,
      /*动画过渡时间*/
      duration: 1e3,
      /*数据列表*/
      listData: [],
      //优惠券列表
      // ************
      /*顶部刷新*/
      topRefresh: false,
      /*底部加载*/
      loading: true,
      /*没有更多*/
      no_more: false,
      /*类别选中*/
      type_active: "sell",
      /*价格选中*/
      price_top: false,
      /*店铺列表*/
      shopData: [],
      /*当前页面*/
      page: 1,
      search: "",
      last_page: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0
    };
  },
  computed: {
    /*加载中状态*/
    loadingType() {
      if (this.loading) {
        return 1;
      } else {
        if (this.product_list.length != 0 && this.no_more) {
          return 2;
        } else {
          return 0;
        }
      }
    }
  },
  onLoad(option) {
    let self = this;
    console.log(option);
    self.shop_supplier_id = option.shop_supplier_id;
  },
  onShow() {
    this.init();
    this.restoreData();
    this.getData(this.type_active);
  },
  onPullDownRefresh() {
    this.restoreData();
    this.getData(this.type_active);
  },
  methods: {
    /*初始化*/
    init() {
      let self = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          self.scrollviewHigh = res.windowHeight;
        }
      });
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
      self.getData(self.type_active);
    },
    /*还原初始化*/
    restoreData() {
      this.shopData = [];
      this.product_list = [];
      this.category_id = 0;
      this.search = "";
      this.sortType = "";
      this.sortPrice = 0;
    },
    /*类别切换*/
    tabTypeFunc(e) {
      if (this.loading) {
        return;
      }
      let self = this;
      if (e != self.type_active) {
        self.product_list = [];
        self.page = 1;
        self.no_more = false;
        self.loading = true;
        self.type_active = e;
        self.getData(e);
      }
    },
    //获取数据列表
    getData(e) {
      let self = this;
      self.loading = true;
      self._post(
        "supplier.product/index",
        {
          page: self.page,
          shop_supplier_id: self.shop_supplier_id,
          type: e
        },
        (res) => {
          self.product_list = [...self.product_list, ...res.data.productList.data];
          self.last_page = res.data.productList.last_page;
          if (res.data.productList.last_page <= 1) {
            self.no_more = true;
          }
          self.shop_info = res.data.detail;
          self.adList = res.data.adList;
          self.listData = res.data.couponList;
          self.loading = false;
          common_vendor.index.hideLoading();
        }
      );
    },
    operation(id, n) {
      let self = this;
      self.loading = true;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._post(
        "supplier.product/modify",
        {
          product_status: n,
          product_id: id
        },
        (res) => {
          self.restoreData();
          self.getData(self.type_active);
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
    a: common_vendor.n($data.type_active == "sell" ? "item active" : "item"),
    b: common_vendor.o(($event) => $options.tabTypeFunc("sell")),
    c: common_vendor.n($data.type_active == "audit" ? "item active" : "item"),
    d: common_vendor.o(($event) => $options.tabTypeFunc("audit")),
    e: common_vendor.n($data.type_active == "lower" ? "item active" : "item"),
    f: common_vendor.o(($event) => $options.tabTypeFunc("lower")),
    g: !$data.loading
  }, !$data.loading ? {
    h: common_vendor.f($data.product_list, (item, index, i0) => {
      return common_vendor.e({
        a: item.product_image,
        b: common_vendor.t(item.product_name),
        c: common_vendor.t(item.product_price),
        d: common_vendor.t(item.product_stock)
      }, $data.type_active == "sell" ? {
        e: common_vendor.o(($event) => $options.operation(item.product_id, 20), index)
      } : {}, {
        f: item.add_source == 20
      }, item.add_source == 20 ? {
        g: common_vendor.o(($event) => _ctx.gotoPage("pages/user/my_shop/addProduct?product_id=" + item.product_id), index)
      } : {}, $data.type_active == "audit" ? {} : {}, $data.type_active == "lower" ? {
        h: common_vendor.o(($event) => $options.operation(item.product_id, 10), index)
      } : {}, {
        i: index
      });
    }),
    i: $data.type_active == "sell",
    j: $data.type_active == "audit",
    k: $data.type_active == "lower"
  } : {}, {
    l: $data.product_list.length == 0 && !$data.loading
  }, $data.product_list.length == 0 && !$data.loading ? {} : {
    m: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    n: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    o: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args)),
    p: common_vendor.o(($event) => _ctx.gotoPage("/pages/user/my_shop/addProduct"))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my_shop/pro_admin.vue"]]);
wx.createPage(MiniProgramPage);
