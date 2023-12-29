<template>
	<view class="diy-live" v-if="itemData.data.length>0"  :style="{ background: itemData.style.background }">
		<view class="diy-head d-e-c"   :style="'background-image: url('+itemData.style.background_image+');'">
			<view class="right" @click="gotoList">
				<text @click="gotoPage('/pagesLive/live/index')" class="white">更多</text>
				<text class="iconfont icon-jiantou mr20" style="font-size: 24rpx;color: #999999;"></text>
			</view>
		</view>
		<view class="list d-s-c f-w">
			<view class="item" v-for="(item, index) in itemData.data" :key="index" @click="gotoDetail(item)">
				<view class="pic pr">
					<text class="state" :class="{bg101:item.live_status==101,bg102:item.live_status==102,bg103:item.live_status==104}"
					 v-if="item.live_status==101||item.live_status==102||item.live_status==104">
						{{convertStatus(item.live_status)}}
					</text>
					<image :src="item.share.file_path" mode="aspectFit"></image>
					<view class="anchor">{{item.anchor_name}}</view>
				</view>
				<view class="text-ellipsis f30 live_name tc">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {};
		},
		props: ['itemData'],
		created() {

		},
		methods: {

			scroll(e) {},

			/*状态转换*/
			convertStatus(num) {
				let str = '';
				switch (num) {
					case 101:
						str = '直播中';
						break;
					case 102:
						str = '未开始';
						break;
					case 103:
						str = '已结束';
						break;
					case 104:
						str = '禁播';
						break;
					case 105:
						str = '暂停';
						break;
					case 106:
						str = '异常';
						break;
					case 107:
						str = '已过期';
						break;
				}
				return str;
			},

			/*跳转列表*/
			gotoList() {
				this.gotoPage('/pagesPlus/live/wx/list');
			},
			/*跳转产品详情*/
			gotoDetail(e) {
				if (e.live_status == 103) {
					if (e.record_url != '') {
						this.gotoPage('/pagesLive/live/playback?room_id=' + e.room_id);
					} else {
						this.showError('暂无回放');
					}
				} else {
					this.gotoPage('/pagesLive/live/live?room_id=' + e.room_id + '&sence=join');
				}
			}
		}
	};
</script>

<style lang="scss">
.diy-live {
	margin: 20rpx;
	border-radius: 20rpx;
	background: #ffffff;
	// box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.1);
	overflow: hidden;
}
.diy-live .diy-head {
	height: 90rpx;
	align-items: center;background-size: 100% 100%;
	
}
.diy-live .diy-head .name {
	font-size: 36rpx;
	font-weight: bold;
	width: 200rpx;
}
.diy-live .list{
	padding: 20rpx;
}
.diy-live .list .item {
	width: 246rpx;
	margin-right: 20rpx;
	height: 330rpx;
	background-color: #f6f6f6;
	border-radius: 12rpx;
	overflow: hidden;
}
.diy-live .list .item:nth-child(2n + 0) {
	margin-right: 0;
}
.diy-live .list .item .pic {
	width: 246rpx;
	height: 246rpx;
}
.diy-live .list .item .pic .state{ 
	position: absolute;
	z-index: 90;
	top: 20rpx;
	left: 20rpx;
	padding: 4rpx 8rpx;
	background: red;
	color: #FFFFFF;
	border-radius: 8rpx;
}
.diy-live .list .item .pic .state.bg101{
	background: red;
}
.diy-live .list .item .pic .state.bg102{
	background: #ffb100;
}
.diy-live .list .item .pic .state.bg103{
	background: #333333;
}
.diy-live .list .item image {
	width: 246rpx;
	height: 246rpx;
	border-radius: 16rpx;
}
.diy-live  .anchor{
	position: absolute;
	bottom: 12rpx;
	left: 18rpx;
	font-size: 24rpx;
	line-height: 24rpx;
	
}
</style>
