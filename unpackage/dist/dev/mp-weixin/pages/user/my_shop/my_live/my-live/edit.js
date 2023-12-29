"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const Countdown = () => "../../../../../components/countdown/countdown.js";
const Upload = () => "../../../../../components/upload/upload2.js";
const pickerViewDatetime = () => "../../../../../components/picker-view-datetime/pickerViewDatetime.js";
const Products = () => "./dialog/Products.js";
const _sfc_main = {
  components: {
    Upload,
    pickerViewDatetime,
    Products,
    Countdown
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
        data: []
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
      /*倒计时配置*/
      countdownConfig: {
        /*开始时间*/
        startstamp: 0,
        /*结束时间*/
        endstamp: 0,
        /*标题*/
        title: "距开播还剩",
        /*类别*/
        type: "text"
      },
      tapTime: "",
      /*判断是否主播*/
      is_user: false,
      shop_supplier_id: ""
    };
  },
  onLoad(e) {
    this.form.room_id = e.room_id;
    this.shop_supplier_id = e.shop_supplier_id;
    this.getDetail();
  },
  mounted() {
    this.init();
  },
  methods: {
    /*获取详情*/
    getDetail() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self.data_type;
      self._get(
        "live.RoomApply/liveproduct",
        {
          shop_supplier_id: self.shop_supplier_id
        },
        function(res) {
          common_vendor.index.hideLoading();
          self.form = res.data.list;
          self.form.data.forEach((item) => {
            self.relationList.push(item.product_id);
          });
        }
      );
    },
    getProduct() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._get(
        "live.RoomApply/liveproduct",
        {},
        function(res) {
          common_vendor.index.hideLoading();
        }
      );
    },
    /*初始化*/
    init() {
      let _this = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          _this.scrollviewHigh = res.windowHeight;
        }
      });
    },
    /*展开商品*/
    showProducts() {
      this.open_products = true;
    },
    /*关闭商品*/
    closeProducts(e) {
      let self = this;
      self.open_products = false;
      if (e == null) {
        return;
      }
      for (let i = 0; i < e.length; i++) {
        if (self.relationList.indexOf(e[i]) != -1) {
          e.splice(i, 1);
          i--;
        }
      }
      if (e.length > 0) {
        self._post(
          "live.RoomApply/addProduct",
          {
            productIds: e
          },
          function(res) {
            common_vendor.index.showToast({
              title: "绑定商品成功了",
              duration: 2e3,
              icon: "success"
            });
            self.getDetail();
          }
        );
      }
    },
    /*跳转商品详情*/
    gotoProduct(e) {
      let url = "pages/product/detail/detail?product_id=" + e.product_id;
      this.gotoPage(url);
    },
    /*移除*/
    deleteFunc(item) {
      let self = this;
      common_vendor.index.showModal({
        title: "提示",
        content: "您确定要移除吗?",
        success: function(o) {
          if (o.confirm) {
            common_vendor.index.showLoading({
              title: "正在处理"
            });
            self._post(
              "live.RoomApply/delProduct",
              {
                room_id: item.room_id,
                product_id: item.product.product_id
              },
              function(res) {
                common_vendor.index.hideLoading();
                common_vendor.index.showToast({
                  title: res.msg,
                  duration: 2e3,
                  icon: "success"
                });
                self.getDetail();
              }
            );
          } else {
            common_vendor.index.showToast({
              title: "取消移除",
              duration: 1e3,
              icon: "none"
            });
          }
        }
      });
    },
    /*创建并进入直播间*/
    nowLive: function() {
      var self = this;
      var nowTime = /* @__PURE__ */ new Date();
      if (nowTime - this.tapTime < 1e3) {
        return;
      }
      if (!self.form.name) {
        self.form.name = "新建直播间";
      }
      if (/[<>*{}()^%$#@!~&= ]/.test(self.form.name)) {
        common_vendor.index.showModal({
          title: "提示",
          content: "名称不能为空或包含特殊字符",
          showCancel: false
        });
        return;
      }
      var url = "/pages/pagesLive/live/live?roomName=" + self.form.name + "&room_id=" + self.form.room_id;
      if (self.is_user) {
        url = "/pages/pagesLive/live/live?type=create&roomName=" + self.form.name + "&room_id=" + self.form.room_id;
      }
      self.gotoPage(url);
      self.tapTime = nowTime;
    }
  }
};
if (!Array) {
  const _component_Products = common_vendor.resolveComponent("Products");
  const _component_Upload = common_vendor.resolveComponent("Upload");
  (_component_Products + _component_Upload)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.showProducts && $options.showProducts(...args)),
    b: common_vendor.f($data.form.data, (item, index, i0) => {
      return {
        a: item.product.image[0].file_path,
        b: common_vendor.t(item.product.product_name),
        c: common_vendor.t(item.product.product_price),
        d: common_vendor.o(($event) => $options.deleteFunc(item), index),
        e: index,
        f: common_vendor.o(($event) => $options.gotoProduct(item), index)
      };
    }),
    c: common_vendor.o((...args) => $options.nowLive && $options.nowLive(...args)),
    d: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    e: common_vendor.o($options.closeProducts),
    f: common_vendor.p({
      open: $data.open_products,
      relationList: $data.relationList
    }),
    g: $data.isUpload
  }, $data.isUpload ? {
    h: common_vendor.o(_ctx.getImgsFunc),
    i: common_vendor.p({
      type: $data.file_type
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f4f799f6"], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my_shop/my_live/my-live/edit.vue"]]);
wx.createPage(MiniProgramPage);
