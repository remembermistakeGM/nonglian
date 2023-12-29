"use strict";
const common_vendor = require("../../common/vendor.js");
const common_utils = require("../../common/utils.js");
const _sfc_main = {
  data() {
    return {
      /*是否正在加载*/
      loading: true,
      /*星期*/
      weeklist: ["日", "一", "二", "三", "四", "五", "六"],
      /*天数列表*/
      daylist: [],
      /*年*/
      year: null,
      /*今天的年份*/
      today_year: null,
      /*月*/
      month: null,
      /*今天的年份*/
      today_month: null,
      /*天*/
      day: null,
      /*今天的年份*/
      today_day: null,
      /*当月签到的数据*/
      list: [],
      /*奖励天数*/
      reward: [],
      /*当月连续签到的天数*/
      days: 0,
      /*当天日期*/
      today: 0,
      /*今天是否签到*/
      is_sign: false,
      /*签到额外积分*/
      point: [],
      rule: ""
    };
  },
  mounted() {
    this.init();
  },
  onShow() {
    this.getData();
    this.getRule();
  },
  methods: {
    getRule() {
      let self = this;
      self._get("plus.sign.sign/getSign", {}, function(res) {
        res.data.detail = common_utils.utils.format_content(res.data.detail);
        self.rule = res.data.detail;
      });
    },
    /*获取数据*/
    getData() {
      let self = this;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      self._get("plus.sign.sign/index", {}, function(res) {
        self.list = res.data.list[0];
        self.days = res.data.list[1];
        self.today = res.data.list[2];
        self.reward = res.data.arr;
        self.point = res.data.point;
        if (self.list.indexOf(self.day) >= 0) {
          self.is_sign = true;
        }
        self.loading = false;
        common_vendor.index.hideLoading();
      });
    },
    /*签到*/
    onSign() {
      let self = this;
      if (self.is_sign) {
        common_vendor.index.showToast({
          title: "今天已签到",
          duration: 2e3
        });
        return false;
      }
      common_vendor.index.showLoading({
        title: "正在提交",
        mask: true
      });
      self._get("plus.sign.sign/add", {}, function(res) {
        common_vendor.index.hideLoading();
        self.showSuccess(res.data.msg, function() {
          self.getData();
        });
      });
    },
    /*初始化*/
    init() {
      if (this.year === null && this.month === null && this.day === null) {
        let nowDate = /* @__PURE__ */ new Date();
        this.year = nowDate.getFullYear();
        this.today_year = nowDate.getFullYear();
        this.month = nowDate.getMonth();
        this.today_month = nowDate.getMonth() + 1;
        this.day = nowDate.getDate();
        this.today_day = nowDate.getDate();
      }
      this.joinDay();
    },
    /*组合天*/
    joinDay() {
      let res = [];
      let currentMonth = this.getMonthCount(this.year, this.month);
      let preMonth = this.getPreMonthCount(this.year, this.month);
      let nextMonth = this.getNextMonthCount(this.year, this.month);
      let whereMonday = this.getWeekday(this.year, this.month);
      let preArr = [];
      if (whereMonday != 0) {
        preArr = preMonth.slice(-1 * whereMonday);
      }
      let nextArr = nextMonth.slice(0, 42 - currentMonth.length - whereMonday);
      let preArrList = this.numConvertNode(preArr, "pre");
      let currentMonthList = this.numConvertNode(currentMonth, null);
      let nextArrList = this.numConvertNode(nextArr, "next");
      res = [].concat(preArrList, currentMonthList, nextArrList);
      this.daylist = res;
    },
    /*天数转换*/
    numConvertNode(arr, type) {
      let _type = 0;
      let list = [];
      let len = arr.length;
      if (type != null) {
        if (type == "pre") {
          _type = -1;
        } else {
          _type = 1;
          if (len > 7) {
            len = len - 7;
          }
        }
      }
      for (let i = 0; i < len; i++) {
        let node = {
          type: _type,
          day: arr[i]
        };
        list.push(node);
      }
      return list;
    },
    /*判断是否闰年*/
    isLeapYear(year) {
      return year % 400 === 0 || year % 100 !== 0 && year % 4 === 0;
    },
    /*获得每个月的日期有多少，注意 month - [0-11]*/
    getMonthCount(year, month) {
      let arr = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let count = arr[month] || (this.isLeapYear(year) ? 29 : 28);
      return Array.from(new Array(count), (item, value) => value + 1);
    },
    /*获得某年某月的 1号 是星期几，这里要注意的是 JS 的 API-getDay() 是从 [日-六](0-6)，返回 number*/
    getWeekday(year, month) {
      let date = new Date(year, month, 1);
      return date.getDay();
    },
    /*获得上个月的天数*/
    getPreMonthCount(year, month) {
      if (month === 0) {
        return this.getMonthCount(year - 1, 11);
      } else {
        return this.getMonthCount(year, month - 1);
      }
    },
    /*获得下个月的天数*/
    getNextMonthCount(year, month) {
      if (month === 11) {
        return this.getMonthCount(year + 1, 0);
      } else {
        return this.getMonthCount(year, month + 1);
      }
    },
    /*跳转规则页面*/
    gotoRuleFunc() {
      this.gotoPage("/pagesPlus/signin/rule/rule");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.loading
  }, !$data.loading ? common_vendor.e({
    b: $data.reward.length > 0 && $data.reward[0] >= 1
  }, $data.reward.length > 0 && $data.reward[0] >= 1 ? {
    c: common_vendor.t($data.reward[0]),
    d: common_vendor.t($data.point[$data.reward[0]]),
    e: common_vendor.t(_ctx.points_name())
  } : {}, {
    f: $data.reward.length > 0 && $data.reward[0] == 1 && !$data.is_sign
  }, $data.reward.length > 0 && $data.reward[0] == 1 && !$data.is_sign ? {} : {}, {
    g: common_vendor.t($data.days),
    h: !$data.is_sign
  }, !$data.is_sign ? {
    i: common_vendor.o((...args) => $options.onSign && $options.onSign(...args))
  } : {}, {
    j: common_vendor.t($data.today_year),
    k: common_vendor.t($data.today_month),
    l: common_vendor.f($data.weeklist, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    m: common_vendor.f($data.daylist, (item, index, i0) => {
      return common_vendor.e({
        a: $data.list.indexOf(item.day) > -1 && item.type == 0
      }, $data.list.indexOf(item.day) > -1 && item.type == 0 ? {
        b: common_vendor.t(item.day)
      } : {}, {
        c: $data.list.indexOf(item.day) == -1
      }, $data.list.indexOf(item.day) == -1 ? common_vendor.e({
        d: $data.reward.indexOf(item.day - $data.today) > -1 && item.type == 0
      }, $data.reward.indexOf(item.day - $data.today) > -1 && item.type == 0 ? {} : {}, {
        e: item.type == 0 && $data.reward.indexOf(item.day - $data.today) == -1
      }, item.type == 0 && $data.reward.indexOf(item.day - $data.today) == -1 ? {
        f: common_vendor.t(item.day)
      } : {}) : {}, {
        g: common_vendor.n(item.type != 0 ? "secondary-date-item" : ""),
        h: index
      });
    }),
    n: $data.rule,
    o: _ctx.theme(),
    p: common_vendor.n(_ctx.theme() || "")
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/p/nc/nc_app/pagesPlus/signin/signin.vue"]]);
wx.createPage(MiniProgramPage);
