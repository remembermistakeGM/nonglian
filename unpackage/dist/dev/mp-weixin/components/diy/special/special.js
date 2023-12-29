"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*数据列表*/
      listData: [],
      /*样式*/
      styleValue: "",
      /*当前角标*/
      index_num: 0,
      /*高度*/
      lineHeight: 0,
      /*最大数*/
      maxSize: 0,
      /*时间*/
      timer: null
    };
  },
  props: ["itemData"],
  created() {
    this.listData = this.itemData.data;
    this.init();
  },
  methods: {
    /*初始化*/
    init() {
      let self = this;
      if (this.itemData.style.display == 1 && this.listData.length > 1 || this.itemData.style.display == 2 && this.listData.length > 2) {
        common_vendor.index.getSystemInfo({
          success(res) {
            self.lineHeight = res.windowWidth / 750 * 30;
            self.maxSize = self.listData.length;
            if (self.itemData.style.display == 2) {
              self.lineHeight = self.lineHeight * 2;
              self.maxSize = self.maxSize / 2;
            }
            self.timer = setInterval(function() {
              self.animation();
            }, 3e3);
          }
        });
      }
    },
    /*动画*/
    animation() {
      let self = this;
      self.index_num++;
      if (self.index_num >= self.maxSize) {
        self.index_num = 0;
      }
      this.styleValue = -self.lineHeight * self.index_num;
    },
    /*跳转页面*/
    gotoPageFunc(e) {
      let url = null;
      if (e && typeof e != "undefined") {
        url = "pages/article/detail/detail?article_id=" + e.article_id;
      } else {
        url = "pages/article/list/list";
      }
      this.gotoPage(url);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.listData.length > 0
  }, $data.listData.length > 0 ? {
    b: $props.itemData.style.image,
    c: common_vendor.f($data.listData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.article_title),
        b: index,
        c: common_vendor.o(($event) => $options.gotoPageFunc(item), index)
      };
    }),
    d: common_vendor.s("transform: translate(0," + $data.styleValue + "px);"),
    e: common_vendor.n("display_" + $props.itemData.style.display),
    f: common_vendor.o(($event) => $options.gotoPageFunc()),
    g: $props.itemData.style.background,
    h: $props.itemData.style.topRadio * 2 + "rpx",
    i: $props.itemData.style.topRadio * 2 + "rpx",
    j: $props.itemData.style.bottomRadio * 2 + "rpx",
    k: $props.itemData.style.bottomRadio * 2 + "rpx",
    l: $props.itemData.style.bgcolor,
    m: $props.itemData.style.paddingLeft * 2 + "rpx",
    n: $props.itemData.style.paddingLeft * 2 + "rpx",
    o: $props.itemData.style.paddingTop * 2 + "rpx",
    p: $props.itemData.style.paddingBottom * 2 + "rpx"
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/diy/special/special.vue"]]);
wx.createComponent(Component);
