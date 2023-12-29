<template>
    <view class="fields">
      <view class="fields-group">
        <view @click="goPage" class="fields-item" v-for="(item,index) in lists" :key="index">
            <view class="fields-images">
                <image :src="item.url" mode="widthFix" />
            </view>
          <view class="fields-info">
              <view class="fields-name">{{item.name}} | {{item.plant}}</view>
            <view class="fields-info-text">
                <view class="mk-time">种植时间：{{item.time}} 天</view>
              <view class="fields-text">
                <text class="wiconfont wicon-quyu"></text>
                <text class="text">{{item.area}}</text>亩 
              </view>

            </view>
          </view>

        </view>

        <u-loadmore
            :status="status"
            :loading-text="loadingText"
            :loadmore-text="loadmoreText"
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
    export default{
        data(){
            return{
                lists:[
                  { url:'https://seopic.699pic.com/photo/60061/6313.jpg_wh1200.jpg',name:'东南区域',plant:'西红柿',time:"23",area:20},
                  { url:'https://seopic.699pic.com/photo/60061/6313.jpg_wh1200.jpg',name:'东南区域',plant:'西红柿',time:"23",area:20},
                ],
              status: 'nomore',
              loadingText: '努力加载中',
              loadmoreText: '轻轻上拉',
              nomoreText: '实在没有了'
            }
        },
      methods:{
        goPage(){
          uni.navigateTo({
            url:'./detail'
          })
        }
      }
    }

</script>

<style lang="scss">
    .fields-group{
      padding:0 28rpx;
      .fields-item{
        padding:28rpx;
        background: #fff;
        margin-top: 20rpx;
        border-radius:10px;
        .fields-images {
          width: 100%;
          image{
            border-radius: 10px;
          }
        }
        .fields-info{
          padding-top: 20rpx;
          .fields-name{
            font-size: 1.1rem;
            font-weight: bold;
          }
          .fields-info-text{
            padding-top: 28rpx;
            display: flex;
            justify-content: space-between;
            .mk-time{
              font-size: 1rem;
              font-weight: bold;
            }
            .fields-text{
              font-size: 0.9rem;
              display: flex;
              align-items: center;
              .text{
                padding-left: 10rpx;
                padding-right: 10rpx;
                font-weight: bold;
              }
            }
          }
        }
      }
    }


</style>