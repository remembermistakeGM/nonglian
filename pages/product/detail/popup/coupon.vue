<template>
	<view :class="Visible ? 'usable-coupon open' : 'usable-coupon close'">
		<view class="popup-bg" @click="closePopup"></view>
		<view class="main" v-on:click.stop>
			<view class="pop-title">
				<view class="f36 fb">优惠</view>
				<view class="pop-close" @click.stop="closePopup"><text class=" icon iconfont icon-guanbi"></text></view>
			</view>
			<view class="p-0-20">
				<view class="" v-if="discount.product_reduce.length > 0">
					<view class="f22 gray3 line-h-50 p-20-0">
						<text class="text-box ">满减</text>
						<text v-for="(item, index) in discount.product_reduce" :key="index" :label="item" :value="index">
							<text class="ml20" v-if="item.full_type == 1">满{{ item.full_value }}元</text>
							<text class="ml20" v-if="item.full_type == 2">满{{ item.full_value }}件</text>
							<text v-if="item.reduce_type == 1">减{{ item.reduce_value }}元</text>
							<text v-if="item.reduce_type == 2">{{ (100 - item.reduce_value) / 10 }}折</text>
						</text>
					</view>
				</view>
				<view class="p-20-0 line-h-50 f22 gray3 " v-if="discount.give_points > 0">
					<text class="text-box">返{{ points_name() }}</text>
					商城购物返{{ points_name() }}，订单完成后最高返{{ discount.give_points }}{{ points_name() }}
				</view>
			</view>
			<scroll-view scroll-y="true" class="scroll-Y scroll-coupon" :style="'height:' + scrollviewHigh + 'px;'">
				<view style="background-color: #f2f2f2;">
					<view class=" scroll-coupon-tit">可领取优惠券</view>
					<view v-for="(item, index) in datalist" :key="index" class="item-wrap">
						<view :class="item.is_get ? 'coupon-item coupon-item-gray' : 'coupon-item coupon-item-' + item.color.text">
							<view class="operation d-b-c">
								<view class="flex-1 coupon-content">
									<view class="mb20">
										<text class="f40 fb">{{ item.name }}</text>
									</view>

									<view class="f22 gray9 mb20">
										<template v-if="item.expire_type == 10">
											有效期：领取{{ item.expire_day }}天内有效
										</template>
										<template v-if="item.expire_type == 20">
											有效期：{{ item.start_time.text }}至{{ item.end_time.text }}
										</template>
									</view>
									<view v-if="item.coupon_type.value == 20" class="f22">{{ item.max_price > 0 ? '最多抵扣' + item.max_price * 1 + '元' : '无最高抵扣限制' }}</view>
								</view>
								<view class="right-box d-c-c d-c">
									<view class="theme-price mb10" v-if="item.coupon_type.value == 10">
										<text class="f24">￥</text>
										<text class="f52 fb">{{ item.reduce_price * 1 }}</text>
									</view>
									<view class="mb10 theme-price" v-if="item.coupon_type.value == 20">
										<text class="f52 fb">{{ item.discount }}</text>
										<text class="f24">折</text>
									</view>
									<view class="f24 mb10">{{ item.min_price > 0 ? '满' + item.min_price * 1 + '元可用' : '无门槛' }}</view>
									<view class="f26 coupon-btn theme-btn" v-if="!item.is_receive" @click="selectCoupon(item, index)">立即领取</view>
									<view v-else class="f26 coupon-btn btn-gray white"><text>已领取</text></view>
								</view>
								
							</view>
						</view>
						<view
							class="range_item d-b-c"
							v-if="item.apply_range == 20"
							@click.stop="gotoPage('/pages/coupon/detail?coupon_id=' + item.coupon_id + '&apply_range=' + item.apply_range)"
						>
							<view class="gray9 f24">
								限指定部分商品
								<text class="icon iconfont icon-you" style="color: #999999; font-size: 22rpx;"></text>
							</view>
							<view class="gray9 f24">本券不支持转赠</view>
						</view>
						<view
							class="range_item d-b-c"
							v-else-if="item.apply_range == 30"
							@click.stop="gotoPage('/pages/coupon/detail?coupon_id=' + item.coupon_id + '&apply_range=' + item.apply_range)"
						>
							<view class="gray9 f24">
								限指定分类商品
								<text class="icon iconfont icon-you" style="color: #999999; font-size: 22rpx;"></text>
							</view>
							<view class="gray9 f24">本券不支持转赠</view>
						</view>
						<view class="range_item d-b-c" v-else>
							<view class="gray9 f24">
								全场通用
								<text class="icon iconfont icon-you" style="color: #999999; font-size: 22rpx;"></text>
							</view>
							<view class="gray9 f24">本券不支持转赠</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			/*手机高度*/
			phoneHeight: 0,
			/*可滚动视图区域高度*/
			scrollviewHigh: 0,
			/*是否可见*/
			Visible: false,
			/*优惠券列表*/
			datalist: {},
			/*尺寸比例*/
			ratio: 1
		};
	},
	props: ['isCoupon', 'couponList', 'discount'],

	onLoad() {},
	mounted() {
		this.init();
	},
	watch: {
		isCoupon: function(n, o) {
			if (n != o) {
				this.Visible = n;
				this.datalist = this.couponList;
				this.getHeight();
			}
		}
	},
	methods: {
		/*初始化*/
		init() {
			let self = this;
			uni.getSystemInfo({
				success(res) {
					self.phoneHeight = res.windowHeight;
					self.ratio = res.windowWidth / 750;
					self.getHeight();
				}
			});
		},
		/*获取高度*/
		getHeight() {
			let count = Object.keys(this.couponList).length;
			if (count > 2) {
				this.scrollviewHigh = this.phoneHeight * 0.5;
			} else {
				if (count == 1) {
					this.scrollviewHigh = 250 * this.ratio + 60;
				} else if (count == 2) {
					this.scrollviewHigh = 460 * this.ratio + 60;
				}
			}
		},
		/*选择优惠券*/
		selectCoupon(e, i) {
			let self = this;
			uni.showLoading({
				title: '领取中'
			});
			self._post(
				'user.coupon/receive',
				{
					coupon_id: e.coupon_id
				},
				function(res) {
					uni.hideLoading();
					uni.showToast({
						title: '领取成功',
						duration: 2000,
						icon: 'success'
					});
					self.datalist[i].is_receive = true;
					console.log('1',self.datalist);
				}
			);
			// self.getData();
		},
		/*关闭弹窗*/
		closePopup() {
			this.$emit('close');
		}
	}
};
</script>

