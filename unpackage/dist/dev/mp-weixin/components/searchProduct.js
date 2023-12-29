"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      form: {},
      arr: []
    };
  },
  mounted() {
    this.getData();
  },
  props: ["isShow"],
  methods: {
    /*获取缓存里的搜索历史*/
    getData() {
      let self = this;
      common_vendor.index.getStorage({
        key: "search_list",
        success: function(res) {
          if (res != null && res.data != null) {
            self.arr = res.data;
          }
        }
      });
    },
    /* 禁止手动滑动 */
    stopTouchMove() {
      return true;
    },
    /*搜索*/
    search(str) {
      let self = this;
      let search = null;
      if (str != null) {
        search = str;
      } else {
        search = this.form.keyWord;
        let arrs = this.arr;
        if (typeof search != "undefined" && search != null && search != "") {
          arrs.push(search);
        } else {
          common_vendor.index.showToast({
            title: "请输入搜索的关键字",
            icon: "none",
            duration: 2e3
          });
          return false;
        }
        common_vendor.index.setStorage({
          key: "search_list",
          data: arrs,
          success: function() {
            console.log("success");
          }
        });
      }
      let category_id = 0;
      let sortType = "all";
      self.gotoPage("/pages/product/list/list?search=" + search + "&category_id=" + category_id + "&sortType=" + sortType);
    },
    /*清楚缓存*/
    clearStorage() {
      let self = this;
      common_vendor.index.removeStorage({
        key: "search_list",
        success: function(res) {
          self.arr = [];
        }
      });
    },
    closeSearch() {
      this.$emit("close");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.isShow
  }, $props.isShow ? {
    b: common_vendor.s("height:" + _ctx.topBarTop() + "px;"),
    c: common_vendor.o((...args) => $options.closeSearch && $options.closeSearch(...args)),
    d: common_vendor.s(_ctx.topBarHeight() == 0 ? "" : "height:" + _ctx.topBarHeight() + "px;"),
    e: common_vendor.o(($event) => $options.search()),
    f: $data.form.keyWord,
    g: common_vendor.o(($event) => $data.form.keyWord = $event.detail.value),
    h: common_vendor.s(_ctx.topBarHeight() == 0 ? "" : "height:" + _ctx.topBarHeight() + "px;"),
    i: common_vendor.s(_ctx.topBarHeight() == 0 ? "" : "height:" + _ctx.topBarHeight() + "px;padding-right: 200rpx"),
    j: common_vendor.o((...args) => $options.clearStorage && $options.clearStorage(...args)),
    k: common_vendor.f($data.arr, (item, index, i0) => {
      return {
        a: common_vendor.t($data.arr[index]),
        b: index,
        c: common_vendor.o(($event) => $options.search($data.arr[index]), index)
      };
    }),
    l: common_vendor.o((...args) => $options.stopTouchMove && $options.stopTouchMove(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/searchProduct.vue"]]);
wx.createComponent(Component);
