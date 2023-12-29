<template>
	<view :data-theme="theme()" :class="theme() || ''" class="pb60">
		<view class="form-box mb20">
			<view class="d-b-c form-item" style="border: none;">
				<view class="f30 form-name">
					<text class="dominant mr10">*</text>
					商品名称
				</view>
				<view class="form-content">
					<text class="f24 gray9 ml20">{{ form.product_name.length + '/' + 60 }}</text>
				</view>
			</view>
			<input class="form-input flex-1 pb20 border-b" type="text" placeholder-class="gray9" placeholder="例如:【五双装】韩版复古女袜" v-model="form.product_name" />
			<view class="d-b-c form-item" style="border: none;">
				<view class="f30 form-name">
					<text class="dominant mr10">*</text>
					商品图片
				</view>
			</view>
			<view class="img-list">
				<view class="img-upload" v-for="(item, index) in form.image" :key="index">
					<image :src="item.file_path" mode="aspectFit"></image>
					<view class="close-btn icon iconfont icon-guanbi theme-btn" @click="deleteImg('image', index)"></view>
				</view>
				<view class="img-upload" @click="openUpload('image')">
					<text class="icon iconfont icon-31paishe"></text>
					<text class="f24 gray9">商品图片</text>
				</view>
			</view>
			<view class="d-b-c form-item" style="border-bottom: none;border-top: 1rpx solid #eee;">
				<view class="f30 form-name">
					<text class="white mr10">*</text>
					商品视频
				</view>
			</view>
			<view class="img-list">
				<view v-if="!form.video_id" class="img-upload" @click="openUpload('video', true)">
					<text class="icon iconfont icon-shangchuanshipin"></text>
					<text class="f24 gray9">商品视频</text>
				</view>
				<view class="img-upload" v-if="form.video_id">
					<video :src="form.video.file_path"></video>
					<view class="close-btn icon iconfont icon-guanbi theme-btn" @click="deleteImg('video')"></view>
				</view>
				<view class="img-upload" v-if="!form.poster_id" @click="openUpload('poster')">
					<text class="icon iconfont icon-31paishe"></text>
					<text class="f24 gray9">视频封面</text>
				</view>
				<view class="img-upload" v-if="form.poster_id">
					<image :src="form.poster.file_path" mode="aspectFit"></image>
					<view class="close-btn icon iconfont icon-guanbi theme-btn" @click="deleteImg('poster')"></view>
				</view>
			</view>
			<picker :range="category" range-key="name" @change="changeType($event, 'category')">
				<view class="d-b-c form-item" style="border-bottom: 1rpx solid #eee;border-top: 1rpx solid #eee;">
					<view class="f30 form-name">
						<text class="dominant mr10">*</text>
						商品分类
					</view>
					<view class="d-e-c flex-1 form-content">
						<view class="gray9 f30">{{ categoryIndex == -1 ? '请选择' : category[categoryIndex].name }}</view>
						<text class="icon iconfont icon-jiantou"></text>
					</view>
				</view>
			</picker>
			<view class="d-b-c form-item">
				<view class="f30 form-name">
					<text class="white mr10">*</text>
					销售状态
				</view>
				<view class="d-e-c flex-1 form-content">
					<view class="d-c-c ml20" @click="form.product_status = 10">
						<view class="radio-group" :class="{ active: form.product_status == 10 }"><text class="icon iconfont icon-tijiaochenggong"></text></view>
						<view class="gray9 f30">立即上架</view>
					</view>
					<view class="d-c-c ml20" @click="form.product_status = 20">
						<view class="radio-group" :class="{ active: form.product_status == 20 }"><text class="icon iconfont icon-tijiaochenggong"></text></view>
						<view class="gray9 f30">放入仓库</view>
					</view>
				</view>
			</view>
			<view class="d-b-c form-item">
				<view class="f30 form-name">
					<text class="white mr10">*</text>
					商品卖点
				</view>
				<view class="d-e-c flex-1 form-content " @click="openTextarea('selling_point', '商品卖点')">
					<view class="f30 gray9 text-ellipsis ml30">{{ form.selling_point || '未编辑' }}</view>
					<text class="icon iconfont icon-jiantou"></text>
				</view>
			</view>
		</view>
		<view class="form-box mb20">
			<view class="d-b-c form-item">
				<view class="f30 form-name fb">
					<text class="white mr10">*</text>
					其他设置
				</view>
			</view>
			<view class="d-b-c form-item">
				<view class="f30 form-name">
					<text class="white mr10">*</text>
					商品属性
				</view>
				<view class="d-e-c flex-1 form-content">
					<view class="d-c-c ml20" @click="form.is_virtual = 0">
						<view class="radio-group" :class="{ active: form.is_virtual == 0 }"><text class="icon iconfont icon-tijiaochenggong"></text></view>
						<view class="gray9 f30">实物商品</view>
					</view>
					<view class="d-c-c ml20" @click="form.is_virtual = 1">
						<view class="radio-group" :class="{ active: form.is_virtual == 1 }"><text class="icon iconfont icon-tijiaochenggong"></text></view>
						<view class="gray9 f30">虚拟商品</view>
					</view>
				</view>
			</view>
			<view class="d-b-c form-item" v-if="form.is_virtual == 0">
				<view class="f30 form-name">
					<text class="white mr10">*</text>
					运费
				</view>
				<view class="d-e-c flex-1 form-content">
					<view class="d-c-c ml20" @click="form.is_delivery_free = 0">
						<view class="radio-group" :class="{ active: form.is_delivery_free == 0 }"><text class="icon iconfont icon-tijiaochenggong"></text></view>
						<view class="gray9 f30">包邮</view>
					</view>
					<view class="d-c-c ml20" @click="form.is_delivery_free = 1">
						<view class="radio-group" :class="{ active: form.is_delivery_free == 1 }"><text class="icon iconfont icon-tijiaochenggong"></text></view>
						<view class="gray9 f30">运费模板</view>
					</view>
				</view>
			</view>
			<picker v-if="form.is_virtual == 0 && form.is_delivery_free == 1" :range="delivery" range-key="name" @change="changeType($event, 'delivery')">
				<view class="d-b-c form-item" style="border-bottom: 1rpx solid #eee;">
					<view class="f30 form-name">
						<text class="dominant mr10">*</text>
						运费模板
					</view>
					<view class="d-e-c flex-1 form-content">
						<view class="gray9 f30">{{ deliveryIndex == -1 ? '请选择' : delivery[deliveryIndex].name }}</view>
						<text class="icon iconfont icon-jiantou"></text>
					</view>
				</view>
			</picker>
			<view class="d-b-c form-item">
				<view class="f30 form-name">
					<text class="dominant mr10">*</text>
					商品排序
				</view>
				<view class="d-b-c flex-1 form-content">
					<input class="form-input flex-1" placeholder-class="gray9" placeholder="请输入" type="number" v-model="form.product_sort" />
				</view>
			</view>
			<view class="d-b-c form-item">
				<view class="f30 form-name">
					<text class="dominant mr10">*</text>
					限购数量
				</view>
				<view class="d-b-c flex-1 form-content">
					<input class="form-input flex-1" placeholder-class="gray9" placeholder="请输入" type="number" v-model="form.limit_num" />
				</view>
			</view>
			<view class="f24 gray9 form-item">每个会员购买的最大数量，0为不限购</view>
			<view class="d-b-c form-item" v-if="form.is_virtual == 1">
				<view class="f30 form-name">
					<text class="white mr10">*</text>
					发货类型
				</view>
				<view class="d-e-c flex-1 form-content">
					<view class="d-c-c ml20" @click="form.virtual_auto = 1">
						<view class="radio-group" :class="{ active: form.virtual_auto == 1 }"><text class="icon iconfont icon-tijiaochenggong"></text></view>
						<view class="gray9 f30">自动</view>
					</view>
					<view class="d-c-c ml20" @click="form.virtual_auto = 0">
						<view class="radio-group" :class="{ active: form.virtual_auto == 0 }"><text class="icon iconfont icon-tijiaochenggong"></text></view>
						<view class="gray9 f30">手动</view>
					</view>
				</view>
			</view>
			<view class="d-b-c form-item" v-if="form.is_virtual == 1">
				<view class="f30 form-name">
					<text class="white mr10">*</text>
					虚拟内容
				</view>
				<view class="d-e-c flex-1 form-content" @click="openTextarea('virtual_content', '虚拟内容')">
					<view class="f30 gray9 text-ellipsis ml30">{{ form.virtual_content || '未编辑' }}</view>
					<text class="icon iconfont icon-jiantou"></text>
				</view>
			</view>
		</view>
		<view class="form-box mb20">
			<view class="d-b-c form-item">
				<view class="f30 form-name fb">
					<text class="white mr10">*</text>
					规格/库存
				</view>
			</view>
			<view class="d-b-c form-item">
				<view class="f30 form-name">
					<text class="white mr10">*</text>
					库存计算方式
				</view>
				<view class="d-e-c flex-1 form-content">
					<view class="d-c-c ml20" @click="form.deduct_stock_type = 10">
						<view class="radio-group" :class="{ active: form.deduct_stock_type == 10 }"><text class="icon iconfont icon-tijiaochenggong"></text></view>
						<view class="gray9 f30">下单减库存</view>
					</view>
					<view class="d-c-c ml20" @click="form.deduct_stock_type = 20">
						<view class="radio-group" :class="{ active: form.deduct_stock_type == 20 }"><text class="icon iconfont icon-tijiaochenggong"></text></view>
						<view class="gray9 f30">付款减库存</view>
					</view>
				</view>
			</view>
			<view class="d-b-c form-item">
				<view class="f30 form-name">
					<text class="white mr10">*</text>
					产品规格
				</view>
				<view class="d-e-c flex-1 form-content">
					<view class="d-c-c ml20" @click="form.spec_type = 10">
						<view class="radio-group" :class="{ active: form.spec_type == 10 }"><text class="icon iconfont icon-tijiaochenggong"></text></view>
						<view class="gray9 f30">单规格</view>
					</view>
					<view class="d-c-c ml20" @click="form.spec_type = 20">
						<view class="radio-group" :class="{ active: form.spec_type == 20 }"><text class="icon iconfont icon-tijiaochenggong"></text></view>
						<view class="gray9 f30">多规格</view>
					</view>
				</view>
			</view>
			<!-- 单规格 -->
			<template v-if="form.spec_type == 10">
				<view class="d-b-c form-item">
					<view class="f30 form-name">
						<text class="dominant mr10">*</text>
						产品编码
					</view>
					<view class="d-b-c flex-1 form-content">
						<input class="form-input flex-1" placeholder-class="gray9" placeholder="请输入" type="text" v-model="form.sku.product_no" />
					</view>
				</view>
				<view class="d-b-c form-item">
					<view class="f30 form-name">
						<text class="dominant mr10">*</text>
						产品价格
					</view>
					<view class="d-b-c flex-1 form-content">
						<input class="form-input flex-1" placeholder-class="gray9" placeholder="请输入" type="digit" v-model="form.sku.product_price" />
					</view>
				</view>
				<view class="d-b-c form-item">
					<view class="f30 form-name">
						<text class="dominant mr10">*</text>
						产品划线价
					</view>
					<view class="d-b-c flex-1 form-content">
						<input class="form-input flex-1" placeholder-class="gray9" placeholder="请输入" type="digit" v-model="form.sku.line_price" />
					</view>
				</view>
				<view class="d-b-c form-item">
					<view class="f30 form-name">
						<text class="dominant mr10">*</text>
						库存数量
					</view>
					<view class="d-b-c flex-1 form-content">
						<input class="form-input flex-1" placeholder-class="gray9" placeholder="请输入" type="number" v-model="form.sku.stock_num" />
					</view>
				</view>
				<view class="d-b-c form-item">
					<view class="f30 form-name">
						<text class="dominant mr10">*</text>
						商品重量(Kg)
					</view>
					<view class="d-b-c flex-1 form-content">
						<input class="form-input flex-1" placeholder-class="gray9" placeholder="请输入" type="digit" v-model="form.sku.product_weight" />
					</view>
				</view>
			</template>
			<template v-if="form.spec_type == 20">
				<view class="d-e-c p-20-0">
					<button v-if="form.spec_many && form.spec_many.spec_attr.length <= 1" class="theme-btn small-btn" @click="addSpec">+添加规格</button>
					<button v-if="form.spec_many && form.spec_many.spec_attr.length > 1" class="btn-gray small-btn" disabled>+添加规格</button>
				</view>
				<template v-if="form.spec_many && form.spec_many.spec_attr">
					<view class="specAttr-groups" v-for="(item, index) in form.spec_many.spec_attr" :key="index">
						<view class="d-b-s mb20">
							<view class="f30 gray6">{{ item.group_name }}</view>
							<text class="icon iconfont icon-lajitong" @click="deleteSpec(index)"></text>
						</view>
						<view class="spec_values">
							<view class="spec_value pr" v-for="(aitem, aindex) in item.spec_items" :key="aindex">
								<text>{{ aitem.spec_value }}</text>
								<view class="close-btn icon iconfont icon-guanbi" @click="deleteSpecValue(index, aindex)"></view>
							</view>
						</view>
						<view class="d-b-c flex-1 form-content" v-if="item.spec_items.length <= 1">
							<input class="form-input border-input flex-1" placeholder-class="gray9" placeholder="请输入" type="text" v-model="specValuesList[index]" />
							<button class="theme-btn small-btn" @click="addApecValue(index)">+添加</button>
						</view>
					</view>
					<view class="d-b-c form-item" @click="openMany">
						<view class="f30 form-name">
							<text class="white mr10">*</text>
							规格明细
						</view>
						<view class="d-e-c flex-1 form-content"><text class="icon iconfont icon-jiantou"></text></view>
					</view>
				</template>
			</template>
		</view>
		<view class="form-box">
			<view class="d-b-c form-item" @click="isContent = true">
				<view class="f30 form-name">
					<text class="white mr10">*</text>
					商品详情
				</view>
				<view class="d-e-c flex-1 form-content"><text class="icon iconfont icon-jiantou"></text></view>
			</view>
			<view class="d-b-c form-item" @click="isAdvanced = true">
				<view class="f30 form-name">
					<text class="white mr10">*</text>
					高级设置
				</view>
				<view class="d-e-c flex-1 form-content"><text class="icon iconfont icon-jiantou"></text></view>
			</view>
		</view>
		<button class="btn-normal theme-btn" @click="submitFunc">提交</button>
		<view v-if="showPop">
			<view class="pop-bg"></view>
			<view class="pop-input d-c d-c-c">
				<view class="ww100 flex-1 pop-top">
					<text class="icon iconfont icon-guanbi" @click="closeFunc(null)"></text>
					<view class="pop-title">{{ title || '标题' }}</view>
					<view class="input-box d-c-c"><textarea class="textarea-box" v-model="popValue" placeholder="请输入..." placeholder-class="gray9"></textarea></view>
				</view>
				<view class="border-t ww100 d-b-c" style="height: 89rpx;">
					<view class="border-r fb d-c-c flex-1 f28 gray3 hh100" @click="closeFunc(null)">取消</view>
					<view class=" d-c-c flex-1 f28 dominant fb hh100" @click="closeFunc(true)">确认</view>
				</view>
			</view>
		</view>
		<view v-if="isSpec">
			<view class="pop-bg"></view>
			<view class="pop-input d-c d-c-c">
				<view class="ww100 flex-1 pop-top">
					<text class="icon iconfont icon-guanbi" @click="closeSpec(null)"></text>
					<view class="pop-title tc" style="font-weight: normal;">添加规格</view>
					<view class="pop-title">规格名</view>
					<view class="input-box-old d-c-c"><input placeholder="请输入" class="input-pop" type="text" v-model="specName" /></view>
					<view class="pop-title">规格值</view>
					<view class="input-box-old d-c-c"><input placeholder="请输入" class="input-pop" type="text" v-model="specValue" /></view>
				</view>
				<view class="border-t ww100 d-b-c" style="height: 89rpx;">
					<view class="border-r fb d-c-c flex-1 f28 gray3 hh100" @click="closeSpec(null)">取消</view>
					<view class=" d-c-c flex-1 f28 dominant fb hh100" @click="closeSpec(true)">确认</view>
				</view>
			</view>
		</view>
		<view v-if="isContent">
			<view class="pop-bg"></view>
			<view class="pop-input d-c d-c-c">
				<view class="ww100 flex-1 pop-top">
					<text class="icon iconfont icon-guanbi" @click="closeContent(null)"></text>
					<view class="pop-title">商品详情</view>
					<view class="d-b-c form-item">
						<view class="f30 form-name">详情类型</view>
						<view class="d-e-c flex-1 form-content">
							<view class="d-c-c ml20" @click="form.is_picture = 1">
								<view class="radio-group" :class="{ active: form.is_picture == 1 }"><text class="icon iconfont icon-tijiaochenggong"></text></view>
								<view class="gray9 f30">纯图</view>
							</view>
							<view class="d-c-c ml20" @click="form.is_picture = 0">
								<view class="radio-group" :class="{ active: form.is_picture == 0 }"><text class="icon iconfont icon-tijiaochenggong"></text></view>
								<view class="gray9 f30">图文</view>
							</view>
						</view>
					</view>
					<view class="d-b-c form-item" style="border: none;"><view class="f30 form-name">详情内容</view></view>
					<view class="img-list" v-if="form.is_picture == 1">
						<view class="img-upload" v-for="(item, index) in form.contentImage" :key="index">
							<image :src="item.file_path" mode="aspectFit"></image>
							<view class="close-btn icon iconfont icon-guanbi theme-btn" @click="deleteImg('contentImage', index)"></view>
						</view>
						<view class="img-upload" @click="openUpload('contentImage')">
							<text class="icon iconfont icon-31paishe"></text>
							<text class="f24 gray9">详情图片</text>
						</view>
					</view>
					<view class="f24 gray9 form-item" v-else>图文详细请前往PC端进行编辑</view>
				</view>
				<view class="border-t ww100 d-b-c" style="height: 89rpx;">
					<view class="border-r fb d-c-c flex-1 f28 gray3 hh100" @click="closeContent(null)">取消</view>
					<view class=" d-c-c flex-1 f28 dominant fb hh100" @click="closeContent(true)">确认</view>
				</view>
			</view>
		</view>
		<view v-if="isAdvanced">
			<view class="pop-bg"></view>
			<view class="pop-input d-c d-c-c">
				<view class="ww100 flex-1 pop-top">
					<text class="icon iconfont icon-guanbi" @click="closeAdvanced(null)"></text>
					<view class="pop-title tc" style="font-weight: normal;">高级设置</view>
					<view class="pop-title-h">积分设置</view>
					<view class="d-b-c form-item">
						<view class="f30 form-name">是否开启积分赠送</view>
						<view class="d-e-c flex-1 form-content">
							<switch @change="switchChange($event, 'is_points_gift')" :checked="form.is_points_gift == 1" :color="getThemeColor()" style="transform:scale(0.5)" />
						</view>
					</view>
					<view class="d-b-c form-item">
						<view class="f30 form-name">是否允许使用积分抵扣</view>
						<view class="d-e-c flex-1 form-content">
							<switch
								@change="switchChange($event, 'is_points_discount')"
								:checked="form.is_points_discount == 1"
								:color="getThemeColor()"
								style="transform:scale(0.5)"
							/>
						</view>
					</view>
					<template v-if="form.is_points_discount == 1">
						<view class="d-b-c form-item" style="border: none;">
							<view class="f30 form-name">最大抵扣积分数量</view>
							<view class="d-b-c flex-1 form-content">
								<input class="form-input flex-1" placeholder-class="gray9" placeholder="请输入" type="digit" v-model="form.max_points_discount" />
							</view>
						</view>
						<view class="f24 gray9 form-name">最大抵扣积分数量，-1为使用通用设置</view>
					</template>

					<view class="pop-title-h mt30">分销设置</view>
					<view class="d-b-c form-item">
						<view class="f30 form-name">是否开启分销</view>
						<view class="d-e-c flex-1 form-content">
							<switch @change="switchChange($event, 'is_agent')" :checked="form.is_agent == 1" :color="getThemeColor()" style="transform:scale(0.5)" />
						</view>
					</view>
				</view>
				<view class="border-t ww100 d-b-c" style="height: 89rpx;">
					<view class="border-r fb d-c-c flex-1 f28 gray3 hh100" @click="closeAdvanced(null)">取消</view>
					<view class=" d-c-c flex-1 f28 dominant fb hh100" @click="closeAdvanced(true)">确认</view>
				</view>
			</view>
		</view>
		<view v-if="isMany">
			<view class="pop-bg"></view>
			<view class="pop-input d-c d-c-c">
				<view class="ww100 flex-1 pop-top pb20">
					<text class="icon iconfont icon-guanbi" @click="closeMany(null)"></text>
					<view class="pop-title tc" style="font-weight: normal;margin-bottom: 0;">规格明细</view>
					<view class="pop-spec-list">
						<view
							class="pop-spec-item pr"
							:class="{ active: activeSpec == index }"
							@click="activeSpec = index"
							v-for="(item, index) in form.spec_many.spec_list"
							:key="index"
						>
							{{ getSpecName(item.spec_sku_id) }}
						</view>
					</view>
					<view class="p-20-0 pop-spec-item-detail" :class="{ closebox: activeSpec != index }" v-for="(item, index) in form.spec_many.spec_list" :key="index">
						<view class="d-b-c flex-1 form-content mb20">
							<view class="f24 form-name ">产品编码</view>
							<input class="form-input border-input flex-1" placeholder-class="gray9" placeholder="输入产品编码" type="text" v-model="item.spec_form.product_no" />
						</view>
						<view class="d-b-c flex-1 form-content mb20">
							<view class="f24 form-name ">销售价</view>
							<input class="form-input border-input flex-1" placeholder-class="gray9" placeholder="输入销售价" type="digit" v-model="item.spec_form.product_price" />
						</view>
						<view class="d-b-c flex-1 form-content mb20">
							<view class="f24 form-name ">划线价</view>
							<input class="form-input border-input flex-1" placeholder-class="gray9" placeholder="输入划线价" type="digit" v-model="item.spec_form.line_price" />
						</view>
						<view class="d-b-c flex-1 form-content mb20">
							<view class="f24 form-name ">库存</view>
							<input class="form-input border-input flex-1" placeholder-class="gray9" placeholder="输入库存" type="number" v-model="item.spec_form.stock_num" />
						</view>
						<view class="d-b-c flex-1 form-content">
							<view class="f24 form-name ">重量(kg)</view>
							<input
								class="form-input border-input flex-1"
								placeholder-class="gray9"
								placeholder="输入重量(kg)"
								type="digit"
								v-model="item.spec_form.product_weight"
							/>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 上传头像 -->
		<Upload v-if="isUpload" :num="1" :isVideo="isVideo" @getImgs="getImgsFunc"></Upload>
	</view>
