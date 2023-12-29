"use strict";
const common_vendor = require("../../common/vendor.js");
const uniLoadMore = () => "../../components/uni-load-more.js";
const _sfc_main = {
  components: {
    uniLoadMore
  },
  data() {
    return {
      triggered: true,
      /*手机高度*/
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      /*状态选中*/
      state_active: -1,
      no_more: false,
      loading: true,
      /*最后一页码数*/
      last_page: 0,
      /*当前页面*/
      page: 1,
      /*每页条数*/
      list_rows: 10,
      /*顶部刷新*/
      topRefresh: false,
      /*类别选中*/
      type_active: "all",
      /*价格选中*/
      price_top: false,
      /*店铺列表*/
      shopData: [],
      /*当前页面*/
      searchtxt: "",
      keyWord: "",
      stateTab: false
    };
  },
  computed: {
    /*加载中状态*/
    loadingType() {
      if (this.loading) {
        return 1;
      } else {
        if (this.shopData.length != 0 && this.no_more) {
          return 2;
        } else {
          return 0;
        }
      }
    }
  },
  onShow() {
    this.getTabBarLinks();
  },
  mounted() {
    this.init();
    this._freshing = false;
    this.restoreData();
    this.getData();
  },
  methods: {
    /*初始化*/
    init() {
      let self = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          self.phoneHeight = res.windowHeight;
          let view = common_vendor.index.createSelectorQuery().in(self).select(".top-box");
          view.boundingClientRect((data) => {
            console.log(data);
            let h = self.phoneHeight - data.height;
            self.scrollviewHigh = h;
          }).exec();
        }
      });
    },
    /*还原初始化*/
    restoreData() {
      this.shopData = [];
      this.page = 1;
      this.no_more = false;
      this.loading = true;
      this.category_id = 0;
      this.searchtxt = "";
      this.sortType = "";
      this.sortPrice = 0;
    },
    /*类别切换*/
    tabTypeFunc(e) {
      let self = this;
      self.shopData = [];
      self.page = 1;
      self.no_more = false;
      self.loading = true;
      self.type_active = e;
      self.getData();
    },
    /*获取数据*/
    getData() {
      let self = this;
      let page = self.page;
      let list_rows = self.list_rows;
      self.loading = true;
      self._post(
        "supplier.index/list",
        {
          page: page || 1,
          list_rows,
          sortType: self.type_active,
          name: self.keyWord
        },
        (res) => {
          self.loading = false;
          self.last_page = res.data.list.last_page;
          self.shopData = self.shopData.concat(res.data.list.data);
          if (res.data.list.last_page <= 1) {
            self.no_more = true;
          } else {
            self.no_more = false;
          }
        }
      );
    },
    onRefresh() {
      if (this._freshing)
        return;
      this._freshing = true;
      this.restoreData();
      this.getData();
      setTimeout(() => {
        this.triggered = false;
        this._freshing = false;
      }, 2e3);
    },
    onRestore() {
      this.triggered = "restore";
    },
    /*搜索*/
    search() {
      let self = this;
      self.keyWord = self.searchtxt;
      self.restoreData();
      self.getData();
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
    },
    //跳转店铺首页
    goto_shop(shop_supplier_id) {
      this.gotoPage("/pages/shop/shop?shop_supplier_id=" + shop_supplier_id);
    },
    //跳转商品页面
    goto_product(product_id) {
      this.gotoPage("/pages/product/detail/detail?product_id=" + product_id);
    }
  }
};
if (!Array) {
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  const _component_tabBar = common_vendor.resolveComponent("tabBar");
  (_component_uni_load_more + _component_tabBar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.search()),
    b: $data.searchtxt,
    c: common_vendor.o(($event) => $data.searchtxt = $event.detail.value),
    d: common_vendor.n($data.type_active == "all" ? "item active" : "item"),
    e: common_vendor.o(($event) => $options.tabTypeFunc("all")),
    f: common_vendor.n($data.type_active == "sales" ? "item active" : "item"),
    g: common_vendor.o(($event) => $options.tabTypeFunc("sales")),
    h: common_vendor.n($data.type_active == "score" ? "item active" : "item"),
    i: common_vendor.o(($event) => $options.tabTypeFunc("score")),
    j: common_vendor.f($data.shopData, (item, index, i0) => {
      return common_vendor.e({
        a: item.logos,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.category_name),
        d: common_vendor.t(item.product_sales),
        e: common_vendor.t(item.fav_count),
        f: common_vendor.t(item.server_score),
        g: common_vendor.o(($event) => $options.goto_shop(item.shop_supplier_id), index),
        h: item.productList.length > 0
      }, item.productList.length > 0 ? {
        i: common_vendor.f(item.productList, (pitem, index2, i1) => {
          return {
            a: pitem.image[0].file_path,
            b: common_vendor.t(pitem.product_price),
            c: index2,
            d: common_vendor.o(($event) => $options.goto_product(pitem.product_id), index2)
          };
        }),
        j: common_vendor.n(item.productList.length < 3 ? "shop_list_body_item_product2" : "shop_list_body_item_product")
      } : {}, {
        k: index
      });
    }),
    k: $data.shopData.length == 0 && !$data.loading
  }, $data.shopData.length == 0 && !$data.loading ? {} : {
    l: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    m: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    n: $data.triggered,
    o: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args)),
    p: common_vendor.o((...args) => $options.onRefresh && $options.onRefresh(...args)),
    q: common_vendor.o((...args) => $options.onRestore && $options.onRestore(...args)),
    r: _ctx.theme(),
    s: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/shop/shop_list.vue"]]);
wx.createPage(MiniProgramPage);
