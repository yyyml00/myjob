<template>
          <el-dialog :visible.sync="dialog" append-to-body width="700px" :title="isAdd ? '新增缺陷记录' : '编辑缺陷记录'">
            <el-form  label-width="100px" :model="qformLabelAlign" ref="myform" :inline="true" size="small">
            <el-form-item label="设备编号：" prop="Ei_id">
                <el-input v-model="qformLabelAlign.ei_id"></el-input>
            </el-form-item>
           <el-form-item label="流水号：" prop="Dr_pipelinenumber">
                <el-input v-model="qformLabelAlign.dr_pipelinenumber"></el-input>
            </el-form-item>
            <el-form-item label="设备名称：" prop="Dr_name">
                <el-input v-model="qformLabelAlign.dr_name"></el-input>
            </el-form-item>
            <el-form-item label="缺陷类型：" prop="Dr_type">
                <el-input v-model="qformLabelAlign.dr_type"></el-input>
            </el-form-item>
            <el-form-item label="发现人：" prop="Dr_discoverer">
                <el-input v-model="qformLabelAlign.dr_discoverer"></el-input>
            </el-form-item>
            <el-form-item label="记录人：" prop="Dr_reportperson">
                <el-input v-model="qformLabelAlign.dr_reportperson"></el-input>
            </el-form-item>
            
            <el-form-item label="发现时间：" prop="Dr_discoverertime">
                <el-date-picker type="date" placeholder="选择日期" v-model="qformLabelAlign.dr_discoverertime" style="width: 200px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="记录时间：" prop="Dr_reporttime">
                <el-date-picker type="date" placeholder="选择日期" v-model="qformLabelAlign.dr_reporttime" style="width: 200px;"></el-date-picker>
            </el-form-item> 
            <el-form-item label="缺陷表述：" prop="Dr_content">
                <el-input type="textarea" v-model="qformLabelAlign.dr_content" style="width: 516px;"></el-input>
            </el-form-item>
            <el-form-item label="后续处理情况记录：" prop="Dr_processing">
                <el-input type="textarea" v-model="qformLabelAlign.dr_processing" style="width: 516px;"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right;width: 100%;">
               <el-button type="primary" @click="addData()">保存信息</el-button>
                <el-button @click="resetForm('myform')" type="danger">清除信息</el-button>
            </el-form-item>
            </el-form>
          </el-dialog> 
</template>
<script>
export default {
    name: 'quexian',
     props: {
        isAdd: {
          type: Boolean,
          default: false
        },
        id: {
          type: Number,
          default: 0
        },
        qformLabelAlign: {
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
             this.axios.post('/api/zsyf/addDefectRecord.do',defectRecord).then(res => {
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
             this.axios.post('/api/zsyf/updDefectRecordByKey.do', defectRecord).then(res => {
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
        var defectRecord = this.qs.stringify(this.qformLabelAlign, {
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
