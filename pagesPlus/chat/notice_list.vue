<template>
	<view class="im_index">
		<view class="im_item" v-for="(item, index) in imList" :key="index" @click="jumpPage(item.user_id, this.chat_user_id, item.nickName)">
			<view class="im_item_left"><image :src="item.avatarUrl" mode=""></image></view>
			<view class="im_item_right">
				<view class="im_item_right_item">
					<view class="title text-ellipsis">{{ item.nickName }}</view>
					<view class="time">{{ item.create_time }}</view>
				</view>
				<view class="im_item_right_item">
					<view class="content" v-if="item.newMessage.type == 0">{{ item.newMessage.content }}</view>
					<view class="content" v-if="item.newMessage.type == 1">[图片]</view>
					<view class="content" v-if="item.newMessage.type == 2">[商品]</view>
					<view v-if="item.num > 0" class="message">{{ item.num }}</view>
				</view>
			</view>
		</view>
		<view class="hint" v-if="imList.length == 0">您当前并没有与任何人聊天哦！</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imList: [],
			user_id: '',
			official: '', //站内信数据
			logistic: '', //物流数据
			socketTask: null,
			// 确保websocket是打开状态
			is_open_socket: false,
			url: '',
			// 心跳定时器
			intervalId: null,
			/* 初次进入 */
			is_live: false,
			my_user_id: ''
		};
	},
	onShow() {
		this.getChatuser_id();
		// this.get_im_list();
	},
	onLoad(options) {
		this.chat_user_id = options.chat_user_id;
		// this.my_user_id = uni.getStorageSync('user_id');
	},
	beforeUnmount() {
		console.log('beforeUnmount');
		// 销毁监听
		this.closeSocket();
		this.is_live = true;
	},
	methods: {
		async getChatuser_id() {
			let self = this;
			if (!self.chat_user_id) {
				await self.getUserInfo();
				self.get_im_list();
			} else {
				self.get_im_list();
			}
		},
		async getUserInfo() {
			let self = this;
			return new Promise((resolve, reject) => {
				self._get('user.index/detail', {}, res => {
					self.chat_user_id = res.data.chat_user_id;
					if (!self.chat_user_id) {
						uni.showModal({
							title: '提示',
							content: '暂未设置客服',
							showCancel: false,
							confirmText: '退出',
							success() {
								uni.navigateBack();
							}
						});
						resolve(self.chat_user_id);
					} else {
						resolve(self.chat_user_id);
					}
				});
			});
			console.log('getUserInfo');
		},
		send: function(data) {
			let self = this;
			if (self.is_open_socket) {
				self.socketTask.send({
					data: data,
					success() {}
				});
			} else {
				console.log('处于离线状态');
				self.socketTask = null;
				self.is_open_socket = false;
				clearInterval(self.intervalId);
				self.socketInit();
			}
		},
		socketInit() {
			let self = this;
			if (self.is_open_socket) {
				return;
			}
			self.socketTask = null;
			self.socketTask = uni.connectSocket({
				url: self.url + '/socket?user_id=' + self.getUserId() + '&usertype=user' + '&to=0',
				success() {
					console.log('Socket连接成功！');
				}
			});
			// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
			self.socketTask.onOpen(res => {
				console.log('WebSocket连接正常打开中...！');
				self.is_open_socket = true;
				// 开始发送心跳
				self.startHeart();
				// 注：只有连接正常打开中 ，才能正常收到消息
				self.socketTask.onMessage(function(res) {
					console.log('收到服务器内容：');
					console.log(res);
					self.getNewcontent(res);
					self.get_im_list();
				});
			});
			// 这里仅是事件监听【如果socket关闭了会执行】
			self.socketTask.onClose(() => {
				console.log('已经被关闭了');
				//重连机制
				if (!self.is_live) {
					self.socketTask = null;
					self.is_open_socket = false;
					clearInterval(self.intervalId);
					!self.is_live && self.socketInit();
				}
			});
		},
		startHeart() {
			let self = this;
			let data = JSON.stringify({
				type: 'ping',
				appId: self.getAppId(),
				user_id: self.user_id,
				shop_supplier_id: self.shop_supplier_id,
				supplier_user_id: self.supplier_user_id,
				msg_type: 1
			});
			self.intervalId = setInterval(function() {
				console.log('发送心跳');
				console.log(data);
				self.send(data);
			}, 10000);
		},
		getNewcontent(res) {
			let newdata = JSON.parse(res.data);
			console.log(newdata);
		},
		//获取聊天列表
		get_im_list() {
			console.log('get_im_list');
			let self = this;
			self._post(
				'plus.chat.chat/userList',
				{
					chat_user_id: self.chat_user_id
				},
				res => {
					console.log(res);

					self.imList = res.data.list;
					if (self.url == '') {
						self.url = res.data.url;
						self.$nextTick(function() {
							self.socketInit();
						});
					}
				}
			);
		},
		closeSocket: function() {
			let self = this;
			let data = JSON.stringify({
				type: 'close',
				appId: self.getAppId(),
				supplier_user_id: 0,
				user_id: self.my_user_id,
				shop_supplier_id: 0,
				msg_type: 2
			});
			self.send(data);
			self.socketTask.close({
				success(res) {
					console.log('关闭成功', res);
				},
				fail(err) {
					console.log('关闭失败', err);
				}
			});
			self.socketTask = null;
			self.is_open_socket = false;
			clearInterval(self.intervalId);
		},
		jumpPage(user_id, chat_user_id, nickName) {
			if (chat_user_id === 0) {
				return false;
			}
			this.gotoPage('/pagesPlus/chat/notice?user_id=' + user_id + '&chat_user_id=' + chat_user_id + '&nickName=' + nickName);
		},
		gotoMessage(val) {
			this.gotoPage('/pages/im/message?type=' + val);
		}
	}
};
</script>

<style>
.im_index {
	width: 100%;
}

.im_item {
	width: 90%;
	height: 120rpx;
	margin: 0 auto;
	display: flex;
	align-items: center;
}

.im_item_left {
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
}

.im_item_left image {
	width: 80rpx;
	height: 80rpx;
	margin: 0 auto;
	margin-top: 5%;
	border-radius: 50%;
	background-color: rgba(0, 0, 0, 0.1);
}

.im_item_right {
	width: 555rpx;
	padding: 10rpx;
	border-bottom: 1px #dcdcdc solid;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}

.message {
	width: 30rpx;
	height: 30rpx;
	border-radius: 50%;
	color: white;
	background-color: red;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 15rpx;
}

.im_item_right_item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 10rpx;
}

.title {
	font-size: 32rpx;
}

.guangfang {
	font-size: 16rpx;
	color: #f36a24;
	border: 1rpx #f36a24 solid;
	border-radius: 10rpx;
	padding: 5rpx 10rpx;
	box-sizing: border-box;
	position: relative;
	left: -65rpx;
}

.time {
	font-size: 26rpx;
	color: #999999;
	flex-shrink: 0;
}

.content {
	font-size: 26rpx;
	color: #999999;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	word-break: break-all;
}

.hint {
	width: 750rpx;
	text-align: center;
	font-size: 32rpx;
	color: #585858;
	margin-top: 20rpx;
}
</style>
