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
        title: " ",
        type: "hours"
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
      let url = "/pagesPlus/seckill/list/list";
      this.gotoPage(url);
    },
    /*跳转产品详情*/
    gotoDetail(e) {
      let url = "/pages/product/detail/detail?product_id=" + e;
      this.gotoPage(url);
    }
  }
};
if (!Array) {
  const _component_Countdown = common_vendor.resolveComponent("Countdown");
  _component_Countdown();
}
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
    e: $props.itemData.style.color,
    f: common_vendor.p({
      back_color: $props.itemData.style.title_color1,
      color: $props.itemData.style.color,
      cut_color: $props.itemData.style.number_color,
      config: $data.countdownConfig,
      activeName: "noborder"
    }),
    g: common_vendor.t($props.itemData.params.more),
    h: $props.itemData.style.moreColor,
    i: $props.itemData.style.moreColor,
    j: $props.itemData.style.moreSize * 2 + "rpx",
    k: common_vendor.o((...args) => $options.gotoList && $options.gotoList(...args)),
    l: $props.itemData.style.bgimage ? "url(" + $props.itemData.style.bgimage + ")" : "",
    m: common_vendor.f($props.itemData.data.product_list, (product, index, i0) => {
      return common_vendor.e({
        a: product.product.file_path
      }, $props.itemData.style.product_name == 1 ? {
        b: common_vendor.t(product.product.product_name),
        c: $props.itemData.style.productName_color
      } : {}, $props.itemData.style.product_schedule == 1 ? {
        d: $props.itemData.style.productSlider_color,
        e: product.saleRate + "%",
        f: ($props.itemData.style.productSlider_color || "#ffffff") + "30",
        g: common_vendor.t(product.saleRate)
      } : {}, $props.itemData.style.product_price == 1 ? {
        h: common_vendor.t(product.seckill_price),
        i: $props.itemData.style.productPrice_color
      } : {}, $props.itemData.style.product_lineprice == 1 ? {
        j: common_vendor.t(product.product_price),
        k: $props.itemData.style.productLine_color
      } : {}, $props.itemData.style.product_btn == 1 ? {
        l: common_vendor.t($props.itemData.params.btntext),
        m: $props.itemData.style.productLine_btnBackground,
        n: $props.itemData.style.productLine_btnRadius * 2 + "rpx",
        o: $props.itemData.style.productLine_btnColor
      } : {}, {
        p: common_vendor.o(($event) => $options.gotoDetail(product.product_id), index),
        q: index
      });
    }),
    n: $props.itemData.style.product_imgRadio * 2 + "rpx",
    o: $props.itemData.style.product_name == 1,
    p: $props.itemData.style.product_schedule == 1,
    q: $props.itemData.style.product_price == 1,
    r: $props.itemData.style.product_lineprice == 1,
    s: $props.itemData.style.product_btn == 1,
    t: $props.itemData.style.productBg_color,
    v: $props.itemData.style.product_topRadio * 2 + "rpx",
    w: $props.itemData.style.product_topRadio * 2 + "rpx",
    x: $props.itemData.style.product_bottomRadio * 2 + "rpx",
    y: $props.itemData.style.product_bottomRadio * 2 + "rpx",
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
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/diy/seckillProduct/seckillProduct.vue"]]);
wx.createComponent(Component);
