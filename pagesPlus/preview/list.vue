<template>
	<view :data-theme="theme()" :class="theme() || ''">
		<scroll-view scroll-y="true" class="scroll-Y" :style="'height:' + scrollviewHigh + 'px;'" lower-threshold="50" @scrolltolower="scrolltolowerFunc">
			<view class="shop_body">
				<view class="product-item" v-for="(item, index) in listData" :key="index" @click="gotoList(item.product_id)">
					<view><image :src="item.product_image" mode=""></image></view>
					<view class="product-info">
						<view>
							<view class="product-name gray3 f24 mb10">{{ item.product_name }}</view>
							<Countdown
								ref="countdown"
								:config="{ startstamp: new Date().valueOf() / 1000, endstamp: item.preview_time, title: ' ' }"
								:start_name="'距开始仅剩'"
								:end_name="'距开始仅剩'"
							></Countdown>
						</view>
						<view class="d-b-c pb10">
							<view class="product-price">
								<view class="f24 theme-price">
									¥
									<text class="f32 fb">{{ item.product_price }}</text>
								</view>
								<view class="f20 gray9 old-price">¥{{ item.product_sku.line_price }}</view>
							</view>
							<view class="dis-btn">未开始</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 没有记录 -->
			<view class="d-c-c p30" v-if="listData.length == 0 && !loading">
				<text class="iconfont icon-wushuju"></text>
				<text class="cont">亲，暂无相关记录哦</text>
			</view>
			<uni-load-more v-else :loadingType="loadingType"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more.vue';
import Countdown from '@/components/countdown/countdown-act.vue';
export default {
	components: {
		uniLoadMore,
		Countdown
	},
	data() {
		return {
			/*手机高度*/
			phoneHeight: 0,
			/*可滚动视图区域高度*/
			scrollviewHigh: 0,
			/*顶部刷新*/
			topRefresh: false,
			/*底部加载*/
			loading: true,
			/*没有更多*/
			no_more: false,
			/*商品列表*/
			listData: [],
			/*当前页面*/
			page: 1,
			list_rows: 10,
			last_page: 0
		};
	},
	computed: {
		/*加载中状态*/
		loadingType() {
			if (this.loading) {
				return 1;
			} else {
				if (this.listData.length != 0 && this.no_more) {
					return 2;
				} else {
					return 0;
				}
			}
		}
	},
	/** 设置分享内容*/
	onShareAppMessage() {
		// 构建分享参数
		return {
			title: '全部分类',
			path: '/pages/product/category?' + this.getShareUrlParams()
		};
	},
	onLoad(e) {},
	mounted() {
		this.init();
		/*获取产品列表*/
		this.getData();
	},
	onPullDownRefresh() {
		/*下拉到顶，页面值还原初始化*/
		this.restoreData();
		this.getData();
	},
	methods: {
		/*初始化*/
		init() {
			let _this = this;
			uni.getSystemInfo({
				success(res) {
					_this.phoneHeight = res.windowHeight;
					_this.scrollviewHigh = res.windowHeight;
				}
			});
		},
		/*还原初始化*/
		restoreData() {
			this.listData = [];
			this.no_more = false;
			this.page = 1;
		},
		/*获取数据*/
		getData() {
			let self = this;
			let page = self.page;
			let list_rows = self.list_rows;
			self.loading = true;
			self._get(
				'product.product/previewProduct',
				{
					page: page || 1,
					list_rows: list_rows
				},
				function(res) {
					self.loading = false;
					self.listData = self.listData.concat(res.data.list.data);
					self.last_page = res.data.list.last_page;
					if (res.data.list.last_page <= 1) {
						self.no_more = true;
					}
				}
			);
		},

		/*跳转产品列表*/
		gotoList(e) {
			let url = 'pages/product/detail/detail?product_id=' + e;
			this.gotoPage(url);
		},
		/*可滚动视图区域到底触发*/
		scrolltolowerFunc() {
			let self = this;
			self.bottomRefresh = true;
			self.page++;
			self.loading = true;
			if (self.page > self.last_page) {
				self.loading = false;
				self.no_more = true;
				return;
			}
			self.getData();
		}
	}
};
</script>

<style lang="scss">
.shop_body {
	width: 100%;
	padding: 22rpx;
	box-sizing: border-box;
}

.product-item {
	margin: 0 auto;
	background-color: white;
	border-radius: 5rpx;
	display: flex;
	padding: 25rpx 20rpx;
	box-sizing: border-box;
	margin-bottom: 26rpx;
}

.product-item image {
	width: 212rpx;
	height: 212rpx;
	border-radius: 10rpx;
	background-color: rgba(0, 0, 0, 0.1);
}

.product-info {
	// width: 70%;
	// height: 100%;
	flex: 1;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	padding-left: 20rpx;
	box-sizing: border-box;
}

.product-name {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	word-wrap: break-word;
	word-break: break-all;
	overflow: hidden;
}

.product-price {
}

.product-price view {
	margin-right: 15rpx;
}

.product-item .product-info::v-deep .box {
	padding: 0;
	font-size: 20rpx;
	background: none;
}

.product-item .product-info::v-deep .daybox {
	padding: 0;
	font-size: 20rpx;
	background: none;
}

.product-item .product-info::v-deep .countdown {
	border: none;
	padding: 0;
	font-size: 20rpx;
	white-space: nowrap;
	color: #999999;
}

.old-price {
	text-decoration: line-through;
}

.dis-btn {
	background: #cccccc;
	color: #ffffff;
	padding: 16rpx 21rpx;
	border-radius: 10rpx;
	font-size: 24rpx;
}
</style>
