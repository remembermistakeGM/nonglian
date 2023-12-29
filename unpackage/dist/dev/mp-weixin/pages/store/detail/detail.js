"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*是否正在加载*/
      loading: true,
      /*门店ID*/
      store_id: null,
      /*门店详情*/
      storeDetail: {},
      /*标记点*/
      covers: []
    };
  },
  onLoad(e) {
    this.store_id = e.store_id;
  },
  mounted() {
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._get(
        "store.store/detail",
        {
          store_id: self.store_id
        },
        function(res) {
          self.storeDetail = res.data.detail;
          let obj = {
            latitude: res.data.detail.latitude,
            longitude: res.data.detail.longitude
          };
          self.covers.push(obj);
          self.loading = false;
          common_vendor.index.hideLoading();
        }
      );
    },
    /*拨打电话*/
    callPhone(phone) {
      common_vendor.index.makePhoneCall({
        phoneNumber: phone
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loading
  }, !$data.loading ? {
    b: $data.storeDetail.logo.file_path,
    c: common_vendor.t($data.storeDetail.store_name),
    d: common_vendor.t($data.storeDetail.shop_hours),
    e: common_vendor.t($data.storeDetail.phone),
    f: common_vendor.o(($event) => $options.callPhone($data.storeDetail.phone)),
    g: common_vendor.t($data.storeDetail.linkman),
    h: common_vendor.t($data.storeDetail.status.text),
    i: common_vendor.t($data.storeDetail.is_check.text),
    j: common_vendor.t($data.storeDetail.region.province),
    k: common_vendor.t($data.storeDetail.region.city),
    l: common_vendor.t($data.storeDetail.region.region),
    m: common_vendor.t($data.storeDetail.address),
    n: common_vendor.t($data.storeDetail.summary),
    o: $data.storeDetail.latitude,
    p: $data.storeDetail.longitude,
    q: $data.covers
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/store/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
