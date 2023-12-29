<template>
	<view class="index-agent o-h" v-if="!loadding" :data-theme='theme()' :class="theme() || ''">
		<!--头部图片-->
		<view class="banner d-c-c d-c">
			<image :src="top_background" mode="aspectFill"></image>
		</view>

		<!--是分销商-->
		<template v-if="is_agent && isData">
			<view class="info-top d-s-c">
				<view class="info-ava">
					<image class="info-avatar" :src="user.avatarUrl" mode="aspectFill"></image>
					<view class="info-grade" v-if="agent.grade_id > 0">{{agent.grade.name}}</view>
				</view>
				<view class="white d-c d-c-s flex-1 pr">
					<view class="mb20 f30 fb">{{ user.nickName}}</view>
					<view class="f22">{{info_words.index.words.referee.value || ''}}:{{agent.referee ? agent.referee.nickName : '平台' }}</view>
				</view>
			</view>
			<!--金额信息-->
			<view class="agent-wrap pr m-0-20">
				<view class="d-s-c p-30-0 top_dash">
					<view class="flex-1 d-c-c d-c">
						<view class="redF6">
							<text class="f36 fb">{{ agent.money }}</text>
						</view>
						<view class="pt20 f24 gray6">{{ info_words.index.words.money.value }}</view>
					</view>
					<view class="flex-1 d-c-c d-c">
						<view class="">
							<text class="f36 fb">{{ agent.freeze_money }}</text>
						</view>
						<view class="pt20 f24 gray6">{{ info_words.index.words.freeze_money.value }}</view>
					</view>
					<view class="flex-1 d-c-c d-c">
						<view class="">
							<text class="f36 fb">{{ agent.total_money }}</text>
						</view>
						<view class="pt20 f24 gray6">{{ info_words.index.words.total_money.value }}</view>
					</view>
				</view>
				<view class="d-c-c pt30">
					<button type="primary" class="btn-gcred  flex-1"
						@click="gotoCash">{{ info_words.index.words.cash.value }}</button>
				</view>
			</view>
			<!--图标入口-->
			<view class="agent-wrap m-0-20 p30 d-s-c f-w mt20 bg-white">
				<view class="d-c-c d-c flex-1" @click="gotoPage('/pages/agent/cash/list/list')">
					<view>
						<image class="agent_index_img" src="../../../static/icon/icon-zijinmingxi.png" mode=""></image>
					</view>
					<text class="f24 gray6 mt20">{{ info_words.cash_list.title.value }}</text>
				</view>
				<view class="d-c-c d-c flex-1" @click="gotoPage('/pages/agent/order/order')">
					<view>
						<image class="agent_index_img" src="../../../static/icon/icon-fenxiaodingdan.png" mode="">
						</image>
					</view>
					<text class="f24 gray6 mt20">{{ info_words.order.title.value }}</text>
				</view>
				<view class="d-c-c d-c flex-1" @click="gotoPage('/pages/agent/team/team')">
					<view>
						<image class="agent_index_img" src="../../../static/icon/icon-tuandui.png" mode=""></image>
					</view>
					<text class="f24 gray6 mt20">{{ info_words.team.title.value }}</text>
				</view>
				<view class="d-c-c d-c flex-1" @click="gotoPage('/pages/agent/qrcode/qrcode')">
					<view>
						<image class="agent_index_img" src="../../../static/icon/icon-erweima.png" mode=""></image>
					</view>
					<text class="f24 gray6 mt20">{{ info_words.qrcode.title.value }}</text>
				</view>
			</view>
		</template>
		<!--不是分销商-->
		<template v-if="!is_agent && isData">
			<view class="no-agent" style="margin-top: 348rpx;">
				<image class="no-agent-image" src="/static/agent_no.png" mode=""></image>
				<view class="mt50 p-0-20 gray9 f30 tc">{{ info_words.index.words.not_agent.value }}</view>
				<view class="p30 mt30">
					<button type="primary" class="btn-gcred "
						@click="applyagent">{{ info_words.index.words.apply_now.value }}</button>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/*是否加载完成*/
				loadding: true,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				/*0：不是分销商，1：分销商申请中，2：已经是分销商*/
				is_agent: false,
				isData: false,
				agent: {},
				/*顶部背景*/
				top_background: '',
				/*基本信息*/
				info_words: {},
				words: {},
				user: {},
				titel: ''
			};
		},
		onLoad(e) {
			if (e.is_agent) {
				this.is_agent = e.is_agent;
			}
		},
		onShow() {
			uni.showLoading({
				title: '加载中'
			});
			/*获取个人中心数据*/
			this.getData();
		},
		methods: {
			/*获取数据*/
			getData() {
				let self = this;
				self._get('user.agent/center', {}, function(data) {
					self.info_words = data.data.words;
					self.titel = data.data.words.index.title.value;
					uni.setNavigationBarTitle({
						title: self.titel
					});
					self.is_agent = data.data.is_agent;
					self.top_background = data.data.background;
					self.agent = data.data.agent;
					self.user = data.data.user;
					self.isData = true;
					self.loadding = false;
					uni.hideLoading();
				});
			},

			/*申请分销商*/
			applyagent() {
				this.gotoPage('/pages/agent/apply/apply');
			},

			/*去商城逛逛*/
			gotoShop() {
				this.gotoPage('/pages/index/index')
			},

			/*去提现*/
			gotoCash() {
				this.gotoPage('/pages/agent/cash/apply/apply');
			},
			goback() {
				uni.navigateBack();
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f9f9f9;
	}

	.index-agent .banner {
		position: absolute;
		width: 750rpx;
		height: 348rpx;
		z-index: 0;
		/* padding-bottom: 60rpx; */
		background-repeat: no-repeat;
		background-size: 100%;
	}

	.index-agent .banner image {
		width: 100%;
	}

	.no-agent {
		// padding-top: 190rpx;
	}

	.no-agent-image {
		padding-top: 20rpx;
		margin: 0 auto;
	}

	.no-agent-image image {
		width: 532rpx;
		height: 340rpx;
		
	}

	.agent-wrap {
		background: #FFFFFF;
		background-size: 100% 100%;
		padding: 31rpx 25rpx 36rpx 25rpx;
		box-shadow: 0px 8rpx 3rpx 0px rgba(6,0,1,0.03);
		border-radius: 20rpx;
	}

	.index-agent .agent-wrap .iconfont {
		font-size: 60rpx;
	}

	.index-agent .btn-gcred {
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 44rpx;
		background: #FF5649;
		border-color: #FF5649;
	}

	.reg180 {
		padding-right: 20rpx;
		text-align: right;
		transform: rotateY(180deg);
		position: absolute;
		bottom: 0;
	}

	.icon-jiantou {

		color: #FFFFFF;
		font-size: 30rpx;
	}

	.head_top {
		position: absolute;
		width: 100%;
		height: 30px;
		line-height: 30px;
		color: #FFFFFF;
		font-size: 32rpx;
		z-index: 2;
	}

	.top_dash {
		padding-bottom: 9px;
	}

	.agent_index_img {
		width: 78rpx;
		height: 78rpx;
	}
	.info-top{
		padding: 74rpx 0 63rpx 44rpx;
	}
	.info-ava {
		width: 108rpx;
		height: 108rpx;
		border-radius: 50%;
		position: relative;
		margin-right: 30rpx;
	}

	.info-avatar {
		width: 108rpx;
		height: 108rpx;
		border-radius: 50%;
	}

	.info-grade {
		min-width: 114rpx;
		height: 30rpx;
		line-height: 30rpx;
		padding: 0 22rpx;
		box-sizing: border-box;
		font-size: 18rpx;
		color: #ffffff;
		background: #FFC519;
		box-shadow: 0px 3rpx 7rpx 0px rgba(0, 0, 0, 0.15);
		border-radius: 15rpx;
		text-align: center;
		white-space: nowrap;
		position: absolute;
		left: 0;
		right: 0;
		bottom: -16rpx;
		z-index: 2;
	}
</style>
