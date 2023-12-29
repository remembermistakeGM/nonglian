"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uniLoadMore = () => "../../../../components/uni-load-more.js";
const _sfc_main = {
  components: {
    uniLoadMore
  },
  data() {
    return {
      input_len: 6,
      /*是否可见*/
      Visible: false,
      value: "",
      is_send: false
    };
  },
  props: ["isPop", "discount_ratio"],
  watch: {
    isPop: function(n, o) {
      let self = this;
      if (n != o) {
        self.Visible = n;
      }
    }
  },
  methods: {
    submit() {
      let self = this;
      if (self.is_send) {
        return;
      }
      self.is_send = true;
      self.page;
      self.list_rows;
      self._get("user.User/transPoints", {
        points: self.value
      }, function(res) {
        self.is_send = false;
        self.showSuccess(res.msg, () => {
          self.closePop(true);
        });
      }, (err) => {
        self.is_send = false;
      });
    },
    closePop(e) {
      this.$emit("close", e);
      this.value = "";
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(_ctx.points_name()),
    b: "请输入兑换" + _ctx.points_name() + "值",
    c: $data.value,
    d: common_vendor.o(($event) => $data.value = $event.detail.value),
    e: common_vendor.o(($event) => $data.value = ""),
    f: common_vendor.t(_ctx.points_name()),
    g: common_vendor.t($props.discount_ratio),
    h: common_vendor.o(($event) => $options.submit()),
    i: common_vendor.o(($event) => $options.closePop(null)),
    j: common_vendor.o(() => {
    }),
    k: common_vendor.n($data.Visible ? "pop-bg open" : "pop-bg close"),
    l: common_vendor.o(($event) => $options.closePop(null))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/points/part/recharge.vue"]]);
wx.createComponent(Component);
