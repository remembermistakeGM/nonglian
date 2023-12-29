"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {};
  },
  props: ["itemData"],
  created() {
    console.log(this.$props.itemData);
  },
  methods: {
    scroll(e) {
    },
    /*跳转列表*/
    gotoList() {
      let url = "/pagesPlus/assemble/list/list";
      this.gotoPage(url);
    },
    /*跳转产品详情*/
    gotoDetail(e) {
      let url = "/pagesPlus/assemble/detail/detail?assemble_product_id=" + e.assemble_product_id;
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
      }, $props.itemData.style.product_numberbtn == 1 ? {
        b: common_vendor.t(item.assemble_num),
        c: $props.itemData.style.number_color,
        d: "linear-gradient(to right, " + ($props.itemData.style.title_color1 || "#fff") + ", " + ($props.itemData.style.title_color2 || "#fff") + ")"
      } : {}, $props.itemData.style.product_name == 1 ? {
        e: common_vendor.t(item.product.product_name)
      } : {}, $props.itemData.style.product_price == 1 ? {
        f: common_vendor.t(item.assemble_price),
        g: $props.itemData.style.productPrice_color
      } : {}, $props.itemData.style.product_lineprice == 1 ? {
        h: common_vendor.t(item.product_price),
        i: $props.itemData.style.productLine_color
      } : {}, $props.itemData.style.product_btn == 1 ? {
        j: common_vendor.t($props.itemData.params.btntext),
        k: $props.itemData.style.productLine_btnBackground,
        l: $props.itemData.style.productLine_btnRadius + "px",
        m: $props.itemData.style.productLine_btnColor
      } : {}, {
        n: common_vendor.o(($event) => $options.gotoDetail(item), index),
        o: index
      });
    }),
    l: $props.itemData.style.product_imgRadio * 2 + "rpx",
    m: $props.itemData.style.product_numberbtn == 1,
    n: $props.itemData.style.product_name == 1,
    o: $props.itemData.style.product_price == 1,
    p: $props.itemData.style.product_lineprice == 1,
    q: $props.itemData.style.product_btn == 1,
    r: $props.itemData.style.productBg_color,
    s: $props.itemData.style.product_topRadio * 2 + "rpx",
    t: $props.itemData.style.product_topRadio * 2 + "rpx",
    v: $props.itemData.style.product_bottomRadio * 2 + "rpx",
    w: $props.itemData.style.product_bottomRadio * 2 + "rpx",
    x: $props.itemData.style.background,
    y: $props.itemData.style.topRadio * 2 + "rpx",
    z: $props.itemData.style.topRadio * 2 + "rpx",
    A: $props.itemData.style.bottomRadio * 2 + "rpx",
    B: $props.itemData.style.bottomRadio * 2 + "rpx",
    C: $props.itemData.style.bgcolor,
    D: $props.itemData.style.paddingLeft * 2 + "rpx",
    E: $props.itemData.style.paddingLeft * 2 + "rpx",
    F: $props.itemData.style.paddingTop * 2 + "rpx",
    G: $props.itemData.style.paddingBottom * 2 + "rpx"
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/diy/assembleProduct/assembleProduct.vue"]]);
wx.createComponent(Component);
