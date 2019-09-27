<template>
	<view class="contain">
		<scroll-view  scroll-y class="show" @scroll="asideScroll" :scroll-top="tabScrollTop" scroll-with-animation>
			<view class="benefit-item radius shadow-warp bg-white"  @click="goToDetail(item.benefit_id)" v-for="(item , index) in allbenefits " :key="index">
				<img class="benefit-img " :src = 'item.benefit_small_img'>
					<view class="benefit-title">
						<img  class="mark" :src = 'item.label'>
						<p class="title text-sm">{{item.benefit_name}}</p>
					</view>
				<p class="demo text-brown text-sm">{{item.benefit_point}}积分</p>
			</view>			
		</scroll-view>
	</view>
</template>

<script>
	import {get} from '@/pages/utils/request.js'
	export default {
		
		data() {
			return {
				 allbenefits : {}
			}
		},
		mounted() {
			 this.get_AllBenefits()
		},
		methods: {
			asideScroll(e){
				
			},
			goToDetail(id){
				uni.navigateTo({
					url :'../benefits/benefits?id=' +id
				})
			},
			async get_AllBenefits(){
				let _this = this 
				const res = await get('/api/XCX/benefitdetail')
				
				_this.allbenefits = res.data
			}

		}
	}
</script>

<style lang="scss" scoped>
	page ,
	.contain {
	}
	
	.show {
		display: flex;
		flex-direction: column;
	}
	
	.benefit-item {
		width : 320upx;
		height: 320upx;
		float: left;
		margin-top:20upx;
		margin-left: 30upx;
		border-radius: 10upx;
	}
	
	.benefit-img {
		width: 100% ;
		height: 220upx;
	}
	
	.benefit-title {
		
	}
	
	.mark {
		width: 145upx;
		height: 59upx;
		padding-bottom: 5upx;
		padding-top:5upx;
	}
	
	.title {
		width: 150upx;
		height: 50upx;
		float: right;
		text-align: center;
	}
	
	
	.demo {
		@extend  .title ;
		margin-top: -10upx;
		
	}
	
</style>
