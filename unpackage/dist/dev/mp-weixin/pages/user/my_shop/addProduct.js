"use strict";
const common_vendor = require("../../../common/vendor.js");
const pages_user_my_shop_product_rule = require("./product_rule.js");
const Upload = () => "../../../components/upload/upload2.js";
const _sfc_main = {
  components: {
    Upload
  },
  data() {
    return {
      product_id: 0,
      activeSpec: 0,
      form: {
        product_name: "",
        image: [],
        video: {},
        video_id: 0,
        poster: {},
        poster_id: 0,
        selling_point: "",
        product_status: 10,
        audit_status: 0,
        category_id: 0,
        is_virtual: 0,
        product_sort: 0,
        limit_num: 0,
        virtual_auto: 0,
        virtual_content: "",
        is_delivery_free: 0,
        delivery_id: 0,
        is_points_gift: 0,
        is_points_discount: 0,
        max_points_discount: "",
        is_agent: 0,
        is_picture: 1,
        contentImage: [],
        deduct_stock_type: 10,
        spec_type: 10,
        sku: {
          product_no: "",
          product_price: "",
          line_price: "",
          stock_num: "",
          product_weight: ""
          /* 商品重量 */
        },
        spec_many: {
          spec_attr: [],
          spec_list: []
        }
      },
      delivery: [],
      deliveryIndex: -1,
      category: [],
      categoryIndex: -1,
      title: "",
      textType: "",
      showPop: false,
      isContent: false,
      isAdvanced: false,
      isSpec: false,
      specValue: "",
      specName: "",
      popValue: "",
      fileType: "",
      upload_type: "",
      isUpload: "",
      isVideo: false,
      specValuesList: [],
      isMany: false
    };
  },
  onLoad(e) {
    this.product_id = e.product_id || 0;
    this.getData();
  },
  methods: {
    deleteSpec(i) {
      let self = this;
      common_vendor.index.showModal({
        title: "提示",
        content: "确认要删除吗?",
        success(e) {
          if (e.confirm) {
            self.form.spec_many.spec_attr.splice(i, 1);
          }
        }
      });
    },
    deleteSpecValue(i, ci) {
      let self = this;
      common_vendor.index.showModal({
        title: "提示",
        content: "确认要删除吗?",
        success(e) {
          if (e.confirm) {
            self.form.spec_many.spec_attr[i].spec_items.splice(ci, 1);
          }
        }
      });
    },
    addApecValue(i) {
      let self = this;
      let spec_value = this.specValuesList[i];
      if (!spec_value) {
        common_vendor.index.showToast({
          title: "请输入规格值",
          icon: "none"
        });
        return;
      }
      self._post(
        "supplier.Spec/addSpecValue",
        {
          spec_id: self.form.spec_many.spec_attr[i].group_id,
          spec_value
        },
        (res) => {
          self.form.spec_many.spec_attr[i].spec_items.push({
            item_id: res.data.spec_value_id,
            spec_value
          });
          self.specValuesList[i] = "";
        },
        (fail) => {
          self.specValuesList[i] = "";
        }
      );
    },
    addSpec() {
      let self = this;
      self.isSpec = true;
    },
    getData() {
      let self = this;
      let url = "supplier.Product/add";
      let params = {};
      if (self.product_id) {
        url = "supplier.Product/edit";
        params.product_id = self.product_id;
      }
      self._get(url, params, (res) => {
        let arr = [];
        let category = [];
        category = res.data.category;
        if (category.length > 0) {
          category.forEach((item, index) => {
            arr.push({ name: item.name, category_id: item.category_id });
            if (item.child && item.child.length > 0) {
              item.child.forEach((citem, cindex) => {
                arr.push({ name: item.name + "—" + citem.name, category_id: citem.category_id });
              });
            }
          });
        }
        self.category = arr;
        self.delivery = res.data.delivery;
        if (self.product_id) {
          Object.assign(self.form, res.data.model);
          self.form.product_status = res.data.model.product_status.value;
          if (res.data.specData) {
            self.$set(self.form, "spec_many", res.data.specData);
          } else {
            self.$set(self.form, "spec_many", {
              spec_attr: [],
              spec_list: []
            });
            self.form.sku = res.data.model.sku[0];
          }
          if (self.form.delivery_id == 0) {
            self.$set(self.form, "is_delivery_free", 0);
          } else {
            self.$set(self.form, "is_delivery_free", 1);
          }
          if (res.data.audit_setting.edit_audit == 1 && self.product_id) {
            self.form.audit_status = 0;
          }
          self.category.forEach((item, index) => {
            if (item.category_id == self.form.category_id) {
              self.categoryIndex = index;
              return;
            }
          });
          self.delivery.forEach((item, index) => {
            if (item.delivery_id == self.form.delivery_id) {
              self.deliveryIndex = index;
              return;
            }
          });
          console.log(self.deliveryIndex);
        }
      });
    },
    submitFunc() {
      let self = this;
      let params = self.form;
      if (self.categoryIndex != -1) {
        params.category_id = self.category[self.categoryIndex].category_id;
      } else {
        common_vendor.index.showToast({
          title: "请选择商品分类",
          icon: "none"
        });
        return;
      }
      let flag = pages_user_my_shop_product_rule.rule.validate(params);
      if (flag) {
        let url = "supplier.Product/add";
        let param = { params: JSON.stringify(params) };
        if (self.product_id) {
          url = "supplier.Product/edit";
          param.product_id = self.product_id;
        }
        self._post(url, param, (res) => {
          common_vendor.index.showModal({
            title: "提示",
            content: res.msg,
            success() {
              common_vendor.index.navigateBack();
            }
          });
        });
      }
      console.log(flag);
    },
    openTextarea(name, title) {
      this.title = title;
      this.textType = name;
      this.popValue = this.form[name];
      this.showPop = true;
    },
    changeType(e, name) {
      this[name + "Index"] = e.detail.value;
      this.form[name + "_id"] = this[name][this[name + "Index"]].delivery_id;
    },
    closeFunc(e) {
      if (e) {
        this.form[this.textType] = this.popValue;
      }
      this.popValue = "";
      this.title = "";
      this.showPop = false;
    },
    closeSpec(e) {
      let self = this;
      if (e) {
        if (self.specName === "" || self.specValue === "") {
          common_vendor.index.showToast({
            title: "请填写规则名或规则值",
            icon: "none"
          });
          return false;
        }
        self._post(
          "supplier.Spec/addSpec",
          {
            spec_name: self.specName,
            spec_value: self.specValue
          },
          (res) => {
            self.form.spec_many.spec_attr.push({
              group_id: res.data.spec_id,
              group_name: self.specName,
              spec_items: [
                {
                  item_id: res.data.spec_value_id,
                  spec_value: self.specValue
                }
              ],
              tempValue: "",
              loading: false
            });
            self.specValue = "";
            self.specName = "";
          },
          (fail) => {
            self.specValue = "";
            self.specName = "";
          }
        );
      }
      this.isSpec = false;
    },
    closeContent(e) {
      this.isContent = false;
    },
    closeMany(e) {
      this.isMany = false;
    },
    closeAdvanced(e) {
      this.isAdvanced = false;
    },
    switchChange(e, name) {
      this.form[name] = e.detail.value ? 1 : 0;
    },
    deleteImg(name, n) {
      let self = this;
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除吗?",
        success(e) {
          if (e.confirm) {
            if (n >= 0) {
              let arr = self.form[name];
              arr.splice(n, 1);
            } else {
              self.form[name] = {};
              self.form[name + "_id"] = 0;
            }
          }
        }
      });
    },
    /*获取上传的图片*/
    getImgsFunc(e) {
      let self = this;
      self.isUpload = false;
      if (e && typeof e != "undefined") {
        if (self.upload_type == "poster") {
          self.form.poster_id = e[0].file_id;
          self.form[self.upload_type] = e[0];
        } else if (self.upload_type == "video") {
          self.form.video_id = e[0].file_id;
          self.form[self.upload_type] = e[0];
        } else if (self.upload_type != "poster") {
          self.form[self.upload_type].push(e[0]);
        } else {
          self.form[self.upload_type] = e[0];
        }
      }
    },
    /*打开上传图片*/
    openUpload(type, fileType) {
      this.upload_type = type;
      this.isVideo = fileType || false;
      this.isUpload = true;
    },
    clearImage(name, n) {
      if (n) {
        this.form[name].splice(n, 1);
      } else {
        this.form[name] = "";
      }
    },
    openMany() {
      this.buildSkulist();
      this.isMany = true;
    },
    /*构建规格组合列表*/
    buildSkulist: function() {
      let self = this;
      let spec_attr = self.form.spec_many.spec_attr;
      let specArr = [];
      for (let i = 0; i < spec_attr.length; i++) {
        specArr.push(spec_attr[i].spec_items);
      }
      let specListTemp = self.calcDescartes(specArr);
      let specList = [];
      for (let i = 0; i < specListTemp.length; i++) {
        let rows = [];
        let specSkuIdAttr = [];
        if (!Array.isArray(specListTemp[i])) {
          rows.push(specListTemp[i]);
        } else {
          rows = specListTemp[i];
        }
        for (let j = 0; j < rows.length; j++) {
          specSkuIdAttr.push(rows[j].item_id);
        }
        specList.push({
          product_sku_id: 0,
          spec_sku_id: specSkuIdAttr.join("_"),
          rows,
          spec_form: {
            product_no: "",
            product_price: "",
            line_price: "",
            stock_num: "",
            product_weight: ""
          }
        });
      }
      if (self.form.spec_many.spec_list.length > 0 && specList.length > 0) {
        for (let i = 0; i < specList.length; i++) {
          let overlap = self.form.spec_many.spec_list.filter(function(val) {
            return val.spec_sku_id === specList[i].spec_sku_id;
          });
          if (overlap.length > 0) {
            specList[i].spec_form = overlap[0].spec_form;
            specList[i].product_sku_id = overlap[0].product_sku_id;
          }
        }
      }
      self.form.spec_many.spec_list = specList;
      console.log(spec_attr);
      console.log(specList);
    },
    /*规格组合*/
    calcDescartes: function(array) {
      if (array.length < 2)
        return array[0] || [];
      return [].reduce.call(array, function(col, set) {
        let res = [];
        col.forEach(function(c) {
          set.forEach(function(s) {
            let t = [].concat(Array.isArray(c) ? c : [c]);
            t.push(s);
            res.push(t);
          });
        });
        return res;
      });
    },
    getSpecName(id) {
      let self = this;
      let list = id.split("_");
      let name = [];
      let spec_attr = self.form.spec_many.spec_attr;
      list.forEach((item, index) => {
        spec_attr.forEach((aitem, aindex) => {
          aitem.spec_items.forEach((sitem, sindex) => {
            if (item == sitem.item_id) {
              name.push(sitem.spec_value);
            }
          });
        });
      });
      return name.join("/");
    }
  }
};
if (!Array) {
  const _component_Upload = common_vendor.resolveComponent("Upload");
  _component_Upload();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.form.product_name.length + "/60"),
    b: $data.form.product_name,
    c: common_vendor.o(($event) => $data.form.product_name = $event.detail.value),
    d: common_vendor.f($data.form.image, (item, index, i0) => {
      return {
        a: item.file_path,
        b: common_vendor.o(($event) => $options.deleteImg("image", index), index),
        c: index
      };
    }),
    e: common_vendor.o(($event) => $options.openUpload("image")),
    f: !$data.form.video_id
  }, !$data.form.video_id ? {
    g: common_vendor.o(($event) => $options.openUpload("video", true))
  } : {}, {
    h: $data.form.video_id
  }, $data.form.video_id ? {
    i: $data.form.video.file_path,
    j: common_vendor.o(($event) => $options.deleteImg("video"))
  } : {}, {
    k: !$data.form.poster_id
  }, !$data.form.poster_id ? {
    l: common_vendor.o(($event) => $options.openUpload("poster"))
  } : {}, {
    m: $data.form.poster_id
  }, $data.form.poster_id ? {
    n: $data.form.poster.file_path,
    o: common_vendor.o(($event) => $options.deleteImg("poster"))
  } : {}, {
    p: common_vendor.t($data.categoryIndex == -1 ? "请选择" : $data.category[$data.categoryIndex].name),
    q: $data.category,
    r: common_vendor.o(($event) => $options.changeType($event, "category")),
    s: $data.form.product_status == 10 ? 1 : "",
    t: common_vendor.o(($event) => $data.form.product_status = 10),
    v: $data.form.product_status == 20 ? 1 : "",
    w: common_vendor.o(($event) => $data.form.product_status = 20),
    x: common_vendor.t($data.form.selling_point || "未编辑"),
    y: common_vendor.o(($event) => $options.openTextarea("selling_point", "商品卖点")),
    z: $data.form.is_virtual == 0 ? 1 : "",
    A: common_vendor.o(($event) => $data.form.is_virtual = 0),
    B: $data.form.is_virtual == 1 ? 1 : "",
    C: common_vendor.o(($event) => $data.form.is_virtual = 1),
    D: $data.form.is_virtual == 0
  }, $data.form.is_virtual == 0 ? {
    E: $data.form.is_delivery_free == 0 ? 1 : "",
    F: common_vendor.o(($event) => $data.form.is_delivery_free = 0),
    G: $data.form.is_delivery_free == 1 ? 1 : "",
    H: common_vendor.o(($event) => $data.form.is_delivery_free = 1)
  } : {}, {
    I: $data.form.is_virtual == 0 && $data.form.is_delivery_free == 1
  }, $data.form.is_virtual == 0 && $data.form.is_delivery_free == 1 ? {
    J: common_vendor.t($data.deliveryIndex == -1 ? "请选择" : $data.delivery[$data.deliveryIndex].name),
    K: $data.delivery,
    L: common_vendor.o(($event) => $options.changeType($event, "delivery"))
  } : {}, {
    M: $data.form.product_sort,
    N: common_vendor.o(($event) => $data.form.product_sort = $event.detail.value),
    O: $data.form.limit_num,
    P: common_vendor.o(($event) => $data.form.limit_num = $event.detail.value),
    Q: $data.form.is_virtual == 1
  }, $data.form.is_virtual == 1 ? {
    R: $data.form.virtual_auto == 1 ? 1 : "",
    S: common_vendor.o(($event) => $data.form.virtual_auto = 1),
    T: $data.form.virtual_auto == 0 ? 1 : "",
    U: common_vendor.o(($event) => $data.form.virtual_auto = 0)
  } : {}, {
    V: $data.form.is_virtual == 1
  }, $data.form.is_virtual == 1 ? {
    W: common_vendor.t($data.form.virtual_content || "未编辑"),
    X: common_vendor.o(($event) => $options.openTextarea("virtual_content", "虚拟内容"))
  } : {}, {
    Y: $data.form.deduct_stock_type == 10 ? 1 : "",
    Z: common_vendor.o(($event) => $data.form.deduct_stock_type = 10),
    aa: $data.form.deduct_stock_type == 20 ? 1 : "",
    ab: common_vendor.o(($event) => $data.form.deduct_stock_type = 20),
    ac: $data.form.spec_type == 10 ? 1 : "",
    ad: common_vendor.o(($event) => $data.form.spec_type = 10),
    ae: $data.form.spec_type == 20 ? 1 : "",
    af: common_vendor.o(($event) => $data.form.spec_type = 20),
    ag: $data.form.spec_type == 10
  }, $data.form.spec_type == 10 ? {
    ah: $data.form.sku.product_no,
    ai: common_vendor.o(($event) => $data.form.sku.product_no = $event.detail.value),
    aj: $data.form.sku.product_price,
    ak: common_vendor.o(($event) => $data.form.sku.product_price = $event.detail.value),
    al: $data.form.sku.line_price,
    am: common_vendor.o(($event) => $data.form.sku.line_price = $event.detail.value),
    an: $data.form.sku.stock_num,
    ao: common_vendor.o(($event) => $data.form.sku.stock_num = $event.detail.value),
    ap: $data.form.sku.product_weight,
    aq: common_vendor.o(($event) => $data.form.sku.product_weight = $event.detail.value)
  } : {}, {
    ar: $data.form.spec_type == 20
  }, $data.form.spec_type == 20 ? common_vendor.e({
    as: $data.form.spec_many && $data.form.spec_many.spec_attr.length <= 1
  }, $data.form.spec_many && $data.form.spec_many.spec_attr.length <= 1 ? {
    at: common_vendor.o((...args) => $options.addSpec && $options.addSpec(...args))
  } : {}, {
    av: $data.form.spec_many && $data.form.spec_many.spec_attr.length > 1
  }, $data.form.spec_many && $data.form.spec_many.spec_attr.length > 1 ? {} : {}, {
    aw: $data.form.spec_many && $data.form.spec_many.spec_attr
  }, $data.form.spec_many && $data.form.spec_many.spec_attr ? {
    ax: common_vendor.f($data.form.spec_many.spec_attr, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.group_name),
        b: common_vendor.o(($event) => $options.deleteSpec(index), index),
        c: common_vendor.f(item.spec_items, (aitem, aindex, i1) => {
          return {
            a: common_vendor.t(aitem.spec_value),
            b: common_vendor.o(($event) => $options.deleteSpecValue(index, aindex), aindex),
            c: aindex
          };
        }),
        d: item.spec_items.length <= 1
      }, item.spec_items.length <= 1 ? {
        e: $data.specValuesList[index],
        f: common_vendor.o(($event) => $data.specValuesList[index] = $event.detail.value, index),
        g: common_vendor.o(($event) => $options.addApecValue(index), index)
      } : {}, {
        h: index
      });
    }),
    ay: common_vendor.o((...args) => $options.openMany && $options.openMany(...args))
  } : {}) : {}, {
    az: common_vendor.o(($event) => $data.isContent = true),
    aA: common_vendor.o(($event) => $data.isAdvanced = true),
    aB: common_vendor.o((...args) => $options.submitFunc && $options.submitFunc(...args)),
    aC: $data.showPop
  }, $data.showPop ? {
    aD: common_vendor.o(($event) => $options.closeFunc(null)),
    aE: common_vendor.t($data.title || "标题"),
    aF: $data.popValue,
    aG: common_vendor.o(($event) => $data.popValue = $event.detail.value),
    aH: common_vendor.o(($event) => $options.closeFunc(null)),
    aI: common_vendor.o(($event) => $options.closeFunc(true))
  } : {}, {
    aJ: $data.isSpec
  }, $data.isSpec ? {
    aK: common_vendor.o(($event) => $options.closeSpec(null)),
    aL: $data.specName,
    aM: common_vendor.o(($event) => $data.specName = $event.detail.value),
    aN: $data.specValue,
    aO: common_vendor.o(($event) => $data.specValue = $event.detail.value),
    aP: common_vendor.o(($event) => $options.closeSpec(null)),
    aQ: common_vendor.o(($event) => $options.closeSpec(true))
  } : {}, {
    aR: $data.isContent
  }, $data.isContent ? common_vendor.e({
    aS: common_vendor.o(($event) => $options.closeContent(null)),
    aT: $data.form.is_picture == 1 ? 1 : "",
    aU: common_vendor.o(($event) => $data.form.is_picture = 1),
    aV: $data.form.is_picture == 0 ? 1 : "",
    aW: common_vendor.o(($event) => $data.form.is_picture = 0),
    aX: $data.form.is_picture == 1
  }, $data.form.is_picture == 1 ? {
    aY: common_vendor.f($data.form.contentImage, (item, index, i0) => {
      return {
        a: item.file_path,
        b: common_vendor.o(($event) => $options.deleteImg("contentImage", index), index),
        c: index
      };
    }),
    aZ: common_vendor.o(($event) => $options.openUpload("contentImage"))
  } : {}, {
    ba: common_vendor.o(($event) => $options.closeContent(null)),
    bb: common_vendor.o(($event) => $options.closeContent(true))
  }) : {}, {
    bc: $data.isAdvanced
  }, $data.isAdvanced ? common_vendor.e({
    bd: common_vendor.o(($event) => $options.closeAdvanced(null)),
    be: common_vendor.o(($event) => $options.switchChange($event, "is_points_gift")),
    bf: $data.form.is_points_gift == 1,
    bg: _ctx.getThemeColor(),
    bh: common_vendor.o(($event) => $options.switchChange($event, "is_points_discount")),
    bi: $data.form.is_points_discount == 1,
    bj: _ctx.getThemeColor(),
    bk: $data.form.is_points_discount == 1
  }, $data.form.is_points_discount == 1 ? {
    bl: $data.form.max_points_discount,
    bm: common_vendor.o(($event) => $data.form.max_points_discount = $event.detail.value)
  } : {}, {
    bn: common_vendor.o(($event) => $options.switchChange($event, "is_agent")),
    bo: $data.form.is_agent == 1,
    bp: _ctx.getThemeColor(),
    bq: common_vendor.o(($event) => $options.closeAdvanced(null)),
    br: common_vendor.o(($event) => $options.closeAdvanced(true))
  }) : {}, {
    bs: $data.isMany
  }, $data.isMany ? {
    bt: common_vendor.o(($event) => $options.closeMany(null)),
    bv: common_vendor.f($data.form.spec_many.spec_list, (item, index, i0) => {
      return {
        a: common_vendor.t($options.getSpecName(item.spec_sku_id)),
        b: $data.activeSpec == index ? 1 : "",
        c: common_vendor.o(($event) => $data.activeSpec = index, index),
        d: index
      };
    }),
    bw: common_vendor.f($data.form.spec_many.spec_list, (item, index, i0) => {
      return {
        a: item.spec_form.product_no,
        b: common_vendor.o(($event) => item.spec_form.product_no = $event.detail.value, index),
        c: item.spec_form.product_price,
        d: common_vendor.o(($event) => item.spec_form.product_price = $event.detail.value, index),
        e: item.spec_form.line_price,
        f: common_vendor.o(($event) => item.spec_form.line_price = $event.detail.value, index),
        g: item.spec_form.stock_num,
        h: common_vendor.o(($event) => item.spec_form.stock_num = $event.detail.value, index),
        i: item.spec_form.product_weight,
        j: common_vendor.o(($event) => item.spec_form.product_weight = $event.detail.value, index),
        k: $data.activeSpec != index ? 1 : "",
        l: index
      };
    })
  } : {}, {
    bx: $data.isUpload
  }, $data.isUpload ? {
    by: common_vendor.o($options.getImgsFunc),
    bz: common_vendor.p({
      num: 1,
      isVideo: $data.isVideo
    })
  } : {}, {
    bA: _ctx.theme(),
    bB: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my_shop/addProduct.vue"]]);
wx.createPage(MiniProgramPage);
