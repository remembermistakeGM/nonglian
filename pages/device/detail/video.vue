<template>
    <view class="monitor">

    <view class="monitor-content" >  
      <view class="monitor-group">
        <view class="monitor-cell" v-for="(item,index) in 5" :key="index">
          <view  class="monitor-item">
          <view class="monitor-image">
            <image src="https://youimg1.c-ctrip.com/target/fd/tg/g2/M04/14/07/CghzgFVJq0GAD5t2ACO5Iv7rGvk632.jpg" mode="aspectFill" />
            <view class="play">
                <u-icon color="#fff" name="play-right" size="80rpx"></u-icon>
            </view>
        </view>
          <view class="monitor-text">
            <view class="monitor-name"> 
                <text class="area">农场1 </text>
                <text class="text">设备名称:夜间监控</text>  
            </view>
            <view class="icon_cell">

                <view class="icon_item">
                    <u-icon name="camera" size="80rpx"></u-icon>
                    <text class="icon_text">回放</text>
                </view>
                <view class="switch">
                    <u-switch
                    space="2" v-model="value11" activeColor="#1CD29B" 
                    inactiveColor="rgb(230, 230, 230)">
                </u-switch>
                </view>
            </view>
          </view> 
        </view>  
          
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
 

</template>  
<script>
  export default {
    data() {
      return {
          nomoreText:'没有更多了',
          status:'nomore' ,
          value11: false,
      }
    }, 
    methods: {
     
      
     
    }
  };
</script>
<style scoped> 

  .monitor-group{
    padding: 0; 
    padding: 10rpx 6rpx; 
    
  }  
  .monitor-cell{
  }
  .monitor-item{
    margin: 0rpx 10rpx;
    margin-top: 20rpx;
  
  }
  .monitor-image image{
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;
  } 
   .monitor-image {
    position: relative;
    width: 100%;
    height:450rpx;
  }
  .monitor-image .play{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    color: #fff;
    font-size: 50rpx;
    
  }
  .monitor-text{
    padding-top:20rpx;
    padding-bottom: 20rpx;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-left: 10rpx;
    background-color: #fff;
    border-bottom-left-radius: 20rpx;
    border-bottom-right-radius: 20rpx;
    box-shadow: 0rpx 6rpx 6rpx #f3f3f3;
  } 
  .monitor-text .text{  
    padding-left: 18rpx;
    color: #666;
  } 
  .area{
    font-size: 1.1rem;
    font-weight: bold;
  }
  .icon_cell{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
  }
  .icon_item .icon_text{
    text-align: center;
    font-weight: bold;
    display: block;
  }
</style>                