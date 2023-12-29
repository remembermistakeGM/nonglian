"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_utils = require("../../../common/utils.js");
const AppShare = () => "../../../components/app-share.js";
const _sfc_main = {
  components: {
    AppShare
  },
  data() {
    return {
      /*是否加载完成*/
      loadding: false,
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      /*文章id*/
      article_id: 0,
      /*文章详情*/
      article: {
        image: {}
      },
      urldata: "",
      /*app分享*/
      isAppShare: false,
      appParams: {
        title: "",
        summary: "",
        path: ""
      }
    };
  },
  onLoad(e) {
    this.article_id = e.article_id;
  },
  mounted() {
    this.getData();
  },
  /*分享*/
  onShareAppMessage() {
    let self = this;
    let params = self.getShareUrlParams({
      article_id: self.article_id
    });
    self.taskFunc();
    return {
      title: self.article.article_title,
      path: "/pages/article/detail/detail?" + params
    };
  },
  methods: {
    taskFunc() {
      let self = this;
      self._post(
        "plus.task.Task/dayTask",
        {
          task_type: "article"
        },
        (res) => {
          console.log("分享成功");
        }
      );
    },
    /*复制*/
    copyUrl() {
      var input = document.createElement("input");
      let message = window.location.href;
      input.value = message;
      document.body.appendChild(input);
      input.select();
      input.setSelectionRange(0, input.value.length), document.execCommand("Copy");
      document.body.removeChild(input);
      common_vendor.index.showToast({
        title: "复制成功",
        icon: "success",
        mask: true,
        duration: 2e3
      });
    },
    shareFunc() {
      this.taskFunc();
    },
    //关闭分享
    closeAppShare(data) {
      this.isAppShare = false;
    },
    /*获取文章详情*/
    getData() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self.loading = true;
      let article_id = self.article_id;
      self._get(
        "plus.article.article/detail",
        {
          article_id,
          url: self.urldata
        },
        function(res) {
          res.data.detail.article_content = common_utils.utils.format_content(res.data.detail.article_content);
          console.log(res.data.detail.article_content);
          self.article = res.data.detail;
          self.loadding = true;
          common_vendor.index.hideLoading();
        }
      );
    }
  }
};
if (!Array) {
  const _component_tabBar = common_vendor.resolveComponent("tabBar");
  const _component_AppShare = common_vendor.resolveComponent("AppShare");
  (_component_tabBar + _component_AppShare)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.loadding
  }, $data.loadding ? {
    b: common_vendor.t($data.article.article_title),
    c: common_vendor.t($data.article.category.name),
    d: common_vendor.t($data.article.create_time),
    e: common_vendor.o((...args) => $options.shareFunc && $options.shareFunc(...args)),
    f: $data.article.article_content,
    g: common_vendor.o($options.closeAppShare),
    h: common_vendor.p({
      isAppShare: $data.isAppShare,
      appParams: $data.appParams
    }),
    i: _ctx.theme(),
    j: common_vendor.n(_ctx.theme() || "")
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/article/detail/detail.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
