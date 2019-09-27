<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-brown cur':''" v-for="(item,index) in List" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<view class="cu-list grid col-4 solid-top">
			<view class="cu-item" ><text >名称</text></view>
			<view class="cu-item" ><text>类型</text></view>
			<view class="cu-item" ><text>数量</text></view>
			<view class="cu-item" ><text>状态</text></view>
		</view>
		<view class="cu-list grid col-4 solid-top"  v-for="(item,index) in pointdata" :key="index">
				<view class="cu-item" ><p>{{item.data}}</p></view>
				<view class="cu-item" ><p>{{item.leixing}}</p></view>
				<view class="cu-item" ><p>{{item.number}}</p></view>
				<view class="cu-item" >
					<p :class="item.code =='1'?'text-black':'text-red'">{{item.status}}</p>
					</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				List:['积分历史','积分提交','积分消耗'],
				TabCur :0,
				pointdata:[{
					'data':'2019/6/19',
					'leixing':'提交',
					'number':'1000',
					'status':'成功',
					'code':'1' , //1,成功 2.失败
				},{
					'data':'2019/6/19',
					'leixing':'提交',
					'number':'1000',
					'status':'失败',
					'code':'2' , //1,成功 2.失败
				}]
			};
		},
		methods:{
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style lang="scss">

</style>
