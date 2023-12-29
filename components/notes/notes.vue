<template>
    <view class="note_list">
        <view class="note_item" v-for="(item,index) in notes" :key="index">
            <view class="fields_image"><image :src="item.url" mode="" /></view>
            <view class="fields_info">
                <view class="note_name">{{item.func_name}} </view>
                <view class="fields_name"> {{item.fields_name}} </view>
                <view class="time-box">
                <view class="notes_time">
                    <view class="notes_date">{{item.date}}</view>
                    <view class="notes_day">{{item.days}}天前</view>
                </view>
                <view class="next_do_time">距离下一次实施还有{{item.next_do_time}}天</view>
            </view>
            </view>

        </view>
        <u-loadmore
        :status="status"
        :nomore-text="nomore"
        color="#1CD29B"
        lineColor="#1CD29B"
        dashed
        line
    />
      </view>
</template>

<script>
export default{
    props:['notes','status','nomore']
    
}

</script>

<style scoped>
.note_item{
    background-color: #fff;
    border-radius: 20rpx;
    display: flex;
    margin: 20px 20px 20px 20px;
    padding: 20rpx;

}
.fields_image {
    flex: 1;
}
.fields_image image{
    width: 200rpx;
    height:200rpx;
    border-radius: 20rpx;
}
.fields_info{
    padding-left: 20rpx;
    flex: 3;
}
.note_name{
    font-weight: bold;
    font-size: 1.2rem;
}
.fields_name{
    padding: 10rpx 0;
    font-size: 0.9rem;
}
.notes_time{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  align-items: center;
}
.notes_date{
    font-weight: bold;
    font-size: 1.1rem;
}
.notes_day{
    display: inline-block;
    background-color: rgb(235, 129, 129);
    font-size: 0.9rem;
    font-weight: bold;
    padding: 16rpx;
    color: #fff;
    border-radius: 10rpx;
}
.next_do_time{
    margin-top: 20rpx;
    font-weight: bold;
    font-size: 1rem;
}
</style>