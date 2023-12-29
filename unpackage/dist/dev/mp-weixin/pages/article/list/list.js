"use strict";
const common_vendor = require("../../../common/vendor.js");
const uniLoadMore = () => "../../../components/uni-load-more.js";
const _sfc_main = {
  components: {
    uniLoadMore
  },
  data() {
    return {
      /*是否加载完成*/
      loading: true,
      /*手机高度*/
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      /*数据列表*/
      listData: [],
      /*是否有更多*/
      no_more: null,
      /*一页多少条*/
      list_rows: 10,
      /*当前第几页*/
      page: 1,
      /*分类数据*/
      categorys: [],
      /*当前选中的类别*/
      type_active: 0
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
    this.getCategory();
    this.getData();
  },
  methods: {
    /*初始化*/
    init() {
      let _this = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          _this.phoneHeight = res.windowHeight;
          let view = common_vendor.index.createSelectorQuery().select(".top-tabbar");
          view.boundingClientRect((data) => {
            let h = _this.phoneHeight - data.height;
            _this.scrollviewHigh = h;
          }).exec();
        }
      });
    },
    /*获取文章分类*/
    getCategory() {
      let self = this;
      self._get("plus.article.article/category", {}, function(res) {
        self.categorys = res.data.category;
      });
    },
    /*tab切换*/
    tabTypeFunc(e) {
      if (e != this.type_active) {
        this.type_active = e;
        this.page = 1;
        this.listData = [];
        this.getData();
      }
    },
    /*获取数据*/
    getData() {
      let self = this;
      let page = self.page;
      let list_rows = self.list_rows;
      self.loading = true;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._get(
        "plus.article.article/index",
        {
          page: page || 1,
          list_rows,
          category_id: self.type_active
        },
        function(res) {
          self.listData = self.listData.concat(res.data.list.data);
          self.last_page = res.data.list.last_page;
          if (res.data.list.last_page <= 1) {
            self.no_more = true;
          }
          self.loading = false;
          common_vendor.index.hideLoading();
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
    /*跳转文章详情*/
    gotoDetail(e) {
      this.gotoPage("/pages/article/detail/detail?article_id=" + e);
    }
  }
};
if (!Array) {
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  const _component_tabBar = common_vendor.resolveComponent("tabBar");
  (_component_uni_load_more + _component_tabBar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.n($data.type_active == 0 ? "tab-item  active" : "tab-item "),
    b: common_vendor.o(($event) => $options.tabTypeFunc(0)),
    c: common_vendor.f($data.categorys, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n($data.type_active == item.category_id ? "tab-item  active" : "tab-item "),
        c: index,
        d: common_vendor.o(($event) => $options.tabTypeFunc(item.category_id), index)
      };
    }),
    d: common_vendor.f($data.listData, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.article_title),
        b: common_vendor.t(item.dec),
        c: common_vendor.t(item.create_time),
        d: common_vendor.t(item.actual_views),
        e: item.image != null
      }, item.image != null ? {
        f: item.image.file_path
      } : {}, {
        g: index,
        h: common_vendor.o(($event) => $options.gotoDetail(item.article_id), index)
      });
    }),
    e: $data.listData.length == 0 && !$data.loading
  }, $data.listData.length == 0 && !$data.loading ? {} : {
    f: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    g: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    h: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args)),
    i: _ctx.theme(),
    j: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/article/list/list.vue"]]);
wx.createPage(MiniProgramPage);
