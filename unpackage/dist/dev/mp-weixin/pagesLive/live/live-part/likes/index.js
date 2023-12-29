"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      viewList: [],
      pageDate: /* @__PURE__ */ new Date()
      //全局时间用于函数节流
    };
  },
  beforeCreate() {
  },
  onShow() {
  },
  methods: {
    move() {
      let testEl = this.$refs["likelist"];
      console.log("--------------------点赞------------------------");
      console.log(testEl);
      let testimg = testEl[testEl.length - 1];
      animation.transition(testimg, {
        styles: {
          color: "#FF0000",
          transform: "translate(0, -200px)",
          opacity: "0",
          transformOrigin: "center center"
        },
        duration: 3e3,
        //ms
        timingFunction: "ease",
        delay: 0
        //ms
      }, function() {
        console.log("animation finished.");
      });
    },
    // 随机颜色（测试用可删除）
    random() {
      let r = Math.floor(Math.random() * 256), g = Math.floor(Math.random() * 256), b = Math.floor(Math.random() * 256);
      return `rgb(${r},${g},${b})`;
    },
    handleClick() {
      let that = this;
      let arr = ["-", ""];
      let arrImg = [
        "/static/qunzi.png",
        "/static/aixin.png",
        "/static/yusan.png",
        "/static/zan.png",
        "/static/hua.png",
        "/static/haixing.png"
      ];
      let randomImg = Math.floor(Math.random() * arrImg.length);
      let arrPush = {
        src: arrImg[randomImg],
        //用于随机图标
        back: this.random(),
        //可删除
        index: false,
        //可删除
        time: 5e3,
        //动画时间
        animationData: {},
        //每个盒子独立动画不可全局
        x: Math.ceil(Math.random() * 50),
        //方向间距
        q: Math.floor(Math.random() * arr.length),
        //用于随机方向
        lastIndex: 5,
        //用于删除数组
        timer: null,
        //定时器
        lastTime: 1e3
        //删除的倒计时
      };
      let t = /* @__PURE__ */ new Date() - this.pageDate;
      console.log("--------t=" + t);
      if (t < 300)
        return;
      this.pageDate = /* @__PURE__ */ new Date();
      this.viewList.push(arrPush);
      this.$nextTick(function() {
        this.viewList.forEach((i, o, v) => {
          var animate = common_vendor.index.createAnimation({
            duration: i.time,
            timingFunction: "ease-out"
          });
          that.animation = animate;
          let time = arr[i.q] + i.x;
          setTimeout(() => {
            that.animation.translateY(-200).step();
            that.animation.opacity(0).step();
            that.animation.translateX(Number(time)).step();
            i.animationData = that.animation.export();
            clearInterval(i.timer);
            i.timer = setInterval(() => {
              i.lastIndex--;
              if (i.lastIndex < 0) {
                v.splice(i, 1);
                clearInterval(i.timer);
              }
            }, i.lastTime);
          }, 100);
        });
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.viewList, (item, index, i0) => {
      return {
        a: item.src,
        b: item.animationData,
        c: item.index ? 1 : "",
        d: index
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fa81b042"], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/live-part/likes/index.vue"]]);
wx.createComponent(Component);
