<template>
    <view class="member">
        <view class="head-flex">
            <view class="member-info">
                <image src="https://otx.gzjuchuang.com/uploads/images/20230912/20230912113431dad5e7051.png"
                    mode="widthFix" />
                <text>Aureliano</text>
            </view> 
            <view class="set" @click="changeStatus">
                <u-icon name="setting-fill" color="#000" size="28"></u-icon>
            </view>
        </view>
        <view class="harvest">
            <view class="har-title">
                <text class="text">收货</text>
                <text class="wiconfont wicon-shuye"></text>
            </view>
            <view class="har_value">
                1221t
            </view>
            <view class="har-data">
                <view class="scroll-view">  
                  <scroll-view scroll-x class="har-data-item-1">
                    <view class="har-data-item" v-for="(item,index) in 8" :key="index">
                    <view class="har-data-cell" >
                        <view class="val">20t</view>
                        <view class="line-box">
                            <view class="line-item"></view>
                        </view>
                        <view class="har-data-name">小麦</view>
                   </view>
                </view>
                </scroll-view>
            </view>  

            </view>
        </view>

        <view class="harvest">
            <view class="har-title">
                <text class="text">常用功能</text>
               <u-icon name="list-dot" color="#000" size="28"></u-icon>
            </view>
            <view class="member-navbar">
                <view class="member-nav-item" v-for="(item,index) in 10" :key="index">
                    <view class="wiconfont wicon-quyu1"></view>
                    <view class="navbar-text">土地管理</view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            list: [

            ]
        }
    },
    onLoad() {
        // 获取用户信息
   
    },
    methods:
    {
        changeStatus(){
            let self = this;
            const stauts =1;
				self._post('index/changapp', {stauts}, function(res) {
					if (res.code == 1) {
						uni.showToast({
							title: "切换成功",
							icon: 'none'
						})
                        uni.navigateTo({
                            url:"/pages/index/index"
                        })
 
                    }
				});
        },
    
        globalData: {
            userInfo: null
        }
    }
}
</script>

<style>
.head-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx 30rpx;
}

.member-info {
    display: flex;
    align-items: center;

}

.member-info image {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    margin-right: 20rpx;
}

.member-info text {
    font-weight: bold;
    font-size: 36rpx;
}

.set {
    background-color: rgb(255, 255, 255);
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-content: center;
}

.harvest {
    margin: 30rpx;
    padding: 30rpx;
    background-color: rgb(255, 255, 255);
    border-radius: 10rpx;
}

.har-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.har-title .text {
    font-weight: bold;
    font-size: 36rpx;
}

.har-title .wiconfont {
    font-size: 40rpx;
}

.har_value {
    font-size: 1.4rem;
    font-weight: bold;
    margin: 30rpx 0;
}

.scroll-view{
    width: 100%;
    height: 200px; /* Adjust height as needed */
    overflow: hidden;
}
.har-data-item-1{
    display: flex;
    white-space: nowrap;

}
.har-data-item{
    display: inline-block;
   margin: 0rpx 30rpx;
    
}
.har-data-cell{
    height: 170px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    }
    .val{
      font-size: 30rpx;
      font-weight: bold;   
      margin:30rpx 0;
    }
    .line-box{
       background: rgb(221, 252, 198);
       height: 100%;
       display: flex;
       flex-direction: column;
       justify-content: flex-end;
       border-radius: 100rpx;
    }
    .line-item{
        width: 50rpx;
        height: 50%;
        background: rgb(147, 243, 79);
        border-radius: 100rpx;
    }
    .har-data-name{
        padding-top: 20rpx;
        font-weight: bold;
    }
    .member-navbar{
        display: flex;
        flex-direction: row;
        padding: 20rpx 0;
        flex-wrap: wrap;
        margin-top: 30rpx;
    }
    .member-nav-item{
        width: 25%;
       margin: 20rpx 0;
    }
    .member-nav-item .wiconfont{
        text-align: center;
        font-weight: bold;
        margin: 10rpx;
        font-size:60rpx;
    }
    .member-nav-item  .navbar-text{
        text-align: center;
        font-weight: bold;
    }
</style>
