"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_utils = require("../../../common/utils.js");
const Spec = () => "./popup/Spec.js";
const Mpservice = () => "../../../components/mpservice/Mpservice.js";
const guarantee = () => "../../../components/guarantee.js";
const _sfc_main = {
  components: {
    /*选择规格*/
    Spec,
    /*客服*/
    Mpservice,
    guarantee
  },
  data() {
    return {
      /*手机高度*/
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      /*是否加载完成*/
      loadding: true,
      /*是否显示面板指示点*/
      indicatorDots: true,
      /*是否自动切换*/
      autoplay: true,
      /*自动切换时间间隔*/
      interval: 2e3,
      /*滑动动画时长*/
      duration: 500,
      /*积分商品id*/
      point_product_id: null,
      /*产品图片展示*/
      imagList: [],
      alreadyChioce: "",
      /*详情*/
      detail: {
        /*商品规格*/
        product_sku: {},
        /*当前规格对象*/
        show_sku: {
          /*商品价格*/
          product_price: "",
          /*商品规格ID*/
          product_sku_id: 0,
          /*划线价*/
          line_price: "",
          /*库存*/
          stock_num: 0,
          /*图片*/
          sku_image: ""
        },
        show_point_sku: {}
      },
      /*是否确定购买弹窗*/
      isPopup: false,
      /*商品属性*/
      specData: null,
      /*子级页面传参*/
      productModel: {},
      /*商品规格*/
      productSku: [],
      /*是否打开客服*/
      isMpservice: false,
      serverList: "",
      //保障
      isguarantee: false,
      shop_info: {},
      store_open: 1
    };
  },
  onReady() {
    common_vendor.index.setNavigationBarTitle({
      title: this.points_name() + "商品"
    });
  },
  onLoad(e) {
    this.point_product_id = e.point_product_id;
  },
  mounted() {
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      let point_product_id = self.point_product_id;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._get(
        "plus.points.product/detail",
        {
          point_product_id
        },
        function(res) {
          res.data.detail.product.content = common_utils.utils.format_content(res.data.detail.product.content);
          if (res.data.detail.product.spec_type == 20) {
            self.initSpecData(res.data.detail.sku, res.data.specData);
          }
          self.store_open = res.data.store_open;
          self.detail = res.data.detail;
          self.shop_info = res.data.detail.supplier;
          self.getServer();
          self.loadding = false;
          common_vendor.index.hideLoading();
        }
      );
    },
    getServer() {
      let self = this;
      let serverList = [];
      if (self.detail.server) {
        self.detail.server.forEach((item, index) => {
          serverList.push(item.name);
        });
        self.serverList = serverList.join("·");
      }
    },
    closeGuarantee() {
      this.isguarantee = false;
    },
    showGuarantee() {
      this.isguarantee = true;
    },
    /*多规格商品*/
    initSpecData(list, data) {
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        if (item.productSku) {
          let arr = item.productSku.spec_sku_id.split("_").map(Number);
          this.productSku.push(arr);
        }
      }
      for (let i in data.spec_attr) {
        for (let j = 0; j < data.spec_attr[i].spec_items.length; j++) {
          let item = data.spec_attr[i].spec_items[j];
          if (this.hasSpec(item.item_id, i)) {
            item.checked = false;
            item.disabled = false;
          } else {
            data.spec_attr[i].spec_items.splice(j, 1);
            j--;
          }
        }
      }
      this.specData = data;
      if (this.specData.spec_attr) {
        this.specData.spec_attr.forEach((item) => {
          this.alreadyChioce += item.group_name;
          this.alreadyChioce += " / ";
        });
        this.alreadyChioce = this.alreadyChioce.replace(/(\s\/\s)$/gi, "");
      }
    },
    /*判断有没有规格*/
    hasSpec(id, _index) {
      let flag = false;
      for (let i = 0; i < this.productSku.length; i++) {
        let arr = this.productSku[i];
        if (arr[_index] == id) {
          flag = true;
          break;
        }
      }
      return flag;
    },
    /*打开窗口*/
    openPopup(e) {
      let obj = {
        specData: this.specData,
        detail: this.detail,
        productSpecArr: this.specData != null ? new Array(this.specData.spec_attr.length) : [],
        show_sku: {
          sku_image: "",
          seckill_price: 0,
          product_sku_id: 0,
          line_price: 0,
          seckill_stock: 0,
          seckill_product_sku_id: 0,
          sum: 1
        },
        productSku: this.productSku,
        type: e
      };
      this.productModel = obj;
      this.isPopup = true;
    },
    /*关闭弹窗*/
    closePopup(e, cart_total_num) {
      this.isPopup = false;
      console.log(e);
      if (e && e.spec_attr) {
        this.alreadyChioce = "";
        let has = "已选：";
        let noone = "";
        e.spec_attr.forEach((item) => {
          if (item.spec_items) {
            let h = "";
            for (let i = 0; i < item.spec_items.length; i++) {
              let child = item.spec_items[i];
              if (child.checked) {
                h = child.spec_value + " / ";
                break;
              }
            }
            if (h != "") {
              has += h;
            } else {
              noone += item.group_name;
            }
          }
        });
        if (noone != "") {
          this.alreadyChioce = noone;
        } else {
          has = has.replace(/(\s\/\s)$/gi, "");
          this.alreadyChioce = has;
        }
      }
      if (cart_total_num) {
        this.cart_total_num = cart_total_num;
      }
    },
    /*打开客服*/
    openMaservice() {
      if (this.getUserId()) {
        if (this.service_type == 10) {
          this.isMpservice = true;
        }
        if (this.service_type == 20) {
          if (this.detail.chat_user_id && this.detail.chat_user_id != 0) {
            this.gotoPage(
              "/pagesPlus/chat/chat?chat_user_id=" + this.detail.chat_user_id + "&product_id=" + this.detail.product_id + "&shop_supplier_id=" + this.shop_info.shop_supplier_id + "&nickName=" + this.shop_info.name
            );
          } else {
            this.isMpservice = true;
          }
        }
      } else {
        this.doLogin();
      }
    },
    /*关闭客服*/
    closeMpservice() {
      this.isMpservice = false;
    },
    //跳转店铺首页
    goto_shop() {
      let self = this;
      self.gotoPage("/pages/shop/shop?shop_supplier_id=" + self.detail.supplier.shop_supplier_id);
    }
  }
};
if (!Array) {
  const _component_spec = common_vendor.resolveComponent("spec");
  const _component_Mpservice = common_vendor.resolveComponent("Mpservice");
  const _component_guarantee = common_vendor.resolveComponent("guarantee");
  (_component_spec + _component_Mpservice + _component_guarantee)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loadding
  }, !$data.loadding ? common_vendor.e({
    b: common_vendor.f($data.detail.product.image, (item, index, i0) => {
      return {
        a: item.file_path,
        b: index
      };
    }),
    c: $data.indicatorDots,
    d: $data.autoplay,
    e: $data.interval,
    f: $data.duration,
    g: common_vendor.t(_ctx.points_name()),
    h: common_vendor.t($data.detail.sku[0].point_num),
    i: $data.detail.sku[0].point_money > 0
  }, $data.detail.sku[0].point_money > 0 ? {
    j: common_vendor.t($data.detail.sku[0].point_money)
  } : {}, {
    k: common_vendor.t($data.detail.product.line_price),
    l: common_vendor.t($data.detail.stock),
    m: common_vendor.t($data.detail.product.product_name),
    n: common_vendor.t($data.detail.product.selling_point),
    o: $data.detail.spec_type == 20
  }, $data.detail.spec_type == 20 ? {
    p: common_vendor.t($data.alreadyChioce),
    q: common_vendor.o(($event) => $options.openPopup("order"))
  } : {}, {
    r: $data.detail.server != ""
  }, $data.detail.server != "" ? {
    s: common_vendor.t($data.serverList),
    t: common_vendor.o((...args) => $options.showGuarantee && $options.showGuarantee(...args))
  } : {}, {
    v: $data.store_open
  }, $data.store_open ? {
    w: $data.shop_info.logos,
    x: common_vendor.t($data.shop_info.name),
    y: common_vendor.t($data.shop_info.category_name),
    z: common_vendor.t($data.shop_info.product_sales),
    A: common_vendor.o(($event) => $options.goto_shop()),
    B: common_vendor.t($data.shop_info.server_score)
  } : {}, {
    C: $data.detail.product.is_picture == 0
  }, $data.detail.product.is_picture == 0 ? {
    D: $data.detail.product.content
  } : {}, {
    E: $data.detail.product.is_picture == 1
  }, $data.detail.product.is_picture == 1 ? {
    F: common_vendor.f($data.detail.product.contentImage, (item, index, i0) => {
      return {
        a: item.file_path,
        b: index
      };
    })
  } : {}, {
    G: common_vendor.o((...args) => $options.openMaservice && $options.openMaservice(...args)),
    H: common_vendor.o(($event) => $options.openPopup("order")),
    I: common_vendor.o($options.closePopup),
    J: common_vendor.p({
      isPopup: $data.isPopup,
      productModel: $data.productModel
    }),
    K: $data.isMpservice
  }, $data.isMpservice ? {
    L: common_vendor.o($options.closeMpservice),
    M: common_vendor.p({
      isMpservice: $data.isMpservice
    })
  } : {}, {
    N: common_vendor.o($options.closeGuarantee),
    O: common_vendor.p({
      isguarantee: $data.isguarantee,
      server: $data.detail.server
    })
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/points/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
