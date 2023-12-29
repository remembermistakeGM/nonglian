"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*是否可见*/
      Visible: false,
      poster_img: "",
      /*公众号分享是否显示*/
      wechat_share: false
    };
  },
  props: ["isbottmpanel", "product_id"],
  watch: {
    "isbottmpanel": function(n, o) {
      if (n != o) {
        this.wechat_share = false;
        this.Visible = n;
      }
    }
  },
  methods: {
    /*关闭弹窗*/
    closePopup(type) {
      this.$emit("close", {
        type,
        poster_img: this.poster_img
      });
    },
    //发送给朋友
    share: function() {
    },
    //生成海报
    genePoster: function() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      let source = "wx";
      self._get("product.product/poster", {
        product_id: self.product_id,
        source
      }, (result) => {
        self.poster_img = result.data.qrcode;
        self.closePopup(2);
      }, null, () => {
        common_vendor.index.hideLoading();
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.wechat_share
  }, $data.wechat_share ? {} : {}, {
    b: common_vendor.o((...args) => $options.share && $options.share(...args)),
    c: common_vendor.o((...args) => $options.genePoster && $options.genePoster(...args)),
    d: common_vendor.o(($event) => $options.closePopup(1)),
    e: common_vendor.o(() => {
    }),
    f: common_vendor.n($data.Visible ? "bottom-panel open" : "bottom-panel close"),
    g: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/product/detail/popup/share.vue"]]);
wx.createComponent(Component);
