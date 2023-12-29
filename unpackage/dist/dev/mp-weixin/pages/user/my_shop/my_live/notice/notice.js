"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uniLoadMore = () => "../../../../../components/uni-load-more.js";
const Countdown = () => "../../../../../components/countdown/countdown.js";
const share = () => "../dialog/share.js";
const _sfc_main = {
  components: {
    uniLoadMore,
    share,
    Countdown
  },
  data() {
    return {
      /*手机高度*/
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      /*顶部刷新*/
      topRefresh: false,
      /*底部加载*/
      loading: true,
      /*没有更多*/
      no_more: false,
      /*商品列表*/
      listData: [],
      /*当前页面*/
      page: 1,
      /*一页多少条*/
      list_rows: 10,
      /*是否只是音波*/
      pureAudio: false,
      /*防止两次点击操作间隔太快*/
      tapTime: "",
      /*当前用户名*/
      userName: "",
      /*生成海报*/
      qrcode: null
    };
  },
  computed: {
    /*加载中状态*/
    loadingType() {
      if (this.loading) {
        return 1;
      } else {
        if (this.listData.length != 0 && this.no_more) {
          return 2;
        } else {
          return 0;
        }
      }
    }
  },
  mounted() {
    this.init();
  },
  onShow() {
    this.listData = [];
    this.page = 1;
    this.no_more = false;
    this.getData();
  },
  methods: {
    /*初始化*/
    init() {
      let _this = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          _this.phoneHeight = res.windowHeight;
          let view = common_vendor.index.createSelectorQuery().select(".add-video-btns");
          view.boundingClientRect((data) => {
            let h = _this.phoneHeight - data.height;
            _this.scrollviewHigh = h;
          }).exec();
        }
      });
    },
    getCountdownConfig(item) {
      return {
        startstamp: 0,
        endstamp: item.start_time,
        title: "距开播还剩",
        type: "text"
      };
    },
    /*创建并进入直播间*/
    nowLive: function(item) {
      var nowTime = /* @__PURE__ */ new Date();
      if (nowTime - this.tapTime < 1e3) {
        return;
      }
      var url = "/pagesLive/live/live?sence=create&room_id=" + item.room_id;
      this.gotoPage(url);
      this.tapTime = nowTime;
    },
    /*获取数据*/
    getData() {
      let self = this;
      let page = self.page;
      let list_rows = self.list_rows;
      self.loading = true;
      self._get(
        "plus.live.RoomApply/lists",
        {
          page: page || 1,
          list_rows,
          is_notice: 1
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
    scrolltolowerFunc() {
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
    /*删除*/
    deleteFunc(item) {
      let self = this;
      common_vendor.wx$1.showModal({
        title: "提示",
        content: "您确定要删除吗?",
        success: function(o) {
          if (o.confirm) {
            common_vendor.index.showLoading({
              title: "正在处理"
            });
            self._post(
              "plus.live.RoomApply/delete",
              {
                room_id: item.room_id
              },
              function(res) {
                common_vendor.index.hideLoading();
                common_vendor.index.showToast({
                  title: res.msg,
                  duration: 2e3,
                  icon: "success"
                });
                self.listData = [];
                self.page = 1;
                self.getData();
              }
            );
          } else {
            common_vendor.index.showToast({
              title: "取消收货",
              duration: 1e3,
              icon: "none"
            });
          }
        }
      });
    },
    /*跳转页面*/
    addRoom() {
      this.gotoPage("/pages/user/my_shop/my_live/add/add");
    },
    /*添加直播产品*/
    gotoListFunc(e) {
      this.gotoPage("/pages/user/my-live/productsList/productsList?room_id=" + e.room_id);
    },
    /*生成海报*/
    livePoster(e) {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      let source = "wx";
      self._get("plus.live.Room/poster", {
        room_id: e.room_id,
        source
      }, (result) => {
        self.qrcode = result.data.qrcode;
      }, null, () => {
        common_vendor.index.hideLoading();
      });
    },
    /**/
    closeShare() {
      this.qrcode = null;
    }
  }
};
if (!Array) {
  const _component_Countdown = common_vendor.resolveComponent("Countdown");
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  const _component_share = common_vendor.resolveComponent("share");
  (_component_Countdown + _component_uni_load_more + _component_share)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.listData, (item, index, i0) => {
      return common_vendor.e({
        a: item.share.file_path,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.start_time_text),
        d: item.live_status == 102
      }, item.live_status == 102 ? {
        e: "4ced4806-0-" + i0,
        f: common_vendor.p({
          config: $options.getCountdownConfig(item)
        })
      } : {}, {
        g: item.live_status == 101
      }, item.live_status == 101 ? {} : {}, {
        h: item.live_status != 101 && item.live_status != 102
      }, item.live_status != 101 && item.live_status != 102 ? {} : {}, {
        i: item.live_status == 0
      }, item.live_status == 0 ? {} : {}, {
        j: common_vendor.o(($event) => $options.deleteFunc(item), index),
        k: common_vendor.o(($event) => $options.livePoster(item), index),
        l: index
      });
    }),
    b: $data.listData.length == 0 && !$data.loading
  }, $data.listData.length == 0 && !$data.loading ? {} : {
    c: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    d: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    e: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args)),
    f: common_vendor.o((...args) => $options.addRoom && $options.addRoom(...args)),
    g: $data.qrcode != null
  }, $data.qrcode != null ? {
    h: common_vendor.o($options.closeShare),
    i: common_vendor.p({
      qrcode: $data.qrcode
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4ced4806"], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my_shop/my_live/notice/notice.vue"]]);
wx.createPage(MiniProgramPage);
