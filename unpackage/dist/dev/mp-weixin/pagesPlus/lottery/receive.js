"use strict";
const common_vendor = require("../../common/vendor.js");
const common_utils = require("../../common/utils.js");
const Myinfo = () => "../../pages/order/confirm-order/my-info.js";
const _sfc_main = {
  components: {
    Myinfo
  },
  data() {
    return {
      record_id: 0,
      /*是否加载完成*/
      loadding: true,
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      id: 0,
      tab_type: 0,
      /*详情*/
      detail: {},
      // 是否存在收货地址
      existAddress: false,
      /*默认地址*/
      Address: null
    };
  },
  onLoad(e) {
    common_utils.utils.getSceneData(e);
    this.record_id = e.record_id;
  },
  onShow() {
    this.getData();
  },
  methods: {
    onPay() {
      let self = this;
      if (self.Address == null) {
        self.showError("请选择收件地址");
        return;
      }
      common_vendor.index.showLoading({
        title: "加载中"
      });
      let params = {
        record_id: self.record_id
      };
      self._post("plus.lottery.order/buy", params, function(res) {
        self.showSuccess("领取成功，请等待工作人员处理", function(res2) {
          common_vendor.index.navigateBack();
        });
      });
    },
    /*获取数据*/
    getData() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self.loadding = true;
      let params = {
        record_id: self.record_id
      };
      self._get(
        "plus.lottery.order/buy",
        params,
        function(res) {
          self.detail = res.data.data.detail;
          self.existAddress = res.data.data.existAddress;
          self.Address = res.data.data.address;
          common_vendor.index.hideLoading();
          self.loadding = false;
        },
        function(res) {
          common_vendor.index.navigateBack({
            delta: 1
          });
        }
      );
    },
    hasType(e) {
      if (this.deliverySetting.indexOf(e) != -1) {
        return true;
      } else {
        return false;
      }
    },
    /*选择配送方式*/
    tabFunc(e) {
      this.tab_type = e;
      if (e == 0) {
        this.delivery = 10;
      } else {
        this.delivery = 20;
      }
      this.getData();
    },
    choosePaytype(payType) {
      this.payType = payType;
    },
    /*关闭弹窗*/
    closePopup(e, params) {
      this.isPopup = false;
      console.log(params);
      if (e && e.specAttr) {
        this.detail["specName"] = "";
        let has = "已选：";
        let noone = "";
        e.specAttr.forEach((item) => {
          if (item.specItems) {
            let h = "";
            for (let i = 0; i < item.specItems.length; i++) {
              let child = item.specItems[i];
              if (child.checked) {
                h = child.specValue + " / ";
                break;
              }
            }
            if (h != "") {
              has += h;
            } else {
              noone += item.groupName;
            }
          }
        });
        this.productSkuId = params.productSkuId;
        if (noone != "") {
          this.detail.specName = noone;
        } else {
          has = has.replace(/(\s\/\s)$/gi, "");
          this.detail.specName = has;
        }
        console.log(this.detail.specName);
      }
    },
    /* 打开弹窗 */
    openPopup(e, spe, detail) {
      let obj = {
        specData: spe,
        detail,
        productSpecArr: spe != null ? new Array(spe.specAttr.length) : [],
        showSku: {
          skuImage: "",
          seckillPrice: 0,
          productSkuId: 0,
          linePrice: 0,
          seckillStock: 0,
          seckillProductSkuId: 0,
          sum: 1
        },
        type: e
      };
      this.productModel = obj;
      this.isPopup = true;
    }
  }
};
if (!Array) {
  const _component_Myinfo = common_vendor.resolveComponent("Myinfo");
  _component_Myinfo();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loadding
  }, !$data.loadding ? common_vendor.e({
    b: common_vendor.p({
      Address: $data.Address,
      existAddress: $data.existAddress
    }),
    c: $data.detail.image,
    d: common_vendor.t($data.detail.record_name),
    e: $data.detail.province_id == ""
  }, $data.detail.province_id == "" ? {
    f: common_vendor.o(($event) => $options.onPay())
  } : {}, {
    g: $data.detail.status == 1 && $data.detail.delivery_status == 10
  }, $data.detail.status == 1 && $data.detail.delivery_status == 10 ? {} : {}) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/lottery/receive.vue"]]);
wx.createPage(MiniProgramPage);
