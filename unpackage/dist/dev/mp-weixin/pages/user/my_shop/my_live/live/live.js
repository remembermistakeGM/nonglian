"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const Upload = () => "../../../../../components/upload/upload2.js";
const _sfc_main = {
  components: {
    Upload
  },
  data() {
    return {
      /*form表单*/
      form: {
        /*直播间名称*/
        name: "",
        /*背景图*/
        //cover_img_id: null,
        //cover_img_path: '',
        /*直播间分享图*/
        share_img_id: null,
        share_img_path: ""
      },
      /*是否打开上传图片*/
      isUpload: false,
      /*文件类别*/
      file_type: null,
      /*当前图片ID*/
      cur_image: null,
      categorylist: [],
      category: "",
      categorytype: [],
      index: 0
    };
  },
  mounted() {
  },
  methods: {
    getCategory() {
      let self = this;
      self._post("plus.live.RoomApply/category", {}, function(res) {
        res.data.list.forEach((item, index) => {
          self.categorylist.push(item.name);
        });
        self.categorytype = res.data.list;
      });
    },
    /*输入框*/
    bindTextAreaBlur(e) {
      this.form.name = e;
    },
    /*提交*/
    formSubmit: function(e) {
      let self = this;
      if (self.form.name == "") {
        common_vendor.wx$1.showModal({
          title: "提示",
          content: "请输入直播间名称",
          showCancel: false
        });
        return;
      }
      if (/[<>*{}()^%$#@!~&= ]/.test(self.form.name)) {
        common_vendor.wx$1.showModal({
          title: "提示",
          content: "名称不能为空或包含特殊字符",
          showCancel: false
        });
        return;
      }
      if (self.form.share_img_id == null) {
        common_vendor.wx$1.showModal({
          title: "提示",
          content: "请上传直播间分享图",
          showCancel: false
        });
        return;
      }
      self._post("plus.live.RoomApply/addlive", self.form, function(res) {
        common_vendor.index.showToast({
          title: "创建成功"
        });
        var url = "/pagesLive/live/live?type=create&room_id=" + res.data.room_id;
        self.gotoPage(url);
      });
    },
    /*打开上传图片*/
    openUpload(id_name) {
      this.cur_imagetype = id_name;
      this.file_type = "image";
      this.isUpload = true;
    },
    /*获取上传的图片*/
    getImgsFunc(e) {
      if (e && typeof e != "undefined" && this.cur_imagetype != null) {
        this.form[this.cur_imagetype + "id"] = e[0]["file_id"];
        this.form[this.cur_imagetype + "path"] = e[0]["file_path"];
        this.cur_imagetype = null;
      }
      this.isUpload = false;
    },
    bindPickerChange(e) {
      this.index = e.target.value;
      this.category = this.categorylist[this.index];
      this.form.category_id = this.categorytype[this.index].category_id;
    }
  }
};
if (!Array) {
  const _component_Upload = common_vendor.resolveComponent("Upload");
  _component_Upload();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.form.share_img_id
  }, !$data.form.share_img_id ? {} : {
    b: $data.form.share_img_path
  }, {
    c: common_vendor.o(($event) => $options.openUpload("share_img_")),
    d: $data.form.name,
    e: common_vendor.o(($event) => $data.form.name = $event.detail.value),
    f: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args)),
    g: $data.isUpload
  }, $data.isUpload ? {
    h: common_vendor.o($options.getImgsFunc),
    i: common_vendor.p({
      type: $data.file_type
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-676d4a9d"], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my_shop/my_live/live/live.vue"]]);
wx.createPage(MiniProgramPage);
