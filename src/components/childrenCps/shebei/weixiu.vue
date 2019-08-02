<template>
   <div class="weixiu">
      <editWeixiu :id="id" ref="form" :isAdd="isAdd" :wformLabelAlign="wformLabelAlign" :currPage="currPage" @handleUp="handleUp"/>  
       <el-row>
           <el-col :span="4"><div class="grid-content " style="text-align: left;">
           <el-button type="primary" size="mini" >设备维修表</el-button>
           </div></el-col>
           <el-col :span="20"><div class="grid-content "> 
             <div class="handle-box">
               <el-button type="primary" size="mini" icon="el-icon-refresh" @click="getData(currPage)" >刷新</el-button>
               <el-button type="primary" size="mini" icon="el-icon-plus" @click="add()">新增</el-button>
                   <el-input
                        id="search-box"
                        prefix-icon="el-icon-search"
                        style="display:inline-block;width: 200px;"
                        v-model="search"
                        size="mini"
                        clearable
                        placeholder="输入水闸名称搜索"/>
                   <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" style="display:inline-block;" @click="searchData()">搜索</el-button>
             </div>
             </div></el-col>
             <el-col :span="24"><div class="grid-content ">
              <el-table
                    v-loading="loading"
                    id="mytable"
                    :data="tableData"
                    ref="multipleTable"
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
                        type="primary"
                        icon="el-icon-edit"
                        @click="handleEdit(scope.$index, scope.row)"></el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.$index, scope.row)"></el-button>
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
import editWeixiu from './editWeixiu'
export default {
     components: { editWeixiu },
     data() {
      return {
        tableData: [],
        // multipleSelection: [],
        search: '',
        totalPage: 0,
        pageSize: 0,
        currPage: 1,
        loading: false,
        id: 0,
        loading: false,
        wformLabelAlign: {},
        isAdd: false
      }
    },
    methods: {
       add() {
        this.$refs.form.dialog = true
        this.wformLabelAlign = {}
        this.id = 0
        this.isAdd = true
      },
      searchData() {
        let newArr = []
        let val = this.search
        newArr = this.tableData.filter(item => {
         return item.r_name.indexOf(this.search) >= 0
          })
        this.tableData = newArr
      },
      handleUp(data) {
          this.currPage = data;
          this.getData(this.currPage)
      },
      handleEdit(index, row) {
        this.id = row.id
        this.isAdd = false
        this.wformLabelAlign = row
        // this.$router.push('/index/editEfie/' + this.id);
         this.$refs.form.dialog = true
      },
      open(id) {
        this.$confirm('你确认删除这条数据吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.get('/api/zsyf/delRepairRecordByKey.do?id='+id).then(res => {
             this.$message({
              type: 'success',
              message: '删除成功!'
            });
          let currPage = this.currPage
         this.getData(currPage)
        }).catch(err => {
        
            confirm('数据请求失败') 
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });        
        });
      }, 
     handleDelete(index, row) {
        let id = row.id
        this.open(id)

      },
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
      getData(data) {
        this.loading = true
        let currPage = parseInt(data) 
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
       this.getData(this.currPage)
       
    }
}
</script>
<style scoped>
 
</style>