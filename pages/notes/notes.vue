<template>
    <view class="notes">
        <view class="notes_head">
                <view class="head_text">笔记</view>
                <view class="add_note" @click="goPage"> 
                    <u-icon size="32px" bold="bold" name="plus-circle"></u-icon>
                </view>
        </view>
        <view class="slide-nav">
            <view class="de-navbar">
                <view @click="onChange(index)" class="de-navbar-item" :class="current === index ? 'active' : ''"
                    v-for="(item, index) in navbar" :key="index">
                    {{ item }}
                </view>
                <view class="indicator" :style="{ transform: `translateX(${indicatorX}px)`, width: indicatorWidth }"></view>
            </view>
        </view>

        <!-- 列表 -->
        <notes :notes="notes" :status='status' :nomore="nomore"></notes>

    </view>
</template>

 
<script>
import notes from '@/components/notes/notes.vue';

export default {
    components: {
        notes
    },
    data() {
        return {
            navbar: ['进行中', '已超时'],
            current: 0,
            indicatorWidth: '50%', // 初始宽度（根据需求修改）
            indicatorX: 0, // 指示器的 X 坐标,
            notes: [

                { 
                    fields_name: '西红柿专区',
                    func_name: '打农药',
                    date: "10月9号",
                    days: '10', 
                    next_do_time: '10',
                    url: 'https://seopic.699pic.com/photo/60061/6313.jpg_wh1200.jpg',
                }
            ],
            status: 'nomore',
            nomore: '实在没有了',
            bold:true
            
        }
    },
    onLoad() {

    },
    onShow() {
        this.updateIndicator(); 
    },
    methods: {
        goPage(){
            uni.navigateTo({ url: './add' })
        },
        onChange(index) {
            this.current = index
            this.updateIndicator(); // 切换导航项时更新指示器位置
        },
        // 指示器
        updateIndicator() {
            // const navbarWidth = this.$refs.navbars.clientWidth; // 导航栏宽度

            this.$nextTick(() => {
                uni.createSelectorQuery().in(this).select('.de-navbar').boundingClientRect((rect) => {

                    const navbarWidth = rect.width;

                    const itemWidth = navbarWidth / this.navbar.length; // 单个导航项的宽度
                    this.indicatorX = itemWidth * this.current; // 计算指示器位置
                    this.indicatorWidth = `${itemWidth}px`; // 设置指示器宽度
                }).exec()

            });
        },
    }
}

</script>
<style>
.notes_head{
    background: #fff;
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: bold;
    font-size: 1.2rem;
}
.notes_head  .add_note {
    color: #000;
}
</style>
<style lang="scss">
.slide-nav {
    margin: 0rpx 20rpx;
    background: #fff;
    border-radius: 100px;
}

.de-navbar {
    display: flex;
    position: relative;
    padding: 18rpx 0;
    margin: 20px;
    font-weight: bold;
    color: #000000;
    font-size: 1.1rem;
    overflow: hidden;

    .de-navbar-item {
        flex: 1;
        text-align: center;
        line-height: 40px;
        height: 40px;
        cursor: pointer;
        position: relative;
        z-index: 1;
    }

    .active {
        color: #fff;
        border-radius: 100px;
    }

    .indicator {
        position: absolute;
        bottom: 18rpx;
        left: 0;
        height: 40px;
        /* 设置指示器高度与导航项高度相同 */
        background-color: #000000;
        transition: transform 0.3s ease;
        transform-origin: 0 50%;
        /* 指示器的变换原点 */
        border-radius: 100px;

    }
}
</style>