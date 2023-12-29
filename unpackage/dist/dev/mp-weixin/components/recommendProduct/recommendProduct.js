"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*数据*/
      listData: [],
      isShow: false,
      showName: ""
    };
  },
  created() {
    this.getData();
  },
  props: ["location"],
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      self.page;
      self._post(
        "product.product/recommendProduct",
        {
          location: self.location
        },
        function(res) {
          if (res.data.is_recommend == true) {
            self.isShow = true;
            self.showName = res.data.recommend.name;
            self.listData = res.data.list;
          }
        }
      );
    },
    /*推荐商品跳转*/
    gotoProduct(e) {
      let url = "pages/product/detail/detail?product_id=" + e;
      this.gotoPage(url);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isShow
  }, $data.isShow ? {
    b: common_vendor.t($data.showName),
    c: common_vendor.f($data.listData, (item, index, i0) => {
      return {
        a: item.product_image,
        b: common_vendor.t(item.product_name),
        c: common_vendor.t(item.product_sku.product_price),
        d: index,
        e: common_vendor.o(($event) => $options.gotoProduct(item.product_id), index)
      };
    }),
    d: _ctx.theme(),
    e: common_vendor.n(_ctx.theme() || "")
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/recommendProduct/recommendProduct.vue"]]);
wx.createComponent(Component);
