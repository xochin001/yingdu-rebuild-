<script>
	import {mapMutations} from 'vuex'
	import {openid , memberlogin, getcloud ,get} from '@/pages/utils/request'
	export default {
		methods:{
			...mapMutations(['getopenid','memberLogin']),
			// async getopenId(data){
			// 	const res = await getcloud('getuserinfo',data)
			// 	return res
			// },
			// async getmemberuser (res){
			// 	const data = await get('/api/XCX/getmemberuser',{
			// 		openid : res.openid
			// 	})
			// 	return data.data
			// }
		},
		onLaunch: function() {
			wx.getSystemInfo({
				success(res){
				}
			})
			// wx.login({
			// 	success: res=>{
			// 		let data = {
			// 			sessionCode : res.code,
			// 			secret : '79c4f3809c5512293ba1a206eaadbedb'
			// 		}
			// 		this.getopenId(data).then ( res=>{
			// 			this.getopenid(res)
			// 			this.getmemberuser(res).then (res1 =>{
			// 				if(res1){
			// 					this.memberLogin(res1)
			// 					console.log(res1)
			// 				}

			// 			})
			// 		})
			// 	}
			// })
			
			 if (memberlogin()){	 //全局开始加载登录会员的状态
				const data = memberlogin()
				this.memberLogin(data)
			}
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import url("./iconfont/iconfont.css")
	/* @import './components/uni-ui/uni.css'; */
</style>
