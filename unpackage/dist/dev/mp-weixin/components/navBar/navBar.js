"use strict";
const common_vendor = require("../../common/vendor.js");
const ssScrollNavbar = () => "./scroll-navbar.js";
const _sfc_main = {
  props: ["currentI", "navList"],
  components: {
    ssScrollNavbar
  },
  data() {
    return {
      currentIndex: 0,
      isFixed: false,
      topHeight: 0,
      listData: []
    };
  },
  onLoad(options) {
    this.calculateTopSectionHeight();
  },
  created() {
  },
  methods: {
    navbarTapHandler(index) {
      this.currentIndex = index;
      this.$emit("currentIndex", index);
    },
    scrollChnage(e) {
      let top = e.detail.scrollTop;
      if (top >= this.topHeight) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
    /**
     * 计算头部视图的高度
     */
    calculateTopSectionHeight() {
      var that = this;
      let topView = common_vendor.index.createSelectorQuery().select(".top-section");
      topView.fields({
        size: true
      }, (data) => {
        that.topHeight = data.height;
      }).exec();
    }
  },
  watch: {
    currentI: function(newVal) {
      this.navbarTapHandler(newVal);
    }
  }
};
if (!Array) {
  const _component_ss_scroll_navbar = common_vendor.resolveComponent("ss-scroll-navbar");
  _component_ss_scroll_navbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.navbarTapHandler),
    b: common_vendor.p({
      tabCurrentIndex: $data.currentIndex,
      scrollChangeIndex: $props.currentI,
      navArr: $props.navList
    }),
    c: $data.isFixed ? 1 : "",
    d: common_vendor.o((...args) => $options.scrollChnage && $options.scrollChnage(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/navBar/navBar.vue"]]);
wx.createComponent(Component);
