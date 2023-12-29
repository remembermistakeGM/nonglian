"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      nowTime: "",
      //当前时间
      liveList: [],
      //直播数据
      isLive: ""
      //直播状态
    };
  },
  props: ["itemData"],
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let self = this;
      let finderUserName = this.$props.itemData && this.$props.itemData.params.finderUserName;
      common_vendor.wx$1.getChannelsLiveInfo({
        //视频号ID,在登录视频号中获取
        finderUserName,
        success: (res) => {
          if (res.errMsg === "getChannelsLiveInfo:ok") {
            console.log("getChannelsLiveInfo成功", res);
            self.isLive = res.status;
          }
        },
        fail: (res) => {
          console.log("getChannelsLiveInfo失败", res);
        }
      });
    },
    gotoShiPinLive(finderUserName) {
      if (finderUserName) {
        common_vendor.wx$1.getChannelsLiveInfo({
          //视频号ID,在登录视频号中获取
          finderUserName,
          success: (res) => {
            if (res.errMsg === "getChannelsLiveInfo:ok") {
              console.log("getChannelsLiveInfo成功", res);
              if (res.status == 2 || res.status == 3) {
                res.finderUserName = finderUserName;
                this.zhibo(res);
              }
            }
          },
          fail: (res) => {
            console.log("getChannelsLiveInfo失败", res);
          }
        });
      }
    },
    zhibo(res) {
      common_vendor.wx$1.openChannelsLive({
        finderUserName: res.finderUserName,
        feedId: res.feedId,
        nonceId: res.nonceId,
        success: (res2) => {
          console.log("openChannelsLive成功", res2);
        },
        fail: (res2) => {
          console.log("openChannelsLive失败", res2);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isLive == 2 || $data.isLive == 3
  }, $data.isLive == 2 || $data.isLive == 3 ? {
    b: $props.itemData.params.image,
    c: common_vendor.t($data.isLive == 2 ? "直播中" : $data.isLive == 3 ? "已结束" : "未开始"),
    d: common_vendor.o(($event) => $options.gotoShiPinLive($props.itemData.params.finderUserName)),
    e: $props.itemData.style.right + "%",
    f: $props.itemData.style.bottom + "%",
    g: $props.itemData.style.opacity / 100
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f9776b12"], ["__file", "D:/workspace/p/nc/nc_app/components/diy/shipinLive/shipinLive.vue"]]);
wx.createComponent(Component);
