<template>
	<view class="container">
		<!-- 画布来制作头像和会员卡等 -->
		<canvas class ="userinfo" canvas-id="userinfo"></canvas>
		<view  class="Camera" 			
			:style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
			>
			<img  :src='camera' class="camera-img" @click="showCamera">
		</view>
		
		<!-- 	会员登录功能框 -->
			<view class="function-m" v-if ="nomemeber" >
				<view class="memeber" v-for="(item, i) in memeberList" :key="i" @click="showPoint(item)">
					<p class="m-t">{{item.title}}</p>
					<p class="m-c">{{item.data}}</p>
				</view>
				<view class="btn-cancel margin-tb-xl">
					<button class="cu-btn b-t block lg bg-brown2 text-white" @click="backtitle">返回</button>
				</view>
			</view>
		
<!-- 	登录功能框 -->		
	<view class="function" v-else>
		<view class="functionicon" v-for="item in listData" :key="item.id" @click="showFunction(item)">
				<view v-if="item.id ==5 && ismember">           <!-- 如果是会员了，注册会员的按钮就变成设置按钮 -->
					<span class="iconfont iconshezhi" ></span>
						<p class="title">设置</p>
				</view>
				<view v-else>
					<span class="iconfont" :class="item.icon" ></span>
						<p class="title">{{item.title}}</p>
				</view>
		</view>
	</view>

<!-- 	摄像头-模态层弹框 -->
	<view 
	class="popup"
	:class="specClass"
	@touchmove.stop.prevent ="stopPrevent"
	@click="showCamera"
	>
<!-- 遮罩层 -->	
		<view class="mask"></view>
		<view class="layer attr-content" @click.stop="stopPrevent">
		<view class="carmera-choose">
			<button class="btn" @tap="gotopicture">
				拍摄
			</button>
			<button class="btn">
				从手机相册选择
			</button>
			<button class="btn" @click="showCamera">取消</button>
		</view>
	 </view>
   </view>
</view>
</template>

<script>
	import {get} from '@/pages/utils/request'
	import {mapState} from 'vuex'
	let startY = 0, moveY = 0, pageAtTop = true;
	export default {
		onLoad(){
			this.avator = this.userInfo.avatarUrl
		},
		mounted() {
			this.getDrawUserInfo()
		},
		computed:{
			...mapState(['userInfo','hasLogin','ismember' ])
		},
		data() {
			return {
				avator :'/static/user1.png',
				userNum:'1388  0546  901',
				camera :'/static/camera.png',
				specClass: 'none',
				listData: [{
					title: "会员积分",
					icon:"iconhuiyuanjifen1",
					url:"",
					id: 1 ,
					},{
					title: "我的卡券",
					icon:"iconwodeqiaquan",
					url:"/pages/card/card",
					id:2 ,
					},{
					title: "我的活动",
					icon:"iconwodehuodong",
					url:"/pages/promotion/promotion",
					id:3 ,
					},{
					title: "投诉建议",
					icon:"icontousujianyi-copy",
					url:"/pages/suggest/suggest",	
					id:4 ,
					},{
					title: "注册会员",
					icon:"iconshezhi",
					url:"/pages/regist/regist",
					id:5,
					}],
				memeberList :[{
					title: "积分" ,
					data: 0,
					url:"/pages/point/point"
					},{
					title: "等级",
					data: "初级会员" ,
					url:"/pages/point/point"
					},{
					title: "优惠券",
					data: "查看" ,
					url:"/pages/card/card"
				}],
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				moveDis: 0 ,
				nomemeber: false,
				showLogin: "",
				
			}
		},
		methods: {

			/*
			* 绘制图形
			*/
			 getDrawUserInfo () {
				 const ctx = uni.createCanvasContext('userinfo' , this)
				 ctx.save()
				 ctx.beginPath() //开始创建一个路径
				 ctx.arc(45, 45, 27, 0, 2 * Math.PI, false) //画一个圆形裁剪区域
				 ctx.clip() //裁剪
				 ctx.drawImage(this.avator , 15,15,65,65) //绘制图片
				 ctx.restore() //恢复之前保存的绘图上下文
				 ctx.draw()
				 ctx.setFillStyle('rgb(210,210,210)')
				 ctx.setFontSize(16)
				 ctx.fillText('NO.',5 ,160)
				 ctx.setFontSize(12)
				 ctx.fillText(this.userNum ,35 ,160)
				 ctx.draw(true)
			 },

			 coverTouchstart(e){
				 if(pageAtTop === false){
					 return
				 }
				 this.coverTransition = 'transform .1s linear'
				 startY = e.touches[0].clientY
			 },
			coverTouchmove(e) {
				moveY = e.touches[0].clientY
				let moveDistance = moveY - startY
				this.moveDis = moveDistance
				if(moveDistance < 0){
					this.moving = false
					return
				}
				this.moving = true
				if(moveDistance >= 30 && moveDistance < 50){
					moveDistance = 30
				}
				if(moveDistance > 0 && moveDistance <= 40){
					this.coverTransform = `translateY(${moveDistance}px)`
				}
			},
			coverTouchend(){
				if(this.moving === false){
					return
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				 // setTimeout(()=>{
					//  this.coverTransform = 'translateY(0px)'
				 // },3000)
			},
			showCamera(){
				if(this.moveDis >=15){
					console.log(this.moveDis)
				if(this.specClass === 'show'){
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
					this.coverTransform = 'translateY(0px)'
					this.moveDis = 0
				}else if(this.specClass === 'none'){
					this.specClass = 'show';
					
					}
				}
			},
			stopPrevent(){},
			showFunction(item){
				if(item.id ===5) {
					if(this.ismember){
						uni.navigateTo({
							url: '/pages/memberedit/memberedit'
						})
						return
					}
					else if(this.hasLogin) {
						uni.showToast({
							title: '需要先注册会员',
							icon:'none'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/regist/regist'
							})
						}, 1000)
						return
					}
				}
				if(item.id === 1) {				//会员积分的页面单独提取逻辑实现。
					if(this.ismember){
						this.nomemeber = true
						this.getmemberuser().then( res =>{
							this.memeberList[0].data = res.data[0].point
							this.memeberList[1].data = res.level
						})
						return
					}
					else if(this.hasLogin) {
						uni.showToast({
							title: '需要先注册会员',
							icon:'none'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/regist/regist'
							})
						}, 1000)
						return
					}
				}
				else{
					if(this.ismember) {			//如果是会员登录。直接跳转
						uni.navigateTo({
							url: item.url
						})
						return
					}
					else if( this.hasLogin) {	//如果是非会员，需要跳转到会员注册页面
						uni.showToast({
							title: '需要先注册会员',
							icon:'none'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/regist/regist'
							})
						}, 1000)
						return
					}

				}
			 },
			 //关闭会员积分的页面
			 backtitle(){
				 this.nomemeber = false 
			 },
			 //跳转到拍摄小票的页面
			 gotopicture(){
				 console.log('Pp')
				 uni.navigateTo({
				 	url: '/pages/picture/picture'
				 })
			 },
			 showPoint(item ){
				 if(this.ismember){
				 	uni.navigateTo({
				 		url: item.url
				 	})
				 	return
				 }
				 else if(this.hasLogin) {
				 	uni.showToast({
				 		title: '需要先注册会员',
				 		icon:'none'
				 	})
				 	setTimeout(() => {
				 		uni.navigateTo({
				 			url: '/pages/regist/regist'
				 		})
				 	}, 1000)
				 	return
				 }
			 },
			 hiddendiag(){
			 	this.showLogin = ""
				uni.redirectTo({
					url:'/pages/my/my'
				})
			 },
			async getmemberuser( ){
				const data = await get('/api/XCX/getmemberuser',{
					openid: this.userInfo.openId
				})
				return data
			}
			 
		},
	}
