"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      showGiftView: false,
      /*是否打开充值*/
      open_plan: false,
      /*个人信息*/
      userInfo: {},
      isGift: 0
    };
  },
  props: ["giftName", "giftList", "room_id"],
  methods: {
    show() {
      this.showGiftView = true;
      this.getUser();
    },
    /*请求对象*/
    getRequest() {
      let self = this;
      return self;
    },
    /*获取用户信息*/
    getUser() {
      let self = this;
      self.getRequest()._get("user.user/detail", {}, function(res) {
        self.userInfo = res.data.userInfo;
      });
    },
    chooseGift(item) {
      this.isGift = item.gift_id;
    },
    sendGift(item) {
      let self = this;
      console.log("发送礼物");
      self.getRequest()._post(
        "plus.live.room/send_gift",
        {
          room_id: self.room_id,
          gift_id: item.gift_id
        },
        function(res) {
          console.log(res);
          common_vendor.index.showToast({
            title: res.msg
          });
          self.userInfo.gift_money = res.data.gift_money;
          self.$emit("sendGift", item.gift_id + "," + res.data.gift_num);
        }
      );
    },
    PlanFunc() {
      this.showGiftView = false;
      this.$emit("openPlan");
    },
    close() {
      this.showGiftView = false;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showGiftView
  }, $data.showGiftView ? {
    b: common_vendor.o((...args) => $options.close && $options.close(...args)),
    c: common_vendor.t($props.giftName),
    d: common_vendor.t($data.userInfo.gift_money),
    e: common_vendor.o((...args) => $options.PlanFunc && $options.PlanFunc(...args)),
    f: common_vendor.f($props.giftList, (group, num, i0) => {
      return {
        a: common_vendor.f(group, (item, index, i1) => {
          return common_vendor.e({
            a: item.gift_id != $data.isGift
          }, item.gift_id != $data.isGift ? {
            b: item.file_path,
            c: common_vendor.t(item.gift_name),
            d: common_vendor.t(item.price),
            e: common_vendor.t($props.giftName),
            f: common_vendor.o(($event) => $options.chooseGift(item), index)
          } : {}, {
            g: item.gift_id == $data.isGift
          }, item.gift_id == $data.isGift ? {
            h: item.file_path,
            i: common_vendor.t(item.price),
            j: common_vendor.t($props.giftName),
            k: common_vendor.o(($event) => $options.sendGift(item), index)
          } : {}, {
            l: index
          });
        }),
        b: num
      };
    }),
    g: common_vendor.o(() => {
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4807220e"], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/live-part/liveGift.nvue"]]);
wx.createComponent(Component);
