<template>
	<view class="category-wrap" :data-theme="theme()" :class="theme() || ''">
    <!-- {{  phoneHeight }}--{{ searchHeight }}-{{ shoppingHeight }}-{{ footerHeight }} -->
		<!-- #ifdef APP-PLUS -->
		<header-bar></header-bar>
		<!-- #endif -->
		<!-- 搜索框 -->
		<view class="index-search-box-cate d-b-c" id="searchBox"
			:style="topBarHeight() == 0 ? '' : 'height:' + topBarHeight() + 'px;padding-top:' + topBarTop() + 'px'">
			<view class="index-search-cate flex-1 t-c" @click="gotoSearch">
				<span class="icon iconfont icon-sousuo"></span>
				<text class="ml10">{{ searchName }}</text>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="wx-top-right"></view>
			<!-- #endif -->
		</view>
		<!--类别列表-->
		<view class="category-content">
			<!--一级分类 大图-->
			<view class="cotegory-type cotegory-type-1" v-if="show_type == 10 && style == 3">
				<scroll-view scroll-y="true" class="scroll-Y" :style="'height:' + scrollviewHigh + 'px;'">
					<view class="list">
						<view class="item" v-for="(item, index) in listData" :key="index"
							@click="gotoList(item.category_id)">
							<view class="pic">
								<image :src="hasImages(item)" mode="widthFix"></image>
							</view>
							<view class="p-20-0 tc f28">{{ item.name }}</view>
						</view>
					</view>
				</scroll-view>
			</view>

			<!--二级分类-->
			<template v-if="(show_type == 20 && (style==1 || style==2 || style==3)) || (show_type == 10 && (style == 1 || style == 2 || style == 4))">
				<view class="cotegory-type cotegory-type-3">
					<template  v-if="showTwo()">
						<view class="category-tab f-s-0" :class="{'showShopping': isBuyFast() && is_auto == 0}" >
							<scroll-view scroll-y="true" class="scroll-Y"  :class="{'showShopping': isBuyFast() && is_auto == 0}" :style="'height:' + scrollviewHigh + 'px;'">
								<view :class="select_index == index ? 'item active' : 'item'" v-for="(item, index) in listData"
									:key="index" @click="selectCategory(index)">
									<text>{{ item.name }}</text>
								</view>
							</scroll-view>
						</view>
					</template>
					<view class="category-tab f-s-0" v-if="(style == 1 && show_type == 20) || (style == 4 && show_type == 10)">
						<scroll-view scroll-y="true" class="scroll-Y" :class="{'showShopping': isBuyFast() && is_auto == 0}" :style="'height:' + scrollviewHigh + 'px;'">
							<view :class="select_index == index ? 'item active' : 'item'" v-for="(item, index) in listData"
								:key="index" @click="selectCategory(index)">
								<text>{{ item.name }}</text>
							</view>
						</scroll-view>
					</view>
					<!--二级分类 小图-->
					<view class="cotegory-type cotegory-type-2 flex-1" v-if="(style == 1 && show_type == 20)">
						<scroll-view scroll-y="true" class="scroll-Y" :class="{'showShopping': isBuyFast() && is_auto == 0}" :style="'height:' + scrollviewHigh + 'px;'">
							<view class="list">
								<view class="item" v-for="(item, index) in childlist" :key="index"
									@click="gotoList(item.category_id)">
									<image :src="hasImages(item)" mode="widthFix"></image>
									<text>{{ item.name }}</text>
								</view>
							</view>
						</scroll-view>
					</view>
					<!--一级分类 小图-->
					<view class="cotegory-type cotegory-type-2 flex-1" v-if="style == 1 && show_type == 10">
						<scroll-view scroll-y="true" class="scroll-Y" :class="{'showShopping': isBuyFast() && is_auto == 0}" :style="'height:' + scrollviewHigh + 'px;'">
							<view class="list">
								<view class="item" v-for="(item, index) in listData" :key="index"
									@click="gotoList(item.category_id)">
									<image :src="hasImages(item)" mode="widthFix"></image>
									<text>{{ item.name }}</text>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="category-content pr" v-if="style == 2 || style == 3 || style == 4">
						<scroll-view scroll-y="true" class="scroll-Y scroll-3" :class="{'showShopping': isBuyFast() && is_auto == 0}" :style="'height:' + scrollviewHigh + 'px;'">
							<view class="catescroll2-top" v-if="show_type == 20 && (style == 2 || style == 3)">
								<view @click="changeCategory(item.category_id)" class="catescroll2-top-item"
									:class="{ active: item.category_id == category_id }" v-for="(item, index) in childlist"
									:key="index">
									{{ item.name }}
								</view>
							</view>
							<view>
								<view class="product-item-2"
									@click="gotoPage('/pages/product/detail/detail?product_id=' + item.product_id)"
									v-for="(item, index) in productlist" :key="index">
									<image class="product-image-2" :src="item.product_image" mode=""></image>
									<view class="flex-1 d-c d-b-s" style="height: 154rpx;">
										<view class="text-ellipsis-2 f28 gray3">{{ item.product_name }}</view>
										<view class="theme-price f36 fb price-wrap">
											<text class="f24">￥</text>
											{{ item.product_min_price }}
											<template v-if="shoppingPrice && item.isActivity != 1 && isBuyFast()">
												<view class="add-shopping-wrap theme-bg" @click.stop="addShopping(item)">
													<view class="icon iconfont icon-icozhuanhuan"></view>
												</view>
											</template>
										</view>
									</view>
								</view>
							</view>
							<!-- <view class="f26 catename">{{catename}}</view>
							<view class="list">
								<view class="item" v-for="(item,index) in childlist" :key="index"
									@click="gotoList(item.category_id)">
									<image :src="hasImages(item)" mode="widthFix"></image>
									<text class="type-name">{{item.name}}</text>
								</view>
							</view> -->
						</scroll-view>
					</view>
				</view>
			</template>
			
		</view>
		<!-- 结算弹窗 -->
				<categoryMaskVue ref="categoryMaskRef" :dataList="productArr" @get-shopping-num="getShoppingNum" />
				<!-- 快速结算 -->
				<template  v-if="isBuyFast()">
					<view class="shopping d-b-c" id="shopping" :class="[{ customTabBar: is_auto == 1 },{H5:platFormType == 'web'}]">
						<view class="shopping-l d-s-c">
							<view class="shopping-circle" @click="lookProduct">
								<view class="shopping-icon icon iconfont icon-gouwuchefill"></view>
								<view class="shopping-num" v-if="shoppingNum && shoppingNum!=0">{{ shoppingNum }}</view>
							</view>
							<view class="shopping-price d-s-c">
								<view class="shopping-symbol">￥</view>
								<view>{{ shoppingPrice }}</view>
							</view>
						</view>
						<button class="shopping-r" @click="Submit">
							去结算
						</button>
					</view>
				</template>
				<view id="emptyShopping" v-if="isDomHeight && is_auto == 1"></view>
        // #ifdef H5
        <view id="footBottom" v-if="is_auto == 1 && isDomHeight"></view>
        // #endif
				<tabBar @get-footer-height="getFooterHeigth"></tabBar>
				<!--购物确定-->
				<spec :isPopup="isPopup" :productModel="productModel" @close="closePopup"></spec>
	</view>
