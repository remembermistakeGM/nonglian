<template>
	<view class="presale-product-wrap" :data-theme='theme()' :class="theme() || ''">
		<!--活动广告-->
		<view class="top-box">
			<!-- 搜索框 -->
			<view class="index-search-box d-b-c" id="searchBox">
				<view class="index-search t-c flex-1">
					<text class="icon iconfont icon-sousuo"></text>
					<input type="text" v-model="searchForm" class="flex-1 ml10 f30 gray3" 
						placeholder-class="f24 gray6" placeholder="输入你要的商品" confirm-type="search" @confirm="search()" />
				</view>
				<view class="f26" @click="gotoPage('/pages/order/myorder')">我的预定</view>
			</view>
		</view>
		<view class="presale-list-wrap" v-if="!loading">
			<scroll-view scroll-y="true" class="scroll-Y" :style="'height:' + scrollviewHigh + 'px;'"
				lower-threshold="50" @scrolltolower="scrolltolowerFunc">
				<view class="diy-banner-box pt20 mb20 pr square">
					<swiper class="swiper" autoplay :interval="3000" :duration="500" @change="changeSwiper">
						<swiper-item v-for="(item,index) in banner" :key="index" @click="gotoPages(item)">
							<image :src="item.file_path"></image>
						</swiper-item>
					</swiper>
					<view class="swiper-dots ww100 d-s-c square">
						<view :class="current==index?'swiper-dot active':'swiper-dot'" v-for="(item,index) in banner"
							:style="current==index?'background-color:#ffffff;':''" :key="index">
						</view>
					</view>
				</view>
				<!--活动类别-->
				<!-- <view class="active-top-tab">
					<scroll-view scroll-X="true" scroll-with-animation :scroll-into-view="'tab'+(type_active - 2)"
						show-scrollbar="false" class="scroll-X  mb30">
						<view class="tab-list d-s-c">
							<view class="logo" id="tab-2">
								<image src="/static/presale.png" mode=""></image>
							</view>
							<view class="tab-item" id="tab-1">
								<view class="actab-title">热卖中</view>
								<view class="actab-status">不能错过 </view>
							</view>
							<view class="tab-item" :id="'tab'+index" :class="{ active: type_active == index }"
								v-for="(item, index) in activeList" :key="index" @click="tabTypeFunc(index)">
								<view class="actab-title">{{ item.title }}</view>
								<view class="actab-status">即将开始</view>
							</view>
						</view>
					</scroll-view>
				</view> -->
				<!--列表-->
				<view class="list p-0-20">
					<view class="item d-stretch" v-for="(item, index) in listData" :key="index">
						<view class="product-cover">
							<image :src="item.product_image" mode="aspectFit"></image>
						</view>
						<view class="d-b-c d-c flex-1 ml26">
							<view class="product-title ww100">{{ item.product.product_name }}</view>
							<view class="d-s-c ww100">
								<Countdown ref="countdown" :color="'#999999'" :timeSize="'22rpx'"
									:config="{startstamp: item.start_time,endstamp: item.end_time}"
									@returnVal="returnValFunc"></Countdown>
							</view>
							<view class="ww100">
								<text class="dj-text">定金:￥{{ item.money }}</text>
								<text class="ml20  gray6 f20">尾款立减￥{{ item.sku[0].advance_price }}</text>
							</view>
							<view class="slider-box ww100 d-b-c">
								<view>
									<view class="f32 redF11"><text
											class="f16 fb">￥</text>{{ (item.sku[0].product_price*1 - item.sku[0].advance_price*1).toFixed(2) }}
									</view>
									<view class="f20 gray9">预估到手价</view>
								</view>
								<view class="right-btn ml30"><button type="primary"
										@click="gotoDetail(item.product.product_id)">抢购</button></view>
							</view>
						</view>
					</view>
				</view>
				<!-- 没有记录 -->
				<view class="d-c-c p30" v-if="listData.length == 0 && !loading">
					<text class="iconfont icon-wushuju"></text>
					<text class="cont">亲，暂无相关记录哦</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Countdown from '@/components/countdown/countdown-presale.vue';
	export default {
		components: {
			Countdown
		},
		data() {
			return {
				current: 0,
				banner: [],
				/*手机高度*/
				phoneHeight: 0,
				/*可滚动视图区域高度*/
				scrollviewHigh: 0,
				/*活动列表*/
				activeList: [],
				/*当前活动角标*/
				type_active: 0,
				/*类别选中*/
				currActive: {},
				/*产品列表*/
				listData: [],
				/*当前页面*/
				page: 1,
				/*没有更多*/
				no_more: false,
				/*活动详情*/
				detailData: {},
				/*是否正在加载*/
				loading: true,
				/*倒计时配置*/
				countdownConfig: {
					/*开始时间*/
					startstamp: 0,
					/*结束时间*/
					endstamp: 0
				},
				searchForm: ''
			};
		},
		computed: {},
		onLoad() {
			this.getData();
		},
		mounted() {
			this.init();
		},
		onPullDownRefresh() {},
		methods: {
			search() {
				this.listData = [];
				this.page = 1;
				this.loading = true;
				this.getData();
			},
			changeSwiper(e) {
				this.current = e.detail.current;
			},
			/*初始化*/
			init() {
				let _this = this;
				uni.getSystemInfo({
					success(res) {
						_this.phoneHeight = res.windowHeight;
						// 计算组件的高度
						let view = uni.createSelectorQuery().select('.top-box');
						view.boundingClientRect(data => {
							let h = _this.phoneHeight - data.height;
							_this.scrollviewHigh = h;
						}).exec();
					}
				});
			},

			/*类别切换*/
			tabTypeFunc(e) {
				this.type_active = e;
				this.currActive = this.activeList[e];
				this.getData();
			},
			goback() {
				uni.navigateBack()
			},
			/*可滚动视图区域到底触发*/
			scrolltolowerFunc() {
				let self = this;
				self.page++;
				self.loading = true;
				if (self.page > self.last_page) {
					self.loading = false;
					self.no_more = true;
					return;
				}
				self.getData();
			},
			/*获取数据*/
			getData() {
				let self = this;
				self.loading = true;
				self._get(
					'plus.advance.Product/index', {
						search: self.searchForm,
						page: self.page
					},
					function(res) {
						self.banner = res.data.setting.image;
						console.log(self.banner)
						self.loading = false;
						self.listData = self.listData.concat(res.data.list.data);
						self.last_page = res.data.list.last_page;
						if (res.data.list.last_page <= 1) {
							self.no_more = true;
						}
					}
				);
			},

			/*跳转产品详情*/
			gotoDetail(e) {
				// this.$refs.countdown.forEach(item=>{
				// 	item.clear();
				// })
				this.gotoPage('/pages/product/detail/detail?product_id=' + e);
			},

			/*跳转搜索页面*/
			gotoSearch() {
				this.getData();
			},

			/*倒计时返回值*/
			returnValFunc(e) {

			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.top-box {
		position: relative;
	}

	.presale-product-wrap .tab-item {
		flex: 0;
		padding: 0 25rpx;
		font-size: 33rpx;
		height: 86rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		white-space: nowrap;
		color: #333333;
	}

	.presale-product-wrap .logo {
		width: 75rpx;
		height: 69rpx;
		margin-right: 18rpx;
		padding-left: 24rpx;
		flex-shrink: 0;

		image {
			width: 75rpx;
			height: 69rpx;
		}
	}

	.presale-product-wrap .tab-item .actab-title {
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
	}

	.presale-product-wrap .tab-item .actab-status {
		font-weight: bold;
		color: #666666;
		font-size: 17rpx;
		height: 30rpx;
		padding: 0 18rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 15rpx;
	}

	.presale-product-wrap .tab-item.active .actab-status {
		background: linear-gradient(140deg, #F11E0B 0%, #F77737 100%);
		color: #FFFFFF;
	}

	.presale-product-wrap .tab-item.active {
		font-size: 30rpx;
		opacity: 1;
		position: relative;
		margin-bottom: 0;
	}

	.presale-product-wrap .tab-item.active::after {
		display: none;
	}

	.presale-product-wrap .tab-item .status1 {}

	.presale-product-wrap .tab-item.active .status1 {
		content: "";
		width: 120rpx;
		height: 4rpx;
		background: linear-gradient(140deg, #F11E0B 0%, #F77737 100%);
		border-radius: 2rpx;
		position: absolute;
		border: 30rpx;

	}

	.presale-product-wrap .every-day-time text {
		padding: 8rpx 16rpx;
		font-size: 26rpx;
		color: #333;
		opacity: 0.5;
	}

	.presale-product-wrap .ad-activity {
		position: relative;
		overflow: hidden;
	}

	.presale-product-wrap .ad-activity image {
		width: 750rpx;
		height: 367rpx;
		border-radius: 12rpx;
	}

	.presale-list-wrap {}

	.presale-list-wrap .list .item {
		padding: 30rpx;
		display: flex;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		background: #ffffff;
	}

	.presale-list-wrap .product-cover,
	.presale-list-wrap .product-cover image {
		width: 212rpx;
		height: 212rpx;
		border-radius: 10rpx;
	}

	.active-top-tab .ad-datetime::v-deep .box {
		height: 40rpx;
		padding: 4rpx;
		line-height: 40rpx;
		text-align: center;
		border-radius: 8rpx;
		font-size: 28rpx;
		background: #F6220C;
		color: #FFFFFF;
	}

	.active-top-tab .ad-datetime::v-deep text {
		color: #333;
		font-size: 28rpx;
	}

	.presale-list-wrap .product-title {
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		font-size: 24rpx;
	}

	.presale-list-wrap .already-sale {
		padding: 4rpx 0;
		color: #8228EB;
		font-size: 22rpx;
	}

	.dj-text {
		height: 31rpx;
		background-color: rgba($color: #FF0000, $alpha: 0.2);
		font-size: 20rpx;
		padding: 0 18rpx;
		color: #F11E0B;
		border-radius: 15rpx;
	}

	.presale-list-wrap .right-btn button {
		background: linear-gradient(140deg, #F11E0B 0%, #F77737 100%);
		color: #ffffff;
		height: 56rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 33rpx;
	}

	.reg180 {
		padding-right: 20rpx;
		text-align: right;
		transform: rotateY(180deg);
		position: absolute;
		bottom: 0;
	}

	.icon-jiantou {
		color: #FFFFFF;
		font-size: 30rpx;
	}

	.head_top {
		position: absolute;
		top: 0;
		z-index: 20;
		padding-top: var(--status-bar-height);
		height: 30px;
		line-height: 30px;
		color: #FFFFFF;
		font-size: 28rpx;
	}

	.tab-item.active::after {
		content: '';
		width: 60%;
		height: 4rpx;
		background: #F2F2F2;
		border-radius: 2rpx;
		position: absolute;
		bottom: 5rpx;
	}

	.diy-banner-box {
		overflow: hidden;
	}

	.diy-banner-box,
	.diy-banner-box .swiper {
		width: 750rpx;

		/* background-color: #FFFFFF; */
	}

	.diy-banner-box image {
		margin: 0 auto;
		width: 702rpx;
		height: 300rpx;
		border-radius: 12rpx;
	}

	.diy-banner-box.square .swiper-dots {
		position: absolute;
		bottom: 20rpx;
		left: 44rpx;
		margin: auto;
	}

	.swiper-dots.square .swiper-dot {
		width: 28rpx;
		height: 6rpx;
		border-radius: 3rpx;
		margin: 0 4rpx;
		background: #ffffff;
		opacity: 0.4;
	}

	.swiper-dots.square .swiper-dot.active {
		opacity: 0.8;
	}

	.index-search-box {
		background-color: #FFFFFF;

		.index-search {
			height: 60rpx;
			background: #FFFFFF;
			border: 1rpx solid #DDDDDD;
			border-radius: 30rpx;
			margin-right: 15rpx;
		}
	}
</style>
