<template>
  <view class="fields-detail">


    <!-- 导航栏 -->
    <view class="slide-nav" >
    <view class="de-navbar" >
      <view
          @click="onChange(index)"
          class="de-navbar-item"
          :class="current === index ? 'active' : ''"
          v-for="(item, index) in navbar"
          :key="index" 
      >
        {{ item }}
      </view>
      <view class="indicator" :style="{ transform: `translateX(${indicatorX}px)`, width: indicatorWidth }"></view>
    </view>
    </view>


    <!-- 概述 -->
    <view class="overviews-box" v-if="current==0">

    <view class="overviews">
      <view class="harvest">
        <view class="harvest-title">产量</view>
        <view class="harvest-item">
          <view class="charts-box">
            <qiun-data-charts
                type="column"
                :opts="opts"
                :chartData="chartData"
            />
          </view>

        </view>
      </view>
    </view>


    <view class="data-box harvest">
      <view class="data-title harvest-title">数据</view>
      <view class="data-group">
        <view class="data-item">
          <view class="data-item-text">空气温度</view>
          <view class="data-item-value">
            <text>24</text>℃
          </view>
        </view>
        <view class="data-item">
          <view class="data-item-text">空气湿度</view>
          <view class="data-item-value">
            <text>24</text>%
          </view>
        </view>
        <view class="data-item">
          <view class="data-item-text">营养</view>
          <view class="data-item-value">
            <text>24</text>%
          </view>
        </view>
        <view class="data-item">
          <view class="data-item-text">降雨</view>
          <view class="data-item-value">
            <text>24</text>%
          </view>
        </view>
      </view>
    </view>
  </view>

  <!-- 笔记 -->
  <view class="notes" v-if="current==1">
    <notes :notes="notes" :status='status' :nomore="nomoreText"></notes>
</view>


  </view>
</template>

<script>
import notes from '@/components/notes/notes.vue'; 
export default {
  components:{
        notes
    },
  data() {
    return {
      navbar: ['概述', '笔记'],
      current: 0,
      indicatorWidth: '50%', // 初始宽度（根据需求修改）
      indicatorX: 0, // 指示器的 X 坐标,
      chartData: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['mount'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。
      // 实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: ["#91CB74",],
        padding: [15,15,0,5],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          data: [
            {
              min: 0
            }
          ]
        },
        extra: {
          column: {
            type: "group",
            width: 30,
            activeBgColor: "#000000",
            activeBgOpacity: 0.08,
            barBorderRadius: [
              60,
              60,
              60,
              60
            ]
          }
        }
      },
      notes:[
                {
                    fields_name:'西红柿专区',
                    func_name:'打农药',
                    date:"10月9号",
                    days:'10',
                    next_do_time:'10',
                    url:'https://seopic.699pic.com/photo/60061/6313.jpg_wh1200.jpg',
                }
            ],
              status: 'nomore',
              loadingText: '努力加载中',
              loadmoreText: '轻轻上拉',
              nomoreText: '实在没有了'


    }
  },
  
  onShow() {

    this.updateIndicator(); // 在组件挂载时更新指示器位置
    this.getServerData();
  },
  methods: {
    onChange(index) {
      this.current = index
      this.updateIndicator(); // 切换导航项时更新指示器位置
    },
    updateIndicator() {
      // const navbarWidth = this.$refs.navbars.clientWidth; // 导航栏宽度
      
      this.$nextTick(() => {
      uni.createSelectorQuery().in(this).select('.de-navbar').boundingClientRect((rect) => {

      const  navbarWidth =  rect.width;

      const itemWidth = navbarWidth / this.navbar.length; // 单个导航项的宽度
      this.indicatorX = itemWidth * this.current; // 计算指示器位置
      this.indicatorWidth = `${itemWidth}px`; // 设置指示器宽度
    }).exec()

    });
    },
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: ["2018","2019","2020","2021","2022","2023"],
          series: [
            {
              name: "年份",
              data: [35,36,31,33,13,34]
            },
          ]
        };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
  }
}
</script>

<style scoped lang="scss">
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width:95%;
  height: 300px;
  margin-left:2.5%;
}
.harvest{
  background: #fff;
  border-radius: 20px;
  margin: 10px 10px;
  padding: 10px;
}
.harvest-title{
  padding: 10px;
  font-weight: bold;
  font-size: 1rem;
}
.data-box{
  margin-top:40rpx;
  padding: 18rpx;

}
.data-group{
  display: flex;
  flex-wrap: wrap;
 background: #fff;
}
.data-item{
    width:calc(50% - 40rpx) ;
    background: rgb(165, 232, 118);
    color: #000;
    margin:20rpx;

    border-radius: 10px;
}
.data-item-text{
  font-weight: bold;
  font-size: 1.2rem;
  padding: 20rpx;
}
.data-item-value{
  font-size: 1rem;
  color: #2d2d2d;
  margin:40rpx 20rpx 20rpx 20rpx;
  text{
    color: #000;
    font-weight: bold;
    font-size: 2rem;
    padding-right: 20rpx;
  }
}


</style>

<style lang="scss">
.slide-nav{
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
    bottom:18rpx;
    left: 0;
    height: 40px; /* 设置指示器高度与导航项高度相同 */
    background-color: #000000;
    transition: transform 0.3s ease;
    transform-origin: 0 50%; /* 指示器的变换原点 */
    border-radius: 100px;

  }
}
</style>
