<template>
	<view
		class="drag optional"
		:style="{
			background: itemData.style.bgcolor,
			paddingLeft: itemData.style.paddingLeft * 2 + 'rpx',
			paddingRight: itemData.style.paddingLeft * 2 + 'rpx',
			paddingTop: itemData.style.paddingTop * 2 + 'rpx',
			paddingBottom: itemData.style.paddingBottom * 2 + 'rpx'
		}"
	>
		<view
			class="diy-seckill"
			:style="{
				background: itemData.style.background,
				borderTopLeftRadius: itemData.style.topRadio * 2 + 'rpx',
				borderTopRightRadius: itemData.style.topRadio * 2 + 'rpx',
				borderBottomLeftRadius: itemData.style.bottomRadio * 2 + 'rpx',
				borderBottomRightRadius: itemData.style.bottomRadio * 2 + 'rpx'
			}"
		>
			<view
				class="diy-head d-b-c"
				:style="{
					backgroundImage: itemData.style.bgimage ? 'url(' + itemData.style.bgimage + ')' : ''
				}"
			>
				<view class="left d-s-c flex-1">
					<view v-if="itemData.style.titleType == 1" class="name">{{ itemData.params.title }}</view>
					<image v-if="itemData.style.titleType == 2" class="titleImgt" :src="itemData.style.title_image" mode="heightFix"></image>
					<view class="datetime d-s-c">
						<text class="text" :style="{ color: itemData.style.color }">|</text>
						<Countdown
							:back_color="itemData.style.title_color1"
							:color="itemData.style.color"
							:cut_color="itemData.style.number_color"
							:config="countdownConfig"
							activeName="noborder"
						></Countdown>
					</view>
				</view>
				<view
					class="right white d-c-c"
					style="line-height: 1;"
					:style="{
						color: itemData.style.moreColor,
						fontSize: itemData.style.moreSize * 2 + 'rpx'
					}"
					@click="gotoList"
				>
					{{ itemData.params.more }}
					<text
						class="icon iconfont icon-you"
						:style="{
							color: itemData.style.moreColor,
							fontSize: '22rpx'
						}"
					></text>
				</view>
			</view>
			<view class="product-list column__3">
				<view
					class="product-item"
					v-for="(product, index) in itemData.data.product_list"
					@click="gotoDetail(product.product_id)"
					:key="index"
					:style="{
						background: itemData.style.productBg_color,
						borderTopLeftRadius: itemData.style.product_topRadio * 2 + 'rpx',
						borderTopRightRadius: itemData.style.product_topRadio * 2 + 'rpx',
						borderBottomLeftRadius: itemData.style.product_bottomRadio * 2 + 'rpx',
						borderBottomRightRadius: itemData.style.product_bottomRadio * 2 + 'rpx'
					}"
				>
					<!-- 两列三列 -->
					<view class="product-cover">
						<image :style="{ borderRadius: itemData.style.product_imgRadio * 2 + 'rpx' }" :src="product.product.file_path" mode="aspectFit"></image>
					</view>
					<view class="product-info d-c d-b-s flex-1">
						<view
							class="f28 text-ellipsis"
							v-if="itemData.style.product_name == 1"
							:style="{
								color: itemData.style.productName_color
							}"
						>
							{{ product.product.product_name }}
						</view>
						<view class="d-b-c ww100" v-if="itemData.style.product_schedule == 1">
							<view
								class="slider-box flex-1"
								:style="{
									background: (itemData.style.productSlider_color || '#ffffff') + '30'
								}"
							>
								<view
									:style="{
										background: itemData.style.productSlider_color,
										width: product.saleRate + '%'
									}"
									class="slider-content"
								></view>
							</view>
							<view class="f24 gray9">已抢{{ product.saleRate }}%</view>
						</view>
						<view class="d-b-c ww100">
							<view class="price tc flex-1" style="text-align: left;">
								<text
									class="f28"
									v-if="itemData.style.product_price == 1"
									:style="{
										color: itemData.style.productPrice_color
									}"
								>
									¥{{ product.seckill_price }}
								</text>
								<text
									v-if="itemData.style.product_lineprice == 1"
									:style="{
										color: itemData.style.productLine_color
									}"
									class="text-d-line"
								>
									¥{{ product.product_price }}
								</text>
							</view>
							<view
								:style="{
									background: itemData.style.productLine_btnBackground,
									borderRadius: itemData.style.productLine_btnRadius * 2 + 'rpx',
									color: itemData.style.productLine_btnColor
								}"
								class="btn text-ellipsis tc"
								v-if="itemData.style.product_btn == 1"
							>
								{{ itemData.params.btntext }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Countdown from '@/components/countdown/countdown-act.vue';
export default {
	components: {
		Countdown
	},
	data() {
		return {
			/*倒计时配置*/
			countdownConfig: {
				/*开始时间*/
				startstamp: 0,
				/*结束时间*/
				endstamp: 0,
				/*标题*/
				title: ' ',
				type: 'hours'
			}
		};
	},
	props: ['itemData'],
	created() {
		this.countdownConfig.endstamp = this.itemData.data.end_time;
		this.countdownConfig.startstamp = this.itemData.data.start_time;
	},
	methods: {
		scroll(e) {},

		/*跳转列表*/
		gotoList() {
			let url = '/pagesPlus/seckill/list/list';
			this.gotoPage(url);
		},

		/*跳转产品详情*/
		gotoDetail(e) {
			let url = '/pages/product/detail/detail?product_id=' + e;
			this.gotoPage(url);
		}
	}
};
</script>

<style lang="scss">
.titleImgt {
	width: 100%;
	height: 88rpx;
}
.diy-seckill {
	overflow: hidden;
}

.diy-seckill .diy-head {
	padding: 0 20rpx;
	height: 90rpx;
	background-size: 100% 100% !important;
}

.diy-seckill .diy-head .name {
	font-size: 36rpx;
	font-weight: bold;
	/* width: 100px; */
}

.diy-seckill .diy-head .datetime {
	margin-left: 40rpx;
	border: none;
	white-space: nowrap;
	.text {
		white-space: nowrap;
	}
}

.diy-seckill .diy-head .datetime > text {
	display: inline-block;
}

.diy-seckill .diy-head .datetime .text {
	margin: 0 6rpx;
	line-height: 1;
}
.diy-seckill .diy-head .datetime .hour {
	background: linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255));
	color: rgb(253, 59, 84);
	font-size: 24rpx;
	border-radius: 6rpx;
	padding: 4rpx;
	line-height: 1;
}
.diy-seckill .diy-head .datetime .box {
	padding: 4rpx;
	border-radius: 8rpx;
	background: #000000;
	color: #ffffff;
}

