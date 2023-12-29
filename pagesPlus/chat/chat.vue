<template>
	<view class="im_interface">
		<view class="store_info" v-if="shop_supplier_id != '0' && shop_supplier_id">
			<view class="store_l">
				<image v-if="storeData.supplier_logo" :src="storeData.supplier_logo" class="img" />
				<image v-else src="@/static/icon/store-icon.png" class="img" />
				<view>{{ storeData.name }}</view>
			</view>
			<view class="store_btn"
				@click="gotoPage('/pages/shop/shop?shop_supplier_id=' + shop_supplier_id, 'redirect')">进店</view>
		</view>

		<scroll-view id="scrollview" scroll-y="true" :style="'height: ' + scrollviewHigh + 'px'"
			:scroll-with-animation="true" :scroll-top="scrollTop" @scrolltoupper="newdata">
			<view class="im_interface_content" ref="container">
				<view :class="item.msg_type == 2 ? 'im_text' : 'im_text2'" class="m-item"
					v-for="(item, index) in content_list" :key="index">
					<image v-if="item.type != 'product' && item.type != 'order'" class="avatar"
						:src="item.msg_type == 2 ? myavatarUrl : avatarUrl" mode=""></image>
					<view>
						<view class="my_date">{{ item.create_time }}</view>
						<view v-if="item.type == 0"
							:class="item.msg_type == 2 ? 'my_content my_text_content' : 'you_content you_text_content'">
							{{ item.content }}
						</view>
						<view v-if="item.type == 1" :class="item.msg_type == 2 ? 'my_content' : 'you_content'">
							<image @click="preview(item.content, 0)" class="cont_img" :src="item.content" mode="">
							</image>
						</view>
						<view v-if="item.type == 2" :class="item.msg_type == 2 ? 'my_content' : 'you_content'">
							<view class="product_txtitem">
								<view>
									<image class="pro_img" :src="item.content.product_img" mode=""></image>
								</view>
								<view>
									<view class="pro_txtname">{{ item.content.product_name }}</view>
									<view class="pro_price">￥{{ item.content.product_price }}</view>
								</view>
							</view>
						</view>
						<view v-if="item.type == 3" :class="item.msg_type == 2 ? 'my_content' : 'you_content'">
							<view class="o-h">
								<view class="fb mb20">你正在咨询的订单</view>
								<view class="product_txtitem mb20">
									<view>
										<image class="pro_img" :src="item.content.product_img" mode=""></image>
									</view>
									<view>
										<view class="pro_txtname">{{ item.content.product_name }}</view>
										<view class="f24 gray6">
											共计{{ item.content.order_num }}件商品：合计￥{{ item.content.order_price }}</view>
									</view>
								</view>
								<view class="f24 gray6 ">订单号{{ item.content.order_no }}</view>
								<view class="f24 gray6 ">创建时间{{ item.content.create_time }}</view>
								<button class="orderdetail_btn"
									@click="gotoPage('/pages/order/order-detail?order_id=' + item.content.order_id)">查看</button>
							</view>
						</view>
						<view v-if="item.type == 'product'">
							<view class="top_pro">
								<view class="top_product" v-if="is_product">
									<view>
										<image class="pro_img" :src="productDetail.product_image" mode=""></image>
									</view>
									<view>
										<view class="pro_name">{{ productDetail.product_name }}</view>
										<view class="pro_price sendpro_price">￥{{ productDetail.product_price }}</view>
									</view>
									<button class="pro_btn" @click="sendProduct">发送商品</button>
									<view class="close_pro" @click="is_product = false">
										<image src="@/static/icon/close.png" style="width: 23rpx;height: 23rpx" />
										<!-- <text class="icon iconfont icon-guanbi"></text> -->
									</view>
								</view>
							</view>
						</view>
						<view v-if="item.type == 'order'">
							<view class="top_pro">
								<view class="top_order" v-if="is_order">
									<view>
										<image class="pro_img" :src="order_chat.product[0].image.file_path" mode="">
										</image>
									</view>
									<view>
										<view class="pro_name mb20">你可能想咨询该订单</view>
										<view class="f24 gray6 sendord_price">
											共{{ order_chat.product.length }}件商品:合计￥{{ order_chat.order_price }}</view>
									</view>
									<button class="ord_btn" @click="sendOrder">发送订单</button>
									<view class="close_pro" @click="is_order = false"><text
											class="icon iconfont icon-guanbi"></text></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="width: 100%;height: 130rpx;"></view>
		</scroll-view>

		<view class="buttom" :style="'bottom:' + inputBottom + 'px;'">
			<view class="icon iconfont icon-tupian" @click="upload('license')"></view>
			<input type="text" v-model="content" @confirm="send_content()" confirm-type="send" @focus="inputFocus"
				@blur="inputBlur" :adjust-position="false" placeholder="请输入....." />
			<button @click="send_content()">发送</button>
			<!-- <input type="text" v-model="content" @confirm="send_content()" confirm-type="send" @focus="inputFocus" @blur="inputBlur"
			 :adjust-position="false" placeholder="请输入....." />
			<view class="upload_box">
				<view class="upload" @click="upload('license')"><text class="icon iconfont icon-jingmeihaibao" style="color: #FFFFFF;"></text></view>
				<button v-if="!is_Ios" @click="send_content()">发送</button>
			</view> -->
		</view>

		<Upload v-if="isupload" :isupload="isupload" :type="type" @getImgs="getImgsFunc">上传图片</Upload>
	</view>
