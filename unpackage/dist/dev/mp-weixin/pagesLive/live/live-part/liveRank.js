"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      popupVisible: false,
      /*底部加载*/
      loading: true,
      /*没有更多*/
      no_more: false,
      /*商品列表*/
      listData: [],
      /*当前页面*/
      page: 1,
      /*一页多少条*/
      list_rows: 10
    };
  },
  props: ["room_id"],
  methods: {
    /*请求对象*/
    getRequest() {
      let self = this;
      return self;
    },
    show() {
      this.popupVisible = true;
      this.getRank();
    },
    /*开始*/
    getRank() {
      this.loading = true;
      this.no_more = false;
      this.listData = [];
      this.page = 1;
      this.list_rows = 10;
      this.getData();
    },
    /*获取数据*/
    getData() {
      let self = this;
      let page = self.page;
      let list_rows = self.list_rows;
      console.log(self.room_id);
      self.getRequest()._get(
        "plus.live.room/user_gift",
        {
          page: page || 1,
          list_rows,
          room_id: self.room_id
        },
        function(res) {
          self.loading = false;
          self.listData = self.listData.concat(res.data.list.data);
          self.last_page = res.data.list.last_page;
          if (res.data.list.last_page <= 1) {
            self.no_more = true;
          }
        }
      );
    },
    /*可滚动视图区域到底触发*/
    loadmoreFunc() {
      let self = this;
      self.bottomRefresh = true;
      self.page++;
      self.loading = true;
      if (self.page > self.last_page) {
        self.loading = false;
        self.no_more = true;
        return;
      }
      self.getData();
    },
    close() {
      this.popupVisible = false;
    }
  }
};
if (!Array) {
  const _component_cell = common_vendor.resolveComponent("cell");
  const _component_list = common_vendor.resolveComponent("list");
  (_component_cell + _component_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.popupVisible
  }, $data.popupVisible ? common_vendor.e({
    b: common_vendor.o((...args) => $options.close && $options.close(...args)),
    c: $data.listData.length > 0
  }, $data.listData.length > 0 ? {
    d: common_vendor.f($data.listData, (item, index, i0) => {
      return common_vendor.e({
        a: index == 0
      }, index == 0 ? {
        b: common_vendor.t(index + 1)
      } : {}, {
        c: index == 1
      }, index == 1 ? {
        d: common_vendor.t(index + 1)
      } : {}, {
        e: index == 2
      }, index == 2 ? {
        f: common_vendor.t(index + 1)
      } : {}, {
        g: index != 0 && index != 1 && index != 2
      }, index != 0 && index != 1 && index != 2 ? {
        h: common_vendor.t(index + 1)
      } : {}, {
        i: item.user.avatarUrl,
        j: common_vendor.t(item.user.nickName),
        k: common_vendor.t(item.gift_num),
        l: index,
        m: "6f04bb14-1-" + i0 + ",6f04bb14-0"
      });
    }),
    e: common_vendor.o($options.loadmoreFunc),
    f: common_vendor.p({
      loadmoreoffset: 10
    })
  } : {}, {
    g: $data.listData.length <= 0 && $data.listData != ""
  }, $data.listData.length <= 0 && $data.listData != "" ? {} : {}, {
    h: common_vendor.o(() => {
    })
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6f04bb14"], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/live-part/liveRank.nvue"]]);
wx.createComponent(Component);
