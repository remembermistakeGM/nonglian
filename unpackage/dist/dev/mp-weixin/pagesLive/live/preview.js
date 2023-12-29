"use strict";
const common_vendor = require("../../common/vendor.js");
const Beauty = () => "./part/beauty.js";
const Definition = () => "./part/definition.js";
const Background = () => "./part/background.js";
const _sfc_main = {
  components: {
    Beauty,
    Definition,
    Background
  },
  data() {
    return {
      statusBarH: 0,
      headerBarH: 0,
      winHeight: 0,
      winWidth: 0
    };
  },
  props: ["isShow"],
  created() {
    this.initWind();
  },
  methods: {
    initWind() {
      let _sH = common_vendor.index.getSystemInfoSync().statusBarHeight;
      let _hH = _sH + 50;
      let _wH = common_vendor.index.getSystemInfoSync().windowHeight;
      let _wW = common_vendor.index.getSystemInfoSync().windowWidth;
      this.statusBarH = _sH;
      this.headerBarH = _hH;
      this.winHeight = _wH;
      this.winWidth = _wW;
    },
    /* 设置项 */
    openBeauty() {
      this.$refs.beauty.show();
    },
    openDefinition() {
      this.$refs.definition.show();
    },
    openBackground() {
      this.$refs.background.show();
    },
    BeautyFunc(e) {
      console.log("BeautyFuncBeautyFuncBeautyFunc");
      console.log(e);
      this.$emit("setBeautyOptions", e);
    },
    DefinitionFunc(e) {
      this.$emit("setDefinition", e);
    },
    BackgroundFunc(e) {
      console.log("BackgroundFunc");
      console.log(e);
      this.$emit("changeVirtualBackground", e);
    },
    closeLive() {
      this.$emit("close");
    },
    startFunc() {
      this.$emit("openLive");
    },
    startPreview() {
      this.$emit("startPreview");
    },
    switchCamera() {
      this.$emit("switchCamera");
    }
  }
};
if (!Array) {
  const _component_Beauty = common_vendor.resolveComponent("Beauty");
  const _component_Definition = common_vendor.resolveComponent("Definition");
  const _component_Background = common_vendor.resolveComponent("Background");
  (_component_Beauty + _component_Definition + _component_Background)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.isShow
  }, $props.isShow ? {
    b: common_vendor.o((...args) => $options.closeLive && $options.closeLive(...args)),
    c: common_vendor.s("top:" + $data.statusBarH + "px;"),
    d: common_vendor.o((...args) => $options.switchCamera && $options.switchCamera(...args)),
    e: common_vendor.o((...args) => $options.openBeauty && $options.openBeauty(...args)),
    f: common_vendor.o((...args) => $options.openDefinition && $options.openDefinition(...args)),
    g: $data.statusBarH,
    h: common_vendor.s("top:" + $data.winHeight * 0.72 + "px;"),
    i: common_vendor.o((...args) => $options.startFunc && $options.startFunc(...args)),
    j: common_vendor.sr("beauty", "66f52330-0"),
    k: common_vendor.o($options.BeautyFunc),
    l: common_vendor.sr("definition", "66f52330-1"),
    m: common_vendor.o($options.DefinitionFunc),
    n: common_vendor.sr("background", "66f52330-2"),
    o: common_vendor.o($options.BackgroundFunc)
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/preview.nvue"]]);
wx.createComponent(Component);
