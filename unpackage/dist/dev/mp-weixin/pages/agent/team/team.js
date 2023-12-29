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
      state_active: 0,
      /*数据列表*/
      tableData: [],
      setting: [],
      teamTotal: 0,
      page: 1,
      no_more: false,
      tabList: [],
      list_rows: 15,
      loading: true
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
          let view = common_vendor.index.createSelectorQuery().select(".top-container");
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
      self._get("plus.agent.team/lists", {
        level: self.state_active + 1,
        page: self.page || 1,
        list_rows: self.list_rows
      }, function(res) {
        self.loading = false;
        self.teamTotal = res.data.agent.first_num;
        let data = res.data;
        self.tabList = [{
          value: 1,
          text: data.words.team.words.first.value,
          total: data.agent.first_num
        }];
        if (data.setting.level >= 2) {
          self.tabList.push({
            value: 2,
            text: data.words.team.words.second.value,
            total: data.agent.second_num
          });
          self.teamTotal += data.agent.second_num;
        }
        if (data.setting.level == 3) {
          self.tabList.push({
            value: 3,
            text: data.words.team.words.third.value,
            total: data.agent.third_num
          });
          self.teamTotal += data.agent.third_num;
        }
        self.tableData = self.tableData.concat(data.list.data);
        self.last_page = data.list.last_page;
        if (self.last_page <= 1) {
          self.no_more = true;
        }
      }, null, function() {
        self.loading = false;
      });
    },
    /*切换类别*/
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
    a: common_vendor.f($data.tabList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: common_vendor.t(item.total),
        c: index,
        d: common_vendor.n($data.state_active == index ? "tab-item active" : "tab-item"),
        e: common_vendor.o(($event) => $options.stateFunc(index), index)
      };
    }),
    b: common_vendor.t($data.teamTotal),
    c: common_vendor.f($data.tableData, (item, index, i0) => {
      return common_vendor.e({
        a: item.user.avatarUrl,
        b: common_vendor.t(item.user.nickName),
        c: common_vendor.t(item.user.expend_money),
        d: common_vendor.t(item.create_time),
        e: item.agent
      }, item.agent ? {
        f: common_vendor.t(item.agent.first_num + item.agent.second_num + item.agent.third_num)
      } : {}, {
        g: index
      });
    }),
    d: $data.tableData.length == 0 && !$data.loading
  }, $data.tableData.length == 0 && !$data.loading ? {} : {
    e: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    f: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    g: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/agent/team/team.vue"]]);
wx.createPage(MiniProgramPage);
