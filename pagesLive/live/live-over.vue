<template>
	<view class="live-container">
		
		<!--内容-->
		<view class="content d-c-c d-c">
			<view class="d-c-c f40">
				直播已结束
			</view>
			<view class="f24 mt30">
				直播已结束
			</view>
			<!--<view class="red mt10">
				{{detailData.end_time_text}}
			</view>-->
			
			<view class="d-a-c ww100 mt50">
				<view class="d-c-c d-c">
					<text class="f34 white">{{detailData.show_views}}</text>
					<text class="gray">观看人数</text>
				</view>
				<view class="d-c-c d-c">
					<text class="f34 white">{{detailData.gift_num}}</text>
					<text class="gray">礼物币</text>
				</view>
				<view class="d-c-c d-c">
					<text class="f34 white">{{detailData.sales_num}}</text>
					<text class="gray">订单数</text>
				</view>
			</view>
		</view>
		
		<view class="foot-btn-box">
			<button type="default" @tap="gotoHome">返回首页</button>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				/*房间ID*/
				room_id:null,
				/*数据对象*/
				detailData:{}
			}
		},
		onLoad(e) {
			this.room_id=e.room_id;
			this.getData();
		},
		methods: {
			
			/*获取数据*/
			getData(){
				let self=this;
				self._get(
					'plus.live.room/detail',
					{
						room_id:self.room_id
					},
					function(res) {
						self.detailData=res.data.model;
					}
				);
			},
			
			/*提交*/
			gotoHome: function(e) {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.live-container{
	width: 100%;
	height: 100vh;
	position: relative;
	background-image: linear-gradient(-60deg, #685b59,#888383, #817574,#7b6b69);
}

.live-container .content{
	position: absolute;
	padding: 10rpx;
	top: 100rpx;
	right: 20rpx;
	left: 20rpx;
	border-radius: 20rpx;
	color: #FFFFFF;
}

.live-container .content .cover{
	width: 200rpx;
	height: 200rpx;
	overflow: hidden;
	border-radius: 20rpx;
	border: 1rpx solid rgba(255,255,255,.2);
}

.live-container .content .cover image{
	width: 100%;
	height: 100%;
	border-radius: 20rpx;
}

.live-container .content input[type=text]{
	color: #FFFFFF;
}

.live-container .content .textarea{
	width: 100%;
	padding: 20rpx 0;
	height: 160rpx;
	line-height: 50rpx;
	color: #FFFFFF;
}

.live-container .foot-btn-box{
	position: fixed;
	right: 20rpx;
	bottom: 20rpx;
	left: 20rpx;
	
}

.live-container .foot-btn-box button{
	width: 100%;
	height: 88rpx;
	line-height: 88rpx;
	border-radius: 44rpx;
	background: $dominant-color;
	color: #FFFFFF;
	font-size: 30rpx;
}


</style>
