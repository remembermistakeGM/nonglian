"use strict";
const common_vendor = require("../../common/vendor.js");
const recommendProduct = () => "../../components/recommendProduct/recommendProduct.js";
const _sfc_main = {
  components: {
    recommendProduct
  },
  data() {
    return {
      isloadding: true,
      /*滚动组件高度*/
      scrollviewHigh: 0,
      /*是否加载完成*/
      loadding: true,
      isEdit: false,
      /*购物车各商铺商品*/
      tableData: [],
      arrIds: [],
      // 是否全选
      checkedAll: false,
      totalPrice: 0,
      totalProduct: 0,
      store_open: 1,
      is_auto: 0
    };
  },
  onLoad() {
  },
  onShow() {
    this.getData();
    this.getTabBarLinks();
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
          let ratio = res.windowWidth / 750;
          let h = res.windowHeight - ratio * 98;
          _this.scrollviewHigh = h;
        }
      });
    },
    /*获取数据*/
    getData() {
      let self = this;
      self.isloadding = true;
      self._get("order.cart/lists", {}, function(res) {
        let auto = common_vendor.index.getStorageSync("TabBar").is_auto && common_vendor.index.getStorageSync("TabBar").is_auto != 0;
        self.is_auto = auto;
        self.isloadding = false;
        self.tableData = res.data.productList;
        self.store_open = res.data.store_open;
        self.tableData.forEach((item, index) => {
          item.checked = false;
        });
        self.loadding = false;
        self._initGoodsChecked();
      });
    },
    /**
     * 初始化商品选中状态
     */
    _initGoodsChecked() {
      let self = this;
      let checkedData = self.getCheckedData();
      let productCount = 0;
      self.tableData.forEach((item) => {
        item.productList.forEach((product) => {
          productCount++;
          product.checked = self.inArray(
            `${product.cart_id}`,
            checkedData
          );
        });
      });
      self.totalProduct = productCount;
      self.isEdit = false;
      self.checkedAll = checkedData.length == self.totalProduct;
      self.tableData.forEach((item, index) => {
        this.onUpsupChecked(this.tableData, index);
      });
      self.updateTotalPrice();
    },
    /**
     * 获取选中的商品
     */
    getCheckedData() {
      let checkedData = common_vendor.index.getStorageSync("CheckedData");
      return checkedData ? checkedData : [];
    },
    /*单选*/
    checkItem(e, supplier_index, index) {
      e.checked = !e.checked;
      this.$set(this.tableData[supplier_index].productList, index, e);
      console.log(this.tableData);
      this.onUpsupChecked(this.tableData, supplier_index);
      this.onUpdateChecked();
      this.updateTotalPrice();
      console.log(this.getCheckedData().length);
      this.checkedAll = this.getCheckedData().length == this.totalProduct;
    },
    // 更新店铺全选状态
    onUpsupChecked(item, index) {
      let supplier_flag = true;
      for (var i = 0; i < item[index].productList.length; i++) {
        if (!item[index].productList[i].checked) {
          supplier_flag = false;
        }
      }
      this.$set(item[index], "checked", supplier_flag);
      console.log("item=====" + supplier_flag);
    },
    /**
     * 更新商品选中记录
     */
    onUpdateChecked() {
      let self = this, checkedData = [];
      self.tableData.forEach((item) => {
        item.productList.forEach((product) => {
          if (product.checked == true) {
            checkedData.push(`${product.cart_id}`);
          }
        });
      });
      console.log(checkedData);
      common_vendor.index.setStorageSync("CheckedData", checkedData);
    },
    /* 店铺全选 */
    checkStprItem(itemp, index) {
      let self = this;
      console.log(itemp);
      itemp.checked = !itemp.checked;
      itemp.productList.forEach((item, index2) => {
        item.checked = itemp.checked;
      });
      self.updateTotalPrice();
      self.onUpdateChecked();
      console.log(this.getCheckedData().length);
      this.checkedAll = this.getCheckedData().length == this.totalProduct;
    },
    /*全选*/
    onCheckedAll() {
      console.log("111111111");
      let self = this;
      self.checkedAll = !self.checkedAll;
      self.tableData.forEach((item) => {
        this.$set(item, "checked", self.checkedAll);
        item.productList.forEach((product) => {
          product.checked = self.checkedAll;
        });
      });
      self.updateTotalPrice();
      self.onUpdateChecked();
    },
    updateTotalPrice: function() {
      let total_price = 0;
      let items = this.tableData;
      for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < items[i].productList.length; j++) {
          if (items[i].productList[j]["checked"] == true) {
            total_price += items[i].productList[j]["total_num"] * items[i].productList[j]["product_price"];
          }
        }
      }
      this.totalPrice = total_price.toFixed(2);
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
    /*添加*/
    addFunc(item) {
      let self = this;
      let product_id = item.product_id;
      let spec_sku_id = item.spec_sku_id;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._post(
        "order.cart/add",
        {
          product_id,
          spec_sku_id,
          total_num: 1
        },
        function(res) {
          common_vendor.index.hideLoading();
          self.loadding = false;
          self.getData();
        },
        function() {
          self.loadding = false;
        }
      );
    },
    /*减少*/
    reduceFunc(item) {
      let self = this;
      let product_id = item.product_id;
      let spec_sku_id = item.spec_sku_id;
      if (item.total_num <= 1) {
        return;
      }
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._post(
        "order.cart/sub",
        {
          product_id,
          spec_sku_id
        },
        function(res) {
          self.loadding = false;
          common_vendor.index.hideLoading();
          self.getData();
        },
        function() {
          self.loadding = false;
        }
      );
    },
    /*删除购物车*/
    onDelete() {
      let self = this;
      let cartIds = self.getCheckedIds();
      if (!cartIds.length) {
        self.showError("您还没有选择商品");
        return false;
      }
      common_vendor.index.showModal({
        title: "提示",
        content: "您确定要移除选择的商品吗?",
        success(e) {
          e.confirm && self._post(
            "order.cart/delete",
            {
              cart_id: cartIds
            },
            function(res) {
              self.getData();
              self.onDeleteEvent(cartIds);
            }
          );
        }
      });
    },
    /**
     * 获取已选中的商品
     */
    getCheckedIds() {
      let self = this;
      let arrIds = [];
      self.tableData.forEach((item) => {
        item.productList.forEach((product) => {
          if (product.checked == true) {
            arrIds.push(`${product.cart_id}`);
          }
        });
      });
      return arrIds;
    },
    /**
     * 商品删除事件
     */
    onDeleteEvent(cartIds) {
      let self = this;
      cartIds.forEach((cartIndex) => {
        self.tableData.forEach((item, productIndex) => {
          if (cartIndex == `${item.cart_id}`) {
            self.tableData.splice(productIndex, 1);
          }
        });
      });
      self.$nextTick(() => {
        self.onUpdateChecked();
      });
      return true;
    },
    /**
     * 是否在数组内
     */
    inArray(search, array) {
      for (var i in array) {
        if (array[i] == search) {
          return true;
        }
      }
      return false;
    },
    /*去购物*/
    gotoShop() {
      let url = "/pages/index/index";
      this.gotoPage(url);
    }
  }
};
if (!Array) {
  const _easycom_recommendProduct2 = common_vendor.resolveComponent("recommendProduct");
  const _component_request_loading = common_vendor.resolveComponent("request-loading");
  const _component_tabBar = common_vendor.resolveComponent("tabBar");
  (_easycom_recommendProduct2 + _component_request_loading + _component_tabBar)();
}
const _easycom_recommendProduct = () => "../../components/recommendProduct/recommendProduct.js";
if (!Math) {
  _easycom_recommendProduct();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loadding
  }, !$data.loadding ? common_vendor.e({
    b: $data.tableData.length > 0
  }, $data.tableData.length > 0 ? common_vendor.e({
    c: $data.isEdit
  }, $data.isEdit ? {} : {}, {
    d: common_vendor.o(($event) => $data.isEdit = !$data.isEdit),
    e: common_vendor.f($data.tableData, (supplier_item, supplier_index, i0) => {
      return {
        a: supplier_item.checked,
        b: common_vendor.o(($event) => $options.checkStprItem(supplier_item, supplier_index), supplier_index),
        c: common_vendor.t(supplier_item.supplier.name),
        d: common_vendor.o(($event) => _ctx.gotoPage("/pages/shop/shop?shop_supplier_id=" + supplier_item.supplier.shop_supplier_id), supplier_index),
        e: common_vendor.f(supplier_item.productList, (item, index, i1) => {
          return common_vendor.e({
            a: item.checked,
            b: common_vendor.o(($event) => $options.checkItem(item, supplier_index, index), index),
            c: common_vendor.o(($event) => _ctx.gotoPage("/pages/product/detail/detail?product_id=" + item.product_id), index),
            d: item.product_image,
            e: common_vendor.t(item.product_name),
            f: common_vendor.t(item.product_sku.product_attr),
            g: common_vendor.t(item.product_price),
            h: item.total_num > 1
          }, item.total_num > 1 ? {
            i: common_vendor.o(($event) => $options.reduceFunc(item), index)
          } : {}, {
            j: common_vendor.t(item.total_num),
            k: item.total_num < item.product_sku.stock_num
          }, item.total_num < item.product_sku.stock_num ? {
            l: common_vendor.o(($event) => $options.addFunc(item), index)
          } : {}, {
            m: index
          });
        }),
        f: supplier_index
      };
    })
  }) : {
    f: common_vendor.o((...args) => $options.gotoShop && $options.gotoShop(...args))
  }, {
    g: $data.tableData.length > 0
  }, $data.tableData.length > 0 ? common_vendor.e({
    h: $data.checkedAll,
    i: common_vendor.o((...args) => $options.onCheckedAll && $options.onCheckedAll(...args)),
    j: !$data.isEdit
  }, !$data.isEdit ? {
    k: common_vendor.t($data.totalPrice),
    l: common_vendor.o(($event) => $options.Submit())
  } : {
    m: common_vendor.o(($event) => $options.onDelete())
  }, {
    n: $data.is_auto ? 1 : ""
  }) : {}, {
    o: common_vendor.p({
      location: 10
    }),
    p: $data.tableData.length > 0 ? 1 : ""
  }) : {}, {
    q: common_vendor.p({
      loadding: $data.isloadding
    }),
    r: _ctx.theme(),
    s: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c91e7611"], ["__file", "D:/workspace/p/nc/nc_app/pages/cart/cart.vue"]]);
wx.createPage(MiniProgramPage);
