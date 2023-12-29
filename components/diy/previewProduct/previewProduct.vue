<template>
	<view
		v-if="itemData.data.length > 0"
		class="drag optional "
		:style="{
			background: itemData.style.bgcolor,
			paddingLeft: itemData.style.paddingLeft * 2 + 'rpx',
			paddingRight: itemData.style.paddingLeft * 2 + 'rpx',
			paddingTop: itemData.style.paddingTop * 2 + 'rpx',
			paddingBottom: itemData.style.paddingBottom * 2 + 'rpx'
		}"
	>
		<view
			class="diy-sharpproduct"
			:style="{
				background: itemData.style.background,
				borderTopLeftRadius: itemData.style.topRadio * 2 + 'rpx',
				borderTopRightRadius: itemData.style.topRadio * 2 + 'rpx',
				borderBottomLeftRadius: itemData.style.bottomRadio * 2 + 'rpx',
				borderBottomRightRadius: itemData.style.bottomRadio * 2 + 'rpx'
			}"
		>
			<view
				class="sharpproduct-head d-b-c"
				:style="{
					backgroundImage: itemData.style.bgimage ? 'url(' + itemData.style.bgimage + ')' : ''
				}"
			>
				<view class="left d-s-c">
					<view
						v-if="itemData.style.titleType == 1"
						:style="{
							color: itemData.style.titleColor,
							fontSize: itemData.style.titleSize * 2 + 'rpx'
						}"
						class="name"
					>
						{{ itemData.params.title }}
					</view>
					<image v-if="itemData.style.titleType == 2" class="titleImg" :src="itemData.style.title_image" mode="heightFix"></image>
				</view>
				<view
					class="right white d-c-c"
					style="line-height: 1;"
					 @click="gotoList"
					:style="{
						color: itemData.style.moreColor,
						fontSize: itemData.style.moreSize * 2 + 'rpx'
					}"
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
					:style="{
						background: itemData.style.productBg_color,
						borderBottomLeftRadius: itemData.style.product_bottomRadio * 2 + 'rpx',
						borderBottomRightRadius: itemData.style.product_bottomRadio * 2 + 'rpx',
						borderTopLeftRadius: itemData.style.product_topRadio * 2 + 'rpx',
						borderTopRightRadius: itemData.style.product_topRadio * 2 + 'rpx'
					}"
					 @click="gotoDetail(item.product_id)"
					v-for="(item, index) in itemData.data"
					:key="index"
				>
					<!-- 两列三列 -->
					<view class="product-cover pr">
						<image :style="{ borderRadius: itemData.style.product_imgRadio * 2 + 'rpx' }" :src="item.product_image" mode="aspectFit"></image>
						<view
							:style="{
								color: itemData.style.tagColor,
								background: itemData.style.bgTag
							}"
							v-if="itemData.style.product_tag == 1"
							class="product-tag"
						>
							预告
						</view>
					</view>
					<view class="product-info p-0-10">
						<view class="price ww100 f12 tc">
							<view
								class="f12 tc text-ellipsis"
								v-if="itemData.style.product_name == 1"
								:style="{
									color: itemData.style.productName_color
								}"
							>
								{{ item.product_name }}
							</view>
							<view
								class="f14 tc"
								v-if="itemData.style.product_price == 1"
								:style="{
									color: itemData.style.productPrice_color
								}"
							>
								¥{{ item.product_price }}
							</view>
							<view
								v-if="itemData.style.product_lineprice == 1"
								:style="{
									color: itemData.style.productLine_color
								}"
								class="f12 text-d-line"
							>
								¥{{ item.line_price }}
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
				title: ' '
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
			let url = '/pagesPlus/preview/list';
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

<style lang="scss" scoped>
.diy-sharpproduct {
	overflow: hidden;
	// padding: 10px;
}

.diy-sharpproduct .product-list {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	padding-top: 22rpx;
	padding-left: 20rpx;
	// box-shadow: 0px 8rpx 4rpx 0px rgba(6, 0, 1, 0.03);
	padding-bottom: 20rpx;
}

.diy-sharpproduct .display__list .column__3 {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 20rpx;
}

.diy-sharpproduct .product-list.column__3 .product-item {
	width: 198rpx;
	margin-right: 38rpx;
	padding-bottom: 10rpx;
	overflow: hidden;
}
.diy-sharpproduct .product-list.column__3 .product-item:last-child {
	margin-right: 0;
}
.diy-sharpproduct .product-list.column__3 .product-item .product-cover {
	width: 198rpx;
	height: 198rpx;
	position: relative;
	overflow: hidden;
	margin-bottom: 12rpx;
}

.diy-sharpproduct .product-list.column__3 .product-item .product-cover image {
	width: 198rpx;
	height: 198rpx;
}
.diy-sharpproduct .sharpproduct-head {
	height: 88rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	margin: 0;
	padding: 0 20rpx;
	background-repeat: no-repeat;
	background-size: cover;
	line-height: 1;
}

.sharpproduct-head .name {
	font-size: 36rpx;
	font-weight: bold;
	width: 200rpx;
}
.titleImg {
	width: auto;
	height: 88rpx;
}
.product-info {
	height: auto;
}
.product-tag {
	font-size: 24rpx;
	text-align: center;
	width: 48rpx;
	padding: 4rpx;
	box-sizing: border-box;
	// height: 32px;
	line-height: 1.5;
	position: absolute;
	top: 0;
	right: 20rpx;
	border-bottom-left-radius: 40rpx;
	border-bottom-right-radius: 40rpx;
	margin: 0 auto;
}
</style>
