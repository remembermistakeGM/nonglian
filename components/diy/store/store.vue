<template>
	<view
		:style="{
			background: itemData.style.bgcolor,
			paddingLeft: itemData.style.paddingLeft * 2 + 'rpx',
			paddingRight: itemData.style.paddingLeft * 2 + 'rpx',
			paddingTop: itemData.style.paddingTop * 2 + 'rpx',
			paddingBottom: itemData.style.paddingBottom * 2 + 'rpx'
		}"
	>
		<view
			class="diy-store"
			:style="{
				background: itemData.style.background,
				borderTopLeftRadius: itemData.style.topRadio * 2 + 'rpx',
				borderTopRightRadius: itemData.style.topRadio * 2 + 'rpx',
				borderBottomLeftRadius: itemData.style.bottomRadio * 2 + 'rpx',
				borderBottomRightRadius: itemData.style.bottomRadio * 2 + 'rpx'
			}"
		>
			<view class="diy-head d-b-c">
				<view class="left d-s-c"><view class="name">线下门店</view></view>
			</view>
			<view class="p-0-20">
				<view class="store-item d-s-c p-30-0" :key="index" v-for="(store, index) in itemData.data" @click="gotoDetail(store.store_id)">
					<view class="store-item-logo mr30"><image :src="store.logo_image" mode="aspectFill"></image></view>
					<view class="flex-1 o-h">
						<view class="ww100 f34 gray3 text-ellipsis">
							<text>{{ store.store_name }}</text>
						</view>
						<view class="text-ellipsis mt10 f24 gray3">
							<text class="gray3">门店地址：</text>
							<text class="gray6">{{ store.region.province }}{{ store.region.city }}{{ store.region.region }}{{ store.address }}</text>
						</view>
						<view class="mt10 f24">
							<text class="gray3">联系电话：</text>
							<text class="gray6">{{ store.phone }}</text>
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: ['itemData'],
	methods: {
		/*跳转门店详情*/
		gotoDetail(e) {
			let url = 'pages/store/detail/detail?store_id=' + e;
			this.gotoPage(url);
		}
	}
};
</script>

<style>
.diy-store {
}
.diy-store .diy-head {
	padding: 0 20rpx;
	height: 100rpx;
}
.diy-store .diy-head .name {
	font-size: 36rpx;
	font-weight: bold;
}
.diy-store .store-item {
	border-top: 1rpx solid #eeeeee;
}
.diy-store .store-item-logo,
.diy-store .store-item-logo image {
	width: 120rpx;
	height: 120rpx;
}
</style>
