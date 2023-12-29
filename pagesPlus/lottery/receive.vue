<template>
	<view class="gift-package" v-if="!loadding">
		<view class="p20">
			<view class="f30 gray6 mb20">配送地址</view>
			<view class="o-h" style="border-radius: 20rpx;">
				<Myinfo :Address="Address" :existAddress="existAddress"></Myinfo>
			</view>
		</view>
		<view class="p20">
			<view class="f30 gray6 mb20">中奖商品</view>
			<view class="gift-package-main">
				<view class="cuopon-group">
					<view class="body">
						<view class="item bg-white">
							<view class="d-s-c">
								<view>
									<image class="product_img" :src="detail.image" mode="aspectFill"></image>
								</view>
								<view class="pro">
									<view class="pro_t">{{ detail.record_name }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btns d-e-c">
			<button @click="onPay()" class="mr20" v-if="detail.province_id == ''">确认领取</button>
			<button class="mr20" v-if="detail.status==1&&detail.delivery_status==10">待发货</button>
		</view>
	</view>
</template>

<script>
	import Myinfo from '@/pages/order/confirm-order/my-info';
	import utils from '@/common/utils.js';
	export default {
		components: {
			Myinfo
		},
		data() {
			return {
				record_id: 0,
				/*是否加载完成*/
				loadding: true,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				id: 0,
				tab_type: 0,
				/*详情*/
				detail: {},
				// 是否存在收货地址
				existAddress: false,
				/*默认地址*/
				Address: null,
			};
		},
		onLoad(e) {
			let self = this;
			let scene = utils.getSceneData(e);
			/*商品id*/
			this.record_id = e.record_id;
		},
		onShow() {
			this.getData();
		},
		methods: {
			onPay() {
				let self = this;
				if (self.Address == null) {
					self.showError('请选择收件地址');
					return;
				}
				uni.showLoading({
					title: '加载中'
				});

				let params = {
					record_id: self.record_id
				};
				self._post('plus.lottery.order/buy', params, function(res) {
					self.showSuccess('领取成功，请等待工作人员处理', function(res) {
						uni.navigateBack();
					});
				});
			},

			/*获取数据*/
			getData() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				self.loadding = true;
				let params = {
					record_id: self.record_id,
				};
				self._get(
					'plus.lottery.order/buy',
					params,
					function(res) {
						self.detail = res.data.data.detail;
						self.existAddress = res.data.data.existAddress;
						self.Address = res.data.data.address;
						uni.hideLoading();
						self.loadding = false;
					},
					function(res) {
						uni.navigateBack({
							delta: 1
						});
					}
				);
			},

			hasType(e) {
				if (this.deliverySetting.indexOf(e) != -1) {
					return true;
				} else {
					return false;
				}
			},

			/*选择配送方式*/
			tabFunc(e) {
				this.tab_type = e;
				if (e == 0) {
					this.delivery = 10;
				} else {
					this.delivery = 20;
				}
				this.getData();
			},
			choosePaytype(payType) {
				this.payType = payType;
			},
			/*关闭弹窗*/
			closePopup(e, params) {
				this.isPopup = false;
				console.log(params);
				if (e && e.specAttr) {
					this.detail['specName'] = '';
					let has = '已选：';
					let noone = '';
					e.specAttr.forEach(item => {
						if (item.specItems) {
							let h = '';
							for (let i = 0; i < item.specItems.length; i++) {
								let child = item.specItems[i];
								if (child.checked) {
									h = child.specValue + ' / ';
									break;
								}
							}
							if (h != '') {
								has += h;
							} else {
								noone += item.groupName;
							}
						}
					});
					this.productSkuId = params.productSkuId;
					if (noone != '') {
						this.detail.specName = noone;
					} else {
						has = has.replace(/(\s\/\s)$/gi, '');
						this.detail.specName = has;
					}
					console.log(this.detail.specName);
				}
			},
			/* 打开弹窗 */
			openPopup(e, spe, detail) {
				let obj = {
					specData: spe,
					detail: detail,
					productSpecArr: spe != null ? new Array(spe.specAttr.length) : [],
					showSku: {
						skuImage: '',
						seckillPrice: 0,
						productSkuId: 0,
						linePrice: 0,
						seckillStock: 0,
						seckillProductSkuId: 0,
						sum: 1
					},
					type: e
				};
				this.productModel = obj;
				this.isPopup = true;
			}
		}
	};
</script>

