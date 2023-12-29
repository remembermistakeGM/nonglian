"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_utils = require("../../../common/utils.js");
const share = () => "./popup/share.js";
const guarantee = () => "../../../components/guarantee.js";
const coupon = () => "./popup/coupon.js";
const spec = () => "./popup/spec.js";
const uniPopup = () => "../../../components/uni-popup.js";
const Mpservice = () => "../../../components/mpservice/Mpservice.js";
const AppShare = () => "../../../components/app-share.js";
const Countdown = () => "../../../components/countdown/countdown-presale.js";
const previewProduct = () => "./productinfo/previewProduct.js";
const _sfc_main = {
  components: {
    spec,
    share,
    uniPopup,
    Mpservice,
    guarantee,
    AppShare,
    coupon,
    Countdown,
    previewProduct
  },
  data() {
    return {
      ispresale: false,
      statusBarHeight: 0,
      titleBarHeight: 0,
      store_open: 1,
      /*手机高度*/
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      /*是否加载完成*/
      loadding: true,
      /*是否显示面板指示点*/
      indicatorDots: true,
      /*是否知道切换*/
      autoplay: false,
      /*自动切换时间间隔*/
      interval: 2e3,
      /*滑动动画时长*/
      duration: 500,
      /*是否确定购买弹窗*/
      isPopup: false,
      /*商品id*/
      product_id: null,
      /*商品详情*/
      detail: {
        product_sku: {},
        show_sku: {
          product_price: "",
          product_sku_id: 0,
          line_price: "",
          stock_num: 0,
          sku_image: ""
        }
      },
      /*商品属性*/
      specData: null,
      /*子级页面传参*/
      productModel: {},
      buyNow: false,
      url: "",
      /*规格数组*/
      productSpecArr: [],
      /*购物车商品数量*/
      cart_total_num: 0,
      /*分享*/
      isbottmpanel: false,
      isguarantee: false,
      /*是否生成图片*/
      isCreatedImg: false,
      poster_img: "",
      /*是否打开客服*/
      isMpservice: false,
      /*已经选择的规格*/
      alreadyChioce: "",
      shop_info: "",
      //店铺信息
      isfollow: "",
      //是否收藏商品
      shop_supplier_id: "",
      //店铺ID
      serverList: "",
      //保障
      room_id: "",
      /*app分享*/
      isAppShare: false,
      appParams: {
        title: "",
        summary: "",
        path: ""
      },
      service_open: 0,
      service_type: 0,
      user_id: 0,
      is_virtual: 1,
      couponList: [],
      isCoupon: false,
      middle: 1,
      isVideoPlay: false,
      show_discount: "",
      discount: {
        product_coupon: [],
        product_reduce: [],
        give_points: ""
      },
      /* 活动字段 */
      activeName: "",
      activePrice: "",
      activeText: "",
      skuName: "",
      is_preview: 0,
      sTop: 0,
      topId: "",
      scrollId: "",
      commentTop: 0,
      contentTop: 0
    };
  },
  onLoad(e) {
    this.GetStatusBarHeight();
    let scene = common_utils.utils.getSceneData(e);
    this.user_id = common_vendor.index.getStorageInfoSync("user_id");
    this.room_id = e.room_id;
    this.product_id = e.product_id ? e.product_id : scene.gid;
  },
  onReady() {
    this.init();
    this.getData();
  },
  /*分享*/
  onShareAppMessage() {
    let self = this;
    self.taskFunc();
    let params = self.getShareUrlParams({
      product_id: self.product_id
    });
    return {
      title: self.detail.product_name,
      path: "/pages/product/detail/detail?" + params
    };
  },
  methods: {
    scrollFunc(e) {
      let self = this;
      self.scrollId = e.detail.scrollTop.toFixed(1);
      console.log(self.scrollId);
    },
    GetStatusBarHeight() {
      const SystemInfo = common_vendor.index.getSystemInfoSync();
      SystemInfo.statusBarHeight;
      this.statusBarHeight = common_vendor.index.getMenuButtonBoundingClientRect().top;
      this.titleBarHeight = common_vendor.index.getMenuButtonBoundingClientRect().height;
    },
    /*初始化*/
    init() {
      let _this = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          _this.phoneHeight = res.windowHeight;
          let view = common_vendor.index.createSelectorQuery().select(".btns-wrap");
          view.boundingClientRect((data) => {
            let h = _this.phoneHeight - data.height;
            h = _this.phoneHeight;
            _this.scrollviewHigh = h;
          }).exec();
        }
      });
    },
    initScroll() {
      let self = this;
      let topBarHeight = self.topBarHeight();
      let hight = 0;
      if (topBarHeight) {
        hight = self.topBarHeight() + self.topBarTop() + 50;
      } else {
        hight = 50;
      }
      common_vendor.index.getSystemInfo({
        success(res) {
          let comment = common_vendor.index.createSelectorQuery().select("#product-comment");
          comment.boundingClientRect((data) => {
            console.log(data);
            self.commentTop = data.top - hight;
          }).exec();
          let content = common_vendor.index.createSelectorQuery().select("#product-content");
          content.boundingClientRect((data) => {
            self.contentTop = data.top - hight;
          }).exec();
        }
      });
    },
    /*获取数据*/
    getData() {
      let self = this;
      let product_id = self.product_id;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._get(
        "product.product/detail",
        {
          product_id,
          url: self.url,
          visitcode: self.getVisitcode()
        },
        function(res) {
          console.log(res.data.detail.is_preview == 1 && (/* @__PURE__ */ new Date()).valueOf() / 1e3 < res.data.detail.preview_time);
          if (res.data.mp_service == null) {
            self.service_type = 10;
          } else {
            self.service_type = res.data.mp_service.service_type;
          }
          if (res.data.detail.is_preview == 1 && (/* @__PURE__ */ new Date()).valueOf() / 1e3 < res.data.detail.preview_time) {
            self.is_preview = res.data.detail.is_preview;
            self.activeText = "预告";
            self.activeName = "preview";
            self.activePrice = "preview_price";
            res.data.detail.preview = {
              start_time: (/* @__PURE__ */ new Date()).valueOf() / 1e3,
              end_time: res.data.detail.preview_time
            };
          } else if (res.data.detail.advance && res.data.detail.advance != null) {
            self.ispresale = true;
            self.activeName = "advance";
            self.activeText = "预售";
            self.activePrice = "advance_price";
            self.skuName = "sku";
          } else if (res.data.detail.secKill && res.data.detail.secKill != null) {
            self.ispresale = true;
            self.activeName = "secKill";
            self.activeText = "秒杀";
            self.activePrice = "seckill_price";
            self.skuName = "seckillSku";
            res.data.detail.secKill.start_time = res.data.detail.secKill.active.start_time;
            res.data.detail.secKill.end_time = res.data.detail.secKill.active.end_time;
          }
          self.shop_supplier_id = res.data.detail.supplier.shop_supplier_id;
          self.shop_info = res.data.detail.supplier;
          self.isfollow = res.data.detail.isfollow;
          self.service_open = res.data.service_open;
          self.is_virtual = res.data.detail.is_virtual;
          self.couponList = res.data.couponList;
          if (res.data.mp_service == null) {
            self.service_type = 10;
          } else {
            self.service_type = res.data.mp_service.service_type;
          }
          self.cart_total_num = res.data.cart_total_num;
          self.store_open = res.data.store_open;
          res.data.detail.content = common_utils.utils.format_content(res.data.detail.content);
          if (self.activeName && self.activeName != "advance") {
            if (res.data.detail[self.activeName].specData) {
              self.initSpecData(res.data.detail[self.activeName].specData);
            }
          } else {
            if (res.data.detail.spec_type == 20) {
              self.initSpecData(res.data.specData);
            }
          }
          self.detail = res.data.detail;
          self.show_discount = res.data.show_discount;
          self.discount = res.data.discount;
          self.getServer();
          self.loadding = false;
          common_vendor.index.hideLoading();
          self.$nextTick(() => {
            self.initScroll();
          });
        }
      );
    },
    getServer() {
      let self = this;
      let serverList = [];
      if (self.detail && self.detail.server) {
        self.detail.server.forEach((item, index) => {
          serverList.push(item.name);
        });
      }
      self.serverList = serverList.join("·");
    },
    /*多规格商品*/
    initSpecData(data) {
      for (let i in data.spec_attr) {
        for (let j in data.spec_attr[i].spec_items) {
          data.spec_attr[i].spec_items[j].checked = false;
        }
      }
      this.specData = data;
      if (this.specData.spec_attr) {
        this.specData.spec_attr.forEach((item) => {
          this.alreadyChioce += item.group_name;
          this.alreadyChioce += " / ";
        });
        this.alreadyChioce = this.alreadyChioce.replace(/(\s\/\s)$/gi, "");
      }
    },
    /*选规格*/
    openPopup(e) {
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
        type: e,
        plus_name: ""
      };
      if (this.activeName == "advance") {
        obj.plus_sku = this.detail.advance.sku;
        obj.plus_name = "advance";
      }
      if (this.activeName == "secKill") {
        obj.plus_sku = this.detail.secKill.seckillSku;
        obj.plus_name = "seckill";
      }
      this.productModel = obj;
      this.isPopup = true;
    },
    /*关闭弹窗*/
    closePopup(e, cart_total_num) {
      this.isPopup = false;
      if (e && e.spec_attr) {
        this.alreadyChioce = "";
        let has = "已选：";
        let noone = "";
        e.spec_attr.forEach((item) => {
          if (item.spec_items) {
            let h = "";
            for (let i = 0; i < item.spec_items.length; i++) {
              let child = item.spec_items[i];
              if (child.checked) {
                h = child.spec_value + " / ";
                break;
              }
            }
            if (h != "") {
              has += h;
            } else {
              noone += item.group_name;
            }
          }
        });
        if (noone != "") {
          this.alreadyChioce = noone;
        } else {
          has = has.replace(/(\s\/\s)$/gi, "");
          this.alreadyChioce = has;
        }
      }
      if (cart_total_num) {
        this.cart_total_num = cart_total_num;
      }
    },
    /*查看更多评价*/
    lookEvaluate(product_id) {
      this.gotoPage("/pages/product/detail/look-evaluate/look-evaluate?product_id=" + product_id);
    },
    goback() {
      let routes = getCurrentPages();
      console.log(routes.length);
      if (routes.length <= 1) {
        this.gotoPage("/pages/index/index");
      } else {
        common_vendor.index.navigateBack();
      }
    },
    /*跳转购物车*/
    gotocart() {
      this.gotoPage("/pages/cart/cart");
    },
    //关闭分享
    closeBottmpanel(data) {
      this.isbottmpanel = false;
      if (data.type == 2) {
        this.poster_img = data.poster_img;
        this.isCreatedImg = true;
      }
    },
    closeGuarantee() {
      this.isguarantee = false;
    },
    showGuarantee() {
      this.isguarantee = true;
    },
    //分享按钮
    showShare() {
      let self = this;
      self.isbottmpanel = true;
      self.taskFunc();
    },
    //关闭分享
    closeAppShare(data) {
      this.isAppShare = false;
    },
    //关闭生成图片
    hidePopupFunc() {
      this.isCreatedImg = false;
    },
    //保存海报图片
    savePosterImg() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      common_vendor.index.downloadFile({
        url: self.poster_img,
        success(res) {
          common_vendor.index.hideLoading();
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(data) {
              common_vendor.index.showToast({
                title: "保存成功",
                icon: "success",
                duration: 2e3
              });
              self.isCreatedImg = false;
            },
            fail(err) {
              if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                common_vendor.index.showToast({
                  title: "请允许访问相册后重试",
                  icon: "none",
                  duration: 1e3
                });
                setTimeout(() => {
                  common_vendor.index.openSetting();
                }, 1e3);
              }
            },
            complete(res2) {
              console.log("complete");
            }
          });
        }
      });
    },
    openCoupon() {
      this.isCoupon = !this.isCoupon;
    },
    /*打开客服*/
    openService() {
      if (this.getUserId()) {
        if (this.service_type == 10) {
          this.isMpservice = true;
        }
        if (this.service_type == 20) {
          if (this.detail.chat_user_id && this.detail.chat_user_id != 0) {
            this.gotoPage(
              "/pagesPlus/chat/chat?chat_user_id=" + this.detail.chat_user_id + "&product_id=" + this.product_id + "&shop_supplier_id=" + this.shop_info.shop_supplier_id + "&nickName=" + this.shop_info.name
            );
          } else {
            this.isMpservice = true;
          }
        }
      } else {
        this.doLogin();
      }
    },
    /*关闭客服*/
    closeMpservice() {
      this.isMpservice = false;
    },
    /*关闭优惠券*/
    closeCouponFunc(e) {
      this.isCoupon = false;
    },
    //跳转店铺首页
    goto_shop() {
      let self = this;
      self.gotoPage("/pages/shop/shop?shop_supplier_id=" + self.shop_supplier_id);
    },
    //收藏商品
    favorite() {
      let self = this;
      self._post(
        "user.Favorite/add",
        {
          pid: self.product_id,
          type: 20
        },
        (res) => {
          if (self.isfollow == 0) {
            common_vendor.index.showToast({
              icon: "none",
              title: "收藏成功，请到“我的->我的收藏”查看和管理哦"
            });
            self.isfollow = 1;
          } else if (self.isfollow == 1) {
            self.isfollow = 0;
            common_vendor.index.showToast({
              icon: "none",
              title: "取消成功"
            });
          }
        }
      );
    },
    changeSwiper() {
      this.isVideoPlay = false;
    },
    returnValFunc(e) {
    },
    taskFunc() {
      let self = this;
      self._post(
        "plus.task.Task/dayTask",
        {
          task_type: "product"
        },
        (res) => {
          console.log("分享成功");
        }
      );
    },
    sendFunc(e) {
      this[e]();
    }
  }
};
if (!Array) {
  const _component_previewProduct = common_vendor.resolveComponent("previewProduct");
  const _component_Countdown = common_vendor.resolveComponent("Countdown");
  const _component_spec = common_vendor.resolveComponent("spec");
  const _component_share = common_vendor.resolveComponent("share");
  const _component_guarantee = common_vendor.resolveComponent("guarantee");
  const _component_AppShare = common_vendor.resolveComponent("AppShare");
  const _component_uniPopup = common_vendor.resolveComponent("uniPopup");
  const _component_Mpservice = common_vendor.resolveComponent("Mpservice");
  const _component_coupon = common_vendor.resolveComponent("coupon");
  (_component_previewProduct + _component_Countdown + _component_spec + _component_share + _component_guarantee + _component_AppShare + _component_uniPopup + _component_Mpservice + _component_coupon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goback && $options.goback(...args)),
    b: common_vendor.s(_ctx.topBarHeight() == 0 ? "" : "height:" + _ctx.topBarHeight() + "px;"),
    c: common_vendor.s(_ctx.topBarHeight() == 0 ? "" : "height:" + _ctx.topBarHeight() + "px;padding-top:" + _ctx.topBarTop() + "px"),
    d: !$data.loadding
  }, !$data.loadding ? common_vendor.e({
    e: common_vendor.o((...args) => $options.goback && $options.goback(...args)),
    f: common_vendor.s(_ctx.topBarHeight() == 0 ? "" : "height:" + _ctx.topBarHeight() + "px;"),
    g: $data.scrollId * 1 + 1 < $data.commentTop ? 1 : "",
    h: common_vendor.o(($event) => $data.topId = 0),
    i: $data.scrollId * 1 + 1 < $data.contentTop && $data.scrollId * 1 + 1 > $data.commentTop ? 1 : "",
    j: common_vendor.o(($event) => $data.topId = $data.commentTop),
    k: $data.scrollId * 1 + 1 > $data.contentTop ? 1 : "",
    l: common_vendor.o(($event) => $data.topId = $data.contentTop),
    m: common_vendor.s(_ctx.topBarHeight() == 0 ? "" : "padding-top:" + _ctx.topBarTop() + "px"),
    n: common_vendor.n($data.scrollId < 100 ? "close" : "open"),
    o: common_vendor.s("height:" + _ctx.topBarTop() + "px"),
    p: $data.detail.video_id != 0
  }, $data.detail.video_id != 0 ? common_vendor.e({
    q: !$data.isVideoPlay
  }, !$data.isVideoPlay ? {
    r: common_vendor.o(($event) => $data.isVideoPlay = true)
  } : {}, {
    s: !$data.isVideoPlay
  }, !$data.isVideoPlay ? {
    t: $data.detail.poster ? $data.detail.poster.file_path : $data.detail.image[0].file_path,
    v: common_vendor.o(($event) => $data.isVideoPlay = true)
  } : {}, {
    w: $data.isVideoPlay
  }, $data.isVideoPlay ? {
    x: $data.detail.video.file_path,
    y: $data.isVideoPlay,
    z: common_vendor.o(($event) => $data.isVideoPlay = false),
    A: common_vendor.o(($event) => $data.isVideoPlay = false)
  } : {}) : {}, {
    B: common_vendor.f($data.detail.image, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => _ctx.yulan($data.detail.image, index), index),
        b: item.file_path,
        c: index
      };
    }),
    C: $data.indicatorDots,
    D: $data.autoplay,
    E: $data.interval,
    F: $data.duration,
    G: common_vendor.o((...args) => $options.changeSwiper && $options.changeSwiper(...args)),
    H: $data.is_preview == 1
  }, $data.is_preview == 1 ? common_vendor.e({
    I: !$data.loadding
  }, !$data.loadding ? {
    J: common_vendor.o($options.sendFunc),
    K: common_vendor.p({
      detail: $data.detail,
      is_fav: _ctx.is_fav
    })
  } : {}) : {}, {
    L: $data.ispresale
  }, $data.ispresale ? common_vendor.e({
    M: $data.activeName == "advance"
  }, $data.activeName == "advance" ? {
    N: common_vendor.t(_ctx.subPrice($data.detail[$data.activeName][$data.skuName][0].product_price, "1")),
    O: common_vendor.t(_ctx.subPrice($data.detail[$data.activeName][$data.skuName][0].product_price, "2"))
  } : {
    P: common_vendor.t(_ctx.subPrice($data.detail[$data.activeName][$data.skuName][0][$data.activePrice], "1")),
    Q: common_vendor.t(_ctx.subPrice($data.detail[$data.activeName][$data.skuName][0][$data.activePrice], "2"))
  }, {
    R: $data.activeName == "advance"
  }, $data.activeName == "advance" ? {
    S: common_vendor.t(($data.detail[$data.activeName][$data.skuName][0].product_price * 1 - $data.detail[$data.activeName][$data.skuName][0][$data.activePrice] * 1).toFixed(2))
  } : {}, {
    T: $data.activeName == "advance"
  }, $data.activeName == "advance" ? {
    U: common_vendor.t($data.detail[$data.activeName].money),
    V: common_vendor.t($data.detail[$data.activeName][$data.skuName][0][$data.activePrice])
  } : {}, {
    W: common_vendor.t($data.activeText),
    X: common_vendor.sr("countdown", "f4882731-1"),
    Y: common_vendor.o($options.returnValFunc),
    Z: common_vendor.p({
      config: {
        startstamp: $data.detail[$data.activeName].start_time,
        endstamp: $data.detail[$data.activeName].end_time
      }
    }),
    aa: $data.discount.give_points > 0
  }, $data.discount.give_points > 0 ? {
    ab: common_vendor.t(_ctx.points_name()),
    ac: common_vendor.t(_ctx.points_name()),
    ad: common_vendor.t($data.discount.give_points),
    ae: common_vendor.t(_ctx.points_name())
  } : {}, {
    af: $data.discount.product_reduce.length > 0
  }, $data.discount.product_reduce.length > 0 ? {
    ag: common_vendor.f($data.discount.product_reduce, (item, index, i0) => {
      return common_vendor.e({
        a: item.full_type == 1
      }, item.full_type == 1 ? {
        b: common_vendor.t(item.full_value),
        c: common_vendor.t(item.reduce_value)
      } : {}, {
        d: item.full_type == 2
      }, item.full_type == 2 ? {
        e: common_vendor.t(item.full_value),
        f: common_vendor.t((100 - item.reduce_value) / 10)
      } : {}, {
        g: index,
        h: item,
        i: index
      });
    })
  } : {}, {
    ah: $data.discount.product_coupon.length > 0
  }, $data.discount.product_coupon.length > 0 ? {
    ai: common_vendor.o(($event) => $options.openCoupon())
  } : {}, {
    aj: common_vendor.t($data.detail.product_name),
    ak: $data.detail.selling_point
  }, $data.detail.selling_point ? {
    al: common_vendor.t($data.detail.selling_point)
  } : {}, {
    am: $data.activeName == "advance"
  }, $data.activeName == "advance" ? {
    an: common_vendor.t(($data.detail[$data.activeName][$data.skuName][0].product_price * 1 - $data.detail[$data.activeName][$data.skuName][0][$data.activePrice] * 1).toFixed(2)),
    ao: common_vendor.t($data.detail[$data.activeName].active_time[0]),
    ap: common_vendor.t($data.detail[$data.activeName].active_time[1])
  } : {}) : {}, {
    aq: !$data.ispresale && $data.is_preview != 1
  }, !$data.ispresale && $data.is_preview != 1 ? common_vendor.e({
    ar: $data.detail.is_user_grade
  }, $data.detail.is_user_grade ? {} : {}, {
    as: common_vendor.t($data.detail.product_sku.product_price),
    at: $data.detail.spec_type == 20 && $data.detail.product_sku.product_price != $data.detail.product_max_price
  }, $data.detail.spec_type == 20 && $data.detail.product_sku.product_price != $data.detail.product_max_price ? {
    av: common_vendor.t($data.detail.product_max_price)
  } : {}, {
    aw: common_vendor.o((...args) => $options.showShare && $options.showShare(...args)),
    ax: common_vendor.n($data.isfollow ? "" : "img_gray"),
    ay: common_vendor.n($data.isfollow ? "red" : "gray3"),
    az: common_vendor.o(($event) => $options.favorite()),
    aA: common_vendor.t($data.detail.product_sku.line_price),
    aB: common_vendor.t($data.detail.product_sales),
    aC: $data.discount.give_points > 0
  }, $data.discount.give_points > 0 ? {
    aD: common_vendor.t(_ctx.points_name()),
    aE: common_vendor.t(_ctx.points_name()),
    aF: common_vendor.t($data.discount.give_points),
    aG: common_vendor.t(_ctx.points_name())
  } : {}, {
    aH: $data.discount.product_reduce.length > 0
  }, $data.discount.product_reduce.length > 0 ? {
    aI: common_vendor.f($data.discount.product_reduce, (item, index, i0) => {
      return common_vendor.e({
        a: item.full_type == 1
      }, item.full_type == 1 ? {
        b: common_vendor.t(item.full_value),
        c: common_vendor.t(item.reduce_value)
      } : {}, {
        d: item.full_type == 2
      }, item.full_type == 2 ? {
        e: common_vendor.t(item.full_value),
        f: common_vendor.t((100 - item.reduce_value) / 10)
      } : {}, {
        g: index,
        h: item,
        i: index
      });
    })
  } : {}, {
    aJ: $data.discount.product_coupon.length > 0
  }, $data.discount.product_coupon.length > 0 ? {
    aK: common_vendor.o(($event) => $options.openCoupon())
  } : {}, {
    aL: $data.detail.supplier.store_type == 20
  }, $data.detail.supplier.store_type == 20 ? {} : {}, {
    aM: common_vendor.t($data.detail.product_name),
    aN: $data.detail.selling_point
  }, $data.detail.selling_point ? {
    aO: common_vendor.t($data.detail.selling_point)
  } : {}) : {}, {
    aP: $data.detail.spec_type == 20
  }, $data.detail.spec_type == 20 ? {
    aQ: common_vendor.t($data.alreadyChioce),
    aR: common_vendor.n($data.detail.server != "" ? "border-b-d9" : ""),
    aS: common_vendor.o(($event) => $options.openPopup($data.ispresale ? "deposit" : "order"))
  } : {}, {
    aT: $data.detail.server != ""
  }, $data.detail.server != "" ? {
    aU: common_vendor.t($data.serverList),
    aV: common_vendor.o((...args) => $options.showGuarantee && $options.showGuarantee(...args))
  } : {}, {
    aW: common_vendor.t($data.detail.comment_data_count),
    aX: common_vendor.o(($event) => $options.lookEvaluate($data.detail.product_id)),
    aY: $data.detail.comment_data_count > 0
  }, $data.detail.comment_data_count > 0 ? {
    aZ: common_vendor.f($data.detail.commentData, (item, index, i0) => {
      return common_vendor.e({
        a: index <= 1
      }, index <= 1 ? {
        b: item.user.avatarUrl,
        c: common_vendor.t(item.user.nickName),
        d: common_vendor.t(item.create_time),
        e: common_vendor.t(item.content)
      } : {}, {
        f: index
      });
    })
  } : {}, {
    ba: $data.store_open
  }, $data.store_open ? {
    bb: $data.shop_info.logos,
    bc: common_vendor.t($data.shop_info.name),
    bd: common_vendor.t($data.shop_info.category_name),
    be: common_vendor.t($data.shop_info.product_sales),
    bf: common_vendor.t($data.shop_info.server_score),
    bg: common_vendor.o(($event) => $options.goto_shop())
  } : {}, {
    bh: $data.detail.is_picture == 0
  }, $data.detail.is_picture == 0 ? {
    bi: $data.detail.content
  } : {}, {
    bj: $data.detail.is_picture == 1
  }, $data.detail.is_picture == 1 ? {
    bk: common_vendor.f($data.detail.contentImage, (item, index, i0) => {
      return {
        a: item.file_path,
        b: index
      };
    })
  } : {}, {
    bl: $data.topId,
    bm: common_vendor.o((...args) => $options.scrollFunc && $options.scrollFunc(...args)),
    bn: common_vendor.s("height:" + $data.scrollviewHigh + "px")
  }) : {}, {
    bo: common_vendor.o(($event) => _ctx.gotoPage("/pages/index/index")),
    bp: $data.cart_total_num > 0
  }, $data.cart_total_num > 0 ? {
    bq: common_vendor.t($data.cart_total_num)
  } : {}, {
    br: common_vendor.o(($event) => _ctx.gotoPage("/pages/cart/cart")),
    bs: $data.service_open && $data.shop_info.user_id != $data.user_id
  }, $data.service_open && $data.shop_info.user_id != $data.user_id ? {
    bt: common_vendor.o((...args) => $options.openService && $options.openService(...args))
  } : {}, {
    bv: $data.is_preview == 1
  }, $data.is_preview == 1 ? {} : common_vendor.e({
    bw: !$data.room_id == true && !$data.is_virtual && !$data.ispresale
  }, !$data.room_id == true && !$data.is_virtual && !$data.ispresale ? {
    bx: common_vendor.o(($event) => $options.openPopup("card"))
  } : {}, {
    by: !$data.ispresale
  }, !$data.ispresale ? {
    bz: common_vendor.o(($event) => $options.openPopup("order"))
  } : common_vendor.e({
    bA: $data.activeName == "advance"
  }, $data.activeName == "advance" ? {
    bB: common_vendor.t($data.detail[$data.activeName].money)
  } : {}, {
    bC: common_vendor.o(($event) => $options.openPopup("deposit"))
  })), {
    bD: common_vendor.o($options.closePopup),
    bE: common_vendor.p({
      isPopup: $data.isPopup,
      productModel: $data.productModel,
      room_id: $data.room_id
    }),
    bF: common_vendor.o($options.closeBottmpanel),
    bG: common_vendor.p({
      isbottmpanel: $data.isbottmpanel,
      product_id: $data.product_id
    }),
    bH: common_vendor.o($options.closeGuarantee),
    bI: common_vendor.p({
      isguarantee: $data.isguarantee,
      server: $data.detail.server
    }),
    bJ: common_vendor.o($options.closeAppShare),
    bK: common_vendor.p({
      isAppShare: $data.isAppShare,
      appParams: $data.appParams
    }),
    bL: $data.poster_img,
    bM: common_vendor.o((...args) => $options.savePosterImg && $options.savePosterImg(...args)),
    bN: common_vendor.o($options.hidePopupFunc),
    bO: common_vendor.p({
      show: $data.isCreatedImg,
      type: "middle"
    }),
    bP: $data.isMpservice
  }, $data.isMpservice ? {
    bQ: common_vendor.o($options.closeMpservice),
    bR: common_vendor.p({
      isMpservice: $data.isMpservice,
      shopSupplierId: $data.shop_supplier_id
    })
  } : {}, {
    bS: common_vendor.o($options.closeCouponFunc),
    bT: common_vendor.p({
      isCoupon: $data.isCoupon,
      discount: $data.discount,
      couponList: $data.discount.product_coupon
    }),
    bU: _ctx.theme(),
    bV: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f4882731"], ["__file", "D:/workspace/p/nc/nc_app/pages/product/detail/detail.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
