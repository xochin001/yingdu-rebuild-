<template>
	<view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item " :class="index==TabCur?'text-brown cur':''" v-for="(item,index) in List" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
		</scroll-view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft" >
				<view class="cu-item " :class="index==subTabCur?'text-brown cur':''" v-for="(item,index) in subList" :key="index" @tap="subtabSelect" :data-id="index" >{{item}}</view>

		</scroll-view>
		<view class="cu-list grid col-3 solid-top">
			<view class="cu-item" ><text >名称</text></view>
			<view class="cu-item" ><text>状态</text></view>
			<view class="cu-item" ><text>操作</text></view>
		</view>
		<view class="cu-list grid col-3 solid-top"  v-for="(item,index) in promotiondata" :key="index">
				<view class="cu-item" ><p>{{item.name}}</p></view>
				<view class="cu-item" >
					<p :class="item.code =='1'?'text-green':'' || item.code =='3'?'text-blue':''">{{item.status}}</p>
				</view>
				<view class="cu-item" ><p class="text-brown">{{item.operate}}</p></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				List:['已报名','我喜欢'],
				scrollLeft: 0,
				TabCur :0,
				subList:['进行中','即将开始','已结束'],
				subTabCur:0,
				promotiondata:[{
					'dataid':'1',
					'name':'单人乒乓球比赛',
					'status':'进行中',
					'operate' :'查看',
					'code':'1' , //1,进行中 2.即将开始 3.已结束
				},{
					'dataid':'2',
					'name':'书法比赛',
					'status':'即将开始',
					'operate' :'查看',
					'code':'3' , //1,成功 2.失败
				}]
			}
		},
		methods:{
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			subtabSelect(e){
				this.subTabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style lang="scss">

</style>