<style>
	page {
		background-color: #f2f2f2;
	}

	/*top-tab*/
	.top-tabbar {
		height: 90rpx;
		line-height: 86rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #ffffff;
		border-bottom: 1px solid #dddddd;
	}

	.tab-item {
		flex: 1;
		height: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		color: #666666;
	}

	/*  */
	.gift-package {
		position: relative;
		min-height: 100vh;
		padding-bottom: 100rpx;
	}

	.gift-package .gift-package-main {
		background: #ffffff;
		padding: 25rpx 20rpx;
		border-radius: 20rpx;
		box-sizing: border-box;
	}

	.order_tit {
		padding-left: 30rpx;
		font-size: 28rpx;
		margin-bottom: 73rpx;
	}

	.gift-package-main .giftpackagr-info {
		margin: 0 auto;
		width: 350rpx;
		height: 43rpx;
		line-height: 43rpx;
		border: 1rpx solid #fa212c;
		margin-top: 18rpx;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 30rpx;
		text-align: center;
	}

	.gift-package-main .giftpackagr-info .detatime {
		/* padding:10px 30px; */
		font-size: 18rpx;
		color: #fa1f29;
		font-weight: 800;
	}

	.cuopon-group {
		color: #ffffff;
		text-align: center;
		font-size: 30rpx;
		background-color: #ffffff30;
		border-radius: 15rpx;
	}

	.cuopon-title {
		color: #919191;
		font-size: 35rpx;
		margin-bottom: 20rpx;
	}

	.cuopon-group .title {
		font-size: 24rpx;
		color: #cacaca;
		text-align: left;
	}

	.cuopon-group .body {}

	.cuopon_item {
		position: relative;
	}

	.item_cuopon {
		z-index: 50;
	}

	.cuopon-group .body .item {
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		position: relative;
	}

	.cuopon_img {
		width: 493rpx;
		height: 123rpx;
		position: absolute;
		top: 0;
		left: 0;
	}

	.cuopon-group .body .item .price {
		z-index: 50;
		font-size: 18rpx;
		margin-left: 26rpx;
	}

	.cuopon-group .body .item .des {
		z-index: 50;
		padding: 26rpx 0;
		font-size: 24rpx;
		text-align: left;
		margin-left: 50rpx;
	}

	.item .des .des_t {
		font-size: 26rpx;
		color: #000000;
		margin-bottom: 12rpx;
	}

	.item .des .des_c {
		font-size: 18rpx;
		color: #6b6b6b;
		margin-bottom: 8rpx;
	}

	.item .des .des_b {
		font-size: 18rpx;
		color: #6b6b6b;
	}

	.t-c {
		text-align: center;
	}

	.gift-package-main .integral {
		background-color: #ffffff66;
		padding-bottom: 60rpx;
		border-radius: 15rpx;
	}

	.gift-package-main .integral .title {
		font-size: 24rpx;
		color: #cacaca;
		text-align: left;
	}

	.gift-package-main .integral_btom {
		border: 1rpx solid #cacaca;
		height: 193rpx;
		background-color: #ffffff;
		margin-top: 20rpx;
		border-radius: 15rpx;
	}

	.gift-package-main .integral .info {
		margin-left: 30rpx;
		width: 300rpx;
		color: #f0510e;
	}

	.gift-package-main .integral image {
		width: 135rpx;
		height: 135rpx;
		margin-left: 40rpx;
	}

	.gift-package-main .integral .num {
		font-size: 50rpx;
	}

	.btns {
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: fixed;
		bottom: 0;
		background-color: #ffffff;
		border-top: 1rpx solid #eeeeee;
		z-index: 99;
	}

	.order_price {
		text-align: right;
		color: #fd0000;
		font-size: 30rpx;
		margin-left: 30rpx;
	}

	.btns button {
		width: 266rpx;
		height: 70rpx;
		background-color: #ee1413;
		color: #ffffff;
		text-align: center;
		line-height: 70rpx;
		border-radius: 35rpx;
	}

	.rule {
		overflow: hidden;
		position: absolute;
		right: 0;
		top: 480rpx;
		z-index: 100;
	}

	.rule_btn {
		margin-top: 27rpx;
		width: 183rpx;
		height: 62rpx;
		line-height: 62rpx;
		text-align: center;
		background-color: #e83514;
		border: 1rpx solid #ffffff;
		border-top-left-radius: 32rpx;
		border-bottom-left-radius: 32rpx;
		color: #ffffff;
		font-size: 26rpx;
	}

	.add {
		font-size: 73rpx;
		font-weight: 900;
		text-align: center;
		color: #ffffff;
	}

	.cuopon_num {
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
		border: 1rpx solid #939393;
		margin-left: 150rpx;
		text-align: center;
		line-height: 40rpx;
		font-size: 18rpx;
		border-radius: 10rpx;
		position: absolute;
		top: 40px;
		right: 15px;
		color: #000000;
	}

	.product_img {
		width: 146rpx;
		height: 146rpx;
	}

	.pro {
		margin-left: 12rpx;
		text-align: left;
		flex: 1;
		height: 146rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}

	.pro_t {
		font-size: 26rpx;
		color: #333;
		margin-bottom: 15rpx;
	}

	.pro_c {
		font-size: 20rpx;
		color: #686868;
	}

	.pro_b {
		font-size: 28rpx;
		color: #fd0000;
	}

	.f18 {
		font-size: 18rpx;
	}

	.pro_choose {
		width: 33rpx;
		height: 33rpx;
		position: absolute;
		right: 10rpx;
		top: 6rpx;
	}

	.borbox {
		border: 1rpx solid #cacaca;
	}

	.type_activ {
		width: 40rpx;
		height: 40rpx;
		background-color: #04be01;
		border-radius: 50%;
		overflow: hidden;
		text-align: center;
		line-height: 1;
	}

	.icon-tijiaochenggong {
		color: #ffffff;
		font-size: 22rpx;
	}

	.speci {
		font-size: 24rpx;
		width: 100rpx;
		height: 44rpx;
		color: #ffffff;
		text-align: center;
		border-radius: 22rpx;
		background-color: #fd0000;
		line-height: 44rpx;
	}

	.pro_not {
		width: 33rpx;
		height: 33rpx;
		position: absolute;
		right: 10rpx;
		top: 6rpx;
		border: 1rpx solid #cacaca;
		border-radius: 50%;
	}
</style>