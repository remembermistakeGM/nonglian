<template>
    <view class="add_notes">
        <view class="input_cell">
            <view class="input_title">农场选择</view>
            <view class="input_item">
            <view class="input_box">
                <view class="icon_box">
                    <u-icon name="grid" size="28"></u-icon>
                </view>
                <view class="input_lable">选择需要记录农场</view>
            </view>
            <view class="right"> <u-icon name="arrow-down" size="25"></u-icon></view>
        </view>
    </view>

        <view class="input_cell">
            <view class="input_title">记录事件</view>
            <view class="input_item">
            <view class="input_box">
                <view class="icon_box">
                    <u-icon name="grid" size="28"></u-icon>
                </view>
                <view class="input_lable"><input type="text" placeholder="事件名称" name="" id=""></view>
            </view>
            <view class="right"> <u-icon name="arrow-down" size="25"></u-icon></view>
        </view>
     </view>

     <view class="input_cell">
        <view class="input_title">开始时间</view>
        <view class="input_item">
        <view class="input_box">
            <view class="icon_box">
                <u-icon name="grid" size="28"></u-icon>
            </view>
            <view class="input_lable">当前时间</view>
        </view>
        <view class="right"> <u-icon name="arrow-down" size="25"></u-icon></view>
    </view>
 </view>

 <view class="input_cell">
    <view class="input_title">开始时间</view>
    <view class="input_item">
    <view class="input_box">
        <view class="icon_box">
            <u-icon name="grid" size="28"></u-icon>
        </view>
        <view class="input_lable">当前时间</view>
    </view>
    <view class="right"> <u-icon name="arrow-down" size="25"></u-icon></view>
</view>
</view>

 <view class="input_cell">
    <view class="input_title">预计下次时间</view>
    <view class="input_item">
    <view class="input_box">
        <view class="icon_box">
            <u-icon name="grid" size="28"></u-icon>
        </view>
        <view class="input_lable">选择日期</view>
    </view>
    <view class="right"> <u-icon name="arrow-down" size="25"></u-icon></view>
</view>
</view>

    
    </view>
</template>

<script>

</script>
<style>

.input_cell{
    padding: 28rpx;
}
.input_title{
margin: 0rpx 20rpx 0rpx 20rpx;
font-size: 1.3rem;
font-weight: bold;
}
.input_item{
    background: #fff;
    margin: 20rpx;
    border-radius: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 18rpx 36rpx;
    align-items: center;
}
.input_box{
    display: flex;
    align-items: center;
}
.icon_box {
    background-color: #dcdcdc;
    padding:6rpx;
    border-radius: 50%;
}
.input_lable{ 
    padding-left: 30rpx;
    font-weight: bold;
    font-size: 0.96rem;
}

</style>