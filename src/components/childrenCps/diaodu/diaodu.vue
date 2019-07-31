<template>
   <div class="e-file">
       <editdiaodu :id="id" ref="form" :isAdd="isAdd" :bformLabelAlign="bformLabelAlign" :currPage="currPage" @handleUp="handleUp"/> 
       <el-row>
           <el-col :span="4"><div class="grid-content " style="text-align: left;">
           <el-button type="primary" size="mini" >水闸调度令</el-button>
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
                        placeholder="输入设备名称搜索"/>
                   <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" style="display:inline-block;" @click="searchData()">搜索</el-button>
             </div>
             </div></el-col>
             <el-col :span="24"><div class="grid-content ">
              <el-table
                    v-loading="loading"
                    id="mytable"
                    ref="multipleTable"
                    :data='tableData'
                    style="width: 100%"
                    >
                    <el-table-column
                    label="调度编号"
                    prop="do_id"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="调度依据"
                    prop="do_reason"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="调度指令"
                    prop="do_instructions"
                    width="120">
                    </el-table-column>
                     <el-table-column
                    label="调度指令下达人"
                    prop="do_giveacommand"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="调度指令接收人"
                    prop="do_receivecommands"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="时间"
                    prop="do_time"
                    width="120">
                    </el-table-column>
                    <!-- <el-table-column
                    label="状态"
                    prop="do_state"
                    width="120">
                    </el-table-column> -->
                     <el-table-column
                    label="状态"
                    width="160">
                    <template slot-scope="scope">
                        <el-tag
                        v-if="scope.row.do_state === 0 ? true : false"
                        >初始录入</el-tag>
                        <el-tag
                        type="warning"
                        v-if="scope.row.do_state === 1 ? true : false"
                        >审核中</el-tag>
                        <el-tag
                        type="success"
                        v-if="scope.row.do_state === 2 ? true : false"
                        >审核结束</el-tag>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="300">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        v-if="scope.row.do_state === 0? true : false"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        v-if="scope.row.do_state === 0||scope.row.do_state === 2? true : false"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button
                        size="mini"
                        type="success"
                        v-if="scope.row.do_state === 1? true : false"
                        @click="handlezh(scope.$index, scope.row)">审核中</el-button>
                        <el-button
                        size="mini"
                        type="success"
                        v-if="scope.row.do_state === 0? true : false"
                        @click="handle(scope.$index, scope.row)">提交申请</el-button>
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
import editdiaodu from './editdiaodu'
export default {
     components: { editdiaodu },
     data() {
      return {
        tableData: [],
        // multipleSelection: [],
        search: '',
        totalPage: 0, 
        pageSize: 0,
        currPage: 1,
        id: 0,
        loading: false,
        bformLabelAlign: {},
        isAdd: false,
      }
    },
    methods: {
      handle(index, row) {
        row.user_name = this.$store.state.username
         var defectRecord = this.qs.stringify(row, {
          serializeDate: (date) => {
          return this.moment(date).format("YYYY-MM-DD");
        }
        })
        this.axios.post('/api/zsyf/starDoTask.do', defectRecord).then(res => {
        this.$message({
              type: 'success',
              message: '提交成功!'
            });
             let currPage = this.currPage
          this.axios.get('/api/zsyf/findDispatchingOrderByPage.do?currentPage='+currPage).then(res => {
          if (res.status === 200) {
          this.tableData = res.data.model.pagemsg.lists
          this.totalPage = res.data.model.pagemsg.totalCount
          this.pageSize = res.data.model.pagemsg.pageSize
          } 
      }).catch(err => {
          confirm('数据请求失败')
      })  
      }).catch(err => {
       
      })
      },
       handlezh() {
         this.$confirm('任务审核中无法操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      },
      handleUp(data) {
          this.currPage = data;
          this.getData(this.currPage)
      },
      handleEdit(index, row) {
        this.id = row.id
        this.isAdd = false
        this.bformLabelAlign = row
        // this.$router.push('/index/editEfie/' + this.id);
         this.$refs.form.dialog = true
      },
     handleDelete(index, row) {
        let id = row.id
        this.open(id)
      },
      handleCurrentChange(val) {
        this.currPage = val
        this.axios.get('/api/zsyf/findDispatchingOrderByPage.do?currentPage='+this.currPage).then(res => {
          if (res.status === 200) {
          this.tableData = res.data.model.pagemsg.lists
          }
      }).catch(err => {
        if (err.status === 500) {
          confirm('数据请求失败')
        }
      })
      },
        open(id) {
        this.$confirm('你确认删除这条数据吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.axios.get('/api/zsyf/delDispatchingOrderByKey.do?id='+id).then(res => {
              this.$message({
              type: 'success',
              message: '删除成功!'
            });
          let currPage = this.currPage
          this.axios.get('/api/zsyf/findDispatchingOrderByPage.do?currentPage='+currPage).then(res => {
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });        
        });
      },
      add() {
        this.$refs.form.dialog = true
        this.bformLabelAlign = {}
        this.bformLabelAlign.do_state = 0
        this.id = 0
        this.isAdd = true
      },
      getData(data) {
        this.loading = true
        let currPage = parseInt(data) 

        this.axios.get('/api/zsyf/findDispatchingOrderByPage.do?currentPage='+currPage).then(res => {
          console.log(res)
          if (res.status === 200) {
            setTimeout(() => {
            this.loading = false
          }, 400);
            this.tableData = res.data.model.pagemsg.lists
           this.totalPage = res.data.model.pagemsg.totalCount
           this.pageSize = res.data.model.pagemsg.pageSize 
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
            return item.ei_id.indexOf(this.search) >= 0
          })
        this.tableData = newArr
      },


     
    },
    created(){
       this.getData(this.currPage) 
    },
    // updated(){
    //    this.getData() 
    // }
}
</script>
<style scoped>
    #text{
     height: 20px;
     width: 160px;
     border: 1px solid #ccc;
    }
    .sub{
      height: 20px;
      width: 40px;
      background-color: aquamarine;
    }
</style>