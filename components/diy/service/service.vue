<template>
	<view class="diy-service drag optional drag__nomove" :style="{ right: itemData.style.right + '%', bottom: itemData.style.bottom + '%', opacity: itemData.style.opacity / 100 }">
		<view class="service-icon" v-if="itemData.params.type == 'phone'" @click="callPhone"><image :src="itemData.params.image" mode="aspectFill"></image></view>
		<button class="service-icon" v-if="itemData.params.type == 'chat' && itemData.data" @click="gotoService">
			<image :src="itemData.params.image" mode="aspectFill"></image>
		</button>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	created() {
		console.log(this.itemData.params);
	},
	props: ['itemData'],
	methods: {
		/*拨打电话*/
		callPhone() {
			let self = this;
			uni.makePhoneCall({
				phoneNumber: self.itemData.params.phone_num
			});
		},
		gotoService() {
			if (this.getUserId()) {
				this.gotoPage('/pagesPlus/chat/chat?chat_user_id=' + this.itemData.data + '&nickName=平台客服');
			} else {
				this.doLogin();
			}
		}
	}
};
</script>

<style>
.diy-service {
	position: fixed;
	width: 120rpx;
	height: 120rpx;
	z-index: 90;
	right: 0;
	bottom: 0;
}

.diy-service .service-icon {
	width: 120rpx;
	height: 120rpx;
}

.diy-service button.service-icon {
	padding: 0;
	background: none;
}

.diy-service .service-icon image {
	width: 100%;
	height: 100%;
}
</style>
