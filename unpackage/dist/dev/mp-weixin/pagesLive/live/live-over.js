"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      /*房间ID*/
      room_id: null,
      /*数据对象*/
      detailData: {}
    };
  },
  onLoad(e) {
    this.room_id = e.room_id;
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      self._get(
        "plus.live.room/detail",
        {
          room_id: self.room_id
        },
        function(res) {
          self.detailData = res.data.model;
        }
      );
    },
    /*提交*/
    gotoHome: function(e) {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.detailData.show_views),
    b: common_vendor.t($data.detailData.gift_num),
    c: common_vendor.t($data.detailData.sales_num),
    d: common_vendor.o((...args) => $options.gotoHome && $options.gotoHome(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1726a989"], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/live-over.vue"]]);
wx.createPage(MiniProgramPage);
