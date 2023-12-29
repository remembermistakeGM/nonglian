"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../env/config.js");
require("../../env/production.js");
const diy = () => "../../components/diy/diy.js";
const Homepush = () => "./home-push/home-push.js";
const navBar = () => "../../components/navBar/navBar.js";
const uniLoadMore = () => "../../components/uni-load-more.js";
const searchProduct = () => "../../components/searchProduct.js";
const _sfc_main = {
  components: {
    diy,
    Homepush,
    navBar,
    uniLoadMore,
    searchProduct
  },
  data() {
    return {
      /*是否正在加载*/
      loading: false,
      background: "",
      listData: [],
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      items: [],
      /*收藏引导*/
      is_collection: false,
      /*关注*/
      is_follow: "0",
      /*是否首页推送*/
      is_homepush: false,
      /*首页推送数据*/
      homepush_data: {},
      triggered: true,
      target: 0,
      thisindex: 0,
      category_list: [],
      product_list: [],
      page: 1,
      last_page: 0,
      no_more: false,
      indexStop: 0,
      title_name: "",
      bgcolor: "",
      msgNum: 0,
      title_image: false,
      toplogo: "",
      url: "",
      jweixin: null,
      showSearch: false,
      openCategory: {
        color: "#000000",
        open: 0
      },
      is_auto: 0,
      searchStyle: {},
      searchIconTxt: "",
      title_type: "",
      rightSearch: ""
    };
  },
  watch: {
    "thisindex": function(n, o) {
      if (n != o) {
        this.category_id = this.category_list[n].category_id;
        this.toggleInit();
        if (n != 0) {
          this.getProduct();
        }
      }
    },
    "bgcolor": function() {
      const colorRgb = this.bgcolor || "#ffffff";
      const activeList = ["#ffffff", "#FFFFFF"];
      const flag = activeList.includes(colorRgb);
      this.$nextTick(() => {
        this.searchStyle = {
          // height: `${this.topBarHeight()}px`,
          color: flag ? "#ccc" : colorRgb,
          borderColor: flag ? "#ccc" : colorRgb
        };
        if (this.topBarHeight() && this.topBarHeight() > 0) {
          this.searchStyle.height = `${this.topBarHeight()}px`;
        }
        this.searchIconTxt = {
          color: flag ? "#ccc" : colorRgb
        };
        this.rightSearch = {
          borderColor: flag ? "#ccc" : colorRgb
        };
      });
    }
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
  onTabItemTap() {
  },
  onShow() {
    this.getTabBarLinks();
  },
  onLoad() {
    this._freshing = false;
    this.getData();
    this.getList();
    this.getTabbar();
  },
  onPullDownRefresh() {
    if (this.thisindex == 0) {
      this.getData();
    } else {
      this.toggleInit();
      this.getProduct();
    }
  },
  onReachBottom() {
    this.scrolltolowerFunc();
    console.log("到底了");
  },
  /*分享当前页面*/
  onShareAppMessage() {
    let self = this;
    return {
      title: self.page.params.share_title,
      path: "/pages/index/index?" + self.getShareUrlParams()
    };
  },
  methods: {
    /*获取首页分类*/
    getData() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._get("index/index", {
        url: self.url
      }, function(res) {
        let auto = common_vendor.index.getStorageSync("TabBar").is_auto && common_vendor.index.getStorageSync("TabBar").is_auto != 0;
        self.is_auto = auto;
        self.listData = res.data.list;
        self.background = res.data.background;
        self.items = res.data.items;
        self.title_name = res.data.page.params.title;
        self.bgcolor = res.data.page.style.titleBackgroundColor;
        self.msgNum = res.data.msgNum;
        self.toplogo = res.data.page.params.toplogo;
        self.setPage(res.data.page);
        self.title_type = res.data.page.params.title_type;
        self.titleTextColor = res.data.page.style.titleTextColor;
        self.openCategory = res.data.page.category;
        let isFirst = common_vendor.index.getStorageSync("isFirst");
        if (isFirst == "" && res.data.setting.collection.status == "1") {
          self.is_collection = true;
          common_vendor.index.setStorageSync("isFirst", 1);
        }
        self.is_follow = res.data.setting.officia.status;
        let homepush_name = common_vendor.index.getStorageSync("homepush_name");
        if (res.data.setting.homepush.is_open && homepush_name != res.data.setting.homepush.name) {
          self.homepush_data = res.data.setting.homepush;
          self.is_homepush = true;
          self.is_homepush = true;
        }
        common_vendor.index.hideLoading();
        self.loadding = false;
        common_vendor.index.stopPullDownRefresh();
      });
    },
    /*获取数据*/
    getList() {
      let self = this;
      self._get("product.category/index", {}, function(res) {
        self.category_list = res.data.list;
        let fistIndex = {
          name: "推荐",
          category_id: "0"
        };
        self.category_list.unshift(fistIndex);
      });
    },
    /*获取数据*/
    getProduct() {
      let self = this;
      let page = self.page;
      self.loading = true;
      self._get("product.product/lists", {
        page: page || 1,
        category_id: self.category_id,
        search: "",
        sortType: "all",
        sortPrice: 0,
        list_rows: 10
      }, function(res) {
        self.loading = false;
        common_vendor.index.stopPullDownRefresh();
        self.product_list = self.product_list.concat(res.data.list.data);
        self.last_page = res.data.list.last_page;
        if (res.data.list.last_page <= 1) {
          self.no_more = true;
        }
        if (page >= 9) {
          self.no_more = true;
        }
      });
    },
    /*可滚动视图区域到底触发*/
    scrolltolowerFunc() {
      let self = this;
      if (self.page < self.last_page) {
        self.page++;
        self.getProduct();
      }
      self.no_more = true;
    },
    /*设置页面*/
    setPage(page) {
      common_vendor.index.setNavigationBarTitle({
        title: page.params.name
      });
      let colors = "#000000";
      if (page.style.titleTextColor == "white") {
        colors = "#ffffff";
      }
      common_vendor.index.setNavigationBarColor({
        frontColor: colors,
        backgroundColor: "#ffffff"
      });
    },
    setTabBarItem(n) {
      if (n == 2) {
        console.log("订单");
        common_vendor.index.setTabBarItem({
          index: 2,
          pagePath: "/pages/order/myorder",
          text: "订单",
          iconPath: "static/order.png",
          selectedIconPath: "static/order_active.png"
        });
      }
    },
    // 滑動切换触发的事件
    toggle(e) {
      let index = e.detail.current;
      this.target = index;
      this.category_id = this.category_list[index].category_id;
      this.toggleInit();
      if (index != 0) {
        this.getProduct();
      }
    },
    toggleInit() {
      this.page = 1;
      this.last_page = 0;
      this.no_more = false;
      this.product_list = [];
    },
    //点击nav控制下面的展示
    setIndex(e) {
      this.thisindex = e;
    },
    /* 禁止手动滑动 */
    stopTouchMove() {
      return true;
    },
    /*扫一扫核销*/
    scanQrcode: function() {
      let self = this;
      common_vendor.index.scanCode({
        onlyFromCamera: true,
        success: function(res) {
          if (res.errMsg == "scanCode:ok") {
            self.gotoPage("/pages/store/clerkorder?order_no=" + res.result);
          } else {
            common_vendor.index.showToast({
              title: "扫码失败，请重试"
            });
          }
        }
      });
    },
    /* 关闭搜索 */
    closeSearch() {
      this.showSearch = false;
    },
    getTabbar() {
      let self = this;
      if (!common_vendor.index.getStorageSync("TabBar").is_auto || common_vendor.index.getStorageSync("TabBar").is_auto == 0) {
        let theme = common_vendor.index.getStorageSync("theme");
        if (theme) {
          let color = ["#ff5704", "#19ad57", "#ffcc00", "#1774ff", "#e4e4e4", "#c8ba97", "#623ceb"];
          common_vendor.index.setTabBarStyle({
            color: "#333333",
            selectedColor: color[theme]
          });
          common_vendor.index.setTabBarItem({
            index: 0,
            text: "首页",
            iconPath: "static/tabbar/home.png",
            selectedIconPath: "static/tabbar/home_" + theme + ".png"
          });
          common_vendor.index.setTabBarItem({
            index: 1,
            text: "分类",
            iconPath: "static/tabbar/category.png",
            selectedIconPath: "static/tabbar/category_" + theme + ".png"
          });
          common_vendor.index.setTabBarItem({
            index: 2,
            text: "购物车",
            iconPath: "static/tabbar/cart.png",
            selectedIconPath: "static/tabbar/cart_" + theme + ".png"
          });
          common_vendor.index.setTabBarItem({
            index: 3,
            text: "我的",
            iconPath: "static/tabbar/user.png",
            selectedIconPath: "static/tabbar/user_" + theme + ".png"
          });
        } else {
          setTimeout(function() {
            self.getTabbar();
          }, 3e3);
        }
      }
    }
  }
};
if (!Array) {
  const _easycom_navBar2 = common_vendor.resolveComponent("navBar");
  const _easycom_diy2 = common_vendor.resolveComponent("diy");
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  const _component_Homepush = common_vendor.resolveComponent("Homepush");
  const _component_searchProduct = common_vendor.resolveComponent("searchProduct");
  const _component_tabBar = common_vendor.resolveComponent("tabBar");
  (_easycom_navBar2 + _easycom_diy2 + _component_uni_load_more + _component_Homepush + _component_searchProduct + _component_tabBar)();
}
const _easycom_navBar = () => "../../components/navBar/navBar.js";
const _easycom_diy = () => "../../components/diy/diy.js";
if (!Math) {
  (_easycom_navBar + _easycom_diy)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.s("height:" + _ctx.topBarTop() + "px;"),
    b: $data.title_type == "text"
  }, $data.title_type == "text" ? {
    c: common_vendor.t($data.title_name),
    d: common_vendor.s("color:" + _ctx.titleTextColor + ";")
  } : {
    e: $data.toplogo || "/static/logo.png"
  }, {
    f: common_vendor.s("color:" + $data.bgcolor + ";"),
    g: common_vendor.s("height:" + _ctx.topBarHeight() + " px;color:" + $data.bgcolor + ";"),
    h: common_vendor.o(($event) => $data.showSearch = true),
    i: common_vendor.o((...args) => $options.scanQrcode && $options.scanQrcode(...args)),
    j: common_vendor.s(_ctx.topBarHeight() == 0 ? "" : "height:" + _ctx.topBarHeight() + "px;"),
    k: $data.openCategory.open
  }, $data.openCategory.open ? {
    l: common_vendor.o($options.setIndex),
    m: common_vendor.p({
      color: $data.openCategory.color,
      currentI: $data.thisindex,
      navList: $data.category_list
    })
  } : {}, {
    n: common_vendor.s("background-color: " + $data.bgcolor + ";"),
    o: common_vendor.s("background-color: " + $data.bgcolor + ";"),
    p: $data.thisindex == 0
  }, $data.thisindex == 0 ? {
    q: common_vendor.p({
      diyItems: $data.items
    })
  } : {}, {
    r: $data.thisindex != 0
  }, $data.thisindex != 0 ? common_vendor.e({
    s: common_vendor.f($data.product_list, (pitem, pindex, i0) => {
      return {
        a: pitem.product_image,
        b: common_vendor.t(pitem.product_name),
        c: common_vendor.t(pitem.product_sku.product_price),
        d: common_vendor.t(pitem.product_sku.line_price),
        e: pindex,
        f: common_vendor.n(pindex % 2 == 1 ? "product_item_right" : ""),
        g: common_vendor.o(($event) => _ctx.gotoPage("/pages/product/detail/detail?product_id=" + pitem.product_id), pindex)
      };
    }),
    t: $data.product_list.length == 0 && !$data.loading
  }, $data.product_list.length == 0 && !$data.loading ? {} : {
    v: common_vendor.p({
      loadingType: $options.loadingType
    })
  }) : {}, {
    w: $data.is_collection
  }, $data.is_collection ? {
    x: common_vendor.o(($event) => $data.is_collection = false),
    y: common_vendor.s("top:" + (_ctx.topBarTop() + _ctx.topBarHeight() + 10) + "px;")
  } : {}, {
    z: $data.is_follow == "1"
  }, $data.is_follow == "1" ? {
    A: common_vendor.o(($event) => $data.is_follow = 0),
    B: common_vendor.n($data.is_auto ? "is_auto" : "")
  } : {}, {
    C: $data.is_homepush
  }, $data.is_homepush ? {
    D: common_vendor.p({
      homepush_data: $data.homepush_data
    })
  } : {}, {
    E: common_vendor.o($options.closeSearch),
    F: common_vendor.p({
      isShow: $data.showSearch
    }),
    G: _ctx.theme(),
    H: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
