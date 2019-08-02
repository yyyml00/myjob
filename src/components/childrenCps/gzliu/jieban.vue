<template>
         <el-dialog :visible.sync="dialog" append-to-body width="780px" @close="close()" :title="isAdd ? '新增水闸调度调令' : '办理任务'">
            <el-form :inline="true" ref="formLabelAlign" size="small" label-width="140px">
             <el-form-item label="本班运行时间：" prop="cs_runningtime">
                <el-input v-model="myformLabelAlign.cs_runningtime"></el-input>
            </el-form-item>
            <el-form-item label="当班人员：" prop="cs_dutypersonnel">
                <el-input v-model="myformLabelAlign.cs_dutypersonnel"></el-input>
            </el-form-item>
            <el-form-item label="交班时间：" prop="cs_duration"> 
                <el-date-picker type="date" placeholder="选择日期" v-model="myformLabelAlign.cs_duration" style="width: 200px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="接班人员：" prop="cs_Successor">
                <el-input v-model="myformLabelAlign.cs_Successor"></el-input>
            </el-form-item>
            <el-form-item label="接班时间：" prop="cs_successiontime"> 
                <el-date-picker type="date" placeholder="选择日期" v-model="myformLabelAlign.cs_successiontime" style="width: 200px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="状态：" prop="cs_state" style="display:none">
                <el-input v-model="myformLabelAlign.cs_state" style="width: 536px;" value="0"></el-input>
            </el-form-item>
            <el-form-item label="下一级办理人：" prop="nextuser">
                <el-input v-model="nextuser" placeholder="无下级办理人不填"></el-input>
            </el-form-item>
            <el-form-item label="批注内容：" prop="comment">
                <el-input type="textarea" v-model="comment" style="width: 550px;" value="0"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="cs_state" style="display:none">
                <el-input v-model="myformLabelAlign.cs_state" style="width: 536px;" value="0"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right;width: 100%;">
               <el-button type="primary" @click="addData()">提交</el-button>
            </el-form-item>
            </el-form>
            <span>历史批注内容：</span>
             <el-table
                    id="mytable"
                    ref="multipleTable"
                    :data='mycommentlist'
                    style="width: 100%"
                    >
                    <el-table-column
                    label="时间"
                    prop="time"
                    width="240">
                    </el-table-column>
                    <el-table-column
                    label="办理人"
                    prop="userId"
                    width="240">
                    </el-table-column>
                    <el-table-column
                    label="批注信息"
                    prop="fullMessage"
                    width="240">
                    </el-table-column> 
                </el-table>
         </el-dialog>
</template>
<script>
import { stringify } from 'querystring';
export default {
    name: 'banli',
     props: {
        isAdd: {
          type: Boolean,
          default: false
        },
        myformLabelAlign: {
          type: Object,
          default:function(){
            return {}
        }
        },
        mycommentlist: {
          type: Array,
          default: []
        },
        mytaskId: {
          type: String,
          default: ''
        },
        mypvminfo: {
          type: Array,
          default: []
        }
      },
    data() {
      return {
        dialog: false,
        comment: '',
        nextuser: ''
      };
    },
    methods: {
     close(){
         this.comment = '',
         this.nextuser = ''
     },
     open(defectRecord) {
        this.$confirm('你是否要保存此编辑内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.id === 0) {
             this.axios.post('/api/zsyf/addDispatchingOrder.do',defectRecord).then(res => {
                this.dialog = false
                // this.$parent.getData()
                this.$emit('handleUp',this.currPage)
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                });
              }).catch(err => {
                this.$message({
                  type: 'info',
                  message: '保存失败!'
                });
              })
              return false
              }else{
              this.axios.post('/api/zsyf/updDispatchingOrderByKey.do',defectRecord).then(res => {
                 this.dialog = false
                this.$emit('handleUp',this.currPage)
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                });
              }).catch(err => {
                this.$message({
                  type: 'info',
                  message: '保存失败!'
                });
              })
              }
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消保存'
                });          
              });
            },
      addData() {
        var parme = {}
        parme.user_name = this.$store.state.username
        parme.taskId = this.mytaskId
        parme.message = this.comment
        parme. Assignee = this.nextuser
        parme.suggest = this.mypvminfo[0]
        parme.id = this.myformLabelAlign.id
        var defectRecord = this.qs.stringify(parme)
        this.axios.post('/api/zsyf/commitTask.do',defectRecord).then(res => {
                this.$message({
                  type: 'success',
                  message: '提交成功!'
                });
                this.dialog = false
                this.$emit('getData')
              }).catch(err => {
               
              })
    }
},
   
}
</script>
<style scoped>
   
</style>
