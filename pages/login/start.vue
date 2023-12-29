<template>
    <view class="start">
        <view class="start_bg" ><image src="/static/temp/login.png" /> </view>
        <view class="start-content">    
            <view class="logo"><image src="/static/temp/logo.png" mode="widthFix" /></view>
        
        <view class="start-text">
            <text>在这里</text>
            <text>开启您的智能农场之旅</text>
        </view>
        <view class="sbtn" @click="goPage">开始</view>
    </view>
    </view>
</template>
<script>

export default {
    data(){ 
        return{

        }
    },
    methods:{
        goPage(){
            uni.switchTab({
          
      
                url:'/pages/farm/index'
            })
        }
    },
   
}
</script>

<style>
.start_bg image{
     width:100% ;
     height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    filter: brightness(90%); /* 调整这里的百分比来改变亮度 */
   
}
.start-content{
    position: absolute;
    width:100% ;
    height: 100%;
}
.start-content .logo image{
        width: 200rpx;
        margin: 0 auto;
        padding-top: 50%;
        display: block;
}
.start-text{
    margin-top: 160rpx;
}
.start-text text{
    font-weight: bold;
    color: rgb(255, 255, 255);
    font-size: 1.6rem;
    text-align: center;
    display: block;
    margin-top: 60rpx;
}
.sbtn{
    width:50%;
    height: 80rpx;
    line-height: 80rpx;
    background: rgb(72, 109, 40);
    color:#fff;
    font-size: 1.1rem;
    border-radius: 100px;
    margin: 0 auto;
    margin-top: 100rpx;
    display: block;
    text-align: center; 
    letter-spacing: 5rpx;
    font-weight: bold;
    box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.5);
}
</style>