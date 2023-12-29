"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const Upload = () => "../../components/upload/upload2.js";
const _sfc_main = {
  data() {
    return {
      myuser_id: "",
      //我的user_id
      you_user_id: "",
      //对方的service_user_id
      myavatarUrl: "",
      avatarUrl: "",
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      content: "",
      //用户输入的内容
      content_list: [],
      //聊天信息数据
      style: {
        pageHeight: 0,
        contentViewHeight: 0,
        footViewHeight: 90,
        mitemHeight: 0
      },
      isupload: false,
      type: "license",
      scrollTop: 0,
      imgPath: "",
      is_product: false,
      product_id: 0,
      productDetail: {},
      socketTask: null,
      // 确保websocket是打开状态
      is_open_socket: false,
      // 心跳定时器
      intervalId: null,
      page: 1,
      nomore: false,
      scrollHeight: 0,
      nickName: "",
      url: "",
      status: "离线",
      /* 初次进入 */
      is_live: false,
      inputBottom: 0,
      is_Ios: true,
      order_chat: {},
      isOrder: false,
      storeData: {},
      /* 1 用户聊天 2 客服聊天（我的消息进去传2） */
      msg_type: 1
    };
  },
  components: {
    /*编辑组件*/
    Upload
  },
  created() {
    const res = common_vendor.index.getSystemInfoSync();
    this.style.pageHeight = res.windowHeight;
    this.style.contentViewHeight = res.windowHeight - common_vendor.index.getSystemInfoSync().screenWidth / 750 * 100 - 70;
  },
  onShow() {
    this.getAvatarUrl();
    this.init();
    this.isuserAgent();
  },
  onLoad(option) {
    let self = this;
    self.you_user_id = option.chat_user_id;
    self.myuser_id = common_vendor.index.getStorageSync("user_id");
    self.shop_supplier_id = option.shop_supplier_id || 0;
    self.product_id = option.product_id ? option.product_id : 0;
    if (option.msg_type) {
      this.msg_type = option.msg_type;
    }
    if (self.product_id != 0) {
      self.getProduct();
    }
    self.order_id = option.order_id ? option.order_id : 0;
    console.log(self.order_id);
    if (self.order_id != 0) {
      self.getOrder();
    }
    self.nickName = option.nickName;
    common_vendor.index.setNavigationBarTitle({
      title: self.nickName + "(离线)"
    });
    self.get_content_list();
  },
  beforeUnmount() {
    console.log("beforeUnmount");
    this.closeSocket();
    this.is_live = true;
  },
  methods: {
    /*初始化*/
    init() {
      let self = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          self.phoneHeight = res.windowHeight;
          self.scrollviewHigh = self.phoneHeight;
        }
      });
    },
    initData() {
      this.page++;
      this.get_content_list();
    },
    socketInit() {
      let self = this;
      if (self.is_open_socket) {
        return;
      }
      self.socketTask = null;
      self.socketTask = common_vendor.index.connectSocket({
        url: self.url + "/socket?user_id=" + self.myuser_id + "&usertype=user&to=0",
        success() {
          console.log("Socket连接成功！");
        }
      });
      self.socketTask.onOpen((res) => {
        console.log("WebSocket连接正常打开中...！");
        self.is_open_socket = true;
        self.startHeart(false);
        self.startHeart(true);
        self.socketTask.onMessage(function(res2) {
          console.log("收到服务器内容：");
          console.log(res2);
          self.getNewcontent(res2);
        });
      });
      self.socketTask.onClose(() => {
        console.log("已经被关闭了");
        if (!self.is_live) {
          console.log("退出", self.is_live);
          self.socketTask = null;
          self.is_open_socket = false;
          clearInterval(self.intervalId);
          !self.is_live && self.socketInit();
        }
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
    startHeart(isLoop) {
      let self = this;
      let data = JSON.stringify({
        type: "ping",
        to: self.you_user_id,
        from: self.myuser_id,
        msg_type: 2
      });
      if (isLoop) {
        self.intervalId = setInterval(function() {
          console.log("发送心跳");
          self.send(data);
        }, 1e4);
      } else {
        console.log("发送心跳");
        self.send(data);
      }
    },
    closeSocket: function() {
      let self = this;
      let data = JSON.stringify({
        type: "close",
        app_id: this.getAppId(),
        chat_user_id: self.you_user_id,
        user_id: self.myuser_id,
        shop_supplier_id: self.shop_supplier_id,
        type: 2
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
    // 发送消息
    send_content() {
      if (this.content == "") {
        common_vendor.index.showToast({
          title: "发送内容不能为空！",
          icon: "none"
        });
        return false;
      }
      let self = this;
      let data = JSON.stringify({
        to: this.you_user_id,
        from: this.myuser_id,
        msg_type: 2,
        type: 0,
        content: this.content,
        app_id: this.getAppId()
      });
      let newdata = JSON.parse(data);
      let item = {
        msg_type: 2,
        content: newdata.content,
        type: 0,
        create_time: self.formatDate(),
        avatarUrl: self.myavatarUrl,
        app_id: this.getAppId()
      };
      this.content_list = [...this.content_list, item];
      this.$nextTick(function() {
        this.scrollToBottom();
      });
      self.send(data);
      self.content = "";
    },
    getNewcontent(res) {
      let newdata = JSON.parse(res.data);
      console.log(newdata);
      if (newdata.Online == "off" && !this.is_live) {
        this.status = "离线";
        console.log("对方离线");
        common_vendor.index.setNavigationBarTitle({
          title: this.nickName + "(离线)"
        });
      }
      if (newdata.Online == "on" && !this.is_live) {
        this.status = "在线";
        console.log("对方在线");
        common_vendor.index.setNavigationBarTitle({
          title: this.nickName + "(在线)"
        });
      }
      console.log(newdata);
      if (newdata.user_id == this.myuser_id && newdata.content) {
        if (newdata.contentJson) {
          newdata.content = newdata.contentJson;
        }
        let item = {
          content: newdata.content,
          user_id: newdata.user_id,
          type: newdata.type,
          msg_type: 1,
          create_time: this.formatDate()
        };
        console.log("解析数据");
        this.content_list = [...this.content_list, item];
        this.$nextTick(function() {
          this.scrollToBottom();
        });
      }
      if (newdata.type == "init") {
        let self = this;
        self._post(
          "plus.chat.chat/bindClient",
          {
            client_id: newdata.client_id,
            chat_user_id: self.you_user_id,
            user_id: self.myuser_id,
            type: 1
          },
          function(res2) {
            if (res2.data.data.Online == "off" && !self.is_live) {
              self.status = "离线";
              console.log("对方离线");
              common_vendor.index.setNavigationBarTitle({
                title: self.nickName + "(离线)"
              });
            } else if (res2.data.data.Online == "on" && !self.is_live) {
              self.status = "在线";
              console.log("对方在线");
              common_vendor.index.setNavigationBarTitle({
                title: self.nickName + "(在线)"
              });
            }
            console.log("init---绑定uid");
          }
        );
      }
    },
    getProduct() {
      let self = this;
      self._get(
        "product.product/detail",
        {
          product_id: self.product_id,
          url: "",
          visitcode: self.getVisitcode()
        },
        function(res) {
          self.is_product = true;
          self.content_list = [
            ...self.content_list,
            {
              type: "product"
            }
          ];
          self.productDetail = res.data.detail;
        }
      );
    },
    getOrder() {
      let self = this;
      self._get(
        "user.order/detail",
        {
          order_id: self.order_id
        },
        function(res) {
          self.is_order = true;
          self.content_list = [
            ...self.content_list,
            {
              type: "order"
            }
          ];
          self.order_chat = res.data.detail;
        }
      );
    },
    upload(e) {
      this.type = e;
      this.isupload = true;
    },
    getAvatarUrl() {
      let self = this;
      self.myuser_id = common_vendor.index.getStorageSync("user_id");
      self._get(
        "plus.chat.chat/getInfo",
        {
          shop_supplier_id: self.shop_supplier_id,
          chat_user_id: self.you_user_id,
          user_id: self.myuser_id
        },
        function(res) {
          self.avatarUrl = res.data.info.logo;
          self.myavatarUrl = res.data.info.avatarUrl;
          self.url = res.data.info.url;
          self.storeData.name = self.shop_supplier_id ? res.data.info.name : res.data.info.chat_name;
          self.storeData.supplier_logo = self.shop_supplier_id ? res.data.info.supplier_logo : res.data.info.logo;
          self.$nextTick(function() {
            self.socketInit();
          });
        }
      );
    },
    getImgsFunc(e) {
      let self = this;
      console.log(e);
      if (e != null && e.length > 0) {
        self.imgPath = e[0].file_path;
        let data = JSON.stringify({
          to: self.you_user_id,
          from: self.myuser_id,
          msg_type: 2,
          type: 1,
          content: self.imgPath,
          app_id: this.getAppId()
        });
        let newdata = JSON.parse(data);
        let item = {
          msg_type: 2,
          content: newdata.content,
          type: 1,
          create_time: self.formatDate(),
          avatarUrl: self.myavatarUrl,
          app_id: this.getAppId()
        };
        self.content_list = [...self.content_list, item];
        self.send(data);
        self.$nextTick(function() {
          self.scrollToBottom();
        });
      }
      self.isupload = false;
    },
    //获取聊天记录
    get_content_list() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._post(
        "plus.chat.chat/record",
        {
          page: self.page,
          list_rows: 15,
          chat_user_id: self.you_user_id,
          user_id: self.getUserId(),
          msg_type: self.msg_type
        },
        (res) => {
          console.log(self.content_list);
          res.data.list.data.forEach((v) => {
            if (v.type == 2 || v.type == 3) {
              v.content = JSON.parse(v.content);
            }
          });
          let list = res.data.list.data.reverse();
          self.content_list = [...list, ...self.content_list];
          if (res.data.lastPage <= self.page) {
            self.nomore = true;
          }
          if (self.page == 1) {
            self.$nextTick(() => {
              self.scrollToBottom();
            });
          } else {
            self.$nextTick(() => {
              const newquery = common_vendor.index.createSelectorQuery().in(self);
              newquery.select(".im_interface_content").boundingClientRect((data) => {
                console.log(data);
                self.scrollTop = data.height - self.scrollHeight;
              }).exec();
            });
          }
          common_vendor.index.hideLoading();
        }
      );
    },
    //打开图片预览
    preview(e, index) {
      let image_path_arr = [];
      let image_path_list = e;
      image_path_arr.push(image_path_list);
      let picnum = index * 1;
      common_vendor.index.previewImage({
        urls: image_path_arr,
        current: picnum,
        indicator: "default"
      });
    },
    scrollToBottom: function() {
      let self = this;
      let query = common_vendor.index.createSelectorQuery();
      query.selectAll(".m-item").boundingClientRect();
      query.select("#scrollview").boundingClientRect();
      query.exec((res) => {
        self.style.mitemHeight = 0;
        res[0].forEach((rect) => self.style.mitemHeight = self.style.mitemHeight + rect.height + 40);
        setTimeout(() => {
          if (self.style.mitemHeight > self.style.contentViewHeight - 100) {
            self.scrollTop = self.style.mitemHeight - self.style.contentViewHeight + 150;
          }
        }, 300);
      });
    },
    sendProduct() {
      let self = this;
      self.is_product = false;
      let params = {
        product_name: self.productDetail.product_name,
        product_img: self.productDetail.image[0].file_path,
        product_price: self.productDetail.product_price
      };
      params = JSON.stringify(params);
      let data = JSON.stringify({
        to: this.you_user_id,
        from: this.myuser_id,
        msg_type: 2,
        type: 2,
        content: params,
        app_id: this.getAppId()
      });
      let newdata = JSON.parse(data);
      let item = {
        msg_type: 2,
        content: newdata.content,
        type: 2,
        create_time: self.formatDate(),
        avatarUrl: self.myavatarUrl
      };
      item.content = JSON.parse(item.content);
      this.content_list = [...this.content_list, item];
      self.send(data);
      self.$nextTick(function() {
        self.scrollToBottom();
      });
    },
    sendOrder() {
      let self = this;
      self.is_order = false;
      let params = {
        order_num: self.order_chat.product.length,
        order_price: self.order_chat.order_price,
        order_no: self.order_chat.order_no,
        create_time: self.order_chat.create_time,
        order_id: self.order_chat.order_id,
        product_name: self.order_chat.product[0].product_name,
        product_img: self.order_chat.product[0].productImage
      };
      params = JSON.stringify(params);
      let data = JSON.stringify({
        to: self.you_user_id,
        from: self.myuser_id,
        msg_type: 2,
        type: 3,
        content: params,
        app_id: this.getAppId()
      });
      let newdata = JSON.parse(data);
      let item = {
        msg_type: 2,
        content: newdata.content,
        type: 3,
        create_time: self.formatDate(),
        avatarUrl: self.myavatarUrl
      };
      console.log(item);
      item.content = JSON.parse(item.content);
      self.content_list = [...self.content_list, item];
      self.send(data);
      self.$nextTick(function() {
        self.scrollToBottom();
      });
    },
    getJSON(str) {
      return JSON.parse(str);
    },
    newdata() {
      this.page++;
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select(".im_interface_content").boundingClientRect((data) => {
        this.scrollHeight = data.height;
      }).exec();
      this.get_content_list();
    },
    inputFocus(e) {
      this.inputBottom = e.detail.height;
    },
    inputBlur() {
      this.inputBottom = 0;
    },
    isuserAgent() {
      let self = this;
      switch (common_vendor.index.getSystemInfoSync().platform) {
        case "android":
          self.is_Ios = false;
          console.log("运行Android上");
          break;
        case "ios":
          console.log("运行iOS上");
          break;
        default:
          console.log("运行在开发者工具上");
          break;
      }
    },
    formatDate() {
      let date = /* @__PURE__ */ new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      date.getDay();
      let hour = date.getHours();
      hour = hour < 10 ? "0" + hour : hour;
      let minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      let second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
  }
};
if (!Array) {
  const _component_Upload = common_vendor.resolveComponent("Upload");
  _component_Upload();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.shop_supplier_id != "0" && _ctx.shop_supplier_id
  }, _ctx.shop_supplier_id != "0" && _ctx.shop_supplier_id ? common_vendor.e({
    b: $data.storeData.supplier_logo
  }, $data.storeData.supplier_logo ? {
    c: $data.storeData.supplier_logo
  } : {
    d: common_assets._imports_0
  }, {
    e: common_vendor.t($data.storeData.name),
    f: common_vendor.o(($event) => _ctx.gotoPage("/pages/shop/shop?shop_supplier_id=" + _ctx.shop_supplier_id, "redirect"))
  }) : {}, {
    g: common_vendor.f($data.content_list, (item, index, i0) => {
      return common_vendor.e({
        a: item.type != "product" && item.type != "order"
      }, item.type != "product" && item.type != "order" ? {
        b: item.msg_type == 2 ? $data.myavatarUrl : $data.avatarUrl
      } : {}, {
        c: common_vendor.t(item.create_time),
        d: item.type == 0
      }, item.type == 0 ? {
        e: common_vendor.t(item.content),
        f: common_vendor.n(item.msg_type == 2 ? "my_content my_text_content" : "you_content you_text_content")
      } : {}, {
        g: item.type == 1
      }, item.type == 1 ? {
        h: common_vendor.o(($event) => $options.preview(item.content, 0), index),
        i: item.content,
        j: common_vendor.n(item.msg_type == 2 ? "my_content" : "you_content")
      } : {}, {
        k: item.type == 2
      }, item.type == 2 ? {
        l: item.content.product_img,
        m: common_vendor.t(item.content.product_name),
        n: common_vendor.t(item.content.product_price),
        o: common_vendor.n(item.msg_type == 2 ? "my_content" : "you_content")
      } : {}, {
        p: item.type == 3
      }, item.type == 3 ? {
        q: item.content.product_img,
        r: common_vendor.t(item.content.product_name),
        s: common_vendor.t(item.content.order_num),
        t: common_vendor.t(item.content.order_price),
        v: common_vendor.t(item.content.order_no),
        w: common_vendor.t(item.content.create_time),
        x: common_vendor.o(($event) => _ctx.gotoPage("/pages/order/order-detail?order_id=" + item.content.order_id), index),
        y: common_vendor.n(item.msg_type == 2 ? "my_content" : "you_content")
      } : {}, {
        z: item.type == "product"
      }, item.type == "product" ? common_vendor.e({
        A: $data.is_product
      }, $data.is_product ? {
        B: $data.productDetail.product_image,
        C: common_vendor.t($data.productDetail.product_name),
        D: common_vendor.t($data.productDetail.product_price),
        E: common_vendor.o((...args) => $options.sendProduct && $options.sendProduct(...args), index),
        F: common_assets._imports_1,
        G: common_vendor.o(($event) => $data.is_product = false, index)
      } : {}) : {}, {
        H: item.type == "order"
      }, item.type == "order" ? common_vendor.e({
        I: _ctx.is_order
      }, _ctx.is_order ? {
        J: $data.order_chat.product[0].image.file_path,
        K: common_vendor.t($data.order_chat.product.length),
        L: common_vendor.t($data.order_chat.order_price),
        M: common_vendor.o((...args) => $options.sendOrder && $options.sendOrder(...args), index),
        N: common_vendor.o(($event) => _ctx.is_order = false, index)
      } : {}) : {}, {
        O: common_vendor.n(item.msg_type == 2 ? "im_text" : "im_text2"),
        P: index
      });
    }),
    h: common_vendor.s("height: " + $data.scrollviewHigh + "px"),
    i: $data.scrollTop,
    j: common_vendor.o((...args) => $options.newdata && $options.newdata(...args)),
    k: common_vendor.o(($event) => $options.upload("license")),
    l: common_vendor.o(($event) => $options.send_content()),
    m: common_vendor.o((...args) => $options.inputFocus && $options.inputFocus(...args)),
    n: common_vendor.o((...args) => $options.inputBlur && $options.inputBlur(...args)),
    o: $data.content,
    p: common_vendor.o(($event) => $data.content = $event.detail.value),
    q: common_vendor.o(($event) => $options.send_content()),
    r: common_vendor.s("bottom:" + $data.inputBottom + "px;"),
    s: $data.isupload
  }, $data.isupload ? {
    t: common_vendor.o($options.getImgsFunc),
    v: common_vendor.p({
      isupload: $data.isupload,
      type: $data.type
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4a19069"], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/chat/chat.vue"]]);
wx.createPage(MiniProgramPage);
