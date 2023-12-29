<template>
  <view class="product-list-mask" v-if="show" @click="closeMask">
    <view class="product-list-content" :class="[{ customTabBar: is_auto == 1 },{H5:platFormType == 'web'}]">
      <view class="funList d-b-c">
        <view class="funList-l">已选商品</view>
        <view class="funList-r" @click.stop="onDelete">
          <view>清空购物车</view>
        </view>
      </view>
      <scroll-view scroll-y="true" style="height: 600rpx">
        <view class="product-item d-s-c" v-for="v in dataList" :key="v">
          <view class="mask-product-img">
            <image class="img" :src="v.product_image" mode="aspectFit"></image>
          </view>
          <view class="d-b-c d-c percent-w100 flex-1" style="height: 100%">
            <view class="mask-t">
              <view class="mask-product-title d-b-c"> 
                <view class="text-ellipsis">{{ v.product_name }}</view>
                <view
                  class="iconfont icon-shanchu1"
                  @click.stop="clickDel(v)"
                ></view>
              </view>
              <view v-if="v.product_attr"> 已选【{{ v.product_attr }}】</view>
            </view>
            <view class="mask-b d-b-c">
              <view class="mask-price">￥{{ v.product_price }}</view>
              <view class="mask-action d-s-c">
                <view class="mask-minus" @click.stop="reduceFunc(v)">
                    <view class="iconfont icon-jian"></view>
                </view>
                <view class="mask-num">{{ v.total_num }}</view>
                <view class="mask-add" @click.stop="addFunc(v)">
                    <view class="iconfont icon-jia"></view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import spec from "@/pages/product/detail/popup/spec.vue";
export default {
  components: {
    spec,
  },
  props: ["dataList"],
  data() {
    return {
      show: false,
      is_auto: 0,
      platFormType: '',
    };
  },
  methods: {
    open() {
      let tabBarObj = uni.getStorageSync("TabBar");
      if(tabBarObj){
        this.is_auto = tabBarObj.is_auto;
      }
      const platFormType = uni.getSystemInfoSync().uniPlatform
      this.platFormType = platFormType;
      if(this.$props.dataList && this.$props.dataList.length > 0){
        this.show = !this.show;
      }
    },
    closeMask(){
        this.show = false;
    },
    /*添加*/
    addFunc(item) {
      console.log("item", item);
      let self = this;
      uni.showLoading({
        title: "加载中",
      });
      self._post(
        "order.cart/add",
        {
          product_id: item.product_id,
          spec_sku_id: item.spec_sku_id,
          total_num: 1,
        },
        function (res) {
          uni.hideLoading();
          self.loadding = false;
          self.$emit("get-shopping-num");
        },
        function () {
          self.loadding = false;
        }
      );
    },
    /*减少*/
    reduceFunc(item) {
      let self = this;
      if (item.totalNum <= 1) {
        return;
      }
      uni.showLoading({
        title: "加载中",
      });
      self._post(
        "order.cart/sub",
        {
          product_id: item.product_id,
          spec_sku_id: item.spec_sku_id,
        },
        function (res) {
          self.loadding = false;
          uni.hideLoading();
          self.$emit("get-shopping-num");
        },
        function () {
          self.loadding = false;
        }
      );
    },
    /* 删除单个商品 */
    clickDel(item) {
      let self = this;
      uni.showModal({
        title: "提示",
        content: "您确定要移除该商品吗?",
        success(e) {
          e.confirm &&
            self._post(
              "order.cart/delete",
              {
                cart_id: item.cart_id,
              },
              function (res) {
                self.$emit("get-shopping-num");
              }
            );
        },
      });
    },
    /* 获取所有商品的cartID */
    getCheckedIds() {
      let self = this;
      let arrIds = [];
      if (self.$props.dataList) {
        self.$props.dataList.forEach((item) => {
          arrIds.push(item.cart_id);
        });
      }
      return arrIds;
    },
    /*删除购物车*/
    onDelete() {
      let self = this;
      let cartIds = self.getCheckedIds();
      if (!cartIds.length) {
        self.showError("您还没有选择商品");
        return false;
      }
      uni.showModal({
        title: "提示",
        content: "您确定要清空购物车吗?",
        success(e) {
          e.confirm &&
            self._post(
              "order.cart/delete",
              {
                cart_id: cartIds,
              },
              function (res) {
                self.$emit("get-shopping-num");
              }
            );
        },
      });
    },
  },
};
</script>

<style lang="scss">
.product-list-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  .product-list-content {
    width: 100%;
    background: #fff;
    position: absolute;
    bottom: 96rpx;
    // bottom: 194rpx;
    border-radius: 25rpx 25rpx 0 0;
    padding: 44rpx 24rpx 0 24rpx;
    box-sizing: border-box;
    &.customTabBar{
      bottom: 194rpx;
    }
  }
  .funList {
    padding-bottom: 36rpx;
    .funList-l {
      font-size: 32rpx;
      color: #333333;
      font-weight: bold;
    }
    .funList-r {
      font-size: 30rpx;
      color: #999999;
    }
  }
  .product-item {
    height: 164rpx;
    padding-bottom: 23rpx;
    &:last-child {
      padding-bottom: 0;
    }
    .mask-product-img {
      width: 164rpx;
      height: 100%;
      margin-right: 20rpx;
    }
    .mask-t {
      font-size: 22rpx;
      color: #999999;
      width: 100%;
      .mask-product-title {
        font-size: 30rpx;
        color: #333333;
        margin-bottom: 12rpx;
        .iconfont {
          font-size: 48rpx;
        }
      }
    }
    .mask-b {
      width: 100%;
    }
    .img {
      width: 100%;
      height: 100%;
    }
    .mask-price {
      font-size: 28rpx;
      font-weight: bold;
      color: #e22319;
    }
    .mask-action {
      width: 168rpx;
      height: 50rpx;
      line-height: 50rpx;
      border: 1px solid #EEEEEE;
      border-radius: 40rpx;
      view {
        flex: 1;
        text-align: center;
        height: 100%;
      }
      .mask-minus,.mask-add{
        .iconfont{
            color: #666666;
            font-size: 24rpx;
        }
      }
      .mask-minus {
        border-right: 1px solid #EEEEEE;
      }
      .mask-add {
        border-left: 1px solid #EEEEEE;
        border-left: 1px solid #EEEEEE;
      }
    }
  }
}
</style>
