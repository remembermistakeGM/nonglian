<template>
	<view
		class="diy-banner-box pr"
		:style="{
			background: itemData.style.background,
			paddingLeft: itemData.style.paddingLeft * 2 + 'rpx',
			paddingRight: itemData.style.paddingLeft * 2 + 'rpx',
			paddingTop: itemData.style.paddingTop * 2 + 'rpx',
			paddingBottom: itemData.style.paddingBottom * 2 + 'rpx'
		}"
	>
		<swiper class="swiper" :autoplay="autoplay" :interval="2000" :duration="duration" @change="changeSwiper" :style="'height:' + itemData.style.height + 'rpx;'">
			<swiper-item
				class="o-h"
				:style="{
					height: itemData.style.height + 'rpx',
					borderRadius:
						itemData.style.topRadio * 2 +
						'rpx ' +
						itemData.style.topRadio * 2 +
						'rpx ' +
						itemData.style.bottomRadio * 2 +
						'rpx ' +
						itemData.style.bottomRadio * 2 +
						'rpx'
				}"
				v-for="(item, index) in itemData.data"
				:key="index"
				@click="gotoPages(item)"
			>
				<image
					:style="{
						height: itemData.style.height + 'rpx',
						borderRadius:
							itemData.style.topRadio * 2 +
							'rpx ' +
							itemData.style.topRadio * 2 +
							'rpx ' +
							itemData.style.bottomRadio * 2 +
							'rpx ' +
							itemData.style.bottomRadio * 2 +
							'rpx'
					}"
					:src="item.imgUrl"
				></image>
				<view class="swiper-dots ww100 d-c-c" :class="itemData.style.imgShape">
					<view
						:class="current == index ? 'swiper-dot active' : 'swiper-dot'"
						v-for="(item, index) in itemData.data"
						:style="'background-color:' + indicatorActiveColor"
						:key="index"
					></view>
				</view>
			</swiper-item>
			
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			indicatorActiveColor: '#ffffff',
			current: 0
		};
	},
	props: ['itemData'],
	created() {
		this.indicatorActiveColor = this.itemData.style.btnColor;
	},
	methods: {
		changeSwiper(e) {
			this.current = e.detail.current;
		},
		/*跳转页面*/
		gotoPages(e) {
			this.gotoPage(e.linkUrl);
		}
	}
};
</script>

<style>
.diy-banner-box {
	overflow: hidden;
	box-sizing: border-box;
}
.diy-banner-box,
.diy-banner-box .swiper {
	width: 100%;
	/* background-color: #FFFFFF; */
}
.diy-banner-box image {
	width: 100%;
}
.diy-banner-box .swiper-dots {
	position: absolute;
	bottom: 20rpx;
	left: 0;
	right: 0;
	margin: auto;
	width: 100%;
	z-index: 2;
}

.swiper-dots.square .swiper-dot {
	width: 14rpx;
	height: 14rpx;
	margin: 0 4rpx;
	background: #ebedf0;
	opacity: 0.3;
}

.swiper-dots.round .swiper-dot {
	width: 22rpx;
	height: 22rpx;
	margin: 0 4rpx;
	background: #ebedf0;
	opacity: 0.3;
	border-radius: 50%;
}

.swiper-dots.rectangle .swiper-dot {
	width: 40rpx;
	height: 6rpx;
	margin: 0 4rpx;
	background: #ebedf0;
	opacity: 0.3;
	border-radius: 4rpx;
}

.swiper-dots.round .swiper-dot.active,
.swiper-dots.square .swiper-dot.active,
.swiper-dots.rectangle .swiper-dot.active {
	opacity: 1;
}
</style>