</template>

<script>
import spec from '@/pages/product/detail/popup/spec.vue';
import categoryMaskVue from './categoryMask.vue';
import throttle from "@/common/throttle.js";
export default {
  components: {
	spec,
	categoryMaskVue,
  },
  data() {
    return {
      loading: true,
      searchName: "搜索商品",
      /*展示方式*/
      show_type: 3,
      style: 1,
      /*手机高度*/
      phoneHeight: 0,
      /*可滚动视图区域高度*/
      scrollviewHigh: 0,
      /*数据*/
      listData: [],
      /*子类数据*/
      childlist: [],
      /*当前选中的分类*/
      select_index: 0,
      catename: "全部商品",
      productlist: [],
      page: 1,
      category_id: 0,
      tableData: [],
      isLogin: false,
      shoppingNum: 0,
      shoppingPrice: null,
      productModel: {},
      isPopup: false,
      specData: null,
      detail: null,
      isDomHeight: true,
      shoppingHeight: 0,
      searchHeight: 0,
      footerHeight: 0,
      productArr: [],
      is_auto: 0,
	    url: "",
	    platFormType: "",
    };
  },
  onLoad() {
    const platFormType = uni.getSystemInfoSync().uniPlatform
    this.platFormType = platFormType;
    console.log(this.platFormType,'平台类型') // app
	//#ifdef H5
	if (this.isWeixin()) {
		this.url = window.location.href;
	}
	//#endif
  },
  onShow() {
    let tabBarObj = uni.getStorageSync("TabBar");
    if (tabBarObj) {
      this.is_auto = tabBarObj.is_auto;
    }
    this.getTabBarLinks();
  },
  mounted() {
    this.init();
    this.getData();
  },
  computed: {
    /*加载中状态*/
    loadingType() {
      if (this.loading) {
        return 1;
      } else {
        if (this.productlist.length != 0 && this.no_more) {
          return 2;
        } else {
          return 0;
        }
      }
    },
  },
  /**
   * 设置分享内容
   */
  onShareAppMessage() {
    let self = this;
    return {
      title: self.templet.share_title,
      path: "/pages/product/category?" + self.getShareUrlParams(),
    };
  },
  methods: {
	  lookProduct(){
			this.$refs.categoryMaskRef.open();
		},
		isBuyFast(){
			if(this.isLogin){
				if(this.isLogin && (this.show_type == 10 && this.style == 4) || (this.show_type == 20 && this.style == 3)){
          let height = this.phoneHeight - this.searchHeight - this.shoppingHeight;
          if(this.is_auto == 1){
            // #ifdef H5
            this.scrollviewHigh = height - this.footerHeight;
            // #endif
            // #ifndef H5
            this.scrollviewHigh = height;
            // #endif
          }else{
            this.scrollviewHigh = height;
          }
					return true
				}
			}
      // #ifdef H5
      if(this.is_auto == 1){
        this.scrollviewHigh = this.phoneHeight - this.searchHeight - this.footerHeight;
      }else{
        this.scrollviewHigh = this.phoneHeight - this.searchHeight;
      }
      // #endif
      // #ifndef H5
      this.scrollviewHigh = this.phoneHeight - this.searchHeight;
			// #endif
			return false
		},
	  showTwo(){
		if(this.show_type == 20 && (this.style == 2 || this.style == 3)){
			return true
		}
		if(this.show_type == 10 && this.style == 2){
			return true
		}
		return false
	},
    /*初始化*/
    init() {
			let self = this;
			uni.getSystemInfo({
				success(res) {
					self.phoneHeight = res.windowHeight;
					// 计算组件的高度
					let view = uni.createSelectorQuery().select('#searchBox');
					view.boundingClientRect(data => {
						self.searchHeight = data.height || 0;
					}).exec();
					let shoppingView = uni.createSelectorQuery().select('#emptyShopping');
					if(shoppingView){
						shoppingView.boundingClientRect(data => {
							if(data && data.height){
								self.shoppingHeight = data.height;
							}
						}).exec();
					}


          let footBottomView = uni.createSelectorQuery().select('#footBottom');
					if(footBottomView){
						footBottomView.boundingClientRect(data => {
							if(data && data.height){
								self.footerHeight = data.height;
							}
						}).exec();
					}

					self.isDomHeight = false;
				}
			});
		},
    /*判断是否有图片*/
    hasImages(e) {
      if (e.images != null && e.images.file_path != null) {
        return e.images.file_path;
      } else {
        return "";
      }
    },

    /*获取数据*/
    getData() {
      let self = this;
      self.loading = true;
      self._get("product.category/index", {}, function (res) {
        /* self.listData = [
          {
            name: '全部商品',
            category_id: 0,
            child:[
              {
                category_id: 0,
                name: '全部商品'
              }
            ]
          }
        ] */
        self.listData = self.listData.concat(res.data.list)
        // self.catename = self.listData[0].name;
        self.show_type = res.data.template.category_style;
        self.style = res.data.template.wind_style;
        if (self.style == 2) {
          self.getProduct();
        } else if (
          (self.show_type == 10 && self.style == 4) ||
          (self.show_type == 20 && self.style == 3)
        ) {
          self.getProduct();
          self.getShoppingNum();
        }
        if (self.listData[0].child) {
          self.childlist = self.listData[0].child;
          self.changeCategory(self.childlist[0].category_id);
        }
        self.background = res.data.background;
        self.loading = false;
      });
    },
    changeCategory(e) {
      this.category_id = e;
      this.productlist = [];
      this.page = 1;
      this.getProduct();
    },
    getCheckedIds() {
      let self = this;
      let arrIds = [];
      self.productArr.forEach(item => {
        arrIds.push(`${item.cart_id}`);
      });
      return arrIds;
    },
    /*去结算*/
		Submit() {
			let arrIds = this.getCheckedIds();
      if (arrIds.length == 0) {
        uni.showToast({
          title: '请选择商品',
          icon: 'none'
        });
        return false;
      }
      this.gotoPage('/pages/order/confirm-order?order_type=cart&cart_ids=' + arrIds);
		},
    /* 获取购物车数量 */
    getShoppingNum() {
      let self = this;
      self._post("product.Category/lists", {}, function (res) {
        const {
          data: { productList },
        } = res;
        self.isLogin = false;
        if (productList) {
          self.isLogin = true;
          self.tableData = productList;
          let total_num = 0;
          let totalPrice = 0;
          let productArr = [];
          if (productList && productList.length > 0) {
            productList.forEach((v) => {
              if (v.productList && v.productList.length > 0) {
                v.productList.forEach((item) => {
                  productArr.push(item);
                  total_num = total_num + item.total_num;
                  totalPrice =
                    totalPrice +
                    parseFloat(item.total_num) * parseFloat(item.product_price);
                });
              }
            });
          }
          self.productArr = productArr;
          self.shoppingNum = total_num;
          self.shoppingPrice = totalPrice.toFixed(2);
        }
      });
    },
    /* 添加购物车初始化 */
    addShopping(item) {
      if (item.spec_type == 20) {
        this.getSpecData(item.product_id);
      } else {
        this.addSingleSpec(item.product_id);
      }
    },
    /* 单规格商品加入购物车 */
    addSingleSpec(product_id) {
      let self = this;
      self._post(
        "order.cart/add",
        {
		      product_id: product_id,
          total_num: 1,
          spec_sku_id: 0,
        },
        function (res) {
          self.getShoppingNum();
        }
      );
    },
    /* 获取多规格商品 */
    getSpecData(product_id) {
      let self = this;
      self._get(
        "product.product/detail",
        {
			product_id: product_id,
			url: self.url,
			visitcode: self.getVisitcode()
        },
        function (res) {
          if (res.data.specData) {
            self.isPopup = false;
            self.detail = res.data.detail;
            self.specData = res.data.specData;
            self.initSpecData(res.data.specData);
          } else {
            uni.showToast({
              title: "暂无规格，请于后台添加!",
              mask: false,
              duration: 1500,
              icon: "none",
            });
          }
        }
      );
    },
    /* 初始化规格弹窗 */
    initMaskPopup() { 
		let obj = {
			specData: this.specData,
			detail: this.detail,
			productSpecArr: this.specData != null ? new Array(this.specData.spec_attr.length) : [],
			show_sku: {
				sku_image: '',
				price: 0,
				product_sku_id: 0,
				line_price: 0,
				stock: 0,
				product_sku_id: 0,
				sum: 1
			},
			plus_sku: null,
			type: 'card',
			plus_name: ''
		};
      this.productModel = obj;
      this.isPopup = true;
    },
    /*初始化多规格商品*/
    initSpecData(data) {
	 for (let i in data.spec_attr) {
		 for (let j in data.spec_attr[i].spec_items) {
			 data.spec_attr[i].spec_items[j].checked = false;
		 }
	  }
	  this.specData = data;
      this.initMaskPopup();
    },
    closePopup() {
      this.isPopup = false;
      this.getShoppingNum();
    },
    getProduct() {
      let self = this;
      let page = self.page;
      let category_id = self.category_id;
      let sortType = self.sortType;
      let sortPrice = self.sortPrice;
      self.loading = true;
      self._get(
        "product.product/lists",
        {
          page: page || 1,
          category_id,
          search: "",
          sortType: "",
          sortPrice: "",
          list_rows: 20,
        },
        function (res) {
          self.loading = false;
          self.productlist = self.productlist.concat(res.data.list.data);
          self.last_page = res.data.list.last_page;
          if (res.data.list.last_page <= 1) {
            self.no_more = true;
          }
        }
      );
    },
    /*选择分类*/
    selectCategory(e) {
		throttle(()=>{
			if (this.show_type == 10) {
			this.select_index = e;
			this.catename = this.listData[this.select_index].name;
			this.changeCategory(this.listData[this.select_index].category_id);
		} else {
			if (this.listData[e].child) {
			this.childlist = this.listData[e].child;
			this.select_index = e;
			this.catename = this.listData[this.select_index].name;
			this.changeCategory(this.childlist[0].category_id);
			}
		}
		})
    },
    hasSelect() {
      let self = this;
    },
    /*跳转产品列表*/
    gotoList(e) {
      let category_id = e;
      let sortType = "all";
      let search = "";
      let sortPrice = 0;
      this.gotoPage(
        "/pages/product/list/list?category_id=" +
          category_id +
          "&sortType=" +
          sortType +
          "&search=" +
          search +
          "&sortPrice=" +
          sortPrice
      );
    },

    wxGetUserInfo: function (res) {
      if (!res.detail.iv) {
        uni.showToast({
          title: "您取消了授权,登录失败",
          icon: "none",
        });
        return false;
      }
    },

    /*跳转搜索页面*/
    gotoSearch() {
      this.gotoPage("/pages/product/search/search");
    },
  },
};
</script>

