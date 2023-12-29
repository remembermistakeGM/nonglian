"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      imList: [],
      user_id: "",
      official: "",
      //站内信数据
      logistic: "",
      //物流数据
      socketTask: null,
      // 确保websocket是打开状态
      is_open_socket: false,
      url: "",
      // 心跳定时器
      intervalId: null,
      /* 初次进入 */
      is_live: false,
      my_user_id: ""
    };
  },
  onShow() {
    this.get_im_list();
  },
  onLoad() {
    this.my_user_id = common_vendor.index.getStorageSync("user_id");
  },
  beforeUnmount() {
    console.log("beforeUnmount");
    this.closeSocket();
    this.is_live = true;
  },
  methods: {
    send: function(data) {
      let self = this;
      if (self.is_open_socket) {
        self.socketTask.send({
          data,
          success() {
          }
        });
      } else {
        console.log("处于离线状态");
        self.socketTask = null;
        self.is_open_socket = false;
        clearInterval(self.intervalId);
        self.socketInit();
      }
    },
    socketInit() {
      let self = this;
      if (self.is_open_socket) {
        return;
      }
      self.socketTask = null;
      self.socketTask = common_vendor.index.connectSocket({
        url: self.url + "/socket?user_id=" + self.getUserId() + "&usertype=user&to=0",
        success() {
          console.log("Socket连接成功！");
        }
      });
      self.socketTask.onOpen((res) => {
        console.log("WebSocket连接正常打开中...！");
        self.is_open_socket = true;
        self.socketTask.onMessage(function(res2) {
          console.log("收到服务器内容：");
          console.log(res2);
          self.getNewcontent(res2);
          self.get_im_list();
        });
      });
      self.socketTask.onClose(() => {
        console.log("已经被关闭了");
        self.socketTask = null;
        self.is_open_socket = false;
        clearInterval(self.intervalId);
        !self.is_live && self.socketInit();
      });
    },
    getNewcontent(res) {
      let newdata = JSON.parse(res.data);
      if (newdata.type == "init") {
        let self = this;
        self._post(
          "plus.chat.chat/bindClient",
          {
            client_id: newdata.client_id,
            chat_user_id: 0,
            user_id: self.my_user_id,
            type: 1
          },
          function(res2) {
          }
        );
      }
    },
    //获取聊天列表
    get_im_list() {
      let self = this;
      self._post("plus.chat.chat/index", {}, (res) => {
        console.log(res);
        self.imList = res.data.list;
        self.official = res.data.official;
        self.logistic = res.data.logistic;
        if (self.url == "") {
          self.url = res.data.url;
          self.$nextTick(function() {
            self.socketInit();
          });
        }
      });
    },
    closeSocket: function() {
      let self = this;
      let data = JSON.stringify({
        type: "close",
        app_id: self.getAppId(),
        chat_user_id: 0,
        user_id: self.my_user_id,
        shop_supplier_id: 0,
        msg_type: 2
      });
      self.send(data);
      self.socketTask.close({
        success(res) {
          console.log("关闭成功", res);
        },
        fail(err) {
          console.log("关闭失败", err);
        }
      });
      self.socketTask = null;
      self.is_open_socket = false;
      clearInterval(self.intervalId);
    },
    jumpPage(user_id, shop_supplier_id, nickName) {
      if (shop_supplier_id == common_vendor.index.getStorageInfoSync("user_id")) {
        return false;
      }
      this.gotoPage("/pagesPlus/chat/chat?chat_user_id=" + user_id + "&shop_supplier_id=" + shop_supplier_id + "&nickName=" + nickName);
    },
    gotoMessage(val) {
      this.gotoPage("/pages/im/message?type=" + val);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.imList, (item, index, i0) => {
      return common_vendor.e({
        a: item.serviceLogo,
        b: common_vendor.t(item.nickName),
        c: item.newMessage
      }, item.newMessage ? {
        d: common_vendor.t(item.newMessage.create_time)
      } : {}, {
        e: item.newMessage
      }, item.newMessage ? common_vendor.e({
        f: item.newMessage.type == 0
      }, item.newMessage.type == 0 ? {
        g: common_vendor.t(item.newMessage.content)
      } : {}, {
        h: item.newMessage.type == 1
      }, item.newMessage.type == 1 ? {} : {}, {
        i: item.newMessage.type == 2
      }, item.newMessage.type == 2 ? {} : {}, {
        j: item.num > 0
      }, item.num > 0 ? {
        k: common_vendor.t(item.num)
      } : {}) : {}, {
        l: index,
        m: common_vendor.o(($event) => $options.jumpPage(item.chat_user_id, item.shop_supplier_id, item.nickName), index)
      });
    }),
    b: $data.imList.length == 0
  }, $data.imList.length == 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/chat/chat_list.vue"]]);
wx.createPage(MiniProgramPage);
