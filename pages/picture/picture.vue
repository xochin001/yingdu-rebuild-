<template>
	<view class="content bg-white">
		<view class="nav  title-p ">
			<view class="text-black text-bold text-df ">请确认小票</view>
		</view>
		<view class="camera-content ">
			
		</view>
		<view class="description">
			<p class=" d-t padding text-black text-bold text-df ">1.确认小票是否拍照清晰</p>
			<p class="d-p padding text-black text-bold text-df  ">2.请确认相片内容是否包含：店铺名、消费日期、消费金额</p>
		</view>
		
		<view class="confirm margin-tb-xl">
			<button class=" b-t  block lg bg-brown2 text-white">确认提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display:  flex;
		flex-direction: column;
		height: 100vh;
	}
	.title-p {
		display:  flex;
		height: 100upx;
		align-items: center;
		justify-content: center;
	}
	.camera-content {
		width: calc(100% - 118upx ) ; //316pt
		margin-left: 59upx;
		height: 386upx;      //193pt
		border: 1px solid #EDECE8;
	}
	.d-t {
		margin-top: 40upx;
		margin-left: 40upx;
	}
	.d-p {
		margin-left: 40upx;
	}
	.confirm {
	}
	.b-t {
		height: 100upx;
		width: 600upx;
		margin: 0 auto;

	}
</style>
