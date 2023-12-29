"use strict";
const common_vendor = require("../../../../common/vendor.js");
const mpvueCityPicker = () => "../../../../components/mpvue-citypicker/mpvueCityPicker.js";
const _sfc_main = {
  components: {
    mpvueCityPicker
  },
  data() {
    return {
      cityPickerValueDefault: [0, 0, 0],
      selectCity: "选择省,市,区",
      province_id: 0,
      city_id: 0,
      region_id: 0,
      address: {},
      delta: 1,
      province: [],
      city: [],
      area: [],
      is_load: false,
      is_default: false
    };
  },
  onLoad: function(options) {
    this.delta = options.delta;
    this.getData();
  },
  methods: {
    // 获取省市区
    getData() {
      let self = this;
      self._post("settings/getRegion", {}, function(res) {
        self.province = res.data.regionData[0];
        self.city = res.data.regionData[1];
        self.area = res.data.regionData[2];
        self.is_load = true;
      });
    },
    /*提交*/
    formSubmit: function(e) {
      let self = this;
      var formdata = e.detail.value;
      formdata.province_id = self.province_id;
      formdata.city_id = self.city_id;
      formdata.region_id = self.region_id;
      formdata.is_default = self.is_default ? 1 : 0;
      if (formdata.name == "") {
        common_vendor.index.showToast({
          title: "请输入收货人姓名",
          duration: 1e3,
          icon: "none"
        });
        return false;
      }
      if (formdata.phone == "") {
        common_vendor.index.showToast({
          title: "请输入手机号码",
          duration: 1e3,
          icon: "none"
        });
        return false;
      }
      if (formdata.province_id == 0 || formdata.city_id == 0 || formdata.region_id == 0) {
        common_vendor.index.showToast({
          title: "请选择完整省市区",
          duration: 1e3,
          icon: "none"
        });
        return false;
      }
      if (formdata.detail == "") {
        common_vendor.index.showToast({
          title: "请输入街道小区楼牌号等",
          duration: 1e3,
          icon: "none"
        });
        return false;
      }
      console.log("调取接口");
      self._post("user.address/add", formdata, function(res) {
        self.showSuccess(res.msg, function() {
          common_vendor.index.navigateBack({
            delta: parseInt(self.delta)
          });
        });
      });
    },
    formReset: function(e) {
      console.log("清空数据");
    },
    /*三级联动选择*/
    showMulLinkageThreePicker() {
      this.$refs.mpvueCityPicker.show();
    },
    /*确定选择的省市区*/
    onConfirm(e) {
      this.selectCity = e.label;
      this.province_id = e.cityCode[0];
      this.city_id = e.cityCode[1];
      this.region_id = e.cityCode[2];
    }
  }
};
if (!Array) {
  const _component_mpvue_city_picker = common_vendor.resolveComponent("mpvue-city-picker");
  _component_mpvue_city_picker();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.address.name,
    b: common_vendor.o(($event) => $data.address.name = $event.detail.value),
    c: $data.address.phone,
    d: common_vendor.o(($event) => $data.address.phone = $event.detail.value),
    e: $data.selectCity,
    f: common_vendor.o(($event) => $data.selectCity = $event.detail.value),
    g: common_vendor.o((...args) => $options.showMulLinkageThreePicker && $options.showMulLinkageThreePicker(...args)),
    h: $data.address.detail,
    i: common_vendor.o(($event) => $data.address.detail = $event.detail.value),
    j: _ctx.getThemeColor(),
    k: $data.is_default,
    l: common_vendor.o(($event) => $data.is_default = !$data.is_default),
    m: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args)),
    n: common_vendor.o((...args) => $options.formReset && $options.formReset(...args)),
    o: $data.is_load
  }, $data.is_load ? {
    p: common_vendor.sr("mpvueCityPicker", "5d89669e-0"),
    q: common_vendor.o($options.onConfirm),
    r: common_vendor.p({
      province: $data.province,
      city: $data.city,
      area: $data.area,
      pickerValueDefault: $data.cityPickerValueDefault
    })
  } : {}, {
    s: _ctx.theme(),
    t: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/address/add/add.vue"]]);
wx.createPage(MiniProgramPage);
