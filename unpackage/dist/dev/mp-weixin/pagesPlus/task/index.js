"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      invitation_id: 0,
      day_task: [],
      grow_task: [],
      back_image: ""
    };
  },
  onShow() {
    this.getData();
  },
  methods: {
    clickFunc(e) {
      let self = this;
      if (e.status != 0) {
        return;
      }
      let url = "";
      switch (e.task_type) {
        case "product":
          url = "/pages/product/list/list";
          break;
        case "article":
          url = "/pages/article/list/list";
          break;
        case "order":
          url = "/pages/product/list/list";
          break;
        case "sign":
          url = "/pagesPlus/signin/signin";
          break;
        case "invite":
          url = "/pages/user/invite/invite?invitation_gift_id=" + self.invitation_id;
          break;
        case "image":
          url = "/pages/user/set/set";
          break;
        case "nickName":
          url = "/pages/user/set/set";
          break;
        case "base":
          url = "/pages/user/set/set";
          break;
      }
      if (url) {
        self.gotoPage(url);
      }
    },
    getData() {
      let self = this;
      self._get("plus.task.Task/index", {}, (res) => {
        self.day_task = res.data.data.day_task;
        self.grow_task = res.data.data.grow_task;
        self.back_image = res.data.data.back_image;
        self.invitation_id = res.data.data.invitation_id;
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.back_image,
    b: common_vendor.f($data.grow_task, (item, index, i0) => {
      return common_vendor.e({
        a: item.is_open == 1
      }, item.is_open == 1 ? {
        b: item.image,
        c: common_vendor.t(item.name),
        d: common_vendor.t(item.rule),
        e: common_vendor.t(item.points),
        f: common_vendor.t(item.status != 0 ? "已完成" : "去完成"),
        g: common_vendor.n(item.status != 0 ? "" : "active"),
        h: common_vendor.o(($event) => $options.clickFunc(item), index)
      } : {}, {
        i: index
      });
    }),
    c: common_vendor.f($data.day_task, (item, index, i0) => {
      return common_vendor.e({
        a: item.is_open == 1
      }, item.is_open == 1 ? common_vendor.e({
        b: item.image,
        c: common_vendor.t(item.name),
        d: common_vendor.t(item.rule),
        e: item.task_type != "order" && item.task_type != "sign" && item.task_type != "invite"
      }, item.task_type != "order" && item.task_type != "sign" && item.task_type != "invite" ? {
        f: common_vendor.t(item.points)
      } : {}, {
        g: common_vendor.t(item.status != 0 ? "今日已完成" : "去完成"),
        h: common_vendor.n(item.status != 0 ? "" : "active"),
        i: common_vendor.o(($event) => $options.clickFunc(item), index)
      }) : {}, {
        j: index
      });
    }),
    d: _ctx.theme(),
    e: common_vendor.n(_ctx.theme() || "")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/task/index.vue"]]);
wx.createPage(MiniProgramPage);
