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
      /*地址id*/
      address_id: 0,
      /*地址数据*/
      address: {},
      /*地区*/
      region: {},
      is_load: false,
      province: [],
      city: [],
      area: [],
      delta: 1,
      is_default: false
    };
  },
  onLoad(e) {
    this.delta = e.delta;
    this.address_id = e.address_id;
  },
  mounted() {
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      let address_id = self.address_id;
      self._get(
        "user.address/detail",
        {
          address_id
        },
        function(res) {
          self.address = res.data.detail;
          self.address_id = res.data.detail.address_id;
          self.province_id = res.data.detail.province_id;
          self.city_id = res.data.detail.city_id;
          self.region_id = res.data.detail.region_id;
          self.region = res.data.region;
          let add = "";
          self.region.forEach((item) => {
            add += item;
          });
          self.selectCity = add;
          self.province = res.data.regionData[0];
          self.city = res.data.regionData[1];
          self.area = res.data.regionData[2];
          self.is_default = res.data.is_default == 1 ? true : false;
          self.is_load = true;
        }
      );
    },
    /*提交地址*/
    formSubmit: function(e) {
      let self = this;
      var formdata = e.detail.value;
      formdata.province_id = self.province_id;
      formdata.city_id = self.city_id;
      formdata.region_id = self.region_id;
      formdata.address_id = self.address_id;
      formdata.region = self.region;
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
      if (formdata.province_id == 0 || formdata.city_id == 0 || formdata.region_id) {
        if (formdata.detail == "") {
          common_vendor.index.showToast({
            title: "请选择完整省市区",
            duration: 1e3,
            icon: "none"
          });
          return false;
        }
      }
      self._post("user.address/edit", formdata, function(res) {
        self.showSuccess(res.msg, function() {
          console.log(self.delta);
          common_vendor.index.navigateBack({
            delta: 1
          });
        });
      });
    },
    /*清空数据*/
    formReset: function(e) {
      console.log("清空数据");
    },
    /*三级联动选择*/
    showMulLinkageThreePicker() {
      this.$refs.mpvueCityPicker.show();
    },
    /*选择之后绑定*/
    onConfirm(e) {
      this.region = e.label.split(",");
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
    p: common_vendor.sr("mpvueCityPicker", "7e418426-0"),
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/address/edit/edit.vue"]]);
wx.createPage(MiniProgramPage);
