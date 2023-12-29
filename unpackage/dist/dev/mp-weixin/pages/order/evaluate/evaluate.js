"use strict";
const common_vendor = require("../../../common/vendor.js");
const Upload = () => "../../../components/upload/upload2.js";
const _sfc_main = {
  components: {
    Upload
  },
  data() {
    return {
      /*是否加载完成*/
      loadding: true,
      order_id: "",
      /*页面数据*/
      tableData: [],
      score: 10,
      /*是否打开上传图片*/
      isUpload: false,
      image_id: [],
      img: "/static/temp/photo.jpg",
      index: "",
      service: [],
      logistics: [],
      describe: []
    };
  },
  onLoad(e) {
    this.order_id = e.order_id;
  },
  mounted() {
    common_vendor.index.showLoading({
      title: "加载中"
    });
    this.getData();
  },
  methods: {
    getData() {
      let self = this;
      let order_id = self.order_id;
      self._get(
        "user.comment/order",
        {
          order_id
        },
        function(res) {
          self.tableData = res.data.productList;
          self.tableData.forEach((item, index) => {
            self.tableData[index].score = 10;
            self.tableData[index].image_list = [];
            self.service.push([false, false, false, false, false]);
            self.logistics.push([false, false, false, false, false]);
            self.describe.push([false, false, false, false, false]);
          });
          self.loadding = false;
          common_vendor.index.hideLoading();
        }
      );
    },
    /*选择评价*/
    gradeFunc(item, e, index) {
      item.score = e;
      this.$set(this.tableData, index, item);
      console.log(this.tableData);
    },
    /* 物流评分 */
    chooseLog(n, m) {
      let self = this;
      self.tableData[m].express_score = 0;
      this.logistics[m].forEach((item, index) => {
        if (index <= n) {
          this.logistics[m].splice(index, 1, true);
          self.tableData[m].express_score++;
        } else {
          this.logistics[m].splice(index, 1, false);
        }
      });
    },
    /* 服务评分 */
    chooseServ(n, m) {
      let self = this;
      self.tableData[m].server_score = 0;
      this.service[m].forEach((item, index) => {
        if (index <= n) {
          this.service[m].splice(index, 1, true);
          self.tableData[m].server_score++;
        } else {
          this.service[m].splice(index, 1, false);
        }
      });
      console.log(self.tableData);
    },
    /* 描述评分 */
    choosees(n, m) {
      let self = this;
      self.tableData[m].describe_score = 0;
      this.describe[m].forEach((item, index) => {
        if (index <= n) {
          this.describe[m].splice(index, 1, true);
          self.tableData[m].describe_score++;
        } else {
          this.describe[m].splice(index, 1, false);
        }
      });
      console.log(self.tableData);
    },
    /*提交*/
    formSubmit: function(e) {
      let self = this;
      let order_id = self.order_id;
      let formData = [];
      this.tableData.forEach((item, index) => {
        formData[index] = {
          order_product_id: item.order_product_id,
          product_id: item.product_id,
          score: item.score,
          image_list: item.image_list,
          express_score: item.express_score,
          server_score: item.server_score,
          describe_score: item.describe_score,
          content: ""
        };
        if (item.content) {
          formData[index].content = item.content;
        }
      });
      console.log(formData);
      self._post(
        "user.comment/order",
        {
          order_id,
          formData: JSON.stringify(formData)
        },
        function(res) {
          self.showSuccess("评价成功！", function() {
            self.gotoPage("/pages/order/myorder", "redirect");
          });
        }
      );
    },
    /*打开上传图片*/
    openUpload(index) {
      this.isUpload = false;
      this.index = index;
      this.isUpload = true;
    },
    /*获取上传的图片*/
    getImgsFunc(e) {
      let self = this;
      if (e && typeof e != "undefined") {
        let index = self.index;
        self.tableData[index].image_list = self.tableData[index].image_list.concat(e);
      }
      self.isUpload = false;
    },
    /*点击图片删除*/
    deleteImg(i, n) {
      let data = this.tableData[i];
      data.image_list.splice(n, 1);
      this.$set(this.tableData, i, data);
    }
  }
};
if (!Array) {
  const _component_Upload = common_vendor.resolveComponent("Upload");
  _component_Upload();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loadding
  }, !$data.loadding ? common_vendor.e({
    b: common_vendor.f($data.tableData, (item, index, i0) => {
      return common_vendor.e({
        a: item.image.file_path,
        b: common_vendor.t(item.product_name),
        c: common_vendor.t(item.product_price),
        d: common_vendor.f($data.describe[index], (itemEv, indexEv, i1) => {
          return {
            a: indexEv,
            b: common_vendor.n(itemEv ? "icon iconfont icon-start" : "icon iconfont icon-start1"),
            c: common_vendor.o(($event) => $options.choosees(indexEv, index), indexEv)
          };
        }),
        e: common_vendor.f($data.service[index], (itemEv, indexEv, i1) => {
          return {
            a: indexEv,
            b: common_vendor.n(itemEv ? "icon iconfont icon-start" : "icon iconfont icon-start1"),
            c: common_vendor.o(($event) => $options.chooseServ(indexEv, index), indexEv)
          };
        }),
        f: common_vendor.f($data.logistics[index], (itemEv, indexEv, i1) => {
          return {
            a: indexEv,
            b: common_vendor.n(itemEv ? "icon iconfont icon-start" : "icon iconfont icon-start1"),
            c: common_vendor.o(($event) => $options.chooseLog(indexEv, index), indexEv)
          };
        }),
        g: common_vendor.n(item.score == 10 ? "flex-1 d-c-c active" : "flex-1 d-c-c"),
        h: common_vendor.o(($event) => $options.gradeFunc(item, 10, index), index),
        i: common_vendor.n(item.score == 20 ? "flex-1 d-c-c active" : "flex-1 d-c-c"),
        j: common_vendor.o(($event) => $options.gradeFunc(item, 20, index), index),
        k: common_vendor.n(item.score == 30 ? "flex-1 d-c-c active" : "flex-1 d-c-c"),
        l: common_vendor.o(($event) => $options.gradeFunc(item, 30, index), index),
        m: item.content,
        n: common_vendor.o(($event) => item.content = $event.detail.value, index),
        o: common_vendor.f(item.image_list, (imgs, img_num, i1) => {
          return {
            a: imgs.file_path,
            b: img_num,
            c: common_vendor.o(($event) => $options.deleteImg(index, img_num), img_num)
          };
        }),
        p: item.image_list.length < 9
      }, item.image_list.length < 9 ? {
        q: common_vendor.o(($event) => $options.openUpload(index), index)
      } : {}, {
        r: index
      });
    }),
    c: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args)),
    d: common_vendor.o((...args) => _ctx.formReset && _ctx.formReset(...args)),
    e: $data.isUpload
  }, $data.isUpload ? {
    f: common_vendor.o($options.getImgsFunc)
  } : {}) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/order/evaluate/evaluate.vue"]]);
wx.createPage(MiniProgramPage);
