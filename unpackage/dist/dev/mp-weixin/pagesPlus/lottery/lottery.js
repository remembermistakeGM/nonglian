"use strict";
const common_vendor = require("../../common/vendor.js");
const popup = () => "../../components/uni-popup.js";
const AlmostLottery = () => "../../uni_modules/almost-lottery/components/almost-lottery/almost-lottery.js";
const uniLoadMore = () => "../../components/uni-load-more.js";
const _sfc_main = {
  components: {
    AlmostLottery,
    popup,
    uniLoadMore
  },
  data() {
    return {
      loading: true,
      finish: false,
      times: 0,
      points: "",
      user_points: "",
      bg_image: "",
      content: "",
      // 以下是奖品配置数据
      // 奖品数据
      prizeList: [],
      // 奖品是否设有库存
      onStock: true,
      // 中奖下标
      prizeIndex: -1,
      result: {},
      listData: [],
      /*样式*/
      styleValue: "",
      /*当前角标*/
      index_num: 0,
      /*高度*/
      lineHeight: 0,
      /*最大数*/
      maxSize: 0,
      /*时间*/
      timer: null,
      isPopup: false,
      isRecord: false,
      recordList: [],
      list_rows: 10,
      last_page: 0,
      /*当前页面*/
      page: 1,
      /*没有更多*/
      no_more: false,
      isRule: false
    };
  },
  computed: {
    /*加载中状态*/
    loadingType() {
      if (this.loading) {
        return 1;
      } else {
        if (this.recordList.length != 0 && this.no_more) {
          return 2;
        } else {
          return 0;
        }
      }
    }
  },
  onShow() {
    this.isRecord = false;
    this.restoreData();
    this.handleInitCanvas();
  },
  methods: {
    /*初始化*/
    init() {
      let self = this;
      if (this.listData.length > 1) {
        common_vendor.index.getSystemInfo({
          success(res) {
            self.lineHeight = res.windowWidth / 750 * 60;
            self.maxSize = self.listData.length;
            self.timer = setInterval(function() {
              self.animation();
            }, 3e3);
          }
        });
      }
    },
    /*动画*/
    animation() {
      let self = this;
      self.index_num++;
      if (self.index_num >= self.maxSize) {
        self.index_num = 0;
      }
      this.styleValue = -self.lineHeight * self.index_num;
    },
    async getPrizeList() {
      common_vendor.index.showLoading({
        title: "奖品准备中..."
      });
      this.loading = true;
      let res = await this.requestApiGetPrizeList();
      if (res.ok) {
        let data = res.data;
        if (data.length) {
          this.prizeList = data;
        }
      } else {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "获取奖品失败"
        });
      }
    },
    requestApiGetPrizeList() {
      let self = this;
      return new Promise((resolve, reject) => {
        self._post("plus.lottery.Lottery/getLottery", {}, function(res) {
          self.loading = false;
          self.bg_image = res.data.data.file_path;
          self.content = res.data.data.content;
          self.prizeList = res.data.data.prize;
          self.listData = res.data.recordList;
          self.listData.forEach((item, index) => {
            let num = self.GetDateDiff(item.create_time);
            let user = item.user ? item.user.nickName : "匿名用户";
            item.showText = num + user + "抽中了" + item.record_name;
          });
          self.times = res.data.nums;
          self.points = res.data.data.points;
          self.user_points = res.data.data.user_points;
          self.init();
          resolve({
            ok: true,
            data: self.prizeList
          });
        });
      });
    },
    GetDateDiff(startTime) {
      var t2 = startTime;
      var aftert2 = new Date(t2.replace(/-/g, "/"));
      var data = /* @__PURE__ */ new Date();
      let times = data.getTime() - aftert2.getTime();
      var days = parseInt(times / (24 * 1e3 * 3600));
      var leave = times % (24 * 3600 * 1e3);
      var h = parseInt(leave / (3600 * 1e3));
      var h_leave = leave % (3600 * 1e3);
      var min = parseInt(h_leave / (60 * 1e3));
      var min_leave = h_leave % (60 * 1e3);
      var sec = parseInt(min_leave / 1e3);
      let text = "";
      if (days > 0) {
        text = `${days}天前`;
      } else if (h > 0) {
        text = `${h}小时前`;
      } else if (min > 0) {
        text = `${min}分钟前`;
      } else {
        text = `${sec}秒前`;
      }
      console.log(days);
      return text;
    },
    // 重新生成
    handleInitCanvas() {
      this.prizeList = [];
      this.getPrizeList();
    },
    // 本次抽奖开始
    handleDrawStart() {
      console.log("start");
      let self = this;
      if (self.loading || !self.finish) {
        return;
      }
      if (self.times <= 0) {
        self.showError("次数不足");
        return;
      }
      self.loading = true;
      self._post(
        "plus.lottery.Lottery/draw",
        {},
        function(res) {
          self.times--;
          self.loading = false;
          self.result = res.data.result;
          let list = [...self.prizeList];
          let prizeId = res.data.result.prize_id;
          for (let i = 0; i < list.length; i++) {
            let item = list[i];
            if (item.prize_id === prizeId) {
              self.prizeIndex = i;
              break;
            }
          }
          console.log("本次抽中奖品 =>", self.prizeList[self.prizeIndex].name);
        },
        function(err) {
          self.loading = false;
        }
      );
    },
    hidePopup() {
      this.isPopup = false;
    },
    hideRecordPopup() {
      this.isRecord = false;
    },
    // 本次抽奖结束
    handleDrawEnd() {
      this.isPopup = true;
      this.handleInitCanvas();
    },
    // 抽奖转盘绘制完成
    handleDrawFinish(res) {
      this.finish = true;
    },
    /*还原初始化*/
    restoreData() {
      this.recordList = [];
      this.page = 1;
      this.no_more = false;
      this.last_page = 1;
    },
    getList() {
      let self = this;
      self.loading = true;
      self._post(
        "plus.lottery.Lottery/record",
        {
          list_rows: self.list_rows,
          page: self.page || 1
        },
        function(res) {
          self.loading = false;
          self.recordList = self.recordList.concat(res.data.list.data);
          self.last_page = res.data.list.last_page;
          if (res.data.list.last_page <= 1) {
            self.no_more = true;
          }
        }
      );
    },
    getRecord() {
      this.restoreData();
      this.getList();
      this.isRecord = true;
    },
    /*可滚动视图区域到底触发*/
    scrolltolowerFunc() {
      let self = this;
      self.page++;
      self.loading = true;
      if (self.page > self.last_page) {
        self.loading = false;
        self.no_more = true;
        return;
      }
      self.getList();
    }
  }
};
if (!Array) {
  const _easycom_almost_lottery2 = common_vendor.resolveComponent("almost-lottery");
  const _component_popup = common_vendor.resolveComponent("popup");
  (_easycom_almost_lottery2 + _component_popup)();
}
const _easycom_almost_lottery = () => "../../uni_modules/almost-lottery/components/almost-lottery/almost-lottery.js";
if (!Math) {
  _easycom_almost_lottery();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t(_ctx.points_name()),
    b: common_vendor.t($data.user_points),
    c: common_vendor.o(($event) => $data.isRule = true),
    d: common_vendor.t($data.points),
    e: common_vendor.t(_ctx.points_name()),
    f: common_vendor.t($data.times),
    g: $data.prizeList.length
  }, $data.prizeList.length ? {
    h: common_vendor.o(($event) => $data.prizeIndex = -1),
    i: common_vendor.o($options.handleDrawStart),
    j: common_vendor.o($options.handleDrawEnd),
    k: common_vendor.o($options.handleDrawFinish),
    l: common_vendor.p({
      prizeList: $data.prizeList,
      prizeIndex: $data.prizeIndex,
      lotteryBg: "/uni_modules/almost-lottery/static/almost-lottery/almost-lottery__bg.png",
      actionBg: "/uni_modules/almost-lottery/static/almost-lottery/almost-lottery__action.png"
    })
  } : {}, {
    m: common_vendor.o(($event) => _ctx.gotoPage("/pagesPlus/lottery/WinningRecord")),
    n: common_vendor.f($data.listData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.showText),
        b: index
      };
    }),
    o: $data.result.image,
    p: $data.result.type == 3
  }, $data.result.type == 3 ? {
    q: common_vendor.t($data.result.name),
    r: common_vendor.o(($event) => _ctx.gotoPage("/pagesPlus/lottery/WinningRecord"))
  } : {
    s: common_vendor.t($data.result.name)
  }, {
    t: common_vendor.o($options.hidePopup),
    v: common_vendor.p({
      show: $data.isPopup,
      type: "middle",
      backgroundColor: "#ea564c",
      padding: 40,
      width: 638
    }),
    w: common_vendor.t($data.content),
    x: common_vendor.o(($event) => $data.isRule = false),
    y: common_vendor.p({
      show: $data.isRule,
      width: 575,
      height: 550,
      padding: 0,
      backgroundColor: "none"
    }),
    z: common_vendor.s("background-image: url(" + $data.bg_image + ");")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/lottery/lottery.vue"]]);
wx.createPage(MiniProgramPage);
