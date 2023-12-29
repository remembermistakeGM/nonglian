<template>
	<view
		v-if="listData && listData.length > 0"
		class="diy-coupon"
		:style="{
			background: itemData.style.bgcolor,
			paddingLeft: itemData.style.paddingLeft * 2 + 'rpx',
			paddingRight: itemData.style.paddingLeft * 2 + 'rpx',
			paddingTop: itemData.style.paddingTop * 2 + 'rpx',
			paddingBottom: itemData.style.paddingBottom * 2 + 'rpx'
		}"
	>
		<view
			class="pr coupon-wrapper-box"
			:style="{
				background: itemData.style.bgtype == 1 ? itemData.style.background : 'none',
				borderTopLeftRadius: itemData.style.topRadio * 2 + 'rpx',
				borderTopRightRadius: itemData.style.topRadio * 2 + 'rpx',
				borderBottomLeftRadius: itemData.style.bottomRadio * 2 + 'rpx',
				borderBottomRightRadius: itemData.style.bottomRadio * 2 + 'rpx'
			}"
		>
			<image
				class="bg-couponbg"
				v-if="itemData.style.bgtype == 2"
				:src="itemData.style.bgimage"
				mode=""
				:style="{
					borderTopLeftRadius: itemData.style.topRadio * 2 + 'rpx',
					borderTopRightRadius: itemData.style.topRadio * 2 + 'rpx',
					borderBottomLeftRadius: itemData.style.bottomRadio * 2 + 'rpx',
					borderBottomRightRadius: itemData.style.bottomRadio * 2 + 'rpx'
				}"
			></image>
			<view class="coupon-wrapper-list d-s-c">
				<view :key="index" v-for="(coupon, index) in listData" class="coupon-wrapper">
					<image class="bg-coupon-item" src="/static/imgs/diy-coupon.png" mode=""></image>
					<!-- <img class="bg-coupon-item" src="/src/assets/img/diy-coupon.png" alt="" /> -->
					<view class="coupon-item d-c-c d-c">
						<view style="height: 78px;border-bottom: 1px dashed;" :style="{ borderColor: itemData.style.btncolor }">
							<view class="content-top" :style="{ color: itemData.style.pricecolor }">
								<template v-if="coupon.coupon_type.value == 10">
									<text class="f24">￥</text>
									<text class="f48 fb">{{ coupon.reduce_price * 1 }}</text>
								</template>
								<template v-if="coupon.coupon_type.value == 20">
									<text class="f48 fb">{{ coupon.discount }}</text>
									<text class="f24">折</text>
								</template>
							</view>
							<view class="content-bottom d-c f22" :style="{ color: itemData.style.cillcolor }">
								<text>{{ coupon.min_price > 0 ? '满' + coupon.min_price * 1 + '元可用' : '无门槛' }}</text>
							</view>
							<view class="tc f22" :style="{ color: itemData.style.descolor }">
								<text v-if="coupon.apply_range == 10">全品类券</text>
								<text v-if="coupon.apply_range == 20">指定商品可用</text>
								<text v-if="coupon.apply_range == 30">指定品类可用</text>
							</view>
						</view>
						<view style="height: 38px;" class="d-c-c">
							<view
								v-if="coupon.state.value == 1"
								class="right-receive"
								@click="receiveCoupon(index)"
								:style="{ color: itemData.style.btnTxtcolor, borderRadius: itemData.style.btnRadio + 'px', backgroundColor: itemData.style.btncolor }"
							>
								{{ itemData.params.btntext }}
							</view>
							<view
								v-else
								class="right-receive"
								:style="{ color: itemData.style.btnTxtcolor, borderRadius: itemData.style.btnRadio + 'px', backgroundColor: itemData.style.btncolor }"
							>
								{{ coupon.state.text }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			/*是否显示点*/
			indicatorDots: false,
			/*是否自动*/
			autoplay: true,
			/*切换时间*/
			interval: 5000,
			/*动画过渡时间*/
			duration: 1000,
			/*数据列表*/
			listData: []
		};
	},
	props: ['itemData'],
	created() {
		this.listData = this.itemData.data;
	},
	methods: {
		scroll(e) {},
		/**
		 * 领取优惠券
		 */
		receiveCoupon: function(index) {
			let self = this;
			let item = self.listData[index];
			if (item.state.value == 0) {
				return false;
			}
			self._post(
				'user.coupon/receive',
				{
					coupon_id: item.coupon_id
				},
				function(result) {
					uni.showToast({
						title: '领取成功',
						icon: 'success',
						mask: true,
						duration: 2000
					});
					item.state.value = 0;
					item.state.text = '已领取';
				}
			);
		}
	}
};
</script>

<style lang="scss">
.diy-coupon {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.diy-coupon .coupon-wrapper {
	position: relative;
	width: 208rpx;
	height: 232rpx;
	margin-right: 20rpx;
	flex-shrink: 0;
}

.diy-coupon .coupon-wrapper .coupon-item {
	width: 208rpx;
	height: 232rpx;
	overflow: hidden;
	position: relative;
	z-index: 1;
}

.diy-coupon .coupon-wrapper .left-content {
	width: 160rpx;
	height: 112rpx;
	padding: 0;
	box-sizing: border-box;
	color: #ffffff;
	flex: 1;
	background: #ff4c01;
}

.diy-coupon .coupon-wrapper .left-content .price {
	font-size: 40rpx;
	font-weight: bold;
}

.diy-coupon .coupon-wrapper .content-top {
	font-size: 24rpx;
	text-align: center;
}
.diy-coupon .coupon-wrapper .content-bottom {
	font-size: 20rpx;
	text-align: center;
}
.diy-coupon .coupon-wrapper .right-receive {
	min-width: 142rpx;
	padding: 0 20rpx;
	box-sizing: border-box;
	height: 48rpx;
	flex-shrink: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 11px;
}
.lr-tb {
	width: 26rpx;
}
.coupon-wrapper-box {
	width: 100%;
	box-sizing: border-box;
	padding: 28rpx 0;
}
.coupon-wrapper-list {
	overflow-x: auto;
	flex-wrap: nowrap;
	overflow-x: auto;
	padding-left: 22rpx;
}
.bg-coupon-item {
	position: absolute;
	z-index: 0;
	left: 0;
	top: 0;
	width: 208rpx;
	height: 232rpx;
}
.bg-couponbg {
	position: absolute;
	z-index: 0;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
