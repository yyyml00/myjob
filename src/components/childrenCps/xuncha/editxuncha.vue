<template>
    <el-dialog :visible.sync="dialog" append-to-body width="840px" :title="isAdd ? '新增水闸日巡查记录' : '编辑水闸日巡查记录'">
        <el-form label-width="170px" :inline="true" size="small" :model="xformLabelAlign" ref="formLabelAlign">
            <el-form-item label="记录时间：" prop="i_date">              
                <el-date-picker type="date" placeholder="选择日期" v-model="xformLabelAlign.i_date" style="width: 200px;"></el-date-picker>           
            </el-form-item>
            <el-form-item label="水闸名称：" prop="i_name">
                <el-input v-model="xformLabelAlign.i_name"></el-input>
            </el-form-item>
            <el-form-item label="工程设施完好情况：" prop="i_facilities">
                <el-input type="textarea" v-model="xformLabelAlign.i_facilities" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="闸门位置有无振动：" prop="i_shock">
                <el-input type="textarea" v-model="xformLabelAlign.i_shock" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="过闸水流形态：" prop="i_flowpattern">
                <el-input type="textarea" v-model="xformLabelAlign.i_flowpattern" style="width: 200px;"></el-input>
            </el-form-item>
             <el-form-item label="闸区环境卫生情况：" prop="i_hygiene">
                <el-input  type="textarea" v-model="xformLabelAlign.i_hygiene" style="width: 200px;"></el-input >
            </el-form-item>
             <el-form-item label="自动监控系统是否正常：" prop="i_monitor">
                <el-input type="textarea" v-model="xformLabelAlign.i_monitor" style="width: 200px;"></el-input>
            </el-form-item>
             <el-form-item label="其它检查情况：" prop="i_other">
                <el-input type="textarea" v-model="xformLabelAlign.i_other" style="width: 200px;"></el-input>
            </el-form-item>
             <el-form-item label="违章情况：" prop="i_violation">
                <el-input v-model="xformLabelAlign.i_violation"></el-input>
            </el-form-item>
             <el-form-item label="巡查人签字：" prop="i_inspectorsignature">
                <el-input v-model="xformLabelAlign.i_inspectorsignature"></el-input>
            </el-form-item>
             <el-form-item label="备注：" prop="i_remarks">
                <el-input type="textarea" v-model="xformLabelAlign.i_remarks" style="width: 585px;"></el-input>
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
    name: 'xuncha',
    props: {
        isAdd: {
          type: Boolean,
          default: false
        },
        id: {
          type: Number,
          default: 0
        },
        xformLabelAlign: {
          type: Object,
          default: {}
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
             this.axios.post('/api/zsyf/addinspectionRecords.do',defectRecord).then(res => {
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
              this.axios.post('/api/zsyf/updInspectionRecordsByKey.do',defectRecord).then(res => {
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
        var defectRecord = this.qs.stringify(this.xformLabelAlign, {
          serializeDate: (date) => {
          return this.moment(date).format("YYYY-MM-DD");
        }
        })
       this.open(defectRecord)
    }
},
}
</script>
<style scoped>
   
</style>
