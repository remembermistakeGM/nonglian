"use strict";
const common_vendor = require("../../common/vendor.js");
const common_pay = require("../../common/pay.js");
const _sfc_main = {
  data() {
    return {
      balance: "",
      balanceType: false,
      type: 0,
      loading: true,
      order_id: 0,
      /* 0创建订单;10 20保证金 30直播充值 40充值 50预售定金 60尾款*/
      order_type: 0,
      pay_type: 20,
      checkedPay: [],
      payPrice: "",
      isPay: false
    };
  },
  computed: {
    hasBanlance() {
      if (this.order_type == 40 || this.balance <= 0) {
        return false;
      }
      let n = this.checkedPay.indexOf(10);
      if (n == -1) {
        return false;
      } else {
        return true;
      }
    }
  },
  onLoad(e) {
    this.order_id = decodeURIComponent(e.order_id);
    if (e.order_type) {
      this.order_type = e.order_type;
    }
    this.getData();
  },
  onBackPress(options) {
    console.log(!this.isPay);
    if (!this.isPay) {
      if (this.order_type != 20 && this.order_type != 30 && this.order_type != 40) {
        if (options.from === "navigateBack") {
          return true;
        }
        this.back();
        return true;
      }
    }
  },
  methods: {
    back() {
      let self = this;
      common_vendor.index.showModal({
        title: "提示",
        content: "您的订单如在规定时间内未支付将被取消，请尽快完成支付",
        cancelText: "继续支付",
        confirmText: "确认离开",
        success: function(res) {
          if (res.confirm) {
            common_vendor.index.reLaunch({
              url: "/pages/order/order-detail?order_id=" + self.order_id
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    getTheme() {
      let name = this.theme();
      let color = "#ff5704";
      switch (name) {
        case "theme0":
          color = "#ff5704";
          break;
        case "theme1":
          color = "#19ad57";
          break;
        case "theme2":
          color = "#ffcc00";
          break;
        case "theme3":
          color = "#33a7ff";
          break;
        case "theme4":
          color = "#e4e4e4";
          break;
        case "theme5":
          color = "#c8ba97";
          break;
        case "theme6":
          color = "#623ceb";
          break;
      }
      return color;
    },
    getData() {
      let self = this;
      self.loading = true;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      let url = "user.order/pay";
      if (self.order_type == 20) {
        url = "supplier.index/pay";
      }
      if (self.order_type == 30) {
        url = "plus.live.plan/pay";
      }
      if (self.order_type == 40) {
        url = "balance.plan/pay";
      }
      if (self.order_type == 50) {
        url = "plus.advance.Order/pay";
      }
      let params = {
        order_id: self.order_id,
        pay_source: self.getPlatform()
      };
      self._get(url, params, function(res) {
        self.loading = false;
        let list = [];
        res.data.payTypes.forEach((item) => {
          list.push(item * 1);
        });
        self.checkedPay = list;
        self.payPrice = res.data.payPrice;
        self.balance = res.data.balance || "";
        if (self.checkedPay[0] != 10) {
          self.pay_type = self.checkedPay[0] || self.checkedPay[1] || 20;
        } else {
          self.pay_type = self.checkedPay[1] || self.checkedPay[0];
        }
        common_vendor.index.hideLoading();
      });
    },
    switch2Change(e) {
      this.balanceType = e.detail.value;
    },
    submit() {
      let self = this;
      self.loading = true;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      let url = "user.order/pay";
      if (self.order_type == 20) {
        url = "supplier.index/pay";
      }
      if (self.order_type == 40) {
        url = "balance.plan/pay";
      }
      if (self.order_type == 30) {
        url = "plus.live.plan/pay";
      }
      if (self.order_type == 50) {
        url = "plus.advance.Order/pay";
      }
      let use_balance = self.balanceType == true ? 1 : 0;
      if (self.payPrice == 0) {
        use_balance = 1;
      }
      let params = {
        order_id: self.order_id,
        pay_source: self.getPlatform(),
        payType: self.pay_type,
        use_balance
      };
      self._post(url, params, function(res) {
        self.loading = false;
        self.isPay = true;
        common_vendor.index.hideLoading();
        common_pay.pay(res, self, self.paySuccess, self.payError);
      });
    },
    paySuccess(result) {
      let self = this;
      self.isPay = true;
      console.log(self.order_type);
      if (self.order_type == 30 || self.order_type == 40) {
        self.showSuccess("支付成功", function() {
          console.log("back");
          common_vendor.index.navigateBack({
            delta: 1
            //返回层数，2则上上页
          });
        });
        return;
      } else if (self.order_type == 20) {
        self.showSuccess("支付成功", function() {
          self.gotoPage("/pages/user/my_shop/my_shop", "reLaunch");
        });
        return;
      } else if (self.order_type == 50) {
        self.showSuccess("支付成功", function() {
          self.gotoPage("/pages/order/myorder", "reLaunch");
        });
        return;
      } else {
        self.gotoPage("/pages/order/pay-success/pay-success?order_id=" + result.data.order_id, "reLaunch");
        return;
      }
    },
    payError(result) {
      let self = this;
      self.isPay = true;
      if (self.order_type == 30 || self.order_type == 40) {
        common_vendor.index.navigateBack({
          delta: parseInt(1)
        });
      } else if (self.order_type == 20) {
        self.gotoPage("/pages/user/my_shop/my_shop", "redirect");
      } else if (self.order_type == 50) {
        self.gotoPage("/pages/order/myorder", "redirect");
      } else {
        self.gotoPage("/pages/order/myorder", "redirect");
      }
    },
    payTypeFunc(n) {
      this.pay_type = n;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.payPrice || "0.00"),
    b: common_vendor.f($data.checkedPay, (item, index, i0) => {
      return common_vendor.e({
        a: item == 20
      }, item == 20 ? {
        b: common_vendor.n($data.pay_type == 20 ? "item active" : "item"),
        c: common_vendor.o(($event) => $options.payTypeFunc(20), index)
      } : {}, {
        d: item == 30
      }, item == 30 ? {
        e: common_vendor.n($data.pay_type == 30 ? "item active" : "item"),
        f: common_vendor.o(($event) => $options.payTypeFunc(30), index)
      } : {}, {
        g: index
      });
    }),
    c: $options.hasBanlance
  }, $options.hasBanlance ? {
    d: common_vendor.t($data.balance),
    e: $options.getTheme(),
    f: $data.balanceType,
    g: common_vendor.o((...args) => $options.switch2Change && $options.switch2Change(...args))
  } : {}, {
    h: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    i: _ctx.theme(),
    j: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/order/cashier.vue"]]);
wx.createPage(MiniProgramPage);
