<template>
	<view
		class="diy-video"
		:style="{
			background: itemData.style.bgcolor,
			paddingLeft: itemData.style.paddingLeft * 2 + 'rpx',
			paddingRight: itemData.style.paddingLeft * 2 + 'rpx',
			paddingTop: itemData.style.paddingTop * 2 + 'rpx',
			paddingBottom: itemData.style.paddingBottom * 2 + 'rpx'
		}"
	>
		<video
			:style="{
				height: itemData.style.height * 2 + 'rpx',
				borderTopLeftRadius: itemData.style.topRadio * 2 + 'rpx',
				borderTopRightRadius: itemData.style.topRadio * 2 + 'rpx',
				borderBottomLeftRadius: itemData.style.bottomRadio * 2 + 'rpx',
				borderBottomRightRadius: itemData.style.bottomRadio * 2 + 'rpx'
			}"
			:src="itemData.params.videoUrl"
			:poster="itemData.params.poster"
			:autoplay="itemData.params.autoplay == '1'"
			controls
			objectFit="contain"
		></video>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: ['itemData'],
	methods: {}
};
</script>

<style>
.diy-video {
	box-sizing: border-box;
}
.diy-video uni-video,
.diy-video video {
	width: 100%;
	box-sizing: border-box;
	border-radius: 6rpx;
}
</style>