<style lang="scss">
@import "@/common/mixin.scss";
$footer-tabBar-height: 98rpx;
$shopping-height: 96rpx;

page {
  min-height: 0;
}

.foot_ {
  height: 98rpx;
  width: 100%;
}

.cotegory-type {
  line-height: 40rpx;
  background: #ffffff;
}

.cotegory-type image {
  width: 100%;
}

.cotegory-type-1 .list {
  padding: 20rpx;
}

.cotegory-type-1 .list .item {
  margin-top: 30rpx;
}

.cotegory-type-1 .list .item .pic {
  // border: 1px solid #e3e3e3;
  width: 710rpx;
  height: auto;
  overflow: hidden;
  border-radius: 8px;
}

.cotegory-type-1 .list .item image {
  width: 100%;
  height: 100%;
}

.cotegory-type-2 .list,
.cotegory-type-3 .list {
  padding: 0 20rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.cotegory-type-2 .list .item,
.cotegory-type-3 .list .item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cotegory-type-3 .list .item {
  width: 140rpx;
  height: 200rpx;
  margin-top: 40rpx;
  margin-right: 20rpx;
  font-size: 24rpx;
}

.cotegory-type-2 .list .item {
  padding: 0 16rpx;
  width: 33.3%;
  margin: 0;
  margin-bottom: 16rpx;
  height: 300rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.cotegory-type-2 .list .item image {
  width: 100%;
  margin-bottom: 20rpx;
}

.cotegory-type-3 {
  display: flex;
}

.cotegory-type-3 .category-tab {
  width: 200rpx;
  background: #ffffff;
  @include background_color("opacify_background_0");
  // border-right: 1px solid #e3e3e3;
}
.showShopping{
  padding-bottom: $shopping-height;
  box-sizing: border-box;
}

.cotegory-type-3 .category-tab .item {
  padding: 40rpx 0;
  font-size: 26rpx;
  text-align: center;
  color: #666666;
  font-weight: bold;
}

.cotegory-type-3 .category-tab .item.active {
  position: relative;
  background: #ffffff;

  color: #333333;
}

.cotegory-type-3 .category-tab .item.active::after {
  position: absolute;
  content: "";
  top: 40rpx;
  bottom: 40rpx;
  left: 0;
  width: 6rpx;
  height: 22rpx;
  margin: auto;
  @include background_linear("titleft1", "titleft2", 180deg, 0%, 100%);
}

.cotegory-type-3 .category-content {
  flex: 1;
  // padding: 0 20rpx;
}

.cotegory-type-3 .list .item:nth-child(3n) {
  margin-right: 0;
}

.cotegory-type-3 .list .item image {
  width: 140rpx;
  height: 140rpx;
}

.cotegory-type-3 .list .item .type-name {
  display: block;
  margin-top: 20rpx;
  height: 80rpx;
  line-height: 60rpx;
  text-overflow: ellipsis;
  width: 100%;
  color: #818181;
  font-size: 26rpx;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
}

.scroll-3 {
  position: absolute;
  background: #ffffff;
  border-radius: 12px;
}

.catename {
  padding-top: 10rpx;
  line-height: 60rpx;
  border-bottom: 1rpx solid #eeeeee;
}

.catescroll2-top {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 20rpx 0;
  padding-left: 20rpx;
}

.catescroll2-top-item {
  // min-width: 142rpx;
  padding: 0 23rpx;
  height: 58rpx;
  background: #f6f6f6;
  border: 1rpx solid #f6f6f6;
  border-radius: 29rpx;
  margin-right: 14rpx;
  line-height: 58rpx;
  color: #666;
  text-align: center;
  box-sizing: border-box;
  white-space: nowrap;
}

.catescroll2-top-item.active {
  color: #fff;
  @include background_color("background_color");
  border: 1rpx solid #ee252a;
  @include border_color("border_color");
}

.product-item-2:first-child {
  margin-top: 20rpx;
}

.product-item-2 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20rpx;
  margin-bottom: 25rpx;

  .product-image-2 {
    width: 194rpx;
    height: 194rpx;
    display: block;
    margin-right: 20rpx;
  }
}

.uni-scroll-view::-webkit-scrollbar,
.catescroll2-top::-webkit-scrollbar {
  /*滚动条整体样式*/
  /*高宽分别对应横竖滚动条的尺寸*/
  display: block;
  width: 0rpx !important;
  height: 0rpx !important;
  -webkit-appearance: default-button;
}

.uni-scroll-view::-webkit-scrollbar-thumb,
.catescroll2-top::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: #909399;
}

