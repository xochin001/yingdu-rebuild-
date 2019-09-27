<template>
	<view class="container">
		<view >
			<img :src='shopsdetail.big_img' alt="" class="shop-img">
		</view>	
		<view class="shop-title">
			<img :src="shopsdetail.label" class="label">
			<view class="from">
				<text class="shopfrom">{{shopsdetail.shop_title}}</text>
				<text class="floor text-brown">{{shopsdetail.floor}}</text>
					<view class="subtitle">
						<text class="title-p">电话：</text >
						<text class="phone text-brown text-sm">{{shopsdetail.phone}}</text >
						<text class="title-p">营业时间: </text>
						<text class="times  text-brown text-sm">{{shopsdetail.vail_time}}</text >
					</view>
			</view>
	</view>
	<view class="shop-content">
			<p class="content-title">店铺介绍：</p>
		<p class="content  text-brown ">
			{{shopsdetail.shop_desc}}
		</p>
	</view>
		<my :avator="avatar" />
	</view>
</template>

<script>
	import my from '@/pages/detail/my'
	import {get} from '@/pages/utils/request'
	import {mapState} from 'vuex'
	export default {
		components:{
			my
		},
		computed:{
			...mapState(['userInfo'])
		},
		data() {
			return {
				shopsdetail : {} ,
				avatar : '/static/user.png'
			}
		},
		onLoad() {
				this.id = this.$root.$mp.query.id
				this.get_shopsdetail()
				this.avatar = this.userInfo.avatarUrl
		},
		/*
		*
		* 获取主页传参对应的店铺详细信息
		*/ 
		methods: {
				async get_shopsdetail (){
					let _this = this 
					const res = await get('/api/XCX/shopbyid',{
						shop_id :_this.id
					})
					_this.shopsdetail = res.data[0] 
				}
			},
	}
</script>

<style lang="scss">
	page ,
	.container {
		display: flex;
		flex-direction: column;
	}
	
	.shop-img {
		width:100%;
		height: 350upx;
	}
	
	.shop-title {
		height: 120upx;
		width: 100%;
		display: flex;
		flex-direction: row;
	}
	
	.label {
		margin-top:20upx;
		width: 150upx;
		height: 40upx;
		// padding-top:10upx;
		// padding-bottom: 10upx;
	}
	
	.from {
		width: 100%;
		height: 100%;
		flex-direction: row;
		padding-left: 20upx;
		padding-right: 20upx;

	}
	
	.shopfrom {
		width :100%;
		height: 40%;
		font-size: $uni-font-size-lg;
		font-weight: 1000;
	}
	
	.floor {
		position: absolute;
		width: 150upx;
		height: 50upx;
		font-size: $uni-font-size-sm;
		line-height: 50upx;
		text-align: center;
		right : 10upx;
		
	}
	
	.subtitle {
		@extend  .shopfrom ;
		height: 60%;
		margin-top: 10upx;
	}
	
	.title-p {
		font-size: 28upx;
	}
	
	.phone {
		//font-size: $uni-font-size-sm;
		margin-right: 15upx;
		width: 200upx;
	}
	
	.times {
		@extend .phone ;
	}
	
	.shop-content {
		@extend  .shop-title ;
		flex-direction: column;
	}
	
	.content-title {
		font-size: $uni-font-size-lg;
		margin-bottom: 20upx;
	}
	
	.content {
		font-size: $uni-font-size-base;
		padding-left: 20upx;
	}


</style>
