"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  created() {
    console.log(this.itemData.params);
  },
  props: ["itemData"],
  methods: {
    /*拨打电话*/
    callPhone() {
      let self = this;
      common_vendor.index.makePhoneCall({
        phoneNumber: self.itemData.params.phone_num
      });
    },
    gotoService() {
      if (this.getUserId()) {
        this.gotoPage("/pagesPlus/chat/chat?chat_user_id=" + this.itemData.data + "&nickName=平台客服");
      } else {
        this.doLogin();
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.itemData.params.type == "phone"
  }, $props.itemData.params.type == "phone" ? {
    b: $props.itemData.params.image,
    c: common_vendor.o((...args) => $options.callPhone && $options.callPhone(...args))
  } : {}, {
    d: $props.itemData.params.type == "chat" && $props.itemData.data
  }, $props.itemData.params.type == "chat" && $props.itemData.data ? {
    e: $props.itemData.params.image,
    f: common_vendor.o((...args) => $options.gotoService && $options.gotoService(...args))
  } : {}, {
    g: $props.itemData.style.right + "%",
    h: $props.itemData.style.bottom + "%",
    i: $props.itemData.style.opacity / 100
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/diy/service/service.vue"]]);
wx.createComponent(Component);
