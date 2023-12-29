<template>
    <view class="device-weather">
   <view class="flexbox">
    <view class="flexbox-child">
        <view class="devicebox">
        <view class="device device1">
            <view class="title_cell">
                <view class="title_cell_text">设备</view>
               <text class="wiconfont wicon-jizhan"></text>
            </view>
            <view class="device_text"> 
                <text class="num">{{device.online}}</text>
                <text class="type">在线</text>
            </view>
            <view class="device_text"> 
                <text class="num">{{device.bad}}</text>
                <text class="type">损坏</text>
            </view>
            <view class="device_text"> 
                <text class="num">{{device.offline}}</text>
                <text class="type">离线</text>
            </view>
        </view>
    </view>
    <view class="devicebox weatherbox">
        <view class="device">
            <view class="title_cell">
                <view class="title_cell_text">天气</view>
               <text class="wiconfont wicon-tianqi1"></text>
            </view>
            <view class="weathertext">
                24℃
            </view>
            <view class="lebel_cell">
                <text class="wiconfont wicon-feng"></text>
                <text class="lebel_text">16km/h</text>
            </view>
            <view class="lebel_cell">
                <text class="wiconfont wicon-dayu"></text>
                <text class="lebel_text">55%</text>
            </view>
            <view class="lebel_cell">
                <text class="wiconfont wicon-w_shidu"></text>
                <text class="lebel_text">0 mm</text>
            </view>
        </view>
        </view>
    </view>
    </view>
    </view>

 </template>
 <script>
    export default{
        
        data(){
            return{
                device:{
                    online:8,
                    bad:2,
                    offline:2
                }
            }
        }



    }
</script>

 <style scoped lang="scss">
 .device-weather{
    margin-top: 125px;
 }
 .flexbox{
    margin: 0rpx 14rpx;
    .flexbox-child{
        width: 100%;
       display: flex;
    }
    .devicebox{
        width: 50%;
        margin: 0rpx 28rpx;
  
    .device{
        background-color:aquamarine;
        padding: 20rpx;
        border-radius: 10rpx;
        height:378rpx;
        .title_cell{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title_cell_text{
                font-weight: bold;
                font-size: 1rem;
                .wiconfont{
                    font-size: 1.2rem;
                }

            }
        }
        .device_text{
            display: flex;
            align-items: center;
            margin-top:20rpx;
            .num{
              font-weight: bold;
              font-size: 2.3rem;  
            }
            .type{
                margin-left: 38rpx;
                color: #666;
                font-size: 1rem;
            }
        }
    }
    .device1{
        background-color:rgb(218, 218, 218);
    }
    
}
.weatherbox{
    .weathertext{
        font-size: 3rem;
        margin: 10rpx 0;
    }
    .lebel_cell{
        margin-top:28rpx;
        display: flex;
        align-items: center;
        .lebel_text{
            font-size: 0.85rem;
            padding-left: 18rpx;
        }
    }

}
   
}
 </style>