</template>

<script>
import Upload from '@/components/upload/upload.vue';
import rule from './product_rule.js';
export default {
	components: {
		Upload
	},
	data() {
		return {
			product_id: 0,
			activeSpec: 0,
			form: {
				product_name: '' /* 商品名称 */,
				image: [] /* 商品主图 */,
				video: {} /* 商品视频 */,
				video_id: 0 /* 商品视频ID */,
				poster: {} /* 商品视频封面 */,
				poster_id: 0 /* 商品视频封面ID */,
				selling_point: '' /* 商品卖点 */,
				product_status: 10 /* 销售状态 */,
				audit_status: 0 /* 是否审核 */,
				category_id: 0 /* 商品分类 */,
				is_virtual: 0 /* 商品属性 */,
				product_sort: 0 /* 商品排序 */,
				limit_num: 0 /* 限购数量 */,
				virtual_auto: 0 /* 发货类型 */,
				virtual_content: '' /* 虚拟内容 */,
				is_delivery_free: 0 /* 运费 */,
				delivery_id: 0 /*运费模板 */,
				is_points_gift: 0 /*是否开启积分赠送 */,
				is_points_discount: 0 /*是否允许使用积分抵扣 */,
				max_points_discount: '' /*最大抵扣积分数量 */,
				is_agent: 0 /*是否开启分销 */,
				is_picture: 1,
				contentImage: [] /* 详情图片 */,
				deduct_stock_type: 10 /* 库存计算方式 */,
				spec_type: 10 /* 产品规格 */,
				sku: {
					product_no: '' /* 产品编码 */,
					product_price: '' /* 产品价格 */,
					line_price: '' /* 产品划线价 */,
					stock_num: '' /* 库存数量 */,
					product_weight: '' /* 商品重量 */
				},
				spec_many: {
					spec_attr: [],
					spec_list: []
				}
			},
			delivery: [],
			deliveryIndex: -1,
			category: [],
			categoryIndex: -1,
			title: '' /* 文本域弹窗标题 */,
			textType: '' /* 文本域弹窗类型 */,
			showPop: false /* 文本域弹窗 */,
			isContent: false,
			isAdvanced: false,
			isSpec: false,
			specValue: '',
			specName: '',
			popValue: '',
			fileType: '',
			upload_type: '',
			isUpload: '',
			isVideo: false,
			specValuesList: [],
			isMany: false
		};
	},
	onLoad(e) {
		this.product_id = e.product_id || 0;
		this.getData();
	},
	methods: {
		deleteSpec(i) {
			let self = this;
			uni.showModal({
				title: '提示',
				content: '确认要删除吗?',
				success(e) {
					if (e.confirm) {
						self.form.spec_many.spec_attr.splice(i, 1);
					}
				}
			});
		},
		deleteSpecValue(i, ci) {
			let self = this;
			uni.showModal({
				title: '提示',
				content: '确认要删除吗?',
				success(e) {
					if (e.confirm) {
						self.form.spec_many.spec_attr[i].spec_items.splice(ci, 1);
					}
				}
			});
		},
		addApecValue(i) {
			let self = this;
			let spec_value = this.specValuesList[i];
			if (!spec_value) {
				uni.showToast({
					title: '请输入规格值',
					icon: 'none'
				});
				return;
			}
			self._post(
				'supplier.Spec/addSpecValue',
				{
					spec_id: self.form.spec_many.spec_attr[i].group_id,
					spec_value: spec_value
				},
				res => {
					// 记录规格数据
					self.form.spec_many.spec_attr[i].spec_items.push({
						item_id: res.data.spec_value_id,
						spec_value: spec_value
					});
					self.specValuesList[i] = '';
				},
				fail => {
					self.specValuesList[i] = '';
				}
			);
		},
		addSpec() {
			let self = this;
			self.isSpec = true;
		},
		getData() {
			let self = this;
			let url = 'supplier.Product/add';
			let params = {};
			if (self.product_id) {
				url = 'supplier.Product/edit';
				params.product_id = self.product_id;
			}
			self._get(url, params, res => {
				let arr = [];
				let category = [];
				category = res.data.category;
				if (category.length > 0) {
					category.forEach((item, index) => {
						arr.push({ name: item.name, category_id: item.category_id });
						if (item.child && item.child.length > 0) {
							item.child.forEach((citem, cindex) => {
								arr.push({ name: item.name + '—' + citem.name, category_id: citem.category_id });
							});
						}
					});
				}
				self.category = arr;
				self.delivery = res.data.delivery;
				if (self.product_id) {
					Object.assign(self.form, res.data.model);
					self.form.product_status = res.data.model.product_status.value;
					if (res.data.specData) {
						self.$set(self.form, 'spec_many', res.data.specData);
					} else {
						self.$set(self.form, 'spec_many', {
							spec_attr: [],
							spec_list: []
						});
						self.form.sku = res.data.model.sku[0];
					}
					if (self.form.delivery_id == 0) {
						self.$set(self.form, 'is_delivery_free', 0);
					} else {
						self.$set(self.form, 'is_delivery_free', 1);
					}
					//修改时审核状态
					if (res.data.audit_setting.edit_audit == 1 && self.product_id) {
						self.form.audit_status = 0;
					}
					self.category.forEach((item, index) => {
						if (item.category_id == self.form.category_id) {
							self.categoryIndex = index;
							return;
						}
					});
					self.delivery.forEach((item, index) => {
						if (item.delivery_id == self.form.delivery_id) {
							self.deliveryIndex = index;
							return;
						}
					});
					console.log(self.deliveryIndex);
				}
			});
		},
		submitFunc() {
			let self = this;
			let params = self.form;
			if (self.categoryIndex != -1) {
				params.category_id = self.category[self.categoryIndex].category_id;
			} else {
				uni.showToast({
					title: '请选择商品分类',
					icon: 'none'
				});
				return;
			}

			let flag = rule.validate(params);
			if (flag) {
				let url = 'supplier.Product/add';
				let param = { params: JSON.stringify(params) };
				if (self.product_id) {
					url = 'supplier.Product/edit';
					param.product_id = self.product_id;
				}
				self._post(url, param, res => {
					uni.showModal({
						title: '提示',
						content: res.msg,
						success() {
							uni.navigateBack();
						}
					});
				});
			}
			console.log(flag);
		},
		openTextarea(name, title) {
			this.title = title;
			this.textType = name;
			this.popValue = this.form[name];
			this.showPop = true;
		},
		changeType(e, name) {
      this[name + 'Index'] = e.detail.value;
			this.form[name + '_id'] = this[name][this[name + 'Index']].delivery_id;
		},
		closeFunc(e) {
			if (e) {
				this.form[this.textType] = this.popValue;
			}
			this.popValue = '';
			this.title = '';
			this.showPop = false;
		},
		closeSpec(e) {
			let self = this;
			if (e) {
				if (self.specName === '' || self.specValue === '') {
					uni.showToast({
						title: '请填写规则名或规则值',
						icon: 'none'
					});
					return false;
				}
				self._post(
					'supplier.Spec/addSpec',
					{
						spec_name: self.specName,
						spec_value: self.specValue
					},
					res => {
						// 记录规格数据
						self.form.spec_many.spec_attr.push({
							group_id: res.data.spec_id,
							group_name: self.specName,
							spec_items: [
								{
									item_id: res.data.spec_value_id,
									spec_value: self.specValue
								}
							],
							tempValue: '',
							loading: false
						});

						self.specValue = '';
						self.specName = '';
					},
					fail => {
						self.specValue = '';
						self.specName = '';
					}
				);
			}
			this.isSpec = false;
		},
		closeContent(e) {
			if (e) {
			}
			this.isContent = false;
		},
		closeMany(e) {
			this.isMany = false;
		},
		closeAdvanced(e) {
			if (e) {
			}
			this.isAdvanced = false;
		},
		switchChange(e, name) {
			this.form[name] = e.detail.value ? 1 : 0;
		},
		deleteImg(name, n) {
			let self = this;
			uni.showModal({
				title: '提示',
				content: '确定要删除吗?',
				success(e) {
					if (e.confirm) {
						if (n >= 0) {
							let arr = self.form[name];
							arr.splice(n, 1);
						} else {
							self.form[name] = {};
							self.form[name + '_id'] = 0;
						}
					}
				}
			});
		},
		/*获取上传的图片*/
		getImgsFunc(e) {
			let self = this;
			self.isUpload = false;
			if (e && typeof e != 'undefined') {
				if (self.upload_type == 'poster') {
					self.form.poster_id = e[0].file_id;
					self.form[self.upload_type] = e[0];
				} else if (self.upload_type == 'video') {
					self.form.video_id = e[0].file_id;
					self.form[self.upload_type] = e[0];
				} else if (self.upload_type != 'poster') {
					self.form[self.upload_type].push(e[0]);
				} else {
					self.form[self.upload_type] = e[0];
				}
			}
		},
		/*打开上传图片*/
		openUpload(type, fileType) {
			this.upload_type = type;
			this.isVideo = fileType || false;
			this.isUpload = true;
		},
		clearImage(name, n) {
			if (n) {
				this.form[name].splice(n, 1);
			} else {
				this.form[name] = '';
			}
		},

		openMany() {
			this.buildSkulist();
			this.isMany = true;
		},
		/*构建规格组合列表*/
		buildSkulist: function() {
			let self = this;
			let spec_attr = self.form.spec_many.spec_attr;
			let specArr = [];
			for (let i = 0; i < spec_attr.length; i++) {
				specArr.push(spec_attr[i].spec_items);
			}

			let specListTemp = self.calcDescartes(specArr);

			let specList = [];
			for (let i = 0; i < specListTemp.length; i++) {
				let rows = [];
				let specSkuIdAttr = [];
				if (!Array.isArray(specListTemp[i])) {
					rows.push(specListTemp[i]);
				} else {
					rows = specListTemp[i];
				}
				for (let j = 0; j < rows.length; j++) {
					specSkuIdAttr.push(rows[j].item_id);
				}
				specList.push({
					product_sku_id: 0,
					spec_sku_id: specSkuIdAttr.join('_'),
					rows: rows,
					spec_form: {
						product_no: '',
						product_price: '',
						line_price: '',
						stock_num: '',
						product_weight: ''
					}
				});
			}

			// 合并旧sku数据
			if (self.form.spec_many.spec_list.length > 0 && specList.length > 0) {
				for (let i = 0; i < specList.length; i++) {
					let overlap = self.form.spec_many.spec_list.filter(function(val) {
						return val.spec_sku_id === specList[i].spec_sku_id;
					});
					if (overlap.length > 0) {
						specList[i].spec_form = overlap[0].spec_form;
						specList[i].product_sku_id = overlap[0].product_sku_id;
					}
				}
			}

			self.form.spec_many.spec_list = specList;
			console.log(spec_attr);
			console.log(specList);
		},
		/*规格组合*/
		calcDescartes: function(array) {
			if (array.length < 2) return array[0] || [];
			return [].reduce.call(array, function(col, set) {
				let res = [];
				col.forEach(function(c) {
					set.forEach(function(s) {
						let t = [].concat(Array.isArray(c) ? c : [c]);
						t.push(s);
						res.push(t);
					});
				});
				return res;
			});
		},
		getSpecName(id) {
			let self = this;
			let list = id.split('_');
			let name = [];
			let spec_attr = self.form.spec_many.spec_attr;
			list.forEach((item, index) => {
				spec_attr.forEach((aitem, aindex) => {
					aitem.spec_items.forEach((sitem, sindex) => {
						if (item == sitem.item_id) {
							name.push(sitem.spec_value);
						}
					});
				});
			});
			return name.join('/');
		}
	}
};
</script>

