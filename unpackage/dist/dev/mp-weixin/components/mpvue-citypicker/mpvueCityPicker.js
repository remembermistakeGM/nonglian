"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      pickerValue: [0, 0, 0],
      provinceDataList: [],
      cityDataList: [],
      areaDataList: [],
      /* 是否显示控件 */
      showPicker: false,
      provinceData: [],
      cityData: [],
      areaData: []
    };
  },
  created() {
    this.init();
  },
  props: {
    /* 默认值 */
    pickerValueDefault: {
      type: Array,
      default() {
        return [0, 0, 0];
      }
    },
    /* 主题色 */
    themeColor: String,
    province: {
      type: Array
    },
    city: {
      type: Array
    },
    area: {
      type: Array
    }
  },
  watch: {
    pickerValueDefault() {
      this.init();
    }
  },
  methods: {
    init() {
      this.provinceData = this.province;
      this.cityData = this.city;
      this.areaData = this.area;
      this.handPickValueDefault();
      this.provinceDataList = this.provinceData;
      this.cityDataList = this.cityData[this.pickerValueDefault[0]];
      this.areaDataList = this.areaData[this.pickerValueDefault[0]][this.pickerValueDefault[1]];
      this.pickerValue = this.pickerValueDefault;
    },
    show() {
      setTimeout(() => {
        this.showPicker = true;
      }, 0);
    },
    maskClick() {
    },
    pickerCancel() {
      this.showPicker = false;
      this._$emit("onCancel");
    },
    pickerConfirm(e) {
      this.showPicker = false;
      this._$emit("onConfirm");
    },
    showPickerView() {
      this.showPicker = true;
    },
    handPickValueDefault() {
      if (this.pickerValueDefault !== [0, 0, 0]) {
        if (this.pickerValueDefault[0] > this.provinceData.length - 1) {
          this.pickerValueDefault[0] = this.provinceData.length - 1;
        }
        if (this.pickerValueDefault[1] > this.cityData[this.pickerValueDefault[0]].length - 1) {
          this.pickerValueDefault[1] = this.cityData[this.pickerValueDefault[0]].length - 1;
        }
        if (this.pickerValueDefault[2] > this.areaData[this.pickerValueDefault[0]][this.pickerValueDefault[1]].length - 1) {
          this.pickerValueDefault[2] = this.areaData[this.pickerValueDefault[0]][this.pickerValueDefault[1]].length - 1;
        }
      }
    },
    pickerChange(e) {
      let changePickerValue = e.detail.value;
      if (this.pickerValue[0] !== changePickerValue[0]) {
        this.cityDataList = this.cityData[changePickerValue[0]];
        this.areaDataList = this.areaData[changePickerValue[0]][0];
        changePickerValue[1] = 0;
        changePickerValue[2] = 0;
      } else if (this.pickerValue[1] !== changePickerValue[1]) {
        this.areaDataList = this.areaData[changePickerValue[0]][changePickerValue[1]];
        changePickerValue[2] = 0;
      }
      this.pickerValue = changePickerValue;
      this._$emit("onChange");
    },
    _$emit(emitName) {
      let pickObj = {
        label: this._getLabel(),
        value: this.pickerValue,
        cityCode: this._getCityCode()
      };
      this.$emit(emitName, pickObj);
    },
    _getLabel() {
      let pcikerLabel = this.provinceDataList[this.pickerValue[0]].label + "," + this.cityDataList[this.pickerValue[1]].label + "," + this.areaDataList[this.pickerValue[2]].label;
      return pcikerLabel;
    },
    _getCityCode() {
      let pcikerCode = [0, 0, 0];
      pcikerCode[0] = this.provinceDataList[this.pickerValue[0]].value;
      pcikerCode[1] = this.cityDataList[this.pickerValue[1]].value;
      pcikerCode[2] = this.areaDataList[this.pickerValue[2]].value;
      return pcikerCode;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.showPicker ? 1 : "",
    b: common_vendor.o((...args) => $options.maskClick && $options.maskClick(...args)),
    c: common_vendor.o((...args) => $options.pickerCancel && $options.pickerCancel(...args)),
    d: $props.themeColor,
    e: common_vendor.o((...args) => $options.pickerConfirm && $options.pickerConfirm(...args)),
    f: common_vendor.f($data.provinceDataList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.label),
        b: index
      };
    }),
    g: common_vendor.f($data.cityDataList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.label),
        b: index
      };
    }),
    h: common_vendor.f($data.areaDataList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.label),
        b: index
      };
    }),
    i: $data.pickerValue,
    j: common_vendor.o((...args) => $options.pickerChange && $options.pickerChange(...args)),
    k: $data.showPicker ? 1 : ""
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/components/mpvue-citypicker/mpvueCityPicker.vue"]]);
wx.createComponent(Component);
