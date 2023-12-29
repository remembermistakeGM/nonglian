<template>
	<view :data-theme="theme()" :class="theme() || ''" class="article-detail" v-if="loadding">
		<view class="title fb">{{ article.article_title }}</view>
		<view class="info d-b-c f24">
			<view>
				<text class="red">{{ article.category.name }}</text>
				<text class="ml30">{{ article.create_time }}</text>
			</view>
			<button class="share-box" open-type="share" @click="shareFunc"><image class="share_img" src="/static/icon/fenxiang.png" mode=""></image></button>
		</view>
		<view class="article-content" v-html="article.article_content"></view>
		<tabBar></tabBar>
		<!--app分享-->
		<AppShare :isAppShare="isAppShare" :appParams="appParams" @close="closeAppShare"></AppShare>
	</view>
</template>

<script>
import utils from '@/common/utils.js';
import AppShare from '@/components/app-share.vue';
export default {
	components: {
		AppShare
	},
	data() {
		return {
			/*是否加载完成*/
			loadding: false,
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			/*文章id*/
			article_id: 0,
			/*文章详情*/
			article: {
				image: {}
			},
			urldata: '',
			/*app分享*/
			isAppShare: false,
			appParams: {
				title: '',
				summary: '',
				path: ''
			}
		};
	},
	onLoad(e) {
		/*分类id*/
		this.article_id = e.article_id;
		//#ifdef H5
		if (this.isWeixin()) {
			this.urldata = window.location.href;
		}
		//#endif
	},
	mounted() {
		/*获取产品详情*/
		this.getData();
	},
	/*分享*/
	onShareAppMessage() {
		let self = this;
		// 构建页面参数
		let params = self.getShareUrlParams({
			article_id: self.article_id
		});
		self.taskFunc();
		return {
			title: self.article.article_title,
			path: '/pages/article/detail/detail?' + params
		};
	},
	methods: {
		taskFunc() {
			let self = this;
			self._post(
				'plus.task.Task/dayTask',
				{
					task_type: 'article'
				},
				res => {
					console.log('分享成功');
				}
			);
		},
		/*复制*/
		copyUrl() {
			var input = document.createElement('input');
			let message = window.location.href;
			input.value = message;
			document.body.appendChild(input);
			input.select();
			input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
			document.body.removeChild(input);
			uni.showToast({
				title: '复制成功',
				icon: 'success',
				mask: true,
				duration: 2000
			});
		},
		shareFunc() {
			let self = this;
			this.taskFunc();
			//#ifdef H5
			self.copyUrl();
			//#endif
			//#ifdef APP-PLUS
			self.appParams.title = self.detail.product_name;
			self.appParams.summary = self.detail.product_name;
			// 构建页面参数
			let params = self.getShareUrlParams({
				article_id: self.article_id
			});
			self.appParams.path = '/pages/article/detail/detail?' + params;
			self.appParams.image = self.detail.image[0].file_path;
			self.isAppShare = true;
			//#endif
		},
		//关闭分享
		closeAppShare(data) {
			this.isAppShare = false;
		},
		/*获取文章详情*/
		getData() {
			let self = this;
			uni.showLoading({
				title: '加载中'
			});
			self.loading = true;
			let article_id = self.article_id;
			self._get(
				'plus.article.article/detail',
				{
					article_id: article_id,
					url: self.urldata
				},
				function(res) {
					/*详情内容格式化*/
					res.data.detail.article_content = utils.format_content(res.data.detail.article_content);
					console.log(res.data.detail.article_content);
					self.article = res.data.detail;
					// 配置微信分享参数
					//#ifdef H5
					if (self.url != '' && self.isWeixin()) {
						let params = {
							article_id: self.article_id
						};
						self.configWx(res.data.share.signPackage, res.data.share.shareParams, params);
					}
					//#endif
					self.loadding = true;
					uni.hideLoading();
				}
			);
		}
	}
};
</script>

<style>
.article-detail {
	padding: 30rpx;
	background: #ffffff;
}

.article-detail .title {
	font-size: 44rpx;
}

.article-detail .info {
	padding: 40rpx 0;
	color: #999999;
}

.article-detail .article-content {
	width: 100%;
	box-sizing: border-box;
	line-height: 60rpx;
	font-size: 34 rpx;
	overflow: hidden;
}
.article-detail .article-content image,
.article-detail .article-content img {
	display: block;
	max-width: 100%;
}
.share-box {
	background: none;
}
.share_img {
	width: 32rpx;
	height: 32rpx;
}
</style>
