import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,	//是否非会员登录//只是注册了非会员
		userInfo: {},		//非会员数据
		tempLogin:false,	//临时访客登录    //这个是访客
		ismember: false , //是否是会员？
		memberdata: {},   //会员数据
		time: 60 , //倒计时数据
		hastime: false , //是否在倒计时
	},
	getters: {
		time : state => state.time 
	},
	mutations: {
		vuelogin(state, provider) {

			state.hasLogin = true;
			
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
		},
		vuelogout(state) {
			state.hasLogin = false;

			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		},
		tempLogin(state){            //临时登录凭证
			state.tempLogin = true
		},
		memberLogin(state, mdata) { 	//已注册会员的登录方法
			state.ismember = true
			state.memberdata = mdata
			uni.setStorage({
				key : 'memberInfo' ,
				data: mdata
			})
		},
		muttime(state, data) {
			state.time = data
			state.hastime = false
		},
		mutcount(state, data) {
			state.time --
			state.hastime = true
		},
		
	},
	actions: {
	
	}
})

export default store
