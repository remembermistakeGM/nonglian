"use strict";
const common_vendor = require("./vendor.js");
require("../env/config.js");
const tabBarLinks = [
  "/pages/index/index",
  "/pages/product/category",
  "/pages/shop/middle",
  "/pages/cart/cart",
  "/pages/user/index/index"
];
const gotopage = (url, type) => {
  console.log(url, "url");
  console.log(type, "type");
  if (!url || url.length == 0) {
    return false;
  }
  if (url.substr(0, 1) !== "/") {
    url = "/" + url;
  }
  let p = url;
  if (url.indexOf("?") != -1) {
    p = url.substr(0, url.indexOf("?"));
  }
  let diyTabBarLinks = common_vendor.index.getStorageSync("TabBar").list;
  let res = diyTabBarLinks.some((item) => {
    if (item.link_url == p) {
      return true;
    }
  });
  if (res) {
    common_vendor.index.reLaunch({
      url
    });
    return;
  }
  if (tabBarLinks.indexOf(p) > -1) {
    common_vendor.index.reLaunch({
      url
    });
  } else {
    if (type == "redirect") {
      common_vendor.index.redirectTo({
        url
      });
      return;
    }
    if (type == "reLaunch") {
      common_vendor.index.reLaunch({
        url
      });
      return;
    }
    common_vendor.index.navigateTo({
      url
    });
  }
};
exports.gotopage = gotopage;
