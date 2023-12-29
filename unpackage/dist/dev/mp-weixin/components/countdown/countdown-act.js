"use strict";
const common_vendor = require("../../common/vendor.js");
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
      title: "活动剩余："
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
    },
    back_color: {
      type: String,
      default: () => ""
    },
    cut_color: {
      type: String,
      default: () => ""
    },
    color: {
      type: String,
      default: () => ""
    },
    start_name: {
      type: String,
      default: () => "距开始"
    },
    end_name: {
      type: String,
      default: () => "距结束"
    },
    activeName: {
      type: String,
      default: () => ""
    }
  },
  created() {
  },
  watch: {
    config: {
      deep: true,
      handler: function(n, o) {
        if (n != o && n.endstamp != 0) {
          if (n.title && typeof n.title != "undefined")
            ;
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
        this.totalSeconds = parseInt(this.config.startstamp - nowseconds);
        this.countDown();
        this.title = this.start_name;
      } else if (nowseconds > this.config.endstamp) {
        this.status = 2;
        this.title = this.end_name;
      } else {
        this.totalSeconds = parseInt(this.config.endstamp - nowseconds);
        this.status = 0;
        this.countDown();
        this.title = this.end_name;
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
      this.day = day;
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
    },
    clear() {
      console.log(1);
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.config.type == null
  }, $props.config.type == null ? {
    b: common_vendor.t($data.title),
    c: common_vendor.t($data.day),
    d: common_vendor.s("background-color: " + $props.back_color + ";color:" + $props.cut_color),
    e: common_vendor.t($data.hour),
    f: common_vendor.t($data.minute),
    g: common_vendor.t($data.second)
  } : {}, {
    h: $props.config.type == "hours"
  }, $props.config.type == "hours" ? {
    i: common_vendor.t($data.title),
    j: common_vendor.t(parseInt($data.day * 24) + parseInt($data.hour)),
    k: common_vendor.s("background: " + $props.back_color + ";color:" + $props.cut_color + ";border-radius: 6rpx;padding: 4rpx;line-height: 1;font-size:24rpx;"),
    l: common_vendor.s("color:" + $props.color),
    m: common_vendor.t($data.minute),
    n: common_vendor.s("background: " + $props.back_color + ";color:" + $props.cut_color + ";border-radius: 6rpx;padding: 4rpx;line-height: 1;font-size:24rpx;"),
    o: common_vendor.s("color:" + $props.color),
    p: common_vendor.t($data.second),
    q: common_vendor.s("background: " + $props.back_color + ";color:" + $props.cut_color + ";border-radius: 6rpx;padding: 4rpx;line-height: 1;font-size:24rpx;"),
    r: common_vendor.s("color:" + $props.color)
  } : {}, {
    s: $props.config.type === "text"
  }, $props.config.type === "text" ? {
    t: common_vendor.t(parseInt($data.day * 24) + parseInt($data.hour)),
    v: common_vendor.t($data.minute),
    w: common_vendor.t($data.second)
  } : {}, {
    x: $props.config.type === "preview"
  }, $props.config.type === "preview" ? {
    y: common_vendor.t($data.title),
    z: common_vendor.t($data.day),
    A: common_vendor.s("background-color: " + $props.back_color + ";color:" + $props.cut_color),
    B: common_vendor.t($data.hour),
    C: common_vendor.s("background-color: " + $props.back_color + ";color:" + $props.cut_color),
    D: common_vendor.s("color:" + $props.color),
    E: common_vendor.t($data.minute),
    F: common_vendor.s("background-color: " + $props.back_color + ";color:" + $props.cut_color),
    G: common_vendor.s("color:" + $props.color),
    H: common_vendor.t($data.second),
    I: common_vendor.s("background-color: " + $props.back_color + ";color:" + $props.cut_color),
    J: common_vendor.s("color:" + $props.color)
  } : {}, {
    K: common_vendor.s("color:" + $props.color),
    L: common_vendor.n($props.activeName)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/countdown/countdown-act.vue"]]);
wx.createComponent(Component);
