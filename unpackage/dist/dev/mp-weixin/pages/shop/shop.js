"use strict";
const common_vendor = require("../../common/vendor.js");
const uniLoadMore = () => "../../components/uni-load-more.js";
const _sfc_main = {
  components: {
    uniLoadMore
  },
  data() {
    return {
      isLieBiao: true,
      shop_info: "",
      //店铺信息
      product_list: "",
      //商品列表
      adList: "",
      //banner列表
      dataList: "",
      shop_supplier_id: "",
      //店铺ID
      isfollow: "",
      // 是否关注本店
      // ***********
      /*是否显示点*/
      indicatorDots: false,
      /*是否自动*/
      autoplay: true,
      /*切换时间*/
      interval: 5e3,
      /*动画过渡时间*/
      duration: 1e3,
      /*数据列表*/
      listData: [],
      //优惠券列表
      // ************
      /*顶部刷新*/
      topRefresh: false,
      /*底部加载*/
      loading: true,
      /*没有更多*/
      no_more: false,
      /*类别选中*/
      type_active: "all",
      /*价格选中*/
      price_top: false,
      /*店铺列表*/
      shopData: [],
      /*当前页面*/
      page: 1,
      search: "",
      last_page: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      nav_type: 0,
      is_open: 0,
      is_record: 0,
      liveList: [],
      dataModel: {
        qq: "",
        wechat: "",
        phone: ""
      },
      service_type: 0,
      service_open: 0,
      statusBarHeight: 0,
      titleBarHeight: 0
    };
  },
  computed: {
    /*加载中状态*/
    loadingType() {
      if (this.loading) {
        return 1;
      } else {
        if (this.product_list.length != 0 && this.no_more) {
          return 2;
        } else {
          return 0;
        }
      }
    }
  },
  onLoad(option) {
    let self = this;
    self.GetStatusBarHeight();
    self.shop_supplier_id = option.shop_supplier_id;
  },
  onShow() {
  },
  mounted() {
    this.getData();
    this.getProduct(this.type_active);
  },
  onPullDownRefresh() {
    this.restoreData();
    this.getData();
    this.getProduct(this.type_active);
  },
  methods: {
    GetStatusBarHeight() {
      const SystemInfo = common_vendor.index.getSystemInfoSync();
      SystemInfo.statusBarHeight;
      this.statusBarHeight = common_vendor.index.getMenuButtonBoundingClientRect().top;
      this.titleBarHeight = common_vendor.index.getMenuButtonBoundingClientRect().height;
    },
    /*初始化*/
    init() {
      let self = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          self.phoneHeight = res.windowHeight;
          let view = common_vendor.index.createSelectorQuery().in(self).select(".shop_head");
          view.boundingClientRect((data) => {
            let h = self.phoneHeight * 2 - data.height * 2 - 100;
            self.scrollviewHigh = h;
            common_vendor.index.hideLoading();
          }).exec();
        }
      });
    },
    /*可滚动视图区域到底触发*/
    scrolltolowerFunc() {
      let self = this;
      self.bottomRefresh = true;
      self.page++;
      self.loading = true;
      if (self.page > self.last_page) {
        self.loading = false;
        self.no_more = true;
        return;
      }
      self.getProduct(self.type_active);
    },
    getProduct(e) {
      let self = this;
      let page = self.page;
      self.loading = true;
      self._get(
        "product.product/lists",
        {
          page: page || 1,
          sortType: "price",
          sortPrice: 1,
          sortType: e,
          shop_supplier_id: self.shop_supplier_id
        },
        function(res) {
          self.loading = false;
          self.product_list = [...self.product_list, ...res.data.list.data];
          self.last_page = res.data.list.last_page;
          if (res.data.list.last_page <= 1) {
            self.no_more = true;
          }
        }
      );
    },
    /*还原初始化*/
    restoreData() {
      this.shopData = [];
      this.product_list = [];
      this.page = 1;
      this.category_id = 0;
      this.search = "";
      this.sortType = "";
      this.sortPrice = 0;
    },
    getservice() {
      let self = this;
      self.isloding = true;
      self._get(
        "index/mpService",
        {
          shop_supplier_id: self.shop_supplier_id
        },
        function(res) {
          self.dataModel = res.data.mp_service;
          self.isloding = false;
        }
      );
    },
    /*类别切换*/
    tabTypeFunc(e) {
      let self = this;
      if (e != self.type_active) {
        self.product_list = [];
        self.page = 1;
        self.no_more = false;
        self.loading = true;
        self.type_active = e;
        self.getProduct(e);
      }
    },
    //获取数据列表
    getData() {
      let self = this;
      self.loading = true;
      common_vendor.index.showLoading({
        title: "加载中...."
      });
      self._post(
        "supplier.index/index",
        {
          shop_supplier_id: self.shop_supplier_id,
          visitcode: self.getVisitcode()
        },
        (res) => {
          self.loading = false;
          self.shop_info = res.data.detail;
          self.adList = res.data.adList;
          self.isfollow = res.data.detail.isfollow;
          self.listData = res.data.couponList;
          self.is_record = res.data.liv_status.is_record;
          self.is_open = res.data.liv_status.is_open;
          self.liveList = res.data.liveList.data;
          self.service_open = res.data.service_open;
          if (res.data.mp_service) {
            self.service_type = res.data.mp_service.service_type;
          } else {
            self.service_type = 10;
          }
          if (self.scrollviewHigh == 0) {
            setTimeout(function() {
              self.init();
            }, 2001);
          } else {
            common_vendor.index.hideLoading();
          }
          self.getservice();
        }
      );
    },
    //选择图标模式或者列表模式    true 为列表模式  false 为图表模式
    select_type() {
      let self = this;
      self.isLieBiao = !self.isLieBiao;
    },
    //跳转商品页面
    goto_product(product_id) {
      this.gotoPage("/pages/product/detail/detail?product_id=" + product_id);
    },
    //关注店铺/取消关注
    guanzhu() {
      let self = this;
      self._post(
        "user.Favorite/add",
        {
          pid: self.shop_supplier_id,
          type: 10
        },
        (res) => {
          if (self.isfollow == 0) {
            self.isfollow = 1;
          } else if (self.isfollow == 1) {
            self.isfollow = 0;
          }
        }
      );
    },
    /**
     * 领取优惠券
     */
    receiveCoupon: function(index) {
      let self = this;
      let item = self.listData[index];
      if (item.state.value == 0) {
        common_vendor.index.showToast({
          title: "已抢光",
          icon: "none"
        });
        return false;
      }
      self._post(
        "user.coupon/receive",
        {
          coupon_id: item.coupon_id
        },
        function(result) {
          common_vendor.index.showToast({
            title: "领取成功",
            icon: "success",
            mask: true,
            duration: 2e3
          });
          item.state.value = 0;
          item.state.text = "已领取";
        }
      );
      self.getData(self.type_active);
    },
    /*复制*/
    copyQQ(message) {
      common_vendor.index.setClipboardData({
        //准备复制的数据
        data: message,
        success: function(res) {
          common_vendor.index.showToast({
            title: "复制成功",
            icon: "success",
            mask: true,
            duration: 2e3
          });
        }
      });
    },
    /*拨打电话*/
    callPhone(phone) {
      common_vendor.index.makePhoneCall({
        phoneNumber: phone
      });
    },
    toRoom(item) {
      if (item.record_url != "") {
        this.gotoPage("/pagesLive/live/playback?room_id=" + item.room_id);
      } else {
        return false;
      }
    },
    toSevice() {
      if (this.service_type == 10 || this.shop_info.user_id == common_vendor.index.getStorageInfoSync("user_id")) {
        this.nav_type = 3;
      } else if (this.service_type == 20) {
        if (this.shop_info.category_id == 0) {
          common_vendor.index.showToast({
            title: "尚未设置客服",
            icon: "none",
            //如果要纯文本，不要icon，将值设为'none'
            duration: 2e3
            //持续时间为 2秒
          });
        } else {
          if (this.getUserId()) {
            if (this.shop_info.chat_user_id && this.shop_info.chat_user_id != 0) {
              this.gotoPage(
                "/pagesPlus/chat/chat?chat_user_id=" + this.shop_info.chat_user_id + "&shop_supplier_id=" + this.shop_info.shop_supplier_id + "&nickName=" + this.shop_info.store_name
              );
            } else {
              this.nav_type = 3;
            }
          } else {
            this.doLogin();
          }
        }
      }
    },
    goback() {
      common_vendor.index.navigateBack({});
    }
  }
};
if (!Array) {
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  _component_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.s("height:" + _ctx.topBarTop() + "px;"),
    b: common_vendor.o((...args) => $options.goback && $options.goback(...args)),
    c: common_vendor.s(_ctx.topBarHeight() == 0 ? "" : "height:" + _ctx.topBarHeight() + "px;"),
    d: $data.shop_info.logos,
    e: common_vendor.t($data.shop_info.store_name || ""),
    f: common_vendor.t($data.shop_info.category_name || ""),
    g: common_vendor.t($data.shop_info.product_sales || 0),
    h: common_vendor.t($data.shop_info.fav_count || 0),
    i: common_vendor.t($data.shop_info.server_score || 0),
    j: $data.isfollow == 0
  }, $data.isfollow == 0 ? {
    k: common_vendor.o(($event) => $options.guanzhu())
  } : {}, {
    l: $data.isfollow == 1
  }, $data.isfollow == 1 ? {
    m: common_vendor.o(($event) => $options.guanzhu())
  } : {}, {
    n: $data.adList != "" && $data.nav_type == 0
  }, $data.adList != "" && $data.nav_type == 0 ? {
    o: common_vendor.f($data.adList, (item, index, i0) => {
      return {
        a: item.image && item.image.file_path,
        b: index
      };
    })
  } : {}, {
    p: $data.listData.length >= 1 && $data.nav_type == 2
  }, $data.listData.length >= 1 && $data.nav_type == 2 ? {
    q: common_vendor.f($data.listData, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.coupon_type.text),
        b: item.expire_type == 10
      }, item.expire_type == 10 ? {
        c: common_vendor.t(item.start_time.text),
        d: common_vendor.t(item.end_time.text)
      } : {}, {
        e: item.expire_type == 20
      }, item.expire_type == 20 ? {
        f: common_vendor.t(item.expire_day)
      } : {}, {
        g: item.coupon_type == 10
      }, item.coupon_type == 10 ? {
        h: common_vendor.t(item.reduce_price * 1)
      } : {}, {
        i: item.coupon_type == 20
      }, item.coupon_type == 20 ? {
        j: common_vendor.t(item.discount / 10)
      } : {}, {
        k: common_vendor.t(item.min_price > 0 ? "满" + item.min_price * 1 + "元可用" : "无门槛"),
        l: item.is_get == 0
      }, item.is_get == 0 ? {
        m: common_vendor.o(($event) => $options.receiveCoupon(index), index)
      } : {
        n: common_vendor.o(() => {
        }, index)
      }, {
        o: common_vendor.n("coupon-item-" + item.color.text),
        p: item.apply_range == 20
      }, item.apply_range == 20 ? {
        q: common_vendor.o(($event) => _ctx.gotoPage("/pages/coupon/detail?coupon_id=" + item.coupon_id + "&applyRange=" + item.apply_range), index)
      } : item.apply_range == 30 ? {
        s: common_vendor.o(($event) => _ctx.gotoPage("/pages/coupon/detail?coupon_id=" + item.coupon_id + "&apply_range=" + item.apply_range), index)
      } : {}, {
        r: item.apply_range == 30,
        t: index
      });
    })
  } : {}, {
    r: $data.nav_type == 0
  }, $data.nav_type == 0 ? {
    s: common_vendor.n($data.type_active == "all" ? "item active" : "item"),
    t: common_vendor.o(($event) => $options.tabTypeFunc("all")),
    v: common_vendor.n($data.type_active == "sales" ? "item active" : "item"),
    w: common_vendor.o(($event) => $options.tabTypeFunc("sales")),
    x: common_vendor.n($data.type_active == "price" ? "item active" : "item"),
    y: common_vendor.o(($event) => $options.tabTypeFunc("price")),
    z: $data.isLieBiao == true ? "/static/shop/liebiao.png" : "/static/shop/tubiao.png",
    A: common_vendor.o(($event) => $options.select_type())
  } : {}, {
    B: $data.nav_type != 2
  }, $data.nav_type != 2 ? common_vendor.e({
    C: $data.shop_info != ""
  }, $data.shop_info != "" ? common_vendor.e({
    D: $data.isLieBiao == true && $data.nav_type == 0
  }, $data.isLieBiao == true && $data.nav_type == 0 ? {
    E: common_vendor.f($data.product_list, (item, index, i0) => {
      return {
        a: item.product_image,
        b: common_vendor.t(item.product_name),
        c: common_vendor.t(item.product_price),
        d: common_vendor.t(item.product_sales),
        e: common_vendor.n(index == $data.listData.length - 1 ? "noborder" : ""),
        f: index,
        g: common_vendor.o(($event) => $options.goto_product(item.product_id), index)
      };
    })
  } : {}, {
    F: $data.isLieBiao == false && $data.nav_type == 0
  }, $data.isLieBiao == false && $data.nav_type == 0 ? {
    G: common_vendor.f($data.product_list, (item, index, i0) => {
      return {
        a: item.product_image,
        b: common_vendor.t(item.product_name),
        c: common_vendor.t(item.product_price),
        d: common_vendor.t(item.line_price),
        e: common_vendor.t(item.product_sales),
        f: index,
        g: common_vendor.o(($event) => $options.goto_product(item.product_id), index)
      };
    })
  } : {}, {
    H: $data.nav_type == 1
  }, $data.nav_type == 1 ? common_vendor.e({
    I: $data.liveList.length > 0
  }, $data.liveList.length > 0 ? {
    J: common_vendor.f($data.liveList, (liveitem, liveindex, i0) => {
      return common_vendor.e({
        a: liveitem.record_url != ""
      }, liveitem.record_url != "" ? {} : {}, {
        b: liveitem.record_url == ""
      }, liveitem.record_url == "" ? {} : {}, {
        c: liveitem.share.file_path,
        d: liveindex,
        e: common_vendor.o(($event) => $options.toRoom(liveitem), liveindex)
      });
    })
  } : {}) : {}, {
    K: $data.nav_type == 3
  }, $data.nav_type == 3 ? common_vendor.e({
    L: !_ctx.isloding
  }, !_ctx.isloding ? common_vendor.e({
    M: $data.dataModel == null || $data.dataModel.qq == "" && $data.dataModel.wechat == "" && $data.dataModel.phone == ""
  }, $data.dataModel == null || $data.dataModel.qq == "" && $data.dataModel.wechat == "" && $data.dataModel.phone == "" ? {} : {}, {
    N: $data.dataModel != null
  }, $data.dataModel != null ? common_vendor.e({
    O: $data.dataModel.qq != ""
  }, $data.dataModel.qq != "" ? {
    P: common_vendor.t($data.dataModel.qq),
    Q: common_vendor.o(($event) => $options.copyQQ($data.dataModel.qq))
  } : {}, {
    R: $data.dataModel.wechat != ""
  }, $data.dataModel.wechat != "" ? {
    S: common_vendor.t($data.dataModel.wechat),
    T: common_vendor.o(($event) => $options.copyQQ($data.dataModel.qq))
  } : {}, {
    U: $data.dataModel.phone != ""
  }, $data.dataModel.phone != "" ? {
    V: common_vendor.t($data.dataModel.phone),
    W: common_vendor.o(($event) => $options.callPhone($data.dataModel.phone))
  } : {}) : {}) : {}) : {}) : {}, {
    X: $data.nav_type == 0
  }, $data.nav_type == 0 ? common_vendor.e({
    Y: $data.product_list.length == 0 && !$data.loading
  }, $data.product_list.length == 0 && !$data.loading ? {} : {
    Z: common_vendor.p({
      loadingType: $options.loadingType
    })
  }) : {}, {
    aa: common_vendor.s("height:" + $data.scrollviewHigh + "rpx;"),
    ab: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args))
  }) : {}, {
    ac: common_vendor.n($data.nav_type == 0 ? "active" : ""),
    ad: common_vendor.o(($event) => $data.nav_type = 0),
    ae: $data.is_record == 1 && $data.is_open == 1
  }, $data.is_record == 1 && $data.is_open == 1 ? {
    af: common_vendor.n($data.nav_type == 1 ? "active" : ""),
    ag: common_vendor.o(($event) => $data.nav_type = 1)
  } : {}, {
    ah: $data.listData.length > 0
  }, $data.listData.length > 0 ? {
    ai: common_vendor.n($data.nav_type == 2 ? "active" : ""),
    aj: common_vendor.o(($event) => $data.nav_type = 2)
  } : {}, {
    ak: $data.service_open
  }, $data.service_open ? {
    al: common_vendor.n($data.nav_type == 3 ? "active" : ""),
    am: common_vendor.o((...args) => $options.toSevice && $options.toSevice(...args))
  } : {}, {
    an: _ctx.theme(),
    ao: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/shop/shop.vue"]]);
wx.createPage(MiniProgramPage);
