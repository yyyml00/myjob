<template>
   <div class="e-file">
       <editEfile :id="id" ref="form" :isAdd="isAdd" :bformLabelAlign="bformLabelAlign" :currPage="currPage" @handleUp="handleUp"/> 
       <eweixiu ref="wxtable" :wxid="wxid"/>
       <eyanghu ref="yhtable" :yhid="yhid"/>
       <equexian ref="qxtable" :qxid="qxid"/>
       <el-row>
           <el-col :span="4"><div class="grid-content " style="text-align: left;">
           <el-button type="primary" size="mini" >设备电子档案</el-button>
           </div></el-col>
           <el-col :span="20"><div class="grid-content "> 
             <div class="handle-box">
               <el-button type="primary" size="mini" icon="el-icon-refresh" @click="getData(currPage)">刷新</el-button>
               <el-button type="primary" size="mini" icon="el-icon-download" @click="handleDownload()">导出</el-button>
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
                        placeholder="输入出厂编号搜索"/>
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
                     <el-table-column type="expand">
                        <template slot-scope="props">
                          <el-form label-position="left" class="demo-table-expand">
                            <el-form-item label="生产日期：">
                              <span>{{ props.row.ei_date }}</span>
                            </el-form-item>
                            <el-form-item label="规格型号：">
                              <span>{{ props.row.ei_model }}</span>
                            </el-form-item>
                            <el-form-item label="防护等级：">
                              <span>{{ props.row.ei_protectionlevel }}</span>
                            </el-form-item>
                            <el-form-item label="标准代号：">
                              <span>{{ props.row.ei_code }}</span>
                            </el-form-item>
                            <el-form-item label="制造单位：">
                              <span>{{ props.row.ei_company }}</span>
                            </el-form-item>
                            <el-form-item label="主要参数：">
                              <span>{{ props.row.ei_parameter }}</span>
                            </el-form-item>
                            <el-form-item label="设备组：">
                              <span>{{ props.row.ei_group}}</span>
                            </el-form-item>
                          </el-form>
                        </template>
                      </el-table-column>
                     <el-table-column
                    label="设备编号"
                    prop="ei_id"
                    width="160">
                    </el-table-column>
                     <el-table-column
                    label="设备名称"
                    prop="ei_name"
                    width="200">
                    </el-table-column>
                     <el-table-column
                    label="设备维修记录"
                    width="200">
                    <!-- <template slot="header" slot-scope="">   
                    </template> -->
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="text"
                        @click="handleWeixiu(scope.$index, scope.row)">点击查看</el-button>
                    </template>
                    </el-table-column>
                     <el-table-column
                    label="设备缺陷记录"
                    width="200">
                    <!-- <template slot="header" slot-scope="">   
                    </template> -->
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="text"
                        @click="handleQuexian(scope.$index, scope.row)">点击查看</el-button>
                    </template>
                    </el-table-column>
                     <el-table-column
                    label="设备养护记录"
                    width="200">
                    <!-- <template slot="header" slot-scope="">   
                    </template> -->
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="text"
                        @click="handleYanghu
                        (scope.$index, scope.row)">点击查看</el-button>
                    </template>
                    </el-table-column>
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
import VueQr from '../erweima/shebeima'
import { setTimeout } from 'timers';
import editEfile from './editEfile'
import eweixiu from './e-weixiu'
import eyanghu from './e-yanghu'
import equexian from './e-quexian'
export default {
     components: { editEfile, eweixiu, eyanghu, equexian, VueQr},
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
        wxid: "",
        yhid: '',
        qxid: ''
      }
    },
    methods: {
      handle(index, row){
        let id = row.id
        this.$refs.vqr.dialog = true
      },
      handleQuexian(index, row) {
        this.qxid = row.ei_id
        this.$refs.qxtable.getdata(this.qxid)
        this.$refs.qxtable.dialog = true
      },
      handleWeixiu(index, row) {
        this.wxid = row.ei_id
        this.$refs.wxtable.getdata(this.wxid)
        this.$refs.wxtable.dialog = true
      },
      handleYanghu(index, row) {
        this.yhid = row.ei_id
        this.$refs.yhtable.getdata(this.yhid)
        this.$refs.yhtable.dialog = true
      },
      handleDownload() {
        this.downloadLoading = true
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = ['出厂编号', '规格型号', '防护等级','生产日期', '标准代号', '制造单位','主要参数', '设备名称', '设备组']
          const filterVal = ['ei_id', 'ei_model', 'ei_protectionlevel','ei_date', 'ei_code', 'ei_company','ei_parameter', 'ei_name', 'ei_group']
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '设备电子档案excel')
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
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
        this.axios.get('/api/zsyf/findEquipmentInformationByPage.do?currentPage='+this.currPage).then(res => {
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
           this.axios.get('/api/zsyf/delEquipmentInformationByKey.do?id='+id).then(res => {
              this.$message({
              type: 'success',
              message: '删除成功!'
            });
          let currPage = this.currPage
          this.axios.get('/api/zsyf/findEquipmentInformationByPage.do?currentPage='+currPage).then(res => {
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

        this.axios.get('/api/zsyf/findEquipmentInformationByPage.do?currentPage='+currPage).then(res => {
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
        console.log(11)
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