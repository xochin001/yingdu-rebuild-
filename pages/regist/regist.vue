<template>
	<view class="content bg-white">
		<view class="form">
			<form action="">
				<view class="cu-form-group">
					<view class="title text-black ">手机号码:</view>
					<input placeholder="请输入手机号" name="input"></input>
					<view class="cu-capsule radius">
						<view class='cu-tag bg-blue '>
							+86
						</view>
						<view class="cu-tag line-blue">
							中国大陆
						</view>
					</view>
				</view>
				<view class="cu-form-group">
					<input placeholder="请输入验证码" name="input"></input>
					<button class='cu-btn bg-brown2 shadow'>获取验证码</button>
				</view>
				<view class="cu-form-group solid-bottom">
					<input placeholder="请选择生日" name="input"></input>
				</view>
			</form>
			<view class="confirm margin-tb-xl">
				<button form-type="submit" class="cu-btn b-t block lg bg-brown2 text-white">确认提交</button>
			</view>
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
		height: 100vh;
	
		
	}
	
	.confirm {
		margin-top: 600upx;
	}
	.b-t {
		height: 100upx;
		width: 600upx;
		margin: 0 auto;
	
	}
</style>
