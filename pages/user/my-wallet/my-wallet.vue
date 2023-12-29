<template>
	<view class="index">
		<view class="top_bg" :style="'height:' + (368 + topBarHeight() * 2 + topBarTop() * 2) + 'rpx;'">
			<!-- #ifdef MP-WEIXIN || APP-PLUS -->
			<view class="ww100" :style="'height:' + topBarTop() + 'px;'"></view>
			<view class="tc  head_top" :style="topBarHeight() == 0 ? '' : 'height:' + topBarHeight() + 'px;'">
				<view class="reg180" @click="goback"><text class="icon iconfont icon-jiantou"></text></view>
				<view class="fb">我的钱包</view>
			</view>
			<!-- #endif -->
			<view class="card-top d-b-c">
				<view class="flex-1">
					<view class="f28 fb white">账户余额(元)</view>
					<view class="f72 white">
						<text class="f38">￥</text>
						<text class="fb">{{ balance }}</text>
					</view>
				</view>
				<view v-if="cash_open" class="d-c d-c-c">
					<view class="text-btn mb10" @click="gotoPage('/pages/user/cash/apply')">去提现</view>
					<view class="white underline f28" @click="gotoPage('/pages/user/cash/list')">提现明细</view>
				</view>
			</view>
		</view>
		<view class="wallet-content">
			<view class="index-head" v-if="balance_open">
				<view class="card-bottom">
					<view class="width-150 font-30 pr flex-1" @click="gotoPay">
						<view><image class="wallet_img" src="/static/icon/chongzhijiaofei.png" mode=""></image></view>
						<view class="f28 gray3">充值</view>
					</view>
					<view class="none_line"></view>
					<view class="width-150 font-30 pr flex-1" @click="gotoList('rechange')">
						<view><image class="wallet_img" src="/static/icon/chongzhijilu.png" mode=""></image></view>
						<view class="f28 gray3">充值记录</view>
					</view>
				</view>
			</view>
			<view class="index-body">
				<view class="body-head">
					<view class="name">钱包明细</view>
					<view class="more-btn" @click="gotoList('all')">
						更多明细
						<text class="icon iconfont icon-jiantou" style="color: #666;font-size: 22rpx;"></text>
					</view>
				</view>
				<view style="padding: 0 27rpx;">
					<view class="body-item" v-for="(item, index) in dataList" :key="index">
						<view class="body-item-top">
							<view class="body-item-top-left f28 ">{{ item.scene.text }}</view>
							<view class="body-item-top-right f30" v-if="item.money > 0">+{{ item.money }}</view>
							<view class="body-item-top-right f30" v-else>{{ item.money }}</view>
						</view>
						<view class="body-item-bottom">
							<view class="body-item-bottom-left font-24 gray9">{{ item.create_time }}</view>
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
			dataList: [],
			balance: '',
			balance_open: 1,
			cash_open: 1
		};
	},
	onShow() {
		/*获取数据*/
		this.getData();
	},
	methods: {
		/*获取数据*/
		getData() {
			let self = this;
			self.loading = true;
			self._get('balance.log/index', {}, function(res) {
				self.loading = false;
				self.dataList = res.data.list;
				self.balance = res.data.balance;
				self.balance_open = res.data.balance_open;
				self.cash_open = res.data.cash_open;
			});
		},
		gotoList(type) {
			this.gotoPage('/pages/user/my-wallet/my-balance?type=' + type);
		},
		goback() {
			uni.navigateBack();
		},
		gotoPay() {
			this.gotoPage('/pages/order/recharge');
		}
	}
};
</script>

<style lang="scss">
.font-color-ccc {
	color: #cccccc;
}

.icon-jiantou::before {
	font-size: 24rpx;
}

.font-24 {
	font-size: 24rpx;
}

.font-28 {
	font-size: 28rpx;
}

.font-32 {
	font-size: 32rpx;
}

.font-72 {
	font-size: 72rpx;
}

.width-150 {
	width: 150rpx;
	text-align: center;
}

.index {
	width: 750rpx;
}
.wallet-content {
	margin-top: -93rpx;
}
.index-head {
	width: 710rpx;
	margin: 0 auto;
	height: 160rpx;
	background: #ffffff;
	border-radius: 10rpx;
	margin-bottom: 25rpx;
	box-shadow: 0rpx 3rpx 7rpx 0rpx rgba(0, 0, 0, 0.08);
}

.bg-image {
	width: 660rpx;
	height: 340rpx;
	background-image: url('../../../static/card.png');
	background-size: 100% 100%;
	margin: 0 auto;
	margin-top: 50rpx;
	display: flex;
	flex-direction: column;
}

.card-top {
	width: 750rpx;
	height: 256rpx;
	padding-left: 47rpx;
	padding-right: 22rpx;
	box-sizing: border-box;
}

.card-bottom {
	/* width: 660rpx; */
	height: 160rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
}

.index-body {
	width: 706rpx;
	/* height: 1036rpx; */
	background: #ffffff;
	box-shadow: 0rpx 3rpx 7rpx 0rpx rgba(0, 0, 0, 0.08);
	border-radius: 15rpx;
	margin: 0 auto;
	box-sizing: border-box;
	overflow: hidden;
}

.body-head {
	height: 110rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: rgba(#ff5146, 0.05);
	border-bottom: 1px #f2f2f2 solid;
	padding: 0 27rpx;
}
.body-head .name {
	font-size: 30rpx;
	color: rgba(#ff5146, 0.98);
	font-weight: bold;
}
.body-item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 126rpx;
	border-bottom: 1rpx #f2f2f2 solid;
}

.body-item-top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #333333;
	margin-bottom: 10rpx;
}

.body-item-bottom {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.reg180 {
	padding-right: 20rpx;
	text-align: right;
	transform: rotateY(180deg);
	position: absolute;
	bottom: 0;
}

.icon-jiantou {
	color: #ffffff;
	font-size: 30rpx;
}

.head_top {
	position: relative;
	height: 30px;
	line-height: 30px;
	color: #ffffff;
	font-size: 32rpx;
}

.bg_topimg {
	position: absolute;
	top: 0;
	width: 100%;
	height: 400rpx;
	z-index: -1;
}

.top_bg {
	width: 750rpx;
	height: 368rpx;
	background: linear-gradient(180deg, #ff774d 0%, #ff422e 100%);
}

.wallet_img {
	width: 72rpx;
	height: 72rpx;
	margin: 0 auto;
}

.index-head .card-bottom .pr .icon-jiantou {
	position: absolute;
	right: 95rpx;
	color: #999999;
	font-size: 26rpx;
	top: 24rpx;
}

.none_line {
	width: 1rpx;
	height: 80rpx;
	background-color: #d9d9d9;
}

.body-item-top-right {
	color: #ff5649;
	margin-bottom: -30rpx;
}
.underline {
	display: inline-block;
	line-height: 2;
	border-bottom: 1px solid #fff;
}
.text-btn {
	width: 189rpx;
	height: 62rpx;
	font-size: 28rpx;
	font-weight: bold;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #ffffff;
	box-shadow: 0rpx 3rpx 7rpx 0rpx rgba(0, 0, 0, 0.15);
	border-radius: 30rpx;
	color: #ff5649;
}
.more-btn {
	width: 142rpx;
	height: 52rpx;
	background: #ffffff;
	opacity: 0.98;
	border-radius: 26rpx;
	font-size: 24rpx;
	color: #666;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
