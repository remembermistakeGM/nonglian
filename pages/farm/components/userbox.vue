<template>
   <view class="userbox">
    <view class="userbox-bg"><image src="/static/temp/farming.jpg" mode="widthFix" /></view>
    <view class="userflex">
    <view class="username">Hi Aureliano</view>
    <view class="user-head-image"> <image src="https://otx.gzjuchuang.com/uploads/images/20230912/20230912113431dad5e7051.png" mode="" /></view>
 </view> 
   </view>
</template>

<style scoped > 
.userbox-bg{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: -1;
} 
.userbox-bg image{
    width: 100%;
}
.userbox{
 position: relative;
}
    .userflex{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 38rpx 20rpx;
    }
    .username{
        font-size: 1.2rem;

    }
    .user-head-image image{
        width:80rpx;
        height: 80rpx;
    }
</style>