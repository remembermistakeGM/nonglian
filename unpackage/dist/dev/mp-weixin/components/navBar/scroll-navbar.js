"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "ss-scroll-navbar",
  props: {
    navArr: {
      type: Array,
      default() {
        return [{
          name: "推荐",
          category_id: "recent"
        }];
      }
    },
    tabCurrentIndex: {
      type: Number,
      default: 0
    },
    scrollChangeIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      scrollLeft: 0,
      widthList: [],
      screenWidth: 0
    };
  },
  methods: {
    /**
     * 导航栏navbar
     * 点击事件
     */
    tabChange(index) {
      this.$emit("navbarTap", index);
      var widthArr = this.widthList;
      var scrollWidth = 0;
      for (var i = 0; i < index + 1; i++) {
        scrollWidth += widthArr[i];
      }
      let currentWidth = widthArr[index];
      scrollWidth -= this.screenWidth / 2;
      scrollWidth -= currentWidth / 2;
      this.scrollLeft = scrollWidth;
    },
    calculateItemWidth() {
      var arr = [];
      this.navArr.forEach((item, index) => {
        let view = common_vendor.index.createSelectorQuery().in(this).select("#item-" + index);
        view.fields({
          size: true
        }, (data) => {
          arr.push(data.width);
        }).exec();
      });
      this.widthList = arr;
    },
    calculateWindowWidth() {
      var info = common_vendor.index.getSystemInfoSync();
      this.screenWidth = info.screenWidth;
    }
  },
  created() {
    var that = this;
    this.calculateWindowWidth();
    setTimeout(function() {
      that.calculateItemWidth();
    }, 1e3);
  },
  watch: {
    scrollChangeIndex(val) {
      this.tabChange(val);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.navArr, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.category_id,
        c: index === $props.tabCurrentIndex ? 1 : "",
        d: common_vendor.o(($event) => $options.tabChange(index), item.category_id),
        e: "item-" + index
      };
    }),
    b: $data.scrollLeft
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/navBar/scroll-navbar.vue"]]);
wx.createComponent(Component);
