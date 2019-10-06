<template>
	<view class="users" @click="goTouserDetail()" @showLogin="showLogin">
		<img :src='avator ' alt="" class="users-img">
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		props:{
			avator: String
		},
		data(){
			return{
			}
		},
		computed:{
			...mapState(['tempLogin','ismember'])
		},
		methods:{
			goTouserDetail(){
				if(this.ismember){
					uni.navigateTo({
						url :'/pages/my/my'
					})
					return
				}else{
					this.showLogin()
				}

			},
			showLogin(){
				this.$emit('gtLogin')
			},
		}
	}
</script>

<style lang="scss">
	.users {
		height : 60upx ;
		width : 150upx ;
		position: fixed;
		bottom : 300upx ;
		border-radius: 30upx 0 0 30upx;
		right: 1upx;
		z-index: 99;
		background: #EDE1D9;
		box-shadow: 10upx 10upx 5upx #888888;
	}
	
	.users-img {
		height:60upx ;
		width:60upx;
		margin-left:5upx;
		border-radius: 30upx ;
		//border : 1px solid;
		
	}
</style>
