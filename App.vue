<script>
	import {mapMutations} from 'vuex'
	import {login , memberlogin} from'@/pages/utils/request'
	export default {
		methods:{
			...mapMutations(['vuelogin','memberLogin']),
			getopenid(){
				wx.cloud.callFunction({
					name:'getuserinfo',
					data:{},
					success : res =>{
						console.log('没获取到？')
						console.log(res)
					}
				})
			}
		},
		onLaunch: function() {
			wx.getSystemInfo({
				success(res){
					console.log(res.version)
				}
			})
			this.getopenid()
			if(login()){
				const res = login()			//全局加载非登录会员的状态
				this.vuelogin(res)
			} if (memberlogin()){	 //全局开始加载登录会员的状态
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
