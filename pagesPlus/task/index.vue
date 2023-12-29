<template>
	<view :data-theme="theme()" :class="theme() || ''">
		<view>
			<image class="bg-top" :src="back_image" mode=""></image>
		</view>
		<view class="task-center mb20">
			<view class="task-center-title">成长任务</view>
			<view class="task-center-item d-s-c" v-for="(item, index) in grow_task" :key="index">
				<template v-if="item.is_open == 1">
					<image class="task-logo" :src="item.image" mode=""></image>
					<view class="flex-1">
						<view class="text-ellipsis f28 gray3 mb10">{{ item.name }}</view>
						<view class="f24 gray9 mb10">{{ item.rule }}</view>
						<view class="d-s-c f40 gray6">
							+{{ item.points }}
							<image class="task-points" src="/static/icon/task/task.png" mode=""></image>
						</view>
					</view>
					<button class="task-btns" :class="item.status != 0 ? '' : 'active'"
						@click="clickFunc(item)">{{ item.status != 0 ? '已完成' : '去完成' }}</button>
				</template>
			</view>
		</view>
		<view class="task-center">
			<view class="task-center-title">日常任务</view>
			<view class="task-center-item d-s-c" v-for="(item, index) in day_task" :key="index">
				<template v-if="item.is_open == 1">
					<image class="task-logo" :src="item.image" mode=""></image>
					<view class="flex-1">
						<view class="text-ellipsis f28 gray3 mb10">{{ item.name }}</view>
						<view class="f24 gray9 mb10">{{ item.rule }}</view>
						<view class="d-s-c f40 gray6"
							v-if="item.task_type != 'order' && item.task_type != 'sign' && item.task_type != 'invite'">
							+{{ item.points }}
							<image class="task-points" src="/static/icon/task/task.png" mode=""></image>
						</view>
					</view>
					<button class="task-btns" :class="item.status != 0 ? '' : 'active'"
						@click="clickFunc(item)">{{ item.status != 0 ? '今日已完成' : '去完成' }}</button>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				invitation_id: 0,
				day_task: [],
				grow_task: [],
				back_image: ''
			};
		},
		onShow() {
			this.getData();
		},
		methods: {
			clickFunc(e) {
				let self = this;
				if (e.status != 0) {
					return;
				}
				let url = '';
				switch (e.task_type) {
					case 'product':
						url = '/pages/product/list/list';
						break;
					case 'article':
						url = '/pages/article/list/list';
						break;
					case 'order':
						url = '/pages/product/list/list';
						break;
					case 'sign':
						url = '/pagesPlus/signin/signin';
						break;
					case 'invite':
						url = '/pages/user/invite/invite?invitation_gift_id=' + self.invitation_id;
						break;
					case 'image':
						url = '/pages/user/set/set';
						break;
					case 'nickName':
						url = '/pages/user/set/set';
						break;
					case 'base':
						url = '/pages/user/set/set';
						break;
				}
				if (url) {
					self.gotoPage(url);
				}
			},
			getData() {
				let self = this;
				self._get('plus.task.Task/index', {}, res => {
					self.day_task = res.data.data.day_task;
					self.grow_task = res.data.data.grow_task;
					self.back_image = res.data.data.back_image;
					self.invitation_id = res.data.data.invitation_id;
				});
			}
		}
	};
</script>

<style lang="scss">
	.bg-top {
		width: 750rpx;
		height: 270rpx;
	}

	.task-center {
		padding: 12rpx 19rpx 0 23rpx;
		background-color: #ffffff;
	}

	.task-center-item {
		border-top: 1rpx solid #eeeeee;
		height: 202rpx;
		box-sizing: border-box;
	}

	.task-center-title {
		font-size: 32rpx;
		color: #121212;
		padding: 32rpx 0;
	}

	.task-logo {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-right: 35rpx;
		flex-shrink: 0;
	}

	.task-points {
		width: 38rpx;
		height: 38rpx;
		margin-left: 14rpx;
		flex-shrink: 0;
	}

	.task-btns {
		width: 147rpx;
		height: 58rpx;
		border-radius: 29rpx;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 1.5;
		margin-right: 26rpx;
		font-size: 24rpx;
		box-sizing: border-box;
		border: 1rpx solid #eeeeee;
		background-color: #eeeeee;
		color: #666666;
	}

	.task-btns.active {
		@include border_color('border_color');
		@include background_color('background_color');
		@include text_color('text_color1');
	}
</style>