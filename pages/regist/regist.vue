<template>
	<view class="content bg-white">
		<view class="form">
			<form @submit="submit" >
				<view class="cu-form-group">
					<view class="title text-black ">手机号码:</view>
					<input type="number" placeholder="请输入手机号" v-model="phonenumber" name="phonenumber" @blur="checkphonenumber(phonenumber)"></input>
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
					<input placeholder="请输入验证码" v-model="phonevaild" name="phonevaild" @blur="checkvaild(phonevaild)"></input>
					<button class='cu-btn bg-brown2 shadow' v-if="timestart" >{{time}}s后重新发送</button>
					<button class='cu-btn bg-brown2 shadow' v-else @tap="getvaild" >{{timeTitle}}</button>
				</view>
				<view class="cu-form-group solid-bottom">
					<view class="title">请选择生日</view>
					<picker mode="date" name="brithday" :value="brithday" start="1950-09-01" end="2012-09-01" @change="DateChange">
						<view class="picker">
							{{brithday||'请选择'}}
						</view>
					</picker>
				</view>
				<view class="confirm margin-tb-xl">
					<button form-type="submit" class="cu-btn b-t block lg bg-brown2 text-white">注册会员</button>
				</view>
			</form>


		</view>
	</view>
</template>

<script>
	import {get,post} from '@/pages/utils/request'
	import {mapState} from 'vuex'
	import graceChecker from '@/pages/utils/graceChecker.js'

	export default {
		data() {
			return {
				phonenumber : '',
				brithday: '',
				timeTitle: '获取验证码',
				timestart : false ,      // 计数开始的状态flag
				//time: 0,
				//timecount : 60 ,
				interval : '',//定时器
				vaild : '',
				vaildsuccess: false ,
				data : {}
			}
		},
		computed:{
			...mapState(['userInfo' ,'time' ,'hastime'])
		},
		watch: {
			time : {						//对定时器的时间进行深度监视，如果时间为1.（定时器设置快了1秒），将定时器的flag设置为false
				handler ( newValue , oldValue) {
					if(newValue ==1){
						this.timestart = false
					}
				},
				deep : true
			}
		},
		mounted(){
			if(this.hastime){
				this.timestart = true
			}
		},
		methods:{
			submit(e){
				var _this = this
				// 表单验证
				let rule =[
					{name:"phonenumber" ,checkType : "phoneno", checkRule:"",  errorMsg:"请输入正确电话号码"},
					{name:"phonevaild" ,checkType : "notnull", checkRule:"",  errorMsg:"验证码不能为空"},
					{name:"phonevaild" ,checkType : "same", checkRule:this.vaild,  errorMsg:"验证码匹配失败"},
					{name:"brithday" ,checkType : "notsame", checkRule:"请选择",  errorMsg:"请选择生日"},
				];
				let formData = e.detail.value
				let checkRes = graceChecker.check(formData , rule)
				if(checkRes) {
				//验证通过后，准备上传后台数据库存放会员ID。 会员ID使用电话号码作为ID。	
				  this.postmember(formData).then( res  =>{
					  //const pdata =  JSON.stringify(_this.data)
					  if(res.code ==200){
					  	uni.showToast({
					  		title: "已经成功提交！",
					  		icon: "success",
					  	})
						this.$store.commit('memberLogin',_this.data)
						uni.redirectTo({
							url:'/pages/my/my'
						})

					  }
					  
				  })
			return
				}else {
					uni.showToast({
						title:graceChecker.error,
						icon: "none" 
					})
				}
			},
			async getvaild(){
				if(this.vaildsuccess){
					return                   //如果已经验证成功了， 再次点击获取验证码就失效
				}else {
					//否则点击验证码就开始认证。 备注
				const res = await get('/api/getsmsvalids' ,{
					phone : this.phonenumber
				})
				this.vaild = res.code
				this.timestart = true
			 this.interval=	setInterval(()=>{
					this.daojishi()
				},1000) 
				setTimeout(() =>{
					clearInterval(this.interval)
					this.timestart = false			//60s后， 定时器的flag设置为false.
				},60000)
			   }
			},
			DateChange(e) {
				this.brithday = e.detail.value
			},
			daojishi(){
				if(this.$store.getters.time == 1) {
					this.$store.commit('muttime',60)
					return
				}else {
					this.$store.commit('mutcount')
				}
			},
			checkvaild(e){
				if(e == this.vaild){
					uni.showToast({
						title:'验证成功',
						icon:'success',
						duration: 1000
					})
					clearInterval(this.interval)		//失去焦点后，进行验证，成功后调用
					this.$store.commit('muttime',60)	//讲设置还原出厂设置。
					this.timestart = false				//定时器的FLAG手动设置为false
					this.vaildsuccess = true
					return
				}else {
					uni.showToast({
						title:'验证失败',
						icon:'none',
						duration: 1000
					})
					return
				}
			},
			async postmember(users){
				this.data = {
					'openid' : this.userInfo.openId,
					'username': this.userInfo.nickName,
					'phonenumber' : users.phonenumber,
					'brithday' : users.brithday
				}
				const res = await post('/api/XCX/postmemberuser',this.data)
				return res
			},
			checkphonenumber(e){
				let rule = [{name:"phonenumber" ,checkType : "phoneno", checkRule:"",  errorMsg:"请输入正确电话号码"}];
				var p = graceChecker.check( e ,rule)
				if(p){
					
					return
				}else {
					uni.showToast({
						title:graceChecker.error,
						icon: "none" 
					})
					this.vaildsuccess = true  // 既然电话号码没有验证通过，那么就不能点击获取验证码
				}
			}
			
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
