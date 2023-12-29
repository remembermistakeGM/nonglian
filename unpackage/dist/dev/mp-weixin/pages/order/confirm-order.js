"use strict";
const common_vendor = require("../../common/vendor.js");
const Myinfo = () => "./confirm-order/my-info.js";
const Coupon = () => "./confirm-order/coupon.js";
const Dist = () => "./confirm-order/distr.js";
const _sfc_main = {
  components: {
    Myinfo,
    Coupon,
    Dist
  },
  data() {
    return {
      /*是否加载完成*/
      loading: true,
      options: {},
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      /*商品id*/
      product_id: "",
      /*商品数量*/
      product_num: "",
      /*商品数据*/
      ProductData: [],
      /*订单数据数据*/
      OrderData: [],
      // 是否存在收货地址
      exist_address: false,
      /*默认地址*/
      Address: {
        region: []
      },
      extract_store: [],
      last_extract: {},
      product_sku_id: 0,
      /*配送方式*/
      delivery: 10,
      /*自提店id*/
      store_id: 0,
      /*优惠券id*/
      coupon_id: -1,
      /*是否使用积分,默认使用*/
      is_use_points: 1,
      remark: "",
      /*支付方式*/
      pay_type: 20,
      /*是否显示优惠券*/
      isCoupon: false,
      /*优惠券列表*/
      coupon_list: {},
      couponList: [],
      /*优惠券数量*/
      coupon_num: 0,
      /* 是否显示配送方式 */
      isDist: false,
      /*消息模板*/
      temlIds: [],
      /* 选择的地址 */
      // chooseAd:''
      product_couponid: 0,
      chooseSotr: 0,
      /* 支持的配送方式 */
      deliverySetting: [],
      choose_delivery: 10,
      store_data: {},
      // 当前店铺选择的门店
      choose_store_id: 0,
      store_list: {},
      room_id: "",
      /*是否显示支付宝支付，只有在h5，非微信内打开才显示*/
      showAlipay: false,
      balance: "",
      store_open: 1
    };
  },
  onLoad(options) {
    let self = this;
    options.room_id = !options.room_id ? 0 : options.room_id == "undefined" ? 0 : options.room_id;
    self.options = options;
    self.room_id = options.room_id;
    console.log(self.options, "options");
    self.$fire.on("selectStoreId", function(e) {
      self.extract_store = e;
      self.choose_store_id = e.store_id;
    });
    self.$fire.on("checkedfir", function(n) {
      self.choose_delivery = n;
    });
  },
  onShow() {
    this.getData();
  },
  mounted() {
  },
  methods: {
    init() {
      let key = "";
      let value = "";
      let self = this;
      self.ProductData.forEach((item, index) => {
        key = item.shop_supplier_id;
        value = {
          coupon_id: item.orderData.coupon_id,
          delivery: item.orderData.delivery,
          store_id: 0,
          remark: ""
        };
        self.store_data = {
          ...self.store_data,
          [key]: value
        };
      });
    },
    /**/
    hasType(e) {
      if (this.deliverySetting.indexOf(e) != -1) {
        return true;
      } else {
        return false;
      }
    },
    /*支付方式选择*/
    payTypeFunc(e) {
      this.pay_type = e;
    },
    /*是否使用积分选择*/
    onShowPoints: function(e) {
      let self = this;
      if (e.target.value == true) {
        self.is_use_points = 1;
      } else {
        self.is_use_points = 0;
      }
      self.getData();
    },
    /*选择优惠卷*/
    onTogglePopupCoupon(e, id) {
      let self = this;
      if (id != 0) {
        self.chooseSotr = id.shop_supplier_id;
      } else {
        self.chooseSotr = 0;
      }
      self.isCoupon = true;
      self.couponList = e;
    },
    /*关闭优惠券*/
    closeCouponFunc(e) {
      let self = this;
      if (e && typeof e != "number") {
        self.isCoupon = false;
        return;
      }
      if (self.chooseSotr != 0) {
        let storid = self.chooseSotr;
        if (e > 0) {
          self.store_data[storid].coupon_id = e;
        } else {
          self.store_data[storid].coupon_id = 0;
        }
        self.chooseSotr = 0;
      } else {
        if (e > 0) {
          self.coupon_id = e;
        } else {
          self.coupon_id = 0;
        }
      }
      self.isCoupon = false;
      self.getData();
    },
    /*获取数据*/
    getData() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      let callback = function(res) {
        self.OrderData = res.data.orderInfo.orderData;
        self.temlIds = res.data.template_arr;
        self.ProductData = res.data.orderInfo.supplierList;
        self.exist_address = self.OrderData.exist_address;
        self.Address = self.OrderData.address;
        self.last_extract = self.OrderData.last_extract;
        if (self.options.order_type != "deposit") {
          self.coupon_list = self.OrderData.coupon_list;
          self.coupon_id = self.OrderData.coupon_id_sys;
          self.coupon_num = Object.keys(self.coupon_list).length;
        }
        self.balance = res.data.balance;
        self.store_open = res.data.store_open;
        if (self.OrderData.order_pay_price == 0) {
          self.pay_type = 10;
        }
        if (JSON.stringify(self.store_data) == "{}") {
          self.init();
        }
        if (res.data.show_alipay) {
          self.showAlipay = true;
        }
        self.loading = false;
      };
      let params = {
        delivery: self.delivery,
        store_id: self.store_id,
        coupon_id: self.coupon_id,
        is_use_points: self.is_use_points,
        pay_source: self.getPlatform()
        // pay_source: 'android'
      };
      if (JSON.stringify(self.store_data) == "{}") {
        params = params;
      } else {
        params = {
          ...params,
          supplier: self.store_data
        };
      }
      if (self.options.order_type === "buy") {
        self._get(
          "order.order/buy",
          {
            params: JSON.stringify(
              Object.assign({}, params, {
                product_id: self.options.product_id,
                product_num: self.options.product_num,
                product_sku_id: self.options.product_sku_id
              })
            )
          },
          function(res) {
            callback(res);
          },
          (err) => {
            common_vendor.index.navigateBack();
          }
        );
      } else if (self.options.order_type === "deposit") {
        let test = Object.assign({}, params, {
          product_id: self.options.product_id,
          product_num: self.options.product_num,
          product_sku_id: self.options.product_sku_id,
          advance_product_sku_id: self.options.advance_product_sku_id,
          advance_product_id: self.options.advance_product_id
        });
        console.log(test);
        self._get(
          "plus.advance.Order/frontBuy",
          {
            params: JSON.stringify(
              Object.assign({}, params, {
                product_id: self.options.product_id,
                product_num: self.options.product_num,
                product_sku_id: self.options.product_sku_id,
                advance_product_sku_id: self.options.advance_product_sku_id,
                advance_product_id: self.options.advance_product_id
              })
            )
          },
          function(res) {
            callback(res);
          },
          (err) => {
            common_vendor.index.navigateBack();
          }
        );
      } else if (self.options.order_type === "retainage") {
        self._get(
          "plus.advance.Order/buy",
          {
            params: JSON.stringify(
              Object.assign({}, params, {
                order_id: self.options.order_id
              })
            )
          },
          function(res) {
            callback(res);
          },
          (err) => {
            common_vendor.index.navigateBack();
          }
        );
      } else if (self.options.order_type === "cart") {
        self._get(
          "order.order/cart",
          {
            params: JSON.stringify(
              Object.assign({}, params, {
                cart_ids: self.options.cart_ids || 0
              })
            )
          },
          function(res) {
            callback(res);
          },
          (err) => {
            common_vendor.index.navigateBack();
          }
        );
      } else if (self.options.order_type == "points") {
        console.log(self.options);
        self._get(
          "plus.points.order/buy",
          {
            params: JSON.stringify(
              Object.assign({}, params, {
                point_product_id: self.options.point_product_id,
                product_sku_id: self.options.product_sku_id,
                point_product_sku_id: self.options.point_product_sku_id,
                product_num: self.options.product_num
              })
            )
          },
          function(res) {
            callback(res);
          },
          (err) => {
            common_vendor.index.navigateBack();
          }
        );
      } else if (self.options.order_type === "seckill") {
        params.num = self.options.num;
        self._get(
          "plus.seckill.order/buy",
          {
            params: JSON.stringify(
              Object.assign({}, params, {
                seckill_product_id: self.options.seckill_product_id,
                product_sku_id: self.options.product_sku_id,
                seckill_product_sku_id: self.options.seckill_product_sku_id,
                product_num: self.options.product_num
              })
            )
          },
          function(res) {
            callback(res);
          },
          (err) => {
            common_vendor.index.navigateBack();
          }
        );
      } else if (self.options.order_type === "bargain") {
        self._get(
          "plus.bargain.order/buy",
          {
            params: JSON.stringify(
              Object.assign({}, params, {
                bargain_product_id: self.options.bargain_product_id,
                product_sku_id: self.options.product_sku_id,
                bargain_product_sku_id: self.options.bargain_product_sku_id,
                bargain_task_id: self.options.bargain_task_id
              })
            )
          },
          function(res) {
            callback(res);
          },
          (err) => {
            common_vendor.index.navigateBack();
          }
        );
      } else if (self.options.order_type === "assemble") {
        self._get(
          "plus.assemble.order/buy",
          {
            params: JSON.stringify(
              Object.assign({}, params, {
                assemble_product_id: self.options.assemble_product_id,
                product_sku_id: self.options.product_sku_id,
                assemble_product_sku_id: self.options.assemble_product_sku_id,
                product_num: self.options.product_num,
                assemble_bill_id: self.options.assemble_bill_id
              })
            )
          },
          function(res) {
            callback(res);
          },
          (err) => {
            common_vendor.index.navigateBack();
          }
        );
      }
    },
    toDecimal2(x) {
      var f = parseFloat(x);
      if (isNaN(f)) {
        return "0.00";
      }
      var f = Math.round(x * 100);
      var n = Math.round(x * 1e3);
      var r = n.toString().split("");
      r = r[r.length - 1];
      if (r >= 5) {
        f = (f - 1) / 100;
      } else {
        f = f / 100;
      }
      var s = f.toString();
      var rs = s.indexOf(".");
      if (rs < 0) {
        rs = s.length;
        s += ".";
      }
      while (s.length <= rs + 2) {
        s += "0";
      }
      return s;
    },
    /* 配送选择 */
    DistUp(item) {
      if (item.orderData.delivery == 30) {
        return;
      }
      let self = this;
      self.store_id = item.shop_supplier_id;
      self.chooseSotr = item.shop_supplier_id;
      self.choose_delivery = item.orderData.delivery;
      self.chooseSotr;
      self.getData();
      self.deliverySetting = item.orderData.deliverySetting;
      self.extract_store = item.orderData.extract_store;
      this.isDist = true;
    },
    /* 关闭配送选择 */
    closeDistFunc(e) {
      let self = this;
      self.choose_delivery = e;
      self.isDist = false;
      let storname = "";
      if (self.extract_store.region) {
        storname = self.extract_store.region.province + self.extract_store.region.city + self.extract_store.region.region + self.extract_store.store_name;
      }
      let storid = self.chooseSotr;
      let choose_store_id = self.choose_store_id;
      self.delivery = self.choose_delivery;
      self.store_id = storid;
      self.store_data[storid].store_id = choose_store_id;
      self.store_data[storid].delivery = self.choose_delivery;
      self.store_list[storid] = storname;
      self.chooseSotr = 0;
      self.getData();
    },
    objKeys(obj, n) {
      if (obj) {
        if (n == 1) {
          return Object.keys(obj).length;
        } else {
          return Object.keys(obj);
        }
      }
    },
    /*提交订单*/
    SubmitOrder() {
      console.log("订阅消息");
      let self = this;
      if (self.exist_address) {
        common_vendor.index.showLoading({
          title: "加载中",
          mask: true
        });
        let params = {
          pay_type: self.pay_type,
          room_id: self.room_id,
          coupon_id: self.coupon_id,
          is_use_points: self.is_use_points
          // pay_source: self.getPlatform()
        };
        params = Object.assign(params, {
          supplier: self.store_data
        });
        let url = "";
        if (self.options.order_type === "buy") {
          url = "order.order/buy";
          params = Object.assign(params, {
            product_id: self.options.product_id,
            product_num: self.options.product_num,
            product_sku_id: self.options.product_sku_id,
            room_id: self.options.room_id || 0
          });
          params = JSON.stringify(params);
        }
        if (self.options.order_type === "deposit") {
          url = "plus.advance.Order/frontBuy";
          params = Object.assign(params, {
            product_id: self.options.product_id,
            product_num: self.options.product_num,
            product_sku_id: self.options.product_sku_id,
            advance_product_sku_id: self.options.advance_product_sku_id,
            advance_product_id: self.options.advance_product_id
          });
          params = JSON.stringify(params);
        }
        if (self.options.order_type === "retainage") {
          url = "plus.advance.Order/buy";
          params = Object.assign(params, {
            order_id: self.options.order_id
          });
          params = JSON.stringify(params);
        }
        if (self.options.order_type === "cart") {
          url = "order.order/cart";
          params = Object.assign(params, {
            cart_ids: self.options.cart_ids || 0,
            // video_id: self.options.video_id || 0,
            room_id: self.options.room_id || 0
          });
          params = JSON.stringify(params);
        }
        if (self.options.order_type === "points") {
          url = "plus.points.order/buy";
          params = Object.assign(params, {
            point_product_id: self.options.point_product_id,
            product_sku_id: self.options.product_sku_id,
            point_product_sku_id: self.options.point_product_sku_id,
            product_num: self.options.product_num
          });
          params = JSON.stringify(params);
        }
        if (self.options.order_type === "seckill") {
          url = "plus.seckill.order/buy";
          params.num = self.options.num;
          params = Object.assign(params, {
            seckill_product_id: self.options.seckill_product_id,
            product_sku_id: self.options.product_sku_id,
            seckill_product_sku_id: self.options.seckill_product_sku_id,
            product_num: self.options.product_num
          });
          params = JSON.stringify(params);
        }
        if (self.options.order_type === "bargain") {
          url = "plus.bargain.order/buy";
          params = Object.assign(params, {
            bargain_product_id: self.options.bargain_product_id,
            product_sku_id: self.options.product_sku_id,
            bargain_product_sku_id: self.options.bargain_product_sku_id,
            bargain_task_id: self.options.bargain_task_id
          });
          params = JSON.stringify(params);
        }
        if (self.options.order_type === "assemble") {
          url = "plus.assemble.order/buy";
          params = Object.assign(params, {
            assemble_product_id: self.options.assemble_product_id,
            product_sku_id: self.options.product_sku_id,
            assemble_product_sku_id: self.options.assemble_product_sku_id,
            assemble_bill_id: self.options.assemble_bill_id,
            product_num: self.options.product_num
          });
          params = JSON.stringify(params);
        }
        let callback = function() {
          self._post(url, {
            params
          }, function(res) {
            let ids = "";
            let pages = "";
            if (self.options.order_type == "deposit") {
              pages = "/pages/order/cashier?order_type=50&order_id=" + res.data.order_id;
            } else if (self.options.order_type == "retainage") {
              ids = res.data.order_id;
              pages = "/pages/order/cashier?order_type=10&order_id=" + ids;
            } else {
              ids = encodeURIComponent(res.data.order_id.join(","));
              pages = "/pages/order/cashier?order_type=10&order_id=" + ids;
            }
            console.log(pages);
            self.gotoPage(pages, "reLaunch");
          });
        };
        self.subMessage(self.temlIds, callback);
      } else {
        common_vendor.index.showToast({
          title: "请选择配送地址"
        });
      }
    }
  }
};
if (!Array) {
  const _component_Myinfo = common_vendor.resolveComponent("Myinfo");
  const _component_Coupon = common_vendor.resolveComponent("Coupon");
  const _component_Dist = common_vendor.resolveComponent("Dist");
  (_component_Myinfo + _component_Coupon + _component_Dist)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loading
  }, !$data.loading ? common_vendor.e({
    b: common_vendor.p({
      dis: $data.options.order_type == "retainage",
      Address: $data.Address,
      exist_address: $data.exist_address
    }),
    c: common_vendor.f($data.ProductData, (supplier_item, supplier_index, i0) => {
      return common_vendor.e($data.store_open ? {
        a: common_vendor.t(supplier_item.supplier.name)
      } : {}, {
        b: common_vendor.f(supplier_item.productList, (item, index, i1) => {
          return common_vendor.e({
            a: item.product_image,
            b: common_vendor.t(item.product_name),
            c: common_vendor.t(item.product_price)
          }, $data.options.order_type == "deposit" ? {
            d: common_vendor.t(item.advance_sku.product_attr)
          } : $data.options.order_type == "retainage" ? {
            e: common_vendor.t(item.product_attr)
          } : {
            f: common_vendor.t(item.product_sku.product_attr)
          }, {
            g: common_vendor.t(item.total_num),
            h: item.is_user_grade == true
          }, item.is_user_grade == true ? {
            i: common_vendor.t(item.grade_product_price)
          } : {}, {
            j: item.product_reduce_money > 0
          }, item.product_reduce_money > 0 ? {
            k: common_vendor.t(item.product_reduce_money)
          } : {}, {
            l: index
          });
        }),
        c: supplier_item.orderData.delivery == 10
      }, supplier_item.orderData.delivery == 10 ? {} : {}, {
        d: supplier_item.orderData.delivery == 20
      }, supplier_item.orderData.delivery == 20 ? {
        e: common_vendor.t($data.store_list[supplier_item.shop_supplier_id])
      } : {}, {
        f: supplier_item.orderData.delivery == 30
      }, supplier_item.orderData.delivery == 30 ? {} : {}, {
        g: supplier_item.orderData.delivery != 30
      }, supplier_item.orderData.delivery != 30 ? common_vendor.e({
        h: supplier_item.orderData.delivery == 10
      }, supplier_item.orderData.delivery == 10 ? {
        i: common_vendor.t(supplier_item.orderData.express_price != 0 ? "￥ " + supplier_item.orderData.express_price : "快递 免费")
      } : {}) : {}, {
        j: common_vendor.o(($event) => $options.DistUp(supplier_item), supplier_index)
      }, $data.options.order_type == "deposit" ? {
        k: common_vendor.t($data.OrderData.order_total_front_price),
        l: common_vendor.t($data.OrderData.order_total_pay_price),
        m: common_vendor.t($data.OrderData.reduce_money),
        n: common_vendor.t(supplier_item.productList[0].advance.active_time[0]),
        o: common_vendor.t(supplier_item.productList[0].advance.active_time[1])
      } : common_vendor.e({
        p: !$data.OrderData.force_points
      }, !$data.OrderData.force_points ? common_vendor.e({
        q: $options.objKeys(supplier_item.orderData.couponList, 1) > 0
      }, $options.objKeys(supplier_item.orderData.couponList, 1) > 0 ? common_vendor.e({
        r: supplier_item.orderData.coupon_money > 0
      }, supplier_item.orderData.coupon_money > 0 ? {
        s: common_vendor.t(supplier_item.orderData.coupon_money),
        t: common_vendor.o(($event) => $options.onTogglePopupCoupon(supplier_item.orderData.couponList, supplier_item), supplier_index)
      } : {
        v: common_vendor.t($options.objKeys(supplier_item.orderData.couponList, 1)),
        w: common_vendor.o(($event) => $options.onTogglePopupCoupon(supplier_item.orderData.couponList, supplier_item), supplier_index)
      }) : {}) : {}, {
        x: supplier_item.orderData.reduce
      }, supplier_item.orderData.reduce ? {
        y: common_vendor.t(supplier_item.orderData.reduce.active_name),
        z: common_vendor.t(supplier_item.orderData.reduce.reduced_price)
      } : {}, {
        A: supplier_item.orderData.reduce_money
      }, supplier_item.orderData.reduce_money ? {
        B: common_vendor.t(supplier_item.orderData.reduce_money)
      } : {}, {
        C: $data.is_use_points == 1 && !$data.OrderData.force_points && supplier_item.orderData.points_money > 0
      }, $data.is_use_points == 1 && !$data.OrderData.force_points && supplier_item.orderData.points_money > 0 ? {
        D: common_vendor.t(_ctx.points_name()),
        E: common_vendor.t(supplier_item.orderData.points_money)
      } : {}, {
        F: $data.store_data[supplier_item.shop_supplier_id].remark,
        G: common_vendor.o(($event) => $data.store_data[supplier_item.shop_supplier_id].remark = $event.detail.value, supplier_index),
        H: common_vendor.t(supplier_item.productList.length),
        I: common_vendor.t(supplier_item.orderData.order_total_price),
        J: !$data.OrderData.force_points
      }, !$data.OrderData.force_points ? {
        K: common_vendor.t($options.toDecimal2(supplier_item.orderData.order_pay_price))
      } : {}), {
        L: supplier_index
      });
    }),
    d: $data.store_open,
    e: $data.options.order_type == "deposit",
    f: $data.options.order_type == "retainage",
    g: $data.options.order_type == "deposit",
    h: $data.options.order_type != "deposit"
  }, $data.options.order_type != "deposit" ? common_vendor.e({
    i: common_vendor.t($data.OrderData.order_total_price),
    j: $data.OrderData.is_coupon
  }, $data.OrderData.is_coupon ? common_vendor.e({
    k: $data.coupon_num > 0
  }, $data.coupon_num > 0 ? common_vendor.e({
    l: $data.OrderData.coupon_money_sys > 0
  }, $data.OrderData.coupon_money_sys > 0 ? {
    m: common_vendor.t($data.OrderData.coupon_money_sys),
    n: common_vendor.o(($event) => $options.onTogglePopupCoupon($data.coupon_list, 0))
  } : {
    o: common_vendor.t($data.coupon_num),
    p: common_vendor.o(($event) => $options.onTogglePopupCoupon($data.coupon_list, 0))
  }) : {}) : {}, {
    q: $data.OrderData.product_reduce_money > 0
  }, $data.OrderData.product_reduce_money > 0 ? {
    r: common_vendor.t($data.OrderData.product_reduce_money)
  } : {}, {
    s: $data.OrderData.reduce_money
  }, $data.OrderData.reduce_money ? {
    t: common_vendor.t($data.OrderData.reduce_money)
  } : {}, {
    v: $data.OrderData.is_allow_points && $data.OrderData.force_points == false && $data.OrderData.points_money != 0
  }, $data.OrderData.is_allow_points && $data.OrderData.force_points == false && $data.OrderData.points_money != 0 ? {
    w: common_vendor.t(_ctx.points_name()),
    x: common_vendor.t($options.toDecimal2($data.OrderData.points_money)),
    y: common_vendor.o((...args) => $options.onShowPoints && $options.onShowPoints(...args))
  } : {}) : {}, {
    z: $data.options.order_type == "deposit"
  }, $data.options.order_type == "deposit" ? {
    A: common_vendor.t($data.OrderData.order_total_front_price)
  } : common_vendor.e({
    B: !$data.OrderData.force_points
  }, !$data.OrderData.force_points ? {
    C: common_vendor.t($data.OrderData.order_pay_price)
  } : {}, {
    D: $data.OrderData.force_points
  }, $data.OrderData.force_points ? {
    E: common_vendor.t(_ctx.points_name()),
    F: common_vendor.t($data.ProductData[0].orderData.points_num)
  } : {}), {
    G: common_vendor.o((...args) => $options.SubmitOrder && $options.SubmitOrder(...args)),
    H: common_vendor.o($options.closeCouponFunc),
    I: common_vendor.p({
      isCoupon: $data.isCoupon,
      couponList: $data.couponList
    }),
    J: common_vendor.o($options.closeDistFunc),
    K: common_vendor.p({
      isDist: $data.isDist,
      chooseSotr: $data.chooseSotr,
      extract_store: $data.extract_store,
      last_extract: $data.last_extract,
      deliverySetting: $data.deliverySetting
    }),
    L: _ctx.theme(),
    M: common_vendor.n(_ctx.theme() || "")
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/order/confirm-order.vue"]]);
wx.createPage(MiniProgramPage);
