"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*是否加载完成*/
      loadding: true,
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      expressList: {},
      index: -1,
      order_refund_id: 0,
      /*退货详情*/
      detail: {
        address: {}
      },
      express_id: 0,
      /*消息模板*/
      temlIds: [],
      source: "user",
      refuse_desc: "",
      refund_money: "",
      is_agree: 10,
      address: [],
      addressIndex: 0,
      address_id: ""
    };
  },
  onLoad(e) {
    this.order_refund_id = e.order_refund_id;
    this.source = e.source || "user";
  },
  mounted() {
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      self.loadding = true;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      let order_refund_id = self.order_refund_id;
      self._get(
        "user.refund/detail",
        {
          order_refund_id,
          platform: self.getPlatform()
        },
        function(res) {
          self.loadding = false;
          common_vendor.index.hideLoading();
          self.address = res.data.address;
          self.detail = res.data.detail;
          self.expressList = res.data.expressList;
          self.temlIds = res.data.template_arr;
        }
      );
    },
    /*选择物流*/
    onExpressChange: function(e) {
      this.index = e.detail.value;
      this.express_id = this.expressList[this.index].express_id;
    },
    /*选择物流*/
    onAddressChange: function(e) {
      this.addressIndex = e.detail.value;
      this.address_id = this.address[this.addressIndex].address_id;
      console.log(this.address_id);
    },
    /*发货*/
    formSubmit: function(e) {
      let self = this;
      var formdata = e.detail.value;
      formdata.order_refund_id = self.order_refund_id;
      formdata.express_id = self.express_id;
      let callback = function() {
        common_vendor.index.showLoading({
          title: "正在提交",
          mask: true
        });
        self._post("user.refund/delivery", formdata, function(res) {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: res.msg,
            duration: 3e3,
            complete: function() {
              self.gotoPage(
                "/pages/order/refund/detail/detail?order_refund_id=" + self.order_refund_id
              );
            }
          });
        });
      };
      self.subMessage(self.temlIds, callback);
    },
    sendRefund() {
      let self = this;
      if (self.loadding) {
        return;
      }
      self.loadding = true;
      if (self.refund_money > self.detail.orderproduct.total_pay_price) {
        self.showError("退款金额超过最大值");
        return;
      }
      if (self.is_agree == 10 && self.address_id == "" && self.detail.type.value != 30) {
        self.showError("请选择退货地址");
        return;
      }
      let order_refund_id = self.order_refund_id;
      common_vendor.index.showLoading({
        title: "提交中..."
      });
      self._post(
        "user.refund/audit",
        {
          order_refund_id,
          is_agree: self.is_agree,
          refuse_desc: self.refuse_desc,
          order_refund_id,
          refund_money: self.refund_money,
          address_id: self.address_id
        },
        function(res) {
          self.loadding = false;
          common_vendor.index.hideLoading();
          self.getData();
          self.showSuccess("操作成功");
        },
        function(err) {
          self.loadding = false;
        }
      );
    },
    reReceipt(e) {
      let self = this;
      if (self.loadding) {
        return;
      }
      var formdata = e.detail.value;
      formdata.order_refund_id = self.order_refund_id;
      formdata.send_express_id = self.express_id;
      formdata.refund_money = 0;
      self.loadding = true;
      self.order_refund_id;
      common_vendor.index.showLoading({
        title: "提交中..."
      });
      self._post(
        "user.refund/receipt",
        formdata,
        function(res) {
          self.loadding = false;
          common_vendor.index.hideLoading();
          self.getData();
          self.showSuccess("操作成功");
        },
        function(err) {
          self.loadding = false;
        }
      );
    },
    sendReceipt() {
      let self = this;
      if (self.loadding) {
        return;
      }
      self.loadding = true;
      if (self.refund_money > self.detail.orderproduct.total_pay_price) {
        self.showError("退款金额超过最大值");
        return;
      }
      let order_refund_id = self.order_refund_id;
      common_vendor.index.showLoading({
        title: "提交中..."
      });
      self._post(
        "user.refund/receipt",
        {
          order_refund_id,
          refund_money: self.refund_money
        },
        function(res) {
          self.loadding = false;
          common_vendor.index.hideLoading();
          self.getData();
          self.showSuccess("操作成功");
        },
        function(err) {
          self.loadding = false;
        }
      );
    },
    changeRadio(e) {
      this.is_agree = e.detail.value;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loadding
  }, !$data.loadding ? common_vendor.e({
    b: common_vendor.t($data.detail.state_text),
    c: $data.detail.orderproduct.image.file_path,
    d: common_vendor.t($data.detail.orderproduct.product_name),
    e: common_vendor.t($data.detail.orderproduct.product_attr),
    f: common_vendor.t($data.detail.orderproduct.total_price),
    g: common_vendor.t($data.detail.orderproduct.total_pay_price),
    h: $data.detail.order_master.order_source == 70
  }, $data.detail.order_master.order_source == 70 ? common_vendor.e({
    i: $data.detail.orderproduct.advance
  }, $data.detail.orderproduct.advance ? {
    j: common_vendor.t($data.detail.orderproduct.advance.money_return ? "可退" : "不可退"),
    k: common_vendor.t($data.detail.orderproduct.advance.pay_price)
  } : {}) : {}, {
    l: $data.detail.status.value == 20
  }, $data.detail.status.value == 20 ? {
    m: common_vendor.t($data.detail.refund_money)
  } : {}, {
    n: common_vendor.t($data.detail.type.text),
    o: common_vendor.t($data.detail.apply_desc),
    p: $data.detail.image.length > 0
  }, $data.detail.image.length > 0 ? {
    q: common_vendor.f($data.detail.image, (imgs, img_num, i0) => {
      return {
        a: imgs.file_path,
        b: img_num
      };
    })
  } : {}, {
    r: $data.detail.plate_status.value != 0
  }, $data.detail.plate_status.value != 0 ? common_vendor.e({
    s: $data.detail.plate_status.value == 10
  }, $data.detail.plate_status.value == 10 ? {} : {}, {
    t: $data.detail.plate_status.value == 20
  }, $data.detail.plate_status.value == 20 ? {} : {}, {
    v: $data.detail.plate_status.value == 30
  }, $data.detail.plate_status.value == 30 ? {} : {}) : {}, {
    w: $data.detail.status.value == 10
  }, $data.detail.status.value == 10 ? {
    x: common_vendor.t($data.detail.refuse_desc)
  } : {}, {
    y: $data.detail.plate_status.value == 30
  }, $data.detail.plate_status.value == 30 ? {
    z: common_vendor.t($data.detail.plate_desc)
  } : {}, {
    A: $data.detail.is_agree.value == 10 && $data.detail.type.value != 30
  }, $data.detail.is_agree.value == 10 && $data.detail.type.value != 30 ? common_vendor.e({
    B: common_vendor.t($data.detail.address.name),
    C: common_vendor.t($data.detail.address.phone),
    D: common_vendor.t($data.detail.address.detail),
    E: $data.detail.express_no
  }, $data.detail.express_no ? {
    F: common_vendor.t($data.detail.express.express_name)
  } : {}, {
    G: $data.detail.express_no
  }, $data.detail.express_no ? {
    H: common_vendor.t($data.detail.express_no)
  } : {}, {
    I: $data.detail.is_plate_send
  }, $data.detail.is_plate_send ? {
    J: common_vendor.t($data.detail.sendexpress.express_name)
  } : {}, {
    K: $data.detail.is_plate_send
  }, $data.detail.is_plate_send ? {
    L: common_vendor.t($data.detail.send_express_no),
    M: common_vendor.o(($event) => {
      _ctx.gotoPage("/pages/order/express/refund-express?order_id=" + $data.detail.order_refund_id);
    })
  } : {}) : {}, {
    N: $data.detail.status.value == 0 && $data.detail.is_agree.value == 10 && $data.detail.is_user_send == 0 && $data.source == "user"
  }, $data.detail.status.value == 0 && $data.detail.is_agree.value == 10 && $data.detail.is_user_send == 0 && $data.source == "user" ? common_vendor.e({
    O: $data.index > -1
  }, $data.index > -1 ? {
    P: common_vendor.t($data.expressList[$data.index].express_name)
  } : {}, {
    Q: common_vendor.o((...args) => $options.onExpressChange && $options.onExpressChange(...args)),
    R: $data.expressList,
    S: $data.index,
    T: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args))
  }) : {}, {
    U: $data.detail.type.value == 20 && $data.detail.is_agree.value == 10 && $data.detail.is_user_send == 1 && $data.source != "user" && $data.detail.is_plate_send == 0
  }, $data.detail.type.value == 20 && $data.detail.is_agree.value == 10 && $data.detail.is_user_send == 1 && $data.source != "user" && $data.detail.is_plate_send == 0 ? common_vendor.e({
    V: $data.index > -1
  }, $data.index > -1 ? {
    W: common_vendor.t($data.expressList[$data.index].express_name)
  } : {}, {
    X: common_vendor.o((...args) => $options.onExpressChange && $options.onExpressChange(...args)),
    Y: $data.expressList,
    Z: $data.index,
    aa: common_vendor.o((...args) => $options.reReceipt && $options.reReceipt(...args))
  }) : {}, {
    ab: $data.detail.is_agree.value == 0 && $data.source == "supplier"
  }, $data.detail.is_agree.value == 0 && $data.source == "supplier" ? common_vendor.e({
    ac: common_vendor.t($data.detail.type.text),
    ad: $data.is_agree == 10,
    ae: $data.is_agree == 20,
    af: common_vendor.o(($event) => $options.changeRadio($event)),
    ag: $data.is_agree == 10 && $data.detail.type.value != 30
  }, $data.is_agree == 10 && $data.detail.type.value != 30 ? common_vendor.e({
    ah: $data.address_id != ""
  }, $data.address_id != "" ? {
    ai: common_vendor.t($data.address[$data.addressIndex].detail)
  } : {}, {
    aj: common_vendor.o((...args) => $options.onAddressChange && $options.onAddressChange(...args)),
    ak: $data.address,
    al: $data.addressIndex
  }) : {}, {
    am: $data.is_agree == 20
  }, $data.is_agree == 20 ? {
    an: $data.refuse_desc,
    ao: common_vendor.o(($event) => $data.refuse_desc = $event.detail.value)
  } : {}, {
    ap: $data.is_agree == 10 && $data.detail.type.value == 30
  }, $data.is_agree == 10 && $data.detail.type.value == 30 ? {
    aq: $data.refund_money,
    ar: common_vendor.o(($event) => $data.refund_money = $event.detail.value),
    as: common_vendor.t($data.detail.orderproduct.max_refund_money)
  } : {}, {
    at: common_vendor.o((...args) => $options.sendRefund && $options.sendRefund(...args))
  }) : {}, {
    av: $data.detail.type.value == 10 && $data.detail.is_agree.value == 10 && $data.detail.is_user_send == 1 && $data.detail.is_receipt == 0 && $data.source == "supplier"
  }, $data.detail.type.value == 10 && $data.detail.is_agree.value == 10 && $data.detail.is_user_send == 1 && $data.detail.is_receipt == 0 && $data.source == "supplier" ? {
    aw: common_vendor.t($data.detail.type.text),
    ax: $data.refund_money,
    ay: common_vendor.o(($event) => $data.refund_money = $event.detail.value),
    az: common_vendor.t($data.detail.orderproduct.total_pay_price),
    aA: common_vendor.o((...args) => $options.sendReceipt && $options.sendReceipt(...args))
  } : {}, {
    aB: _ctx.theme(),
    aC: common_vendor.n(_ctx.theme() || "")
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/order/refund/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
