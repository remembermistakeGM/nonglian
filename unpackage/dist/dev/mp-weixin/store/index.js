"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  // 全局属性变量
  state: {
    // state的作用是定义属性变量。定义一个参数
    theme: common_vendor.index.getStorageSync("theme") || 0,
    footTab: "",
    points_name: "积分"
  },
  // 全局同步方法，在methods{this.$store.commit("changeTheme")}
  mutations: {
    changeTheme(state, value) {
      state.theme = value;
    },
    changefootTab(state, value) {
      state.footTab = value;
    },
    changePoints(state, value) {
      state.points_name = value;
    }
  },
  getters: {},
  actions: {}
});
exports.store = store;
