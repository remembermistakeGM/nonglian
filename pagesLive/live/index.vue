<template>
	<view class="u_live">
		<scroll-view scroll-x="true" class="mb80" v-if="toplist">
			<view class="top_list d-s-c">
				<view v-for="(item, index) in toplist" :key="index" class="top_item">
					<view class="top_item_img"><image :src="item.avatarUrl" mode=""></image></view>
					<view class="live_status">直播中</view>
					<view class="live_top_name">{{ item.user }}</view>
				</view>
			</view>
		</scroll-view>
		<view class="uLive_top" v-if="scrollTopNum >= 185">
			<scroll-view scroll-x="true" class="">
				<view class="d-s-c">
					<view :class="params.is_top == 1 ? 'type_item_active' : 'type_item'" @click="chooseTop()">热门</view>
					<view :class="params.is_follow == 1 ? 'type_item_active' : 'type_item'" @click="chooseFollow()">关注</view>
					<view
						:class="category_id == item.category_id ? 'type_item_active' : 'type_item'"
						v-for="(item, index) in categorytype"
						:key="index"
						@click="chooseType(item.category_id)"
					>
						{{ item.name }}
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="live_content" v-if="categorytype != ''">
			<view>
				<scroll-view scroll-x="true" class="">
					<view class="d-s-c">
						<view :class="params.is_top == 1 ? 'type_item_active' : 'type_item'" @click="chooseTop()">热门</view>
						<view :class="params.is_follow == 1 ? 'type_item_active' : 'type_item'" @click="chooseFollow()">关注</view>
						<view
							:class="category_id == item.category_id ? 'type_item_active' : 'type_item'"
							v-for="(item, index) in categorytype"
						 :key="index"
							@click="chooseType(item.category_id)"
						>
							{{ item.name }}
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="live_list " v-if="!isLoading && typelist">
				<template v-for="(liveitem, liveindex) in typelist" :key="liveindex">
					<view @click="toRoom(liveitem)" class="live_item" v-if="liveitem.live_status != 107">
						<view class="live_item_status" v-if="liveitem.live_status == 103">
							<view class="live_item_statusL reLive">回放</view>
							<text class="live_item_statusR">直播回看</text>
						</view>
						<view class="live_item_status" v-if="liveitem.live_status == 101">
							<view class="live_item_statusL onLive"><image src="../../static/zhibo.gif" mode=""></image></view>
							<text class="live_item_statusR">直播中</text>
						</view>
						<view class="live_item_status" v-if="liveitem.live_status == 102">
							<view class="live_item_statusL">预告</view>
							<text class="live_item_statusR">直播预告</text>
						</view>
						<view class="live_item_img"><image :src="liveitem.share.file_path" mode="aspectFill"></image></view>
						<view class="d-b-c live_item_b">
							<view class="live_item_bl">
								<view class="live_item_blt">{{ liveitem.name }}</view>
								<view class="d-s-c live_item_blb">
									<view class="live_item_blbimg"><image :src="liveitem.user.avatarUrl" mode=""></image></view>
									<view class="live_item_blbtxt">{{ liveitem.user.nickName }}</view>
								</view>
							</view>
							<view class="live_item_brbox" v-if="liveitem.product[0]">
								<view class="live_item_br"><image :src="liveitem.product[0].product.image[0].file_path" mode=""></image></view>
								<view class="live_item_brb">￥{{ liveitem.product[0].product.product_price }}</view>
							</view>
						</view>
					</view>
				</template>
				
			</view>
			<!-- 没有记录 -->
			<view class="d-c-c p30" v-if="typelist.length == 0 && !isLoading">
				<text class="iconfont icon-wushuju"></text>
				<text class="cont">亲，暂无相关记录哦</text>
			</view>
			<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more.vue';
