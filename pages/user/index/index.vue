<template>
	<view :data-theme="theme()" :class="theme() || ''">
		<diy
			style="position: relative;"
			:diyItems="items"
			:userInfo="{
				detail,
				coupon,
				orderCount,
				msgcount
			}"
		>
			<view class="bind_phone" v-if="!detail.mobile">
				<view class="bind_content">
					<view class="bind_txt">确保账户安全，请绑定手机号</view>
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="getPhoneNumber" class="bind_btn" @getphonenumber="getPhoneNumber">去绑定</button>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<button class="bind_btn" @click="bindMobile">去绑定</button>
					<!-- #endif -->
				</view>
			</view>
		</diy>
		<request-loading :loadding="isloadding"></request-loading>
		<tabBar></tabBar>
	</view>
</template>

<script>
import diy from '@/components/diy/diy.vue';
export default {
	components: {
		diy
	},
	data() {
		return {
			items: [],
			isloadding: true,
			/*是否加载完成*/
			loadding: true,
			detail: {
				balance: 0,
				points: 0,
				grade: {
					name: ''
				}
			},
			orderCount: {},
			coupon: 0,
			user_type: '', //用户状态
			msgcount: 0, //用户未读消息
			sessionKey: ''
		};
	},
	onPullDownRefresh() {
		let self = this;
		self.getData();
	},
	onShow() {
		/*获取个人中心数据*/
		this.getData();
		this.getTabBarLinks();
	},
	onLoad() {
		let self = this;
		// if (e.referee_id) {
		// 	uni.setStorageSync('referee_id', e.referee_id);
		// }
		//#ifdef MP-WEIXIN
		wx.login({
			success(res) {
				// 发送用户信息
				self._post(
					'user.user/getSession',
					{
						code: res.code
					},
					result => {
						self.sessionKey = result.data.session_key;
					}
				);
			}
		});
		//#endif
	},
	methods: {
		bindMobile() {
			this.gotoPage("/pages/user/modify-phone/modify-phone");
		},
		getPhoneNumber(e) {
			var self = this;
			if (e.detail.errMsg !== 'getPhoneNumber:ok') {
				return false;
			}
			uni.showLoading({
				title: '加载中'
			})
			uni.login({
				success(res) {
					// 发送用户信息
					self._post('user.user/bindMobile', {
						session_key: self.sessionKey,
						encrypted_data: e.detail.encryptedData,
						iv: e.detail.iv,
					}, result => {
						uni.showToast({
							title: '绑定成功'
						});
						// 执行回调函数
						self.detail.mobile = result.data.mobile;
					}, false, () => {
						uni.hideLoading()
					});
				}
			});
		},
		/*获取数据*/
		getData() {
			let self = this;
			self.isloadding = true;
			self._get(
				'user.index/detail',
				{
					url: self.url
				},
				function(res) {
					if (res.data.getPhone) {
						//#ifdef MP-WEIXIN
						self.gotoPage('/pages/login/bindmobile');
						//#endif
						//#ifndef MP-WEIXIN
						self.bindMobile();
						//#endif
						return;
					}
					self.detail = res.data.userInfo;
					self.coupon = res.data.coupon;
					self.orderCount = res.data.orderCount;
					self.msgcount = res.data.msgcount;
					self.loadding = false;
					uni.stopPullDownRefresh();
					self.getPage();
					self.isloadding = false;
				}
			);
		},
		/*获取数据*/
		getPage() {
			let self = this;
			uni.showLoading({
				title: '加载中'
			});
			self._post('user.index/center', {}, function(res) {
				self.items = res.data.page.items;
				self.setPage(res.data.page.page);
				self.loadding = false;
				uni.hideLoading();
			});
		},
		/*设置页面*/
		setPage(page) {
			uni.setNavigationBarTitle({
				title: page.params.name
			});
		},
		bindMobile() {
			this.gotoPage('/pages/user/modify-phone/modify-phone');
		},
		/*扫一扫核销*/
		scanQrcode: function() {
			this.gotoPage('/pages/user/scan/scan');
		},
		getPhoneNumber(e) {
			var self = this;
			if (e.detail.errMsg !== 'getPhoneNumber:ok') {
				return false;
			}
			uni.showLoading({
				title: '加载中'
			});
			uni.login({
				success(res) {
					// 发送用户信息
					self._post(
						'user.user/bindMobile',
						{
							session_key: self.sessionKey,
							encrypted_data: e.detail.encryptedData,
							iv: e.detail.iv
						},
						result => {
							uni.showToast({
								title: '绑定成功'
							});
							// 执行回调函数
							self.detail.mobile = result.data.mobile;
						},
						false,
						() => {
							uni.hideLoading();
						}
					);
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #ebebeb;
}

.news {
	position: absolute;
	top: 40rpx;
	right: 20rpx;
	z-index: 100;
}

.news .chat {
	width: 40rpx;
	height: 40rpx;
}

.news .icon-xiaoxi {
	font-size: 50rpx;
	color: #ffffff;
}

.news_num {
	position: absolute;
	top: 24rpx;
	right: 44rpx;
	z-index: 100;
	border-radius: 50%;
	width: 25rpx;
	height: 25rpx;
	text-align: center;
	line-height: 25rpx;
	color: #ffffff;
	background-color: #ff6633;
	padding: 5rpx;
	font-size: 20rpx;
}
.w100 {
	width: 100%;
}

.foot_ {
	height: 98rpx;
	width: 100%;
}

.user-header {
	position: relative;
	@include background_color('background_color');
}

.user-header .user-header-inner {
	position: relative;
	padding: 30rpx 30rpx 120rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	overflow: hidden;
	margin-bottom: 100rpx;
}

.user-header .user-header-inner::after,
.user-header .user-header-inner::before {
	display: block;
	content: '';
	position: absolute;
	border-radius: 50%;
	z-index: 0;
}

.user-header .user-header-inner::after {
	width: 400rpx;
	height: 400rpx;
	right: -100rpx;
	bottom: -200rpx;
	background-image: radial-gradient(90deg, rgba(255, 255, 255, 0.2) 10%, rgba(255, 255, 255, 0));
}

.user-header .user-header-inner::before {
	width: 200rpx;
	height: 200rpx;
	left: -60rpx;
	top: -20rpx;
	background-image: radial-gradient(-90deg, rgba(255, 255, 255, 0.2) 10%, rgba(255, 255, 255, 0));
}

.user-header .user-info {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.user-header .photo,
.user-header .photo image {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
}

.user-header .photo {
	border: 4rpx solid #ffffff;
}

.user-header .info {
	padding-left: 20rpx;
	box-sizing: border-box;
	overflow: hidden;
	color: #ffffff;
}

.user-header .info .name {
	font-weight: bold;
	font-size: 32rpx;
}

.user-header .info .tel {
	font-size: 26rpx;
}

.user-header .info .grade {
	display: block;
	padding: 0 16rpx;
	font-size: 22rpx;
	/* height: 36rpx; */
	line-height: 36rpx;
	border-radius: 40rpx;
	background-color: rgba($color: #000000, $alpha: 0.1);
	color: #ffffff;
}
.user-header .my-order {
	position: absolute;
	padding: 0 30rpx;
	/* height: 240rpx; */
	right: 20rpx;
	bottom: -75rpx;
	left: 20rpx;
	box-sizing: border-box;
	border-radius: 16rpx;
	/* box-shadow: 0 0 6rpx 0 rgba(0, 0, 0, 0.1); */
	background: #ffffff;
	z-index: 10;
}

.order_center {
	border-left: 1rpx solid #d9d9d9;
	border-right: 1rpx solid #d9d9d9;
}

.my-order .item {
	display: flex;
	margin: 20rpx 0;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 26rpx;
	flex: 1;
}

.my-assets .icon-box image {
	width: 48rpx;
	height: 48rpx;
	margin-bottom: 16rpx;
}

.my-order .icon-box,
.my-assets .icon-box {
	width: 60rpx;
	height: 60rpx;
}

.my-order .icon-box .iconfont,
.my-assets .icon-box .iconfont {
	font-size: 50rpx;
	color: #333333;
}

.my-assets .icon-box .dot {
	position: absolute;
	top: -13rpx;
	right: -8rpx;
	height: 25rpx;
	min-width: 25rpx;
	padding: 4rpx;
	border-radius: 20rpx;
	font-size: 20rpx;
	background: linear-gradient(180deg, #fc4133, #ff7a04);
	color: #ffffff;
}

.my-assets {
	margin: 0 20rpx;
	padding: 30rpx;
	padding-top: 0;
	background: #ffffff;
	border-radius: 12rpx;
}

.my-assets .item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.my-wallet {
	position: relative;
	width: 200rpx;
	border-left: 1px solid #dddddd;
}

.my-wallet::after {
	position: absolute;
	display: block;
	content: '';
	left: 0;
	border: 8rpx solid transparent;
	border-left-color: #dddddd;
}

.menu-wrap {
	margin: 0 20rpx;
	margin-top: 30rpx;
	background: #ffffff;
	/* box-shadow: 0 0 6rpx 0 rgba(0, 0, 0, 0.1); */
	border-radius: 12rpx;
	padding-bottom: 20rpx;
}

.menu-wrap .group-bd {
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
}

.menu-wrap .item {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 142rpx;
	height: 150rpx;
	font-size: 24rpx;
}
.menu-wrap .icon-round {
	width: 56rpx;
	height: 56rpx;
	color: #ffffff;
}

.menu-wrap .item .iconfont {
	font-size: 40rpx;
	color: #ffffff;
}

.menu-wrap .item .name {
	margin-top: 19rpx;
}

.bind_phone {
	width: 100%;
	height: 80rpx;
	padding: 0 20rpx;
	box-sizing: border-box;
	margin-top: 20rpx;
}

.bind_content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #ffffff;
	/* box-shadow: 0 0 6rpx 0 rgba(0, 0, 0, 0.1); */
	border-radius: 16rpx;
	height: 100%;
	padding: 0 20rpx;
}

.bind_txt {
}

.bind_btn {
	width: 134rpx;
	height: 50rpx;
	line-height: 50rpx;
	font-size: 22rpx;
	border-radius: 25rpx;
	text-align: center;
	color: #ffffff;
	background-color: $dominant-color;
}

.vertical {
	position: absolute;
	top: 10px;
	right: 53px;
	z-index: 100000;
}

.vertical_img {
	width: 100rpx;
	height: 100rpx;
}

.f20 {
	margin-left: 5rpx;
	font-size: 19rpx;
}

.red_mini {
	color: #333333;
	font-size: 36rpx;
	font-weight: bold;
}

.icon-zhuanshutequan {
	color: #f5dca6;
	margin-right: 3px;
}

.news {
	position: absolute;
	top: 40rpx;
	right: 20rpx;
	z-index: 100;
}

.news .chat {
	width: 40rpx;
	height: 40rpx;
}

.news .icon-xiaoxi {
	font-size: 50rpx;
	color: #ffffff;
}

.news_num {
	position: absolute;
	top: 24rpx;
	right: 44rpx;
	z-index: 100;
	border-radius: 50%;
	width: 25rpx;
	height: 25rpx;
	text-align: center;
	line-height: 25rpx;
	color: #ffffff;
	background-color: #ff6633;
	padding: 5rpx;
	font-size: 20rpx;
}

.activity_img {
}

.activity_img image {
	width: 710rpx;
	height: 302rpx;
	margin: 0 auto;
	margin-top: 15rpx;
	border-radius: 12rpx;
}

.my-assets-all {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 90rpx;
	line-height: 90rpx;
}

.my-assets-all .icon.icon-you {
	font-size: 12px;
	color: #999999;
}
</style>