.uni-scroll-view::-webkit-scrollbar-track,
.catescroll2-top::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}
.price-wrap{
	position: relative;
	width: 100%;
}
.add-shopping-wrap{
	position: absolute;
	right: 0;
	top: 0;
	width: 48rpx;
	height: 48rpx;
	line-height: 48rpx;
	border-radius: 50%;
	.icon{
		margin-left: 6rpx;
		color: #fff;
	}
}
#emptyShopping{
	width: 100%;
	height: $shopping-height;
	opacity: 0;
}
#footBottom{
  width: 100%;
  height: $footer-tabBar-height;
}
.shopping{
	position: fixed;
  bottom: 0;
	left: 0;
	width: 100%;
	height: $shopping-height;
	background: #FFFFFF;
	border-top: 1px solid #EEEEEE;
	padding: 0 34rpx;
	box-sizing: border-box;
  &.customTabBar{
    bottom: calc(env(safe-area-inset-bottom) + 98rpx);
  }
  &.H5{
    bottom: calc(env(safe-area-inset-bottom) + 98rpx);
  }
  /* &.noH5:not(.customTabBar){
		bottom: 0;
	} */
	.shopping-l{
		.shopping-circle{
			width: 70rpx;
			height: 69rpx;
			line-height: 69rpx;
			background: #fff;
			border-radius: 50%;  
			box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.4);
			position: relative;
		}
		.shopping-icon{
			color: #E22319;
			font-size: 45rpx !important;
			text-align: center;
			margin-top: 3rpx;
		}
		.shopping-num{
			width: 28rpx;
			height: 28rpx;
			line-height: 28rpx;
			text-align: center;
			background: #E22319;
			border-radius: 50%;
			position: absolute;
			right: 0;
			top: 0;
			font-size: 23rpx;
			color: #fff;
		}
		.shopping-price{
			color: #E22319;
			font-size: 36rpx;
			margin-left: 42rpx;
			font-weight: bold;
			.shopping-symbol{
				font-size: 22rpx;
			}
		}
	}
	.shopping-r{
		width: 178rpx;
		height: 62rpx;
		line-height: 62rpx;
		background: #E22319;
		border-radius: 31rpx;
		color: #FFFFFF;
		font-size: 30rpx;
	}
}
</style>