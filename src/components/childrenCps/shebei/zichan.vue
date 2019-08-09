<template>
   <div class="zichan">
       <editzichan :id="id" ref="form" :isAdd="isAdd" :bformLabelAlign="bformLabelAlign" :currPage="currPage" @handleUp="handleUp"/> 
       <el-row>
           <el-col :span="4"><div class="grid-content " style="text-align: left;">
           <el-button type="primary" size="mini" >固定资产</el-button>
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
                        placeholder="输入资产名称搜索"/>
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
                    label="二维码"
                    width="100">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="text"
                        @click="handle(scope.$index, scope.row)">生成二维码</el-button>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="资产编号"
                    prop="fa_id"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="资产名称"
                    prop="fa_name"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="实有数量/面积"
                    prop="fa_exnumber"
                    width="120">
                    </el-table-column>
                     <el-table-column
                    label="实有原值"
                    prop="fa_value"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="盘点结果"
                    prop="fa_result"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="使用状况"
                    prop="fa_situation"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="账面数量/面积"
                    prop="fa_bknumber"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="账面价值"
                    prop="fa_bookvalue"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="规格型号"
                    prop="fa_model"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="使用部门"
                    prop="fa_department"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="使用人"
                    prop="fa_people"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="存放地点"
                    prop="fa_addr"
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
      <VueQr :id='id' ref="vqr"></VueQr> 
       
    </div> 
</template>
<script>
import VueQr from '../erweima/zichanma'
import { setTimeout } from 'timers';
import editzichan from './editzichan'
export default {
     components: { editzichan, VueQr },
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
      handle(index, row){
        let id = row.id
        this.$refs.vqr.dialog = true
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
        this.axios.get('/api/zsyf/findFixedAssetsByPage.do?currentPage='+this.currPage).then(res => {
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
           this.axios.get('/api/zsyf/delfixedAssetsByKey.do?id='+id).then(res => {
              this.$message({
              type: 'success',
              message: '删除成功!'
            });
          let currPage = this.currPage
          this.axios.get('/api/zsyf/findFixedAssetsByPage.do?currentPage='+currPage).then(res => {
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

        this.axios.get('/api/zsyf/findFixedAssetsByPage.do?currentPage='+currPage).then(res => {
          if (res.status === 200) {
            setTimeout(() => {
            this.loading = false
          }, 400);
          console.log(res)
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
            return item.fa_name.indexOf(this.search) >= 0
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