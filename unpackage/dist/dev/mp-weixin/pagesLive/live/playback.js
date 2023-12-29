"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      room_id: 0,
      url: ""
    };
  },
  onLoad(e) {
    this.room_id = e.room_id;
    this.getData();
  },
  methods: {
    getData() {
      let self = this;
      self.loading = true;
      self._get(
        "plus.live.room/detail",
        {
          room_id: self.room_id
        },
        function(res) {
          self.url = res.data.model.record_url;
        }
      );
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.url
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/playback.vue"]]);
wx.createPage(MiniProgramPage);
