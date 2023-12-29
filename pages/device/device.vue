<template>
    <view class="device">
  <view class="tab_bg">  
    <u-tabs :list="list2"></u-tabs>
</view>
    <view class="device-group">
        <view class="device-cell" v-for="(item,index) in devices" :key="index">
           <view class="avatar"><image :src="item.avatar_url"></image></view>
            <view class="device-info">
            <view class="device-name">{{item.name}}</view>    
            <view class="area-name">所属区域:{{item.area_name}}</view> 
            <view class="create_time">{{item.create_time}}</view>    

            <view class="device-fj">
                <view class="status working">{{item.status}}</view>
                <view class="set_btn" @click="goPage">设置</view>
            </view>    
            </view>      
        </view>
        <u-loadmore
        :status="status"
        :nomore-text="nomoreText"
        color="#1CD29B"
        lineColor="#1CD29B"
        dashed
        line
    />
    </view>
</view>


</template>

<script>
    export default {
        data() {
            return {
                list2: [{
                    name: '全部'
                }, {
                    name: 'default',
                    badge: {
                       
                    }
                }, {
                    name: 'default',
                    badge: {
                        value: 5,
                    }
                }
                ],
                devices:[
                    {avatar_url:'/static/temporarily.jpg',name:'设备1',area_name:'区域1',status:'工作中',create_time:'2020-10-10'} ,
                    {avatar_url:'/static/temporarily.jpg',name:'设备1',area_name:'区域1',status:'在线',create_time:'2020-10-10'}, 
                    {avatar_url:'/static/temporarily.jpg',name:'设备1',area_name:'区域1',status:'在线',create_time:'2020-10-10'} 
                ],
                nomoreText:'没有更多了',
                status:'nomore' 
            }
        },
        methods:{
            goPage(){
              
                uni.navigateTo({
                    url: '/pages/device/detail/index'
                })  
            }
        }
    }
</script>
<style scoped>

.device-group{
    margin:0 28rpx;

}
.device-cell{
    display: flex;
    flex-direction: row;
    margin-top: 30rpx;
    background: #fff;
    border-radius: 10rpx;

}
.avatar image{
    width: 200rpx;
    height: 200rpx;
    border-radius: 10rpx;
}
.device-info{
    padding:10rpx 20rpx;
    width: 100%;
}
.device-name{
    font-weight: bold;
    font-size: 30rpx;
}
.area-name{
    margin-top: 10rpx;
    font-size: 26rpx;
    font-weight: bold;

}
.create_time{
    font-weight: bold;
    color: #666;
    margin-top: 10rpx;
}
.device-fj{
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 10rpx;
    align-items: center;
}
.set_btn{
    border: 1rpx solid #7fffd4;
    padding: 10rpx 20rpx;
    background-color: #7fffd4;
    color: rgb(72, 72, 72);
    font-weight: bold;
    border-radius: 10rpx;
}
.device-fj .status{
    font-weight: bold;
    font-size: 32rpx;
}
.working{
    color: green;
}
.tab_bg{
    background: #fff;
}

</style>
