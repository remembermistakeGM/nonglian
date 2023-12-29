"use strict";
const common_vendor = require("./common/vendor.js");
const Upload = () => "./components/upload/upload2.js";
const _sfc_main = {
  components: {
    /*编辑组件*/
    Upload
  },
  data() {
    return {
      form: {
        image_frontid: 0,
        business_id: 0,
        mobile: "",
        password: ""
      },
      isupload: false,
      type: "frontid",
      image_frontid_path: "",
      business_id_path: "",
      bg_image: "",
      classify_data_name: "",
      //列表名字
      classify_data_id: "",
      //列表id
      classify_data_name_active: "",
      //当前选中的列表名字
      classify_data_id_active: "",
      //当前选中的列表id
      /*当前秒数*/
      second: 60,
      send_btn_txt: "获取验证码",
      /*是否已发验证码*/
      is_send: false,
      sms_open: 0
    };
  },
  created() {
    this.getData();
    this.get_classify();
  },
  methods: {
    /*改变发送验证码按钮文本*/
    changeMsg() {
      if (this.second > 0) {
        this.send_btn_txt = this.second + "秒";
        this.second--;
        setTimeout(this.changeMsg, 1e3);
      } else {
        this.send_btn_txt = "获取验证码";
        this.second = 60;
        this.is_send = false;
      }
    },
    /*获取数据*/
    getData() {
      let self = this;
      self._get("user.index/detail", {}, function(res) {
        self.bg_image = res.data.setting.supplier_image;
      });
    },
    //获取验证码
    getCode(mobile) {
      let self = this;
      self._post("supplier.apply/sendCode", {
        mobile
      }, function(res) {
        self.is_send = true;
        self.changeMsg();
      });
    },
    //获取分类
    get_classify() {
      let self = this;
      self._post("supplier.apply/category", {}, function(res) {
        let list_name = [];
        let list_id = [];
        for (var i = 0; i < res.data.list.length; i++) {
          list_name.push(res.data.list[i].name);
        }
        for (var i2 = 0; i2 < res.data.list.length; i2++) {
          list_id.push(res.data.list[i2].category_id);
        }
        self.classify_data_name = list_name;
        self.classify_data_id = list_id;
        self.sms_open = res.data.sms_open;
      });
    },
    //选择分类
    select() {
      let self = this;
      common_vendor.index.showActionSheet({
        itemList: self.classify_data_name,
        success: function(res) {
          self.classify_data_name_active = self.classify_data_name[res.tapIndex];
          self.classify_data_id_active = self.classify_data_id[res.tapIndex];
        },
        fail: function(res) {
        }
      });
    },
    /*提交*/
    formSubmit: function(e) {
      let self = this;
      var formdata = e.detail.value;
      formdata.business_id = self.form.business_id;
      console.log(formdata);
      console.log(self.form);
      formdata.category_id = self.classify_data_id_active;
      if (self.classify_data_name_active == "") {
        common_vendor.index.showToast({
          title: "请填主营类别",
          duration: 1e3,
          icon: "none"
        });
        return false;
      }
      if (formdata.store_name == "") {
        common_vendor.index.showToast({
          title: "请输入店铺名称",
          duration: 1e3,
          icon: "none"
        });
        return false;
      }
      if (formdata.business_id == 0) {
        common_vendor.index.showToast({
          title: "请上传营业执照",
          duration: 1e3,
          icon: "none"
        });
        return false;
      }
      if (formdata.user_name == "") {
        common_vendor.index.showToast({
          title: "请输入真实姓名",
          duration: 1e3,
          icon: "none"
        });
        return false;
      }
      if (formdata.mobile == "") {
        common_vendor.index.showToast({
          title: "请输入手机号码",
          duration: 1e3,
          icon: "none"
        });
        return false;
      }
      if (formdata.code == "" && self.sms_open == 1) {
        common_vendor.index.showToast({
          title: "请填写验证码",
          duration: 1e3,
          icon: "none"
        });
        return false;
      }
      if (formdata.password == "") {
        common_vendor.index.showToast({
          title: "请填写登录密码",
          duration: 1e3,
          icon: "none"
        });
        return false;
      }
      let reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
      if (!reg.test(formdata.mobile)) {
        common_vendor.index.showToast({
          title: "手机号码格式不正确",
          duration: 1e3,
          icon: "none"
        });
        return false;
      }
      common_vendor.index.showLoading({
        title: "正在提交",
        mask: true
      });
      self._post("supplier.apply/index", formdata, function(res) {
        self.showSuccess(res.msg, function() {
          self.gotoPage("/pages/shop/application_status");
        }, null, function() {
          common_vendor.index.hideLoading();
        });
      });
    },
    /*上传*/
    openUpload(e) {
      this.type = e;
      this.isupload = true;
    },
    /*获取图片*/
    getImgsFunc(e) {
      console.log(e);
      if (e != null && e.length > 0) {
        if (this.type == "frontid") {
          console.log(e[0].file_id);
          this.image_frontid_path = e[0].file_path;
          this.form.image_frontid = e[0].file_id;
        } else if (this.type == "license") {
          console.log(e[0].file_id);
          this.business_id_path = e[0].file_path;
          this.form.business_id = e[0].file_id;
        }
      }
      this.isupload = false;
    },
    /* 下拉框 */
    changeSelect(e) {
      this.classify_data_id_active = this.classify_data_id[e.detail.value];
      this.classify_data_name_active = this.classify_data_name[e.detail.value];
    }
  }
};
if (!Array) {
  const _component_Upload = common_vendor.resolveComponent("Upload");
  _component_Upload();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.bg_image,
    b: $data.form.store_name,
    c: common_vendor.o(($event) => $data.form.store_name = $event.detail.value),
    d: $data.form.user_name,
    e: common_vendor.o(($event) => $data.form.user_name = $event.detail.value),
    f: $data.form.mobile,
    g: common_vendor.o(($event) => $data.form.mobile = $event.detail.value),
    h: $data.sms_open == 1
  }, $data.sms_open == 1 ? {
    i: common_vendor.t($data.send_btn_txt),
    j: $data.is_send,
    k: common_vendor.o(($event) => $options.getCode($data.form.mobile))
  } : {}, {
    l: $data.form.password,
    m: common_vendor.o(($event) => $data.form.password = $event.detail.value),
    n: $data.sms_open == 1
  }, $data.sms_open == 1 ? {
    o: $data.form.code,
    p: common_vendor.o(($event) => $data.form.code = $event.detail.value)
  } : {}, {
    q: $data.classify_data_name_active
  }, $data.classify_data_name_active ? {
    r: common_vendor.t($data.classify_data_name_active)
  } : {}, {
    s: common_vendor.o(($event) => $options.changeSelect($event)),
    t: $data.classify_data_name,
    v: $data.business_id_path != ""
  }, $data.business_id_path != "" ? {
    w: $data.business_id_path
  } : {}, {
    x: $data.business_id_path == ""
  }, $data.business_id_path == "" ? {} : {}, {
    y: $data.form.business_id,
    z: common_vendor.o(($event) => $data.form.business_id = $event.detail.value),
    A: common_vendor.o(($event) => $options.openUpload("license")),
    B: $data.isupload
  }, $data.isupload ? {
    C: common_vendor.o($options.getImgsFunc),
    D: common_vendor.p({
      isupload: $data.isupload,
      type: $data.type
    })
  } : {}, {
    E: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args)),
    F: common_vendor.o((...args) => _ctx.formReset && _ctx.formReset(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/shop/register.vue"]]);
exports.MiniProgramPage = MiniProgramPage;
