"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      img_index: 0,
      popupVisible: false,
      type: 0,
      listData: [],
      bg_index: -1
    };
  },
  beforeCreate() {
  },
  methods: {
    show() {
      this.popupVisible = true;
      this.getData();
    },
    getData() {
      let self = this;
      getApp()._get("live.RoomApply/imageInfo", {}, (res) => {
        self.listData = res.data.list;
      });
    },
    close() {
      this.$emit("close");
      this.popupVisible = false;
    },
    selectBg(e, i) {
      console.log("selectBg");
      this.bg_index = i;
      this.$emit("liveSet", e);
    },
    reset() {
      this.img_index = 0;
      this.bg_index = -1;
      this.$emit("liveSet", "");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.popupVisible
  }, $data.popupVisible ? common_vendor.e({
    b: common_vendor.o((...args) => $options.close && $options.close(...args)),
    c: common_vendor.f($data.listData, (item, index, i0) => {
      return common_vendor.e({
        a: $data.img_index == index
      }, $data.img_index == index ? {} : {}, {
        b: common_vendor.t(item.name),
        c: index,
        d: common_vendor.o(($event) => $data.img_index = index, index),
        e: common_vendor.n($data.img_index == index ? "active" : "")
      });
    }),
    d: $data.listData[$data.img_index] && $data.listData[$data.img_index].list
  }, $data.listData[$data.img_index] && $data.listData[$data.img_index].list ? {
    e: common_vendor.f($data.listData[$data.img_index].list, (item, index, i0) => {
      return {
        a: item.link,
        b: common_vendor.n($data.bg_index == index ? "more-box-list-item-active" : ""),
        c: index,
        d: common_vendor.o(($event) => $options.selectBg(item.link, index), index)
      };
    })
  } : {}, {
    f: common_vendor.o((...args) => $options.reset && $options.reset(...args)),
    g: common_vendor.o((...args) => $options.close && $options.close(...args)),
    h: common_vendor.o(() => {
    })
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ca9a7f69"], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/part/background.nvue"]]);
wx.createComponent(Component);
