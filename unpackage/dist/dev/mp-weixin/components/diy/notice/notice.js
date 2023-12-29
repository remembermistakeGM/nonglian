"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      textData: "",
      n: 0,
      textW: 0,
      start: 0,
      times: null
    };
  },
  props: ["itemData"],
  created() {
    this.textData = this.itemData.params.text;
    this.horseRaceLamp();
    this.$nextTick(() => {
      this.init();
    });
  },
  beforeDestroy() {
    clearTimeout(this.times);
  },
  methods: {
    /*初始化*/
    init() {
      let self = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          let view = common_vendor.index.createSelectorQuery().in(self).select(".transtext");
          view.boundingClientRect((data) => {
            let h = data.width;
            self.textW = 0;
            self.start = 2 * h;
          }).exec();
        }
      });
    },
    horseRaceLamp() {
      let self = this;
      self.times = setTimeout(function() {
        self.textW--;
        if (self.textW * -1 >= self.start) {
          self.textW = 710;
        }
        self.horseRaceLamp();
      }, 10);
    },
    /*跳转页面*/
    gotoPages(e) {
      this.gotoPage(e.linkUrl);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.itemData.params.icon,
    b: common_vendor.t($data.textData),
    c: common_vendor.s("color:" + $props.itemData.style.textColor + ";left:" + $data.textW + "rpx"),
    d: $props.itemData.style.background,
    e: $props.itemData.style.topRadio * 2 + "rpx",
    f: $props.itemData.style.topRadio * 2 + "rpx",
    g: $props.itemData.style.bottomRadio * 2 + "rpx",
    h: $props.itemData.style.bottomRadio * 2 + "rpx",
    i: "0 " + $props.itemData.style.padding + "rpx",
    j: common_vendor.o(($event) => $options.gotoPages(_ctx.item)),
    k: $props.itemData.style.bgcolor,
    l: $props.itemData.style.paddingLeft * 2 + "rpx",
    m: $props.itemData.style.paddingLeft * 2 + "rpx",
    n: $props.itemData.style.paddingTop * 2 + "rpx",
    o: $props.itemData.style.paddingBottom * 2 + "rpx"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/diy/notice/notice.vue"]]);
wx.createComponent(Component);
