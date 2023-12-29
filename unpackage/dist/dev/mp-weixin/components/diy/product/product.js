"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {};
  },
  props: ["itemData"],
  created() {
  },
  methods: {
    scroll(e) {
    },
    /*跳转产品详情*/
    gotoDetail(e) {
      let url = "/pages/product/detail/detail?product_id=" + e;
      this.gotoPage(url);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.itemData.style.display == "list"
  }, $props.itemData.style.display == "list" ? {
    b: common_vendor.f($props.itemData.data, (product, index, i0) => {
      return common_vendor.e($props.itemData.style.column == 1 ? common_vendor.e({
        a: product.image,
        b: $props.itemData.params.productName
      }, $props.itemData.params.productName ? {
        c: common_vendor.t(product.product_name)
      } : {}, {
        d: $props.itemData.style.show.sellingPoint
      }, $props.itemData.style.show.sellingPoint ? {
        e: common_vendor.t(product.selling_point)
      } : {}, {
        f: $props.itemData.style.show.productSales
      }, $props.itemData.style.show.productSales ? {
        g: common_vendor.t(product.product_sales)
      } : {}, {
        h: $props.itemData.params.productPrice
      }, $props.itemData.params.productPrice ? {
        i: common_vendor.t(product.product_price)
      } : {}) : common_vendor.e({
        j: product.image,
        k: $props.itemData.params.productName == 1
      }, $props.itemData.params.productName == 1 ? {
        l: common_vendor.t(product.product_name)
      } : {}, {
        m: $props.itemData.params.productPrice == 1
      }, $props.itemData.params.productPrice == 1 ? {
        n: common_vendor.t(product.product_price)
      } : {}), {
        o: index,
        p: common_vendor.o(($event) => $options.gotoDetail(product.product_id), index)
      });
    }),
    c: $props.itemData.style.column == 1,
    d: common_vendor.n("column__" + $props.itemData.style.column)
  } : {
    e: common_vendor.f($props.itemData.data, (product, index, i0) => {
      return common_vendor.e({
        a: product.image
      }, $props.itemData.params.productName == 1 ? {
        b: common_vendor.t(product.product_name)
      } : {}, $props.itemData.params.productPrice == 1 ? {
        c: common_vendor.t(product.product_price)
      } : {}, {
        d: index,
        e: common_vendor.o(($event) => $options.gotoDetail(product.product_id), index)
      });
    }),
    f: $props.itemData.params.productName == 1,
    g: $props.itemData.params.productPrice == 1,
    h: common_vendor.n("column__" + $props.itemData.style.column),
    i: _ctx.scrollTop
  }, {
    j: common_vendor.n("display__" + $props.itemData.style.display),
    k: $props.itemData.style.background,
    l: $props.itemData.style.topRadio * 2 + "rpx",
    m: $props.itemData.style.topRadio * 2 + "rpx",
    n: $props.itemData.style.bottomRadio * 2 + "rpx",
    o: $props.itemData.style.bottomRadio * 2 + "rpx",
    p: $props.itemData.style.bgcolor,
    q: $props.itemData.style.paddingLeft * 2 + "rpx",
    r: $props.itemData.style.paddingLeft * 2 + "rpx",
    s: $props.itemData.style.paddingTop * 2 + "rpx",
    t: $props.itemData.style.paddingBottom * 2 + "rpx"
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/diy/product/product.vue"]]);
wx.createComponent(Component);
