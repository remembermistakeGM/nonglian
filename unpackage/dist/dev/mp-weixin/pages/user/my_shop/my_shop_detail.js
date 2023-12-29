"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      order_id: "",
      //订单id
      detail: {},
      product_list: [],
      specData: {},
      index: 0,
      price: 0
    };
  },
  onLoad(e) {
    let self = this;
    self.settled_id = e.settled_id;
  },
  onShow() {
    this.getData();
  },
  methods: {
    //获取商品数据
    getData() {
      let self = this;
      self._get("supplier.index/settledetail", {
        settled_id: self.settled_id
      }, (res) => {
        self.product_list = res.data.order.product;
        self.detail = res.data.model;
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.detail.create_time),
    b: common_vendor.t($data.detail.order_money),
    c: common_vendor.t($data.detail.pay_money),
    d: common_vendor.t($data.detail.express_money),
    e: common_vendor.t($data.detail.real_supplier_money),
    f: common_vendor.t($data.detail.supplier_money),
    g: common_vendor.t($data.detail.refund_money),
    h: common_vendor.t($data.detail.agent_money),
    i: common_vendor.t($data.detail.sys_money),
    j: common_vendor.t($data.detail.real_sys_money),
    k: common_vendor.t($data.detail.refund_sys_money),
    l: common_vendor.f($data.product_list, (item, index, i0) => {
      return common_vendor.e({
        a: item.image.file_path,
        b: common_vendor.t(item.product_name),
        c: item.product_attr != ""
      }, item.product_attr != "" ? {
        d: common_vendor.t(item.product_attr)
      } : {}, {
        e: common_vendor.t(item.total_num),
        f: common_vendor.t(item.total_pay_price),
        g: item.refund_money
      }, item.refund_money ? {
        h: common_vendor.t(item.refund_money)
      } : {}, {
        i: common_vendor.t(item.first_money),
        j: common_vendor.t(item.second_money),
        k: common_vendor.t(item.third_money),
        l: index
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my_shop/my_shop_detail.vue"]]);
wx.createPage(MiniProgramPage);
