"use strict";
const common_vendor = require("../../common/vendor.js");
const common_throttle = require("../../common/throttle.js");
const spec = () => "./detail/popup/spec.js";
const categoryMaskVue = () => "./categoryMask.js";
const _sfc_main = {
  components: {
    spec,
    categoryMaskVue
  },
  data() {
    return {
      loading: true,
      searchName: "搜索商品",
      /*展示方式*/
      show_type: 3,
      style: 1,
      /*手机高度*/
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      /*数据*/
      listData: [],
      /*子类数据*/
      childlist: [],
      /*当前选中的分类*/
      select_index: 0,
      catename: "全部商品",
      productlist: [],
      page: 1,
      category_id: 0,
      tableData: [],
      isLogin: false,
      shoppingNum: 0,
      shoppingPrice: null,
      productModel: {},
      isPopup: false,
      specData: null,
      detail: null,
      isDomHeight: true,
      shoppingHeight: 0,
      searchHeight: 0,
      footerHeight: 0,
      productArr: [],
      is_auto: 0,
      url: "",
      platFormType: ""
    };
  },
  onLoad() {
    const platFormType = common_vendor.index.getSystemInfoSync().uniPlatform;
    this.platFormType = platFormType;
    console.log(this.platFormType, "平台类型");
  },
  onShow() {
    let tabBarObj = common_vendor.index.getStorageSync("TabBar");
    if (tabBarObj) {
      this.is_auto = tabBarObj.is_auto;
    }
    this.getTabBarLinks();
  },
  mounted() {
    this.init();
    this.getData();
  },
  computed: {
    /*加载中状态*/
    loadingType() {
      if (this.loading) {
        return 1;
      } else {
        if (this.productlist.length != 0 && this.no_more) {
          return 2;
        } else {
          return 0;
        }
      }
    }
  },
  /**
   * 设置分享内容
   */
  onShareAppMessage() {
    let self = this;
    return {
      title: self.templet.share_title,
      path: "/pages/product/category?" + self.getShareUrlParams()
    };
  },
  methods: {
    lookProduct() {
      this.$refs.categoryMaskRef.open();
    },
    isBuyFast() {
      if (this.isLogin) {
        if (this.isLogin && (this.show_type == 10 && this.style == 4) || this.show_type == 20 && this.style == 3) {
          let height = this.phoneHeight - this.searchHeight - this.shoppingHeight;
          if (this.is_auto == 1) {
            this.scrollviewHigh = height;
          } else {
            this.scrollviewHigh = height;
          }
          return true;
        }
      }
      this.scrollviewHigh = this.phoneHeight - this.searchHeight;
      return false;
    },
    showTwo() {
      if (this.show_type == 20 && (this.style == 2 || this.style == 3)) {
        return true;
      }
      if (this.show_type == 10 && this.style == 2) {
        return true;
      }
      return false;
    },
    /*初始化*/
    init() {
      let self = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          self.phoneHeight = res.windowHeight;
          let view = common_vendor.index.createSelectorQuery().select("#searchBox");
          view.boundingClientRect((data) => {
            self.searchHeight = data.height || 0;
          }).exec();
          let shoppingView = common_vendor.index.createSelectorQuery().select("#emptyShopping");
          if (shoppingView) {
            shoppingView.boundingClientRect((data) => {
              if (data && data.height) {
                self.shoppingHeight = data.height;
              }
            }).exec();
          }
          let footBottomView = common_vendor.index.createSelectorQuery().select("#footBottom");
          if (footBottomView) {
            footBottomView.boundingClientRect((data) => {
              if (data && data.height) {
                self.footerHeight = data.height;
              }
            }).exec();
          }
          self.isDomHeight = false;
        }
      });
    },
    /*判断是否有图片*/
    hasImages(e) {
      if (e.images != null && e.images.file_path != null) {
        return e.images.file_path;
      } else {
        return "";
      }
    },
    /*获取数据*/
    getData() {
      let self = this;
      self.loading = true;
      self._get("product.category/index", {}, function(res) {
        self.listData = self.listData.concat(res.data.list);
        self.show_type = res.data.template.category_style;
        self.style = res.data.template.wind_style;
        if (self.style == 2) {
          self.getProduct();
        } else if (self.show_type == 10 && self.style == 4 || self.show_type == 20 && self.style == 3) {
          self.getProduct();
          self.getShoppingNum();
        }
        if (self.listData[0].child) {
          self.childlist = self.listData[0].child;
          self.changeCategory(self.childlist[0].category_id);
        }
        self.background = res.data.background;
        self.loading = false;
      });
    },
    changeCategory(e) {
      this.category_id = e;
      this.productlist = [];
      this.page = 1;
      this.getProduct();
    },
    getCheckedIds() {
      let self = this;
      let arrIds = [];
      self.productArr.forEach((item) => {
        arrIds.push(`${item.cart_id}`);
      });
      return arrIds;
    },
    /*去结算*/
    Submit() {
      let arrIds = this.getCheckedIds();
      if (arrIds.length == 0) {
        common_vendor.index.showToast({
          title: "请选择商品",
          icon: "none"
        });
        return false;
      }
      this.gotoPage("/pages/order/confirm-order?order_type=cart&cart_ids=" + arrIds);
    },
    /* 获取购物车数量 */
    getShoppingNum() {
      let self = this;
      self._post("product.Category/lists", {}, function(res) {
        const {
          data: { productList }
        } = res;
        self.isLogin = false;
        if (productList) {
          self.isLogin = true;
          self.tableData = productList;
          let total_num = 0;
          let totalPrice = 0;
          let productArr = [];
          if (productList && productList.length > 0) {
            productList.forEach((v) => {
              if (v.productList && v.productList.length > 0) {
                v.productList.forEach((item) => {
                  productArr.push(item);
                  total_num = total_num + item.total_num;
                  totalPrice = totalPrice + parseFloat(item.total_num) * parseFloat(item.product_price);
                });
              }
            });
          }
          self.productArr = productArr;
          self.shoppingNum = total_num;
          self.shoppingPrice = totalPrice.toFixed(2);
        }
      });
    },
    /* 添加购物车初始化 */
    addShopping(item) {
      if (item.spec_type == 20) {
        this.getSpecData(item.product_id);
      } else {
        this.addSingleSpec(item.product_id);
      }
    },
    /* 单规格商品加入购物车 */
    addSingleSpec(product_id) {
      let self = this;
      self._post(
        "order.cart/add",
        {
          product_id,
          total_num: 1,
          spec_sku_id: 0
        },
        function(res) {
          self.getShoppingNum();
        }
      );
    },
    /* 获取多规格商品 */
    getSpecData(product_id) {
      let self = this;
      self._get(
        "product.product/detail",
        {
          product_id,
          url: self.url,
          visitcode: self.getVisitcode()
        },
        function(res) {
          if (res.data.specData) {
            self.isPopup = false;
            self.detail = res.data.detail;
            self.specData = res.data.specData;
            self.initSpecData(res.data.specData);
          } else {
            common_vendor.index.showToast({
              title: "暂无规格，请于后台添加!",
              mask: false,
              duration: 1500,
              icon: "none"
            });
          }
        }
      );
    },
    /* 初始化规格弹窗 */
    initMaskPopup() {
      let obj = {
        specData: this.specData,
        detail: this.detail,
        productSpecArr: this.specData != null ? new Array(this.specData.spec_attr.length) : [],
        show_sku: {
          sku_image: "",
          price: 0,
          product_sku_id: 0,
          line_price: 0,
          stock: 0,
          product_sku_id: 0,
          sum: 1
        },
        plus_sku: null,
        type: "card",
        plus_name: ""
      };
      this.productModel = obj;
      this.isPopup = true;
    },
    /*初始化多规格商品*/
    initSpecData(data) {
      for (let i in data.spec_attr) {
        for (let j in data.spec_attr[i].spec_items) {
          data.spec_attr[i].spec_items[j].checked = false;
        }
      }
      this.specData = data;
      this.initMaskPopup();
    },
    closePopup() {
      this.isPopup = false;
      this.getShoppingNum();
    },
    getProduct() {
      let self = this;
      let page = self.page;
      let category_id = self.category_id;
      self.sortType;
      self.sortPrice;
      self.loading = true;
      self._get(
        "product.product/lists",
        {
          page: page || 1,
          category_id,
          search: "",
          sortType: "",
          sortPrice: "",
          list_rows: 20
        },
        function(res) {
          self.loading = false;
          self.productlist = self.productlist.concat(res.data.list.data);
          self.last_page = res.data.list.last_page;
          if (res.data.list.last_page <= 1) {
            self.no_more = true;
          }
        }
      );
    },
    /*选择分类*/
    selectCategory(e) {
      common_throttle.throttle(() => {
        if (this.show_type == 10) {
          this.select_index = e;
          this.catename = this.listData[this.select_index].name;
          this.changeCategory(this.listData[this.select_index].category_id);
        } else {
          if (this.listData[e].child) {
            this.childlist = this.listData[e].child;
            this.select_index = e;
            this.catename = this.listData[this.select_index].name;
            this.changeCategory(this.childlist[0].category_id);
          }
        }
      });
    },
    hasSelect() {
    },
    /*跳转产品列表*/
    gotoList(e) {
      let category_id = e;
      let sortType = "all";
      let search = "";
      let sortPrice = 0;
      this.gotoPage(
        "/pages/product/list/list?category_id=" + category_id + "&sortType=" + sortType + "&search=" + search + "&sortPrice=" + sortPrice
      );
    },
    wxGetUserInfo: function(res) {
      if (!res.detail.iv) {
        common_vendor.index.showToast({
          title: "您取消了授权,登录失败",
          icon: "none"
        });
        return false;
      }
    },
    /*跳转搜索页面*/
    gotoSearch() {
      this.gotoPage("/pages/product/search/search");
    }
  }
};
if (!Array) {
  const _component_categoryMaskVue = common_vendor.resolveComponent("categoryMaskVue");
  const _component_tabBar = common_vendor.resolveComponent("tabBar");
  const _component_spec = common_vendor.resolveComponent("spec");
  (_component_categoryMaskVue + _component_tabBar + _component_spec)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.searchName),
    b: common_vendor.o((...args) => $options.gotoSearch && $options.gotoSearch(...args)),
    c: common_vendor.s(_ctx.topBarHeight() == 0 ? "" : "height:" + _ctx.topBarHeight() + "px;padding-top:" + _ctx.topBarTop() + "px"),
    d: $data.show_type == 10 && $data.style == 3
  }, $data.show_type == 10 && $data.style == 3 ? {
    e: common_vendor.f($data.listData, (item, index, i0) => {
      return {
        a: $options.hasImages(item),
        b: common_vendor.t(item.name),
        c: index,
        d: common_vendor.o(($event) => $options.gotoList(item.category_id), index)
      };
    }),
    f: common_vendor.s("height:" + $data.scrollviewHigh + "px;")
  } : {}, {
    g: $data.show_type == 20 && ($data.style == 1 || $data.style == 2 || $data.style == 3) || $data.show_type == 10 && ($data.style == 1 || $data.style == 2 || $data.style == 4)
  }, $data.show_type == 20 && ($data.style == 1 || $data.style == 2 || $data.style == 3) || $data.show_type == 10 && ($data.style == 1 || $data.style == 2 || $data.style == 4) ? common_vendor.e({
    h: $options.showTwo()
  }, $options.showTwo() ? {
    i: common_vendor.f($data.listData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n($data.select_index == index ? "item active" : "item"),
        c: index,
        d: common_vendor.o(($event) => $options.selectCategory(index), index)
      };
    }),
    j: $options.isBuyFast() && $data.is_auto == 0 ? 1 : "",
    k: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    l: $options.isBuyFast() && $data.is_auto == 0 ? 1 : ""
  } : {}, {
    m: $data.style == 1 && $data.show_type == 20 || $data.style == 4 && $data.show_type == 10
  }, $data.style == 1 && $data.show_type == 20 || $data.style == 4 && $data.show_type == 10 ? {
    n: common_vendor.f($data.listData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n($data.select_index == index ? "item active" : "item"),
        c: index,
        d: common_vendor.o(($event) => $options.selectCategory(index), index)
      };
    }),
    o: $options.isBuyFast() && $data.is_auto == 0 ? 1 : "",
    p: common_vendor.s("height:" + $data.scrollviewHigh + "px;")
  } : {}, {
    q: $data.style == 1 && $data.show_type == 20
  }, $data.style == 1 && $data.show_type == 20 ? {
    r: common_vendor.f($data.childlist, (item, index, i0) => {
      return {
        a: $options.hasImages(item),
        b: common_vendor.t(item.name),
        c: index,
        d: common_vendor.o(($event) => $options.gotoList(item.category_id), index)
      };
    }),
    s: $options.isBuyFast() && $data.is_auto == 0 ? 1 : "",
    t: common_vendor.s("height:" + $data.scrollviewHigh + "px;")
  } : {}, {
    v: $data.style == 1 && $data.show_type == 10
  }, $data.style == 1 && $data.show_type == 10 ? {
    w: common_vendor.f($data.listData, (item, index, i0) => {
      return {
        a: $options.hasImages(item),
        b: common_vendor.t(item.name),
        c: index,
        d: common_vendor.o(($event) => $options.gotoList(item.category_id), index)
      };
    }),
    x: $options.isBuyFast() && $data.is_auto == 0 ? 1 : "",
    y: common_vendor.s("height:" + $data.scrollviewHigh + "px;")
  } : {}, {
    z: $data.style == 2 || $data.style == 3 || $data.style == 4
  }, $data.style == 2 || $data.style == 3 || $data.style == 4 ? common_vendor.e({
    A: $data.show_type == 20 && ($data.style == 2 || $data.style == 3)
  }, $data.show_type == 20 && ($data.style == 2 || $data.style == 3) ? {
    B: common_vendor.f($data.childlist, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.o(($event) => $options.changeCategory(item.category_id), index),
        c: item.category_id == $data.category_id ? 1 : "",
        d: index
      };
    })
  } : {}, {
    C: common_vendor.f($data.productlist, (item, index, i0) => {
      return common_vendor.e({
        a: item.product_image,
        b: common_vendor.t(item.product_name),
        c: common_vendor.t(item.product_min_price),
        d: $data.shoppingPrice && item.isActivity != 1 && $options.isBuyFast()
      }, $data.shoppingPrice && item.isActivity != 1 && $options.isBuyFast() ? {
        e: common_vendor.o(($event) => $options.addShopping(item), index)
      } : {}, {
        f: common_vendor.o(($event) => _ctx.gotoPage("/pages/product/detail/detail?product_id=" + item.product_id), index),
        g: index
      });
    }),
    D: $options.isBuyFast() && $data.is_auto == 0 ? 1 : "",
    E: common_vendor.s("height:" + $data.scrollviewHigh + "px;")
  }) : {}) : {}, {
    F: common_vendor.sr("categoryMaskRef", "02e1f90a-0"),
    G: common_vendor.o($options.getShoppingNum),
    H: common_vendor.p({
      dataList: $data.productArr
    }),
    I: $options.isBuyFast()
  }, $options.isBuyFast() ? common_vendor.e({
    J: $data.shoppingNum && $data.shoppingNum != 0
  }, $data.shoppingNum && $data.shoppingNum != 0 ? {
    K: common_vendor.t($data.shoppingNum)
  } : {}, {
    L: common_vendor.o((...args) => $options.lookProduct && $options.lookProduct(...args)),
    M: common_vendor.t($data.shoppingPrice),
    N: common_vendor.o((...args) => $options.Submit && $options.Submit(...args)),
    O: common_vendor.n({
      customTabBar: $data.is_auto == 1
    }),
    P: common_vendor.n({
      H5: $data.platFormType == "web"
    })
  }) : {}, {
    Q: $data.isDomHeight && $data.is_auto == 1
  }, $data.isDomHeight && $data.is_auto == 1 ? {} : {}, {
    R: common_vendor.o(_ctx.getFooterHeigth),
    S: common_vendor.o($options.closePopup),
    T: common_vendor.p({
      isPopup: $data.isPopup,
      productModel: $data.productModel
    }),
    U: _ctx.theme(),
    V: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/product/category.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
