"use strict";
const common_vendor = require("../../../common/vendor.js");
const setStore = (name, content) => {
  if (!name)
    return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  common_vendor.index.setStorageSync(name, content);
};
const getStore = (name) => {
  if (!name)
    return;
  return common_vendor.index.getStorageSync(name);
};
const clearStore = (name) => {
  if (name) {
    common_vendor.index.removeStorageSync(name);
  } else {
    console.log("清理本地全部缓存");
    common_vendor.index.clearStorageSync();
  }
};
const clacTextLen = (text) => {
  if (!text)
    return { byteLen: 0, realLen: 0 };
  text += "";
  let clacLen = 0;
  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) < 0 || text.charCodeAt(i) > 255) {
      clacLen += 2;
    } else {
      clacLen += 1;
    }
  }
  return {
    byteLen: clacLen,
    realLen: clacLen / 2
  };
};
const downloadFile = (fileUrl) => {
  return new Promise((resolve) => {
    common_vendor.index.downloadFile({
      url: fileUrl,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve({
            ok: true,
            data: res.errMsg,
            tempFilePath: res.tempFilePath
          });
        } else {
          resolve({
            ok: false,
            data: res.errMsg,
            msg: "图片下载失败"
          });
        }
      },
      fail: (err) => {
        resolve({
          ok: false,
          data: err.errMsg,
          msg: "图片下载失败"
        });
      }
    });
  });
};
exports.clacTextLen = clacTextLen;
exports.clearStore = clearStore;
exports.downloadFile = downloadFile;
exports.getStore = getStore;
exports.setStore = setStore;
