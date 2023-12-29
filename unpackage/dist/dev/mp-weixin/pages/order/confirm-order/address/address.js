"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*数据*/
      listData: [],
      isLoading: true,
      // 是否正在加载中
      storeList: [],
      // 门店列表,
      longitude: "",
      latitude: "",
      selectedId: -1,
      Visible: false,
      url: ""
    };
  },
  props: ["isAddress", "store_id", "chooseSotr"],
  watch: {
    isAddress(val) {
      this.Visible = val;
      if (val) {
        this.selectedId = this.$props.store_id;
        console.log(this.selectedId);
        this.getData(true);
        this.getLocation();
      }
    }
  },
  methods: {
    /*授权启用定位权限 */
    onAuthorize() {
      let self = this;
      common_vendor.index.openSetting({
        success(res) {
          if (res.authSetting["scope.userLocation"]) {
            console.log("授权成功");
            self.isAuthor = true;
            setTimeout(() => {
              self.getLocation((res2) => {
              });
            }, 1e3);
          }
        }
      });
    },
    /**
     * 获取用户坐标
     */
    getLocation(callback) {
      let self = this;
      common_vendor.index.getLocation({
        type: "wgs84",
        success(res) {
          self.longitude = res.longitude;
          self.latitude = res.latitude;
          self.getData(false);
        },
        fail() {
          common_vendor.index.showToast({
            title: "获取定位失败，请点击右下角按钮打开定位权限",
            duration: 2e3,
            icon: "none"
          });
          self.isAuthor = false;
        }
      });
    },
    /**
     * 公众号获取位置
     */
    getWxLocation(signPackage, callback) {
      let self = this;
      jweixin.config(JSON.parse(signPackage));
      jweixin.ready(function(res) {
        jweixin.getLocation({
          type: "wgs84",
          success: function(res2) {
            self.longitude = res2.longitude;
            self.latitude = res2.latitude;
            self.getData(false);
          }
        });
      });
      jweixin.error(function(res) {
        console.log(res);
      });
    },
    /*获取数据*/
    getData(isFirst) {
      let self = this;
      self.isLoading = true;
      self._get("store.store/lists", {
        longitude: self.longitude,
        latitude: self.latitude,
        shop_supplier_id: self.$props.chooseSotr,
        url: self.url
      }, function(res) {
        self.isLoading = false;
        self.storeList = res.data.list;
      });
    },
    closeFunc() {
      this.$emit("close", null);
    },
    /* 选择门店 */
    onSelectedStore(e) {
      let self = this;
      self.selectedId = e;
      self.$fire.fire("selectStoreId", e);
      this.$emit("close", e);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.Visible
  }, $data.Visible ? {
    b: common_vendor.o((...args) => $options.closeFunc && $options.closeFunc(...args))
  } : {}, {
    c: common_vendor.f($data.storeList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.store_name),
        b: common_vendor.t(item.phone),
        c: common_vendor.t(item.region.province),
        d: common_vendor.t(item.region.city),
        e: common_vendor.t(item.region.region),
        f: common_vendor.t(item.address),
        g: common_vendor.t(item.distance_unit),
        h: common_vendor.o(($event) => $options.onSelectedStore(item), index),
        i: common_vendor.n(item.store_id == $data.selectedId ? "active" : ""),
        j: index
      };
    }),
    d: !$data.isLoading && !$data.storeList.length
  }, !$data.isLoading && !$data.storeList.length ? {} : {}, {
    e: common_vendor.n($data.Visible ? "address-distr_open" : "address-distr_close"),
    f: common_vendor.n(_ctx.theme() || ""),
    g: _ctx.theme()
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/order/confirm-order/address/address.vue"]]);
wx.createComponent(Component);
