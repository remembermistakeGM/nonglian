var rule = {
	// 
	validate(params) {
		let flag = false;
		let values = [{
				name: '请输入商品名称',
				value: 'product_name',
				callback: function(e) {
					return e != '';
				}
			},
			{
				name: '请上传商品主图',
				value: 'image',
				callback: function(e) {
					return e.length > 0;
				}
			},
			{
				name: '请上传商品视频封面',
				value: 'poster_id',
				callback: function(e) {
					if (params.video_id > 0) {
						return e != '';
					} else {
						return true
					}

				}
			},
			{
				name: '请选择商品分类',
				value: 'category_id',
				callback: function(e) {
					return e != '';
				}
			},
			{
				name: '请输入限购数量',
				value: 'limit_num',
				callback: function(e) {
					return e !== '';
				}
			},
			{
				name: '请输入商品排序',
				value: 'product_sort',
				callback: function(e) {
					return e >= 0;
				}
			},
			{
				name: '请输入虚拟内容',
				value: 'virtual_content',
				callback: function(e) {
					if (params.is_virtual == 1) {
						return e != '';
					} else {
						return true
					}
				}
			},
			{
				name: '请输入最大抵扣积分数量',
				value: 'max_points_discount',
				callback: function(e) {
					if (params.is_points_discount == 1) {
						return e >= 0;
					} else {
						return true
					}
				}
			},
			{
				name: '请选择运费模板',
				value: 'delivery_id',
				callback: function(e) {
					if (params.is_virtual == 0 && params.is_delivery_free == 1) {
						return e > 0;
					} else {
						return true
					}
				}
			},
			{
				name: '请输入产品编码',
				value: 'sku.product_no',
				callback: function(e) {
					if (params.spec_type == 10) {
						return params.sku.product_no != '';
					} else {
						return true
					}
				}
			},
			{
				name: '请输入产品价格',
				value: 'product_price',
				callback: function(e) {
					if (params.spec_type == 10) {
						return params.product_price != '';
					} else {
						return true
					}
				}
			},
			{
				name: '请输入产品划线价',
				value: 'line_price',
				callback: function(e) {
					if (params.spec_type == 10) {
						return params.line_price != '';
					} else {
						return true
					}
				}
			},
			{
				name: '请输入库存数量',
				value: 'stock_num',
				callback: function(e) {
					if (params.spec_type == 10) {
						return params.stock_num != '';
					} else {
						return true
					}
				}
			},
			{
				name: '请输入商品重量',
				value: 'product_weight',
				callback: function(e) {
					if (params.spec_type == 10) {
						return params.product_weight != '';
					} else {
						return true
					}
				}
			}
		];
		values.forEach((item, index) => {
			if (!flag && !item.callback(params[item.value])) {
				flag = item.name;
				return;
			}
		});
		if (flag) {
			uni.showToast({
				title: flag,
				duration: 1000,
				icon: 'none'
			});
			return false;
		}
		return true
	},
}
export default rule;
