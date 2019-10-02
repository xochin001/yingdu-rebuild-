import Vue from 'vue'
import App from './App'
import store from './pages/store/index'
Vue.config.productionTip = false

wx.cloud.init({
	env:'indoormap-ybq1p',
	traceUser: true
})

App.mpType = 'app'
Vue.prototype.$store = store;
const app = new Vue({
    ...App
})
app.$mount()
