"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*状态*/
      status: 0,
      /*天*/
      day: "0",
      /*时*/
      hour: "0",
      /*分*/
      minute: "0",
      /*秒*/
      second: "0",
      /*定时器*/
      timer: null,
      /*剩余秒*/
      totalSeconds: 0,
      /*标题*/
      title: "距离开始仅剩："
    };
  },
  props: {
    config: {
      type: Object,
      default: function() {
        return {
          type: "all"
        };
      }
    }
  },
  created() {
  },
  watch: {
    config: {
      deep: true,
      handler: function(n, o) {
        if (n != o && n.endstamp != 0) {
          if (n.title && typeof n.title != "undefined") {
            this.title = n.title;
          }
          this.setTime();
        }
      },
      immediate: true
    }
  },
  methods: {
    /*轮循*/
    setTime() {
      let self = this;
      self.timer = setInterval(function() {
        self.init();
      }, 1e3);
    },
    /*初始化*/
    init() {
      let nowseconds = Date.now() / 1e3;
      if (nowseconds < this.config.startstamp) {
        this.status = 1;
      } else if (nowseconds > this.config.endstamp) {
        this.status = 2;
      } else {
        this.totalSeconds = parseInt(this.config.endstamp - nowseconds);
        this.status = 0;
        this.countDown();
      }
      this.$emit("returnVal", this.status);
    },
    /*计算时分秒*/
    countDown() {
      let totalSeconds = this.totalSeconds;
      let day = Math.floor(totalSeconds / (60 * 60 * 24));
      let modulo = totalSeconds % (60 * 60 * 24);
      let hour = Math.floor(modulo / (60 * 60));
      modulo = modulo % (60 * 60);
      let minute = Math.floor(modulo / 60);
      let second = modulo % 60;
      this.day = this.convertTwo(day);
      this.hour = this.convertTwo(hour);
      this.minute = this.convertTwo(minute);
      this.second = this.convertTwo(second);
      this.totalSeconds--;
    },
    /*转两位数*/
    convertTwo(n) {
      let str = "";
      if (n < 10) {
        str = "0" + n;
      } else {
        str = n;
      }
      return str;
    },
    /*把时间戳转普通时间*/
    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1e3).toLocaleString().replace(/:\d{1,2}$/, " ");
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.config.type == null
  }, $props.config.type == null ? common_vendor.e({
    b: $data.status == 0
  }, $data.status == 0 ? {
    c: common_vendor.t($data.title)
  } : {}, {
    d: $data.status == 1
  }, $data.status == 1 ? {} : {}, {
    e: $data.status == 2
  }, $data.status == 2 ? {} : {}, {
    f: common_vendor.t($data.day),
    g: common_vendor.t($data.hour),
    h: common_vendor.t($data.minute),
    i: common_vendor.t($data.second)
  }) : {}, {
    j: $props.config.type === "text"
  }, $props.config.type === "text" ? {
    k: common_vendor.t($data.title),
    l: common_vendor.t(parseInt($data.day * 24) + parseInt($data.hour)),
    m: common_vendor.t($data.minute),
    n: common_vendor.t($data.second)
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/live-part/countdown_nvue.vue"]]);
wx.createComponent(Component);
