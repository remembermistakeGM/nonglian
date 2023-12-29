<template>
	<view class="wrap__giftPanel"  v-if="popupVisible" :class="Visible?'bottom-panel open':'bottom-panel close'" @click="closePopup">
		<view class="wrapgift-mask" @tap="closePopup"></view>
		<view class="pop__ui_child anim-footer">
			<view class="progress-bar" v-if="showSlider" @tap.stop="">
				<slider :value="value" activeColor="#f72b6c" backgroundColor="#FFFFFF" block-color="#FFFFFF" @change="sliderChange"
				 :min="0" :max="9" show-value />
			</view>
			<view class="more-box" @tap.stop="">
				<button class="more-list" open-type="share"  @click="share(0, 'WXSceneSession')" style="background-color: #2a2634;padding: 0 12rpx;margin-right: 12rpx">
					<view><text class="icon iconfont icon-weixin i-btntool more-icont">&#xe621;</text></view>
					<view><text class="f28 white">微信好友</text></view>
				</button>
				<button class="more-list" @click="share(0, 'WXSenceTimeline')" style="background-color: #2a2634;padding: 0 12rpx;">
					<view><text class="icon iconfont icon-fenxiang i-btntool more-icont">&#xe617;</text></view>
					<view><text class="f28 white">微信朋友圈</text></view>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/env/config.js";
	export default {
		data() {
			return {
				/*是否可见*/
				popupVisible: false,
				/*分享配置*/
				shareConfig: {},
				// logo
				logo: ''
			}
		},
		created() {
			this.getData();
		},
		props: ['appParams'],
		methods: {
			show(){
				this.popupVisible = true;
				this.getData();
			},
			/*请求对象*/
			getRequest(){
				let self = this;
				// #ifdef APP-PLUS
				return getApp().globalData.vueObj;
				// #endif
				// #ifndef APP-PLUS
				return self;
				// #endif
			},
			getData(){
				let self = this;
				self.getRequest()._get(
					'settings/appShare',{},
					function(res) {
						self.shareConfig = res.data.appshare;
						self.logo = res.data.logo;
						console.log(self.shareConfig)
					}
				);
			},
			/*关闭弹窗*/
			closePopup(type) {
				this.popupVisible = false;
			},
			// 分享
			share: function(shareType, scene) {
				let shareOPtions = {
					provider: "weixin",
					scene: scene, //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈
					type: shareType,
					success: function (res) {
					    console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
					    console.log("fail:" + JSON.stringify(err));
					}
				}
				if(this.shareConfig.type != 2){
					shareOPtions.summary = this.appParams.summary;
					shareOPtions.imageUrl = this.logo;
					shareOPtions.title = this.appParams.title;
					// 公众号/h5
					if(this.shareConfig.type == 1){
						shareOPtions.href = this.shareConfig.open_site + this.appParams.path;
					}else if(this.shareConfig.type == 3){
						//下载页
						if(this.shareConfig.bind_type == 1){
							shareOPtions.href = this.shareConfig.down_url;
						}else{
							shareOPtions.href = config.app_url + "/index.php/api/user.useropen/invite?app_id="+ config.app_id +"&referee_id=" + uni.getStorageSync('user_id');
						}
					}
				}else{
					// 分享到小程序
					shareOPtions.scene = 'WXSceneSession';
					shareOPtions.type = 5;
					shareOPtions.imageUrl = this.appParams.image ? this.appParams.image : this.logo;
					shareOPtions.title = this.appParams.title;
					shareOPtions.miniProgram = {
						id: this.shareConfig.gh_id,
						path: this.appParams.path,
						webUrl: this.shareConfig.web_url,
						type:0
					};
				}
				uni.share(shareOPtions);
			},
		}
	}
</script>

<style scoped>
	.iconfont {
		font-family: iconfont;
	}

	.nlv_borT {
		border-color: #ebebeb;
		border-style: solid;
		border-top-width: 1upx;
	}

	.wrapgift-mask {
		background-color: #000;
		opacity: .1;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 201910;
	}

	.pop__ui_child {
		background-color: #fbfbfb;
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		font-size: 14px;
		overflow: hidden;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 201911;
	}

	.more-box {
		background-color: #2a2634;
		width: 750rpx;
		height: 350rpx;
		position: fixed;
		bottom: 0;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 0 20rpx;
		z-index: 9999;
	}

	.more-list {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
		align-items: center;
		padding: 50rpx 0;
		/* background: #2a2634; */
		/* background-color: #2a2634; */
		border-width: 0;
	}

	.more-icont {
		font-size: 76rpx;
	}

	.more-list-active {
		border-width: 1rpx;
		border-color: #ea4678;
		border-style: solid;
		border-radius: 16rpx;
	}

	.Progress {
		background-color: rgba(0, 0, 0, 0.3);
		/* opacity: 0.3; */
		height: 100rpx;
		width: 700rpx;
		position: fixed;
		bottom: 370rpx;
		border-radius: 16rpx;
		left: 25rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 0 30rpx;
	}

	.progress-bar {
		position: fixed;
		bottom: 360rpx;
		width: 750rpx;
		justify-content: center;
	}

	.wrap__giftPanel {
		z-index: 100;
	}
</style>