<style lang="scss">
.textarea-box {
	width: 100%;
	border: 2rpx solid #eee;
	border-radius: 5rpx;
	font-size: 26rpx;
	font-weight: 500;
	color: #575757;
	padding: 26rpx;
	box-sizing: border-box;
}
.border-input {
	width: 484rpx;
	height: 68rpx;
	background: #ffffff;
	border: 1rpx solid #eeeeee;
	border-radius: 10rpx;
	padding: 0 15rpx;
	box-sizing: border-box;
	font-size: 28rpx;
}
.form-box {
	padding: 0 30rpx;
	background-color: #fff;
}
.pop-spec-item-detail {
	.form-name {
		margin-right: 20rpx;
		width: 120rpx;
	}
	.form-input {
		font-size: 24rpx;
		padding-left: 20rpx;
	}
}
.pop-spec-item-detail.closebox {
	display: none;
}
.form-item {
	padding: 30rpx 0;
	border-bottom: 1rpx solid #eee;
	.form-name {
		margin-right: 20rpx;
	}
	.form-content {
		.form-input {
			text-align: right;
		}

		.icon-jiantou {
			font-size: 28rpx;
			color: #999;
			margin-left: 20rpx;
		}
		.radio-group {
			width: 46rpx;
			height: 46rpx;
			box-sizing: border-box;
			background: #ffffff;
			border: 1rpx solid #eeeeee;
			border-radius: 50%;
			margin-right: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.icon-tijiaochenggong {
				display: none;
				font-size: 26rpx;
				font-weight: bold;
			}
		}
		.active {
			@include background_color('background_color');
			.icon-tijiaochenggong {
				display: block;
				color: #fff;
			}
		}
	}
}
.form-item:last-child {
	border: none;
}
.img-list {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	.img-upload {
		width: 170rpx;
		height: 160rpx;
		flex-shrink: 0;
		border: 2rpx solid #eeeeee;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		position: relative;
		.close-btn.icon {
			width: 38rpx;
			height: 38rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			right: -10rpx;
			top: -10rpx;
			z-index: 1;
			font-size: 24rpx;
			border-radius: 50%;
		}
		video,
		image {
			width: 170rpx;
			height: 160rpx;
		}
		.icon-31paishe,
		.icon-shangchuanshipin {
			font-size: 58rpx;
			color: #333;
			margin-bottom: 12rpx;
		}
	}
}
.pop-bg {
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	margin: auto;
	z-index: 98;
	background-color: rgba(0, 0, 0, 0.65);
}
.icon.icon-guanbi {
	font-size: 32rpx;
	color: #999;
	position: absolute;
	right: 25rpx;
	top: 22rpx;
	z-index: 101;
}
.pop-input {
	width: 665rpx;
	// height: 290rpx;
	background: #ffffff;
	border-radius: 25rpx;
	position: fixed;
	left: 0;
	right: 0;
	top: 20%;
	// bottom: 0;
	margin: auto;
	z-index: 100;
	.form-item {
		padding: 20rpx 0;
	}
}
.pop-top {
	padding: 40rpx 60rpx 0 60rpx;
	box-sizing: border-box;
}
.pop-title {
	font-size: 30rpx;
	color: #333;
	font-weight: bold;
	margin-bottom: 22rpx;
}
.pop-title-h {
	font-size: 30rpx;
	height: 30rpx;
	line-height: 30rpx;
	padding-left: 17rpx;
	color: #333;
	font-weight: bold;
	border-left: 6rpx solid;
	@include border_color('border_color');
}
.input-box-old {
	width: 542rpx;
	height: 64rpx;
	background: #ffffff;
	border: 1rpx solid #dddddd;
	border-radius: 32rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	margin-bottom: 20rpx;
}
.input-box {
	// width: 542rpx;
	// height: 64rpx;
	// background: #ffffff;
	// border: 1rpx solid #dddddd;
	// border-radius: 32rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	margin-bottom: 20rpx;
}
.input-pop {
	box-sizing: border-box;
	border-radius: 32rpx;
	line-height: 1.5;
	font-size: 28rpx;
	color: #333;
	padding: 0 25rpx;
	border: none;
	flex: 1;
	outline-offset: 0;
}
.img-upload::v-deep .uni-video-bar {
	height: 40rpx;
	padding: 0 20rpx;
}
.img-upload::v-deep .uni-video-cover-play-button {
	width: 40rpx;
	height: 40rpx;
}

