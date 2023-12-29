"use strict";
const common_vendor = require("../../common/vendor.js");
const common_utils = require("../../common/utils.js");
const Upload = () => "../../components/upload/upload2.js";
const mpvueCityPicker = () => "../../components/mpvue-citypicker/mpvueCityPicker.js";
const _sfc_main = {
  components: {
    mpvueCityPicker,
    Upload
  },
  data() {
    return {
      loading: true,
      table_id: 0,
      name: "",
      tableData: [],
      /* 地区选择数据 */
      province: [],
      city: [],
      area: [],
      is_load: false,
      cityPickerValueDefault: [0, 0, 0],
      areaIndex: 0,
      /* 上传图片 */
      isupload: false,
      uploadIndex: 0
    };
  },
  onShow() {
    if (this.loading) {
      this.getData();
    }
  },
  onLoad(e) {
    this.table_id = e.table_id;
  },
  methods: {
    getData() {
      let self = this;
      self.loading = true;
      self._get("plus.table.table/add", {
        table_id: self.table_id
      }, function(res) {
        self.loading = false;
        self.tableData = res.data.model.tableData;
        self.tableData.forEach((item, index) => {
          self.$set(self.tableData[index], "value", "");
        });
        self.province = res.data.regionData[0];
        self.city = res.data.regionData[1];
        self.area = res.data.regionData[2];
        self.is_load = true;
        self.name = res.data.model.name;
        common_vendor.index.setNavigationBarTitle({
          title: self.name
        });
      });
    },
    getName(str) {
      console.log(str);
      return str.split(",");
    },
    getRadioGroup(index, e) {
      let arr = this.tableData[index].value.split(",");
      return arr.indexOf(e);
    },
    /* 单选框 */
    changeRadio(e, index) {
      this.tableData[index].value = e.detail.value;
    },
    /* 多选框 */
    changeRadioGroup(e, index) {
      let arr = e.detail.value;
      if (arr.length > 0) {
        arr = arr.join(",");
      } else {
        arr = "";
      }
      this.tableData[index].value = arr;
    },
    /* 下拉框 */
    changeSelect(e, index) {
      this.tableData[index].value = this.getName(this.tableData[index].select_value)[e.detail.value];
    },
    /* 日期选择 */
    changeDate(e, index) {
      this.tableData[index].value = e.detail.value;
    },
    /* 地区选择 */
    changeArea(index) {
      this.areaIndex = index;
      this.$refs.mpvueCityPicker.show();
    },
    /*确定选择的省市区*/
    onConfirm(e) {
      this.tableData[this.areaIndex].value = e.label;
      this.cityPickerValueDefault = [0, 0, 0];
      this.areaIndex = 0;
    },
    /*上传*/
    openUpload(i) {
      this.uploadIndex = i;
      this.isupload = true;
    },
    /*获取图片*/
    getImgsFunc(e) {
      if (e != null && e.length > 0) {
        this.tableData[this.uploadIndex].value = e[0].file_path;
      }
      this.uploadIndex = 0;
      this.isupload = false;
    },
    submit() {
      let self = this;
      let flag = true;
      let text = "";
      this.tableData.forEach((item, index) => {
        if (item.is_required != "false") {
          switch (item.rule) {
            case "mobile":
              if (!common_utils.utils.isPoneAvailable(item.value)) {
                text = "请输入正确的手机号";
                flag = false;
              }
              break;
            case "idcard":
              if (!common_utils.utils.isVail(item.value)) {
                text = "请输入正确的身份证号码";
                flag = false;
              }
              break;
            case "phone":
              if (!common_utils.utils.isTelAvailable(item.value)) {
                text = "请输入正确的座机或手机号";
                flag = false;
              }
              break;
            case "email":
              if (!common_utils.utils.isMail(item.value)) {
                text = "请输入正确的电子邮箱";
                flag = false;
              }
              break;
            case "number":
              if (!common_utils.utils.isNum(item.value)) {
                text = "请输入正确的数字";
                flag = false;
              }
              break;
            case "no":
              if (item.value == "") {
                text = "必填项不能为空";
                flag = false;
              }
              break;
          }
        }
      });
      if (!flag) {
        self.showError(text);
        return false;
      }
      let params = [...self.tableData];
      params.forEach((item, index) => {
        if (item.type == "area") {
          item.value = item.value + item.address;
        }
      });
      params = JSON.stringify(params);
      self._post("plus.table.table/add", {
        tableData: params,
        table_id: self.table_id
      }, function(res) {
        self.showSuccess("提交成功", function() {
          common_vendor.index.navigateBack({
            delta: parseInt(1)
          });
        });
      });
    }
  }
};
if (!Array) {
  const _component_mpvue_city_picker = common_vendor.resolveComponent("mpvue-city-picker");
  const _component_Upload = common_vendor.resolveComponent("Upload");
  (_component_mpvue_city_picker + _component_Upload)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loading
  }, !$data.loading ? common_vendor.e({
    b: common_vendor.f($data.tableData, (item, index, i0) => {
      return common_vendor.e({
        a: item.type == "radio"
      }, item.type == "radio" ? {
        b: common_vendor.n(item.is_required != "false" ? "red" : "white"),
        c: common_vendor.t(item.name),
        d: common_vendor.f($options.getName(item.select_value), (ritem, rindex, i1) => {
          return {
            a: item.value == ritem,
            b: ritem,
            c: common_vendor.t(ritem),
            d: rindex
          };
        }),
        e: common_vendor.o(($event) => $options.changeRadio($event, index), index)
      } : {}, {
        f: item.type == "radio-group"
      }, item.type == "radio-group" ? {
        g: common_vendor.n(item.is_required != "false" ? "red" : "white"),
        h: common_vendor.t(item.name),
        i: common_vendor.f($options.getName(item.select_value), (ritem, rindex, i1) => {
          return {
            a: $options.getRadioGroup(index, ritem) != -1,
            b: ritem,
            c: common_vendor.t(ritem),
            d: ritem
          };
        }),
        j: common_vendor.o(($event) => $options.changeRadioGroup($event, index), index)
      } : {}, {
        k: item.type == "text"
      }, item.type == "text" ? {
        l: common_vendor.n(item.is_required != "false" ? "red" : "white"),
        m: common_vendor.t(item.name),
        n: item.value,
        o: common_vendor.o(($event) => item.value = $event.detail.value, index)
      } : {}, {
        p: item.type == "textarea"
      }, item.type == "textarea" ? {
        q: common_vendor.n(item.is_required != "false" ? "red" : "white"),
        r: common_vendor.t(item.name),
        s: item.value,
        t: common_vendor.o(($event) => item.value = $event.detail.value, index)
      } : {}, {
        v: item.type == "select"
      }, item.type == "select" ? {
        w: common_vendor.n(item.is_required != "false" ? "red" : "white"),
        x: common_vendor.t(item.name),
        y: common_vendor.t(item.value || "请选择"),
        z: common_vendor.o(($event) => $options.changeSelect($event, index), index),
        A: $options.getName(item.select_value)
      } : {}, {
        B: item.type == "date"
      }, item.type == "date" ? {
        C: common_vendor.n(item.is_required != "false" ? "red" : "white"),
        D: common_vendor.t(item.name),
        E: common_vendor.t(item.value || "请选择"),
        F: common_vendor.o(($event) => $options.changeDate($event, index), index)
      } : {}, {
        G: item.type == "time"
      }, item.type == "time" ? {
        H: common_vendor.n(item.is_required != "false" ? "red" : "white"),
        I: common_vendor.t(item.name),
        J: common_vendor.t(item.value || "请选择"),
        K: common_vendor.o(($event) => $options.changeDate($event, index), index)
      } : {}, {
        L: item.type == "area"
      }, item.type == "area" ? {
        M: common_vendor.n(item.is_required != "false" ? "red" : "white"),
        N: common_vendor.t(item.name),
        O: item.value,
        P: common_vendor.o(($event) => item.value = $event.detail.value, index),
        Q: common_vendor.o(($event) => $options.changeArea(index), index),
        R: item.address,
        S: common_vendor.o(($event) => item.address = $event.detail.value, index)
      } : {}, {
        T: item.type == "image"
      }, item.type == "image" ? common_vendor.e({
        U: common_vendor.n(item.is_required != "false" ? "red" : "white"),
        V: common_vendor.t(item.name),
        W: common_vendor.o(($event) => $options.openUpload(index), index),
        X: item.value != ""
      }, item.value != "" ? {
        Y: item.value
      } : {}) : {}, {
        Z: index
      });
    }),
    c: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    d: $data.is_load
  }, $data.is_load ? {
    e: common_vendor.sr("mpvueCityPicker", "6217a38c-0"),
    f: common_vendor.o($options.onConfirm),
    g: common_vendor.p({
      province: $data.province,
      city: $data.city,
      area: $data.area,
      pickerValueDefault: $data.cityPickerValueDefault
    })
  } : {}, {
    h: $data.isupload
  }, $data.isupload ? {
    i: common_vendor.o($options.getImgsFunc)
  } : {}, {
    j: _ctx.theme(),
    k: common_vendor.n(_ctx.theme() || "")
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/table/table.vue"]]);
wx.createPage(MiniProgramPage);
