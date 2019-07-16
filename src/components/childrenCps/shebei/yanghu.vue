<template>
   <div class="quexian">
    <h1 class="page-title">设备养护统计表</h1> 
       
       <el-row>
           <el-col :span="24"><div class="grid-content "> 
             <div class="handle-box">
               <router-link to="/index/addyanghu">
               <el-button type="primary" >新增养护记录</el-button>
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
                    label="水闸名称"
                    prop="em_name"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="开始日期"
                    prop="em_runtime"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="结束日期"
                    prop="em_endtime"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="养护内容"
                    prop="em_neirong"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="养护修理实施情况"
                    prop="em_Implementation"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    label="耗用人工物料经费"
                    prop="em_resources"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    label="参与人员签字"
                    prop="em_staffsignature"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="分管领导签字"
                    prop="em_leadersignature"
                    width="120">
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
        this.$router.push('/index/edityanghu/' + id);
      },
     handleDelete(index, row) {
        let id = row.id
        this.axios.get('/api/zsyf/delEquipmentMaintenanceByKey.do?id='+id).then(res => {
        let currPage = this.currPage
        this.axios.get('/api/zsyf/findEquipmentMaintenanceByPage.do?currentPage='+currPage).then(res => {
          if (res.status === 200) {
          this.tableData = res.data.model.pagemsg.lists

          this.totalPage = res.data.model.pagemsg.totalCount
          this.pageSize = res.data.model.pagemsg.pageSize
          } 
      }).catch(err => {
        if (err.status === 500) {
          confirm('数据请求失败')
        }
      })
      
      }).catch(err => {
        if (err.status === 500) {
          confirm('数据请求失败')
        }        
      })

      },
      //   handleSelectionChange(val) {
      //   this.multipleSelection = val;
      //   // console.log(this.multipleSelection)
      // },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currPage = val
        this.axios.get('/api/zsyf/findEquipmentMaintenanceByPage.do?currentPage='+this.currPage).then(res => {
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
        this.axios.get('/api/zsyf/findEquipmentMaintenanceByPage.do?currentPage='+currPage).then(res => {
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