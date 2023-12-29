<template>
	<view class="" :data-theme='theme()' :class="theme() || ''">
		<view class="top_head pr">
			<view class="state_top"></view>
			<userbox></userbox>
		</view>
		<weather></weather>
		<fields></fields>	
		<!-- <tabBar></tabBar> -->
	</view>
</template>

<script> 
	import userbox from './components/userbox.vue'
	import weather from './components/weather.vue'
	import fields from './components/fields.vue'
	import uniLoadMore from '@/components/uni-load-more.vue';
	// import config from '@/config.js';

	export default {
		components: {
			userbox,
			weather,
			fields,
			uniLoadMore,
	
		},
		data() {
			return {
				/*是否正在加载*/
				loading: false,
				is_auto:0
			};
		},
		watch: {
		
		},
		computed: {
			/*加载中状态*/

		},
		onShow() {
			// this.getTabBarLinks();
		},
		onLoad() {
			this.getTabbar();
		},
		onPullDownRefresh() {
		
		},
		onReachBottom() {
		},
		methods: {
			/*获取首页分类*/
		
			
			/*分享当前页面*/
			onShareAppMessage() {
				let self = this;
				return {
					title: self.page.params.share_title,
					path: '/pages/index/index?' + self.getShareUrlParams(),
				};
			},
			getTabbar() {
				uni.showTabBar();
				console.log(uni.getStorageSync('TabBar').is_auto);
			let self = this;
			if (!uni.getStorageSync('TabBar').is_auto || uni.getStorageSync('TabBar').is_auto == 0) {
				let theme = uni.getStorageSync('theme');
				if (theme) {
					let color = ['#ff5704', '#19ad57', '#ffcc00', '#1774ff', '#e4e4e4', '#c8ba97', '#623ceb'];
					uni.setTabBarStyle({
						color: '#333333',
						selectedColor: color[theme]
					});
					uni.setTabBarItem({
						index: 0,
						text: '首页',
						iconPath: 'static/tabbar/home.png',
						selectedIconPath: 'static/tabbar/home_' + theme + '.png'
					});
					uni.setTabBarItem({
						index: 1,
						text: '分类',
						iconPath: 'static/tabbar/category.png',
						selectedIconPath: 'static/tabbar/category_' + theme + '.png'
					});
					uni.setTabBarItem({
						index: 2,
						text: '购物车',
						iconPath: 'static/tabbar/cart.png',
						selectedIconPath: 'static/tabbar/cart_' + theme + '.png'
					});
					uni.setTabBarItem({
						index: 3,
						text: '我的',
						iconPath: 'static/tabbar/user.png',
						selectedIconPath: 'static/tabbar/user_' + theme + '.png'
					});
				} else {
					setTimeout(function() {
						self.getTabbar();
					}, 3000);
				}
			}
		}
			
		}
	};
</script>

<style lang="scss">

	page{
		background-color: #fff;
	}
	.bg-f2 {
		background-color: #F2F2F2;
	}

	.top_head {
		line-height: 30px;
		z-index: 1;
		
		top: 0;
		left: 0;
		z-index: 100;
		
	}

	.head_top {
		width: 100%;
		height: var(--status-bar-height);
	}
.state_top{
	height: 40px;
}

</style>