</script>

<style lang="scss">
	
	page ,
	.container {
		display: flex;
		flex-direction: column;
		width:90%;
		margin: 0 auto;
		
	}
	
	.userinfo {
		position: relative;
		width :100% ;
		margin-top: 10upx;
		border-radius: 10upx;
		height: 350upx;
		//border: 1px solid;
		background: #D05E62;
		z-index: 2;
	}
	
	.Camera {
		height: 100upx;
		width:100% ;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: -50upx;
		z-index: 1;
	}
	// .active{
	// 	margin-top: 0upx;
	// }
	
	.camera-img {
		height: 100upx;
		width: 100upx;
		
	}
	
	.function {
		position: absolute;
		margin-top: 450upx;
		height: 250upx;
		width :100% ;
		display: flex;
		flex-wrap: wrap;
		//border: 1px solid;
		//justify-content: center;
		
	}
	
	.functionicon {
		margin:0upx 10upx 40upx 70upx;
		width: 120upx;
		height: 140upx;
		
	}
	
	.title {
		font-size: $uni-font-size-sm;
		//margin-left: -5upx;
	}
	
	
	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		
		&.show {
			display: block;
			
			.mask {
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			border: 1px solid ;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 20vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
			.btn{
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				//background: $bg-color-submain;
				font-size: $uni-font-size-base + 2upx;
				//color: #fff;
				margin: 20upx auto 10upx;
			}
		}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
	}
	
	.function-m {
		@extend  .function ;
		height: 150upx;
	}
	
	.memeber {
		width : 180upx ;
		border-right: 1px solid $bg-color-main;
		display: block;
		text-align:  center;
		margin: 0upx 10upx 10upx 10upx;
	}
	
	.m-t {
		font-size: $uni-font-size-lg + 2upx;
		
	}
	
	.m-c {
		font-size: $uni-font-size-lg +2upx ;
		color:$title-color-active ;
		line-height: 60upx;
	}
	
	.btn-cancel {

		position: fixed;
		bottom: 1upx;
		display: block;
		text-align:  center;
	}
	.b-t {
		height: 100upx;
		width: 600upx;
		margin: 0 auto;
	
	}


</style>
