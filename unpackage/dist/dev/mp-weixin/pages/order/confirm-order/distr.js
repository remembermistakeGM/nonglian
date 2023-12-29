"use strict";
const common_vendor = require("../../../common/vendor.js");
const Storeinfo = () => "./store-info.js";
const _sfc_main = {
  data() {
    return {
      /*是否可见*/
      Visible: false,
      checked_id: 10,
      choose_store_id: 0
    };
  },
  components: {
    Storeinfo
  },
  props: ["isDist", "extract_store", "last_extract", "deliverySetting", "chooseSotr"],
  watch: {
    isDist(val) {
      this.Visible = val;
    }
  },
  onLoad(options) {
    let self = this;
    self.options = options;
  },
  methods: {
    closePopup(e) {
      if (this.checked_id == 20 && this.$props.extract_store.store_id == null) {
        common_vendor.index.showToast({
          icon: "none",
          title: "请选择自提点"
        });
      } else {
        this.$emit("close", this.checked_id);
      }
    },
    radioChange(n) {
      let self = this;
      self.checked_id = n;
      self.$fire.fire("checkedfir", n);
    },
    hasType(n) {
      return this.deliverySetting.indexOf(n) != -1;
    }
  }
};
if (!Array) {
  const _component_Storeinfo = common_vendor.resolveComponent("Storeinfo");
  _component_Storeinfo();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args)),
    b: $options.hasType("10")
  }, $options.hasType("10") ? {
    c: $data.checked_id == 10,
    d: common_vendor.o(($event) => $options.radioChange(10))
  } : {}, {
    e: $options.hasType("20")
  }, $options.hasType("20") ? {
    f: $data.checked_id == 20,
    g: common_vendor.sr("getShopinfoData", "496b3ca0-0"),
    h: common_vendor.p({
      extract_store: $props.extract_store,
      chooseSotr: $props.chooseSotr,
      last_extract: $props.last_extract
    }),
    i: common_vendor.o(($event) => $options.radioChange(20))
  } : {}, {
    j: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args)),
    k: common_vendor.o(() => {
    }),
    l: common_vendor.n($data.Visible ? "usable-distr open" : "usable-distr close")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/order/confirm-order/distr.vue"]]);
wx.createComponent(Component);
