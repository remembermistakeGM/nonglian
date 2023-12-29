"use strict";
const common_vendor = require("../../../common/vendor.js");
const uniLoadMore = () => "../../../components/uni-load-more.js";
const _sfc_main = {
  components: {
    uniLoadMore
  },
  data() {
    return {
      popupVisible: false,
      emojiShow: false,
      inputBottom: 0,
      inputheight: 0,
      content: ""
    };
  },
  beforeCreate() {
  },
  props: ["emojiData"],
  methods: {
    selemoji(m) {
      console.log(m);
      this.content += m;
    },
    show() {
      this.popupVisible = true;
    },
    close() {
      this.popupVisible = false;
    },
    /*评论*/
    sendTextMsg() {
      common_vendor.index.hideKeyboard();
      this.$emit("closeMsg", this.content);
      this.content = "";
      this.emojiShow = false;
      this.popupVisible = false;
    },
    inputFocus(e) {
      this.inputBottom = e.detail.height;
      this.emojiShow = false;
      console.log(e);
    },
    inputBlur() {
      this.inputBottom = 0;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.popupVisible
  }, $data.popupVisible ? common_vendor.e({
    b: common_vendor.o((...args) => $options.close && $options.close(...args)),
    c: common_vendor.o(($event) => $options.sendTextMsg()),
    d: common_vendor.o((...args) => $options.inputFocus && $options.inputFocus(...args)),
    e: common_vendor.o((...args) => $options.inputBlur && $options.inputBlur(...args)),
    f: $data.content,
    g: common_vendor.o(($event) => $data.content = $event.detail.value),
    h: common_vendor.o(($event) => $data.emojiShow = !$data.emojiShow),
    i: common_vendor.o((...args) => $options.sendTextMsg && $options.sendTextMsg(...args)),
    j: $data.emojiShow
  }, $data.emojiShow ? {
    k: common_vendor.f($props.emojiData, (item, key, i0) => {
      return {
        a: common_vendor.f(item, (emoji, index, i1) => {
          return {
            a: common_vendor.t(emoji),
            b: index,
            c: common_vendor.o(($event) => $options.selemoji(emoji), index)
          };
        }),
        b: key,
        c: common_vendor.n(key == $props.emojiData.length - 1 ? "lastbox" : "")
      };
    })
  } : {}, {
    l: common_vendor.s("bottom:" + $data.inputBottom + "px;"),
    m: common_vendor.o(() => {
    })
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9d51e128"], ["__file", "D:/workspace/p/nc/nc_app/pagesLive/live/live-part/liveMsg.nvue"]]);
wx.createComponent(Component);
