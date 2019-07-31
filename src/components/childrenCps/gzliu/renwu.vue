<template>
      <div class="renwu">
        <el-row>
           <el-col :span="4"><div class="grid-content " style="text-align: left;">
           <el-button type="primary" size="mini" >任务管理</el-button>
           </div></el-col>
           <el-col :span="20"><div class="grid-content "> 
             <div class="handle-box">
               <el-button type="primary" size="mini" icon="el-icon-refresh" @click="getData()">刷新</el-button>
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
                    label="任务编号"
                    prop="Id"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    label="任务名称"
                    prop="Name"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    label="创建时间"
                    prop="CreateTime"
                    width="200">
                    </el-table-column>
                     <el-table-column
                    label="办理人"
                    prop="Assignee"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="300">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="text"
                        @click="handleEdit(scope.$index, scope.row)">办理任务</el-button>
                        <el-button
                        size="mini"
                        type="text"
                        @click="handleDelete(scope.$index, scope.row)">查看当前流程图</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div></el-col>
        </el-row>
      </div>
</template>
<script>
export default {
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
        open(id) {
        this.$confirm('你确认删除这条数据吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.axios.get('/api/zsyf/delProcessDifnitionByKey.do?id='+id).then(res => {
              this.$message({
              type: 'success',
              message: '删除成功!'
            });
          this.loading = true 
        let user_name = localStorage.getItem('username') 

        this.axios.get('/api/zsyf/findPersonTask.do?user_name='+user_name).then(res => {
          this.loading = false
          var that = this
          for (let i = 0; i < res.data.model.task.length; i++) {
           let resTime = ""
            resTime = res.data.model.task[i].CreateTime
            res.data.model.task[i].CreateTime = that.moment(resTime).format("YYYY-MM-DD");
            that.tableData.push(res.data.model.task[i])
          }  
      }).catch(err => {
        if (err.status === 500) {
          confirm('数据请求失败')
        }
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
      getData() {
        this.loading = true 
        let user_name = localStorage.getItem('username') 

        this.axios.get('/api/zsyf/findPersonTask.do?user_name='+user_name).then(res => {
          this.loading = false
          var that = this
          that.tableData = []
          for (let i = 0; i < res.data.model.task.length; i++) {
           let resTime = ""
            resTime = res.data.model.task[i].CreateTime
            res.data.model.task[i].CreateTime = that.moment(resTime).format("YYYY-MM-DD");
            that.tableData.push(res.data.model.task[i])
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
       this.getData() 
    },
}
</script>
<style scoped>

</style>
