<template>
	<div class="table_page_Content">
		<div class="tableBox ">
			<el-table
			:v-loading="tableLoding"
			element-loading-background = "rgba(0, 0, 0, 0.5)"
			element-loading-text = "数据正在加载中"
			element-loading-spinner = "el-icon-loading"
			:data="tableData"
			:row-style="{height:'0.38rem'}"
			:empty-text="emptyText"
			style="width: 100%"
			height="100%"
			highlight-current-row
			@sort-change="tableSortChange"
			:default-sort="defaultSort"
			@filter-change="filterMethod"
			@cell-click="handleCellClick"
			ref="tableList">
			<template v-for="(item,index_) in columns" >
				<el-table-column
					v-if="item.label =='操作'"
					:prop="item.prop"
					:key="index_"
					:label="item.label"
					:min-width="item.width"
					:align="item.algin"
					>
					<template slot-scope="scope" >
						<el-button @click="handleClickChangeRow(scope)" type="text" size="small" v-show="!item.prop">{{item.handleName}}</el-button>
						<el-button @click="handleClickAddress(scope.row)" type="text" size="small" v-show="item.prop=='occurLocation'" >{{scope.row.occurLocation ? '查看点位' : '-'}}</el-button>
					</template>
				</el-table-column>
				<el-table-column
					v-else
					:sortable="item.sortable"
					:prop="item.prop"
					:key="index_"
					:label="item.label"
					:min-width="item.width"
					:align="item.algin"
					:formatter="item.formatter"
					:render-header="item.renderHeader"
					:filters="item.filters"
					:filter-multiple="false"
					:column-key="item.columnKey"
					>
				</el-table-column>
			</template>
			</el-table>
		</div>
			<div class="pagination_">
				<el-pagination
					:small="small"
					@current-change="confirmedListFenye"
					:current-page.sync="confirmedcurrent_"
					:page-size="confirmedsize"
					:layout="layoutStyle"
					:total="confirmedTotal">
				</el-pagination>
		</div>
	</div>
</template>
<script>
export default {
	props:{
		tableData:{
			type:Array
		},
		columns:{
			type:Array
		},
		vLoading:{
			type:Boolean,
			default:false,
		},
		emptyText:{
			type:String,
			default:'暂无数据'
		},
		defaultSort:{
			type:[Object,Array,String],
			// default: function() {
			// 	return {props:'',order:''}
			// },
			default: () => ({props:'',order:''})
		},
		//分页
		confirmedcurrent:{
			type:Number
		},
		confirmedsize:{
			type:Number
		},
		confirmedTotal:{
			type:Number
		},
		small:{
			type:Boolean,
			// default:false,
		},
		isShowTotal:{
			type:Boolean,
		}
	},
	data(){
		return{
			loading: true
		}
	},
	computed:{
		layoutStyle(){
			let style1 = "total, prev, pager, next"
			let style2 = "prev, pager, next, jumper"
			let style3 = "total, prev, pager, next, jumper"
			return this.small ? style1 : this.isShowTotal ? style3 : style2
		},
		confirmedcurrent_:{
			get(){
				return this.confirmedcurrent
			},
			set(){
			}
		},
		confirmedTotal_:{
			get(){
				return this.confirmedTotal
			},
			set(){
			}
		},
		tableLoding:{
			get(){
				console.log(this.vLoading)
				return this.vLoading
			},
			set(){

			}
		}
	},
	methods:{
		handleClickChangeRow(val) {
			console.log(val)
			this.$emit('clickTableRow',val)
		},
		handleClickAddress(val) {
			if(val.occurLocation.length>0){
				this.$emit('clickTableAddress',val)
			}
		},
		tableSortChange(column) {//自定义排序 通过接口排序
			console.log(column)
			/**
			 * column.order  
			 * 	ascending 升序 
			 * 	descending 降序
			 *  null  没有排序
			 */
			this.$emit('tableSortChange',column)
		},
		//清空排序
		clearTableSort() {
			this.$refs.tableList.clearSort()
		},
		//过滤改变时触发
		filterMethod(val){
			console.log(val)
			this.$emit('filterChange',val)
		},

		confirmedListFenye(val){
			this.$emit('change',val)
		},
		handleCellClick(row, column, cell, event){
			console.log(row, column, cell, event)
		}
	}
}
</script>
<style lang="stylus" scoped>
.table_page_Content
	width 100%
	height 100%
	.tableBox
		height calc(100% - 68px)
		width 100%
	.pagination_
		height 68px
		width 100%
</style>
<style>
.tableBox .el-table thead{
      background: #0d2233;
      /* height: 1.38rem; */
    }
