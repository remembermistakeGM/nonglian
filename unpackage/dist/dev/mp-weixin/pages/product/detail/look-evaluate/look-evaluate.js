"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uniLoadMore = () => "../../../../components/uni-load-more.js";
const _sfc_main = {
  components: {
    uniLoadMore
  },
  data() {
    return {
      /*手机高度*/
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      /*选中状态*/
      state_active: -1,
      /*商品id*/
      product_id: 0,
      /*评论列表*/
      tableData: [],
      /*统计*/
      Total: {
        /*总数*/
        all: 0,
        /*score = 30*/
        negative: 0,
        /*score = 10*/
        praise: 0,
        /*score = 20*/
        negative: 0,
        review: 0
      },
      /*页码*/
      page: 1,
      list_rows: 15,
      no_more: false,
      loading: true,
      /*最后一页码数*/
      last_page: 0,
      popImg: "",
      isopenimg: false
    };
  },
  computed: {
    /*加载中状态*/
    loadingType() {
      if (this.loading) {
        return 1;
      } else {
        if (this.tableData.length != 0 && this.no_more) {
          return 2;
        } else {
          return 0;
        }
      }
    }
  },
  onLoad(e) {
    this.product_id = e.product_id;
  },
  mounted() {
    this.init();
    this.getData();
  },
  methods: {
    preview(list, img) {
      this.openImg(list, img);
    },
    openImg(list, img) {
      let arr = [];
      list.forEach((item, index) => {
        arr.push(item.file_path);
      });
      common_vendor.index.previewImage({
        urls: arr,
        current: img,
        fail(err) {
          this.showError(err);
          console.log(err);
        }
      });
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
            self.scrollviewHigh = h;
          }).exec();
        }
      });
    },
    /*获取数据*/
    getData() {
      let _this = this;
      let product_id = _this.product_id;
      _this._get(
        "product.comment/lists",
        {
          product_id,
          scoreType: _this.state_active,
          page: _this.page,
          list_rows: _this.list_rows
        },
        function(res) {
          _this.loading = false;
          _this.Total = res.data.total;
          _this.tableData = _this.tableData.concat(res.data.list.data);
          _this.last_page = res.data.list.last_page;
          if (res.data.list.last_page <= 1) {
            _this.no_more = true;
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
    /*类别切换*/
    stateFunc(e) {
      let self = this;
      if (self.state_active != e) {
        self.tableData = [];
        self.no_more = false;
        self.loading = true;
        self.state_active = e;
        self.page = 1;
        self.getData();
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
    a: common_vendor.t($data.Total.all),
    b: common_vendor.n($data.state_active == -1 ? "tab-item active" : "tab-item"),
    c: common_vendor.o(($event) => $options.stateFunc(0)),
    d: common_vendor.t($data.Total.praise),
    e: common_vendor.n($data.state_active == 10 ? "tab-item active" : "tab-item"),
    f: common_vendor.o(($event) => $options.stateFunc(10)),
    g: common_vendor.t($data.Total.review),
    h: common_vendor.n($data.state_active == 20 ? "tab-item active" : "tab-item"),
    i: common_vendor.o(($event) => $options.stateFunc(20)),
    j: common_vendor.t($data.Total.negative),
    k: common_vendor.n($data.state_active == 30 ? "tab-item active" : "tab-item"),
    l: common_vendor.o(($event) => $options.stateFunc(30)),
    m: common_vendor.f($data.tableData, (item, index, i0) => {
      return common_vendor.e({
        a: item.users.avatarUrl,
        b: common_vendor.t(item.users.nickName),
        c: item.score == 10
      }, item.score == 10 ? {} : {}, {
        d: item.score == 20
      }, item.score == 20 ? {} : {}, {
        e: item.score == 30
      }, item.score == 30 ? {} : {}, {
        f: common_vendor.t(item.create_time),
        g: common_vendor.t(item.content),
        h: common_vendor.f(item.image, (imgs, img_num, i1) => {
          return {
            a: common_vendor.o(($event) => $options.preview(item.image, imgs.file_path), img_num),
            b: imgs.file_path,
            c: img_num
          };
        }),
        i: index
      });
    }),
    n: $data.tableData.length == 0 && !$data.loading
  }, $data.tableData.length == 0 && !$data.loading ? {} : {
    o: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    p: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    q: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args)),
    r: $data.isopenimg
  }, $data.isopenimg ? {
    s: $data.popImg,
    t: common_vendor.o(($event) => $data.isopenimg = false)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/product/detail/look-evaluate/look-evaluate.vue"]]);
wx.createPage(MiniProgramPage);
