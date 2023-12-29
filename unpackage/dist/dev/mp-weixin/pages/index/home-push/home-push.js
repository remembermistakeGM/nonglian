"use strict";
const common_vendor = require("../../../common/vendor.js");
const Popup = () => "../../../components/uni-popup.js";
const _sfc_main = {
  components: {
    Popup
  },
  data() {
    return {
      /*是否显示*/
      isPopup: false,
      /*展示类别*/
      type: 0,
      /*宽度*/
      width: 600,
      /*高度*/
      height: 800,
      /*背景颜色*/
      backgroundColor: "none",
      /*阴影*/
      boxShadow: "none",
      form: {},
      coupon: []
    };
  },
  props: ["homepush_data"],
  created() {
  },
  mounted() {
    this.setData();
  },
  methods: {
    /*获取弹出层内容*/
    setData() {
      this.isPopup = true;
      this.form = this.homepush_data;
      this.type = this.homepush_data.type;
      this.coupon = this.homepush_data.coupon;
    },
    /*关闭弹窗*/
    hidePopupFunc(e) {
      common_vendor.index.setStorageSync("homepush_name", this.homepush_data.name);
      this.isPopup = false;
    },
    /*跳转页面*/
    jumpPage(e) {
      this.hidePopupFunc();
      this.gotoPage("/" + e);
    },
    /*领取优惠券*/
    getCoupon() {
      let self = this;
      let coupon_ids = [];
      self.coupon.forEach((item) => {
        coupon_ids.push(item.coupon_id);
      });
      self._get(
        "user.coupon/receiveList",
        {
          coupon_ids: JSON.stringify(coupon_ids)
        },
        function(res) {
          common_vendor.index.showToast({
            title: "领取成功",
            icon: "success",
            mask: true,
            duration: 2e3
          });
          self.hidePopupFunc();
        }
      );
    }
  }
};
if (!Array) {
  const _component_Popup = common_vendor.resolveComponent("Popup");
  _component_Popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.type == 1
  }, $data.type == 1 ? {
    b: $data.form.file_path,
    c: common_vendor.t($data.form.title),
    d: common_vendor.t($data.form.remark),
    e: common_vendor.t($data.form.des),
    f: common_vendor.o(($event) => $options.jumpPage($data.form.link.url))
  } : {}, {
    g: $data.type == 2
  }, $data.type == 2 ? {
    h: $data.form.file_path,
    i: common_vendor.o(($event) => $options.jumpPage($data.form.link.url))
  } : {}, {
    j: $data.type == 3
  }, $data.type == 3 ? common_vendor.e({
    k: $data.form.file_path != null && $data.form.file_path != ""
  }, $data.form.file_path != null && $data.form.file_path != "" ? {
    l: $data.form.file_path
  } : {}, {
    m: common_vendor.f($data.coupon, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.type),
        c: index
      };
    }),
    n: common_vendor.o(($event) => $options.getCoupon())
  }) : {}, {
    o: common_vendor.n($data.type == 1 || $data.type == 3 ? "home-push-bg" : ""),
    p: common_vendor.o(($event) => $options.hidePopupFunc(true)),
    q: common_vendor.o($options.hidePopupFunc),
    r: common_vendor.p({
      show: $data.isPopup,
      width: $data.width,
      height: $data.height,
      backgroundColor: $data.backgroundColor,
      boxShadow: $data.boxShadow,
      padding: 0
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/index/home-push/home-push.vue"]]);
wx.createComponent(Component);
