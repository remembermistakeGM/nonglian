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
      assemble_activity_id: 0,
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
  mounted() {
  },
  onReachBottom() {
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
            let h = _this.phoneHeight - data.height;
            _this.scrollviewHigh = h;
          }).exec();
          common_vendor.index.hideLoading();
        }
      });
    },
    /*类别切换*/
    tabTypeFunc(e, n) {
      this.type_active = e;
      this.assemble_activity_id = n;
      this.productList = [];
      this.getProdct();
    },
    /*获取数据*/
    getCategory() {
      let self = this;
      let param = {};
      self.type_active;
      self._get("plus.assemble.product/active", {
        param
      }, function(res) {
        self.categorys = res.data.list;
        if (self.categorys.length > 0) {
          self.assemble_activity_id = self.categorys[0].assemble_activity_id;
        }
        self.getProdct();
      });
    },
    /*获取商品*/
    getProdct() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      let assemble_activity_id = self.assemble_activity_id;
      self.loading = true;
      self._get(
        "plus.assemble.product/product",
        {
          assemble_activity_id
        },
        function(res) {
          self.listData = res.data;
          self.countdownConfig.endstamp = res.data.detail.end_time;
          self.countdownConfig.startstamp = res.data.detail.start_time;
          self.loading = false;
          self.$nextTick(() => {
            self.init();
          });
        }
      );
    },
    /*跳转产品列表*/
    gotoDetail(e) {
      console.log(e);
      this.$refs.countdown.clear();
      let url = "pagesPlus/assemble/detail/detail?assemble_product_id=" + e.assemble_product_id;
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
    a: $data.categorys.length > 0
  }, $data.categorys.length > 0 ? {
    b: common_vendor.f($data.categorys, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.n($data.assemble_activity_id == item.assemble_activity_id ? "item active" : "item"),
        c: index,
        d: common_vendor.o(($event) => $options.tabTypeFunc(index, item.assemble_activity_id), index)
      };
    })
  } : {}, {
    c: $data.listData && $data.listData.detail && $data.categorys.length > 0
  }, $data.listData && $data.listData.detail && $data.categorys.length > 0 ? {
    d: $data.listData.detail.file_path
  } : {}, {
    e: $data.listData && $data.listData.detail && $data.categorys.length > 0
  }, $data.listData && $data.listData.detail && $data.categorys.length > 0 ? {
    f: common_vendor.sr("countdown", "dbe070d6-0"),
    g: common_vendor.o($options.returnValFunc),
    h: common_vendor.p({
      config: $data.countdownConfig
    })
  } : {}, {
    i: !$data.loading
  }, !$data.loading ? {
    j: common_vendor.f($data.listData.list, (item, index, i0) => {
      return {
        a: item.product.file_path,
        b: common_vendor.t(item.product.product_name),
        c: common_vendor.t(item.assemble_price),
        d: common_vendor.t(item.product_price),
        e: common_vendor.t(item.assemble_num),
        f: common_vendor.t(item.product_sales),
        g: common_vendor.o(($event) => $options.gotoDetail(item), index),
        h: index
      };
    }),
    k: common_vendor.s("height:" + $data.scrollviewHigh + "px;")
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/assemble/list/list.vue"]]);
wx.createPage(MiniProgramPage);
