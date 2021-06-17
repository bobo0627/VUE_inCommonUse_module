<template>
	<div class="tableContent">
		<div class="testBox">	
			<tableCommon 
				:tableData="tableData"
				:columns="columns"
				:confirmedcurrent="confirmedcurrent"
				:confirmedsize="confirmedsize"
				:confirmedTotal="confirmedTotal"
				:vLoading="vLoading"
				:isShowTotal='true'
				:defaultSort="{prop:'violationNum',order:'descending'}"
				emptyText="车辆信息暂无数据"
				@clickTableRow="clickTableRow"
				@handleChangePage="handleChangePage"
				@tableSortChange="tableSortChange"
				ref="tableCommon"
			/>
		</div>
	</div>
</template>
<script>
import tableCommon from './comm/table_module'
export default {
	data(){
		return{
			confirmedcurrent:1,
      confirmedsize:25,
			confirmedTotal:1000,
			columns: [
				{prop: 'plateNum', label: '车牌号', width: '5%', align: 'center'},
				{prop: 'plateColor', label: '车牌颜色', width: '5%',  align: 'center',formatter:this.allFormatter},
				{prop: 'vehicleTypeName', label: '车型', width: '5%',  align: 'center'},
				{prop: 'violationTypes', label: '违规行为', width: '8%',  align: 'center',formatter:this.allFormatter},
				{prop: 'unRouteNum', label: '不按规定线路行驶次数', width: '8%', sortable:true, align: 'center',formatter:this.allFormatter},
				{prop: 'peakIntrudeNum', label: '高峰闯禁', sortable:true, width: '5%', align: 'center',formatter:this.allFormatter},
				{prop: 'violationNum', label: '违规次数', sortable:true, width: '5%', align: 'center',formatter:this.allFormatter},
				{prop: 'score', label: '车辆评分', width: '5%', sortable:true,  align: 'center'},
				{prop: '', label: '操作', width: '8%', align: 'center',handleName:'档案详情'},
			],
			tableData:[

			],
			vLoading:false,
		}
	},
	components:{
		tableCommon
	},
	mounted(){
		for(var i=0;i<10;i++){
			this.tableData.push({
				'plateNum':'111'+i,
				'plateColor':'111'+i,
				'vehicleTypeName':'111'+i,
				'violationTypes':'111'+i,
				'unRouteNum':'111'+i,
				'peakIntrudeNum':'111'+i,
				'violationNum':'111'+i,
				'score':'111'+i
			})	
		}
		console.log(this.tableData)
	},
	methods:{
		clickTableRow(val){

		},
		handleChangePage(val){
			console.log(val)
			this.confirmedcurrent = val
		},
		tableSortChange(cloumn){

		}
	}
}
</script>
<style lang="stylus" scoped>
.tableContent
	width 100%
	height 100%
	// background #f0f
	.testBox
		width 1460px
		height 480px
		background #0c66cc
</style>