.diy-seckill .product-list {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	// box-shadow: 0px 4px 2px 0px rgba(6, 0, 1, 0.03);
	padding: 20rpx;
}

.diy-seckill .product-list .product-title {
	margin-top: 8rpx;
	height: 80rpx;
	line-height: 40rpx;
	display: -webkit-box;
	overflow: hidden;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

.diy-seckill .display__list .column__3 {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.diy-seckill .product-list.column__3 .product-item {
	/* width: 66px; */
	margin-bottom: 20rpx;
	// margin-right: 23px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	overflow: hidden;
}
.diy-seckill .product-list.column__3 .product-item:last-child {
	margin-bottom: 0;
}
.diy-seckill .product-list.column__3 .product-item .product-cover {
	width: 200rpx;
	height: 200rpx;
	overflow: hidden;
}
.product-info {
	height: 200rpx;
	box-sizing: border-box;
	padding-left: 20rpx;
}
.diy-seckill .product-list.column__3 .product-item .product-cover image {
	width: 200rpx;
	height: 200rpx;
}

.diy-seckill .product-list.column__3 .product-title {
	height: 40rpx;
	overflow: hidden;
}

.slider-box {
	height: 18rpx;
	border-radius: 18rpx;
	position: relative;
	overflow: hidden;
	margin-right: 20rpx;
	background: rgba(#ff6417, 0.1);
}
.slider-box .slider-content {
	position: absolute;
	left: 0;
	top: 0;
	height: 18rpx;
	background: #ff6417;
}
.diy-seckill .product-list.column__3 .product-item .btn {
	width: 162rpx;
	height: 58rpx;
	background: #ff6417;
	border-radius: 30rpx;
	font-size: 28rpx;
	color: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
