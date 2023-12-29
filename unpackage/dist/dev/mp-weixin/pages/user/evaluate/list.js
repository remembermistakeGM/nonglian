"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      loading: false,
      state_active: 0,
      list: [],
      last_page: 0,
      no_more: false,
      page: 1
    };
  },
  onLoad: function(options) {
  },
  onShow: function() {
    this.page = 1;
    this.list = [];
    common_vendor.index.showLoading({
      title: "加载中"
    });
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      self.loading = true;
      self._post(
        "product.comment/userLists",
        {
          page: self.page,
          list_rows: 10
        },
        function(res) {
          if (res.data.list.data && res.data.list.data.length > 0) {
            res.data.list.data.forEach((v) => {
              v.year = v.create_time.substr(0, 4);
              v.mouth = v.create_time.substr(5, 2);
              v.data = v.create_time.substr(8, 2);
            });
          }
          self.list = self.list.concat(res.data.list.data);
          self.last_page = res.data.lastPage;
          self.loading = false;
          if (self.last_page <= 1) {
            self.no_more = true;
            return false;
          }
          common_vendor.index.hideLoading();
        }
      );
    },
    del(v, index) {
      let self = this;
      common_vendor.wx$1.showModal({
        title: "提示",
        content: "您确定删除该评论吗?",
        success: function(o) {
          if (o.confirm) {
            self._post(
              "product.comment/delete",
              {
                comment_id: v.comment_id
              },
              function(res) {
                common_vendor.index.showToast({
                  title: "删除成功",
                  duration: 1e3,
                  icon: "none"
                });
                self.list.splice(index, 1);
              }
            );
          }
        }
      });
    },
    onReachBottom() {
      let self = this;
      if (self.no_more) {
        return;
      }
      self.page++;
      if (self.page <= self.last_page) {
        self.getData();
      } else {
        self.no_more = true;
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.list, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.data),
        b: common_vendor.t(item.mouth),
        c: common_vendor.t(item.year),
        d: common_vendor.o(($event) => $options.del(item, index), index),
        e: common_vendor.t(item.content),
        f: common_vendor.f(item.image, (v, idx, i1) => {
          return {
            a: v.file_path,
            b: idx
          };
        }),
        g: item.OrderProduct
      }, item.OrderProduct ? common_vendor.e({
        h: item.OrderProduct.image
      }, item.OrderProduct.image ? {
        i: item.OrderProduct.image.file_path
      } : {}, {
        j: common_vendor.t(item.OrderProduct.product_name),
        k: common_vendor.t(item.OrderProduct.product_attr)
      }) : {}, {
        l: index
      });
    }),
    b: $data.list.length == 0 && !$data.loading
  }, $data.list.length == 0 && !$data.loading ? {} : {}, {
    c: _ctx.theme(),
    d: common_vendor.n(_ctx.theme() || "")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/evaluate/list.vue"]]);
wx.createPage(MiniProgramPage);
