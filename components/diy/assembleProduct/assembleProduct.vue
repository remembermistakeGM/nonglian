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
			:style="{
				background: itemData.style.background,
				borderTopLeftRadius: itemData.style.topRadio * 2 + 'rpx',
				borderTopRightRadius: itemData.style.topRadio * 2 + 'rpx',
				borderBottomLeftRadius: itemData.style.bottomRadio * 2 + 'rpx',
				borderBottomRightRadius: itemData.style.bottomRadio * 2 + 'rpx'
			}"
			class="diy-sharpproduct"
		>
			<view
				class="sharpproduct-head d-b-c"
				:style="{
					backgroundImage: itemData.style.bgimage ? 'url(' + itemData.style.bgimage + ')' : ''
				}"
			>
				<view class="left d-s-c">
					<view v-if="itemData.style.titleType == 1" class="name">{{ itemData.params.title }}</view>
					<image v-if="itemData.style.titleType == 2" class="titleImg" :src="itemData.style.title_image" mode="heightFix"></image>
				</view>
				<view
					class="right white d-c-c"
					@click="gotoList"
					style="line-height: 1;"
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
			<view class="product-list assemble column__3 d-s-c">
				<view
					@click="gotoDetail(item)"
					class="product-item"
					:style="{
						background: itemData.style.productBg_color,
						borderTopLeftRadius: itemData.style.product_topRadio * 2 + 'rpx',
						borderTopRightRadius: itemData.style.product_topRadio * 2 + 'rpx',
						borderBottomLeftRadius: itemData.style.product_bottomRadio * 2 + 'rpx',
						borderBottomRightRadius: itemData.style.product_bottomRadio * 2 + 'rpx'
					}"
					v-for="(item, index) in itemData.data.product_list"
					:key="index"
				>
					<view class="product-cover">
						<image :style="{ borderRadius: itemData.style.product_imgRadio * 2 + 'rpx' }" :src="item.product.file_path" mode="aspectFit"></image>
						<view
							class="desc-situation product-sale"
							v-if="itemData.style.product_numberbtn == 1"
							:style="{
								color: itemData.style.number_color,
								backgroundImage: 'linear-gradient(to right, ' + (itemData.style.title_color1 || '#fff') + ', ' + (itemData.style.title_color2 || '#fff') + ')'
							}"
						>
							<text class="">{{ item.assemble_num }}人团</text>
						</view>
					</view>
					<view class="d-c d-c-c">
						<view v-if="itemData.style.product_name == 1" class="product-title text-ellipsis tc">{{ item.product.product_name }}</view>
						<view
						class="mb10"
							:style="{
								color: itemData.style.productPrice_color
							}"
							v-if="itemData.style.product_price == 1"
						>
							<text class="f24">¥</text>
							<text class="f28 fb">{{ item.assemble_price }}</text>
						</view>
						<view
							:style="{
								color: itemData.style.productLine_color
							}"
							v-if="itemData.style.product_lineprice == 1"
							class="text-d-line-through gray9 f24 mb10"
						>
							¥{{ item.product_price }}
						</view>
						<view
							:style="{
								background: itemData.style.productLine_btnBackground,
								borderRadius: itemData.style.productLine_btnRadius + 'px',
								color: itemData.style.productLine_btnColor
							}"
							class="assemble_btns text-ellipsis tc"
							v-if="itemData.style.product_btn == 1"
						>
							{{ itemData.params.btntext }}
						</view>
					</view>
				</view>
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
		console.log(this.$props.itemData);
	},
	methods: {
		scroll(e) {},

		/*跳转列表*/
		gotoList() {
			let url = '/pagesPlus/assemble/list/list';
			this.gotoPage(url);
		},

		/*跳转产品详情*/
		gotoDetail(e) {
			let url = '/pagesPlus/assemble/detail/detail?assemble_product_id=' + e.assemble_product_id;
			this.gotoPage(url);
		}
	}
};
</script>

<style lang="scss">
.diy-sharpproduct {
	overflow: hidden;
}

.diy-sharpproduct .product-list.assemble {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	background-color: #ffffff;
	overflow-x: auto;
	padding-left: 20rpx;
	padding-top: 20rpx;
}

.diy-sharpproduct .product-list.assemble .product-title {
	margin-bottom: 36rpx;
}

.diy-sharpproduct .product-list.assemble .price {
	margin: 0 auto;
	margin-top: 20rpx;
	margin-bottom: 30rpx;
	width: 100%;
	display: -webkit-box;
	overflow: hidden;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	text-align: center;
}

.diy-sharpproduct .display__list .column__3 {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.diy-sharpproduct .product-list.assemble.column__3 {
	flex-wrap: nowrap;
	overflow-x: auto;
}

.diy-sharpproduct .product-list.assemble.column__3 .product-item {
	width: 198rpx;
	margin-right: 20rpx;
	overflow: hidden;
	margin-bottom: 20rpx;
	background: #ffffff;
	flex-shrink: 0;
	margin-right: 32rpx;
	background: #fff;
	// padding: 15px;
	box-sizing: border-box;
}

.diy-sharpproduct .product-list.assemble.column__3 .product-item .product-cover {
	width: 198rpx;
	height: 198rpx;
	overflow: hidden;
	position: relative;
}

.diy-sharpproduct .product-list.assemble.column__3 .product-item .product-cover image {
	width: 198rpx;
	height: 198rpx;
}

.diy-sharpproduct .product-list.assemble.column__3 .product-item .product-cover .desc-situation {
	position: absolute;
	top: 12rpx;
	left: 0px;
	background: linear-gradient(60deg, #fc4528 0%, #fc573c 43%, #fc7639 100%);
	color: #ffffff !important;
	padding: 0 24rpx;
	height: 40rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	line-height: 1;
	border-bottom-left-radius: 12rpx;
	border-top-right-radius: 12rpx;
}

.diy-sharpproduct .product-list.assemble.column__3 .product-title {
	margin-bottom: 16rpx;
	
}

.sharpproduct-head {
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

.sharpproduct-head .name.assemble_name {
	font-size: 36rpx;
	font-weight: bold;
	width: 200rpx;
}

.sharpproduct-head .datetime {
	margin-left: 40rpx;
}

.sharpproduct-head .datetime > span {
	display: inline-block;
}

.sharpproduct-head .datetime .text {
	padding: 0 4rpx;
}

.sharpproduct-head .datetime .box {
	padding: 4rpx;
	background: #000000;
	color: #ffffff;
}

.diy-sharpproduct .product-list.assemble .assemble_btns {
	font-size: 20rpx;
	text-align: center;
	width: 126rpx;
	height: 40rpx;
	line-height: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}
.titleImg {
	width: 100%;
	height: 88rpx;
}
</style>
