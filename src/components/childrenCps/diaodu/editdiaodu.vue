<template>
         <el-dialog :visible.sync="dialog" append-to-body width="780px" :title="isAdd ? '新增水闸调度调令' : '编辑水闸调度调令'">
            <el-form :inline="true" :model="bformLabelAlign" ref="formLabelAlign" size="small" label-width="140px">
            <el-form-item label="调度编号：" prop="do_id">
                <el-input v-model="bformLabelAlign.do_id"></el-input>
            </el-form-item>
            <el-form-item label="调度依据：" prop="do_reason">
                <el-input v-model="bformLabelAlign.do_reason"></el-input>
            </el-form-item>
            <el-form-item label="调度指令：" prop="do_instructions">
                <el-input v-model="bformLabelAlign.do_instructions"></el-input>
            </el-form-item>
            <el-form-item label="调度指令下达人：" prop="do_giveacommand">
                <el-input v-model="bformLabelAlign.do_giveacommand"></el-input>
            </el-form-item>
            <el-form-item label="调度指令接收人：" prop="do_receivecommands">
                <el-input v-model="bformLabelAlign.do_receivecommands"></el-input>
            </el-form-item>
            <el-form-item label="调度时间：" prop="do_time"> 
                <el-date-picker type="date" placeholder="选择日期" v-model="bformLabelAlign.do_time" style="width: 200px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="状态：" prop="do_state" style="display:none">
                <el-input v-model="bformLabelAlign.do_state" style="width: 536px;" value="0"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right;width: 100%;">
               <el-button type="primary" @click="addData()">保存信息</el-button>
                <el-button @click="resetForm('formLabelAlign')" type="danger">清除信息</el-button>
            </el-form-item>
            </el-form>
         </el-dialog>
</template>
<script>
export default {
    name: 'jiform',
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
      resetForm(formLabelAlign) {
        this.$refs[formLabelAlign].resetFields();
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
        var defectRecord = this.qs.stringify(this.bformLabelAlign, {
          serializeDate: (date) => {
          return this.moment(date).format("YYYY-MM-DD");
        }
        })
       this.open(defectRecord)
       console.log(defectRecord)
    }
},
}
</script>
<style scoped>
   
</style>