.el-table .cell{
	line-height: 38px;
}
.tableBox .el-table td, .el-table th {
	padding: 0rem;
}
.tableBox /deep/ .el-table--fit{
		/* / padding: 20px; */
}
.tableBox /deep/  .el-table, .el-table__expanded-cell {
		background-color: transparent!important;
}
.tableBox .el-table th{
		background-color: transparent!important;
		color:#fff !important;
		height: 40px;
}
.tableBox .el-table tbody tr:hover{
		background-color: #3A6699!important;
}
.tableBox .el-table tr {
		background-color: transparent!important;
		color:#fff !important;
}
.tableBox .el-button--text{
		color:#FFCC00 !important;
}
.tableBox /deep/  .el-table--enable-row-transition .el-table__body td, .el-table .cell{
		background-color: transparent !important;
}
.tableBox .el-table td{
	padding: 0px;
}

/* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
.tableBox /deep/ .el-table .hover-row>td{
	/* background-color: #0C6CCC !important; */
	/* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
}
.tableBox /deep/ .el-table .current-row>td{
	/* background-color: #0C6CCC !important; */
	/* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
}

.el-table--border:after,
.el-table--group:after,
.el-table:before {
		background-color: #85A1BB;
}

.el-table--border,
.el-table--group {
		border-color: #85A1BB;
}
.el-table th.is-leaf{
	border-bottom: none;
}
.el-table td {
				border-bottom: 1px solid #85A1BB;
				/* border-bottom: none; */
}

.el-table--border th,
.el-table--border th.gutter:last-of-type {
				border-bottom: 1px solid #85A1BB;
				/* border-bottom: none; */
}

.el-table--border td,
.el-table--border th {
				border-right: 1px solid #85A1BB;
				/* border-bottom: none; */
}
.tableBox ::-webkit-scrollbar { width: 4px;}
.tableBox ::-webkit-scrollbar-thumb{
	background:#b1b1b1;
}
.tableBox .el-table__body-wrapper, .tableBox .is-scrolling-none{
	height:  calc(100% - 40px) !important;
}
.tableBox .el-table__header-wrapper{
	height: 40px !important;
}
.tableBox .el-table th {
	padding: 0;
}


/* 
*分页
 */
.pagination_{
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.pagination_ .el-pagination{
	display: flex;
	/* align-items: center; */
}
.pagination_ .el-pagination .el-pager{
	display: flex;
}
.pagination_ .el-pagination .el-pager li {
	margin: 0rem 2px !important;
	font-size: 14px;
	width: 32px;
	height:32px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #fff;
	box-sizing: border-box;
	color:#fff;
	cursor: pointer;
	background: none !important;
}
.pagination_ .el-pagination--small .el-pager li {
	margin: 0rem 2px !important;
	font-size: 14px;
	width: 32px !important;
	height:32px !important;
	display: flex !important;
	justify-content: center !important;
	align-items: center !important;
	border: 1px solid #fff !important;
	box-sizing: border-box !important;
	color:#fff !important;
	cursor: pointer;
	background: none !important;
}
.pagination_ .el-pagination .el-pager .active{
	color:#FFCC01 !important;
	border: 1px solid #FFCC01 !important;
}
.pagination_ .el-pagination .el-pager .el-icon{
	border: 0 !important
}
.pagination_ .el-pagination .btn-prev{
	width: 32px;
	height:32px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #fff;
	box-sizing: border-box;
	background: none;
}
.pagination_ .el-pagination .btn-prev i{
	font-size: 16px;
	cursor: pointer;
	color:#d8d8d8;
}
.pagination_ .el-pagination .btn-next{
	width: 32px;
	height:32px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #fff;
	box-sizing: border-box;
	background: none;
}
.pagination_ .el-pagination .btn-next i{
	font-size: 16px;
	cursor: pointer;
	color:#d8d8d8;
}
.pagination_ .el-pagination .el-pagination__jump{
	color:#fff;
	display: flex;
	font-weight: bold;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 32px;
	box-sizing: border-box;
}
.pagination_ .el-pagination .el-pagination__jump .el-pagination__editor{
	padding: 0;
	width: 50px;
	height: 32px;
	display: flex;
	justify-content: center;
	/* align-items: center; */
	box-sizing: border-box;
}
.pagination_ .el-pagination .el-pagination__jump .el-pagination__editor input{
	background: none;
	border: 1px solid #fff;
	border-radius: 0rem;
	cursor: pointer;
	color: #fff;
	box-sizing: border-box;
	padding: 0;
	height: 32px;
	font-size: 14px;
}
.pagination_ .el-pagination__total{
	color:#fff;
}
</style>