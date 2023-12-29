"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const Upload = () => "../../../../../components/upload/upload2.js";
const pickerViewDatetime = () => "../../../../../components/picker-view-datetime/pickerViewDatetime.js";
const Products = () => "./dialog/Products.js";
const _sfc_main = {
  components: {
    Upload,
    pickerViewDatetime,
    Products
  },
  data() {
    return {
      /*手机高度*/
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      /*是否登录成功*/
      loading: true,
      /*form表单*/
      form: {
        /*直播间名称*/
        name: "",
        /*背景图*/
        //cover_img_id: null,
        //cover_img_path: '',
        /*直播间分享图*/
        share_img_id: null,
        share_img_path: "",
        /*直播开始时间*/
        start_time: "",
        /*预计结束时间*/
        end_time: "",
        /*商品id*/
        productIds: [],
        category_id: 0
      },
      /*是否打开上传图片*/
      isUpload: false,
      /*文件类别*/
      file_type: null,
      /*当前图片ID*/
      cur_image: null,
      /*是否展示商品*/
      open_products: false,
      /*关联商品*/
      relationList: [],
      categorylist: [],
      category: "",
      categorytype: [],
      index: 0
    };
  },
  computed: {},
  onLoad() {
  },
  mounted() {
    this.init();
  },
  methods: {
    /*初始化*/
    init() {
      let _this = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          _this.phoneHeight = res.windowHeight;
          let view = common_vendor.index.createSelectorQuery().select(".foot-btns");
          view.boundingClientRect((data) => {
            let h = _this.phoneHeight - data.height;
            _this.scrollviewHigh = h;
          }).exec();
        }
      });
    },
    getCategory() {
      let self = this;
      self._post("plus.live.RoomApply/category", {}, function(res) {
        res.data.list.forEach((item, index) => {
          self.categorylist.push(item.name);
        });
        self.categorytype = res.data.list;
      });
    },
    /*展开商品*/
    showProducts() {
      this.open_products = true;
    },
    /*关闭商品*/
    closeProducts(e) {
      this.open_products = false;
      this.relationList = e;
    },
    /*提交*/
    formSubmit: function(e) {
      let self = this;
      if (self.form.name == "") {
        common_vendor.wx$1.showModal({
          title: "提示",
          content: "请输入标题",
          showCancel: false
        });
        return;
      }
      if (/[<>*{}()^%$#@!~&= ]/.test(self.form.name)) {
        common_vendor.wx$1.showModal({
          title: "提示",
          content: "标题不能为空或包含特殊字符",
          showCancel: false
        });
        return;
      }
      if (new Date(self.form.start_time).getTime() >= new Date(self.form.end_time).getTime()) {
        common_vendor.wx$1.showModal({
          title: "提示",
          content: "开始时间不能大于结束时间",
          showCancel: false
        });
        return;
      }
      if (self.form.share_img_id == null) {
        common_vendor.wx$1.showModal({
          title: "提示",
          content: "请上传封面图",
          showCancel: false
        });
        return;
      }
      console.log(this.relationList);
      self.form.productIds = this.relationList;
      self._post("plus.live.RoomApply/addnotice", self.form, function(res) {
        common_vendor.index.showToast({
          title: "创建成功"
        });
        common_vendor.index.navigateBack({
          delta: 1
        });
      });
    },
    /*获取开始时间*/
    getStartTime(e) {
      this.form.start_time = e + ":00";
    },
    /*获取计划结束时间*/
    getStartEnd(e) {
      this.form.end_time = e + ":59";
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
  const _component_pickerViewDatetime = common_vendor.resolveComponent("pickerViewDatetime");
  const _component_Products = common_vendor.resolveComponent("Products");
  const _component_Upload = common_vendor.resolveComponent("Upload");
  (_component_pickerViewDatetime + _component_Products + _component_Upload)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.form.name,
    b: common_vendor.o(($event) => $data.form.name = $event.detail.value),
    c: common_vendor.o($options.getStartTime),
    d: !$data.form.share_img_id
  }, !$data.form.share_img_id ? {
    e: common_vendor.o(($event) => $options.openUpload("share_img_"))
  } : {
    f: $data.form.share_img_path,
    g: common_vendor.o(($event) => $options.openUpload("share_img_"))
  }, {
    h: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    i: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args)),
    j: common_vendor.o($options.closeProducts),
    k: common_vendor.p({
      open: $data.open_products,
      relationList: $data.relationList
    }),
    l: $data.isUpload
  }, $data.isUpload ? {
    m: common_vendor.o($options.getImgsFunc),
    n: common_vendor.p({
      type: $data.file_type
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6559327b"], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my_shop/my_live/add/add.vue"]]);
wx.createPage(MiniProgramPage);
