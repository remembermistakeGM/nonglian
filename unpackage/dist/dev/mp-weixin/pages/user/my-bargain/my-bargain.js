"use strict";
const common_vendor = require("../../../common/vendor.js");
const uniLoadMore = () => "../../../components/uni-load-more.js";
const Countdown = () => "../../../components/countdown/countdown.js";
const _sfc_main = {
  components: {
    uniLoadMore,
    Countdown
  },
  data() {
    return {
      /*是否正在加载*/
      loading: true,
      /*手机高度*/
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      /*状态选中*/
      status: 0,
      /*顶部刷新*/
      topRefresh: false,
      /*当前第几页*/
      page: 1,
      /*一页多少条*/
      list_rows: 20,
      /*数据*/
      listData: [],
      /*是否有更多*/
      no_more: false,
      /*倒计时配置*/
      countdownConfig: {
        /*开始时间*/
        startstamp: 0,
        /*结束时间*/
        endstamp: 0,
        /*显示类别*/
        type: "text",
        /*文字*/
        title: "剩余："
      }
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
  onLoad(e) {
  },
  mounted() {
    this.init();
    this.getData();
  },
  methods: {
    /*转换参数*/
    rturnObjec(item) {
      return {
        type: "text",
        startstamp: 0,
        endstamp: item.end_time,
        title: "剩余"
      };
    },
    /*返回百分比*/
    progressReturn(item) {
      if (item.is_floor == 1) {
        return 100;
      } else {
        return item.bargain_rate;
      }
    },
    /*初始化*/
    init() {
      let self = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          self.phoneHeight = res.windowHeight;
          let view = common_vendor.index.createSelectorQuery().select(".top-tabbar");
          view.boundingClientRect((data) => {
            let h = self.phoneHeight - data.height;
            let foot_v = common_vendor.index.createSelectorQuery().select(".more-bargaining");
            foot_v.boundingClientRect((data2) => {
              let h2 = h - data2.height;
              self.scrollviewHigh = h2;
            }).exec();
          }).exec();
        }
      });
    },
    /*状态切换*/
    stateFunc(e) {
      let self = this;
      if (self.status != e) {
        self.listData = [];
        self.page = 1;
        self.status = e;
        self.getData();
      }
    },
    /*获取数据*/
    getData() {
      let self = this;
      self.loading = true;
      self._get(
        "user.bargain/lists",
        {
          page: self.page,
          list_rows: self.list_rows,
          status: self.status
        },
        function(res) {
          self.loading = false;
          self.listData = self.listData.concat(res.data.list.data);
          self.last_page = res.data.list.last_page;
          if (res.data.list.last_page <= 1) {
            self.no_more = true;
            return false;
          }
        }
      );
    },
    /*可滚动视图区域到底触发*/
    scrolltolowerFunc() {
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
    /*查看详情*/
    gotoDetail(e) {
      this.gotoPage("/pagesPlus/bargain/haggle/haggle?bargain_task_id=" + e);
    },
    goback() {
      common_vendor.index.navigateBack({});
    },
    /*查看更多活动*/
    gotoMore() {
      this.gotoPage("/pagesPlus/bargain/list/list");
    },
    /*倒计时返回状态*/
    returnValFunc(e, num) {
      console.log(e, num);
    }
  }
};
if (!Array) {
  const _component_Countdown = common_vendor.resolveComponent("Countdown");
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  (_component_Countdown + _component_uni_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.s("height:" + _ctx.topBarTop() + "px;"),
    b: common_vendor.o((...args) => $options.goback && $options.goback(...args)),
    c: common_vendor.s(_ctx.topBarHeight() == 0 ? "" : "height:" + _ctx.topBarHeight() + "px;"),
    d: common_vendor.n($data.status == 0 ? "tab-item active" : "tab-item"),
    e: common_vendor.o(($event) => $options.stateFunc(0)),
    f: common_vendor.n($data.status == 1 ? "tab-item active" : "tab-item"),
    g: common_vendor.o(($event) => $options.stateFunc(1)),
    h: common_vendor.n($data.status == 2 ? "tab-item active" : "tab-item"),
    i: common_vendor.o(($event) => $options.stateFunc(2)),
    j: common_vendor.f($data.listData, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.create_time)
      }, $data.status == 0 ? {
        b: "5c361a28-0-" + i0,
        c: common_vendor.p({
          config: $options.rturnObjec(item)
        })
      } : {}, {
        d: item.file_path,
        e: common_vendor.t(item.product_name),
        f: common_vendor.t(item.bargain_price),
        g: common_vendor.t(item.product_price),
        h: common_vendor.t($options.progressReturn(item)),
        i: common_vendor.s("width:" + $options.progressReturn(item) + "%;"),
        j: common_vendor.o(($event) => $options.gotoDetail(item.bargain_task_id), index),
        k: index
      });
    }),
    k: $data.status == 0,
    l: $data.listData.length == 0 && !$data.loading
  }, $data.listData.length == 0 && !$data.loading ? {} : {
    m: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    n: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    o: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args)),
    p: common_vendor.o((...args) => $options.gotoMore && $options.gotoMore(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my-bargain/my-bargain.vue"]]);
wx.createPage(MiniProgramPage);
