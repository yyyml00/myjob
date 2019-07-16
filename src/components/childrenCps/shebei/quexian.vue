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
                 <!-- <el-input
                        id="search-box"
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/> -->
                   <el-input
                        @change="searchData()"
                        id="search-box"
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/>
               </div>
               </div>
               <el-divider></el-divider>
             </div>
              <el-table
                    v-loading="loading"
                    id="mytable"
                    ref="multipleTable"
                    :data="tableData"
                    style="width: 100%"
                    >
                    <el-table-column
                    label="设备编号"
                    prop="ei_id"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="流水号"
                    prop="dr_pipelinenumber"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="设备名称"
                    prop="dr_name"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="缺陷类型"
                    prop="dr_type"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="缺陷表述"
                    prop="dr_content"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="发现人"
                    prop="dr_discoverer"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="发现时间"
                    prop="dr_discoverertime"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="记录人"
                    prop="dr_reportperson"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="记录时间"
                    prop="dr_reporttime"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="后续处理情况记录"
                    prop="dr_processing"
                    width="140">
                    </el-table-column>
                    <el-table-column
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
                  class="feiye-box"
                  @current-change="handleCurrentChange"
                  background
                  layout="prev, pager, next"
                  :total="totalPage"
                  :page-size="pageSize">
                </el-pagination>
            </div></el-col>
        </el-row>
    </div> 
</template>
<script>
import { setTimeout } from 'timers';
export default {
     data() {
      return {
        tableData: [],
        // multipleSelection: [],
        search: '',
        totalPage: 0, 
        pageSize: 0,
        currPage: 1,
        loading: false
      }
    },
    methods: {
      handleEdit(index, row) {
        let id = row.id
        this.$router.push('/index/editQuexain/' + id);
      },
     handleDelete(index, row) {
        let id = row.id
        this.axios.get('/api/zsyf/delDefectRecordByKey.do?id='+id).then(res => {
        let currPage = this.currPage
        this.axios.get('/api/zsyf/findDefectRecordByPage.do?currentPage='+currPage).then(res => {
          if (res.status === 200) {
          this.tableData = res.data.model.pagemsg.lists
          this.totalPage = res.data.model.pagemsg.totalCount
          this.pageSize = res.data.model.pagemsg.pageSize
          } 
      }).catch(err => {
        
          confirm('数据请求失败')
        
      })
      
      }).catch(err => {
      
          confirm('数据请求失败')
              
      })

      },
      //   handleSelectionChange(val) {
      //   this.multipleSelection = val;
      //   // console.log(this.multipleSelection)
      // },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currPage = val
        this.axios.get('/api/zsyf/findDefectRecordByPage.do?currentPage='+this.currPage).then(res => {
          if (res.status === 200) {
          this.tableData = res.data.model.pagemsg.lists
          //  this.totalPage = res.data.model.pagemsg.totalCount
          //  this.pageSize = res.data.model.pagemsg.pageSize
          }
      }).catch(err => {
        if (err.status === 500) {
          confirm('数据请求失败')
        }
      })
      },
      getData() {
        this.loading = true
        let currPage = parseInt(this.currPage) 
        console.log(typeof currPage)
        this.axios.get('/api/zsyf/findDefectRecordByPage.do?currentPage='+currPage).then(res => {
          if (res.status === 200) {
            setTimeout(() => {
            this.loading = false
          }, 400);
            this.tableData = res.data.model.pagemsg.lists
            console.log(this.tableData)
           this.totalPage = res.data.model.pagemsg.totalCount
           this.pageSize = res.data.model.pagemsg.pageSize
          //  this.loading = false  
          } 
      }).catch(err => {
        if (err.status === 500) {
          confirm('数据请求失败')
        }
      })
      },
      searchData() {
        console.log(11)
        let newArr = []
        let val = this.search
        newArr = this.tableData.filter(item => {
         return item.dr_name.indexOf(this.search) >= 0
          })
        this.tableData = newArr
      }
    },
    created(){
       this.getData()  
    }
}
</script>
<style scoped>
 
</style>