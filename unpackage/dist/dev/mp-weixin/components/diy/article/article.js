"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*数据列表*/
      listData: []
    };
  },
  props: ["itemData"],
  created() {
    this.listData = this.itemData.data;
  },
  methods: {
    /*跳转页面*/
    gotoPageFunc(e) {
      let _url = "pages/article/detail/detail?article_id=" + e.article_id;
      this.gotoPage(_url);
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    format(t) {
      var time = new Date(t);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      return y + "-" + this.add0(m) + "-" + this.add0(d);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.listData, (item, index, i0) => {
      return common_vendor.e($props.itemData.style.display == 10 ? common_vendor.e({
        a: item.image != null && item.image.file_path != ""
      }, item.image != null && item.image.file_path != "" ? {
        b: item.image.file_path
      } : {}, {
        c: common_vendor.t(item.article_title),
        d: common_vendor.t(item.actual_views),
        e: common_vendor.t($options.format(item.create_time))
      }) : {}, $props.itemData.style.display == 20 ? {
        f: common_vendor.t(item.article_title),
        g: common_vendor.t(item.actual_views),
        h: common_vendor.t($options.format(item.create_time))
      } : {}, {
        i: index,
        j: common_vendor.o(($event) => $options.gotoPageFunc(item), index)
      });
    }),
    b: $props.itemData.style.display == 10,
    c: $props.itemData.style.display == 20,
    d: common_vendor.n("show-type__" + $props.itemData.style.display),
    e: $props.itemData.style.background,
    f: $props.itemData.style.topRadio * 2 + "rpx",
    g: $props.itemData.style.topRadio * 2 + "rpx",
    h: $props.itemData.style.bottomRadio * 2 + "rpx",
    i: $props.itemData.style.bottomRadio * 2 + "rpx",
    j: $props.itemData.style.bgcolor,
    k: $props.itemData.style.paddingLeft * 2 + "rpx",
    l: $props.itemData.style.paddingLeft * 2 + "rpx",
    m: $props.itemData.style.paddingTop * 2 + "rpx",
    n: $props.itemData.style.paddingBottom * 2 + "rpx"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/diy/article/article.vue"]]);
wx.createComponent(Component);
