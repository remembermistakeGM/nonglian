"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      popupVisible: false,
      /*主播对象*/
      liveUser: {},
      live_user: {},
      /*是否关注*/
      is_follow: false
    };
  },
  props: ["room_id", "shop_supplier_id"],
  methods: {
    show() {
      this.popupVisible = true;
      this.getUser();
    },
    /*请求对象*/
    getRequest() {
      let self = this;
      return self;
    },
    /*获取主播详情*/
    getUser() {
      let self = this;
      self.data_type;
      self.getRequest()._get(
        "plus.live.room/detail",
        {
          room_id: self.room_id
        },
        function(res) {
          self.is_follow = res.data.hasFollow;
          self.live_user = res.data.model;
        }
      );
    },
    /*关注*/
    followFunc() {
      let self = this;
      self.getRequest()._post(
        "user.Favorite/add",
        {
          shop_supplier_id: self.shop_supplier_id,
          pid: self.shop_supplier_id,
          type: 10
        },
        function(res) {
          self.$emit("changeFollow", !self.is_follow);
          self.getUser();
        }
      );
    },
    /*跳转主播个人中心*/
    gotoAnchorPage() {
      this.gotoPage("/pages/shop/shop?shop_supplier_id=" + this.shop_supplier_id);
    },
    close() {
      this.popupVisible = false;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.popupVisible
  }, $data.popupVisible ? common_vendor.e({
    b: common_vendor.o((...args) => $options.close && $options.close(...args)),
    c: $data.live_user
  }, $data.live_user ? {
    d: common_vendor.t($data.live_user.supplier.name),
    e: common_vendor.t($data.live_user.supplier.fav_count),
    f: common_vendor.t($data.live_user.digg_num)
  } : {}, {
    g: !$data.is_follow
  }, !$data.is_follow ? {
    h: common_vendor.o((...args) => $options.followFunc && $options.followFunc(...args))
  } : {}, {
    i: $data.is_follow
  }, $data.is_follow ? {
    j: common_vendor.o((...args) => $options.followFunc && $options.followFunc(...args))
  } : {}, {
    k: common_vendor.o((...args) => $options.gotoAnchorPage && $options.gotoAnchorPage(...args)),
    l: $data.live_user.supplier.logo.file_path,
    m: common_vendor.o(() => {
    })
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-16a187e9"], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/live-part/liveAnchor.nvue"]]);
wx.createComponent(Component);