<style lang="scss" scoped>
.usable-coupon .popup-bg {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.6);
	z-index: 99;
}

.usable-coupon .main {
	position: fixed;
	width: 100%;
	bottom: 0;
	min-height: 200rpx;
	background-color: #fff;
	transform: translate3d(0, 1980rpx, 0);
	transition: transform 0.2s cubic-bezier(0, 0, 0.25, 1);
	padding-bottom: env(safe-area-inset-bottom);
	border-radius: 15rpx 15rpx 0 0;
	z-index: 99;
}

.usable-coupon .main {
	position: fixed;
	width: 100%;
	bottom: 0;
	min-height: 200rpx;
	background-color: #fff;
	transform: translate3d(0, 1980rpx, 0);
	transition: transform 0.2s cubic-bezier(0, 0, 0.25, 1);
	bottom: env(safe-area-inset-bottom);
	z-index: 99;
}

.usable-coupon.open .main {
	transform: translate3d(0, 0, 0);
}

.usable-coupon.close .popup-bg {
	display: none;
}

.b-radio {
	border: 1rpx solid #ffffff;
	border-radius: 30rpx;
	padding: 10rpx 30rpx;
}
.text-sheng {
	display: inline-block;
	width: 26rpx;
	height: 28rpx;
	background: linear-gradient(180deg, #ff5649 0%, #ff5649 100%);
	border-radius: 3rpx;
	font-size: 18rpx;
	font-family: PingFangSC;
	font-weight: 500;
	color: #ffffff;
	text-align: center;
	line-height: 28rpx;
}

.text-box {
	padding: 2rpx 6rpx;
	background-color: #fbe9e7;
	color: #fd5342;
	margin-right: 10rpx;
	border-radius: 4rpx;
	font-size: 20rpx;
}

.line-h-50 {
	line-height: 50rpx;
}

.pop-title {
	padding-top: 53rpx;
	font-size: 28rpx;
	font-family: PingFangSC;
	font-weight: 500;
	color: #333333;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 50rpx;
}

.pop-close {
	position: absolute;
	right: 20rpx;
	top: 20rpx;
	width: 60rpx;
	height: 60rpx;
	color: #999999;
	display: flex;
	justify-content: center;
	align-items: center;
	.icon-guanbi {
		font-size: 26rpx;
	}
}

.scroll-coupon {
	margin: 0 20rpx;
	border-top: 1rpx solid #eeeeee;
	width: 710rpx;
	box-sizing: border-box;
}

.scroll-coupon-tit {
	height: 74rpx;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 24rpx;
	color: #999999;
	background-color: #fff;
}
.item-wrap{
	border: 1px solid #eee;
}
</style>
