"use strict";
const common_vendor = require("../../../common/vendor.js");
const Adress = () => "./address/address.js";
const _sfc_main = {
  data() {
    return {
      isAddress: false,
      store_id: 0
    };
  },
  components: {
    Adress
  },
  props: ["extract_store", "last_extract", "chooseSotr"],
  onLoad() {
  },
  mounted() {
  },
  methods: {
    /*添加地址*/
    addAddress() {
      let store_id = -1;
      if (this.extract_store.store_id) {
        store_id = this.extract_store.store_id;
      }
      this.store_id = store_id;
      this.isAddress = true;
    },
    closeAdress() {
      this.isAddress = false;
    }
  }
};
if (!Array) {
  const _component_Adress = common_vendor.resolveComponent("Adress");
  _component_Adress();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$props.extract_store.store_id
  }, !$props.extract_store.store_id ? {
    b: common_vendor.o(($event) => $options.addAddress())
  } : {
    c: common_vendor.t($props.extract_store.region.province),
    d: common_vendor.t($props.extract_store.region.city),
    e: common_vendor.t($props.extract_store.region.region),
    f: common_vendor.t($props.extract_store.store_name),
    g: common_vendor.t($props.extract_store.address),
    h: common_vendor.t($props.extract_store.phone),
    i: common_vendor.o(($event) => $options.addAddress())
  }, {
    j: common_vendor.o($options.closeAdress),
    k: common_vendor.p({
      isAddress: $data.isAddress,
      chooseSotr: $props.chooseSotr,
      store_id: $data.store_id
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-db2bb2e6"], ["__file", "D:/workspace/p/nc/nc_app/pages/order/confirm-order/store-info.vue"]]);
wx.createComponent(Component);
