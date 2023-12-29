<template>
	<view class="share-shadow" :style="'height:'+winHeight+' ;'">
		<view class="share-wrap">
			<view class="content ww100">
				<image :src="qrcode" mode="widthFix"></image>
				<button class="btn-rose-shadow mt20" type="default" @tap="savePosterImg">保存图片</button>
			</view>
			<view class="close-btns" @tap="hidePopupFunc(true)"><text class="icon iconfont icon-guanbi"></text></view>
		</view>		
	</view>
</template>

<script>
export default {
	data() {
		return {
			/*展示类别*/
			type: 0,
			/*宽度*/
			width: 600,
			/*高度*/
			/*背景颜色*/
			backgroundColor: 'none',
			/*阴影*/
			boxShadow: 'none',
			form: {},
			coupon: []
		};
	},
	props: ['qrcode','winHeight'],
	
	created() {
		
	},
	mounted() {
		/*获取弹出层内容*/
		this.setData();
	},
	methods: {
		/*获取弹出层内容*/
		setData() {
			console.log(this.winHeight)
		},
		/*关闭弹窗*/
		hidePopupFunc(e) {
			this.isPopup = false;
			this.$emit('close');
		},
		
		//保存海报图片
		savePosterImg() {
			let self = this;
			uni.showLoading({
				title: '加载中'
			});
			// 下载海报图片
			uni.downloadFile({
				url: self.qrcode,
				success(res) {
					uni.hideLoading();
					// 图片保存到本地
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success(data) {
							uni.showToast({
								title: '保存成功',
								icon: 'success',
								duration: 2000
							});
							// 关闭商品海报
							self.isCreatedImg = false;
						},
						fail(err) {
							if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
								uni.showToast({
									title: '请允许访问相册后重试',
									icon: 'none',
									duration: 1000
								});
								setTimeout(() => {
									uni.openSetting();
								}, 1000);
							}
						},
						complete(res) {
							console.log('complete');
						}
					});
				}
			});
		},
		
	}
};
</script>

<style scoped>
.share-shadow{
	position: fixed;
	top:0;
	z-index: 1010;
	width: 750rpx;
	background-color: #00000030;
}
.share-wrap {
	width: 90%;
	border-radius: 20upx;
	overflow: hidden;
	padding-top: 130rpx;
	margin: 0 auto;
}

.share-wrap .content image{
	width: 100%;
}

.share-wrap .close-btns {
	margin: 10rpx auto 0;
	width: 60rpx;
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background: none;
	border: 2px solid #ffffff;
}

.home-push-wrap .close-btns .iconfont {
	color: #ffffff;
}
</style>
