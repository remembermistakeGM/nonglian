"use strict";
const common_vendor = require("../../../common/vendor.js");
const uniLoadMore = () => "../../../components/uni-load-more.js";
const _sfc_main = {
  components: {
    uniLoadMore
  },
  data() {
    return {
      /*底部加载*/
      loading: true,
      /*没有更多*/
      no_more: false,
      //页面高度
      scrollviewHigh: "",
      //商品列表
      product_list: [],
      //当前页
      page: 1,
      //总页数
      last_page: "",
      isfollow: ""
    };
  },
  computed: {
    /*加载中状态*/
    loadingType() {
      if (this.loading) {
        return 1;
      } else {
        if (this.product_list.length != 0 && this.no_more) {
          return 2;
        } else {
          return 0;
        }
      }
    }
  },
  onShow() {
    this.init();
    this.getData();
  },
  methods: {
    /*初始化*/
    init() {
      let self = this;
      self.page = 1;
      self.product_list = [];
      common_vendor.index.getSystemInfo({
        success(res) {
          self.scrollviewHigh = res.windowHeight;
        }
      });
    },
    //获取数据
    getData() {
      let self = this;
      self.loading = true;
      self._post("user.Favorite/list", {
        page: self.page,
        type: 20,
        list_rows: 15
      }, (res) => {
        self.loading = false;
        self.last_page = res.data.list.last_page;
        self.product_list = self.product_list.concat(res.data.list.data);
        if (res.data.list.last_page <= 1) {
          self.no_more = true;
        } else {
          self.no_more = false;
        }
      });
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
    goto_product(e) {
      this.gotoPage("pages/product/detail/detail?product_id=" + e);
    },
    //关注店铺/取消关注
    guanzhu(product_id) {
      let self = this;
      self.page = 1;
      self.loading = true;
      self._post("user.Favorite/add", {
        pid: product_id,
        type: 20
      }, (res) => {
        self.loading = false;
        self._post("user.Favorite/list", {
          page: self.page,
          type: 20,
          list_rows: 15
        }, (res2) => {
          self.product_list = res2.data.list.data;
        });
      });
    }
  }
};
if (!Array) {
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  _component_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.product_list, (item, index, i0) => {
      return {
        a: item.product_image,
        b: common_vendor.o(($event) => $options.goto_product(item.product_id), index),
        c: common_vendor.t(item.product_name),
        d: common_vendor.t(item.product_price),
        e: common_vendor.t(item.line_price),
        f: common_vendor.t(item.product_sales),
        g: common_vendor.o(($event) => $options.goto_product(item.product_id), index),
        h: common_vendor.o(($event) => $options.guanzhu(item.product_id), index),
        i: index
      };
    }),
    b: $data.product_list.length == 0 && !$data.loading
  }, $data.product_list.length == 0 && !$data.loading ? {} : {
    c: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    d: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    e: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my_attention/my_attention.vue"]]);
wx.createPage(MiniProgramPage);
