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
    this.getChatuser_id();
  },
  onLoad(options) {
    this.chat_user_id = options.chat_user_id;
  },
  beforeUnmount() {
    console.log("beforeUnmount");
    this.closeSocket();
    this.is_live = true;
  },
  methods: {
    async getChatuser_id() {
      let self = this;
      if (!self.chat_user_id) {
        await self.getUserInfo();
        self.get_im_list();
      } else {
        self.get_im_list();
      }
    },
    async getUserInfo() {
      let self = this;
      return new Promise((resolve, reject) => {
        self._get("user.index/detail", {}, (res) => {
          self.chat_user_id = res.data.chat_user_id;
          if (!self.chat_user_id) {
            common_vendor.index.showModal({
              title: "提示",
              content: "暂未设置客服",
              showCancel: false,
              confirmText: "退出",
              success() {
                common_vendor.index.navigateBack();
              }
            });
            resolve(self.chat_user_id);
          } else {
            resolve(self.chat_user_id);
          }
        });
      });
    },
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
        self.startHeart();
        self.socketTask.onMessage(function(res2) {
          console.log("收到服务器内容：");
          console.log(res2);
          self.getNewcontent(res2);
          self.get_im_list();
        });
      });
      self.socketTask.onClose(() => {
        console.log("已经被关闭了");
        if (!self.is_live) {
          self.socketTask = null;
          self.is_open_socket = false;
          clearInterval(self.intervalId);
          !self.is_live && self.socketInit();
        }
      });
    },
    startHeart() {
      let self = this;
      let data = JSON.stringify({
        type: "ping",
        appId: self.getAppId(),
        user_id: self.user_id,
        shop_supplier_id: self.shop_supplier_id,
        supplier_user_id: self.supplier_user_id,
        msg_type: 1
      });
      self.intervalId = setInterval(function() {
        console.log("发送心跳");
        console.log(data);
        self.send(data);
      }, 1e4);
    },
    getNewcontent(res) {
      let newdata = JSON.parse(res.data);
      console.log(newdata);
    },
    //获取聊天列表
    get_im_list() {
      console.log("get_im_list");
      let self = this;
      self._post(
        "plus.chat.chat/userList",
        {
          chat_user_id: self.chat_user_id
        },
        (res) => {
          console.log(res);
          self.imList = res.data.list;
          if (self.url == "") {
            self.url = res.data.url;
            self.$nextTick(function() {
              self.socketInit();
            });
          }
        }
      );
    },
    closeSocket: function() {
      let self = this;
      let data = JSON.stringify({
        type: "close",
        appId: self.getAppId(),
        supplier_user_id: 0,
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
    jumpPage(user_id, chat_user_id, nickName) {
      if (chat_user_id === 0) {
        return false;
      }
      this.gotoPage("/pagesPlus/chat/notice?user_id=" + user_id + "&chat_user_id=" + chat_user_id + "&nickName=" + nickName);
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
        a: item.avatarUrl,
        b: common_vendor.t(item.nickName),
        c: common_vendor.t(item.create_time),
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
        k: common_vendor.o(($event) => $options.jumpPage(item.user_id, this.chat_user_id, item.nickName), index)
      });
    }),
    b: $data.imList.length == 0
  }, $data.imList.length == 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/chat/notice_list.vue"]]);
wx.createPage(MiniProgramPage);
