"use strict";
const common_vendor = require("../../common/vendor.js");
const spec = () => "./detail/popup/spec.js";
const _sfc_main = {
  components: {
    spec
  },
  props: ["dataList"],
  data() {
    return {
      show: false,
      is_auto: 0,
      platFormType: ""
    };
  },
  methods: {
    open() {
      let tabBarObj = common_vendor.index.getStorageSync("TabBar");
      if (tabBarObj) {
        this.is_auto = tabBarObj.is_auto;
      }
      const platFormType = common_vendor.index.getSystemInfoSync().uniPlatform;
      this.platFormType = platFormType;
      if (this.$props.dataList && this.$props.dataList.length > 0) {
        this.show = !this.show;
      }
    },
    closeMask() {
      this.show = false;
    },
    /*添加*/
    addFunc(item) {
      console.log("item", item);
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._post(
        "order.cart/add",
        {
          product_id: item.product_id,
          spec_sku_id: item.spec_sku_id,
          total_num: 1
        },
        function(res) {
          common_vendor.index.hideLoading();
          self.loadding = false;
          self.$emit("get-shopping-num");
        },
        function() {
          self.loadding = false;
        }
      );
    },
    /*减少*/
    reduceFunc(item) {
      let self = this;
      if (item.totalNum <= 1) {
        return;
      }
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._post(
        "order.cart/sub",
        {
          product_id: item.product_id,
          spec_sku_id: item.spec_sku_id
        },
        function(res) {
          self.loadding = false;
          common_vendor.index.hideLoading();
          self.$emit("get-shopping-num");
        },
        function() {
          self.loadding = false;
        }
      );
    },
    /* 删除单个商品 */
    clickDel(item) {
      let self = this;
      common_vendor.index.showModal({
        title: "提示",
        content: "您确定要移除该商品吗?",
        success(e) {
          e.confirm && self._post(
            "order.cart/delete",
            {
              cart_id: item.cart_id
            },
            function(res) {
              self.$emit("get-shopping-num");
            }
          );
        }
      });
    },
    /* 获取所有商品的cartID */
    getCheckedIds() {
      let self = this;
      let arrIds = [];
      if (self.$props.dataList) {
        self.$props.dataList.forEach((item) => {
          arrIds.push(item.cart_id);
        });
      }
      return arrIds;
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
        content: "您确定要清空购物车吗?",
        success(e) {
          e.confirm && self._post(
            "order.cart/delete",
            {
              cart_id: cartIds
            },
            function(res) {
              self.$emit("get-shopping-num");
            }
          );
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.show
  }, $data.show ? {
    b: common_vendor.o((...args) => $options.onDelete && $options.onDelete(...args)),
    c: common_vendor.f($props.dataList, (v, k0, i0) => {
      return common_vendor.e({
        a: v.product_image,
        b: common_vendor.t(v.product_name),
        c: common_vendor.o(($event) => $options.clickDel(v), v),
        d: v.product_attr
      }, v.product_attr ? {
        e: common_vendor.t(v.product_attr)
      } : {}, {
        f: common_vendor.t(v.product_price),
        g: common_vendor.o(($event) => $options.reduceFunc(v), v),
        h: common_vendor.t(v.total_num),
        i: common_vendor.o(($event) => $options.addFunc(v), v),
        j: v
      });
    }),
    d: common_vendor.n({
      customTabBar: $data.is_auto == 1
    }),
    e: common_vendor.n({
      H5: $data.platFormType == "web"
    }),
    f: common_vendor.o((...args) => $options.closeMask && $options.closeMask(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/product/categoryMask.vue"]]);
wx.createComponent(Component);
