"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  props: ["itemData"],
  methods: {
    scroll(e) {
    },
    /*跳转列表*/
    gotoList() {
      let url = "/pagesPlus/bargain/list/list";
      this.gotoPage(url);
    },
    /*跳转详情*/
    gotoDetail(e) {
      let url = "/pagesPlus/bargain/detail/detail?bargain_product_id=" + e;
      this.gotoPage(url);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.itemData.style.titleType == 1
  }, $props.itemData.style.titleType == 1 ? {
    b: common_vendor.t($props.itemData.params.title)
  } : {}, {
    c: $props.itemData.style.titleType == 2
  }, $props.itemData.style.titleType == 2 ? {
    d: $props.itemData.style.title_image
  } : {}, {
    e: common_vendor.t($props.itemData.params.more),
    f: $props.itemData.style.moreColor,
    g: common_vendor.o((...args) => $options.gotoList && $options.gotoList(...args)),
    h: $props.itemData.style.moreColor,
    i: $props.itemData.style.moreSize * 2 + "rpx",
    j: $props.itemData.style.bgimage ? "url(" + $props.itemData.style.bgimage + ")" : "",
    k: common_vendor.f($props.itemData.data.product_list, (item, index, i0) => {
      return common_vendor.e({
        a: item.product.file_path
      }, $props.itemData.style.product_sales == 1 ? {
        b: common_vendor.t(item.total_sales),
        c: $props.itemData.style.salesColor,
        d: $props.itemData.style.bgSales
      } : {}, $props.itemData.style.product_name == 1 ? {
        e: common_vendor.t(item.product.product_name),
        f: $props.itemData.style.productName_color
      } : {}, $props.itemData.style.product_price == 1 ? {
        g: common_vendor.t(item.bargain_price),
        h: $props.itemData.style.productPrice_color
      } : {}, $props.itemData.style.product_lineprice == 1 ? {
        i: common_vendor.t(item.product_price),
        j: $props.itemData.style.productLine_color
      } : {}, {
        k: index,
        l: common_vendor.o(($event) => $options.gotoDetail(item.bargain_product_id), index)
      });
    }),
    l: $props.itemData.style.product_imgRadio * 2 + "rpx",
    m: $props.itemData.style.product_sales == 1,
    n: $props.itemData.style.product_name == 1,
    o: $props.itemData.style.product_price == 1,
    p: $props.itemData.style.product_lineprice == 1,
    q: $props.itemData.style.productBg_color,
    r: $props.itemData.style.product_topRadio * 2 + "rpx",
    s: $props.itemData.style.product_topRadio * 2 + "rpx",
    t: $props.itemData.style.product_bottomRadio * 2 + "rpx",
    v: $props.itemData.style.product_bottomRadio * 2 + "rpx",
    w: $props.itemData.style.background,
    x: $props.itemData.style.topRadio * 2 + "rpx",
    y: $props.itemData.style.topRadio * 2 + "rpx",
    z: $props.itemData.style.bottomRadio * 2 + "rpx",
    A: $props.itemData.style.bottomRadio * 2 + "rpx",
    B: $props.itemData.style.bgcolor,
    C: $props.itemData.style.paddingLeft * 2 + "rpx",
    D: $props.itemData.style.paddingLeft * 2 + "rpx",
    E: $props.itemData.style.paddingTop * 2 + "rpx",
    F: $props.itemData.style.paddingBottom * 2 + "rpx"
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/diy/bargainProduct/bargainProduct.vue"]]);
wx.createComponent(Component);
