<template>
   <div class="userInfo">
     <edituser :id="id" ref="form" :isAdd="isAdd" :uformLabelAlign="uformLabelAlign" :currPage="currPage" @handleUp="handleUp"/>
     <el-row>
           <el-col :span="4"><div class="grid-content " style="text-align: left;">
           <el-button type="primary" size="mini" >人员信息档案</el-button>
           </div></el-col>
           <el-col :span="20"><div class="grid-content "> 
             <div class="handle-box">
               <el-button type="primary" size="mini" icon="el-icon-refresh" @click="getData(currPage)">刷新</el-button>
              
               <el-button type="primary" size="mini" icon="el-icon-plus" @click="add()">新增</el-button>
          
                 <!-- <el-input
                        id="search-box"
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/> -->
                   <el-input
                        id="search-box"
                        prefix-icon="el-icon-search"
                        style="display:inline-block;width: 200px;"
                        v-model="search"
                        size="mini"
                        clearable
                        placeholder="输入姓名搜索"/>
                   <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" style="display:inline-block;" @click="searchData()">搜索</el-button>
             </div>
             </div></el-col>
             <el-col :span="24"><div class="grid-content ">
              <el-table
                    v-loading="loading"
                    id="mytable"
                    ref="multipleTable"
                    :data="tableData"
                    style="width: 100%"
                    >
                    <el-table-column
                    label="用户编号"
                    prop="user_id"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="姓名"
                    prop="user_name"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="电话"
                    prop="user_phone"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="性别"
                    prop="user_sex"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="地址"
                    prop="user_name"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="年龄"
                    prop="user_age"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="所属部门"
                    prop="user_department"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="职位"
                    prop="user_role"
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
import edituser from './edituser'
import { constants } from 'zlib';
export default {
    components: { edituser },
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
        uformLabelAlign: {},
        isAdd: false
      }
    },
    methods: {
      add() {
        this.$refs.form.dialog = true
        this.uformLabelAlign = {}
        this.id = 0
        this.isAdd = true
      },
      handleUp(data) {
          this.currPage = data;
          this.getData(this.currPage)
      },
      handleEdit(index, row) {
        this.id = row.id
        this.isAdd = false
        this.uformLabelAlign = row
        // this.$router.push('/index/editEfie/' + this.id);
         this.$refs.form.dialog = true
      },
      open(id) {
        this.$confirm('你确认删除这条数据吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {  
         this.axios.get('/api/zsyf/delUserByKey.do?id='+id).then(res => {
           this.$message({
            type: 'success',
            message: '删除成功!'
          });
          let currPage = parseInt(this.currPage)
          this.getData(currPage)
        }).catch(err => {
          if (err.status === 500) {
            confirm('数据请求失败')
          }
          
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
        this.axios.get('/api/zsyf/findUserByPage.do?currentPage='+this.currPage).then(res => {
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
        this.axios.get('/api/zsyf/findUserByPage.do?currentPage='+currPage).then(res => {
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
      },
      searchData() {
        let newArr = []
        let val = this.search
        newArr = this.tableData.filter(item => {
         return item.user_name.indexOf(this.search) >= 0
          })
        this.tableData = newArr
      }
      
    },
    created(){
       this.getData(this.currPage)
       
    }
}
</script>
<style scoped>
 
</style>