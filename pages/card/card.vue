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
		<view class=" cu-list grid col-4 solid-top"  v-for="(item,index) in pointdata" :key="index">
				<view class="cu-item" ><p>{{item.name}}</p></view>
				<view class="cu-item" ><p>{{item.leixing}}</p></view>
				<view class="cu-item" ><p>{{item.number}}</p></view>
				<view class="cu-item" >
					<p  :class="item.code =='1'?'text-green': ''||item.code =='3'?'text-red':''">{{item.status}}</p>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				List:['全部卡券','未使用','已使用','已过期','已赠送'],
				TabCur :0,
				pointdata:[{
					'name':'双人套餐',
					'leixing':'代金券',
					'number':'1',
					'status':'未使用',
					'code':'1' //1没使用 2已使用 3已过期 4 ？？？
				},{
					'name':'瑶瑶冰',
					'leixing':'实物券',
					'number':'10',
					'status':'已过期',
					'code':'3' //1没使用 2已使用 3已过期 4 ？？？
				}]
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
		}
	},
}
</script>

<style>
</style>
