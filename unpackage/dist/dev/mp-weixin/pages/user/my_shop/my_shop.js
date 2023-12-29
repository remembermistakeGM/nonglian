"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      order_menu_list: [
        {
          image: "/static/icon/pay.png",
          title: "待支付",
          url: "/pages/user/my_shop/my_shop_order?dataType=payment"
        },
        {
          image: "/static/icon/daifahuo.png",
          title: "待发货",
          url: "/pages/user/my_shop/my_shop_order?dataType=delivery"
        },
        {
          image: "/static/icon/daishouhuo.png",
          title: "待收货",
          url: "/pages/user/my_shop/my_shop_order?dataType=received"
        },
        {
          image: "/static/icon/sell.png",
          title: "退款/售后",
          url: "/pages/user/my_shop/after_sale?tianchong=1"
        }
      ],
      menu_list: [
        {
          title_left: "店铺首页",
          title_right: "",
          left_icon: "/static/icon/store_home.png",
          right_icon: "",
          url: "/pages/shop/shop"
        },
        {
          title_left: "店铺数据",
          title_right: "",
          left_icon: "/static/icon/store_data.png",
          right_icon: "",
          url: "/pages/user/my_shop/my_shop_data"
        }
      ],
      shop_data: {
        supplier: {}
      },
      user_id: "",
      shop_supplier_id: "",
      is_open: 0,
      is_full: 0,
      statusBarHeight: 0,
      titleBarHeight: 0,
      msg_count: 0
    };
  },
  onShow() {
    this.get_user_Data();
    this.get_shop_Data();
  },
  onLoad() {
    this.GetStatusBarHeight();
  },
  methods: {
    GetStatusBarHeight() {
      const SystemInfo = common_vendor.index.getSystemInfoSync();
      SystemInfo.statusBarHeight;
      this.statusBarHeight = common_vendor.index.getMenuButtonBoundingClientRect().top;
      this.titleBarHeight = common_vendor.index.getMenuButtonBoundingClientRect().height;
    },
    jumpPage(path) {
      if (path.indexOf("?") != -1) {
        this.gotoPage(path + "&shop_supplier_id=" + this.shop_supplier_id);
      } else {
        this.gotoPage(path + "?shop_supplier_id=" + this.shop_supplier_id);
      }
    },
    // 获取用户数据
    get_user_Data() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._get("user.index/detail", {}, function(res) {
        self.user_id = res.data.userInfo.user_id;
        self.shop_supplier_id = res.data.userInfo.supplierUser.shop_supplier_id;
        self.menu_list[0].url = "/pages/shop/shop?shop_supplier_id=" + self.shop_supplier_id;
        common_vendor.index.hideLoading();
      });
    },
    // 获取店铺成交数据
    get_shop_Data() {
      let self = this;
      self._get("supplier.index/tradeData", {}, function(res) {
        self.shop_data = res.data;
        self.is_open = res.data.is_open;
        self.is_full = res.data.supplier.is_full;
        self.msg_count = res.data.msg_count;
      });
    },
    goback() {
      common_vendor.index.navigateBack();
    },
    // 支付保证金
    gotoPay() {
      this.gotoPage("/pages/order/deposit-pay");
    },
    toLive() {
      this.gotoPage("/pages/user/my_shop/my_live/my-live/my-live?");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.s("height:" + _ctx.topBarTop() + "px;"),
    b: common_vendor.o((...args) => $options.goback && $options.goback(...args)),
    c: common_vendor.s(_ctx.topBarHeight() == 0 ? "" : "height:" + _ctx.topBarHeight() + "px;"),
    d: common_vendor.t($data.shop_data.supplier.cash_money),
    e: common_vendor.t($data.shop_data.totalCount),
    f: common_vendor.t($data.shop_data.todayCount),
    g: common_vendor.t($data.shop_data.supplier.money),
    h: common_vendor.o(($event) => $options.jumpPage("/pages/user/my_shop/my_shop_order?fill=1")),
    i: common_vendor.f($data.order_menu_list, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.title),
        c: common_vendor.o(($event) => $options.jumpPage(item.url), index),
        d: index
      };
    }),
    j: common_vendor.f($data.menu_list, (item, index, i0) => {
      return {
        a: item.left_icon,
        b: common_vendor.t(item.title_left),
        c: index,
        d: common_vendor.o(($event) => $options.jumpPage(item.url), index)
      };
    }),
    k: $data.shop_data.supplier.status != 0
  }, $data.shop_data.supplier.status != 0 ? {} : {
    l: common_vendor.o(($event) => $options.jumpPage("/pages/user/my_shop/pro_admin"))
  }, {
    m: $data.shop_data.supplier.status == 0
  }, $data.shop_data.supplier.status == 0 ? {} : {}, {
    n: $data.shop_data.supplier.status == 10
  }, $data.shop_data.supplier.status == 10 ? {} : {}, {
    o: $data.shop_data.supplier.status == 20
  }, $data.shop_data.supplier.status == 20 ? {
    p: common_vendor.o((...args) => $options.gotoPay && $options.gotoPay(...args))
  } : {}, {
    q: $data.is_open == 1
  }, $data.is_open == 1 ? {
    r: common_vendor.o((...args) => $options.toLive && $options.toLive(...args))
  } : {}, {
    s: common_vendor.t($data.msg_count),
    t: common_vendor.o(($event) => _ctx.gotoPage("/pagesPlus/chat/supplier_chat_list"))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my_shop/my_shop.vue"]]);
wx.createPage(MiniProgramPage);
