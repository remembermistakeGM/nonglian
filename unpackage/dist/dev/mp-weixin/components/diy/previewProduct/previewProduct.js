"use strict";
const common_vendor = require("../../../common/vendor.js");
const Countdown = () => "../../countdown/countdown-act.js";
const _sfc_main = {
  components: {
    Countdown
  },
  data() {
    return {
      /*倒计时配置*/
      countdownConfig: {
        /*开始时间*/
        startstamp: 0,
        /*结束时间*/
        endstamp: 0,
        /*标题*/
        title: " "
      }
    };
  },
  props: ["itemData"],
  created() {
    this.countdownConfig.endstamp = this.itemData.data.end_time;
    this.countdownConfig.startstamp = this.itemData.data.start_time;
  },
  methods: {
    scroll(e) {
    },
    /*跳转列表*/
    gotoList() {
      let url = "/pagesPlus/preview/list";
      this.gotoPage(url);
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
    a: $props.itemData.data.length > 0
  }, $props.itemData.data.length > 0 ? common_vendor.e({
    b: $props.itemData.style.titleType == 1
  }, $props.itemData.style.titleType == 1 ? {
    c: common_vendor.t($props.itemData.params.title),
    d: $props.itemData.style.titleColor,
    e: $props.itemData.style.titleSize * 2 + "rpx"
  } : {}, {
    f: $props.itemData.style.titleType == 2
  }, $props.itemData.style.titleType == 2 ? {
    g: $props.itemData.style.title_image
  } : {}, {
    h: common_vendor.t($props.itemData.params.more),
    i: $props.itemData.style.moreColor,
    j: common_vendor.o((...args) => $options.gotoList && $options.gotoList(...args)),
    k: $props.itemData.style.moreColor,
    l: $props.itemData.style.moreSize * 2 + "rpx",
    m: $props.itemData.style.bgimage ? "url(" + $props.itemData.style.bgimage + ")" : "",
    n: common_vendor.f($props.itemData.data, (item, index, i0) => {
      return common_vendor.e({
        a: item.product_image
      }, $props.itemData.style.product_tag == 1 ? {
        b: $props.itemData.style.tagColor,
        c: $props.itemData.style.bgTag
      } : {}, $props.itemData.style.product_name == 1 ? {
        d: common_vendor.t(item.product_name),
        e: $props.itemData.style.productName_color
      } : {}, $props.itemData.style.product_price == 1 ? {
        f: common_vendor.t(item.product_price),
        g: $props.itemData.style.productPrice_color
      } : {}, $props.itemData.style.product_lineprice == 1 ? {
        h: common_vendor.t(item.line_price),
        i: $props.itemData.style.productLine_color
      } : {}, {
        j: common_vendor.o(($event) => $options.gotoDetail(item.product_id), index),
        k: index
      });
    }),
    o: $props.itemData.style.product_imgRadio * 2 + "rpx",
    p: $props.itemData.style.product_tag == 1,
    q: $props.itemData.style.product_name == 1,
    r: $props.itemData.style.product_price == 1,
    s: $props.itemData.style.product_lineprice == 1,
    t: $props.itemData.style.productBg_color,
    v: $props.itemData.style.product_bottomRadio * 2 + "rpx",
    w: $props.itemData.style.product_bottomRadio * 2 + "rpx",
    x: $props.itemData.style.product_topRadio * 2 + "rpx",
    y: $props.itemData.style.product_topRadio * 2 + "rpx",
    z: $props.itemData.style.background,
    A: $props.itemData.style.topRadio * 2 + "rpx",
    B: $props.itemData.style.topRadio * 2 + "rpx",
    C: $props.itemData.style.bottomRadio * 2 + "rpx",
    D: $props.itemData.style.bottomRadio * 2 + "rpx",
    E: $props.itemData.style.bgcolor,
    F: $props.itemData.style.paddingLeft * 2 + "rpx",
    G: $props.itemData.style.paddingLeft * 2 + "rpx",
    H: $props.itemData.style.paddingTop * 2 + "rpx",
    I: $props.itemData.style.paddingBottom * 2 + "rpx"
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2a0b1b42"], ["__file", "D:/workspace/p/nc/nc_app/components/diy/previewProduct/previewProduct.vue"]]);
wx.createComponent(Component);
