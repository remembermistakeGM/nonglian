"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_almostLottery_utils_almostUtils = require("../../utils/almost-utils.js");
const systemInfo = common_vendor.index.getSystemInfoSync();
const _sfc_main = {
  name: "AlmostLottery",
  props: {
    // canvas 宽度
    canvasId: {
      type: String,
      default: "almostLotteryCanvas"
    },
    // canvas 宽度
    canvasWidth: {
      type: Number,
      default: 242
    },
    // canvas 高度
    canvasHeight: {
      type: Number,
      default: 242
    },
    // 转盘外圈的宽度
    outerWidth: {
      type: Number,
      default: 267
    },
    // 转盘外圈的高度
    outerHeight: {
      type: Number,
      default: 267
    },
    // 内圈与外圈的间距
    canvasMargin: {
      type: Number,
      default: 0
    },
    // 抽奖按钮的宽度
    actionWidth: {
      type: Number,
      default: 120
    },
    // 抽奖按钮的高度
    actionHeight: {
      type: Number,
      default: 120
    },
    // 奖品列表
    prizeList: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.length > 1;
      }
    },
    // 中奖奖品在列表中的下标
    prizeIndex: {
      type: Number,
      required: true
    },
    // 奖品区块对应背景颜色
    colors: {
      type: Array,
      default: () => [
        "#fbe7bb",
        "#fcd68c"
      ]
    },
    // 转盘外环背景图
    lotteryBg: {
      type: String,
      default: "/uni_modules/almost-lottery/static/almost-lottery/almost-lottery__bg2x.png"
    },
    // 抽奖按钮背景图
    actionBg: {
      type: String,
      default: "/uni_modules/almost-lottery/static/almost-lottery/almost-lottery__action2x.png"
    },
    // 是否绘制奖品名称
    prizeNameDrawed: {
      type: Boolean,
      default: true
    },
    // 是否开启奖品区块描边
    stroked: {
      type: Boolean,
      default: false
    },
    // 描边颜色
    strokeColor: {
      type: String,
      default: "#FFE9AA"
    },
    // 旋转的类型
    rotateType: {
      type: String,
      default: "roulette"
    },
    // 旋转动画时间 单位s
    duration: {
      type: Number,
      default: 8
    },
    // 旋转的圈数
    ringCount: {
      type: Number,
      default: 8
    },
    // 指针位置
    pointerPosition: {
      type: String,
      default: "edge",
      validator: (value) => {
        return value === "edge" || value === "middle";
      }
    },
    // 文字方向
    strDirection: {
      type: String,
      default: "horizontal"
    },
    // 字体颜色
    strFontColor: {
      type: String,
      default: "#A62A2A"
    },
    // 文字的大小
    strFontSize: {
      type: Number,
      default: 9
    },
    // 奖品文字距离边缘的距离
    strMarginOutside: {
      type: Number,
      default: 0
    },
    // 奖品图片距离奖品文字的距离
    imgMarginStr: {
      type: Number,
      default: 25
    },
    // 奖品文字多行情况下的行高
    strLineHeight: {
      type: Number,
      default: 1.2
    },
    // 奖品名称所对应的 key 值
    strKey: {
      type: String,
      default: "name"
    },
    // 奖品文字总长度限制
    strMaxLen: {
      type: Number,
      default: 12
    },
    // 奖品文字多行情况下第一行文字长度
    strLineLen: {
      type: Number,
      default: 6
    },
    // 奖品图片的宽
    imgWidth: {
      type: Number,
      default: 30
    },
    // 奖品图片的高
    imgHeight: {
      type: Number,
      default: 30
    },
    // 转盘绘制成功的提示
    successMsg: {
      type: String,
      default: "奖品准备就绪，快来参与抽奖吧"
    },
    // 转盘绘制失败的提示
    failMsg: {
      type: String,
      default: "奖品仍在准备中，请稍后再来..."
    },
    // 是否开启画板的缓存
    canvasCached: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 画板className
      className: "almost-lottery__canvas",
      // 画板导出的图片
      lotteryImg: "",
      // 旋转到奖品目标需要的角度
      targetAngle: 0,
      targetActionAngle: 0,
      // 旋转动画时间 单位 s
      transitionDuration: 0,
      // 是否正在旋转
      isRotate: false,
      // 当前停留在那个奖品的序号
      stayIndex: 0,
      // 当前中奖奖品的序号
      targetIndex: 0,
      // 是否存在可用的缓存转盘图
      isCacheImg: false,
      oldLotteryImg: "",
      // 转盘绘制时的提示
      almostLotteryTip: "奖品准备中...",
      // 解决 app 不支持 measureText 的问题
      // app 已在 2.9.3 的版本中提供了对 measureText 的支持，将在后续版本逐渐稳定后移除相关兼容代码
      measureText: ""
    };
  },
  computed: {
    // 高清尺寸
    higtCanvasSize() {
      return this.canvasWidth * systemInfo.pixelRatio;
    },
    // 高清字体
    higtFontSize() {
      return this.strFontSize * systemInfo.pixelRatio;
    },
    // 高清行高
    higtHeightMultiple() {
      return this.strFontSize * this.strLineHeight * systemInfo.pixelRatio;
    },
    // 高清内外圈间距
    higtCanvasMargin() {
      return this.canvasMargin * systemInfo.pixelRatio;
    },
    // 根据奖品列表计算 canvas 旋转角度
    canvasAngle() {
      let result = 0;
      let prizeCount = this.prizeList.length;
      let prizeClip = 360 / prizeCount;
      let diffNum = 90 / prizeClip;
      if (this.pointerPosition === "edge" || this.rotateType === "pointer") {
        result = -(prizeClip * diffNum);
      } else {
        result = -(prizeClip * diffNum + prizeClip / 2);
      }
      return result;
    },
    actionAngle() {
      return 0;
    },
    // 外圆的半径
    outsideRadius() {
      return this.higtCanvasSize / 2;
    },
    // 内圆的半径
    insideRadius() {
      return 20 * systemInfo.pixelRatio;
    },
    // 文字距离边缘的距离
    textRadius() {
      return this.strMarginOutside * systemInfo.pixelRatio || this.higtFontSize / 2;
    },
    // 根据画板的宽度计算奖品文字与中心点的距离
    textDistance() {
      const textZeroY = Math.round(this.outsideRadius - this.insideRadius / 2);
      return textZeroY - this.textRadius;
    }
  },
  watch: {
    // 监听获奖序号的变动
    prizeIndex(newVal, oldVal) {
      if (newVal > -1) {
        this.targetIndex = newVal;
        this.onRotateStart();
      } else {
        console.info("旋转结束，prizeIndex 已重置");
      }
    }
  },
  methods: {
    // 开始旋转
    onRotateStart() {
      if (this.isRotate)
        return;
      this.isRotate = true;
      let prizeCount = this.prizeList.length;
      let baseAngle = 360 / prizeCount;
      let angles = 0;
      if (this.rotateType === "pointer") {
        if (this.targetActionAngle === 0) {
          angles = (this.targetIndex - this.stayIndex) * baseAngle + baseAngle / 2 - this.actionAngle;
        } else {
          angles = (this.targetIndex - this.stayIndex) * baseAngle;
        }
        this.stayIndex = this.targetIndex;
        this.targetActionAngle += angles + 360 * this.ringCount;
        console.log("targetActionAngle", this.targetActionAngle);
      } else {
        if (this.targetAngle === 0) {
          angles = 270 - (this.targetIndex - this.stayIndex) * baseAngle - baseAngle / 2 - this.canvasAngle;
        } else {
          angles = -(this.targetIndex - this.stayIndex) * baseAngle;
        }
        this.stayIndex = this.targetIndex;
        this.targetAngle += angles + 360 * this.ringCount;
      }
      let endTime = this.transitionDuration * 1e3 + 100;
      let endTimer = setTimeout(() => {
        clearTimeout(endTimer);
        endTimer = null;
        this.isRotate = false;
        this.$emit("draw-end");
      }, endTime);
      let resetPrizeTimer = setTimeout(() => {
        clearTimeout(resetPrizeTimer);
        resetPrizeTimer = null;
        this.$emit("reset-index");
      }, endTime + 50);
    },
    // 点击 开始抽奖 按钮
    handleActionStart() {
      if (!this.lotteryImg)
        return;
      if (this.isRotate)
        return;
      this.$emit("draw-start");
    },
    // 渲染转盘
    async onCreateCanvas() {
      const canvasId = this.canvasId;
      const ctx = common_vendor.index.createCanvasContext(canvasId, this);
      let canvasW = this.higtCanvasSize;
      let canvasH = this.higtCanvasSize;
      let prizeCount = this.prizeList.length;
      let baseAngle = Math.PI * 2 / prizeCount;
      ctx.setFontSize(this.higtFontSize);
      for (let i = 0; i < prizeCount; i++) {
        let prizeItem = this.prizeList[i];
        let angle = i * baseAngle;
        ctx.save();
        ctx.beginPath();
        ctx.arc(canvasW * 0.5, canvasH * 0.5, this.outsideRadius, angle, angle + baseAngle, false);
        ctx.arc(canvasW * 0.5, canvasH * 0.5, this.insideRadius, angle + baseAngle, angle, true);
        if (this.colors.length === 2) {
          ctx.setFillStyle(this.colors[i % 2]);
        } else {
          ctx.setFillStyle(this.colors[i]);
        }
        ctx.fill();
        if (this.stroked) {
          ctx.setStrokeStyle(`${this.strokeColor}`);
          ctx.stroke();
        }
        let translateX = canvasW * 0.5 + Math.cos(angle + baseAngle / 2) * this.textDistance;
        let translateY = canvasH * 0.5 + Math.sin(angle + baseAngle / 2) * this.textDistance;
        ctx.translate(translateX, translateY);
        ctx.setFillStyle(this.strFontColor);
        let rewardName = this.strLimit(prizeItem[this.strKey]);
        ctx.rotate(angle + baseAngle / 2 + Math.PI / 2);
        if (this.strDirection === "horizontal") {
          if (rewardName && this.prizeNameDrawed) {
            let realLen = uni_modules_almostLottery_utils_almostUtils.clacTextLen(rewardName).realLen;
            let isLineBreak = realLen > this.strLineLen;
            if (isLineBreak) {
              let firstText = "";
              let lastText = "";
              let firstCount = 0;
              for (let j = 0; j < rewardName.length; j++) {
                firstCount += uni_modules_almostLottery_utils_almostUtils.clacTextLen(rewardName[j]).byteLen;
                if (firstCount <= this.strLineLen * 2) {
                  firstText += rewardName[j];
                } else {
                  lastText += rewardName[j];
                }
              }
              rewardName = firstText + "," + lastText;
              let rewardNames = rewardName.split(",");
              for (let j = 0; j < rewardNames.length; j++) {
                if (ctx.measureText && ctx.measureText(rewardNames[j]).width > 0) {
                  let tempStrSize = ctx.measureText(rewardNames[j]);
                  let tempStrWidth = -(tempStrSize.width / 2).toFixed(2);
                  ctx.fillText(rewardNames[j], tempStrWidth, j * this.higtHeightMultiple);
                } else {
                  this.measureText = rewardNames[j];
                  await this.$nextTick();
                  let textWidth = await this.getTextWidth();
                  let tempStrWidth = -(textWidth / 2).toFixed(2);
                  ctx.fillText(rewardNames[j], tempStrWidth, j * this.higtHeightMultiple);
                }
              }
            } else {
              if (ctx.measureText && ctx.measureText(rewardName).width > 0) {
                let tempStrSize = ctx.measureText(rewardName);
                let tempStrWidth = -(tempStrSize.width / 2).toFixed(2);
                ctx.fillText(rewardName, tempStrWidth, 0);
              } else {
                this.measureText = rewardName;
                await this.$nextTick();
                let textWidth = await this.getTextWidth();
                let tempStrWidth = -(textWidth / 2).toFixed(2);
                ctx.fillText(rewardName, tempStrWidth, 0);
              }
            }
          }
        } else {
          let rewardNames = rewardName.split("");
          for (let j = 0; j < rewardNames.length; j++) {
            if (ctx.measureText && ctx.measureText(rewardNames[j]).width > 0) {
              let tempStrSize = ctx.measureText(rewardNames[j]);
              let tempStrWidth = -(tempStrSize.width / 2).toFixed(2);
              ctx.fillText(rewardNames[j], tempStrWidth, j * this.higtHeightMultiple);
            } else {
              this.measureText = rewardNames[j];
              await this.$nextTick();
              let textWidth = await this.getTextWidth();
              let tempStrWidth = -(textWidth / 2).toFixed(2);
              ctx.fillText(rewardNames[j], tempStrWidth, j * this.higtHeightMultiple);
            }
          }
        }
        if (prizeItem.image && this.strDirection !== "vertical") {
          let reg = /^(https|http)/g;
          if (reg.test(prizeItem.image)) {
            let platformTips = "";
            platformTips = "需要处理好下载域名的白名单问题，";
            console.warn(`###当前数据列表中的奖品图片为网络图片，${platformTips}开始尝试下载图片...###`);
            let res = await uni_modules_almostLottery_utils_almostUtils.downloadFile(prizeItem.image);
            console.log("处理远程图片", res);
            if (res.ok) {
              let tempFilePath = res.tempFilePath;
              prizeItem.image = tempFilePath;
            } else {
              this.handlePrizeImgSuc({
                ok: false,
                data: res.data,
                msg: res.msg
              });
            }
          } else {
            console.log("处理非远程图片", prizeItem.image);
          }
          let prizeImageX = -(this.imgWidth * systemInfo.pixelRatio / 2);
          let prizeImageY = this.imgMarginStr * systemInfo.pixelRatio;
          let prizeImageW = this.imgWidth * systemInfo.pixelRatio;
          let prizeImageH = this.imgHeight * systemInfo.pixelRatio;
          ctx.drawImage(prizeItem.image, prizeImageX, prizeImageY, prizeImageW, prizeImageH);
        }
        ctx.restore();
      }
      ctx.draw(true, () => {
        let drawTimer = setTimeout(() => {
          clearTimeout(drawTimer);
          drawTimer = null;
          common_vendor.index.canvasToTempFilePath({
            canvasId: this.canvasId,
            success: (res) => {
              this.handlePrizeImg({
                ok: true,
                data: res.tempFilePath,
                msg: "画布导出生成图片成功"
              });
            },
            fail: (err) => {
              this.handlePrizeImg({
                ok: false,
                data: err,
                msg: "画布导出生成图片失败"
              });
            }
          }, this);
        }, 500);
      });
    },
    // 处理导出的图片
    handlePrizeImg(res) {
      if (res.ok) {
        let data = res.data;
        if (!this.canvasCached) {
          this.lotteryImg = data;
          this.handlePrizeImgSuc(res);
          return;
        }
        if (this.isCacheImg) {
          common_vendor.index.getSavedFileList({
            success: (sucRes) => {
              let fileList = sucRes.fileList;
              let cached = false;
              if (fileList.length) {
                for (let i = 0; i < fileList.length; i++) {
                  let item = fileList[i];
                  if (item.filePath === data) {
                    cached = true;
                    this.lotteryImg = data;
                    console.info("经查，本地缓存中存在的转盘图可用，本次将不再绘制转盘");
                    this.handlePrizeImgSuc(res);
                    break;
                  }
                }
              }
              if (!cached) {
                console.info("经查，本地缓存中存在的转盘图不可用，需要重新初始化转盘绘制");
                this.initCanvasDraw();
              }
            },
            fail: (err) => {
              this.initCanvasDraw();
            }
          });
        } else {
          common_vendor.index.saveFile({
            tempFilePath: data,
            success: (sucRes) => {
              let filePath = sucRes.savedFilePath;
              uni_modules_almostLottery_utils_almostUtils.setStore(`${this.canvasId}LotteryImg`, filePath);
              this.lotteryImg = filePath;
              this.handlePrizeImgSuc({
                ok: true,
                data: filePath,
                msg: "画布导出生成图片成功"
              });
            },
            fail: (err) => {
              this.handlePrizeImg({
                ok: false,
                data: err,
                msg: "画布导出生成图片失败"
              });
            }
          });
        }
      } else {
        console.error("处理导出的图片失败", res);
        common_vendor.index.hideLoading();
        console.error("###当前为小程序端，下载网络图片需要配置域名白名单###");
      }
    },
    // 处理图片完成
    handlePrizeImgSuc(res) {
      common_vendor.index.hideLoading();
      this.$emit("finish", {
        ok: res.ok,
        data: res.data,
        msg: res.ok ? this.successMsg : this.failMsg
      });
      this.almostLotteryTip = res.ok ? this.successMsg : this.failMsg;
    },
    // 兼容 app 端不支持 ctx.measureText
    // 已知问题：初始绘制时，低端安卓机 平均耗时 2s
    // hbx 2.8.12+ 已在 app 端支持
    getTextWidth() {
      console.warn("正在采用兼容方式获取文本的 size 信息，虽然没有任何问题，如果可以，请将此 systemInfo 及 hbx 版本号 反馈给作者", systemInfo);
      let query = common_vendor.index.createSelectorQuery().in(this);
      let nodesRef = query.select(".almost-lottery__measureText");
      return new Promise((resolve, reject) => {
        nodesRef.fields({
          size: true
        }, (res) => {
          resolve(res.width);
        }).exec();
      });
    },
    // 处理文字溢出
    strLimit(value) {
      let maxLength = this.strMaxLen;
      if (!value || !maxLength)
        return value;
      return uni_modules_almostLottery_utils_almostUtils.clacTextLen(value).realLen > maxLength ? value.slice(0, maxLength - 1) + ".." : value;
    },
    // 检查本地缓存中是否存在转盘图
    checkCacheImg() {
      console.log("检查本地缓存中是否存在转盘图");
      this.oldLotteryImg = uni_modules_almostLottery_utils_almostUtils.getStore(`${this.canvasId}LotteryImg`);
      let oldPrizeList = uni_modules_almostLottery_utils_almostUtils.getStore(`${this.canvasId}PrizeList`);
      let newPrizeList = JSON.stringify(this.prizeList);
      if (this.oldLotteryImg) {
        if (oldPrizeList === newPrizeList) {
          console.log(`经查，本地缓存中存在转盘图 => ${this.oldLotteryImg}`);
          this.isCacheImg = true;
          console.log("需要继续判断这张缓存图是否可用");
          this.handlePrizeImg({
            ok: true,
            data: this.oldLotteryImg,
            msg: "画布导出生成图片成功"
          });
          return;
        }
      }
      console.log("经查，本地缓存中不存在转盘图");
      this.initCanvasDraw();
    },
    // 初始化绘制
    initCanvasDraw() {
      console.log("开始初始化转盘绘制");
      this.isCacheImg = false;
      this.lotteryImg = "";
      uni_modules_almostLottery_utils_almostUtils.clearStore(`${this.canvasId}LotteryImg`);
      uni_modules_almostLottery_utils_almostUtils.setStore(`${this.canvasId}PrizeList`, this.prizeList);
      this.onCreateCanvas();
    }
  },
  mounted() {
    this.$nextTick(() => {
      let stoTimer = setTimeout(() => {
        clearTimeout(stoTimer);
        stoTimer = null;
        if (this.canvasCached) {
          this.checkCacheImg();
        } else {
          this.onCreateCanvas();
        }
        this.transitionDuration = this.duration;
      }, 50);
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.lotteryImg
  }, $data.lotteryImg ? {
    b: $props.lotteryBg,
    c: $props.outerWidth + $options.higtCanvasMargin + "px",
    d: $props.outerWidth + $options.higtCanvasMargin + "px",
    e: $data.lotteryImg,
    f: $props.canvasWidth + "px",
    g: $props.canvasWidth + "px",
    h: `rotate(${$options.canvasAngle + $data.targetAngle}deg)`,
    i: `${$data.transitionDuration}s`,
    j: $props.actionBg,
    k: $props.actionWidth + "px",
    l: $props.actionHeight + "px",
    m: `rotate(${$options.actionAngle + $data.targetActionAngle}deg)`,
    n: `${$data.transitionDuration}s`,
    o: common_vendor.o((...args) => $options.handleActionStart && $options.handleActionStart(...args)),
    p: $props.outerWidth + $options.higtCanvasMargin + "px",
    q: $props.outerWidth + $options.higtCanvasMargin + "px"
  } : {
    r: common_vendor.t($data.almostLotteryTip)
  }, {
    s: common_vendor.t($data.measureText),
    t: $options.higtFontSize + "px",
    v: common_vendor.n($data.className),
    w: $props.canvasId,
    x: $options.higtCanvasSize,
    y: $options.higtCanvasSize,
    z: $options.higtCanvasSize + "px",
    A: $options.higtCanvasSize + "px"
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ec980c58"], ["__file", "D:/workspace/p/nc/nc_app/uni_modules/almost-lottery/components/almost-lottery/almost-lottery.vue"]]);
wx.createComponent(Component);
