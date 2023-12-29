<template>
	<view
		:style="{
			background: itemData.style.bgcolor,
			padding: itemData.style.paddingTop + 'px ' + itemData.style.paddingLeft + 'px ' + itemData.style.paddingBottom + 'px ' + itemData.style.paddingLeft + 'px'
		}"
	>
		<view class="drag optional" v-if="userInfo.detail">
			<view class="bg-box">
				<!-- <view class="news" @click="gotoPage('/pagesPlus/chat/chat_list')">
					<image class="chat" src="/static/icon/chat.png" mode=""></image>
				</view> -->

				<view class="news" @click="changeStatus">
					<image class="chat" src="/static/icon/chat.png" mode=""></image>
				</view>

				<view v-if="userInfo.msgcount && userInfo.msgcount!=0" class="news_num">
					{{userInfo.msgcount}}
				</view>
				<view class="d-s-c" style="z-index: 1;position: relative;margin-left: 20rpx;margin-top: 80rpx;">
					<view class="item-image"><image :src="userInfo.detail.avatarUrl" mode=""></image></view>
					<view class="d-c d-b-s white" style="height: 102rpx;">
						<view class="d-c-c ">
							<text class="fb f32">{{ userInfo.detail.nickName }}</text>
							<text class="ml20 grade" v-if="userInfo.detail.grade_id > 0">{{ userInfo.detail.grade.name }}</text>
						</view>
						<view>ID:{{ userInfo.detail.user_id }}</view>
					</view>
				</view>
				<view class="bg-base" :class="'bg-base-' + itemData.style.type"></view>
				<view class="diy-Base" :style="{ background: itemData.style.background }">
					<view class="list column-3">
						<view class="item" @click="gotoPage('/pages/user/my-wallet/my-wallet')">
							<view class="item-text fb f32">{{ userInfo.detail.balance }}</view>
							<view class="item-text text-ellipsis">账户余额</view>
						</view>
						<view class="item item-center" :style="'padding:0 ' + itemData.style.padding * 2 + 'rpx;'" @click="gotoPage('/pages/user/points/points')">
							<view class="item-text fb f32">{{ userInfo.detail.points }}</view>
							<view class="item-text text-ellipsis">{{ points_name() }}</view>
						</view>
						<view class="item" @click="gotoPage('/pages/user/my-coupon/my-coupon')">
							<view class="item-text fb f32">{{ userInfo.coupon }}</view>
							<view class="item-text text-ellipsis">优惠券</view>
						</view>
					</view>
				</view>
			</view>
			<slot />
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: ['itemData', 'userInfo'],
	created() {},
	methods: {
		/*跳转页面*/
		gotoDetail(e) {
			this.gotoPage(e.linkUrl);
		},
		changeStatus(){
			let self = this;
            const stauts =0;
				self._post('index/changapp', {stauts}, function(res) {
					if (res.code == 1) {
						uni.showToast({
							title: '切换成功',
							icon: 'none'
						}) 
                        uni.switchTab({
							url:"/pages/farm/index"  
						})
						
 
                    }
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.grade {
	display: block;
	padding: 0 16rpx;
	font-size: 22rpx;
	/* height: 36rpx; */
	line-height: 36rpx;
	border-radius: 40rpx;
	background-color: rgba($color: #000000, $alpha: 0.1);
	color: #ffffff;
}
.diy-Base {
	position: absolute;
	width: 710rpx;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	padding: 0 20rpx;
	box-sizing: border-box;
	border-radius: 16rpx;
}
.diy-Base .list {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
}
.diy-Base .list .item {
	padding: 20rpx 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.diy-Base .list.column-3 .item {
	// width: 33.333333333%;
	width: 20%;
}
.diy-Base .list.column-4 .item {
	width: 25%;
}
.diy-Base .list.column-5 .item {
	width: 20%;
}
.diy-Base .list .item-image {
	width: 60%;
}
.diy-Base .list .item-image img {
	width: 100%;
}
.diy-Base .list .item-text {
	width: 100%;
	padding: 8rpx 0;
	text-align: center;
}
.bg-box {
	overflow: hidden;
	height: 410rpx;
	position: relative;
	.news {
		position: absolute;
		top: 40rpx;
		right: 20rpx;
		z-index: 100;
		.chat {
			width: 40rpx;
			height: 40rpx;
		}
	}
	.news_num {
		position: absolute;
		top: 24rpx;
		right: 44rpx;
		z-index: 100;
		border-radius: 50%;
		width: 25rpx;
		height: 25rpx;
		text-align: center;
		line-height: 25rpx;
		color: #FFFFFF;
		background-color: #ff6633;
		padding: 5rpx;
		font-size: 20rpx;
	}
}
.bg-base {
	width: 160%;
	height: 600rpx;
	position: absolute;
	right: 0;
	left: -30%;
	top: -194rpx;
	bottom: 0;
	margin: auto;
	border-radius: 50% 50% 50% 50%;
}
.bg-base-1 {
	background-color: #ff5704;
}
.bg-base-2 {
	background-color: #19ad57;
}
.bg-base-3 {
	background-color: #ffcc00;
}
.bg-base-4 {
	background-color: #33a7ff;
}
.bg-base-5 {
	background-color: #e4e4e4;
}
.bg-base-6 {
	background-color: #c8ba97;
}
.bg-base-7 {
	background-color: #623ceb;
}
.item-image {
	width: 102rpx;
	height: 102rpx;
	border-radius: 50%;
	background-color: #fff;
	overflow: hidden;
	margin-right: 20rpx;
	image {
		width: 102rpx;
		height: 102rpx;
		border-radius: 50%;
		background-color: #fff;
	}
}
.d-c-s {
	display: flex;
	justify-content: center;
	align-items: flex-start;
}
</style>
