<template>
	<div class="mainPage">
		<div class="leftContent">
			<el-menu
				:default-active="$route.path"
				class="el-menu-vertical-demo"
				
				background-color="#545c64"
				text-color="#fff"
				router
				active-text-color="#ffd04b">
				<el-menu-item index="/tableAndPagination">
					<i class="el-icon-location"></i>
					<span slot="title">table封装</span>
				</el-menu-item>
				<el-submenu index="/canvas">
					<template slot="title">
					<i class="el-icon-menu"></i>
					<span>canvas</span>
					</template>
					<el-menu-item index="/canvas/canvas_type1">canvas_1</el-menu-item>
					<el-menu-item index="/canvas/canvas_type2">canvas_2</el-menu-item>
					<el-menu-item index="/canvas/canvas_type3">canvas_3</el-menu-item>
					
				</el-submenu>
				<el-menu-item index="3">
					<i class="el-icon-document"></i>
					<span slot="title">导航三</span>
				</el-menu-item>
				<el-menu-item index="4">
					<i class="el-icon-setting"></i>
					<span slot="title">导航四</span>
				</el-menu-item>
			</el-menu>
		</div>
		<div class="rightContent">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return{
			
		}
	},
	methods:{
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		}
	},
}
</script>
<style lang="stylus" scoped>
.mainPage
	width 100%
	height 100%
	display flex
	.leftContent
		width 200px;
		height 100%;
		background #00f
	.rightContent
		width calc(100% - 200px)
		height 100%
		// background #0ff
</style>