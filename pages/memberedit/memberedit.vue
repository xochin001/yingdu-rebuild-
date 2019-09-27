<template>
	<view class="content bg-white">
		<view class="form">
			<form @submit="submit" >
				<view class="cu-form-group">
					<view class="title text-black ">手机号码:</view>
					<input placeholder="请输入手机号" v-model="phonenumber" name="phonenumber"></input>
					<view class="cu-capsule radius">
						<view class='cu-tag bg-blue '>
							+86
						</view>
						<view class="cu-tag line-blue">
							中国大陆
						</view>
					</view>
				</view>
				<view class="cu-form-group">
					<input placeholder="请输入验证码" v-model="phonevaild" name="phonevaild"></input>
					<button class='cu-btn bg-brown2 shadow' @tap="getvaild" >获取验证码</button>
				</view>
				<view class="cu-form-group solid-bottom">
					<view class="title">请选择生日</view>
					<picker mode="date" :value="brithday" start="1950-09-01" end="2019-09-01" @change="DateChange">
						<view class="picker">
							{{brithday||'请选择'}}
						</view>
					</picker>
				</view>
				<view class="confirm margin-tb-xl">
					<button form-type="submit" class="cu-btn b-t block lg bg-brown2 text-white">注册会员</button>
				</view>
			</form>

			<view class=" margin-tb-xl">
				<button form-type="submit" class="cu-btn b-t block lg bg-brown2 text-white">修改会员</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {get} from '@/pages/utils/request'
	import {mapState} from 'vuex'
	import graceChecker from '@/pages/utils/graceChecker.js'

	export default {
		data() {
			return {
				phonenumber : '',
				brithday: '',
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		methods:{
			submit(e){
				
				console.log(this.userInfo)
				// 表单验证
				let rule =[
					{name:"phonenumber" ,checkType : "phoneno", checkRule:"",  errorMsg:"请输入正确电话号码"},
					{name:"phonevaild" ,checkType : "notnull", checkRule:"",  errorMsg:"验证码不能为空"},
					{name:"brithday" ,checkType : "notsame", checkRule:"请选择",  errorMsg:"请选择生日"},
				];
				let formData = e.detail.value
				let checkRes = graceChecker.check(formData , rule)
				if(checkRes) {
					uni.showToast({
						title: "验证通过！",
						icon: "success",
					})
				}else {
					uni.showToast({
						title:graceChecker.error,
						icon: "none" 
					})
				}
			},
			getvaild(){

			},
			DateChange(e) {
				this.brithday = e.detail.value
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;
	
		
	}
	
	.confirm {
		margin-top: 600upx;
	}
	.b-t {
		height: 100upx;
		width: 600upx;
		margin: 0 auto;
	
	}
</style>
