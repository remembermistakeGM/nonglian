<template>
	<!-- 	<view class="content">
		<view class="content_box" style="width: 74rpx;height: 74rpx"> -->
	<view class="animate-wrap">
		<view ref="likelist" class="aa" :class="{'bb':item.index}" v-for="(item,index) in viewList" :key="index">
			<image style="width: 65rpx;height: 65rpx;" mode="widthFix" :src="item.src" :animation="item.animationData">
			</image>
		</view>
	</view>
	<!-- 		</view>
	</view> -->
</template>

<script>
	// #ifdef APP-PLUS
	const animation = weex.requireModule('animation')
	// #endif
	export default {
		data() {
			return {
				viewList: [],
				pageDate: new Date() //全局时间用于函数节流
			}
		},
		beforeCreate() {
			// #ifdef APP-PLUS
			const domModule = weex.requireModule('dom')
			domModule.addRule('fontFace', {
				fontFamily: "iconfont",
				'src': "url('" + getApp().globalData.vueObj.font_url + "')"
			});
			// #endif
		},
		onShow() {},
		methods: {
			move() {
				let testEl = this.$refs['likelist'];
				console.log('--------------------点赞------------------------')
				console.log(testEl);
				let testimg = testEl[testEl.length - 1];
				animation.transition(testimg, {
					styles: {
						color: '#FF0000',
						transform: 'translate(0, -200px)',
						opacity: '0',
						transformOrigin: 'center center'
					},
					duration: 3000, //ms
					timingFunction: 'ease',
					delay: 0 //ms
				}, function() {
					console.log('animation finished.');
				})
			},
			// 随机颜色（测试用可删除）
			random() {
				let r = Math.floor(Math.random() * 256),
					g = Math.floor(Math.random() * 256),
					b = Math.floor(Math.random() * 256);
				return `rgb(${r},${g},${b})`
			},

			handleClick() {
				let that = this;
				let arr = ['-', '']
				let arrImg = [
					'/static/qunzi.png',
					'/static/aixin.png',
					'/static/yusan.png',
					'/static/zan.png',
					'/static/hua.png',
					'/static/haixing.png'
				]

				let randomImg = Math.floor(Math.random() * arrImg.length)
				let arrPush = {
					src: arrImg[randomImg], //用于随机图标
					back: this.random(), //可删除
					index: false, //可删除
					time: 5000, //动画时间
					animationData: {}, //每个盒子独立动画不可全局
					x: Math.ceil(Math.random() * 50), //方向间距
					q: Math.floor(Math.random() * arr.length), //用于随机方向
					lastIndex: 5, //用于删除数组
					timer: null, //定时器
					lastTime: 1000 //删除的倒计时
				}
				//函数节流限制用户频繁快速点击
				let t = new Date() - this.pageDate;
				console.log('--------t='+t);
				if (t < 300) return //如果点击的时间小于初始时间300
				this.pageDate = new Date(); //同步全局时间
				//------------
				this.viewList.push(arrPush)
				//核心动画
				this.$nextTick(function() {
					// #ifdef APP-PLUS
					this.move()
					// #endif
					this.viewList.forEach((i, o, v) => {
						var animate = uni.createAnimation({
							duration: i.time,
							timingFunction: 'ease-out'
						})
						that.animation = animate
						let time = arr[i.q] + i.x //随机的方向和间距
						setTimeout(() => {
							that.animation.translateY(-200).step()
							that.animation.opacity(0).step()
							that.animation.translateX(Number(time)).step()
							i.animationData = that.animation.export()
							//函数防抖
							clearInterval(i.timer)
							i.timer = setInterval(() => {
								i.lastIndex-- //每个图标的倒计时到0删除
								if (i.lastIndex < 0) {
									v.splice(i, 1)
									clearInterval(i.timer)
								}
							}, i.lastTime)
						}, 100)
					})
				})

			}
		}
	}
</script>

<style scoped>
	.iconfont {
		font-family: iconfont;
	}

	.animate-wrap {
		display: inline-block;
		margin-right: 10px;
		position: absolute;
		width: 74rpx;
		height: 800rpx;
		/* top: -110rpx; */
		bottom: 100rpx;
		right: 0;
		z-index: 9998;
	}

	.content {
		position: absolute;
		right: 0;
		z-index: 9999;
	}

	.content_box {
		position: absolute;
		bottom: 0;
		right: 0;
	}

	.logo {
		display: inline-block;
		position: absolute;
		right: 0;
		width: 70rpx;
		height: 70rpx;
	}

	.aa {
		position: absolute;
		bottom: 0;
		font-size: 30upx;
		color: white;
		text-align: center;
		line-height: 50upx;
		width: 80upx;
		transform: translateY(0);
	}

	.icon-31guanzhu1xuanzhong {
		font-size: 40rpx;
	}
</style>
