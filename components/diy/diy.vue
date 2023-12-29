<template>
	<view>
		<block v-for="(item,index) in diyItems" :key="index">

			<!--轮播图-->
			<template v-if="item.type==='banner'&&item.data!=null">
				<banner :itemData="item"></banner>
			</template>

			<!--单组图-->
			<template v-if="item.type==='imageSingle'&&item.data!=null">
				<imagesingle :itemData="item"></imagesingle>
			</template>

			<!-- 橱窗-->
			<template v-if="item.type == 'window'&&item.data!=null">
				<windows :itemData="item"></windows>
			</template>

			<!-- 视频组-->
			<template v-if="item.type == 'video'">
				<videos :itemData="item"></videos>
			</template>

			<!--文章-->
			<template v-if="item.type == 'article'&&item.data!=null">
				<articles :itemData="item"></articles>
			</template>

			<!--头条快报-->
			<template v-if="item.type == 'special'&&item.data!=null">
				<special :itemData="item"></special>
			</template>

			<!--公告组-->
			<template v-if="item.type == 'notice'">
				<notice :itemData="item"></notice>
			</template>
			<!--标题组-->
			<template v-if="item.type == 'title'">
				<titles :itemData="item"></titles>
			</template>
			<!--导航组-->
			<template v-if="item.type==='navBar'&&item.data!=null">
				<navBar :itemData="item"></navBar>
			</template>

			<!--商品组-->
			<template v-if="item.type==='product'&&item.data!=null">
				<product :itemData="item"></product>
			</template>

			<!--优惠券-->
			<template v-if="item.type==='coupon'&&item.data!=null">
				<coupon :itemData="item"></coupon>
			</template>

			<!--门店-->
			<template v-if="item.type == 'store'&&item.data!=null">
				<store :itemData="item"></store>
			</template>

			<!--客服-->
			<template v-if="item.type == 'service'">
				<service :itemData="item"></service>
			</template>
			<!--视频直播-->
			<template v-if="item.type == 'videoLive'">
				<shipinLiveIndex :itemData="item" ref="shipinLiveRef"></shipinLiveIndex>
			</template>
			<!--富文本-->
			<template v-if="item.type==='richText'">
				<richText :itemData="item"></richText>
			</template>

			<!--辅助空白-->
			<template v-if="item.type == 'blank'">
				<blank :itemData="item"></blank>
			</template>

			<!--辅助线-->
			<template v-if="item.type == 'guide'">
				<guide :itemData="item"></guide>
			</template>

			<!--秒杀-->
			<template v-if="item.type == 'seckillProduct'&&item.data!=null">
				<seckillProduct :itemData="item"></seckillProduct>
			</template>
			<!--预告-->
			<template v-if="item.type == 'previewProduct'&&item.data!=null">
				<previewProduct :itemData="item"></previewProduct>
			</template>
			<!--拼团-->
			<template v-if="item.type == 'assembleProduct'&&item.data!=null">
				<assembleProduct :itemData="item"></assembleProduct>
			</template>

			<!--砍价-->
			<template v-if="item.type == 'bargainProduct'&&item.data!=null">
				<bargainProduct :itemData="item"></bargainProduct>
			</template>
			<!-- #ifdef APP-PLUS -->
			<!--直播-->
			<template v-if="item.type == 'live'&&item.data!=null">
				<live :itemData="item"></live>
			</template>
			<!-- #endif -->
			<!--个人信息-->
			<template v-if="item.type === 'base'">
				<userBase :itemData="item" :userInfo="userInfo">
					<slot />
				</userBase>
			</template>
			<!--个人信息-->
			<template v-if="item.type === 'order'">
				<order :itemData="item" :userInfo="userInfo"></order>
			</template>
		</block>
	</view>
</template>

<script>
	import banner from './banner/banner.vue';
	import imagesingle from './imagesingle/imagesingle.vue';
	import windows from './window/window.vue';
	import videos from './videos/videos.vue';
	import articles from './article/article.vue';
	import special from './special/special.vue';
	import notice from './notice/notice.vue';
	import titles from './title/title.vue';
	import coupon from './coupon/coupon.vue';
	import richText from './richText/richText.vue';
	import navBar from './navBar/navBar.vue';
	import store from './store/store.vue';
	import service from './service/service.vue';
	import shipinLiveIndex from './shipinLive/shipinLive.vue';
	import blank from './blank/blank.vue';
	import guide from './guide/guide.vue';
	import product from './product/product.vue';
	import seckillProduct from './seckillProduct/seckillProduct.vue';
	import assembleProduct from './assembleProduct/assembleProduct.vue';
	import bargainProduct from './bargainProduct/bargainProduct.vue';
	import previewProduct from './previewProduct/previewProduct.vue';
	import userBase from './base/base';
	import order from './order/order';
	// #ifdef APP-PLUS
	import live from './live/live.vue';
	// #endif


	export default {
		components: {
			banner,
			imagesingle,
			shipinLiveIndex,
			windows,
			videos,
			articles,
			special,
			notice,
			titles,
			coupon,
			richText,
			navBar,
			store,
			service,
			blank,
			guide,
			product,
			seckillProduct,
			assembleProduct,
			bargainProduct,
			previewProduct,
			userBase,
			order,
			// #ifdef APP-PLUS
			live
			// #endif
		},
		data() {
			return {

			}
		},
		props: ['diyItems','userInfo','serviceUserId'],
		created() {},
		methods: {
			loadinData(){
				this.$nextTick(()=>{
					if(this.$refs.shipinLiveRef && this.$refs.shipinLiveRef[0]){
						this.$refs.shipinLiveRef[0].getData();
					}
				})
			}
		},
	}
</script>

<style>
</style>