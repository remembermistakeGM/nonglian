<template>
   <view class="fields">
        <view class="fields-title">
            <view class="fields-title-label">地块</view>
            <view class="fields-title-all">全部</view>
        </view>
        <view class="fields-group">
             <view class="fields-cell" v-for="(item,index)  in  lists" :key="index">
                <view class="fields-img"><image mode="" :src="item.url"  /></view>
                <view class="fields-info">
                        <view class="fields-name">{{item.name}}</view>
                        <view class="fields-time">{{item.plant}}  种植时间：{{item.time}} 天</view>
                        <view class="fields-area"><text class="wiconfont wicon-quyu"></text>{{item.area}}亩</view>
                </view>
            </view> 

        </view>

   </view>
</template>
<script>


export default {
    data() {
            return{
                lists: [
					{ url:'https://seopic.699pic.com/photo/60061/6313.jpg_wh1200.jpg',name:'东南区域',plant:'西红柿',time:"23",area:20},
					{ url:'https://img95.699pic.com/photo/50091/4848.jpg_wh860.jpg',name:'西南区域',plant:'草莓',time:"24",area:60}

                ]
    }
}
}
</script>
<style lang="scss">
.fields{
    background-color: #f2f2f2;
    border-radius: 60rpx;
    margin:36rpx 0;
    padding: 36rpx;


.fields-title{
    display: flex;
    justify-content: space-between;
    .fields-title-label{
        font-weight: bold;
        font-size: 1.1rem;
    }
    .fields-title-all{
       color: #666;
       font-size: 0.8rem;
    }


}
.fields-cell{
    display: flex;
    background-color: #fff;
    margin-top: 36rpx;
    padding: 28rpx;
    border-radius: 20rpx;
    .fields-img{
        image{
            width: 180rpx;
            height: 180rpx;
            border-radius: 30rpx;
        }
    }
  }  
  .fields-info{
    margin-left: 20rpx;
    .fields-name{
        font-weight: bold;
        font-size: 1rem;
    }
    .fields-time{
        padding: 30rpx 0;
        font-weight: 200;
        font-size: 0.8rem;
        color: #666;
    }
    .fields-area{
        font-size: 0.8rem;
        font-weight: 400;
        text{
            padding-right: 20rpx;
        }
    }
  }
}
</style>