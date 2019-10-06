<template>
	<view>
		<view class="cu-modal" :class="modalName=='Image'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">英度云商</view>
					<view class="cu-bar justify-end text-black">
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close "></text>
						</view>
					</view>
				</view>
				<view class="padding-xl">
					<view class="header center">
						<view class="confirm ">
							<button  class="cu-btn b-t block lg bg-brown2 text-white" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信快捷注册</button>
							</view>
						<view class="b-b margin-tb-sm paddin-sm"><p class="text-grey text-sm text-center ">-其他登录方式-</p></view>
						<view class="confirm ">
							<button  class="cu-btn b-t block  line-orange lg   text-brown" @tap="gtphoneregist">手机号登录</button>
						</view>
						<view class="margin-sm ">
							<text class="text-brown text-sm">登录注意事项</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import { mapState } from 'vuex';
	import {get , post, getcloud } from '@/pages/utils/request'
	export default{
		props:{
			modalName: String,
			
		},
		mounted(){
			wx.login({
				success: res=>{
					let data = {
						sessionCode : res.code,
						secret : '79c4f3809c5512293ba1a206eaadbedb'
					}
					this.getopenId(data).then ( res=>{
						this.$store.commit('getopenid',res)
						this.getmemberuser(res).then ( res1 =>{
							if(res1){
								this.$store.commit('memberLogin',res1)
								this.$emit('hiddendiag')
							}
						})
					})
				}
			})
		},
		computed:{
			...mapState(['openids'])
		},
		data(){
			return{
				pdata : {} , //存储注册手机的基本信息
			}
		},
		methods:{
			async getPhoneNumber(e){
				var _this = this
				uni.checkSession({
					success : res => {
						console.log('session有效')

					},
					fail: res =>{
						console.log('session无效诶')
					}
				})

				let data = {
					iv : e.detail.iv,
					encryptedData :  e.detail.encryptedData,
					openid: this.openids.openid,
					session_key : this.openids.session_key
				}
				const phonedata = await get('/api/XCX/getphonenumber',data)

				this.postmember(phonedata.data.phoneNumber).then(res =>{
					//console.log(res)
					if(res.code ==200){
					setTimeout(
						function(){
							uni.showToast({
								title: "已成功提交！",
								icon: "success",
							})
						},500)
					this.getmemberuser(this.opendis).then (res1=>{
						this.$store.commit('memberLogin',res1)
						uni.redirectTo({
							url:'/pages/index/index'
							})
				    	})
					}
				})
			},
			async getopenId(data){				//在mount生命周期给触发调取openid的函数
				const res = await getcloud('getuserinfo',data)
				return res
			},
		
			hideModal(){
				this.$store.commit('tempLogin')
				this.$emit('hiddendiag')  //不同意 就给一个临时访问token ,退出就失效
				
			},		
			async postmember(phones){
				this.pdata = {
					'openid' : this.openids.openid,
					'phonenumber' : phones ,
					 'brithday' : '1970-1-1'
				}
				const res = await post('/api/XCX/postmemberuser',this.pdata)
				console.log(res)
				return res
			},	
			async getmemberuser (res){
				const data = await get('/api/XCX/getmemberuser',{
					openid : res.openid
				})
				return data.data
			},
			gtphoneregist (){
				uni.navigateTo({
					url : '/pages/regist/regist'
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.bg {
		background: $bg-color-main ;
	}
	
	img {
		width : 90upx;
		height: 90upx;
	}
	
	.content {
		
	}
	.confirm {
		margin-top: 10upx;
	}
</style>