.img-upload::v-deep .uni-video-cover-duration {
	font-size: 22rpx;
}
.img-upload::v-deep .uni-video-fullscreen {
	padding: 0;
	width: 30rpx;
	height: 30rpx;
}
.img-upload::v-deep .uni-video-control-button {
	padding: 0;
	width: 14rpx;
	height: 14rpx;
}
.img-upload::v-deep .uni-video-current-time {
	display: none;
}
.img-upload::v-deep .uni-video-progress-container {
	display: none;
}
.img-upload::v-deep .uni-video-duration {
	display: none;
}
.btn-normal {
	width: 90%;
	margin: 60rpx auto;
	height: 92rpx;
	line-height: 92rpx;
	border-radius: 50rpx;
	font-size: 28rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.small-btn {
	height: 68rpx;
	line-height: 68rpx;
	border-radius: 34rpx;
	background: #ff5800;
	@include background_color('background_color');
	border-radius: 34rpx;
	font-size: 26rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 33rpx;
}
button.btn-gray.small-btn {
	background: #cccccc !important;
	color: #ffffff !important;
}
.specAttr-groups {
	width: 690rpx;
	padding: 30rpx;
	box-sizing: border-box;
	border: 1px solid;
	@include border_color('border_color');
	border-radius: 15rpx;
	margin-bottom: 20rpx;
	.icon-lajitong {
		font-size: 30rpx;
		color: #666;
		margin-left: 20rpx;
	}
	.spec_values {
		.spec_value {
			padding: 0 25rpx;
			min-width: 146rpx;
			background: #fff2eb;
			border: 1rpx solid;
			@include border_color('border_color');
			border-radius: 10rpx;
			font-size: 24rpx;
			@include font_color('font_color');
			margin-right: 50rpx;
			margin-bottom: 20rpx;
			display: inline-block;
			flex-shrink: 0;
			line-height: 56rpx;
			text-align: center;
			.close-btn.icon {
				width: 38rpx;
				height: 38rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				right: -10rpx;
				top: -10rpx;
				z-index: 1;
				font-size: 24rpx;
				border-radius: 50%;
				background: #000000;
				color: #fff;
			}
		}
	}
}
.pop-spec-list {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: nowrap;
	overflow-x: auto;
	border-bottom: 1rpx solid #eee;
	box-sizing: border-box;
	.pop-spec-item {
		padding: 23rpx 0;
		font-size: 26rpx;
		color: #333;
		margin-right: 40rpx;
		flex-shrink: 0;
	}
	.pop-spec-item.active::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		bottom: 0;
		width: 96%;
		height: 6rpx;
		border-radius: 4rpx;
		@include background_color('background_color');
	}
}
</style>