</template>

<script>
	import Upload from '@/components/upload/upload';
	export default {
		data() {
			return {
				myuser_id: '', //我的user_id
				you_user_id: '', //对方的service_user_id
				myavatarUrl: '',
				avatarUrl: '',
				phoneHeight: 0,
				/*可滚动视图区域高度*/
				scrollviewHigh: 0,
				content: '', //用户输入的内容
				content_list: [], //聊天信息数据
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0
				},
				isupload: false,
				type: 'license',
				scrollTop: 0,
				imgPath: '',
				is_product: false,
				product_id: 0,
				productDetail: {},
				socketTask: null,
				// 确保websocket是打开状态
				is_open_socket: false,
				// 心跳定时器
				intervalId: null,
				page: 1,
				nomore: false,
				scrollHeight: 0,
				nickName: '',
				url: '',
				status: '离线',
				/* 初次进入 */
				is_live: false,
				inputBottom: 0,
				is_Ios: true,
				order_chat: {},
				isOrder: false,
				storeData: {},
				/* 1 用户聊天 2 客服聊天（我的消息进去传2） */
				msg_type: 1,
			};
		},
		components: {
			/*编辑组件*/
			Upload
		},
		created() {
			let self = this;
			const res = uni.getSystemInfoSync(); //获取手机可使用窗口高度     api为获取系统信息同步接口
			this.style.pageHeight = res.windowHeight;
			this.style.contentViewHeight = res.windowHeight - (uni.getSystemInfoSync().screenWidth / 750) * 100 - 70; //像素
		},
		onShow() {
			this.getAvatarUrl();
			this.init();
			this.isuserAgent();
		},
		onLoad(option) {
			let self = this;
			self.you_user_id = option.chat_user_id;
			self.myuser_id = uni.getStorageSync('user_id');
			self.shop_supplier_id = option.shop_supplier_id || 0;
			self.product_id = option.product_id ? option.product_id : 0;
			if(option.msg_type){
				this.msg_type = option.msg_type;
			}
			if (self.product_id != 0) {
				self.getProduct();
			}
			self.order_id = option.order_id ? option.order_id : 0;
			console.log(self.order_id);
			if (self.order_id != 0) {
				self.getOrder();
			}
			self.nickName = option.nickName;
			uni.setNavigationBarTitle({
				title: self.nickName + '(离线)'
			});
			self.get_content_list();
		},
		beforeUnmount() {
			console.log('beforeUnmount');
			// 销毁监听
			this.closeSocket();
			this.is_live = true;
		},
		methods: {
			/*初始化*/
			init() {
				let self = this;
				uni.getSystemInfo({
					success(res) {
						self.phoneHeight = res.windowHeight;
						// 计算组件的高度
						self.scrollviewHigh = self.phoneHeight;
					}
				});
			},
			initData() {
				this.page++;
				this.get_content_list();
			},
			socketInit() {
				let self = this;
				if (self.is_open_socket) {
					return;
				}
				self.socketTask = null;
				self.socketTask = uni.connectSocket({
					url: self.url + '/socket?user_id=' + self.myuser_id + '&usertype=user' + '&to=0',
					success() {
						console.log('Socket连接成功！');
					}
				});
				// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
				self.socketTask.onOpen(res => {
					console.log('WebSocket连接正常打开中...！');
					self.is_open_socket = true;
					// 开始发送心跳,false马上查询在线状态
					self.startHeart(false);
					self.startHeart(true);
					// 注：只有连接正常打开中 ，才能正常收到消息
					self.socketTask.onMessage(function(res) {
						console.log('收到服务器内容：');
						console.log(res);
						self.getNewcontent(res);
					});
				});
				// 这里仅是事件监听【如果socket关闭了会执行】
				self.socketTask.onClose(() => {
					console.log('已经被关闭了');
					//重连机制
					if (!self.is_live) {
						console.log('退出', self.is_live);
						self.socketTask = null;
						self.is_open_socket = false;
						clearInterval(self.intervalId);
						!self.is_live && self.socketInit();
					}
				});
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
			startHeart(isLoop) {
				let self = this;
				let data = JSON.stringify({
					type: 'ping',
					to: self.you_user_id,
					from: self.myuser_id,
					msg_type: 2
				});
				if (isLoop) {
					self.intervalId = setInterval(function() {
						console.log('发送心跳');
						self.send(data);
					}, 10000);
				} else {
					console.log('发送心跳');
					self.send(data);
				}
			},
			closeSocket: function() {
				let self = this;
				let data = JSON.stringify({
					type: 'close',
					app_id: this.getAppId(),
					chat_user_id: self.you_user_id,
					user_id: self.myuser_id,
					shop_supplier_id: self.shop_supplier_id,
					type: 2
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
			// 发送消息
			send_content() {
				if (this.content == '') {
					uni.showToast({
						title: '发送内容不能为空！',
						icon: 'none'
					});
					return false;
				}
				let self = this;
				let data = JSON.stringify({
					to: this.you_user_id,
					from: this.myuser_id,
					msg_type: 2,
					type: 0,
					content: this.content,
					app_id: this.getAppId()
				});
				let newdata = JSON.parse(data);
				let item = {
					msg_type: 2,
					content: newdata.content,
					type: 0,
					create_time: self.formatDate(),
					avatarUrl: self.myavatarUrl,
					app_id: this.getAppId()
				};
				this.content_list = [...this.content_list, item];
				this.$nextTick(function() {
					this.scrollToBottom();
				});
				self.send(data);
				self.content = '';
			},
			getNewcontent(res) {
				let newdata = JSON.parse(res.data);
				console.log(newdata);
				if (newdata.Online == 'off' && !this.is_live) {
					this.status = '离线';
					console.log('对方离线');
					uni.setNavigationBarTitle({
						title: this.nickName + '(离线)'
					});
				}
				if (newdata.Online == 'on' && !this.is_live) {
					this.status = '在线';
					console.log('对方在线');
					uni.setNavigationBarTitle({
						title: this.nickName + '(在线)'
					});
				}
				console.log(newdata);
				if (newdata.user_id == this.myuser_id && newdata.content) {
					if (newdata.contentJson) {
						newdata.content = newdata.contentJson;
					}
					let item = {
						content: newdata.content,
						user_id: newdata.user_id,
						type: newdata.type,
						msg_type: 1,
						create_time: this.formatDate()
					};
					console.log('解析数据');
					this.content_list = [...this.content_list, item];
					this.$nextTick(function() {
						this.scrollToBottom();
					});
				}
				//绑定用户
				if (newdata.type == 'init') {
					let self = this;
					self._post(
						'plus.chat.chat/bindClient', {
							client_id: newdata.client_id,
							chat_user_id: self.you_user_id,
							user_id: self.myuser_id,
							type: 1
						},
						function(res) {
							if (res.data.data.Online == 'off' && !self.is_live) {
								self.status = '离线';
								console.log('对方离线');
								uni.setNavigationBarTitle({
									title: self.nickName + '(离线)'
								});
							} else if (res.data.data.Online == 'on' && !self.is_live) {
								self.status = '在线';
								console.log('对方在线');
								uni.setNavigationBarTitle({
									title: self.nickName + '(在线)'
								});
							}
							console.log('init---绑定uid');
						}
					);
				}
			},
			getProduct() {
				let self = this;
				self._get(
					'product.product/detail', {
						product_id: self.product_id,
						url: '',
						visitcode: self.getVisitcode()
					},
					function(res) {
						self.is_product = true;
						self.content_list = [
							...self.content_list,
							{
								type: 'product'
							}
						];
						self.productDetail = res.data.detail;
					}
				);
			},
			getOrder() {
				let self = this;
				self._get(
					'user.order/detail', {
						order_id: self.order_id
					},
					function(res) {
						self.is_order = true;
						self.content_list = [
							...self.content_list,
							{
								type: 'order'
							}
						];
						self.order_chat = res.data.detail;
					}
				);
			},
			upload(e) {
				this.type = e;
				this.isupload = true;
			},
			getAvatarUrl() {
				let self = this;
				self.myuser_id = uni.getStorageSync('user_id');
				self._get(
					'plus.chat.chat/getInfo', {
						shop_supplier_id: self.shop_supplier_id,
						chat_user_id: self.you_user_id,
						user_id: self.myuser_id
					},
					function(res) {
						self.avatarUrl = res.data.info.logo;
						self.myavatarUrl = res.data.info.avatarUrl;
						self.url = res.data.info.url;
						self.storeData.name = self.shop_supplier_id ? res.data.info.name : res.data.info.chat_name;
						self.storeData.supplier_logo = self.shop_supplier_id ? res.data.info.supplier_logo : res.data
							.info.logo;
						self.$nextTick(function() {
							self.socketInit();
						});
					}
				);
			},
			getImgsFunc(e) {
				let self = this;
				console.log(e);
				if (e != null && e.length > 0) {
					self.imgPath = e[0].file_path;
					let data = JSON.stringify({
						to: self.you_user_id,
						from: self.myuser_id,
						msg_type: 2,
						type: 1,
						content: self.imgPath,
						app_id: this.getAppId()
					});
					let newdata = JSON.parse(data);
					let item = {
						msg_type: 2,
						content: newdata.content,
						type: 1,
						create_time: self.formatDate(),
						avatarUrl: self.myavatarUrl,
						app_id: this.getAppId()
					};
					self.content_list = [...self.content_list, item];
					self.send(data);
					self.$nextTick(function() {
						self.scrollToBottom();
					});
				}
				self.isupload = false;
			},
			//获取聊天记录
			get_content_list() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				self._post(
					'plus.chat.chat/record', {
						page: self.page,
						list_rows: 15,
						chat_user_id: self.you_user_id,
						user_id: self.getUserId(),
						msg_type: self.msg_type
					},
					res => {
						console.log(self.content_list);
						res.data.list.data.forEach((v)=>{
							if(v.type == 2 || v.type == 3){
								v.content = JSON.parse(v.content);
							}
						})
						let list = res.data.list.data.reverse();
						self.content_list = [...list, ...self.content_list];
						if (res.data.lastPage <= self.page) {
							self.nomore = true;
						}
						if (self.page == 1) {
							self.$nextTick(() => {
								self.scrollToBottom();
							});
						} else {
							self.$nextTick(() => {
								const newquery = uni.createSelectorQuery().in(self);
								newquery
									.select('.im_interface_content')
									.boundingClientRect(data => {
										console.log(data);
										self.scrollTop = data.height - self.scrollHeight;
									})
									.exec();
							});
						}
						uni.hideLoading();
					}
				);
			},
			//打开图片预览
			preview(e, index) {
				let self = this;
				let image_path_arr = [];
				let image_path_list = e;
				image_path_arr.push(image_path_list);
				let picnum = index * 1;
				uni.previewImage({
					urls: image_path_arr,
					current: picnum,
					indicator: 'default'
				});
			},
			scrollToBottom: function() {
				let self = this;
				let query = uni.createSelectorQuery();
				query.selectAll('.m-item').boundingClientRect();
				query.select('#scrollview').boundingClientRect();
				query.exec(res => {
					self.style.mitemHeight = 0;
					res[0].forEach(rect => (self.style.mitemHeight = self.style.mitemHeight + rect.height +
						40));
					setTimeout(() => {
						if (self.style.mitemHeight > self.style.contentViewHeight - 100) {
							self.scrollTop = self.style.mitemHeight - self.style.contentViewHeight +
								150;
						}
					}, 300);
				});
			},
			sendProduct() {
				let self = this;
				self.is_product = false;
				let params = {
					product_name: self.productDetail.product_name,
					product_img: self.productDetail.image[0].file_path,
					product_price: self.productDetail.product_price
				};
				params = JSON.stringify(params);
				let data = JSON.stringify({
					to: this.you_user_id,
					from: this.myuser_id,
					msg_type: 2,
					type: 2,
					content: params,
					app_id: this.getAppId(),
				});
				let newdata = JSON.parse(data);
				let item = {
					msg_type: 2,
					content: newdata.content,
					type: 2,
					create_time: self.formatDate(),
					avatarUrl: self.myavatarUrl
				};
				item.content = JSON.parse(item.content)
				this.content_list = [...this.content_list, item];
				self.send(data);
				self.$nextTick(function() {
					self.scrollToBottom();
				});
			},
			sendOrder() {
				let self = this;
				self.is_order = false;
				let params = {
					order_num: self.order_chat.product.length,
					order_price: self.order_chat.order_price,
					order_no: self.order_chat.order_no,
					create_time: self.order_chat.create_time,
					order_id: self.order_chat.order_id,
					product_name: self.order_chat.product[0].product_name,
					product_img: self.order_chat.product[0].productImage
				};
				params = JSON.stringify(params)
				let data = JSON.stringify({
					to: self.you_user_id,
					from: self.myuser_id,
					msg_type: 2,
					type: 3,
					content: params,
					app_id: this.getAppId(),
				});
				let newdata = JSON.parse(data);
				let item = {
					msg_type: 2,
					content: newdata.content,
					type: 3,
					create_time: self.formatDate(),
					avatarUrl: self.myavatarUrl
				};
				console.log(item);
				item.content = JSON.parse(item.content);
				self.content_list = [...self.content_list, item];
				self.send(data);
				self.$nextTick(function() {
					self.scrollToBottom();
				});
			},
			getJSON(str) {
				return JSON.parse(str);
			},
			newdata() {
				let self = this;
				this.page++;
				const query = uni.createSelectorQuery().in(this);
				query
					.select('.im_interface_content')
					.boundingClientRect(data => {
						this.scrollHeight = data.height;
					})
					.exec();
				this.get_content_list();
			},
			inputFocus(e) {
				this.inputBottom = e.detail.height;
			},
			inputBlur() {
				this.inputBottom = 0;
			},
			isuserAgent() {
				let self = this;
				switch (uni.getSystemInfoSync().platform) {
					case 'android':
						self.is_Ios = false;
						console.log('运行Android上');
						break;
					case 'ios':
						console.log('运行iOS上');
						break;
					default:
						console.log('运行在开发者工具上');
						break;
				}
			},
			formatDate() {
				let date = new Date();
				let year = date.getFullYear(); // 年
				let month = date.getMonth() + 1; // 月
				let day = date.getDate(); // 日
				let week = date.getDay(); // 星期
				let weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
				let hour = date.getHours(); // 时
				hour = hour < 10 ? '0' + hour : hour; // 如果只有一位，则前面补零
				let minute = date.getMinutes(); // 分
				minute = minute < 10 ? '0' + minute : minute; // 如果只有一位，则前面补零
				let second = date.getSeconds(); // 秒
				second = second < 10 ? '0' + second : second; // 如果只有一位，则前面补零
				return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.store_info {
		background: #ffffff;
		height: 56rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		color: #333333;
		padding: 50rpx 20rpx;
		box-sizing: border-box;

		.store_l {
			display: flex;
			align-items: center;
		}

		.img {
			width: 44rpx;
			height: 40rpx;
			margin-right: 14rpx;
		}

		.store_btn {
			width: 118rpx;
			height: 56rpx;
			line-height: 56rpx;
			border: 1rpx solid #f25539;
			border-radius: 28rpx;
			font-size: 28rpx;
			text-align: center;
			color: #f25539;
		}
	}

	page {
		background-color: #ededed;
	}

	.im_interface {
		width: 750rpx;
	}

	.im_interface_content {
		padding: 20rpx 50rpx;
	}

	.buttom {
		width: 750rpx;
		height: 130rpx;
		background-color: #f7f7f7;
		border-top: 1px #d2d2d2 solid;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		position: fixed;
		bottom: 0;
		box-sizing: border-box;
		align-items: center;
		padding: 0 10rpx;

		.icon {
			font-size: 47rpx;
		}

		uni-input {
			margin: 0 20rpx !important;
		}

		uni-button {
			margin: 0 !important;
		}
	}

	.buttom input {
		width: 605rpx;
		height: 65rpx;
		line-height: 65rpx;
		background-color: white;
		display: block;
		padding: 5rpx;
		box-sizing: border-box;
		margin-left: 30rpx;
		border-radius: 10rpx;
		vertical-align: middle;
		position: relative;
		border: 1rpx solid #cccccc;
	}

	.buttom button {
		width: 110rpx;
		height: 65rpx;
		line-height: 65rpx;
		display: block;
		vertical-align: middle;
		position: relative;
		background: linear-gradient(45deg, #f2473f, #f26e2f);
		border-radius: 30rpx;
		color: white;
		font-size: 24rpx;
	}

	.im_text {
		/* width: 100%; */
		display: flex;
		margin-top: 75rpx;
		flex-direction: row-reverse;
		position: relative;
	}

	.im_text2 {
		/* width: 100%; */
		display: flex;
		margin-top: 75rpx;
		position: relative;
	}

	.im_text .avatar {
		width: 84rpx;
		height: 84rpx;
		margin-left: 3%;
		border-radius: 50%;
		overflow: hidden;
		background-color: #ffffff;
		align-items: flex-start;
	}

	.im_text2 .avatar {
		width: 84rpx;
		height: 84rpx;
		margin-right: 3%;
		border-radius: 50%;
		background-color: #fff;
		align-items: flex-start;
	}

	.im_text .my_content {
		max-width: 550rpx;
		align-items: flex-start;
		border-radius: 10rpx;
		padding: 17rpx 20rpx;
		box-sizing: border-box;
		word-break: break-all;
	}

	.im_text2 .my_content {
		max-width: 450rpx;
		align-items: flex-start;
		border-radius: 10rpx;
		padding: 17rpx 20rpx;
		box-sizing: border-box;
		word-break: break-all;
	}

	.im_text .you_content {
		max-width: 450rpx;
		align-items: flex-start;
		border-radius: 10rpx;
		padding: 17rpx 20rpx;
		box-sizing: border-box;
	}

	.im_text2 .you_content {
		max-width: 450rpx;
		align-items: flex-start;
		border-radius: 25rpx 25rpx 25rpx 0rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		padding: 17rpx 20rpx;
	}

	.my_content {
		background: #ffffff;
		color: #333;
		margin-top: 25rpx;
		border-radius: 20rpx 0px 20rpx 20rpx;
	}

	.you_content {
		background-color: white;
		margin-top: 25rpx;
	}

	.im_icon {
		position: absolute;
		bottom: -2rpx;
		right: 41px;
		transform: rotate(270deg);
	}

	.im_icon2 {
		position: absolute;
		bottom: 0;
	}

	.im_icon .icon-sanjiao1 {
		color: #9eea6a;
	}

	.im_icon2 .icon-sanjiao1 {
		position: absolute;
		bottom: 0;
	}

	.upload {
		width: 50rpx;
		height: 50rpx;
		background-color: #007aff;
		border-radius: 50%;
		line-height: 50rpx;
		text-align: center;
	}

	.cont_img {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
	}

	.top_pro {
		/* margin-left: 85rpx; */
	}

	.top_product {
		width: 610rpx;
		height: 152rpx;
		border-radius: 10rpx;
		margin: 0 auto;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		background-color: #ffffff;
		padding: 10rpx 20rpx;
		position: relative;
	}

	.top_order {
		width: 610rpx;
		/* height: 200rpx; */
		border-radius: 10rpx;
		margin: 0 auto;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		background-color: #ffffff;
		padding: 10rpx 20rpx;
		position: relative;
	}

	.pro_img {
		height: 150rpx;
		width: 150rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
		background-color: #ffffff;
	}

	.pro_name {
		font-size: 26rpx;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		margin-bottom: 40rpx;
		width: 400rpx;
	}

	.pro_price {
		font-size: 32rpx;
		color: #e2231a;
	}

	.pro_btn {
		position: absolute;
		bottom: 10rpx;
		right: 15rpx;
		width: 160rpx;
		height: 54rpx;
		line-height: 54rpx;
		border-radius: 25rpx;
		text-align: center;
		font-size: 24rpx;
		color: #ffffff;
		background: linear-gradient(45deg, #f2473f, #f26e2f);
	}

	.orderdetail_btn {
		width: 180rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 25rpx;
		text-align: center;
		font-size: 24rpx;
		color: #ffffff;
		background-color: #ff6633;
		margin-left: 270rpx;
		margin-top: 20rpx;
	}

	.ord_btn {
		position: absolute;
		bottom: 20rpx;
		right: 15rpx;
		width: 180rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 25rpx;
		text-align: center;
		font-size: 24rpx;
		color: #ffffff;
		background-color: #ff6633;
	}

	.close_pro {
		position: absolute;
		top: 12rpx;
		right: 15rpx;
	}

	.product_item {
		width: 400rpx;
		height: 200rpx;
	}

	.product_txtitem {
		display: flex;
		width: 550rpx;
		/* height: 150rpx; */
	}

	.pro_txtname {
		font-size: 28rpx;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
		margin-bottom: 50rpx;
	}

	.my_content.my_text_content {
		/* height: 100%; */
		background: linear-gradient(45deg, #f2473f, #f26e2f);
		max-width: 430rpx;
		color: #ffffff;
		border-radius: 25rpx 25rpx 0rpx 25rpx;
	}

	.you_text_content {
		/* height: 100%; */
		max-width: 430rpx;
	}

	.my_date {
		color: #cccccc;
		font-size: 24rpx;
		position: absolute;
		top: -10rpx;
	}

	.im_text .my_date {
		right: 100rpx;
	}

	.sendpro_price {
		position: absolute;
		bottom: 10rpx;
	}

	.sendord_price {
		position: absolute;
		bottom: 40px;
	}

	.upload_box {
		/* width: 50rpx; */
		height: 75rpx;
		display: flex;
		align-items: center;
		margin-left: 20rpx;
		justify-content: space-around;
		flex: 1;
	}
</style>