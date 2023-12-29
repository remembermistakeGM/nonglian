"use strict";
const common_vendor = require("../../common/vendor.js");
const diy = () => "../../components/diy/diy.js";
const share = () => "../../components/mp-share.js";
const AppShare = () => "../../components/app-share.js";
const _sfc_main = {
  components: {
    diy,
    share,
    AppShare
  },
  data() {
    return {
      /*页面ID*/
      page_id: null,
      /*diy类别*/
      items: {},
      /*页面信息*/
      page_info: {
        params: {}
      },
      /*分享*/
      isMpShare: false,
      /*app分享*/
      isAppShare: false,
      appParams: {
        title: "",
        summary: "",
        path: ""
      },
      url: ""
    };
  },
  onLoad(e) {
    this.page_id = e.page_id;
    this.getData();
  },
  /*分享当前页面*/
  onShareAppMessage() {
    let self = this;
    let params = self.getShareUrlParams({
      page_id: self.page_id
    });
    return {
      title: self.page_info.params.name,
      path: "/pages/diy-page/diy-page?" + params
    };
  },
  methods: {
    hasPage() {
      var pages = getCurrentPages();
      return pages.length > 1;
    },
    goback() {
      common_vendor.index.navigateBack();
    },
    /*获取数据*/
    getData(page_id) {
      let self = this;
      self._get("index/diy", {
        page_id: self.page_id,
        url: self.url
      }, function(res) {
        self.page_info = res.data.page;
        self.items = res.data.items;
        self.setPage(self.page_info);
      });
    },
    /*设置页面*/
    setPage(page) {
      common_vendor.index.setNavigationBarTitle({
        title: page.params.name
      });
      let colors = "#000000";
      if (page.style.titleTextColor == "white") {
        colors = "#ffffff";
      }
      common_vendor.index.setNavigationBarColor({
        frontColor: colors,
        backgroundColor: page.style.titleBackgroundColor
      });
    },
    //分享按钮
    showShare() {
      return;
    },
    //关闭分享
    closeBottmpanel(data) {
      this.isMpShare = false;
    },
    //关闭分享
    closeAppShare(data) {
      this.isAppShare = false;
    }
  }
};
if (!Array) {
  const _easycom_diy2 = common_vendor.resolveComponent("diy");
  const _component_share = common_vendor.resolveComponent("share");
  const _component_AppShare = common_vendor.resolveComponent("AppShare");
  (_easycom_diy2 + _component_share + _component_AppShare)();
}
const _easycom_diy = () => "../../components/diy/diy.js";
if (!Math) {
  _easycom_diy();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      diyItems: $data.items
    }),
    b: common_vendor.o($options.closeBottmpanel),
    c: common_vendor.p({
      isMpShare: $data.isMpShare
    }),
    d: common_vendor.o($options.closeAppShare),
    e: common_vendor.p({
      isAppShare: $data.isAppShare,
      appParams: $data.appParams
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/diy-page/diy-page.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
