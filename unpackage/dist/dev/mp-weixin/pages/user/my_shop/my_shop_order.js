"use strict";
const common_vendor = require("../../../common/vendor.js");
const uniLoadMore = () => "../../../components/uni-load-more.js";
const Popup = () => "../../../components/uni-popup.js";
const _sfc_main = {
  components: {
    uniLoadMore,
    Popup
  },
  data() {
    return {
      /*手机高度*/
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      /*状态选中*/
      state_active: 0,
      /*顶部刷新*/
      topRefresh: false,
      /*数据*/
      listData: [],
      /*数据类别*/
      dataType: "all",
      /*订单id*/
      order_id: 0,
      /*最后一页码数*/
      last_page: 0,
      /*当前页面*/
      page: 1,
      /*每页条数*/
      list_rows: 10,
      /*有没有等多*/
      no_more: false,
      /*是否正在加载*/
      loading: true,
      shop_supplier_id: "",
      isClose: false,
      cancel_remark: "",
      order_no: ""
    };
  },
  computed: {
    /*加载中状态*/
    loadingType() {
      if (this.loading) {
        return 1;
      } else {
        if (this.listData.length != 0 && this.no_more) {
          return 2;
        } else {
          return 0;
        }
      }
    }
  },
  onLoad(e) {
    this.shop_supplier_id = e.shop_supplier_id;
    if (typeof e.dataType != "undefined") {
      this.dataType = e.dataType;
    }
    if (this.dataType == "payment") {
      this.state_active = 1;
    } else if (this.dataType == "delivery") {
      this.state_active = 2;
    } else if (this.dataType == "received") {
      this.state_active = 3;
    }
  },
  mounted() {
    this.init();
  },
  onShow() {
    this.initData();
    this.getData();
  },
  methods: {
    /*初始化*/
    init() {
      let self = this;
      common_vendor.index.getSystemInfo({
        success(res) {
          self.phoneHeight = res.windowHeight;
          let view = common_vendor.index.createSelectorQuery().select(".top-tabbar");
          view.boundingClientRect((data) => {
            let h = self.phoneHeight - data.height;
            self.scrollviewHigh = h;
          }).exec();
        }
      });
    },
    initData() {
      let self = this;
      self.page = 1;
      self.loading = true;
      self.listData = [];
      self.no_more = false;
    },
    /*状态切换*/
    stateFunc(e) {
      let self = this;
      if (self.state_active != e) {
        self.page = 1;
        self.loading = true;
        self.state_active = e;
        switch (e) {
          case 0:
            self.listData = [];
            self.dataType = "all";
            break;
          case 1:
            self.listData = [];
            self.dataType = "payment";
            break;
          case 2:
            self.listData = [];
            self.dataType = "delivery";
            break;
          case 3:
            self.listData = [];
            self.dataType = "received";
            break;
          case 4:
            self.listData = [];
            self.dataType = "comment";
            break;
        }
        self.getData();
      }
    },
    /*可滚动视图区域到底触发*/
    scrolltolowerFunc() {
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
    },
    /*获取数据*/
    getData() {
      let self = this;
      self.loading = true;
      let dataType = self.dataType;
      self._get(
        "supplier.order/index",
        {
          shop_supplier_id: self.shop_supplier_id,
          dataType,
          page: self.page,
          list_rows: self.list_rows,
          pay_source: self.getPlatform()
        },
        function(res) {
          self.loading = false;
          self.listData = self.listData.concat(res.data.list.data);
          self.last_page = res.data.list.last_page;
          if (res.data.list.last_page <= 1) {
            self.no_more = true;
          } else {
            self.no_more = false;
          }
        }
      );
    },
    /*跳转页面*/
    jumpPage(e) {
      this.gotoPage("/pages/order/order-detail?source=supplier&order_id=" + e);
    },
    /* 打开取消订单 */
    openClose(e) {
      this.isClose = true;
      this.order_no = e;
    },
    sendClose() {
      let self = this;
      let order_no = self.order_no;
      common_vendor.wx$1.showModal({
        title: "提示",
        content: "您确定要取消订单吗?",
        success: function(o) {
          if (o.confirm) {
            self.isClose = false;
            common_vendor.index.showLoading({
              title: "正在处理"
            });
            self._get(
              "supplier.order/orderCancel",
              {
                order_no,
                cancel_remark: self.cancel_remark
              },
              function(res) {
                common_vendor.index.hideLoading();
                common_vendor.index.showToast({
                  title: "操作成功",
                  duration: 2e3,
                  icon: "success"
                });
                self.listData = [];
                self.getData();
              }
            );
          }
        }
      });
    },
    /*关闭取消订单 */
    hideClose(e) {
      this.isClose = false;
    }
  }
};
if (!Array) {
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  const _component_Popup = common_vendor.resolveComponent("Popup");
  (_component_uni_load_more + _component_Popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.n($data.state_active == 0 ? "tab-item active" : "tab-item"),
    b: common_vendor.o(($event) => $options.stateFunc(0)),
    c: common_vendor.n($data.state_active == 1 ? "tab-item active" : "tab-item"),
    d: common_vendor.o(($event) => $options.stateFunc(1)),
    e: common_vendor.n($data.state_active == 2 ? "tab-item active" : "tab-item"),
    f: common_vendor.o(($event) => $options.stateFunc(2)),
    g: common_vendor.n($data.state_active == 3 ? "tab-item active" : "tab-item"),
    h: common_vendor.o(($event) => $options.stateFunc(3)),
    i: common_vendor.n($data.state_active == 4 ? "tab-item active" : "tab-item"),
    j: common_vendor.o(($event) => $options.stateFunc(4)),
    k: common_vendor.f(3, (circle, n, i0) => {
      return {
        a: n
      };
    }),
    l: common_vendor.n($data.topRefresh ? "top-refresh open" : "top-refresh"),
    m: common_vendor.f($data.listData, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.order_source_text),
        b: common_vendor.t(item.order_no),
        c: common_vendor.t(item.state_text),
        d: item.product.length > 1
      }, item.product.length > 1 ? {
        e: common_vendor.f(item.product, (img, num, i1) => {
          return {
            a: img.image.file_path,
            b: num
          };
        }),
        f: common_vendor.t(item.pay_price),
        g: common_vendor.t(item.product.length),
        h: common_vendor.o(($event) => $options.jumpPage(item.order_id), index)
      } : {
        i: common_vendor.f(item.product, (img, num, i1) => {
          return {
            a: img.image.file_path,
            b: num
          };
        }),
        j: common_vendor.t(item.product[0].product_name),
        k: common_vendor.t(item.pay_price),
        l: common_vendor.t(item.product[0].total_num),
        m: common_vendor.o(($event) => $options.jumpPage(item.order_id), index)
      }, {
        n: item.pay_status.value == 20 && item.delivery_status.value == 10 && item.order_status.value == 10
      }, item.pay_status.value == 20 && item.delivery_status.value == 10 && item.order_status.value == 10 ? {
        o: common_vendor.o(($event) => $options.openClose(item.order_no), index)
      } : {}, {
        p: item.pay_status.value == 20 && item.delivery_type.value == 10 && item.order_status.value == 10 && item.delivery_status.value == 10
      }, item.pay_status.value == 20 && item.delivery_type.value == 10 && item.order_status.value == 10 && item.delivery_status.value == 10 ? {
        q: common_vendor.o(($event) => $options.jumpPage(item.order_id), index)
      } : {}, {
        r: item.pay_status.value == 20 && item.order_status.value == 21
      }, item.pay_status.value == 20 && item.order_status.value == 21 ? {
        s: common_vendor.o(($event) => $options.jumpPage(item.order_id), index)
      } : {}, {
        t: index
      });
    }),
    n: $data.listData.length == 0 && !$data.loading
  }, $data.listData.length == 0 && !$data.loading ? {} : {
    o: common_vendor.p({
      loadingType: $options.loadingType
    })
  }, {
    p: common_vendor.s("height:" + $data.scrollviewHigh + "px;"),
    q: common_vendor.o((...args) => $options.scrolltolowerFunc && $options.scrolltolowerFunc(...args)),
    r: common_vendor.t($data.order_no),
    s: $data.cancel_remark,
    t: common_vendor.o(($event) => $data.cancel_remark = $event.detail.value),
    v: common_vendor.o((...args) => $options.hideClose && $options.hideClose(...args)),
    w: common_vendor.o(($event) => $options.sendClose()),
    x: common_vendor.o($options.hideClose),
    y: common_vendor.p({
      show: $data.isClose,
      type: "middle"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pages/user/my_shop/my_shop_order.vue"]]);
wx.createPage(MiniProgramPage);
