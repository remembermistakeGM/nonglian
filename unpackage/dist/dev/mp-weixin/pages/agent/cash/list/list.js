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
      /*状态选中*/
      state_active: -1,
      /*数据列表*/
      tableData: [],
      no_more: false,
      loading: true,
      /*最后一页码数*/
      last_page: 0,
      /*当前页面*/
      page: 1,
      /*每页条数*/
      list_rows: 20,
      tableList: []
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
  mounted() {
    this.init();
    this.getData();
  },
  methods: {
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
      let self = this;
      let page = self.page;
      self.loading = true;
      let list_rows = self.list_rows;
      self._get("plus.agent.cash/lists", {
        status: self.state_active,
        page: page || 1,
        list_rows
      }, function(data) {
        self.loading = false;
        self.tableList = [
          {
            value: -1,
            text: data.data.words.cash_list.words.all.value
          },
          {
            value: 10,
            text: data.data.words.cash_list.words.apply_10.value
          },
          {
            value: 20,
            text: data.data.words.cash_list.words.apply_20.value
          },
          {
            value: 40,
            text: data.data.words.cash_list.words.apply_40.value
          },
          {
            value: 30,
            text: data.data.words.cash_list.words.apply_30.value
          }
        ];
        self.tableData = self.tableData.concat(data.data.list.data);
        self.last_page = data.data.list.last_page;
        if (data.data.list.last_page <= 1) {
          self.no_more = true;
          return false;
        }
      });
    },
    /*切换*/
    stateFunc(e) {
      let self = this;
      if (e != self.state_active) {
        self.tableData = [];
        self.page = 1;
        self.state_active = e;
        self.getData();
      }
    },
    /*可滚动视图区域到顶触发*/
    scrolltoupperFunc() {
      console.log("滚动视图区域到顶");
    },
    /*可滚动视图区域到底触发*/
    scrolltolowerFunc() {
      let self = this;
      if (self.page < self.last_page) {
        self.page++;
        self.getData();
      }
      self.no_more = true;
    }
  }
};
if (!Array) {
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  _component_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.tableList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: common_vendor.n($data.state_active == item.value ? "tab-item active" : "tab-item"),
        c: common_vendor.o(($event) => $options.stateFunc(item.value), index),
        d: index
      };
    }),
    b: common_vendor.f($data.tableData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.create_time),
        b: common_vendor.t(item.apply_status.text),
        c: common_vendor.n(item.apply_status.text == "审核通过" ? "green" : "gray9"),
        d: common_vendor.t(item.money),
        e: index
      };
    }),
    c: $data.tableData.length == 0 && !$data.loading
  }, $data.tableData.length == 0 && !$data.loading ? {} : {
    d: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    e: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    f: common_vendor.o((...args) => $options.scrolltoupperFunc && $options.scrolltoupperFunc(...args)),
    g: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/agent/cash/list/list.vue"]]);
wx.createPage(MiniProgramPage);
