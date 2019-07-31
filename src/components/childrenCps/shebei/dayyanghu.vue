<template>
   <div class="e-file">
       <editdayyanghu :id="id" ref="form" :isAdd="isAdd" :bformLabelAlign="bformLabelAlign" :currPage="currPage" @handleUp="handleUp"/> 
       <el-row>
           <el-col :span="4"><div class="grid-content " style="text-align: left;">
           <el-button type="primary" size="mini" >设备电子档案</el-button>
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
                    label="水闸名称"
                    prop="mr_name"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="养护日期"
                    prop="mr_date"
                    width="120">
                    </el-table-column>
                    <el-table-column label="机房内保洁">
                    <el-table-column
                    label="养护实施情况"
                    prop="mr_cleaning"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="养护人签字"
                    prop="mr_sign_1"
                    width="120">
                    </el-table-column>
                    </el-table-column>
                    <el-table-column label="启闭机养护">
                     <el-table-column
                    label="养护实施情况"
                    prop="mr_hoist"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="养护人签字"
                    prop="mr_sign_2"
                    width="120">
                    </el-table-column>
                    </el-table-column>
                    <el-table-column label="钢丝绳养护">
                    <el-table-column
                    label="养护实施情况"
                    prop="mr_rope"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="养护人签字"
                    prop="mr_sign_3"
                    width="120">
                    </el-table-column>
                    </el-table-column>
                    <el-table-column label="电气设备养护">
                    <el-table-column
                    label="养护实施情况"
                    prop="mr_electric"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="养护人签字"
                    prop="mr_sign_4"
                    width="120">
                    </el-table-column>
                    </el-table-column>
                    <el-table-column label="闸门养护">
                    <el-table-column
                    label="养护实施情况"
                    prop="mr_sluicegate"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="养护人签字"
                    prop="mr_sign_5"
                    width="120">
                    </el-table-column>
                    </el-table-column>
                    <el-table-column label="闸门上下游漂浮物清除">
                     <el-table-column
                    label="养护实施情况"
                    prop="mr_float"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="养护人签字"
                    prop="mr_sign_6"
                    width="120">
                    </el-table-column>
                    </el-table-column>
                    <el-table-column label="闸区卫生">
                    <el-table-column
                    label="养护实施情况"
                    prop="mr_hygiene"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="养护人签字"
                    prop="mr_sign_7"
                    width="120">
                    </el-table-column>
                    </el-table-column>
                    <el-table-column label="堤防养护">
                    <el-table-column
                    label="养护实施情况"
                    prop="mr_dykes"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="养护人签字"
                    prop="mr_sign_8"
                    width="120">
                    </el-table-column>
                    </el-table-column>
                    <el-table-column label="其他项目养护">
                    <el-table-column
                    label="养护实施情况"
                    prop="mr_project"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="养护人签字"
                    prop="mr_sign_9"
                    width="120">
                    </el-table-column>
                    </el-table-column>
                     <el-table-column
                    label="技术负责人签字"
                    prop="mr_technology"
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
            <el-col :span="24"><div class="grid-content ">
              
                <form action="http://192.168.11.101:8080/zsyf/deploymentByZip.do" method="post" enctype="multipart/form-data">
                    <input type="file" name="file" id="file">
                    <input type="text" name="deploymentname" id="text">
                    <button type="submit" class="sub">提交</button>
                </form>
                
              </div></el-col>
        </el-row>
       
       
    </div> 
</template>
<script>
import { setTimeout } from 'timers';
import editdayyanghu from './editdayyanghu'
export default {
     components: { editdayyanghu },
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
        isAdd: false
      }
    },
    methods: {
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
        this.axios.get('/api/zsyf/findMaintenanceRecordsByPage.do?currentPage='+this.currPage).then(res => {
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
           this.axios.get('/api/zsyf/delMaintenanceRecordsByKey.do?id='+id).then(res => {
              this.$message({
              type: 'success',
              message: '删除成功!'
            });
          let currPage = this.currPage
          this.axios.get('/api/zsyf/findMaintenanceRecordsByPage.do?currentPage='+currPage).then(res => {
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
        this.id = 0
        this.isAdd = true
      },
      getData(data) {
        this.loading = true
        let currPage = parseInt(data) 

        this.axios.get('/api/zsyf/findMaintenanceRecordsByPage.do?currentPage='+currPage).then(res => {
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