"use strict";
const common_vendor = require("../../common/vendor.js");
const banner = () => "./banner/banner.js";
const imagesingle = () => "./imagesingle/imagesingle.js";
const windows = () => "./window/window.js";
const videos = () => "./videos/videos.js";
const articles = () => "./article/article.js";
const special = () => "./special/special.js";
const notice = () => "./notice/notice.js";
const titles = () => "./title/title.js";
const coupon = () => "./coupon/coupon.js";
const richText = () => "./richText/richText.js";
const navBar = () => "./navBar/navBar.js";
const store = () => "./store/store.js";
const service = () => "./service/service.js";
const shipinLiveIndex = () => "./shipinLive/shipinLive.js";
const blank = () => "./blank/blank.js";
const guide = () => "./guide/guide.js";
const product = () => "./product/product.js";
const seckillProduct = () => "./seckillProduct/seckillProduct.js";
const assembleProduct = () => "./assembleProduct/assembleProduct.js";
const bargainProduct = () => "./bargainProduct/bargainProduct.js";
const previewProduct = () => "./previewProduct/previewProduct.js";
const userBase = () => "./base/base.js";
const order = () => "./order/order.js";
const _sfc_main = {
  components: {
    banner,
    imagesingle,
    shipinLiveIndex,
    windows,
    videos,
    articles,
    special,
    notice,
    titles,
    coupon,
    richText,
    navBar,
    store,
    service,
    blank,
    guide,
    product,
    seckillProduct,
    assembleProduct,
    bargainProduct,
    previewProduct,
    userBase,
    order
  },
  data() {
    return {};
  },
  props: ["diyItems", "userInfo", "serviceUserId"],
  created() {
  },
  methods: {
    loadinData() {
      this.$nextTick(() => {
        if (this.$refs.shipinLiveRef && this.$refs.shipinLiveRef[0]) {
          this.$refs.shipinLiveRef[0].getData();
        }
      });
    }
  }
};
if (!Array) {
  const _component_banner = common_vendor.resolveComponent("banner");
  const _component_imagesingle = common_vendor.resolveComponent("imagesingle");
  const _component_windows = common_vendor.resolveComponent("windows");
  const _component_videos = common_vendor.resolveComponent("videos");
  const _component_articles = common_vendor.resolveComponent("articles");
  const _component_special = common_vendor.resolveComponent("special");
  const _component_notice = common_vendor.resolveComponent("notice");
  const _component_titles = common_vendor.resolveComponent("titles");
  const _easycom_navBar2 = common_vendor.resolveComponent("navBar");
  const _component_product = common_vendor.resolveComponent("product");
  const _component_coupon = common_vendor.resolveComponent("coupon");
  const _component_store = common_vendor.resolveComponent("store");
  const _component_service = common_vendor.resolveComponent("service");
  const _component_shipinLiveIndex = common_vendor.resolveComponent("shipinLiveIndex");
  const _component_richText = common_vendor.resolveComponent("richText");
  const _component_blank = common_vendor.resolveComponent("blank");
  const _component_guide = common_vendor.resolveComponent("guide");
  const _component_seckillProduct = common_vendor.resolveComponent("seckillProduct");
  const _component_previewProduct = common_vendor.resolveComponent("previewProduct");
  const _component_assembleProduct = common_vendor.resolveComponent("assembleProduct");
  const _component_bargainProduct = common_vendor.resolveComponent("bargainProduct");
  const _component_userBase = common_vendor.resolveComponent("userBase");
  const _component_order = common_vendor.resolveComponent("order");
  (_component_banner + _component_imagesingle + _component_windows + _component_videos + _component_articles + _component_special + _component_notice + _component_titles + _easycom_navBar2 + _component_product + _component_coupon + _component_store + _component_service + _component_shipinLiveIndex + _component_richText + _component_blank + _component_guide + _component_seckillProduct + _component_previewProduct + _component_assembleProduct + _component_bargainProduct + _component_userBase + _component_order)();
}
const _easycom_navBar = () => "../navBar/navBar.js";
if (!Math) {
  _easycom_navBar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.diyItems, (item, index, i0) => {
      return common_vendor.e({
        a: item.type === "banner" && item.data != null
      }, item.type === "banner" && item.data != null ? {
        b: "274abadc-0-" + i0,
        c: common_vendor.p({
          itemData: item
        })
      } : {}, {
        d: item.type === "imageSingle" && item.data != null
      }, item.type === "imageSingle" && item.data != null ? {
        e: "274abadc-1-" + i0,
        f: common_vendor.p({
          itemData: item
        })
      } : {}, {
        g: item.type == "window" && item.data != null
      }, item.type == "window" && item.data != null ? {
        h: "274abadc-2-" + i0,
        i: common_vendor.p({
          itemData: item
        })
      } : {}, {
        j: item.type == "video"
      }, item.type == "video" ? {
        k: "274abadc-3-" + i0,
        l: common_vendor.p({
          itemData: item
        })
      } : {}, {
        m: item.type == "article" && item.data != null
      }, item.type == "article" && item.data != null ? {
        n: "274abadc-4-" + i0,
        o: common_vendor.p({
          itemData: item
        })
      } : {}, {
        p: item.type == "special" && item.data != null
      }, item.type == "special" && item.data != null ? {
        q: "274abadc-5-" + i0,
        r: common_vendor.p({
          itemData: item
        })
      } : {}, {
        s: item.type == "notice"
      }, item.type == "notice" ? {
        t: "274abadc-6-" + i0,
        v: common_vendor.p({
          itemData: item
        })
      } : {}, {
        w: item.type == "title"
      }, item.type == "title" ? {
        x: "274abadc-7-" + i0,
        y: common_vendor.p({
          itemData: item
        })
      } : {}, {
        z: item.type === "navBar" && item.data != null
      }, item.type === "navBar" && item.data != null ? {
        A: "274abadc-8-" + i0,
        B: common_vendor.p({
          itemData: item
        })
      } : {}, {
        C: item.type === "product" && item.data != null
      }, item.type === "product" && item.data != null ? {
        D: "274abadc-9-" + i0,
        E: common_vendor.p({
          itemData: item
        })
      } : {}, {
        F: item.type === "coupon" && item.data != null
      }, item.type === "coupon" && item.data != null ? {
        G: "274abadc-10-" + i0,
        H: common_vendor.p({
          itemData: item
        })
      } : {}, {
        I: item.type == "store" && item.data != null
      }, item.type == "store" && item.data != null ? {
        J: "274abadc-11-" + i0,
        K: common_vendor.p({
          itemData: item
        })
      } : {}, {
        L: item.type == "service"
      }, item.type == "service" ? {
        M: "274abadc-12-" + i0,
        N: common_vendor.p({
          itemData: item
        })
      } : {}, {
        O: item.type == "videoLive"
      }, item.type == "videoLive" ? {
        P: common_vendor.sr("shipinLiveRef", "274abadc-13-" + i0, {
          "f": 1
        }),
        Q: "274abadc-13-" + i0,
        R: common_vendor.p({
          itemData: item
        })
      } : {}, {
        S: item.type === "richText"
      }, item.type === "richText" ? {
        T: "274abadc-14-" + i0,
        U: common_vendor.p({
          itemData: item
        })
      } : {}, {
        V: item.type == "blank"
      }, item.type == "blank" ? {
        W: "274abadc-15-" + i0,
        X: common_vendor.p({
          itemData: item
        })
      } : {}, {
        Y: item.type == "guide"
      }, item.type == "guide" ? {
        Z: "274abadc-16-" + i0,
        aa: common_vendor.p({
          itemData: item
        })
      } : {}, {
        ab: item.type == "seckillProduct" && item.data != null
      }, item.type == "seckillProduct" && item.data != null ? {
        ac: "274abadc-17-" + i0,
        ad: common_vendor.p({
          itemData: item
        })
      } : {}, {
        ae: item.type == "previewProduct" && item.data != null
      }, item.type == "previewProduct" && item.data != null ? {
        af: "274abadc-18-" + i0,
        ag: common_vendor.p({
          itemData: item
        })
      } : {}, {
        ah: item.type == "assembleProduct" && item.data != null
      }, item.type == "assembleProduct" && item.data != null ? {
        ai: "274abadc-19-" + i0,
        aj: common_vendor.p({
          itemData: item
        })
      } : {}, {
        ak: item.type == "bargainProduct" && item.data != null
      }, item.type == "bargainProduct" && item.data != null ? {
        al: "274abadc-20-" + i0,
        am: common_vendor.p({
          itemData: item
        })
      } : {}, {
        an: item.type === "base"
      }, item.type === "base" ? {
        ao: "274abadc-21-" + i0,
        ap: common_vendor.p({
          itemData: item,
          userInfo: $props.userInfo
        })
      } : {}, {
        aq: item.type === "order"
      }, item.type === "order" ? {
        ar: "274abadc-22-" + i0,
        as: common_vendor.p({
          itemData: item,
          userInfo: $props.userInfo
        })
      } : {}, {
        at: index
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/diy/diy.vue"]]);
wx.createComponent(Component);
