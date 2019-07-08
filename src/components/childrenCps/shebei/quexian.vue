<template>
   <div class="quexian">
    <h1 class="page-title">设备缺陷档案统计表</h1> 
       
       <el-row>
           <el-col :span="24"><div class="grid-content "> 
             <div class="handle-box">
               <router-link to="/index/addquexian">
               <el-button type="primary" >新增设备缺陷记录</el-button>
               </router-link>
               <div class="flo" >
               <el-button type="primary" size="mini">输入查询</el-button>
               <div class="fl">
                 <el-input
                        id="search-box"
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/>
               </div>
               </div>
               <el-divider></el-divider>
             </div>
              <el-table
                   
                    id="mytable"
                    ref="multipleTable"
                    :data="tableData.filter(data => !search || data.Dr_name.toLowerCase().includes(search.toLowerCase()) || data.Dr_pipelinenumber.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    label="设备编号"
                    prop="El_id"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="流水号"
                    prop="Dr_pipelinenumber"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="设备名称"
                    prop="Dr_name"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="缺陷类型"
                    prop="Dr_type"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="缺陷表述"
                    prop="Dr_content"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    label="发现人"
                    prop="Dr_discoverer"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="发现时间"
                    prop="Dr_discoverertime"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="记录人"
                    prop="Dr_reportperson"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="记录时间"
                    prop="Dr_reporttime"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    label="后续处理情况记录"
                    prop="Dr_processing"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    align="right"
                    label="操作"
                    width="160">
                    <!-- <template slot="header" slot-scope="">
                        
                    </template> -->
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <el-divider></el-divider> 
                <el-pagination
                  @current-change="handleCurrentChange"
                  background
                  layout="prev, pager, next"
                  :total="1000">
                </el-pagination>
            </div></el-col>
        </el-row>
       
       
    </div> 
</template>
<script>
export default {
     data() {
      return {
        tableData: [ {
          Dr_pipelinenumber: '111111',
          Dr_name: '2222222222222',
          Dr_type: '33333333',
          Dr_content: '3333333333334444444444444444444444444444444',
          Dr_discoverer: '444444444444',
         Dr_discoverertime: '555555',
          Dr_reportperson: '666666666',
          Dr_reporttime: '444444444444',
          Dr_processing: '44444444444444444444444444444444444444444444444444',
          El_id: '333333'
        },{
          Dr_pipelinenumber: '111111',
          Dr_name: '2222222222222',
          Dr_type: '33333333',
          Dr_content: '3333333333334444444444444444444444444444444',
          Dr_discoverer: '444444444444',
         Dr_discoverertime: '555555',
          Dr_reportperson: '666666666',
          Dr_reporttime: '444444444444',
          Dr_processing: '44444444444444444444444444444444444444444444444444',
          El_id: '333333'
        },{
          Dr_pipelinenumber: '111111',
          Dr_name: '2222222222222',
          Dr_type: '33333333',
          Dr_content: '3333333333334444444444444444444444444444444',
          Dr_discoverer: '444444444444',
         Dr_discoverertime: '555555',
          Dr_reportperson: '666666666',
          Dr_reporttime: '444444444444',
          Dr_processing: '44444444444444444444444444444444444444444444444444',
          El_id: '333333'
        },{
          Dr_pipelinenumber: '8888',
          Dr_name: '2222222222222',
          Dr_type: '33333333',
          Dr_content: '3333333333334444444444444444444444444444444',
          Dr_discoverer: '444444444444',
         Dr_discoverertime: '555555',
          Dr_reportperson: '666666666',
          Dr_reporttime: '444444444444',
          Dr_processing: '44444444444444444444444444444444444444444444444444',
          El_id: '333333'
        },{
          Dr_pipelinenumber: '111111',
          Dr_name: '2222222222222',
          Dr_type: '33333333',
          Dr_content: '3333333333334444444444444444444444444444444',
          Dr_discoverer: '444444444444',
         Dr_discoverertime: '555555',
          Dr_reportperson: '666666666',
          Dr_reporttime: '444444444444',
          Dr_processing: '44444444444444444444444444444444444444444444444444',
          El_id: '333333'
        },{
          Dr_pipelinenumber: '111111',
          Dr_name: '2222222222222',
          Dr_type: '33333333',
          Dr_content: '3333333333334444444444444444444444444444444',
          Dr_discoverer: '444444444444',
         Dr_discoverertime: '555555',
          Dr_reportperson: '666666666',
          Dr_reporttime: '444444444444',
          Dr_processing: '44444444444444444444444444444444444444444444444444',
          El_id: '333333'
        },{
          Dr_pipelinenumber: '111111',
          Dr_name: '2222222222222',
          Dr_type: '33333333',
          Dr_content: '3333333333334444444444444444444444444444444',
          Dr_discoverer: '444444444444',
         Dr_discoverertime: '555555',
          Dr_reportperson: '666666666',
          Dr_reporttime: '444444444444',
          Dr_processing: '44444444444444444444444444444444444444444444444444',
          El_id: '333333'
        },{
          Dr_pipelinenumber: '111111',
          Dr_name: '2222222222222',
          Dr_type: '33333333',
          Dr_content: '3333333333334444444444444444444444444444444',
          Dr_discoverer: '444444444444',
         Dr_discoverertime: '555555',
          Dr_reportperson: '666666666',
          Dr_reporttime: '444444444444',
          Dr_processing: '44444444444444444444444444444444444444444444444444',
          El_id: '333333'
        },{
          Dr_pipelinenumber: '111111',
          Dr_name: '2222222222222',
          Dr_type: '33333333',
          Dr_content: '3333333333334444444444444444444444444444444',
          Dr_discoverer: '444444444444',
         Dr_discoverertime: '555555',
          Dr_reportperson: '666666666',
          Dr_reporttime: '444444444444',
          Dr_processing: '44444444444444444444444444444444444444444444444444',
          El_id: '333333'
        }],
        multipleSelection: [],
        search: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log( row.email);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
        handleSelectionChange(val) {
        this.multipleSelection = val;
        // console.log(this.multipleSelection)
      },handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleStyle ({row, rowIndex}) {
        return 'table-th'
      }
    }
}
</script>
<style scoped>
    .table-th {
      background-color: aquamarine;
    }
 
</style>