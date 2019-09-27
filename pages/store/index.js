import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,	//是否非会员登录
		userInfo: {},		//非会员数据
		tempLogin:false,	//临时访客登录
		ismember: false , //是否是会员？
		memberdata: {},   //会员数据
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
		memberLogin(state, mdata) {
			state.ismember = true
			state.memberdata = mdata
			uni.setStorageSync({
				key : 'memberInfo' ,
				data: mdata
			})
		}
		
	},
	actions: {
	
	}
})

export default store
