"use strict";
const common_vendor = require("../../../common/vendor.js");
const Popup = () => "../../../components/uni-popup.js";
const _sfc_main = {
  components: {
    Popup
  },
  data() {
    return {
      loadding: true,
      /*是否加载完成*/
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      /*支付类别*/
      withdraw_type: 10,
      agent: {},
      payType: [],
      words: {},
      /*小程序订阅消息*/
      temlIds: [],
      money: "",
      ifchecked: false,
      url: "",
      isPopup: false,
      cash_ratio: 0,
      cash_ratioMoney: "",
      overMoney: "",
      isType: false,
      pop_type: 10,
      balance: "",
      real_name: "",
      hasRealName: false
    };
  },
  mounted() {
    this.getData();
  },
  onLoad() {
  },
  watch: {
    money: function(n, o) {
      let self = this;
      if (n != o) {
        self.cash_ratioMoney = self.cash_ratio_percent();
        self.overMoney = self.overprice();
      }
    }
  },
  methods: {
    typeFunc(n) {
      this.pop_type = n;
    },
    /*获取数据*/
    getData() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self.loadding = true;
      self._get(
        "user.cash/index",
        {
          platform: self.getPlatform()
        },
        function(res) {
          self.balance = res.data.balance;
          self.cash_ratio = res.data.cash_ratio;
          if (res.data.real_name) {
            self.real_name = res.data.real_name;
            self.hasRealName = true;
          }
          self.loadding = false;
          common_vendor.index.hideLoading();
        }
      );
    },
    checkedme(e) {
      let self = this;
      self.ifchecked = !self.ifchecked;
    },
    /*切换提现方式*/
    TabType(e) {
      this.withdraw_type = e;
    },
    selectType() {
      this.withdraw_type = this.pop_type;
      this.isType = false;
    },
    /*判断是否存在*/
    hasType(e) {
      if (this.payType.indexOf(e) != -1) {
        return true;
      } else {
        return false;
      }
    },
    popup() {
      this.isPopup = true;
    },
    hidePopupFunc() {
      this.isPopup = false;
    },
    getAll() {
      this.money = this.balance;
    },
    // openDoc(e) {
    // 	var that = this;
    // 	var filePath = e.currentTarget.dataset.url; //对应的网络路径，可以是内网的或者外网
    // 	var fileType = e.currentTarget.dataset.type;
    // 	console.log(filePath)
    // 	wx.downloadFile({ //下载对应文件
    // 		url: filePath,
    // 		filePath: wx.env.USER_DATA_PATH + "/汇乐宝提现规则.docx",
    // 		success: function(res) {
    // 			var filePath = res.filePath; //文件路径
    // 			wx.openDocument({
    // 				filePath: filePath, // 装载对应文件的路径
    // 				fileType: fileType, // 指定打开的文件类型
    // 				showMenu: true, // 右上角的菜单转发分享操作
    // 				success: function(res) {
    // 					console.log("打开成功");
    // 				},
    // 				fail: function(res) {}
    // 			})
    // 		},
    // 		fail: function(res) {
    // 			console.log(res);
    // 		}
    // 	})
    // },
    cash_ratio_percent() {
      let money = this.money;
      let num = money * this.cash_ratio / 100;
      num = num.toFixed(2);
      return num;
    },
    overprice() {
      let money = this.money * this.cash_ratio / 100;
      money = money.toFixed(2);
      console.log(money);
      return money;
    },
    /*申请*/
    formSubmit: function(e) {
      console.log(111);
      let self = this;
      var formdata = e.detail.value;
      formdata.pay_type = self.withdraw_type;
      var data = JSON.stringify(formdata);
      common_vendor.index.showLoading({
        title: "正在提交",
        mask: true
      });
      self._post(
        "user.cash/submit",
        {
          data
        },
        function(res) {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "申请成功",
            duration: 2e3,
            icon: "success"
          });
          common_vendor.index.navigateBack();
        },
        (err) => {
          self.isPopup = false;
        }
      );
    }
  }
};
if (!Array) {
  const _component_Popup = common_vendor.resolveComponent("Popup");
  _component_Popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loadding
  }, !$data.loadding ? common_vendor.e({
    b: $data.withdraw_type == 10
  }, $data.withdraw_type == 10 ? {} : {}, {
    c: $data.withdraw_type == 30
  }, $data.withdraw_type == 30 ? {} : {}, {
    d: $data.withdraw_type == 20
  }, $data.withdraw_type == 20 ? {} : {}, {
    e: common_vendor.o(($event) => $data.isType = true),
    f: $data.withdraw_type == 20
  }, $data.withdraw_type == 20 ? {} : {}, {
    g: $data.withdraw_type == 30
  }, $data.withdraw_type == 30 ? {} : {}, {
    h: $data.money,
    i: common_vendor.o(($event) => $data.money = $event.detail.value),
    j: $data.money * 1 > $data.balance * 1
  }, $data.money * 1 > $data.balance * 1 ? {} : {
    k: common_vendor.t($data.balance),
    l: common_vendor.o((...args) => $options.getAll && $options.getAll(...args))
  }, {
    m: $data.withdraw_type == 10
  }, $data.withdraw_type == 10 ? common_vendor.e({
    n: $data.hasRealName,
    o: $data.hasRealName ? 1 : "",
    p: $data.real_name,
    q: common_vendor.o(($event) => $data.real_name = $event.detail.value),
    r: !$data.hasRealName
  }, !$data.hasRealName ? {} : {}) : {}, {
    s: $data.money * 1 <= $data.balance * 1
  }, $data.money * 1 <= $data.balance * 1 ? {
    t: common_vendor.o((...args) => $options.popup && $options.popup(...args))
  } : {
    v: common_vendor.o((...args) => $options.popup && $options.popup(...args))
  }, {
    w: common_vendor.o(($event) => $options.hidePopupFunc(1)),
    x: common_vendor.t($data.overMoney),
    y: common_vendor.t($data.cash_ratio),
    z: common_vendor.p({
      show: $data.isPopup,
      width: 622,
      padding: 0,
      type: "middle"
    }),
    A: common_vendor.o(($event) => $data.isType = false),
    B: $data.pop_type == 10
  }, $data.pop_type == 10 ? {} : {}, {
    C: common_vendor.o(($event) => $options.typeFunc(10)),
    D: $data.pop_type == 20
  }, $data.pop_type == 20 ? {} : {}, {
    E: common_vendor.o(($event) => $options.typeFunc(20)),
    F: $data.pop_type == 30
  }, $data.pop_type == 30 ? {} : {}, {
    G: common_vendor.o(($event) => $options.typeFunc(30)),
    H: common_vendor.o((...args) => $options.selectType && $options.selectType(...args)),
    I: common_vendor.p({
      show: $data.isType,
      width: 750,
      padding: 0,
      type: "bottom"
    }),
    J: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args)),
    K: _ctx.theme(),
    L: common_vendor.n(_ctx.theme() || "")
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/cash/apply.vue"]]);
wx.createPage(MiniProgramPage);
