"use strict";
const common_vendor = require("../../../../common/vendor.js");
const Upload = () => "../../../../components/upload/upload2.js";
const _sfc_main = {
  components: {
    Upload
  },
  data() {
    return {
      /*是否加载完成*/
      loadding: true,
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      type: 10,
      /*是否打开上传图片*/
      isUpload: false,
      /*订单商品id*/
      order_product_id: 0,
      /*订单商品*/
      product: {
        image: {
          file_path: ""
        }
      },
      images: [],
      /*小程序订阅消息*/
      temlIds: []
    };
  },
  onLoad(e) {
    this.order_product_id = e.order_product_id;
  },
  mounted() {
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self.loadding = true;
      let order_product_id = self.order_product_id;
      self._get("user.refund/apply", {
        order_product_id,
        platform: self.getPlatform()
      }, function(res) {
        self.loadding = false;
        self.product = res.data.detail;
        self.temlIds = res.data.template_arr;
        if (self.product.orderM.delivery_type.value == 30) {
          self.type = 30;
        }
        common_vendor.index.hideLoading();
      });
    },
    /*切换服务类型*/
    tabType(e) {
      this.type = e;
    },
    /*提交表单*/
    formSubmit: function(e) {
      let self = this;
      var formdata = e.detail.value;
      formdata.type = self.type;
      formdata.order_product_id = self.order_product_id;
      formdata.images = JSON.stringify(self.images);
      let callback = function() {
        common_vendor.index.showLoading({
          title: "正在提交",
          mask: true
        });
        self._post("user.refund/apply", formdata, function(res) {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: res.msg,
            duration: 3e3,
            complete: function() {
              self.gotoPage("/pages/order/refund/index/index");
            }
          });
        });
      };
      self.subMessage(self.temlIds, callback);
    },
    /*打开上传图片*/
    openUpload() {
      this.isUpload = true;
    },
    /*获取上传的图片*/
    getImgsFunc(e) {
      let self = this;
      self.isUpload = false;
      if (e && typeof e != "undefined") {
        let this_length = self.images.length, upload_length = e.length;
        if (this_length + upload_length < 7) {
          self.images = self.images.concat(e);
        } else {
          let leng = 6 - this_length;
          for (let i = 0; i < leng; i++) {
            self.images.push(e[i]);
          }
        }
      }
    },
    /*删除图片*/
    deleteFunc(e) {
      this.images.splice(e, 1);
    }
  }
};
if (!Array) {
  const _component_Upload = common_vendor.resolveComponent("Upload");
  _component_Upload();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loadding
  }, !$data.loadding ? common_vendor.e({
    b: $data.product.image.file_path || "",
    c: common_vendor.t($data.product.product_name),
    d: common_vendor.t($data.product.line_price),
    e: common_vendor.t($data.product.total_num),
    f: $data.product.orderM.delivery_type.value != 30
  }, $data.product.orderM.delivery_type.value != 30 ? {
    g: common_vendor.n($data.type == 10 ? "btn-red-border" : ""),
    h: common_vendor.o(($event) => $options.tabType(10))
  } : {}, {
    i: $data.product.orderM.delivery_type.value != 30
  }, $data.product.orderM.delivery_type.value != 30 ? {
    j: common_vendor.n($data.type == 20 ? "ml20 btn-red-border" : "ml20"),
    k: common_vendor.o(($event) => $options.tabType(20))
  } : {}, {
    l: $data.product.orderM.delivery_type.value != 30
  }, $data.product.orderM.delivery_type.value != 30 ? {
    m: common_vendor.n($data.type == 30 ? "ml20 btn-red-border" : "ml20"),
    n: common_vendor.o(($event) => $options.tabType(30))
  } : {}, {
    o: $data.type == 10 || $data.type == 30
  }, $data.type == 10 || $data.type == 30 ? {
    p: common_vendor.t($data.product.total_pay_price)
  } : {}, {
    q: common_vendor.f($data.images, (imgs, img_num, i0) => {
      return {
        a: imgs.file_path,
        b: img_num,
        c: common_vendor.o(($event) => $options.deleteFunc(imgs), img_num)
      };
    }),
    r: $data.images.length < 6
  }, $data.images.length < 6 ? {
    s: common_vendor.o(($event) => $options.openUpload())
  } : {}, {
    t: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args)),
    v: common_vendor.o((...args) => _ctx.formReset && _ctx.formReset(...args)),
    w: $data.isUpload
  }, $data.isUpload ? {
    x: common_vendor.o($options.getImgsFunc)
  } : {}) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/order/refund/apply/apply.vue"]]);
wx.createPage(MiniProgramPage);
