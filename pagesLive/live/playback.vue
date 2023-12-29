<template>
	<view>
		<video class="video" :src="url" controls></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				room_id: 0,
				url: ''
			}
		},
		onLoad(e) {
			this.room_id = e.room_id;
			this.getData();
		},
		methods: {
			getData() {
				let self = this;
				self.loading = true;
				self._get(
					'plus.live.room/detail', {
						room_id: self.room_id
					},
					function(res) {
						self.url = res.data.model.record_url;
					}
				);
			}
		}
	}
</script>

<style>
	.video {
		width: 750rpx;
		height: 100vh;
	}
</style>
