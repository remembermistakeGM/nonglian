"use strict";
const common_vendor = require("../../common/vendor.js");
const uniLoadMore = () => "../../components/uni-load-more.js";
const Countdown = () => "../../components/countdown/countdown-act.js";
const _sfc_main = {
  components: {
    uniLoadMore,
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
      list_rows: 10,
      last_page: 0
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
  /** 设置分享内容*/
  onShareAppMessage() {
    return {
      title: "全部分类",
      path: "/pages/product/category?" + this.getShareUrlParams()
    };
  },
  onLoad(e) {
  },
  mounted() {
    this.init();
    this.getData();
  },
  onPullDownRefresh() {
    this.restoreData();
    this.getData();
  },
  methods: {
    /*初始化*/
    init() {
      let _this = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          _this.phoneHeight = res.windowHeight;
          _this.scrollviewHigh = res.windowHeight;
        }
      });
    },
    /*还原初始化*/
    restoreData() {
      this.listData = [];
      this.no_more = false;
      this.page = 1;
    },
    /*获取数据*/
    getData() {
      let self = this;
      let page = self.page;
      let list_rows = self.list_rows;
      self.loading = true;
      self._get(
        "product.product/previewProduct",
        {
          page: page || 1,
          list_rows
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
    /*跳转产品列表*/
    gotoList(e) {
      let url = "pages/product/detail/detail?product_id=" + e;
      this.gotoPage(url);
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
    a: common_vendor.f($data.listData, (item, index, i0) => {
      return {
        a: item.product_image,
        b: common_vendor.t(item.product_name),
        c: common_vendor.sr("countdown", "71cd5d68-0-" + i0, {
          "f": 1
        }),
        d: "71cd5d68-0-" + i0,
        e: common_vendor.p({
          config: {
            startstamp: (/* @__PURE__ */ new Date()).valueOf() / 1e3,
            endstamp: item.preview_time,
            title: " "
          },
          start_name: "距开始仅剩",
          end_name: "距开始仅剩"
        }),
        f: common_vendor.t(item.product_price),
        g: common_vendor.t(item.product_sku.line_price),
        h: index,
        i: common_vendor.o(($event) => $options.gotoList(item.product_id), index)
      };
    }),
    b: $data.listData.length == 0 && !$data.loading
  }, $data.listData.length == 0 && !$data.loading ? {} : {
    c: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    d: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    e: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args)),
    f: _ctx.theme(),
    g: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/preview/list.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
