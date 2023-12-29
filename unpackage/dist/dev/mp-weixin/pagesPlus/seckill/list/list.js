"use strict";
const common_vendor = require("../../../common/vendor.js");
const Countdown = () => "../../../components/countdown/countdown.js";
const _sfc_main = {
  components: {
    Countdown
  },
  data() {
    return {
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
      listData: {
        list: [],
        detail: null
      },
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
      status: 0
    };
  },
  computed: {},
  onShow() {
    this.type_active = 0;
    this.getActive();
  },
  mounted() {
    this.init();
  },
  onPullDownRefresh() {
  },
  methods: {
    /*初始化*/
    init() {
      let _this = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          _this.phoneHeight = res.windowHeight;
          let view = common_vendor.index.createSelectorQuery().select(".top-box");
          view.boundingClientRect((data) => {
            let h = _this.phoneHeight - data.height + 43;
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
      common_vendor.index.navigateBack({});
    },
    /*获取活动类别*/
    getActive() {
      let self = this;
      let param = {};
      self.loading = true;
      self._get(
        "plus.seckill.product/active",
        {
          param
        },
        function(res) {
          self.activeList = res.data.list;
          if (self.activeList && self.activeList.length > 0) {
            self.currActive = self.activeList[0];
            self.getData();
          }
        }
      );
    },
    /*获取数据*/
    getData() {
      let self = this;
      self.loading = true;
      self._get(
        "plus.seckill.product/product",
        {
          seckill_activity_id: self.currActive.seckill_activity_id
        },
        function(res) {
          self.listData = res.data;
          self.countdownConfig.endstamp = res.data.detail.end_time;
          self.countdownConfig.startstamp = res.data.detail.start_time;
          common_vendor.index.hideLoading();
          self.loading = false;
        }
      );
    },
    /*跳转产品详情*/
    gotoDetail(e) {
      this.$refs.countdown.clear();
      this.gotoPage("/pages/product/detail/detail?product_id=" + e);
    },
    /*跳转搜索页面*/
    gotoSearch() {
      this.getData();
    },
    /*倒计时返回值*/
    returnValFunc(e) {
      console.log(e);
      this.status = e;
      if (this.listData.detail.status_text == "未开始" && e == 0) {
        this.countdownConfig.endstamp = this.listData.detail.end_time;
        this.countdownConfig.startstamp = this.listData.detail.start_time;
      }
    }
  }
};
if (!Array) {
  const _component_Countdown = common_vendor.resolveComponent("Countdown");
  _component_Countdown();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.activeList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: $data.type_active == index ? 1 : "",
        c: index,
        d: common_vendor.o(($event) => $options.tabTypeFunc(index), index)
      };
    }),
    b: $data.listData.detail
  }, $data.listData.detail ? {
    c: $data.listData.detail.file_path
  } : {}, {
    d: $data.listData.detail
  }, $data.listData.detail ? {
    e: common_vendor.sr("countdown", "51de4088-0"),
    f: common_vendor.o($options.returnValFunc),
    g: common_vendor.p({
      config: $data.countdownConfig
    })
  } : {}, {
    h: $data.listData.list.length > 0
  }, $data.listData.list.length > 0 ? {
    i: common_vendor.t($data.currActive.day_start_time),
    j: common_vendor.t($data.currActive.day_end_time)
  } : {}, {
    k: !$data.loading
  }, !$data.loading ? common_vendor.e({
    l: common_vendor.f($data.listData.list, (item, index, i0) => {
      return common_vendor.e({
        a: item.product.file_path,
        b: common_vendor.t(item.product.product_name),
        c: common_vendor.t(item.seckill_price),
        d: common_vendor.t(item.product_price),
        e: common_vendor.t(item.product_sales),
        f: common_vendor.s("width:" + item.product_sales / (item.product_sales + item.stock) * 100 + "%;"),
        g: $data.status == 0 && item.stock > 0
      }, $data.status == 0 && item.stock > 0 ? {
        h: common_vendor.o(($event) => $options.gotoDetail(item.product_id), index)
      } : {}, {
        i: $data.status == 1 && item.stock > 0
      }, $data.status == 1 && item.stock > 0 ? {} : {}, {
        j: $data.status == 2 && item.stock > 0
      }, $data.status == 2 && item.stock > 0 ? {} : {}, {
        k: item.stock == 0
      }, item.stock == 0 ? {} : {}, {
        l: index
      });
    }),
    m: $data.listData.list.length == 0 && !$data.loading
  }, $data.listData.list.length == 0 && !$data.loading ? {} : {}, {
    n: common_vendor.s("height:" + $data.scrollviewHigh + "px;")
  }) : {}, {
    o: _ctx.theme(),
    p: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/seckill/list/list.vue"]]);
wx.createPage(MiniProgramPage);
