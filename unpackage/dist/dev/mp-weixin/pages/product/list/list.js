"use strict";
const common_vendor = require("../../../common/vendor.js");
const uniLoadMore = () => "../../../components/uni-load-more.js";
const _sfc_main = {
  components: {
    uniLoadMore
  },
  data() {
    return {
      isLieBiao: true,
      /*手机高度*/
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      /*顶部刷新*/
      topRefresh: false,
      /*底部加载*/
      loading: true,
      /*没有更多*/
      no_more: false,
      /*类别选中*/
      type_active: 0,
      /*价格选中*/
      price_top: false,
      /*商品列表*/
      listData: [],
      /*当前页面*/
      page: 1,
      category_id: 0,
      search: "",
      sortType: "",
      sortPrice: 0,
      list_rows: 10,
      last_page: 0
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
    this.category_id = e.category_id || 0;
    if (e.search) {
      this.search = e.search;
    }
    if (e.sortType) {
      this.sortType = e.sortType;
    }
    if (e.sortPrice) {
      this.sortPrice = e.sortPrice;
    }
  },
  mounted() {
    this.init();
    this.getData();
  },
  onPullDownRefresh() {
    this.restoreData();
    this.getData();
  },
  /** 设置分享内容*/
  onShareAppMessage() {
    return {
      title: "全部分类",
      path: "/pages/product/category?" + this.getShareUrlParams()
    };
  },
  methods: {
    searchFunc() {
      this.listData = [];
      this.page = 1;
      this.getData();
    },
    /*初始化*/
    init() {
      let _this = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          _this.phoneHeight = res.windowHeight;
          let view = common_vendor.index.createSelectorQuery().select(".top-box");
          view.boundingClientRect((data) => {
            let h = _this.phoneHeight - data.height;
            _this.scrollviewHigh = h;
          }).exec();
        }
      });
    },
    /*还原初始化*/
    restoreData() {
      this.listData = [];
      this.category_id = 0;
      this.search = "";
      this.sortType = "";
      this.sortPrice = 0;
    },
    /*类别切换*/
    tabTypeFunc(e) {
      let self2 = this;
      self2.listData = [];
      self2.page = 1;
      self2.no_more = false;
      self2.loading = true;
      if (e == 2) {
        self2.price_top = !this.price_top;
        if (self2.price_top == true) {
          self2.sortPrice = 0;
        } else {
          self2.sortPrice = 1;
        }
        self2.sortType = "price";
      } else if (e == 1) {
        self2.price_top = !this.price_top;
        self2.sortType = "sales";
      }
      self2.type_active = e;
      console.log(self2.type_active);
      self2.getData();
    },
    /*获取数据*/
    getData() {
      let self2 = this;
      let page = self2.page;
      let list_rows = self2.list_rows;
      let category_id = self2.category_id;
      let search = self2.search;
      let sortType = self2.sortType;
      let sortPrice = self2.sortPrice;
      self2.loading = true;
      self2._get("product.product/lists", {
        page: page || 1,
        category_id,
        search,
        sortType,
        sortPrice,
        list_rows
      }, function(res) {
        self2.loading = false;
        self2.listData = self2.listData.concat(res.data.list.data);
        self2.last_page = res.data.list.last_page;
        if (res.data.list.last_page <= 1) {
          self2.no_more = true;
        }
      });
    },
    /*跳转产品列表*/
    gotoList(e) {
      let url = "pages/product/detail/detail?product_id=" + e;
      this.gotoPage(url);
    },
    /*跳转搜索页面*/
    gotoSearch() {
      self.gotoPage("/pages/product/search/search");
    },
    /*可滚动视图区域到底触发*/
    scrolltolowerFunc() {
      let self2 = this;
      self2.bottomRefresh = true;
      self2.page++;
      self2.loading = true;
      if (self2.page > self2.last_page) {
        self2.loading = false;
        self2.no_more = true;
        return;
      }
      self2.getData();
    },
    //选择图标模式或者列表模式    true 为列表模式  false 为图表模式
    select_type() {
      let self2 = this;
      self2.isLieBiao = !self2.isLieBiao;
    }
  }
};
if (!Array) {
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  _component_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.searchFunc()),
    b: $data.search,
    c: common_vendor.o(($event) => $data.search = $event.detail.value),
    d: common_vendor.n($data.type_active == 0 ? "item active" : "item"),
    e: common_vendor.o(($event) => $options.tabTypeFunc(0)),
    f: common_vendor.n($data.type_active == 1 ? "item active" : "item"),
    g: common_vendor.o(($event) => $options.tabTypeFunc(1)),
    h: common_vendor.n($data.price_top && $data.type_active == 2 ? "arrow active" : "arrow"),
    i: common_vendor.n(!$data.price_top && $data.type_active == 2 ? "arrow active" : "arrow"),
    j: common_vendor.n($data.type_active == 2 ? "item active" : "item"),
    k: common_vendor.o(($event) => $options.tabTypeFunc(2)),
    l: $data.isLieBiao == true ? "/static/shop/liebiao.png" : "/static/shop/tubiao.png",
    m: common_vendor.o(($event) => $options.select_type()),
    n: common_vendor.f(3, (circle, n, i0) => {
      return {
        a: n
      };
    }),
    o: common_vendor.n($data.topRefresh ? "top-refresh open" : "top-refresh"),
    p: $data.isLieBiao == true
  }, $data.isLieBiao == true ? {
    q: common_vendor.f($data.listData, (item, index, i0) => {
      return {
        a: item.product_image,
        b: common_vendor.t(item.product_name),
        c: common_vendor.t(item.product_price),
        d: common_vendor.t(item.product_sales),
        e: common_vendor.n(index == $data.listData.length - 1 ? "noborder" : ""),
        f: index,
        g: common_vendor.o(($event) => $options.gotoList(item.product_id), index)
      };
    })
  } : {}, {
    r: $data.isLieBiao == false
  }, $data.isLieBiao == false ? {
    s: common_vendor.f($data.listData, (item, index, i0) => {
      return {
        a: item.product_image,
        b: common_vendor.t(item.product_name),
        c: common_vendor.t(item.product_sales),
        d: common_vendor.t(item.product_price),
        e: common_vendor.n(index % 2 == 0 ? "ml20 mr20" : " mr20"),
        f: index,
        g: common_vendor.o(($event) => $options.gotoList(item.product_id), index)
      };
    })
  } : {}, {
    t: $data.listData.length == 0 && !$data.loading
  }, $data.listData.length == 0 && !$data.loading ? {} : {
    v: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    w: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    x: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f1cef4ac"], ["__file", "D:/workspace/p/nc/nc_app/pages/product/list/list.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
