"use strict";
const env_production = require("./production.js");
var app_url = "";
app_url = env_production.pro_url.url;
console.log("开发环境", "development");
console.log("app_url=" + app_url);
const config = {
  /*服务器地址*/
  app_url,
  /*appid*/
  app_id: 10001,
  //h5发布路径
  h5_addr: "/h5",
  //inonfont 字体url
  font_url: "https://at.alicdn.com/t/c/font_4197023_d7l8bariw5a.ttf?t=1692240335343"
};
exports.config = config;
