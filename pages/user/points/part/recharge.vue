<template>
	<view :class="Visible ? 'pop-bg open' : 'pop-bg close'" @click.stop="closePop(null)">
		<view class="pop-content" @click.stop>
			<view class="recharge-top theme-bg mb30">
				<view class="recharge-icon left"></view>
				<view class="recharge-icon right"></view>
			</view>
			<view class="f30 gray3 ww100 mb35 tc fb">{{points_name()}}提现</view>
			<view class="input-box"><input type="digit" :placeholder="'请输入兑换'+points_name()+'值'" v-model="value" />
				<image class="input-err" src="/static/icon/input-err.png" mode="" @click="value = ''"></image>
			</view>
			<view class="gray9 f26 tc mt30" style="margin-bottom: 56rpx;">注:1{{points_name()}} = {{discount_ratio}} 余额</view>
			<view class="ww100 d-c-c">
				<view class="sub-btn theme-btn" @click="submit()">确认</view>
				<view class="close-btn theme-borderbtn" @click="closePop(null)">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more.vue";
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				input_len: 6,
				/*是否可见*/
				Visible: false,
				value: '',
				is_send: false,
			}
		},
		props: ['isPop', 'discount_ratio'],
		watch: {
			isPop: function(n, o) {
				let self = this;
				if (n != o) {
					self.Visible = n;
				}
			},
		},
		methods: {
			submit() {
				let self = this;
				if (self.is_send) {
					return
				}
				self.is_send = true;
				let page = self.page;
				let list_rows = self.list_rows;
				self._get('user.User/transPoints', {
					points: self.value
				}, function(res) {
					self.is_send = false;
					self.showSuccess(res.msg, () => {
						self.closePop(true);
					})
				}, (err) => {
					self.is_send = false;
				});
			},
			closePop(e) {
				this.$emit('close', e);
				this.value = '';
			},
		}
	}
</script>

<style lang="scss">
	.recharge-top {
		height: 75rpx;
		position: relative;
		border-radius: 25rpx 25rpx 0 0;
		.recharge-icon {
			width: 12rpx;
			height: 49rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 8rpx 3rpx 0rpx rgba(6, 0, 1, 0.03);
			border-radius: 6rpx;
			position: absolute;
			top: -15rpx;

		}

		.recharge-icon.left {
			left: 156rpx;
		}

		.recharge-icon.right {
			right: 156rpx;
		}
	}

	.input-box {
		width: 428rpx;
		height: 72rpx;
		border: 1rpx solid #EEEEEE;
		border-radius: 15rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 14rpx 0 21rpx;
		margin: 0 auto;

		input {
			border: none;
			font-size: 26rpx;
			color: #999999;
			flex: 1;
		}
	}

	.input-err {
		width: 42rpx;
		height: 42rpx;
		flex-shrink: 0;
		margin-left: 18rpx;
	}

	.sub-btn {
		width: 148rpx;
		height: 48rpx;
		border-radius: 36rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-content: center;
		margin-right: 93rpx;
		line-height: 48rpx;
	}

	.close-btn {
		width: 148rpx;
		height: 48rpx;
		border-radius: 36rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-content: center;
		line-height: 48rpx;
	}

	.dominant {
		color: $dominant-color;
	}

	.pop-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		z-index: 99;

		.pop-content {
			position: fixed;
			z-index: 100;
			bottom: 0;
			left: 0;
			right: 0;
			top: 0;
			margin: auto;
			width: 516rpx;
			height: 477rpx;
			padding: 0 0 32rpx 0;
			box-sizing: border-box;
			transform: translate3d(0, 0, 0);
			transition: transform 0.2s cubic-bezier(0, 0, 0.25, 1);
			background-color: #FFFFFF;
			border-radius: 25rpx;
		}
	}

	.pop-bg.close {
		// display: none;
		height: 0;

		.pop-content {
			transform: translate3d(0, 2000rpx, 0);
		}
	}

	.code-image {
		width: 360rpx;
		height: 360rpx;

	}

	.icon-img {
		width: 40rpx;
		height: 40rpx;
		margin-right: 16rpx;

	}

	.close-img {
		width: 32rpx;
		height: 32rpx;
		position: absolute;
		right: 32rpx;
		top: 32rpx;
	}

	.input-item {
		width: 72rpx;
		height: 96rpx;
		background: #ffffff;
		border-radius: 0px;
		font-size: 40rpx;
		color: rgba(0, 0, 0, 0.87);
		font-weight: 600;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 2rpx solid #00BDBD;
		margin-right: 16rpx;
		text-align: center;
		line-height: 96rpx;
	}

	.input-item:last-child {
		margin-right: 0;
	}

	.input-hid {
		margin-left: -100%;
	}

	.get-code-btn {
		background-color: #FFFFFF;
		color: $dominant-color;
		background: none;
		padding: 0;
		margin: 0 auto;
	}

	button[disabled]:not([type]).get-code-btn {
		background-color: #FFFFFF;
		color: #999999;
	}
</style>
