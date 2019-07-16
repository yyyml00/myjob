<template>
   <div class="weixiu">
    <h1 class="page-title">设备维修统计表</h1> 
       
       <el-row>
           <el-col :span="24"><div class="grid-content "> 
             <div class="handle-box">
               <router-link to="/index/addWeixiu">
               <el-button type="primary" >新增维修记录</el-button>
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
                    v-loading="loading"
                    id="mytable"
                    ref="multipleTable"
                    :data="tableData.filter(data => !search || data.Dr_name.toLowerCase().includes(search.toLowerCase()) || data.Dr_pipelinenumber.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%"
                    >
                    <el-table-column
                    label="水闸名称"
                    prop="r_name"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="开始日期"
                    prop="r_runtime"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="修理内容"
                    prop="r_neirong"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="养护修理实施情况"
                    prop="r_Implementation"
                    width="140">
                    </el-table-column>
                    <!-- <el-table-column
                    label="缺陷表述"
                    prop="dr_content"
                    width="200">
                    </el-table-column> -->
                    <el-table-column
                    label="耗用人工物料经费"
                    prop="r_resources"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    label="参与人员签字"
                    prop="r_staffsignature"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="分管领导签字"
                    prop="r_leadersignature"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="结束时间"
                    prop="r_endtime"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="设备编号"
                    prop="ei_id"
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
        this.$router.push('/index/editWeixiu/' + id);
      },
     handleDelete(index, row) {
        let id = row.id
        this.axios.get('/api/zsyf/delRepairRecordByKey.do?id='+id).then(res => {

        let currPage = this.currPage
        this.axios.get('/api/zsyf/findRepairRecordByPage.do?currentPage='+currPage).then(res => {
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
        this.axios.get('/api/zsyf/findRepairRecordByPage.do?currentPage='+this.currPage).then(res => {
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
        this.axios.get('/api/zsyf/findRepairRecordByPage.do?currentPage='+currPage).then(res => {
          if (res.status === 200) {
            setTimeout(() => {
            this.loading = false
          }, 400);
            this.tableData = res.data.model.pagemsg.lists

           this.totalPage = res.data.model.pagemsg.totalCount
           this.pageSize = res.data.model.pagemsg.pageSize
          //  this.loading = false
          
          } 
      }).catch(err => {
        if (err.status === 500) {
          confirm('数据请求失败')
        }
      })
      }
    },
    created(){
       this.getData()
       
    }
}
</script>
<style scoped>
 
</style>