"use strict";
const common_vendor = require("../../common/vendor.js");
const common_utils = require("../../common/utils.js");
const pagesLive_live_livePart_emoji = require("./live-part/emoji.js");
const common_permission = require("../../common/permission.js");
const Prefix_RTC = "io.agora.rtc.";
const Prefix_RTM = "io.agora.rtm.";
const liveCart = () => "./live-part/liveCart.js";
const liveGift = () => "./live-part/liveGift.js";
const liveMsg = () => "./live-part/liveMsg.js";
const livePlan = () => "./live-part/livePlan.js";
const liveOrder = () => "./live-part/liveOrder.js";
const liveAnchor = () => "./live-part/liveAnchor.js";
const liveMore = () => "./live-part/liveMore.js";
const liveShare = () => "./live-part/liveShare.js";
const liveRank = () => "./live-part/liveRank.js";
const Likes = () => "./live-part/likes/index.js";
const share = () => "./live-part/dialog/share.js";
const Countdown = () => "./live-part/countdown_nvue.js";
const AppShare = () => "./live-part/app-nvue-share.js";
const preview = () => "./preview.js";
const _sfc_main = {
  components: {
    liveCart,
    liveGift,
    // liveRoom,
    liveMsg,
    livePlan,
    liveOrder,
    liveAnchor,
    liveMore,
    liveShare,
    liveRank,
    Likes,
    share,
    Countdown,
    AppShare,
    preview
  },
  data() {
    return {
      statusBarH: "",
      headerBarH: "",
      winHeight: "",
      winWidth: "",
      videoIndex: 0,
      clickNum: 0,
      //记录点击次数
      giftipShowist: [],
      sence: "",
      //场景，create:主播，观众
      room_id: 0,
      //房间id,
      shop_supplier_id: 0,
      role: "",
      loading: true,
      /*消息列表*/
      commentsList: [],
      maxCommentSize: 100,
      roomDetail: {
        supplier: {
          shop_supplier_id: 0
        }
      },
      giftName: "",
      /*礼物数*/
      gift_num: 0,
      hasFollow: false,
      giftList: [],
      //是否是主播
      isCaster: false,
      // 当前用户
      user: {},
      // 礼物信息
      giftInfo: {
        nickName: "",
        avatarUrl: "",
        giftName: "",
        giftImage: ""
      },
      /*当前讲解商品ID*/
      explain_product_id: "",
      /*当前讲解商品*/
      explain_product: null,
      num: 0,
      digg_num: 0,
      digg_times: 5,
      digg_timer: null,
      is_replay: false,
      replay_url: "",
      is_start: false,
      qrcode: null,
      toMsg: "",
      emojiData: [],
      /*倒计时配置*/
      countdownConfig: {
        /*开始时间*/
        startstamp: 0,
        /*结束时间*/
        endstamp: 0,
        /*标题*/
        title: ""
      },
      /*app分享*/
      isAppShare: false,
      appParams: {
        title: "",
        summary: "",
        path: ""
      },
      zOrderMediaOverlay: false,
      zOrderOnTop: false,
      renderMode: 1,
      //Hidden= 1, Fit = 2 ,Adaptive = 3, FILL = 4
      mirrorMode: 0,
      //Auto = 0, Enabled = 1, Disabled = 2
      engine_load: false,
      /*美白*/
      whiteness: 5,
      beauty: 5,
      // 用户信息
      userInfo: {},
      // RTC房间频道
      channel: "",
      view_uid: 0,
      agoraView: null,
      agoraRtm: null,
      platform: "",
      agoraAppId: "",
      appId: "",
      uid: "",
      liveChannelId: "",
      token: "",
      nickName: "",
      beautyOptions: {
        enabled: true,
        contrastLevel: 1,
        lightening: 0.6,
        smoothness: 0.5,
        redness: 0.1,
        sharpness: 0.3
      },
      is_preview: false,
      isExplain: false,
      explain: {},
      online_count: 0,
      intervalTime: null
    };
  },
  beforeCreate() {
  },
  created() {
    console.log("------live created");
    this.platform = common_vendor.index.getSystemInfoSync().platform;
    let _sH = common_vendor.index.getSystemInfoSync().statusBarHeight;
    let _hH = _sH + 50;
    let _wH = common_vendor.index.getSystemInfoSync().windowHeight;
    let _wW = common_vendor.index.getSystemInfoSync().windowWidth;
    this.statusBarH = `${_sH}px`;
    this.headerBarH = `${_hH}px`;
    this.winHeight = `${_wH}px`;
    this.winWidth = `${_wW}px`;
  },
  /*分享*/
  onShareAppMessage() {
    let self = this;
    let params = self.getRequest().getShareUrlParams({
      room_id: self.room_id,
      sence: "audience"
    });
    return {
      title: self.roomDetail.name,
      path: "/pagesLive/live/live?" + params,
      imageUrl: self.roomDetail.shareFilePath
    };
  },
  onLoad(options) {
    common_vendor.index.setKeepScreenOn({
      keepScreenOn: true
    });
    let scene = common_utils.utils.getSceneData(options);
    this.room_id = options.room_id ? options.room_id : scene.rid;
    this.role = options.sence == "create" ? "broadcaster" : "audience";
  },
  onReady() {
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
  },
  onShow() {
  },
  mounted() {
    let self = this;
    console.log("-------agora-sdk---------------" + common_vendor.index.getSystemInfoSync().platform);
    if (self.platform === "android") {
      common_permission.requestAndroidPermission("android.permission.RECORD_AUDIO");
      common_permission.requestAndroidPermission("android.permission.CAMERA");
      self.agoraView = self.$refs.agoraView;
      self.agoraRtm = self.$refs.agoraRtm;
    } else if (self.platform === "ios") {
      self.agoraView = agoraRtc;
      self.agoraRtm = agoraRtm;
    }
    self.uid = self.getRequest().getUserId();
    this.getRoomInfo();
  },
  methods: {
    /*请求对象*/
    getRequest() {
      let self = this;
      return self;
    },
    /*获取直播间信息*/
    getRoomInfo() {
      let self = this;
      common_vendor.index.showLoading({
        title: "正在进入"
      });
      self.getRequest()._post(
        "plus.live.room/detail",
        {
          room_id: self.room_id
        },
        function(res) {
          console.log("获取房间");
          console.log(res.data);
          common_vendor.index.hideLoading();
          self.loading = false;
          self.roomDetail = res.data.model;
          self.giftName = res.data.gift_name;
          self.hasFollow = res.data.hasFollow;
          self.digg_num = res.data.model.digg_num;
          self.countdownConfig.endstamp = self.roomDetail.start_time;
          self.user = res.data.user;
          self.isCaster = res.data.isCaster;
          if (self.isCaster) {
            self.view_uid = 0;
          } else {
            self.view_uid = res.data.model.user_id;
          }
          self.liveRoomStart(self.roomDetail, self.user);
          self.$nextTick(() => {
            self.initProduct();
          });
        }
      );
    },
    liveRoomStart(roomDetail, userInfo) {
      console.log("--------------liveRoomStart-----------------");
      let self = this;
      self.roomDetail = roomDetail;
      self.userInfo = userInfo;
      self.channel = "channel_" + roomDetail.supplier.shop_supplier_id;
      self.liveChannelId = "channel_" + roomDetail.supplier.shop_supplier_id;
      if (self.isCaster) {
        let whiteness = common_vendor.index.getStorageSync("whiteness");
        if (whiteness) {
          self.whiteness = whiteness;
        }
        let beauty = common_vendor.index.getStorageSync("beauty");
        if (beauty) {
          self.beauty = beauty;
        }
      } else {
        console.log("观众进入");
      }
      self.loginRoom();
    },
    loginRoom() {
      let self = this;
      common_vendor.index.showLoading({
        title: "正在进入"
      });
      self.getRequest()._get(
        "plus.live.agora.api/login",
        {
          room_id: self.roomDetail.room_id,
          channel: self.channel
        },
        function(res) {
          console.log("进入房间");
          console.log(res.data);
          self.appId = res.data.appId;
          self.agoraAppId = res.data.appId;
          self.token = res.data.userSign;
          self.nickName = res.data.user.nickName;
          if (self.roomDetail.live_status == 0) {
            self.getRequest().showError("直播审核中", function() {
              common_vendor.index.navigateBack();
            });
            return;
          }
          if (self.isCaster) {
            if (self.uid != self.roomDetail.user_id) {
              self.getRequest().showError("你不是此房间主播", function() {
                common_vendor.index.navigateBack();
              });
              return;
            }
          } else {
            if (self.roomDetail.live_status == 102) {
              self.getRequest().showError("直播未开始", function() {
                common_vendor.index.navigateBack();
              });
              return;
            }
          }
          if (self.roomDetail.live_status == 103 || self.roomDetail.live_status == 107) {
            self.getRequest().showError("直播已结束", function() {
              common_vendor.index.navigateBack();
            });
            return;
          }
          self.initRoom();
          self.agoraView.create(
            {
              appid: self.agoraAppId
            },
            (res2) => {
              self.engine_load = true;
              self.showLike = true;
              console.log("create---------");
              if (self.isCaster) {
                self.is_preview = true;
                console.log(self.roomDetail.live_status);
                if (self.roomDetail.live_status == 102) {
                  self.startPreview();
                } else {
                  self.openLive();
                }
              } else {
                self.enterRoom();
              }
              self.addRtcListeners();
            }
          );
        }
      );
    },
    /* 关闭预览 */
    closePreview() {
      common_vendor.index.navigateBack();
    },
    /* 摄像头切换 */
    switchCamera() {
      let self = this;
      self.agoraView.switchCamera((res) => {
        console.log("--------------------switchCamera-------------------");
      });
    },
    /* 美颜设置 */
    setBeautyOptions(e) {
      console.log("setBeautyOptions" + e);
      if (e == "set") {
        let lightening = common_vendor.index.getStorageSync("lightening");
        if (lightening) {
          this.beautyOptions.lightening = lightening;
        } else {
          common_vendor.index.setStorageSync("smoothness", this.beautyOptions.lightening);
        }
        let smoothness = common_vendor.index.getStorageSync("smoothness");
        if (smoothness) {
          this.beautyOptions.smoothness = smoothness;
        } else {
          common_vendor.index.setStorageSync("smoothness", this.beautyOptions.smoothness);
        }
        let redness = common_vendor.index.getStorageSync("redness");
        if (redness) {
          this.beautyOptions.redness = redness;
        } else {
          common_vendor.index.setStorageSync("redness", this.beautyOptions.redness);
        }
        let sharpness = common_vendor.index.getStorageSync("sharpness");
        if (sharpness) {
          this.beautyOptions.sharpness = sharpness;
        } else {
          common_vendor.index.setStorageSync("sharpness", this.beautyOptions.sharpness);
        }
      } else {
        this.beautyOptions.lightening = 0.6;
        common_vendor.index.setStorageSync("lightening", this.beautyOptions.lightening);
        this.beautyOptions.smoothness = 0.5;
        common_vendor.index.setStorageSync("smoothness", this.beautyOptions.smoothness);
        this.beautyOptions.redness = 0.1;
        common_vendor.index.setStorageSync("redness", this.beautyOptions.redness);
        this.beautyOptions.sharpness = 0.3;
        common_vendor.index.setStorageSync("sharpness", this.beautyOptions.sharpness);
      }
      this.agoraView.setBeautyEffectOptions(this.beautyOptions);
    },
    setDefinition(e) {
      console.log("setDefinition=" + e);
      let self = this;
      common_vendor.index.setStorageSync("vd", e);
      self.agoraView.setVideoEncoderConfiguration(
        {
          vd: e
        },
        (res) => {
          console.log("setVideoEncoderConfiguration");
        }
      );
    },
    startPreview() {
      let self = this;
      self.agoraView.enableVideo((res) => {
      });
      if (self.platform == "android") {
        self.agoraView.setupLocalVideo(
          {
            channelName: self.liveChannelId,
            uid: self.uid
          },
          (res) => {
            console.log("setupLocalVideo");
          }
        );
      }
      self.setBeautyOptions();
      let vd = common_vendor.index.getStorageSync("vd");
      if (!vd) {
        vd = 0;
      }
      self.setDefinition(vd);
      self.agoraView.startPreview((res) => {
        console.log("--------------------startPreview-------------------");
      });
    },
    // 房主登录
    rtmLogin() {
      let self = this;
      let agoraRtm2 = self.agoraRtm;
      agoraRtm2.createInstance(
        {
          appid: self.agoraAppId
        },
        (res) => {
          console.log("-------------rtmLogin createInstance--------");
        }
      );
      self.addRtmListeners();
      self.getRequest()._get(
        "plus.live.agora.api/rtmToken",
        {
          room_id: self.roomDetail.room_id
        },
        function(res) {
          console.log("-------------rtmToken--------");
          console.log(res);
          agoraRtm2.login(
            {
              token: res.data.userSign,
              uid: "" + self.uid
            },
            (res2) => {
              console.log("-------------agoraRtm login--------");
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    },
    addRtmListeners() {
      let self = this;
      if (self.platform === "ios") {
        globalEvent.addEventListener(Prefix_RTM + "ConnectionStateChanged", function(e) {
          if (e.data[0] == 3 && e.data[1] == 2) {
            self.onLoginSuccess();
          }
        });
      }
      globalEvent.addEventListener(Prefix_RTM + "MessageReceived", function(e) {
        self.showMsg(e.data[0]);
      });
      globalEvent.addEventListener(Prefix_RTM + "LoginSuccess", function(e) {
        console.log("RTM LoginSuccess");
        self.onLoginSuccess();
      });
      globalEvent.addEventListener(Prefix_RTM + "LoginFailure", function(e) {
        self.onLoginFailure(e);
      });
      globalEvent.addEventListener(Prefix_RTM + "LogoutSuccess", function(e) {
        self.onLogoutSuccess(e);
      });
      globalEvent.addEventListener(Prefix_RTM + "LogoutFailure", function(e) {
        self.onLogoutFailure(e);
      });
      globalEvent.addEventListener(Prefix_RTM + "ChannelMessageReceived", function(e) {
        self.onChannelMessageReceived(e);
      });
      globalEvent.addEventListener(Prefix_RTM + "JoinSuccess", function(e) {
        self.onJoinSuccess(e);
      });
      globalEvent.addEventListener(Prefix_RTM + "JoinFailure", function(e) {
        self.onJoinFailure(e);
      });
    },
    // ios事件注册
    addRtcListeners() {
      console.log("----------------addRtcListeners-------------------");
      let self = this;
      globalEvent.addEventListener(Prefix_RTC + "JoinChannelSuccess", function(e) {
        self.onJoinChannelSuccess(e);
      });
      globalEvent.addEventListener(Prefix_RTC + "LeaveChannel", function(e) {
        self.onLeaveChannel(e);
      });
      globalEvent.addEventListener(Prefix_RTC + "RemoteVideoStateChanged", function(e) {
        self.onRemoteVideoStateChanged(e);
      });
      globalEvent.addEventListener(Prefix_RTC + "UserJoined", function(e) {
        self.onUserJoined(e);
      });
      globalEvent.addEventListener(Prefix_RTC + "UserOffline", function(e) {
        self.onUserOffline(e);
      });
    },
    enterRoom() {
      let self = this;
      self.agoraView.setChannelProfile(1, (res) => {
      });
      self.agoraView.setClientRole(2, (res) => {
      });
      self.agoraView.enableAudio((res) => {
      });
      self.agoraView.enableVideo((res) => {
      });
      if (self.platform == "android") {
        self.agoraView.setupRemoteVideo(
          {
            channelName: self.liveChannelId,
            uid: self.view_uid
          },
          (res) => {
          }
        );
      }
      self.agoraView.joinChannel(
        {
          token: self.token,
          channelName: self.liveChannelId,
          uid: self.uid
        },
        (res) => {
          console.log("--------------------joinChannel enterRoom-------------------");
        },
        (err) => {
          console.log("--------------------joinChannel enterRoom-------------------");
        }
      );
    },
    openLive() {
      let self = this;
      let agoraView = self.agoraView;
      if (self.is_preview) {
        self.is_preview = false;
        agoraView.stopPreview((res) => {
          console.log("--------------------stopPreview-------------------");
        });
      }
      agoraView.setChannelProfile(1, (res) => {
      });
      agoraView.setClientRole(1, (res) => {
      });
      agoraView.enableAudio((res) => {
      });
      agoraView.enableVideo((res) => {
      });
      if (self.platform == "android") {
        agoraView.setupLocalVideo(
          {
            channelName: self.liveChannelId,
            uid: self.uid
          },
          (res) => {
            console.log("setupLocalVideo");
          }
        );
      }
      console.log("self.liveChannelId=" + self.liveChannelId);
      console.log("self.token=" + self.token);
      console.log("self.uid=" + self.uid);
      agoraView.joinChannel(
        {
          token: self.token,
          channelName: self.liveChannelId,
          uid: self.uid
        },
        (res) => {
          console.log("--------------------joinChannel-------------------");
          console.log(res);
        }
      );
    },
    initRoom() {
      this.getGift();
      this.initemoji();
    },
    /*显示讲解的商品*/
    showProduct(product_id) {
      let self = this;
      self.explain_product_id = product_id;
      self.getRequest()._post(
        "plus.live.room/product_detail",
        {
          product_id: self.explain_product_id
        },
        function(res) {
          self.explain_product = res.data.model;
          console.log(self.explain_product);
        }
      );
    },
    /*获取直播间信息*/
    synRoomInfo(e) {
      let self = this;
      self.getRequest()._post(
        "plus.live.room/syn_room",
        {
          room_id: self.roomDetail.room_id
        },
        function(res) {
          let msg = {
            type: "views",
            views: res.data.model.views,
            digg_num: res.data.model.digg_num
          };
          self.sendMsg(JSON.stringify(msg));
        }
      );
    },
    initProduct() {
      if (this.roomDetail.currentProduct) {
        this.explain_product = {
          product_image: this.roomDetail.currentProduct.image[0].file_path,
          product_price: this.roomDetail.currentProduct.product_price,
          product_id: this.roomDetail.currentProduct.product_id
        };
      }
      console.log("--------explain_product-------------");
      console.log(this.explain_product);
    },
    /*跳转商品详情*/
    gotoProduct(e) {
      let url = "/pages/product/detail/detail?product_id=" + this.explain_product.product_id + "&room_id=" + this.room_id;
      common_vendor.index.navigateTo({
        url
      });
    },
    handleSlider(e) {
      let curIndex = e.detail.current;
      if (this.videoIndex >= 0) {
        this.videoContextList[this.videoIndex].pause();
        this.videoContextList[this.videoIndex].seek(0);
      }
      if (curIndex === this.videoIndex + 1) {
        this.videoContextList[this.videoIndex + 1].play();
      } else if (curIndex === this.videoIndex - 1) {
        this.videoContextList[this.videoIndex - 1].play();
      }
      this.videoIndex = curIndex;
    },
    play(index) {
      this.videoContextList[index].play();
    },
    pause(index) {
      this.videoContextList[index].pause();
    },
    handleAttention(index) {
      let vlist = this.vlist;
      vlist[index].attention = !vlist[index].attention;
      this.vlist = vlist;
    },
    handleLiveCart() {
      this.$refs.liveCart.show();
    },
    handleLiveGift() {
      this.$refs.liveGift.show();
    },
    handleRollMsg() {
      this.$refs.liveMsg.show();
    },
    sendChannelMsg(e) {
      let msg = {
        type: "text",
        msg: e,
        registerLevel: this.registerLevel,
        nickName: this.nickName
      };
      this.sendMsg(msg);
    },
    closeMsg(e) {
      let self = this;
      let msg = {
        type: "text",
        msg: e,
        nickName: self.user.nickName
      };
      self.sendMsg(JSON.stringify(msg));
    },
    removeComment() {
      let self = this;
      let len = self.commentsList.length - self.maxCommentSize;
      if (len > 0) {
        for (let i = 0; i < len; i++) {
          self.commentsList.shift();
        }
      }
      self.$nextTick(function() {
        self.toMsg = "comment" + (self.commentsList.length - 1);
      });
    },
    /*获取礼物类别*/
    getGift() {
      let self = this;
      self.getRequest()._get("plus.live.room/gift", {}, function(res) {
        console.log("====gift=======");
        console.log(res);
        let list = [], min = [], num = 0;
        for (let i = 0; i < res.data.list.length; i++) {
          num++;
          min.push(res.data.list[i]);
          if (num >= 8) {
            list.push(min);
            min = [];
            num = 0;
          }
        }
        if (min.length > 0) {
          list.push(min);
        }
        self.giftList = list;
        console.log(self.giftList);
      });
    },
    openPlan() {
      this.$refs.livePlan.show();
    },
    closePlan() {
      this.$refs.liveGift.show();
    },
    openOrder() {
      this.$refs.liveOrder.show();
    },
    closeOrder() {
      this.$refs.liveCart.show();
    },
    setProduct(e) {
      console.log("explainProduct");
      console.log(e);
      if (e == null) {
        this.isExplain = false;
        this.explain = {};
      } else {
        this.isExplain = true;
        this.explain = e;
      }
      let msg = {
        type: "explain",
        explain: this.explain,
        isExplain: this.isExplain
      };
      this.sendMsg(msg);
    },
    sendMsg(msg) {
      let self = this;
      let agoraRtm2 = self.agoraRtm;
      let message = JSON.stringify(msg);
      console.log("------------------message----------------------");
      console.log(message);
      agoraRtm2.sendMessage(
        {
          message
        },
        (res) => {
          console.log(message);
          self.showMsg(message);
        },
        (fail) => {
          console.log(fail);
        }
      );
    },
    digg() {
      console.log("点击屏幕");
      if (this.isCaster) {
        return;
      }
      let self = this;
      self.$refs.likes.handleClick();
      console.log("----------digg---------------");
      self.getRequest()._post(
        "plus.live.room/digg",
        {
          room_id: self.room_id,
          num: 1
        },
        function(res) {
          console.log("----------digg---------------");
          let digg_num = res.data;
          let msg = {
            type: "digg",
            digg_num
          };
          self.sendMsg(msg);
        }
      );
    },
    showMsg(msg) {
      let self = this;
      let json = JSON.parse(msg);
      console.log(json);
      if (json.type == "text" || json.type == "buy" || json.type == "join" || json.type == "enter") {
        self.commentsList.push(json);
        self.removeComment();
      } else if (json.type == "digg") {
        console.log("digg");
        self.digg_num = json.digg_num.digg_num;
        console.log(self.digg_num);
      } else if (json.type == "banSay" && self.uid == json.user_id) {
        self.isbanSay = true;
        common_vendor.index.showToast({
          title: "您已被禁言",
          icon: "none"
        });
        return;
      } else if (json.type == "gift_num") {
        self.roomDetail.gift_num = json.msg;
      } else if (json.type == "gift") {
        self.giftInfo = {
          nickName: json.nickName,
          avatarUrl: json.avatarUrl,
          giftName: self.getGiftName(json.msg),
          giftImage: self.getGiftImage(json.msg)
        };
        setTimeout(function() {
          self.giftInfo = {
            nickName: ""
          };
        }, 5e3);
      } else if (json.type == "kickPerson" && self.uid == json.user_id) {
        common_vendor.index.showToast({
          title: "您已被踢出直播间",
          icon: "none"
        });
        self.closeLive();
      } else if (json.type == "openSay" && self.uid == json.user_id) {
        common_vendor.index.showToast({
          title: "您已被取消禁言",
          icon: "none"
        });
        self.isbanSay = false;
        return;
      } else if (json.type == "openPerson" && self.uid == json.user_id) {
        common_vendor.index.showToast({
          title: "您已被取消踢出直播间",
          icon: "none"
        });
      } else if (json.type == "explain") {
        this.explain = json.explain;
        this.isExplain = json.isExplain;
        this.showProduct(json.explain);
        this.showLike = false;
        this.showLike = true;
      }
    },
    /*关注*/
    followFunc() {
      let self = this;
      self.getRequest()._post(
        "user.favorite/add",
        {
          shop_supplier_id: self.roomDetail.supplier.shop_supplier_id,
          pid: self.roomDetail.supplier.shop_supplier_id,
          type: 10
        },
        function(res) {
          console.log(res);
          self.hasFollow = !self.hasFollow;
        }
      );
    },
    openAnchor() {
      this.$refs.liveAnchor.show();
    },
    changeFollow(e) {
      this.hasFollow = e;
    },
    openMore() {
      this.$refs.liveMore.show();
    },
    openShare(e) {
      let self = this;
      self.$refs.liveShare.show();
    },
    /*直播设置*/
    liveSet(e) {
      this.$refs.liveRoom.liveSet(e);
    },
    openRank() {
      this.$refs.liveRank.show();
    },
    /*发送礼物*/
    sendGift(e) {
      let self = this;
      let msg_arr = e.split(",");
      let msg = {
        type: "gift",
        msg: msg_arr[0],
        nickName: self.user.nickName,
        avatarUrl: self.user.avatarUrl
      };
      self.sendMsg(msg);
      let show_msg = {
        type: "gift_num",
        msg: msg_arr[1]
      };
      self.sendMsg(show_msg);
    },
    /*礼物转换*/
    getGiftName(id) {
      let name = "";
      for (let key in this.giftList) {
        for (let i = 0; i < this.giftList[key].length; i++) {
          let item = this.giftList[key][i];
          if (parseInt(id) === item.gift_id) {
            name = item.gift_name;
            console.log(name);
            break;
          }
        }
      }
      return name;
    },
    /*礼物转换*/
    getGiftImage(id) {
      let url = "";
      for (let key in this.giftList) {
        for (let i = 0; i < this.giftList[key].length; i++) {
          let item = this.giftList[key][i];
          if (parseInt(id) === item.gift_id) {
            url = item.file_path;
            break;
          }
        }
      }
      return url;
    },
    livePoster() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      let source = "wx";
      self.getRequest()._get(
        "plus.live.Room/poster",
        {
          room_id: self.room_id,
          source
        },
        (result) => {
          self.qrcode = result.data.qrcode;
        },
        null,
        () => {
          common_vendor.index.hideLoading();
        }
      );
    },
    /**/
    closeShare() {
      this.qrcode = null;
    },
    initemoji() {
      let page = Math.ceil(pagesLive_live_livePart_emoji.emoji.length / 21);
      for (let i = 0; i < page; i++) {
        this.emojiData[i] = [];
        for (let k = 0; k < 21; k++) {
          pagesLive_live_livePart_emoji.emoji[i * 21 + k] ? this.emojiData[i].push(pagesLive_live_livePart_emoji.emoji[i * 21 + k]) : "";
        }
      }
      console.log("initemoji:success");
    },
    goBack() {
      common_vendor.index.redirectTo({
        url: "/pagesLive/live/index"
      });
    },
    closeLive() {
      let self = this;
      if (self.isCaster) {
        common_vendor.index.showModal({
          title: "提示",
          content: "确定要结束当前直播吗?",
          success: function(o) {
            if (o.confirm) {
              self.getRequest()._get(
                "plus.live.agora.api/record_stop",
                {
                  room_id: self.room_id
                },
                function(res) {
                  console.log("record_stop");
                }
              );
              self.getRequest()._post(
                "plus.live.room/set_status",
                {
                  room_id: self.room_id,
                  status: 103
                },
                function(res) {
                  console.log("set_status");
                  self.leaveChannel("auto");
                }
              );
            }
          }
        });
      } else {
        self.leaveChannel("auto");
      }
    },
    onJoinChannelSuccess(e) {
      let self = this;
      console.log("------------onJoinChannelSuccess---------------");
      self.rtmLogin();
      if (self.isCaster) {
        self.getRequest()._post(
          "plus.live.room/set_status",
          {
            room_id: self.room_id,
            status: 101
          },
          function(res) {
          },
          (err) => {
            console.log(err);
          }
        );
        self.getRequest()._post(
          "plus.live.agora.api/record_acquire",
          {
            room_id: self.roomDetail.room_id
          },
          function(res) {
            console.log("--------record_acquire-----------");
            console.log(res);
            self.getRequest()._post(
              "plus.live.agora.api/record_start",
              {
                room_id: self.roomDetail.room_id
              },
              function(res2) {
                setTimeout(function() {
                  self.getRequest()._post(
                    "plus.live.agora.api/record_query",
                    {
                      room_id: self.roomDetail.room_id
                    },
                    function(res3) {
                      console.log("--------record_query-----------");
                      console.log(res3);
                    }
                  );
                }, 3e4);
              }
            );
          }
        );
      }
    },
    onLeaveChannel(e) {
      console.log("-------------onLeaveChannel---------------");
    },
    onRemoteVideoStateChanged(e) {
      console.log("-------------onRemoteVideoStateChanged---------------");
    },
    onUserJoined(e) {
      console.log("-------------onUserJoined---------------");
    },
    onUserOffline(e) {
      console.log("-------------onUserOffline---------------");
      this.leaveChannel("over");
    },
    leaveChannel(type) {
      let self = this;
      console.log("leaveChannel");
      clearInterval(self.intervalTime);
      if (self.platform == "android") {
        self.agoraRtm.leave();
        self.agoraRtm.release({
          channelId: self.liveChannelId
        });
      }
      self.agoraView.leaveChannel((res) => {
        console.log("leaveChannel success");
        self.agoraView.destroy();
      });
      let isCaster = self.isCaster ? "1" : "0";
      let url = "/pagesLive/live/live-over?room_id=" + self.room_id + "&isCaster=" + isCaster;
      console.log("url:" + url);
      if (self.isCaster) {
        common_vendor.index.redirectTo({
          url
        });
      } else {
        if (type == "auto") {
          common_vendor.index.navigateBack();
        } else {
          common_vendor.index.redirectTo({
            url
          });
        }
      }
    },
    onLoginSuccess(e) {
      this.joinChannel();
    },
    joinChannel() {
      let self = this;
      let agoraRtm2 = self.agoraRtm;
      agoraRtm2.createChannel(
        {
          channelId: self.liveChannelId
        },
        (res) => {
          agoraRtm2.join((res2) => {
            self.onJoinSuccess();
          });
        }
      );
    },
    onLoginFailure(e) {
      console.log("onLoginFailure");
      console.log(e);
    },
    onLogoutSuccess(e) {
      console.log("onLogoutSuccess");
      console.log(e);
    },
    onLogoutFailure(e) {
      console.log("onLogoutFailure");
      console.log(e);
    },
    onJoinSuccess(e) {
      let self = this;
      let msg = {
        type: "join",
        msg: "",
        registerLevel: self.registerLevel,
        nickName: self.nickName
      };
      self.sendMsg(msg);
      self.synRoomData();
      self.intervalTime = setInterval(function() {
        self.synRoomData();
      }, 1e4);
    },
    onJoinFailure(e) {
      console.log("onJoinFailure");
      console.log(e);
    },
    onChannelMessageReceived(e) {
      console.log("onChannelMessageReceived");
      this.showMsg(e.detail.messageData);
    },
    changeVirtualBackground(e) {
      var self = this;
      console.log("changeVirtualBackground e=" + e);
      if (e == "") {
        self.agoraView.enableVirtualBackground(
          {
            enabled: false
          },
          (res) => {
            console.log("changeVirtualBackground cancel");
            console.log(res);
          }
        );
        return;
      }
      common_vendor.index.downloadFile({
        url: e,
        success: (res) => {
          if (res.statusCode === 200) {
            console.log("下载成功");
            self.agoraView.enableVirtualBackground(
              {
                enabled: true,
                source: plus.io.convertLocalFileSystemURL(res.tempFilePath),
                backgroundSourceType: 2,
                color: 16777215,
                blur_degree: 1
              },
              (res2) => {
                console.log("changeVirtualBackground success");
                console.log(res2);
              }
            );
          }
        }
      });
    },
    synRoomData() {
      let self = this;
      let agoraRtm2 = self.agoraRtm;
      agoraRtm2.getChannelMemberCount(
        {
          channelIds: self.liveChannelId
        },
        (res) => {
          self.online_count = self.platform == "ios" ? res[0]["memberCount"] : res.memberCount[0].memberCount;
        }
      );
      return;
    }
  }
};
if (!Array) {
  const _component_preview = common_vendor.resolveComponent("preview");
  const _component_share = common_vendor.resolveComponent("share");
  const _component_Likes = common_vendor.resolveComponent("Likes");
  const _component_live_cart = common_vendor.resolveComponent("live-cart");
  const _component_live_gift = common_vendor.resolveComponent("live-gift");
  const _component_live_msg = common_vendor.resolveComponent("live-msg");
  const _component_live_plan = common_vendor.resolveComponent("live-plan");
  const _component_live_order = common_vendor.resolveComponent("live-order");
  const _component_live_anchor = common_vendor.resolveComponent("live-anchor");
  const _component_live_more = common_vendor.resolveComponent("live-more");
  const _component_live_share = common_vendor.resolveComponent("live-share");
  const _component_live_rank = common_vendor.resolveComponent("live-rank");
  const _component_AppShare = common_vendor.resolveComponent("AppShare");
  const _component_AgoraView = common_vendor.resolveComponent("AgoraView");
  const _component_Agora_RTC_SurfaceView = common_vendor.resolveComponent("Agora-RTC-SurfaceView");
  const _component_AgoraRtm = common_vendor.resolveComponent("AgoraRtm");
  (_component_preview + _component_share + _component_Likes + _component_live_cart + _component_live_gift + _component_live_msg + _component_live_plan + _component_live_order + _component_live_anchor + _component_live_more + _component_live_share + _component_live_rank + _component_AppShare + _component_AgoraView + _component_Agora_RTC_SurfaceView + _component_AgoraRtm)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.switchCamera),
    b: common_vendor.o($options.setBeautyOptions),
    c: common_vendor.o($options.changeVirtualBackground),
    d: common_vendor.o($options.setDefinition),
    e: common_vendor.o($options.openLive),
    f: common_vendor.o($options.closePreview),
    g: common_vendor.p({
      isShow: $data.is_preview
    }),
    h: !$data.is_preview
  }, !$data.is_preview ? common_vendor.e({
    i: common_vendor.o((...args) => $options.openAnchor && $options.openAnchor(...args)),
    j: $data.roomDetail.supplier && $data.roomDetail.supplier.logo && $data.roomDetail.supplier.logo.file_path || $data.roomDetail.user && $data.roomDetail.user.avatarUrl || "",
    k: common_vendor.t($data.roomDetail.supplier && $data.roomDetail.supplier.name),
    l: common_vendor.t($data.online_count),
    m: !$data.isCaster
  }, !$data.isCaster ? {
    n: common_vendor.t($data.hasFollow ? "已关注" : "关注"),
    o: common_vendor.n($data.hasFollow ? "ta-gz-on" : ""),
    p: common_vendor.o(($event) => $options.followFunc())
  } : {}, {
    q: common_vendor.o((...args) => $options.closeLive && $options.closeLive(...args)),
    r: $data.headerBarH,
    s: $data.statusBarH,
    t: common_vendor.t($data.giftName),
    v: common_vendor.t($data.roomDetail.gift_num),
    w: common_vendor.o((...args) => $options.openRank && $options.openRank(...args)),
    x: common_vendor.t($data.digg_num),
    y: $data.headerBarH,
    z: $data.giftInfo.nickName != ""
  }, $data.giftInfo.nickName != "" ? {
    A: $data.giftInfo.avatarUrl,
    B: common_vendor.t($data.giftInfo.nickName),
    C: common_vendor.t($data.giftInfo.giftName),
    D: $data.giftInfo.giftImage
  } : {}, {
    E: common_vendor.f($data.commentsList, (item, index, i0) => {
      return common_vendor.e({
        a: item.type == "text"
      }, item.type == "text" ? {
        b: common_vendor.t(" " + item.nickName),
        c: common_vendor.t(item.msg),
        d: common_vendor.t(" " + item.nickName)
      } : {}, {
        e: item.type == "enter"
      }, item.type == "enter" ? {
        f: common_vendor.t(item.nickName)
      } : {}, {
        g: item.type == "join"
      }, item.type == "join" ? {
        h: common_vendor.t(" " + item.nickName),
        i: common_vendor.t(" " + item.nickName)
      } : {}, {
        j: "comment" + index,
        k: index
      });
    }),
    F: $data.toMsg,
    G: common_vendor.o(($event) => $options.handleRollMsg()),
    H: $data.explain_product != null
  }, $data.explain_product != null ? {
    I: $data.explain_product.product_image,
    J: common_vendor.t($data.explain_product.product_price),
    K: common_vendor.o((...args) => $options.gotoProduct && $options.gotoProduct(...args))
  } : {}, {
    L: $data.qrcode != null
  }, $data.qrcode != null ? {
    M: common_vendor.o($options.closeShare),
    N: common_vendor.p({
      winHeight: $data.winHeight,
      qrcode: $data.qrcode
    })
  } : {}, {
    O: common_vendor.s("height:" + $data.winHeight + " ;")
  }) : {}, {
    P: $data.engine_load && _ctx.showLike
  }, $data.engine_load && _ctx.showLike ? {
    Q: common_vendor.sr("likes", "d5c3e7ae-2")
  } : {}, {
    R: common_vendor.sr("liveCart", "d5c3e7ae-3"),
    S: common_vendor.o($options.openOrder),
    T: common_vendor.o($options.setProduct),
    U: common_vendor.p({
      isCaster: $data.isCaster,
      shop_supplier_id: $data.roomDetail.supplier.shop_supplier_id,
      room_id: $data.room_id
    }),
    V: common_vendor.sr("liveGift", "d5c3e7ae-4"),
    W: common_vendor.o($options.openPlan),
    X: common_vendor.o($options.sendGift),
    Y: common_vendor.p({
      room_id: $data.room_id,
      giftName: $data.giftName,
      giftList: $data.giftList
    }),
    Z: common_vendor.sr("liveMsg", "d5c3e7ae-5"),
    aa: common_vendor.o($options.sendChannelMsg),
    ab: common_vendor.p({
      emojiData: $data.emojiData
    }),
    ac: common_vendor.sr("livePlan", "d5c3e7ae-6"),
    ad: common_vendor.o($options.closePlan),
    ae: common_vendor.p({
      giftName: $data.giftName
    }),
    af: common_vendor.sr("liveOrder", "d5c3e7ae-7"),
    ag: common_vendor.o($options.closeOrder),
    ah: common_vendor.p({
      shop_supplier_id: $data.roomDetail.supplier.shop_supplier_id,
      room_id: $data.room_id
    }),
    ai: common_vendor.sr("liveAnchor", "d5c3e7ae-8"),
    aj: common_vendor.o($options.changeFollow),
    ak: common_vendor.p({
      room_id: $data.room_id,
      shop_supplier_id: $data.roomDetail.supplier.shop_supplier_id
    }),
    al: common_vendor.sr("liveMore", "d5c3e7ae-9"),
    am: common_vendor.o($options.liveSet),
    an: common_vendor.o($options.switchCamera),
    ao: common_vendor.sr("liveShare", "d5c3e7ae-10"),
    ap: common_vendor.o($options.livePoster),
    aq: common_vendor.sr("liveRank", "d5c3e7ae-11"),
    ar: common_vendor.p({
      room_id: $data.room_id
    }),
    as: common_vendor.sr("appShare", "d5c3e7ae-12"),
    at: common_vendor.p({
      appParams: $data.appParams
    }),
    av: $data.platform == "android"
  }, $data.platform == "android" ? {
    aw: common_vendor.sr("agoraView", "d5c3e7ae-13"),
    ax: common_vendor.o($options.digg),
    ay: common_vendor.s("width:750rpx;height:" + $data.winHeight)
  } : {}, {
    az: $data.engine_load && $data.platform == "ios"
  }, $data.engine_load && $data.platform == "ios" ? {
    aA: common_vendor.o($options.digg),
    aB: common_vendor.s("width:750rpx;height:" + $data.winHeight),
    aC: common_vendor.p({
      zOrderMediaOverlay: $data.zOrderMediaOverlay,
      zOrderOnTop: $data.zOrderOnTop,
      renderMode: $data.renderMode,
      data: {
        uid: $data.view_uid,
        channelId: $data.liveChannelId
      },
      mirrorMode: $data.mirrorMode
    })
  } : {}, {
    aD: $data.platform == "android"
  }, $data.platform == "android" ? {
    aE: common_vendor.sr("agoraRtm", "d5c3e7ae-15")
  } : {}, {
    aF: common_vendor.s("height:" + $data.winHeight + " ;")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d5c3e7ae"], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/live.nvue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
