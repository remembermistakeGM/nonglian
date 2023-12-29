"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*是否加载完成*/
      loadding: true,
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      /*订单id*/
      order_id: 0,
      /*快递信息*/
      express: {
        list: {}
      }
    };
  },
  onLoad(e) {
    common_vendor.index.showLoading({
      title: "加载中"
    });
    this.order_id = e.order_id;
  },
  mounted() {
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      let order_id = self.order_id;
      self._get("user.order/express", {
        order_id
      }, function(res) {
        self.express = res.data.express;
        self.loadding = false;
        common_vendor.index.hideLoading();
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loadding
  }, !$data.loadding ? {
    b: common_vendor.t($data.express.express_name),
    c: common_vendor.t($data.express.express_no),
    d: common_vendor.f($data.express.list, (item, index, i0) => {
      return {
        a: common_vendor.t(item.context),
        b: common_vendor.t(item.status),
        c: common_vendor.t(item.time),
        d: common_vendor.n(index == 0 ? "active item" : "item"),
        e: index
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/order/express/express.vue"]]);
wx.createPage(MiniProgramPage);
