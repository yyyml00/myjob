<template>
         <el-dialog :visible.sync="dialog" append-to-body width="780px" :title="isAdd ? '新增水闸调度调令' : '编辑水闸调度调令'">
            <el-form :inline="true" :model="bformLabelAlign" ref="formLabelAlign" size="small" label-width="140px">
            <el-form-item label="本班运行时间：" prop="cs_runningtime">
                <el-input v-model="bformLabelAlign.cs_runningtime"></el-input>
            </el-form-item>
            <el-form-item label="当班人员：" prop="cs_dutypersonnel">
                <el-input v-model="bformLabelAlign.cs_dutypersonnel"></el-input>
            </el-form-item>
            <el-form-item label="交班时间：" prop="cs_duration"> 
                <el-input v-model="bformLabelAlign.cs_duration" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="接班人员：" prop="cs_Successor">
                <el-input v-model="bformLabelAlign.cs_Successor"></el-input>
            </el-form-item>
            <el-form-item label="接班时间：" prop="cs_successiontime"> 
                <el-input  v-model="bformLabelAlign.cs_successiontime"  style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="cs_state" style="display:none">
                <el-input v-model="bformLabelAlign.cs_state" style="width: 536px;" value="0"></el-input>
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
        value1: '',
        value3: ''
        
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
             this.axios.post('/api/zsyf/starDoTaskChangeShifts.do',defectRecord).then(res => {
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
              this.axios.post('/api/zsyf/updChangeShiftsyKey.do',defectRecord).then(res => {
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
        parme.cs_state = 1
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
   
</style>
