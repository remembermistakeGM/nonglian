"use strict";
const common_vendor = require("../../common/vendor.js");
const Countdown = () => "../../components/countdown/countdown-presale.js";
const _sfc_main = {
  components: {
    Countdown
  },
  data() {
    return {
      current: 0,
      banner: [],
      /*手机高度*/
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      /*活动列表*/
      activeList: [],
      /*当前活动角标*/
      type_active: 0,
      /*类别选中*/
      currActive: {},
      /*产品列表*/
      listData: [],
      /*当前页面*/
      page: 1,
      /*没有更多*/
      no_more: false,
      /*活动详情*/
      detailData: {},
      /*是否正在加载*/
      loading: true,
      /*倒计时配置*/
      countdownConfig: {
        /*开始时间*/
        startstamp: 0,
        /*结束时间*/
        endstamp: 0
      },
      searchForm: ""
    };
  },
  computed: {},
  onLoad() {
    this.getData();
  },
  mounted() {
    this.init();
  },
  onPullDownRefresh() {
  },
  methods: {
    search() {
      this.listData = [];
      this.page = 1;
      this.loading = true;
      this.getData();
    },
    changeSwiper(e) {
      this.current = e.detail.current;
    },
    /*初始化*/
    init() {
      let _this = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          _this.phoneHeight = res.windowHeight;
          let view = common_vendor.index.createSelectorQuery().select(".top-box");
          view.boundingClientRect((data) => {
            let h = _this.phoneHeight - data.height;
            _this.scrollviewHigh = h;
          }).exec();
        }
      });
    },
    /*类别切换*/
    tabTypeFunc(e) {
      this.type_active = e;
      this.currActive = this.activeList[e];
      this.getData();
    },
    goback() {
      common_vendor.index.navigateBack();
    },
    /*可滚动视图区域到底触发*/
    scrolltolowerFunc() {
      let self = this;
      self.page++;
      self.loading = true;
      if (self.page > self.last_page) {
        self.loading = false;
        self.no_more = true;
        return;
      }
      self.getData();
    },
    /*获取数据*/
    getData() {
      let self = this;
      self.loading = true;
      self._get(
        "plus.advance.Product/index",
        {
          search: self.searchForm,
          page: self.page
        },
        function(res) {
          self.banner = res.data.setting.image;
          console.log(self.banner);
          self.loading = false;
          self.listData = self.listData.concat(res.data.list.data);
          self.last_page = res.data.list.last_page;
          if (res.data.list.last_page <= 1) {
            self.no_more = true;
          }
        }
      );
    },
    /*跳转产品详情*/
    gotoDetail(e) {
      this.gotoPage("/pages/product/detail/detail?product_id=" + e);
    },
    /*跳转搜索页面*/
    gotoSearch() {
      this.getData();
    },
    /*倒计时返回值*/
    returnValFunc(e) {
    }
  }
};
if (!Array) {
  const _component_Countdown = common_vendor.resolveComponent("Countdown");
  _component_Countdown();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.search()),
    b: $data.searchForm,
    c: common_vendor.o(($event) => $data.searchForm = $event.detail.value),
    d: common_vendor.o(($event) => _ctx.gotoPage("/pages/order/myorder")),
    e: !$data.loading
  }, !$data.loading ? common_vendor.e({
    f: common_vendor.f($data.banner, (item, index, i0) => {
      return {
        a: item.file_path,
        b: index,
        c: common_vendor.o(($event) => _ctx.gotoPages(item), index)
      };
    }),
    g: common_vendor.o((...args) => $options.changeSwiper && $options.changeSwiper(...args)),
    h: common_vendor.f($data.banner, (item, index, i0) => {
      return {
        a: common_vendor.n($data.current == index ? "swiper-dot active" : "swiper-dot"),
        b: common_vendor.s($data.current == index ? "background-color:#ffffff;" : ""),
        c: index
      };
    }),
    i: common_vendor.f($data.listData, (item, index, i0) => {
      return {
        a: item.product_image,
        b: common_vendor.t(item.product.product_name),
        c: common_vendor.sr("countdown", "4dce0e06-0-" + i0, {
          "f": 1
        }),
        d: common_vendor.o($options.returnValFunc, index),
        e: "4dce0e06-0-" + i0,
        f: common_vendor.p({
          color: "#999999",
          timeSize: "22rpx",
          config: {
            startstamp: item.start_time,
            endstamp: item.end_time
          }
        }),
        g: common_vendor.t(item.money),
        h: common_vendor.t(item.sku[0].advance_price),
        i: common_vendor.t((item.sku[0].product_price * 1 - item.sku[0].advance_price * 1).toFixed(2)),
        j: common_vendor.o(($event) => $options.gotoDetail(item.product.product_id), index),
        k: index
      };
    }),
    j: $data.listData.length == 0 && !$data.loading
  }, $data.listData.length == 0 && !$data.loading ? {} : {}, {
    k: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    l: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args))
  }) : {}, {
    m: _ctx.theme(),
    n: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/presale/list.vue"]]);
wx.createPage(MiniProgramPage);
