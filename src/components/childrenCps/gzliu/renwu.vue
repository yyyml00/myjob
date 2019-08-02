<template>
      <div class="renwu">
        <banli :taskId="taskId" :commentlist="commentlist" :pvminfo="pvminfo" ref="form" :isAdd="isAdd" :bformLabelAlign="bformLabelAlign" @getData="getData"/> 
        <jieban :mytaskId="mytaskId" :mycommentlist="mycommentlist" :mypvminfo="mypvminfo" ref="myform" :isAdd="isAdd" :myformLabelAlign="myformLabelAlign" @getData="getData"/> 
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
                        >查看当前流程图</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div></el-col>
        </el-row>
      </div>
</template>
<script>
import banli from './banli'
import jieban from './jieban'
export default {
    components: { banli ,jieban},
    data() {
      return {
        tableData: [],
        // multipleSelection: [],
        loading: false,
        commentlist: [],
        bformLabelAlign: {},
        isAdd: false,
        pvminfo: [],
        taskId: '',
        mytaskId: '',
        mypvminfo: [],
        myformLabelAlign: {},
        mycommentlist: []
      }
    },
    methods: {
      handleEdit(index, row) {
        this.isAdd = false
        this.taskId = row.Id
        let parme = {}
        let that = this
        parme.taskId = row.Id
        parme.processInstanceId = row.ProcessInstanceId
        let taskName = row.Name
        if (taskName === '指令下达人' || taskName === '指令接收人' || taskName === '操作员') {
          var defectRecord = that.qs.stringify(parme)
        that.axios.post('/api/zsyf/competeTask.do',defectRecord).then(res => {
               that.bformLabelAlign = res.data.model.dispatchingOrder
               that.commentlist = res.data.model.commentlist
               that.pvminfo = res.data.model.pvminfo
              }).catch(err => {
                
              })
         that.$refs.form.dialog = true
        }else if (taskName === '当班人员' || taskName === '接班人员') {
           var defectRecord = that.qs.stringify(parme)
        that.axios.post('/api/zsyf/competeTask.do',defectRecord).then(res => {
               that.myformLabelAlign = res.data.model.changeShifts
               that.mycommentlist = res.data.model.commentlist
               that.mypvminfo = res.data.model.pvminfo
               that.mytaskId = row.Id
              }).catch(err => {
                
              })
         that.$refs.myform.dialog = true
        }
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
            res.data.model.task[i].CreateTime = that.moment(resTime).format("LL");
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
