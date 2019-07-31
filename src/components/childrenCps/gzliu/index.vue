<template>
    <div class="gzliu">
       <el-row>
           <el-col :span="4"><div class="grid-content " style="text-align: left;">
           <el-button type="primary" size="mini" style="margin-top:10px;">部署管理</el-button>
          
           </div></el-col>
           <el-col :span="20"><div class="grid-content "> 
             <div class="handle-box">
                <form action="http://192.168.11.101:8080/zsyf/deploymentByZip.do" method="post" enctype="multipart/form-data">
                    <div class="file">选择文件
                    <input type="file" name="file" id="file" >
                    </div>
                    <input type="text" name="deploymentname" id="text" placeholder="请输入流程名称">
                    <button type="submit" class="sub">提交</button>
                </form>
          
                 <!-- <el-input
                        id="search-box"
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/> -->
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
                    label="Id"
                    prop="Id"
                    width="300">
                    </el-table-column>
                    <el-table-column
                    label="流程名称"
                    prop="Name"
                    width="300">
                    </el-table-column>
                    <el-table-column
                    label="发布时间"
                    prop="DeploymentTime"
                    width="300">
                    </el-table-column>
                    
                    <el-table-column
                    label="操作"
                    width="300">
                    <!-- <template slot="header" slot-scope="">
                        
                    </template> -->
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
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
      handle(index, row) {
        row.user_name = this.$store.state.username
         var defectRecord = this.qs.stringify(row, {
          serializeDate: (date) => {
          return this.moment(date).format("YYYY-MM-DD");
        }
        })
        this.axios.post('/api/zsyf/starDoTask.do', defectRecord).then(res => {
           console.log(777777)
      }).catch(err => {
       
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
        let id = row.Id
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
           this.axios.get('/api/zsyf/delProcessDifnitionByKey.do?DeploymentId='+id).then(res => {
              this.$message({
              type: 'success',
              message: '删除成功!'
            });
          this.loading = true 
        let user_name = localStorage.getItem('username') 
        this.axios.get('/api/zsyf/findDep_procdif.do').then(res => {
          console.log(res.data.model.deploymentlist)
          this.tableData = []
          this.loading = false
           var that = this
          for (let i = 0; i < res.data.model.deploymentlist.length; i++) {
           let resTime = ""
            resTime = res.data.model.deploymentlist[i].DeploymentTime
            res.data.model.deploymentlist[i].DeploymentTime = that.moment(resTime).format("YYYY-MM-DD");
            that.tableData.push(res.data.model.deploymentlist[i])
          }
          
      }).catch(err => {
        console.log(222)
        if (err.status === 500) {
          confirm('数据请求失败')
        }
      })
      }).catch(err => {
          confirm('删除失败')      
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
      getData() {
        this.loading = true 
        let user_name = localStorage.getItem('username') 
        this.axios.get('/api/zsyf/findDep_procdif.do').then(res => {
          console.log(res.data)
          this.loading = false
           var that = this
          for (let i = 0; i < res.data.model.deploymentlist.length; i++) {
           let resTime = ""
            resTime = res.data.model.deploymentlist[i].DeploymentTime
            res.data.model.deploymentlist[i].DeploymentTime = that.moment(resTime).format("YYYY-MM-DD");
            that.tableData.push(res.data.model.deploymentlist[i])
          }
          
      }).catch(err => {
        console.log(222)
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
    .file{
      background-color: #409EFF;
      box-sizing: border-box;
      color: #fff;
      line-height: 28px;
      font-size: 12px;
      text-align: center;
      border-radius: 4px;
      display: inline-block;
      overflow: hidden;
      width: 80px;
      height: 28px;
      position: relative;
      top: 10px;
    }
    #file{
      position: absolute;
      width: 48px;
      left: 0;
      top:0;
      opacity: 0;
    }
    #text{
      border: 1px solid #ccc;
      padding-left: 10px;
      height: 28px;
      width: 200px;
      border-radius: 4px;
    }
    .sub{
      background-color: #409EFF;
      box-sizing: border-box;
      color: #fff;
      line-height: 28px;
      font-size: 12px;
      text-align: center;
      border-radius: 4px;
      display: inline-block;
      overflow: hidden;
      width: 80px;
      height: 28px;
    }
</style>
