<template>
	<view >
		<view class="top-tabbar">
			<view :class="state_active == item.value? 'tab-item active' : 'tab-item'" @click="stateFunc(item.value)" v-for="(item,index) in tableList"
			 :key="index">{{item.text}}</view>
		</view>

		<!--列表-->
		<scroll-view scroll-y="true" class="scroll-Y" :style="'height:' + scrollviewHigh + 'px;'" lower-threshold="50"
		 @scrolltolower="scrolltolowerFunc">
			<view class=" ">
				<view class="border-b p-0-30 bg-white pt10 mt20" v-for="(item,index) in tableData" :key="index">
					<view class="d-b-c f24 item-top">
						<text>订单号{{ item.order_master.order_no }}</text>
						<text class="blue" v-if="item.is_settled==1"> 已结算</text>
						<text class="green" v-else>未结算</text>
					</view>
					<view class="d-b-c item-center">
						<view class="agent-order-photo">
							<image :src="item.user.avatarUrl" mode="aspectFill"></image>
						</view>
						<view class="flex-1 ml20 f24">
							<view class="d-b-c">
								<text class="gray3 f28">{{ item.user.nickName }}</text>
								<text class="gray3 f28" v-if="item.first_user_id == user_id ">+￥{{ item.first_money }}</text>
								<text class="gray3 f28" v-if="item.second_user_id == user_id ">+￥{{ item.second_money }}</text>
								<text class="gray3 f28" v-if="item.third_user_id == user_id ">+￥{{ item.third_money }}</text>
							</view>
							<view class="d-b-c">
								<text class="gray9 f22">消费金额：￥{{ item.order_price }}</text>
							</view>
						</view>
					</view>
					<view class="item-bottom">
						<text class="gray9">{{item.create_time}}</text>
					</view>
				</view>
				<!-- 没有记录 -->
				<view class="d-c-c p30" v-if="tableData.length==0 && !loading">
					<text class="iconfont icon-wushuju"></text>
					<text class="cont">亲，暂无相关记录哦</text>
				</view>
				<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more.vue";
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				/*手机高度*/
				phoneHeight: 0,
				/*可滚动视图区域高度*/
				scrollviewHigh: 0,
				/*状态选中*/
				state_active: -1,
				/*数据列表*/
				tableData: [],
				settled: -1,
				page: 1,
				no_more: false,
				loading: true,
				tableList: [],
				list_rows: 15,
				user_id: 0
			}
		},
		computed: {
			/*加载中状态*/
			loadingType() {
				if (this.loading) {
					return 1;
				} else {
					if (this.tableData.length != 0 && this.no_more) {
						return 2;
					} else {
						return 0;
					}
				}
			}
		},
		mounted() {
			/*初始化*/
			this.init();
			this.user_id = this.getUserId();
			/*获取数据*/
			this.getData();
		},
		methods: {
			/*初始化*/
			init() {
				let self = this;
				uni.getSystemInfo({
					success(res) {
						self.phoneHeight = res.windowHeight;
						// 计算组件的高度
						let view = uni.createSelectorQuery().select('.top-tabbar');
						view.boundingClientRect(data => {
							let h = self.phoneHeight - data.height;
							self.scrollviewHigh = h;
						}).exec();
					}
				});
			},
			
			/*获取数据*/
			getData() {
				let self = this;
				self.loading = true;
				self._get('plus.agent.order/lists', {
					settled: self.state_active,
					page: self.page || 1,
					list_rows: self.list_rows,
				}, function(data) {
					self.loading = false;
					// 导航栏数据
					self.tableList = [{
						value: -1,
						text: data.data.words.order.words.all.value,
					}, {
						value: 0,
						text: data.data.words.order.words.unsettled.value,
					}, {
						value: 1,
						text: data.data.words.order.words.settled.value,
					}];
					self.tableData = self.tableData.concat(data.data.list.data);
					self.last_page = data.data.list.last_page;
					if (self.last_page <= 1) {
						self.no_more = true;
					}
				});
			},

			/*切换*/
			stateFunc(e) {
				let self = this;
				if(e!=self.state_active){
					self.tableData = [];
					self.page = 1;
					self.state_active = e;
					self.getData();
				}
			},

			/*可滚动视图区域到底触发*/
			scrolltolowerFunc() {
				let self = this;
				if (self.no_more) {
					return;
				}
				self.page++;
				if (self.page <= self.last_page) {
					self.getData();
				} else {
					self.no_more = true;
				}
			}
		}
	}
</script>

<style lang="scss">
	.agent-order-photo,
	.agent-order-photo image {
		width: 96rpx;
		height: 96rpx;
		border-radius: 50%;
	}
	.tab-item{
		font-size: 28rpx;
	}
	.tab-item.active{
		font-weight: normal;
		font-size: 28rpx;
	}
	.tab-item.active::after{
		width: 57rpx;
		height: 6rpx;
		background-color: #ff5649;
	}
	.item-top{
		height: 54rpx;
		line-height: 54rpx;
		border-bottom: 1rpx solid #eeeeee;
		color: #999999;
	}
	.item-bottom{
		height: 73rpx;
		line-height: 73rpx;
		border-top: 1rpx solid #eeeeee;
	}
	.item-center{
		height: 122rpx;
	}
</style>
