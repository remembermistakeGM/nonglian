"use strict";
const common_vendor = require("../../common/vendor.js");
const uniLoadMore = () => "../../components/uni-load-more.js";
const _sfc_main = {
  components: {
    uniLoadMore
  },
  data() {
    return {
      /* 设备高度 */
      phoneHeight: 0,
      /* 滑动窗口高度 */
      scrollviewHigh: 0,
      /* 类别列表 */
      categorytype: [],
      /* 当前选中的类别 */
      category_id: 0,
      roomlist: [],
      /* 直播列表 */
      typelist: [],
      isLoading: true,
      /*底部加载*/
      loading: true,
      /*没有更多*/
      no_more: false,
      /*当前页面*/
      page: 1,
      /* 滚动条高度 */
      scrollTopNum: 0,
      params: {
        is_top: 1
      },
      toplist: []
    };
  },
  computed: {
    /*加载中状态*/
    loadingType() {
      if (this.isLoading) {
        return 1;
      } else {
        if (this.typelist.length != 0 && this.no_more) {
          return 2;
        } else {
          return 0;
        }
      }
    }
  },
  onShow() {
    this.getCategory();
  },
  onPageScroll(res) {
    this.scrollTopNum = res.scrollTop;
    console.log(res.scrollTop);
  },
  methods: {
    /*可滚动视图区域到底触发*/
    onReachBottom() {
      let self = this;
      if (self.no_more) {
        return;
      }
      self.page++;
      if (self.page <= self.last_page) {
        self.getData();
      } else {
        self.no_more = true;
      }
    },
    /*初始化*/
    init() {
      let _this = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          _this.phoneHeight = res.windowHeight;
        }
      });
    },
    getCategory() {
      let self = this;
      self.isLoading = true;
      self._post("plus.live.RoomApply/category", {}, function(res) {
        self.categorytype = res.data.list;
        self.typelist.length = self.categorytype.length;
        self.typelist[0] = res.data.list[0];
        self.getData();
        self.init();
      });
    },
    getData() {
      let self = this;
      self.isLoading = true;
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      let params = self.params;
      self._post(
        "plus.live.Room/lists",
        {
          ...params
        },
        function(res) {
          self.toplist = res.data.live.data;
          self.typelist = res.data.list.data;
          common_vendor.index.hideLoading();
          self.isLoading = false;
          self.last_page = res.data.list.last_page;
          if (res.data.list.last_page <= 1) {
            self.no_more = true;
          } else {
            self.no_more = false;
          }
          console.log(self.typelist, "self.typelist");
          console.log(self.toplist, "self.toplist");
        }
      );
    },
    chooseType(id) {
      let self = this;
      self.category_id = id;
      console.log(self.category_id);
      self.params = {
        category_id: self.category_id
      };
      self.getData();
    },
    chooseTop() {
      let self = this;
      self.params = {
        is_top: 1
      };
      self.category_id = 0;
      self.getData();
    },
    chooseFollow() {
      let self = this;
      self.params = {
        is_follow: 1
      };
      self.category_id = 0;
      self.getData();
    },
    toRoom(e) {
      if (e.live_status == 103) {
        if (e.record_url != "") {
          this.gotoPage("/pagesLive/live/playback?room_id=" + e.room_id);
        } else {
          this.showError("暂无回放");
        }
      } else {
        this.gotoPage("/pagesLive/live/live?room_id=" + e.room_id + "&sence=join");
      }
    }
  }
};
if (!Array) {
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  _component_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.toplist
  }, $data.toplist ? {
    b: common_vendor.f($data.toplist, (item, index, i0) => {
      return {
        a: item.avatarUrl,
        b: common_vendor.t(item.user),
        c: index
      };
    })
  } : {}, {
    c: $data.scrollTopNum >= 185
  }, $data.scrollTopNum >= 185 ? {
    d: common_vendor.n($data.params.is_top == 1 ? "type_item_active" : "type_item"),
    e: common_vendor.o(($event) => $options.chooseTop()),
    f: common_vendor.n($data.params.is_follow == 1 ? "type_item_active" : "type_item"),
    g: common_vendor.o(($event) => $options.chooseFollow()),
    h: common_vendor.f($data.categorytype, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n($data.category_id == item.category_id ? "type_item_active" : "type_item"),
        c: index,
        d: common_vendor.o(($event) => $options.chooseType(item.category_id), index)
      };
    })
  } : {}, {
    i: $data.categorytype != ""
  }, $data.categorytype != "" ? common_vendor.e({
    j: common_vendor.n($data.params.is_top == 1 ? "type_item_active" : "type_item"),
    k: common_vendor.o(($event) => $options.chooseTop()),
    l: common_vendor.n($data.params.is_follow == 1 ? "type_item_active" : "type_item"),
    m: common_vendor.o(($event) => $options.chooseFollow()),
    n: common_vendor.f($data.categorytype, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n($data.category_id == item.category_id ? "type_item_active" : "type_item"),
        c: index,
        d: common_vendor.o(($event) => $options.chooseType(item.category_id), index)
      };
    }),
    o: !$data.isLoading && $data.typelist
  }, !$data.isLoading && $data.typelist ? {
    p: common_vendor.f($data.typelist, (liveitem, liveindex, i0) => {
      return common_vendor.e({
        a: liveitem.live_status != 107
      }, liveitem.live_status != 107 ? common_vendor.e({
        b: liveitem.live_status == 103
      }, liveitem.live_status == 103 ? {} : {}, {
        c: liveitem.live_status == 101
      }, liveitem.live_status == 101 ? {} : {}, {
        d: liveitem.live_status == 102
      }, liveitem.live_status == 102 ? {} : {}, {
        e: liveitem.share.file_path,
        f: common_vendor.t(liveitem.name),
        g: liveitem.user.avatarUrl,
        h: common_vendor.t(liveitem.user.nickName),
        i: liveitem.product[0]
      }, liveitem.product[0] ? {
        j: liveitem.product[0].product.image[0].file_path,
        k: common_vendor.t(liveitem.product[0].product.product_price)
      } : {}, {
        l: common_vendor.o(($event) => $options.toRoom(liveitem), liveindex)
      }) : {}, {
        m: liveindex
      });
    })
  } : {}, {
    q: $data.typelist.length == 0 && !$data.isLoading
  }, $data.typelist.length == 0 && !$data.isLoading ? {} : {
    r: common_vendor.p({
      loadingType: $options.loadingType
    })
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/index.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
