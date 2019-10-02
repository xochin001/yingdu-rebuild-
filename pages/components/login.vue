<template>
	<view>
		<view class="cu-modal" :class="modalName=='login'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">微信登录</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="header">
						<img :src="login" alt="">
					</view>
					<view class="contentw">
						<view>申请获取以下权限</view>
						<text>获得你的公开信息（昵称，头像）</text>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green " open-type="getUserInfo"  @getuserinfo="confirm">确定</button>
						<!-- <button class="cu-btn line-green text-green margin-left" @tap="hideModal">取消</button> -->
						
		
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import { mapState } from 'vuex';
	import {host ,get} from '@/pages/utils/request'
	var qcloud = require("wafer2-client-sdk/index.js")
	export default{
		props:{
			modalName: String,
			
		},
		mounted(){
			qcloud.setLoginUrl(host + "/api/login")
		},
		computed:{
		...mapState(['hasLogin' ,'tempLogin'])  //tempLogin 是一个临时登录凭证。可以看商店详情。
		},
		data(){
			return{
				login : '/static/wx_login.png',
			}
		},
		methods:{
			async confirm(e){
				if(e.detail.userInfo){
					wx.showLoading({
					  title: "登录中...", //提示的内容,
					  mask: true, //显示透明蒙层，防止触摸穿透,
					  success: res => {}
					});
					const session = qcloud.Session.get();
					if (session) {
					  // 第二次登录
					  // 或者本地已经有登录态
					  // 可使用本函数更新登录态
					  qcloud.loginWithCode({
					    success: res => {
							this.getmemberuser(res).then( pres =>{
								console.log(pres)
							   if(pres.length >1 )
							   this.$store.commit('memberLogin' , pres)
							})
						 this.$store.commit('vuelogin',res)
						 this.$emit('tologin')
					    },
					    fail: err => {
					      console.error(err)
					    }
					  });
					} else {
					 qcloud.login({
						 success: res => {
							 // console.log(res.openId)
						   wx.hideLoading()
						   this.getmemberuser(res).then( pres =>{
							   console.log(pres)
							   if(pres)
							   this.$store.commit('memberLogin' , pres[0])
						   })
						   this.$store.commit('vuelogin',res)
						   this.$emit('hiddendiag')
						   }
						})
					}		
				}else{
					this.$store.commit('tempLogin')
					this.$emit('hiddendiag') //不同意 就给一个临时访问token 
				}
			},
			hideModal(){
				this.$store.commit('tempLogin')
				this.$emit('hiddendiag')  //不同意 就给一个临时访问token ,退出就失效
				
			},		
			async getmemberuser( res){
				const data = await get('/api/XCX/getmemberuser',{
					openid:res.openId
				})
				return data.data
			}
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
</style>
