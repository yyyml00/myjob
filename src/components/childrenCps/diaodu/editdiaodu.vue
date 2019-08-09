<template>
         <el-dialog :visible.sync="dialog" append-to-body width="780px" :title="isAdd ? '新增水闸调度调令' : '编辑水闸调度调令'">
            <!-- <el-form :inline="true" :model="bformLabelAlign" ref="formLabelAlign" size="small" label-width="140px">
             <el-form-item label="调度编号：" prop="do_id">
                <el-input v-model="bformLabelAlign.do_id"></el-input>
            </el-form-item> -->
            <form action="" :model="bformLabelAlign">
            <div class="bh-box">
                <span>编号：</span><input v-model="bformLabelAlign.do_id" style="width: 120px;height:20px;"/>号
            </div>
            <table border="1" width="730px" height="280px" style="text-align:center; border-collapse:collapse; border-color:black;">
            <tr>
                <td colspan="3">调度依据：</td>
                <td colspan="5"><textarea v-model="bformLabelAlign.do_reason" style="height:100px;"/></td>
            </tr>
             <tr>
                <td colspan="3" style="padding-top: 40px;">调度指令：</td>
                <td colspan="5"><textarea v-model="bformLabelAlign.do_instructions" style="height:100px;"/></td>
            </tr>
             <tr>
                <td colspan="3">调度指令下达人：</td>
                <td colspan="5"><input v-model="bformLabelAlign.do_giveacommand" style="height:38px;"/></td>
            </tr>
             <tr>
                <td colspan="3">调度指令接收人：</td>
                <td colspan="5"> <input v-model="bformLabelAlign.do_receivecommands" style="height:38px;"/>
                <input v-model="bformLabelAlign.do_state" style="width: 536px;display: none;" value="0"/>
                </td>
            </tr>
            </table>
            </form>
            <div style="text-align: right;width: 100%; margin-top: 20px;">
               <el-button type="primary" @click="addData()">保存信息</el-button>
            </div>
            <!-- </el-form> -->
         
         </el-dialog>
</template>
<script>
export default {
    name: 'diaodu',
     props: {
        isAdd: {
          type: Boolean,
          default: false
        },
        id: {
          type: Number,
          default: 0
        },
        bformLabelAlign: {
          type: Object,
          default: {}
        },
        tableData: {
          type: Array,
          tableData: []
        },
        currPage: {
          type: Number,
          currPage: 1
        }
      },
    data() {
      return {
        dialog: false,
        
      };
    },
    methods: {
     open(defectRecord) {
        this.$confirm('你是否要保存此编辑内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.id === 0) {
             this.axios.post('/api/zsyf/starDoTaskDispatchingOrder.do',defectRecord).then(res => {
                // this.$parent.getData()
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
              return false
              }else{
              this.axios.post('/api/zsyf/updDispatchingOrderByKey.do',defectRecord).then(res => {
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
        let parme = this.bformLabelAlign
        parme.user_name = this.$store.state.username
        parme.do_time = new Date()
        parme.do_state = 1
        var defectRecord = this.qs.stringify(parme, {
          serializeDate: (date) => {
          return this.moment(date).format("LLL");
        }
        })
       this.open(defectRecord)
    }
},
}
</script>
<style scoped>
   input,textarea{
     width: 100%;
     padding: 0;
     margin: 0;
     border: none;
   }
   .bh-box{
     margin-bottom: 20px;
     text-align: right;
   }
</style>
