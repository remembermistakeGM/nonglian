"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_specSelect = require("../../../../common/specSelect.js");
const _sfc_main = {
  data() {
    return {
      /*是否可见*/
      Visible: false,
      form: {
        detail: {
          product_sku: {},
          show_sku: {},
          show_point_sku: {
            point_price: 0
          }
        },
        show_sku: {
          sum: 1
        }
      },
      /*当前商品总库存*/
      stock: 0,
      /*选择提示*/
      selectSpec: "",
      /*规格是否选择完整*/
      isAll: false,
      /*是否改变*/
      is_change: false
    };
  },
  props: ["isPopup", "productModel"],
  onLoad() {
  },
  mounted() {
  },
  computed: {
    /*判断增加数量*/
    isadd: function() {
      return this.form.show_sku.sum >= this.stock || this.form.show_sku.sum >= this.form.detail.limit_num;
    },
    /*判断减少数量*/
    issub: function() {
      return this.form.show_sku.sum <= 1;
    }
  },
  watch: {
    "isPopup": function(n, o) {
      if (n != o) {
        this.Visible = n;
        if (!this.isOpenSpec) {
          this.form = this.productModel;
          this.isOpenSpec = true;
          this.initShowSku();
          this.form.specData.spec_attr.forEach((item, index) => {
            this.selectAttr(index, 0);
          });
        }
        this.form.type = this.productModel.type;
        console.log(this.productModel);
      }
    },
    "form.specData": {
      handler(n, o) {
        let str = "", select = "";
        this.isAll = true;
        if (n) {
          for (let i = 0; i < n.spec_attr.length; i++) {
            if (this.form.productSpecArr[i] == null) {
              this.isAll = false;
              str += n.spec_attr[i].group_name + " ";
            } else {
              n.spec_attr[i].spec_items.forEach((item) => {
                if (this.form.productSpecArr[i] == item.item_id) {
                  select += '"' + item.spec_value + '" ';
                }
              });
            }
          }
          if (!this.isAll) {
            str = "请选择: " + str;
          } else {
            select = "已选: " + select;
          }
        }
        this.selectSpec = this.isAll ? select : str;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    /*关闭弹窗*/
    closePopup() {
      this.$emit("close", this.form.specData, null);
    },
    /*确认提交*/
    confirmFunc() {
      if (this.form.specData != null && !this.isAll) {
        common_vendor.index.showToast({
          title: "请选择规格",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      this.createdOrder();
    },
    /*初始化*/
    initShowSku() {
      this.form.show_sku.sku_image = this.form.detail.product.image[0].file_path;
      this.form.show_sku.point_price = this.form.detail.point_price;
      this.form.show_sku.product_sku_id = 0;
      this.form.show_sku.line_price = this.form.detail.line_price;
      this.form.show_sku.point_stock = this.form.detail.stock;
      this.form.show_sku.point_product_sku_id = 0;
      this.form.show_sku.point_num = this.form.detail.sku[0].point_num;
      this.form.show_sku.point_money = this.form.detail.sku[0].point_money;
      this.form.show_sku.product_sku_id = 0;
      this.stock = this.form.detail.stock;
    },
    /*选择属性*/
    selectAttr(attr_index, item_index) {
      let self = this;
      let items = self.form.specData.spec_attr[attr_index].spec_items;
      let curItem = items[item_index];
      if (curItem.checked) {
        curItem.checked = false;
        self.form.productSpecArr[attr_index] = null;
      } else {
        for (let i = 0; i < items.length; i++) {
          items[i].checked = false;
        }
        curItem.checked = true;
        self.form.productSpecArr[attr_index] = curItem.item_id;
      }
      common_specSelect.judgeSelect(self.form.specData.spec_attr, attr_index, self.form.productSpecArr, self.form.productSku);
      let isall = true;
      for (let i = 0; i < self.form.productSpecArr.length; i++) {
        let item = self.form.productSpecArr[i];
        if (item == null) {
          isall = false;
          self.initShowSku();
          return;
        }
      }
      if (!isall) {
        self.initShowSku();
        return;
      }
      self.updateSpecProduct();
    },
    /*更新商品规格信息*/
    updateSpecProduct() {
      let self = this;
      let specSkuId = self.form.productSpecArr.join("_");
      let spec_list = self.form.specData.spec_list, skuItem = spec_list.find((val) => {
        return val.spec_sku_id == specSkuId;
      });
      if (typeof skuItem === "object") {
        let point_sku_list = self.form.detail.sku, pointSkuItem = point_sku_list.find((val) => {
          return val.product_sku_id == skuItem.product_sku_id;
        });
        console.log(pointSkuItem);
        self.stock = pointSkuItem.point_stock;
        if (self.form.show_sku.sum > self.stock) {
          self.form.show_sku.sum = self.stock > 0 ? self.stock : 1;
        }
        self.form.show_sku.line_price = skuItem.spec_form.product_price;
        self.form.show_sku.product_sku_id = skuItem.spec_sku_id;
        self.form.show_sku.point_price = pointSkuItem.point_price;
        self.form.show_sku.point_product_sku_id = pointSkuItem.point_product_sku_id;
        self.form.show_sku.point_stock = pointSkuItem.point_stock;
        if (skuItem.spec_form.image_id > 0) {
          self.form.show_sku.sku_image = skuItem.spec_form.image_path;
        } else {
          self.form.show_sku.sku_image = self.form.detail.product.image[0].file_path;
        }
      }
    },
    /*创建订单*/
    createdOrder() {
      let self = this;
      let point_product_id = self.form.detail.point_product_id;
      let num = self.form.show_sku.sum;
      let product_sku_id = self.form.show_sku.product_sku_id;
      let point_product_sku_id = self.form.show_sku.point_product_sku_id;
      self.gotoPage("/pages/order/confirm-order?product_num=" + num + "&point_product_id=" + point_product_id + "&product_sku_id=" + product_sku_id + "&point_product_sku_id=" + point_product_sku_id + "&order_type=points");
    },
    /*商品增加*/
    add() {
      if (this.stock <= 0) {
        return;
      }
      if (this.form.show_sku.sum >= this.stock) {
        common_vendor.index.showToast({
          title: "数量超过了库存",
          icon: "none",
          duration: 2e3
        });
        return false;
      }
      if (this.form.show_sku.sum >= this.form.detail.limit_num) {
        common_vendor.index.showToast({
          title: "数量超过了限购数量",
          icon: "none",
          duration: 2e3
        });
        return false;
      }
      this.form.show_sku.sum++;
    },
    /*商品减少*/
    sub() {
      if (this.stock <= 0) {
        return;
      }
      if (this.form.show_sku.sum < 2) {
        common_vendor.index.showToast({
          title: "商品数量至少为1",
          icon: "none",
          duration: 2e3
        });
        return false;
      }
      this.form.show_sku.sum--;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.form.show_sku.sku_image,
    b: common_vendor.t(_ctx.points_name()),
    c: common_vendor.t($data.form.show_sku.point_num),
    d: common_vendor.t($data.form.show_sku.point_money),
    e: common_vendor.t($data.form.show_sku.point_stock),
    f: common_vendor.t($data.selectSpec),
    g: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args)),
    h: $data.form.specData != null
  }, $data.form.specData != null ? {
    i: common_vendor.f($data.form.specData.spec_attr, (item_attr, attr_index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item_attr.group_name),
        b: $data.form.productSpecArr[attr_index] == null
      }, $data.form.productSpecArr[attr_index] == null ? {
        c: common_vendor.t(item_attr.group_name)
      } : {}, {
        d: common_vendor.f(item_attr.spec_items, (item, item_index, i1) => {
          return {
            a: common_vendor.t(item.spec_value),
            b: common_vendor.n(item.checked ? "btn-checked" : "btn-checke"),
            c: item_index,
            d: common_vendor.o(($event) => $options.selectAttr(attr_index, item_index), item_index)
          };
        }),
        e: attr_index
      });
    })
  } : {}, {
    j: common_vendor.o(($event) => $options.sub()),
    k: !$options.issub ? 1 : "",
    l: $data.form.show_sku.sum,
    m: common_vendor.o(($event) => $data.form.show_sku.sum = $event.detail.value),
    n: !$options.isadd ? 1 : "",
    o: common_vendor.o(($event) => $options.add()),
    p: common_vendor.o(($event) => $options.confirmFunc($data.form)),
    q: common_vendor.o(() => {
    }),
    r: common_vendor.n($data.Visible ? "product-popup open" : "product-popup close"),
    s: common_vendor.o(() => {
    }),
    t: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/points/detail/popup/Spec.vue"]]);
wx.createComponent(Component);
