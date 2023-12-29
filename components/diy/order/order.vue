<template>
	<view
		:style="{
			background: itemData.style.bgcolor,
			padding:
				itemData.style.paddingTop * 2 +
				'rpx ' +
				itemData.style.paddingLeft * 2 +
				'rpx ' +
				itemData.style.paddingBottom * 2 +
				'rpx ' +
				itemData.style.paddingLeft * 2 +
				'rpx'
		}"
	>
		<view class="drag optional">
			<view
				class="diy-Order"
				:style="{
					background: itemData.style.background,
					borderRadius:
						itemData.style.topRadio * 2 +
						'rpx ' +
						itemData.style.topRadio * 2 +
						'rpx ' +
						itemData.style.bottomRadio * 2 +
						'rpx ' +
						itemData.style.bottomRadio * 2 +
						'rpx'
				}"
			>
				<view class="list column-5">
					<view class="item" :key="index" v-for="(item, index) in orderItem" @click="gotoPage(item.url)">
						<view class="item-image d-c d-c-c pr">
							<image :src="'/static/order/' + itemData.style.type + '-' + index + '.png'" mode="widthFix"></image>
							<template v-if="userInfo.orderCount">
								<text class="dot  d-c-c" v-if="userInfo.orderCount[item.pop] != null && userInfo.orderCount[item.pop] > 0">
									{{ userInfo.orderCount[item.pop] }}
								</text>
							</template>
						</view>
						<view class="item-text text-ellipsis">{{ item.name }}</view>
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
			orderItem: [
				{ name: '待付款', url: '/pages/order/myorder?dataType=payment', pop: 'payment' },
				{ name: '待发货', url: '/pages/order/myorder?dataType=delivery', pop: 'delivery' },
				{ name: '待收货', url: '/pages/order/myorder?dataType=received', pop: 'received' },
				{ name: '待评价', url: '/pages/order/myorder?dataType=comment', pop: 'comment' },
				{ name: '退款/售后', url: '/pages/order/refund/index/index', pop: 'refund' }
			]
		};
	},
	props: ['itemData', 'userInfo'],
	created() {},
	methods: {
		/*跳转页面*/
		gotoDetail(e) {
			this.gotoPage(e.linkUrl);
		}
	}
};
</script>

<style lang="scss" scoped>
.diy-Order .list {
	display: flex;
}
.diy-Order .list .item {
	padding: 10px 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.diy-Order .list.column-5 .item {
	width: 20%;
}
.diy-Order .list .item-image {
	width: 60%;
}
.diy-Order .list .item-image image {
	width: 80%;
	margin: 0 auto;
}
.diy-Order .list .item-text {
	width: 100%;
	padding: 4px 0;
	text-align: center;
}
.diy-Order .dot {
	position: absolute;
	top: -10rpx;
	right: -8rpx;
	height: 25rpx;
	min-width: 25rpx;
	padding: 4rpx;
	border-radius: 20rpx;
	font-size: 20rpx;
	background: linear-gradient(180deg, #fc4133, #ff7a04);
	color: #ffffff;
}
</style>
