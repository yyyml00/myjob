<template>
   <div class="userInfo">
    <h1 class="page-title">用户信息统计表</h1> 
       
       <el-row>
           <el-col :span="24"><div class="grid-content "> 
             <div class="handle-box">
               <router-link to="/index/adduser">
               <el-button type="primary" >新增用户信息</el-button>
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
                    label="密码"
                    prop="user_pwd"
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
        this.$router.push('/index/edituser/' + id);
      },
     handleDelete(index, row) {
        let id = row.id
        this.axios.get('/api/zsyf/delUserByKey.do?id='+id).then(res => {

        let currPage = parseInt(this.currPage)
        console.log(res)
        this.axios.get('/api/zsyf/findUserByPage.do?currentPage='+currPage).then(res => {
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
      getData() {
        this.loading = true
        let currPage = parseInt(this.currPage) 
        console.log(typeof currPage)
        this.axios.get('/api/zsyf/findUserByPage.do?currentPage='+currPage).then(res => {
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
      }
    },
    created(){
       this.getData()
       
    }
}
</script>
<style scoped>
 
</style>