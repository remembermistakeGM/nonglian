"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    const date = /* @__PURE__ */ new Date();
    const years = [];
    const year = date.getFullYear();
    const months = [];
    const month = date.getMonth() + 1;
    const days = [];
    const day = date.getDate();
    const hours = [];
    const hour = date.getHours();
    const minutes = [];
    const minute = date.getMinutes();
    for (let i = date.getFullYear(); i <= 2030; i++) {
      years.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    for (let i = 1; i <= 24; i++) {
      hours.push(i);
    }
    for (let i = 1; i <= 60; i++) {
      minutes.push(i);
    }
    return {
      title: "picker-view",
      years,
      year,
      months,
      month,
      days,
      day,
      hours,
      hour,
      minutes,
      minute,
      value: [0, month - 1, day - 1, hour, minute],
      visible: true
    };
  },
  created() {
    this.emitFunc(this.value);
  },
  methods: {
    /*选择触发*/
    bindChange: function(e) {
      const val = e.detail.value;
      this.emitFunc(val);
    },
    emitFunc(val) {
      this.year = this.years[val[0]];
      this.month = this.months[val[1]];
      this.day = this.days[val[2]];
      this.hour = this.hours[val[3]];
      this.minute = this.minutes[val[4]];
      this.$emit("get", this.year + "-" + this.month + "-" + this.day + " " + this.hour + ":" + this.minute);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.visible
  }, $data.visible ? {
    b: common_vendor.f($data.years, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    c: common_vendor.f($data.months, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    d: common_vendor.f($data.days, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    e: common_vendor.f($data.hours, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    f: common_vendor.f($data.minutes, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    g: $data.value,
    h: common_vendor.o((...args) => $options.bindChange && $options.bindChange(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-64ba9dfa"], ["__file", "D:/workspace/p/nc/nc_app/components/picker-view-datetime/pickerViewDatetime.vue"]]);
wx.createComponent(Component);
