<template>
	<view class="">
		<scroll-view scroll-y  class="container">
				<view class="title cu-list menu">
					<p class="title-p">
						{{benefit.benefit_name}}
					</p>
					<img  :src='benefit.label' class="label">
				</view>
				<img class="desc-img" :src='benefit.benefit_big_img' alt="">
				<view class="  cu-item">
					<view class="content padding-tb-sm">
						<view>
								<text class=" text-black margin-right-xs"></text>条件信息：</view>
							<view class="text-gray text-sm">
								<text class=" margin-right-xs"></text>1.{{benefit.benefit_condition}}</view>
						</view>
					</view>
					<view class="  cu-item">
						<view class="content padding-tb-sm">
							<view>
									<text class=" text-black margin-right-xs"></text>有效期：</view>
								<view class="text-gray text-sm">
									<text class=" margin-right-xs"></text>{{benefit.benefit_starttime}}至{{benefit.benefit_endtime}}</view>
							</view>
						</view>
					<view class="  cu-item">
						<view class="content padding-tb-sm">
							<view>
									<text class=" text-black margin-right-xs"></text>使用时段：</view>
								<view class="text-gray text-sm">
									<text class=" margin-right-xs"></text>{{benefit.service_range}}</view>
							</view>
						</view>
					<view class="  cu-item">
						<view class="content padding-tb-sm">
							<view>
									<text class=" text-black margin-right-xs"></text>使用须知：</view>
								<view class="text-gray text-sm">
									<text class=" margin-right-xs"></text>{{benefit.service_infomation}}</view>
							</view>
						</view>
						<view class="  cu-item">
							<view class="content padding-tb-sm">
								<view>
										<text class=" text-black margin-right-xs"></text>服务地址：</view>
									<view class="text-gray text-sm">
										<text class=" margin-right-xs"></text>{{benefit.service_address}}</view>
								</view>
							</view>
						<view class="  cu-item">
							<view class="content padding-tb-sm">
								<view>
										<text class=" text-black margin-right-xs"></text>服务电话：</view>
									<view class="text-gray text-sm">
										<text class=" margin-right-xs"></text>{{benefit.service_phone}}</view>
								</view>
							</view>
						<view class="p"></view>
	
		</scroll-view>
		<view class="bottombar">
			<view class="point">{{benefit.benefit_point}}</view>
			<p class="p1">积分</p>
			<view class="buy">购买</view>
		</view>
		<my :avator="avatar" />
	</view>
</template>

<script>
	import {get} from '@/pages/utils/request'
	import {mapState} from 'vuex'
	import my from '@/pages/detail/my'
	export default {
		components:{
			my,
		},
		data() {
			return {
				benefit: {},
				avatar:'/static/user.png',
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		onLoad() {
			this.id = this.$root.$mp.query.id
			this.getBenefitByid()
			this.avatar = this.userInfo.avatarUrl
		},
		/*
		*
		* 获取主页传参对应的优惠券详细信息
		*/ 
		methods: {
			async getBenefitByid() {
				let _this = this 
				const res = await get('/api/XCX/benefitbyid',{
					benefit_id : _this.id
				})
				_this.benefit = res.data[0]
			}

		},
	}
</script>

<style lang="scss">
	page {
		background:#fff;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 95% ;
		margin: 10upx auto ;
	}
	
	.title {
		height: 60upx;
		width: 100%;
		margin-top:  20upx;
	}
	
	.title-p {
		display: inline-block;
		width: 200upx;
		height: 60upx;
		margin-left : 20upx;
		font-size:$uni-font-size-base ;
		font-weight:900 ;
		
	}
	
	.label {
		display: inline-block;
		width: 110upx;
		height: 40upx;
		margin-right: 20upx;
		float: right;
	}
	
	.desc-img {
		width: 100% ;
		height: 300upx;
		margin-top: 20upx;
		border-radius: 10upx;
		border :1px solid #e7ebed;
	}
	.p {
		height: 100upx ;
	}

	.bottombar {
	  height: 100upx;
	  position:fixed;
	  width: 100% ;
	  bottom: 0upx;
	  display: flex;

	}
	
	  .point {
	  	width:200upx;
		position: absolute;
		left: 30upx;
		height: 100%;
		color: red;
		text-align: center;
		line-height: 80upx;
		
	  }
	  
	  .p1 {
		  @extend  .point ;
		  left: 110upx;
		  font-size:$uni-font-size-base;
		  color: black ;
	  }
	  
	  
	  
	  .buy {
	    position: absolute;
		display: flex;
		justify-content: center;
	    right: 0;
	    height: 100%;
	  	width: 300upx;
	  	background: $uni-bg-main-color;
		color: #fff;
	  	font-size:$uni-font-size-base;
		text-align: center;
		//line-height: 80upx;
		align-items: center;
	  }

</style>
