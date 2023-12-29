"use strict";
const common_vendor = require("../../../common/vendor.js");
const uniLoadMore = () => "../../../components/uni-load-more.js";
const _sfc_main = {
  components: {
    uniLoadMore
  },
  data() {
    return {
      shop_list: [],
      //店铺列表数据
      /*底部加载*/
      loading: true,
      /*没有更多*/
      no_more: false,
      //页面高度
      scrollviewHigh: "",
      //当前页
      page: 1,
      //总页数
      last_page: "",
      isfollow: ""
    };
  },
  computed: {
    /*加载中状态*/
    loadingType() {
      if (this.loading) {
        return 1;
      } else {
        if (this.shop_list.length != 0 && this.no_more) {
          return 2;
        } else {
          return 0;
        }
      }
    }
  },
  onShow() {
    this.getData();
    this.init();
  },
  methods: {
    /*初始化*/
    init() {
      let self = this;
      self.shop_list = [];
      self.page = 1;
      common_vendor.index.getSystemInfo({
        success(res) {
          self.scrollviewHigh = res.windowHeight;
        }
      });
    },
    //获取数据
    getData() {
      let self = this;
      self._post("user.Favorite/list", {
        page: self.page,
        type: 10,
        list_rows: 15
      }, (res) => {
        self.loading = false;
        self.shop_list = self.shop_list.concat(res.data.list.data);
        self.last_page = res.data.list.last_page;
        if (res.data.list.last_page <= 1) {
          self.no_more = true;
        } else {
          self.no_more = false;
        }
      });
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
  _component_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.shop_list, (item, index, i0) => {
      return common_vendor.e({
        a: item.logo,
        b: common_vendor.t(item.store_name),
        c: common_vendor.t(item.categoryName),
        d: common_vendor.t(item.product_sales),
        e: common_vendor.t(item.fav_count),
        f: common_vendor.t(item.score),
        g: common_vendor.o(($event) => $options.goto_shop(item.shop_supplier_id), index),
        h: $data.shop_list[index].productList.length > 0
      }, $data.shop_list[index].productList.length > 0 ? {
        i: common_vendor.f($data.shop_list[index].productList, (item2, index2, i1) => {
          return {
            a: item2.logo,
            b: common_vendor.t(item2.product_price > 1e3 ? item2.product_price * 1 : item2.product_price),
            c: common_vendor.t(item2.line_price > 1e3 ? item2.line_price * 1 : item2.line_price),
            d: index2,
            e: common_vendor.o(($event) => $options.goto_product(item2.product_id), index2)
          };
        }),
        j: common_vendor.n($data.shop_list[index].productList.length < 3 ? "shop_list_body_item_product2" : "shop_list_body_item_product")
      } : {}, {
        k: index
      });
    }),
    b: $data.shop_list.length == 0 && !$data.loading
  }, $data.shop_list.length == 0 && !$data.loading ? {} : {
    c: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    d: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    e: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my_collect/my_collect.vue"]]);
wx.createPage(MiniProgramPage);