export default {
	components: {
		uniLoadMore
	},
	data() {
		return {
			/* 设备高度 */
			phoneHeight: 0,
			/* 滑动窗口高度 */
			scrollviewHigh: 0,
			/* 类别列表 */
			categorytype: [],
			/* 当前选中的类别 */
			category_id: 0,
			roomlist: [],
			/* 直播列表 */
			typelist: [],
			isLoading: true,
			/*底部加载*/
			loading: true,
			/*没有更多*/
			no_more: false,
			/*当前页面*/
			page: 1,
			/* 滚动条高度 */
			scrollTopNum: 0,
			params: {
				is_top: 1
			},
			toplist: []
		};
	},
	computed: {
		/*加载中状态*/
		loadingType() {
			if (this.isLoading) {
				return 1;
			} else {
				if (this.typelist.length != 0 && this.no_more) {
					return 2;
				} else {
					return 0;
				}
			}
		}
	},
	onShow() {
		this.getCategory();
	},
	onPageScroll(res) {
		this.scrollTopNum = res.scrollTop;
		console.log(res.scrollTop); //距离页面顶部距离
	},
	methods: {
		/*可滚动视图区域到底触发*/
		onReachBottom() {
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
		},
		/*初始化*/
		init() {
			let _this = this;
			uni.getSystemInfo({
				success(res) {
					_this.phoneHeight = res.windowHeight;
				}
			});
		},
		getCategory() {
			let self = this;
			self.isLoading = true;
			self._post('plus.live.RoomApply/category', {}, function(res) {
				self.categorytype = res.data.list;
				self.typelist.length = self.categorytype.length;
				self.typelist[0] = res.data.list[0];
				self.getData();
				self.init();
			});
		},
		getData() {
			let self = this;
			self.isLoading = true;
			uni.showLoading({
				title: '加载中...'
			});
			let params = self.params;
			self._post(
				'plus.live.Room/lists',
				{
					...params
				},
				function(res) {
					self.toplist = res.data.live.data;
					self.typelist = res.data.list.data;
					uni.hideLoading();
					self.isLoading = false;
					self.last_page = res.data.list.last_page;
					if (res.data.list.last_page <= 1) {
						self.no_more = true;
					} else {
						self.no_more = false;
					}
					console.log(self.typelist,"self.typelist");
					console.log(self.toplist,"self.toplist");
				}
			);
		},
		chooseType(id) {
			let self = this;
			self.category_id = id;
			console.log(self.category_id);
			self.params = {
				category_id: self.category_id
			};
			self.getData();
		},
		chooseTop() {
			let self = this;
			self.params = {
				is_top: 1
			};
			self.category_id = 0;
			self.getData();
		},
		chooseFollow() {
			let self = this;
			self.params = {
				is_follow: 1
			};
			self.category_id = 0;
			self.getData();
		},
		toRoom(e) {
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
page {
	background-color: #f1f1f1;
}

.u_live {
}

.mb80 {
	margin-bottom: 80rpx;
}

.uLive_top {
	position: fixed;
	z-index: 1000;
	background: #f5f5f5;
	top: 0;
	left: 0;
}

.top_list {
	padding: 26rpx;
}

.top_item {
	text-align: center;
	position: relative;
	margin-right: 22rpx;
}

.top_item_img {
	width: 120rpx;
	height: 120rpx;
	padding: 4rpx;
	border-radius: 50%;
	border: 2rpx solid #da7399;
	margin-bottom: 20rpx;
}

.live_status {
	position: absolute;
	top: 105rpx;
	left: 14rpx;
	width: 105rpx;
	height: 30rpx;
	background-color: #f2517b;
	color: #ffffff;
	font-size: 20rpx;
	text-align: center;
	line-height: 30rpx;
	border-radius: 15rpx;
	letter-spacing: 2rpx;
}

.live_top_name {
	letter-spacing: 4rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 132rpx;
	text-align: center;
}

.top_item_img image {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
}

.type_item {
	padding: 0 20rpx;
	flex-shrink: 0;
	height: 44rpx;
	line-height: 44rpx;
	font-size: 25rpx;
	color: #000000;
	text-align: center;
	margin-left: 19rpx;
	letter-spacing: 3rpx;
}

.type_item_active {
	padding: 0 20rpx;
	flex-shrink: 0;
	height: 44rpx;
	line-height: 44rpx;
	font-size: 25rpx;
	color: #ffffff;
	text-align: center;
	margin-left: 19rpx;
	background-color: #fb4a74;
	border-radius: 22rpx;
	letter-spacing: 3rpx;
}

.live_content {
	padding-top: 30rpx;
	background-color: #f6f6f6;
}

.live_list {
	padding: 29rpx 26rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
}

.live_list .live_item {
	position: relative;
	width: 343rpx;
	height: 431rpx;
	height: 591rpx;
	background-color: #ffffff;
	margin-bottom: 16rpx;
	border-radius: 10rpx;
	overflow: hidden;
}

.live_item_img image {
	width: 343rpx;
	height: 431rpx;
}

.live_item_b {
	padding: 19rpx 16rpx;
}

.live_item_blt {
	width: 182rpx;
	font-size: 26rpx;
	line-height: 39rpx;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	margin-bottom: 5rpx;
}

.live_item_blbimg image {
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
	margin-right: 10rpx;
}

.live_item_blbtxt {
	font-size: 21rpx;
	color: #a8a8a8;
}

.live_item_br image {
	width: 90rpx;
	height: 90rpx;
	border-radius: 10rpx;
}

.live_item_brb {
	height: 32rpx;
	line-height: 32rpx;
	font-size: 20rpx;
	color: red;
}

.live_item_status {
	position: absolute;
	display: flex;
	justify-content: flex-start;
	height: 30rpx;
	line-height: 30rpx;
	border-radius: 15rpx;
	background-color: rgba($color: #000000, $alpha: 0.6);
	padding-right: 11rpx;
	font-size: 19rpx;
	top: 15rpx;
	left: 16rpx;
}

.live_item_statusL {
	color: #ffffff;
	height: 30rpx;
	line-height: 30rpx;
	border-radius: 15rpx;
	padding: 0 10rpx;
	background-color: #60d785;
	margin-right: 5rpx;
}

.reLive {
	background-color: #ff6633;
}

.onLive {
	background-color: #fb4a74;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0;
}

.live_item_statusR {
	color: #ffffff;
}

.live_item_statusL image {
	width: 30rpx;
	height: 30rpx;
}

.live_item_brbox {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
