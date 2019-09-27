<template>
	<view>
		<goto-login   :modalName="showLogin"  @hiddendiag="hiddendiag"   /> 
		<scroll-view scroll-x class="bg-white nav " scroll-with-animation :scroll-left="scrollLeft">
			<view  >
				<view class="cu-item flex-sub" :class="tabIndex==index?'text-brown cur': ''" v-for="(tab,index) in tabBars" :key="tab.id" :data-current="index" @tap="ontabtap">
						{{tab.name}}
				</view>
				<uni-search class="cu-item  search"   :iconSrc="iconSrc" :inputAttr="inputAttr">
				</uni-search>
			</view>							
		</scroll-view>
	<view class="content">
			<benefit v-if='tabIndex==0'></benefit>
			<category v-if='tabIndex==1'></category>
			<floor v-if='tabIndex==2'></floor>
	</view>
	<my :avator= "avatar"/>
</view>
</template>

<script>
	import gotoLogin from '@/pages/components/login'
	import benefit from '@/pages/detail/benefit'
	import  category from '@/pages/detail/category'
	import  floor  from '@/pages/detail/floor'
	import my from '@/pages/detail/my'
	import uniSearch from '@/components/lee-search/lee-search'
	import {mapState} from 'vuex'
	export default {
		components: {
			benefit,
			category,
			floor,
			uniSearch,
			my,
			gotoLogin
		},
		data() {
			return {
				tabBars: [{
				    name: '商户优惠',
				    id: 'youhui'
				}, {
				    name: '商家分类',
				    id: 'fenlei'
				}, {
				    name: '楼层商家',
				    id: 'shangjia'
				}],
				inputAttr : {
					backgroundColor: '#ffffff',
					placeholderText: ' '
				},
				tabIndex: 0,
				iconSrc : {
					logo: '/static/lee-search/icon_search.png'
				},
				avatar:'/static/user.png',
				showLogin :"login",
			}	
		},
		mounted() {
			if(this.hasLogin) {
				this.showLogin = ""
				this.avatar = this.userInfo.avatarUrl
			}
		},
		computed:{
			...mapState(['userInfo','tmpLogin','hasLogin'])
		},
		methods: {
			//...mapMutations([])
			ontabtap(e) {
			    let index = e.target.dataset.current || e.currentTarget.dataset.current
			     this.tabIndex = index
			     this.scrollInto = this.tabBars[index].id
		},
		hiddendiag(){
			this.showLogin = ""
		},
		
	},
}
</script>

<style lang="scss"  scoped>
	page {
		display: flex;
		flex-direction: column;
	}
	.content {
		background: #fff;
	}


	.search {
		width: 170upx;
		
	}
	
</style>
