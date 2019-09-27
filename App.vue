<script>
	import {mapMutations} from 'vuex'
	import {login , memberlogin} from'@/pages/utils/request'
	export default {
		methods:{
			...mapMutations(['vuelogin','memberLogin'])
		},
		onLaunch: function() {
			console.log('App Launch')
			if(login()){
				const res = login()
				this.vuelogin(res)
			}else if (memberlogin()){
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
