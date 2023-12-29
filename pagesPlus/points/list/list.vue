<template>
	<view class="prodcut-list-wrap" :data-theme='theme()' :class="theme() || ''">
		<view class="point_top theme-bg">
			<image class="bg-points" src="/static/bg-points.png" mode=""></image>
			<view class="pr mb28">
				<view class="f60 white"><text class="fb mr20">{{my_points}}</text><text class="f26">{{points_name()}}</text></view>
				<view class="f26 white">别小看{{points_name()}},它可以省大钱！</view>
			</view>
		</view>
		<view class="ponit_title d-c-c">
			<image style="width: 37rpx;height: 22rpx;" src="/static/dots.png" mode=""></image>
			<text class="m-0-20">好物兑换</text>
			<image style="width: 37rpx;height: 22rpx;" src="/static/dots.png" mode=""></image>
		</view>
		<view class="list">
			<view class="item" v-for="(item, index) in listData" :key="index" @click="gotoList(item.point_product_id)">
				<view class="product-cover">
					<image :src="item.product_image" mode="aspectFit"></image>
				</view>
				<view class="product-info flex-1 d-c">
					<view>
						<view class="product-title text-ellipsis-2">{{ item.product.product_name }}</view>
						<view class="already-sale d-b-c">
							<text>限量{{ item.stock }}件</text>
						</view>
					</view>
					<view class="d-b-c ww100">
						<view class="f24 theme-price">
							<text v-if="item.sku[0].point_money!=0">¥{{ item.sku[0].point_money }}+</text>
							<text class="">{{ item.sku[0].point_num }}{{points_name()}}</text>
						</view>
						<view class="point_btn theme-btn">兑换</view>
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
				/*是否加载完成*/
				loading: true,
				/*数据列表*/
				listData: [],
				/*最后一页码数*/
				last_page: 0,
				/*当前页面*/
				page: 1,
				/*每页条数*/
				list_rows: 10,
				no_more: false,
				my_points: 0
			};
		},
		onReady() {
			uni.setNavigationBarTitle({
			    title: this.points_name()+'商城'
			});
		},
		onShow() {
			this.page = 1;
			this.listData = [];
			this.getData();
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
		onReachBottom() {
			let self = this;
			if (self.page < self.last_page) {
				self.page++;
				self.getData();
			}
			self.no_more = true;
		},
		methods: {
			/*获取数据*/
			getData() {
				let self = this;
				self.loading = true;
				self._get(
					'plus.points.product/index', {
						page: self.page || 1,
						list_rows: self.list_rows
					},
					function(res) {
						self.loading = false;
						self.listData = self.listData.concat(res.data.list.data);
						self.my_points = res.data.points;
						self.last_page = res.data.list.last_page;
						if (res.data.list.last_page <= 1) {
							self.no_more = true;
						}
					}
				);
			},

			/*跳转产品列表*/
			gotoList(e) {
				this.gotoPage('/pagesPlus/points/detail/detail?point_product_id=' + e);
			}
		}
	};
</script>

<style lang="scss">
	page {
		background: #FBF9F9;
	}

	.point_top {
		position: relative;
		width: 750rpx;
		height: 346rpx;
		position: relative;
		z-index: 1;
		padding: 81rpx 19rpx 0 26rpx;
		font-size: 26rpx;
		color: #ffffff;
		box-sizing: border-box;

		.bg-points {
			width: 750rpx;
			height: 346rpx;
			z-index: 0;
			position: absolute;
			left: 0;
			top: 0;
		}
	}


	.prodcut-list-wrap .list {
		padding: 0 20rpx;
	}

	.ponit_title {
		height: 95rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		font-weight: bold;
	}

	.prodcut-list-wrap .list .item {
		padding: 25rpx 20rpx;
		width: 710rpx;
		height: 252rpx;
		background: #FFFFFF;
		box-shadow: 0px 8rpx 3rpx 0px rgba(6, 0, 1, 0.03);
		border-radius: 5rpx;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
	}

	.prodcut-list-wrap .product-cover {
		margin-right: 20rpx;
	}

	.prodcut-list-wrap .product-cover,
	.prodcut-list-wrap .product-cover image {
		width: 212rpx;
		height: 212rpx;
		border-radius: 10rpx;
	}

	.prodcut-list-wrap .product-info {
		flex: 1;
		margin-left: 26rpx;
		flex-direction: column;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		height: 212rpx;
	}

	.prodcut-list-wrap .product-title {
		margin-bottom: 18rpx;
	}

	.prodcut-list-wrap .price {
		font-size: 20rpx;
		line-height: 28rpx;
	}

	.prodcut-list-wrap .price .num {
		padding: 0 4rpx;
		font-size: 36rpx;
	}

	.prodcut-list-wrap .already-sale {
		color: #999;
		font-size: 20rpx;
	}

	.prodcut-list-wrap .already-sale .btn-red {
		line-height: 2;
		font-size: 28rpx;
	}

	.point_btn {
		width: 148rpx;
		height: 48rpx;
		border-radius: 25rpx;
		font-size: 22rpx;
		color: #FFFFFF;
		line-height: 48rpx;
		text-align: center;
		margin-right: 20rpx;
	}
</style>
