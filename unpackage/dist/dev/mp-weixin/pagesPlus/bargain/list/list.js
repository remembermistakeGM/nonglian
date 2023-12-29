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
      /*活动类别*/
      categorys: [],
      /*当前活动Is*/
      bargain_activity_id: 0,
      /*商品列表*/
      listData: {
        list: [],
        detail: null
      },
      /*倒计时配置*/
      countdownConfig: {
        /*开始时间*/
        startstamp: 0,
        /*结束时间*/
        endstamp: 0
      },
      /*是否正在加载*/
      loading: true
    };
  },
  computed: {},
  onLoad(e) {
  },
  onShow() {
    this.getCategory();
  },
  onReachBottom() {
  },
  methods: {
    /*初始化*/
    /*类别切换*/
    tabTypeFunc(e, n) {
      this.type_active = e;
      this.bargain_activity_id = n;
      this.productList = [];
      this.getProdct();
    },
    /*获取数据*/
    getCategory() {
      let self = this;
      let param = {};
      self.type_active;
      self._get(
        "plus.bargain.product/active",
        {
          param
        },
        function(res) {
          self.categorys = res.data.list;
          if (self.categorys.length > 0) {
            self.bargain_activity_id = self.categorys[0].bargain_activity_id;
          }
          self.getProdct();
        }
      );
    },
    /*获取商品*/
    getProdct() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      let bargain_activity_id = self.bargain_activity_id;
      self.loading = true;
      self._get(
        "plus.bargain.product/product",
        {
          bargain_activity_id
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
      let url = "pagesPlus/bargain/detail/detail?bargain_product_id=" + e.bargain_product_id;
      this.gotoPage(url);
    },
    /*跳转搜索页面*/
    gotoSearch() {
      this.page = 1;
      this.getData();
    },
    /*倒计时返回值*/
    returnValFunc(e) {
      console.log(e);
    }
  }
};
if (!Array) {
  const _component_Countdown = common_vendor.resolveComponent("Countdown");
  _component_Countdown();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.categorys, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.n($data.bargain_activity_id == item.bargain_activity_id ? "item active" : "item"),
        c: index,
        d: common_vendor.o(($event) => $options.tabTypeFunc(index, item.bargain_activity_id), index)
      };
    }),
    b: $data.listData.detail && $data.categorys.length > 0
  }, $data.listData.detail && $data.categorys.length > 0 ? {
    c: $data.listData.detail.file_path
  } : {}, {
    d: $data.listData.detail && $data.categorys.length > 0
  }, $data.listData.detail && $data.categorys.length > 0 ? {
    e: common_vendor.sr("countdown", "32709542-0"),
    f: common_vendor.o($options.returnValFunc),
    g: common_vendor.p({
      config: $data.countdownConfig
    })
  } : {}, {
    h: !$data.loading
  }, !$data.loading ? {
    i: common_vendor.f($data.listData.list, (item, index, i0) => {
      return {
        a: item.product.file_path,
        b: common_vendor.t(item.product.product_name),
        c: common_vendor.t(item.bargain_price),
        d: common_vendor.t(item.product_price),
        e: common_vendor.o(($event) => $options.gotoDetail(item), index),
        f: index
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/bargain/list/list.vue"]]);
wx.createPage(MiniProgramPage);
