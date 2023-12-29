"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      /*是否可见*/
      Visible: false,
      /*表单对象*/
      form: {
        detail: {},
        show_sku: {
          sku_image: ""
        }
      },
      /*当前商品总库存*/
      stock: 0,
      /*选择提示*/
      selectSpec: "",
      /*是否打开过多规格选择框*/
      isOpenSpec: false,
      type: "",
      clock: false
    };
  },
  props: ["isPopup", "productModel", "room_id"],
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
    isPopup: function(n, o) {
      if (n != o) {
        this.Visible = n;
        this.form = this.productModel;
        this.isOpenSpec = true;
        this.initShowSku();
        this.form.type = this.productModel.type;
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
    /*初始化*/
    initShowSku() {
      this.form.show_sku.sku_image = this.form.detail.image[0].file_path;
      this.form.show_sku.product_price = this.form.detail.product_price;
      if (this.form.detail.spec_type == 20) {
        if (this.form.detail.product_price != this.form.detail.product_max_price) {
          this.form.show_sku.product_price = this.form.detail.product_price + "-" + this.form.detail.product_max_price;
        }
      }
      this.form.show_sku.spec_sku_id = 0;
      this.form.show_sku.line_price = this.form.detail.line_price;
      this.form.show_sku.stock_num = this.form.detail.product_stock;
      this.form.show_sku.sum = 1;
      this.stock = this.form.detail.product_stock;
      if (this.form.plus_name == "advance") {
        this.form.show_sku.product_price = this.form.plus_sku[0].product_price;
        this.form.show_sku.line_price = "";
        this.form.show_sku.sku_image = this.form.plus_sku[0].productSku.image ? this.form.plus_sku[0].productSku.image.file_path : this.form.detail.image[0].file_path;
        this.form.show_sku.stock_num = this.form.plus_sku[0].advance_stock;
        this.stock = this.form.plus_sku[0].advance_stock;
      }
      if (this.form.plus_name == "seckill") {
        this.form.show_sku.product_price = this.form.plus_sku[0].seckill_price;
        this.form.show_sku.line_price = this.form.plus_sku[0].product_price;
        this.form.show_sku.sku_image = this.form.plus_sku[0].productSku.image ? this.form.plus_sku[0].productSku.image.file_path : this.form.detail.image[0].file_path;
        this.form.show_sku.stock_num = this.form.plus_sku[0].seckill_stock;
        this.stock = this.form.plus_sku[0].seckill_stock;
      }
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
      for (let i = 0; i < self.form.productSpecArr.length; i++) {
        if (self.form.productSpecArr[i] == null) {
          self.initShowSku();
          return;
        }
      }
      self.updateSpecProduct();
    },
    /*更新商品规格信息*/
    updateSpecProduct() {
      let self = this;
      let specSkuId = self.form.productSpecArr.join("_");
      let spec_list = self.form.specData.spec_list;
      if (self.form.plus_sku != null) {
        spec_list = self.form.plus_sku;
      }
      let skuItem = spec_list.find((val) => {
        if (self.form.plus_name) {
          return val.productSku.spec_sku_id == specSkuId;
        } else {
          return val.spec_sku_id == specSkuId;
        }
      });
      if (!skuItem) {
        self.clock = true;
        self.initShowSku();
        return;
      } else {
        self.clock = false;
      }
      if (self.form.plus_name && !skuItem.spec_form) {
        skuItem.spec_form = skuItem.productSku;
      }
      if (typeof skuItem === "object") {
        if (self.form.plus_name) {
          self.stock = skuItem[self.form.plus_name + "_stock"];
          if (self.form.show_sku.sum > self.stock) {
            self.form.show_sku.sum = self.stock > 0 ? self.stock : 1;
          }
        } else {
          self.stock = skuItem.spec_form.stock_num;
          if (self.form.show_sku.sum > self.stock) {
            self.form.show_sku.sum = self.stock > 0 ? self.stock : 1;
          }
        }
        self.form.show_sku.spec_sku_id = specSkuId;
        self.form.show_sku.product_price = skuItem.spec_form.product_price;
        self.form.show_sku.line_price = skuItem.spec_form.line_price;
        if (skuItem.spec_form.image_id > 0) {
          self.form.show_sku.sku_image = skuItem.spec_form.image_path;
        } else {
          self.form.show_sku.sku_image = self.form.detail.image[0].file_path;
        }
        self.form.show_sku.stock_num = skuItem.spec_form.stock_num;
        if (self.form.plus_name) {
          self.form.show_sku.product_price = skuItem.product_price;
          if (self.form.plus_name == "seckill") {
            self.form.show_sku.product_price = skuItem.seckill_price;
          }
          self.form.show_sku.stock_num = skuItem[self.form.plus_name + "_stock"];
          self.form.show_sku.line_price = "";
          self.form.show_sku.sku_image = skuItem.spec_form.image ? skuItem.spec_form.image.file_path : self.form.detail.image[0].file_path;
          self.form.show_sku.advance_product_id = skuItem.spec_form.image ? skuItem.spec_form.image.file_path : self.form.detail.image[0].file_path;
        }
      }
    },
    /*关闭弹窗*/
    closePopup() {
      this.$emit("close", this.form.specData, null);
    },
    /*确认提交*/
    confirmFunc() {
      if (this.form.specData != null) {
        for (let i = 0; i < this.form.productSpecArr.length; i++) {
          if (this.form.productSpecArr[i] == null) {
            common_vendor.index.showToast({
              title: "请选择规格",
              icon: "none",
              duration: 2e3
            });
            return;
          }
        }
      }
      if (this.form.type == "card") {
        this.addCart();
      } else {
        this.createdOrder();
      }
    },
    /*加入购物车*/
    addCart() {
      let self = this;
      let product_id = self.form.detail.product_id;
      let total_num = self.form.show_sku.sum;
      let spec_sku_id = self.form.show_sku.spec_sku_id;
      if (self.form.detail.spec_type == 20 && spec_sku_id == 0) {
        common_vendor.index.showToast({
          title: "请选择属性",
          icon: "none",
          duration: 2e3
        });
        return false;
      }
      self._post(
        "order.cart/add",
        {
          product_id,
          total_num,
          spec_sku_id
        },
        function(res) {
          common_vendor.index.showToast({
            title: res.msg,
            duration: 2e3
          });
          self.$emit("close", null, res.data.cart_total_num);
        }
      );
    },
    /*创建订单*/
    createdOrder() {
      let product_id = this.form.detail.product_id;
      let product_num = this.form.show_sku.sum;
      let spec_sku_id = this.form.show_sku.spec_sku_id;
      let room_id = "";
      if (this.room_id != 0 & this.room_id != "") {
        room_id = "&room_id=" + this.room_id;
      }
      console.log(room_id);
      let url = "/pages/order/confirm-order?product_id=" + product_id + "&product_num=" + product_num + "&product_sku_id=" + spec_sku_id + "&order_type=buy" + room_id;
      if (this.form.type == "deposit") {
        if (this.form.plus_name == "advance") {
          let skuItem = this.form.detail.advance.sku.find((val) => {
            return val.productSku.spec_sku_id == spec_sku_id;
          });
          url = "/pages/order/confirm-order?product_id=" + product_id + "&product_num=" + product_num + "&product_sku_id=" + spec_sku_id + "&advance_product_sku_id=" + skuItem.advance_product_sku_id + "&advance_product_id=" + skuItem.advance_product_id + "&order_type=deposit";
        }
        if (this.form.plus_name == "seckill") {
          let skuItem = this.form.detail.secKill.seckillSku.find((val) => {
            return val.productSku.spec_sku_id == spec_sku_id;
          });
          url = "/pages/order/confirm-order?seckill_product_id=" + skuItem.seckill_product_id + "&product_num=" + product_num + "&product_sku_id=" + skuItem.productSku.spec_sku_id + "&seckill_product_sku_id=" + skuItem.seckill_product_sku_id + "&order_type=seckill";
        }
      }
      this.gotoPage(url);
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
      if (this.form.detail.limit_num > 0 && this.form.show_sku.sum >= this.form.detail.limit_num) {
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
    b: common_vendor.t($data.form.show_sku.product_price),
    c: $data.form.show_sku.line_price
  }, $data.form.show_sku.line_price ? {
    d: common_vendor.t($data.form.show_sku.line_price)
  } : {}, {
    e: common_vendor.t($data.form.show_sku.stock_num),
    f: common_vendor.t($data.selectSpec),
    g: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args)),
    h: $data.form.specData != null
  }, $data.form.specData != null ? {
    i: common_vendor.f($data.form.specData.spec_attr, (item_attr, attr_index, i0) => {
      return {
        a: common_vendor.t(item_attr.group_name),
        b: common_vendor.f(item_attr.spec_items, (item, item_index, i1) => {
          return {
            a: common_vendor.t(item.spec_value),
            b: common_vendor.n(item.checked ? "btn-checked" : "btn-checke"),
            c: item_index,
            d: common_vendor.o(($event) => $options.selectAttr(attr_index, item_index), item_index)
          };
        }),
        c: attr_index
      };
    })
  } : {}, {
    j: common_vendor.o(($event) => $options.sub()),
    k: !$options.issub ? 1 : "",
    l: $data.form.show_sku.sum,
    m: common_vendor.o(($event) => $data.form.show_sku.sum = $event.detail.value),
    n: !$options.isadd ? 1 : "",
    o: common_vendor.o(($event) => $options.add()),
    p: !$data.clock
  }, !$data.clock ? {
    q: common_vendor.o(($event) => $options.confirmFunc($data.form))
  } : {}, {
    r: common_vendor.o(() => {
    }),
    s: common_vendor.n($data.Visible ? "product-popup open" : "product-popup close"),
    t: common_vendor.o(() => {
    }),
    v: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/product/detail/popup/spec.vue"]]);
wx.createComponent(Component);
