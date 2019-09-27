<template>
	<view class="content bg-white">
		<scroll-view scroll-x class="bg-brown2  nav flex text-center">
			<view class="cu-item t-t" :class="index==TabCur?'bg-white  text-black ':'text-white '" v-for="(item,index) in List" :key="index" @tap="tabSelect" :data-id="index">
				{{item}}
			</view>
		</scroll-view>
		<form action="">
		<!-- 问题描述框 -->
			<view class="suggest-content ">
				<textarea  name="textarea" class= "s-c" placeholder-class="text-grey" value="" placeholder="请填写10字以上问题描述,以便我们提供更多的帮助" />
			</view>
			<view class="cu-form-group solid-bottom">
				<input placeholder="你的姓名" name="name" v-model="name"></input>
			</view>
			<view class="cu-form-group solid-bottom">
				<input placeholder="联系电话" name="phone" v-model="phone"></input>
			</view>
				<view class="confirm margin-tb-xl">
					<button form-type="submit" class="cu-btn b-t block lg bg-brown2 text-white">确认提交</button>
				</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				List: ['投诉', '建议',],
				TabCur :0 ,
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;
	}
	.t-t {
		width: 150upx;
	}
	.suggest-content {
		width: calc(100% - 118upx ) ; //316pt
		margin-left: 59upx;
		height: 386upx;      //193pt
		margin-top: 30upx;
		border: 1px solid #EDECE8;
	}
	.confirm {
		margin-top: 100upx;
	}
	.b-t {
		height: 100upx;
		width: 600upx;
		margin: 0 auto;
	
	}

</style>
