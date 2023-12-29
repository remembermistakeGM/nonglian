"use strict";
const common_vendor = require("../../common/vendor.js");
const Popup = () => "../uni-popup.js";
const _sfc_main = {
  components: {
    Popup
  },
  data() {
    return {
      /*是否打开*/
      isPopup: false,
      isloding: true,
      /*宽度*/
      width: 600,
      /*数据对象*/
      dataModel: {
        qq: "",
        wechat: "",
        phone: ""
      }
    };
  },
  props: ["shopSupplierId"],
  created() {
    this.isPopup = true;
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      self.isloding = true;
      self._get(
        "index/mpService",
        {
          shop_supplier_id: self.shopSupplierId
        },
        function(res) {
          self.dataModel = res.data.mp_service;
          self.isloding = false;
        }
      );
    },
    /*关闭弹窗*/
    hidePopupFunc(e) {
      this.isPopup = false;
      this.$emit("close");
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
    }
  }
};
if (!Array) {
  const _component_Popup = common_vendor.resolveComponent("Popup");
  _component_Popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.hidePopupFunc(true)),
    b: !$data.isloding
  }, !$data.isloding ? common_vendor.e({
    c: $data.dataModel == null || $data.dataModel.qq == "" && $data.dataModel.wechat == "" && $data.dataModel.phone == ""
  }, $data.dataModel == null || $data.dataModel.qq == "" && $data.dataModel.wechat == "" && $data.dataModel.phone == "" ? {} : {}, {
    d: $data.dataModel != null
  }, $data.dataModel != null ? common_vendor.e({
    e: $data.dataModel.qq != ""
  }, $data.dataModel.qq != "" ? {
    f: common_vendor.t($data.dataModel.qq),
    g: common_vendor.o(($event) => $options.copyQQ($data.dataModel.qq))
  } : {}, {
    h: $data.dataModel.wechat != ""
  }, $data.dataModel.wechat != "" ? {
    i: common_vendor.t($data.dataModel.wechat),
    j: common_vendor.o(($event) => $options.copyQQ($data.dataModel.qq))
  } : {}, {
    k: $data.dataModel.phone != ""
  }, $data.dataModel.phone != "" ? {
    l: common_vendor.t($data.dataModel.phone),
    m: common_vendor.o(($event) => $options.callPhone($data.dataModel.phone))
  } : {}) : {}) : {}, {
    n: common_vendor.o($options.hidePopupFunc),
    o: common_vendor.p({
      show: $data.isPopup,
      width: $data.width,
      padding: 0
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/mpservice/Mpservice.vue"]]);
wx.createComponent(Component);
