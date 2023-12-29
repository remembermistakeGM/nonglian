"use strict";
const common_vendor = require("../../../common/vendor.js");
const uniLoadMore = () => "../../../components/uni-load-more.js";
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
      settled: -1,
      page: 1,
      no_more: false,
      loading: true,
      tableList: [],
      list_rows: 15,
      user_id: 0
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
    this.user_id = this.getUserId();
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
      self.loading = true;
      self._get("plus.agent.order/lists", {
        settled: self.state_active,
        page: self.page || 1,
        list_rows: self.list_rows
      }, function(data) {
        self.loading = false;
        self.tableList = [{
          value: -1,
          text: data.data.words.order.words.all.value
        }, {
          value: 0,
          text: data.data.words.order.words.unsettled.value
        }, {
          value: 1,
          text: data.data.words.order.words.settled.value
        }];
        self.tableData = self.tableData.concat(data.data.list.data);
        self.last_page = data.data.list.last_page;
        if (self.last_page <= 1) {
          self.no_more = true;
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
      return common_vendor.e({
        a: common_vendor.t(item.order_master.order_no),
        b: item.is_settled == 1
      }, item.is_settled == 1 ? {} : {}, {
        c: item.user.avatarUrl,
        d: common_vendor.t(item.user.nickName),
        e: item.first_user_id == $data.user_id
      }, item.first_user_id == $data.user_id ? {
        f: common_vendor.t(item.first_money)
      } : {}, {
        g: item.second_user_id == $data.user_id
      }, item.second_user_id == $data.user_id ? {
        h: common_vendor.t(item.second_money)
      } : {}, {
        i: item.third_user_id == $data.user_id
      }, item.third_user_id == $data.user_id ? {
        j: common_vendor.t(item.third_money)
      } : {}, {
        k: common_vendor.t(item.order_price),
        l: common_vendor.t(item.create_time),
        m: index
      });
    }),
    c: $data.tableData.length == 0 && !$data.loading
  }, $data.tableData.length == 0 && !$data.loading ? {} : {
    d: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    e: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    f: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/agent/order/order.vue"]]);
wx.createPage(MiniProgramPage);
