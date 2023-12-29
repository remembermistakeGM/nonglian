<template>
	<view class="prodcut-list-wrap" :data-theme="theme()" :class="theme() || ''">
		<view class="top-tabbar">
			<view :class="type == 0 ? 'tab-item active' : 'tab-item'" @click="stateFunc(0)">全部</view>
			<view :class="type == 1 ? 'tab-item active' : 'tab-item'" @click="stateFunc(1)">实物</view>
			<view :class="type == 2 ? 'tab-item active' : 'tab-item'" @click="stateFunc(2)">虚拟</view>
		</view>
		<view class="list">
			<view class="item" v-for="(item, index) in listData" :key="index">
				<view>
					<view class="f28">{{ item.record_name }}</view>
					<view class="f24 gray9">{{ item.create_time }}</view>
				</view>
				<button class="btn-red record-list-btn"
					@click="gotoPage('/pagesPlus/lottery/receive?record_id=' + item.record_id)"
					v-if="item.status == 0">
					未领取
				</button>
				<button v-else class="btn-gray record-list-btn">
					<text v-if="item.prize_type!=3">已领取</text>
					<text v-if="item.prize_type==3&&item.delivery_status == 10">待发货</text>
					<text v-if="item.prize_type==3&&item.delivery_status == 20">已发货</text>
				</button>
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
				type: 0
			};
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
			stateFunc(n) {
				if (this.type == n || this.loading) {
					return;
				}
				this.type = n;
				this.page = 1;
				this.listData = [];
				this.getData();
			},
			/*获取数据*/
			getData() {
				let self = this;
				self.loading = true;
				self._post(
					'plus.lottery.lottery/record', {
						page: self.page || 1,
						list_rows: self.list_rows,
						type: self.type
					},
					function(res) {
						self.loading = false;
						if (res.data.list.data != null) {
							self.listData = self.listData.concat(res.data.list.data);
						}
						self.last_page = res.data.list.last_page;
						if (self.last_page <= 1) {
							self.no_more = true;
						}
					}
				);
			}
		}
	};
</script>

<style lang="scss">
	.point_top {
		position: relative;
		width: 750rpx;
		height: 240rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.point_top image {
		position: absolute;
		width: 750rpx;
		height: 240rpx;
		z-index: 0;
	}

	.prodcut-list-wrap .list {
		background: #ffffff;
		padding-left: 20rpx;
		margin: 20rpx;
		border-radius: 25rpx;
		padding: 0 20rpx;
	}

	.ponit_title {
		padding-top: 40rpx;
	}

	.prodcut-list-wrap {}

	.prodcut-list-wrap .list .item {
		padding: 30rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #dddddd;
	}

	.prodcut-list-wrap .list .item:last-child {
		border: none;
	}

	.prodcut-list-wrap .product-cover,
	.prodcut-list-wrap .product-cover image {
		width: 150rpx;
		height: 150rpx;
		border-radius: 12rpx;
	}

	.prodcut-list-wrap .product-info {
		flex: 1;
		margin-left: 26rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.prodcut-list-wrap .product-title {
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		font-size: 32rpx;
		width: 380rpx;
	}

	.prodcut-list-wrap .price {
		color: #f6220c;
		font-size: 20rpx;
		line-height: 28rpx;
	}

	.prodcut-list-wrap .price .num {
		padding: 0 4rpx;
		font-size: 36rpx;
	}

	.prodcut-list-wrap .already-sale {
		color: #999;
		font-size: 26rpx;
		margin-bottom: 18rpx;
	}

	.prodcut-list-wrap .already-sale .btn-red {
		line-height: 2;
		font-size: 28rpx;
	}

	.point_btn {
		width: 120rpx;
		height: 50rpx;
		background: linear-gradient(90deg, #7b45ff 0%, #961eff 100%);
		border-radius: 25rpx;
		font-size: 26rpx;
		color: #ffffff;
		line-height: 50rpx;
		text-align: center;
		margin-right: 30rpx;
	}

	.point_btn.btn-gray {
		background: #cccccc;
		color: #ffffff;
	}

	.record-list-btn {
		width: 160rpx;
		font-size: 26rpx;
		color: #ffffff;
		text-align: center;
		line-height: 56rpx;
		height: 56rpx;
		background: #cccccc;
		border-radius: 28rpx;
		border-radius: 32rpx;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.record-list-btn.btn-red {
		background-color: #FE5F5B;
		color: #FFFFFF;
		border: none;
	}
</style>