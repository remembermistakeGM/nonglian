"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      imList: [],
      user_id: "",
      official: "",
      //站内信数据
      logistic: ""
      //物流数据
    };
  },
  onShow() {
    this.get_im_list();
  },
  methods: {
    //获取聊天列表
    get_im_list() {
      let self = this;
      self._post("plus.chat.supplierChat/index", {}, (res) => {
        console.log(res);
        self.imList = res.data.list;
        self.official = res.data.official;
        self.logistic = res.data.logistic;
      });
    },
    jumpPage(user_id, nickName) {
      this.gotoPage("/pagesPlus/chat/supplier_chat?user_id=" + user_id + "&nickName=" + nickName);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.imList, (item, index, i0) => {
      return common_vendor.e({
        a: item.user.avatarUrl,
        b: common_vendor.t(item.user.nickName),
        c: common_vendor.t(item.newMessage.create_time),
        d: item.newMessage.type == 0
      }, item.newMessage.type == 0 ? {
        e: common_vendor.t(item.newMessage.content)
      } : {}, {
        f: item.newMessage.type == 1
      }, item.newMessage.type == 1 ? {} : {}, {
        g: item.newMessage.type == 2
      }, item.newMessage.type == 2 ? {} : {}, {
        h: item.num > 0
      }, item.num > 0 ? {
        i: common_vendor.t(item.num)
      } : {}, {
        j: index,
        k: common_vendor.o(($event) => $options.jumpPage(item.user_id, item.user.nickName), index)
      });
    }),
    b: $data.imList.length == 0
  }, $data.imList.length == 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/chat/supplier_chat_list.vue"]]);
wx.createPage(MiniProgramPage);
