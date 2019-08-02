<template>
         <el-dialog :visible.sync="dialog" append-to-body width="780px" @close="close()" :title="isAdd ? '新增水闸调度调令' : '办理任务'">
            <el-form :inline="true" ref="formLabelAlign" size="small" label-width="140px">
            <el-form-item label="调度编号：" prop="do_id">
                <el-input v-model="bformLabelAlign.do_id" readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="调度依据：" prop="do_reason">
                <el-input v-model="bformLabelAlign.do_reason" readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="调度指令：" prop="do_instructions">
                <el-input v-model="bformLabelAlign.do_instructions" readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="调度时间：" prop="do_time"> 
                <el-date-picker type="date" readonly="readonly" placeholder="选择日期" v-model="bformLabelAlign.do_time" style="width: 200px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="调度指令下达人：" prop="do_giveacommand">
                <el-input v-model="bformLabelAlign.do_giveacommand" readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="调度指令接收人：" prop="do_receivecommands">
                <el-input v-model="bformLabelAlign.do_receivecommands" readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="下一级办理人：" prop="nextuser">
                <el-input v-model="nextuser" placeholder="无下级办理人不填"></el-input>
            </el-form-item>
            <el-form-item label="批注内容：" prop="comment">
                <el-input type="textarea" v-model="comment" style="width: 550px;" value="0"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="do_state" style="display:none">
                <el-input v-model="bformLabelAlign.do_state" style="width: 536px;" value="0"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right;width: 100%;">
               <el-button type="primary" @click="addData()">提交</el-button>
            </el-form-item>
            </el-form>
            <span>历史批注内容：</span>
             <el-table
                    id="mytable"
                    ref="multipleTable"
                    :data='commentlist'
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
        bformLabelAlign: {
          type: Object,
          default:function(){
            return {}
        }
        },
        commentlist: {
          type: Array,
          default: []
        },
        taskId: {
          type: String,
          default: ''
        },
        pvminfo: {
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
            console.log(defectRecord)
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
        parme.taskId = this.taskId
        parme.message = this.comment
        parme. Assignee = this.nextuser
        parme.suggest = this.pvminfo[0]
        parme.id = this.bformLabelAlign.id
        var defectRecord = this.qs.stringify(parme)
        console.log(defectRecord)
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
