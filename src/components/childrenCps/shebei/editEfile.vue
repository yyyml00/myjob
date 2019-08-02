<template>
         <el-dialog :visible.sync="dialog" append-to-body width="740px" :title="isAdd ? '新增电子档案' : '编辑电子档案'">
            <el-form :inline="true" :model="bformLabelAlign" ref="formLabelAlign" size="small" label-width="120px">
             <el-form-item label="生产日期：" prop="ei_date">             
                <el-date-picker type="date" placeholder="选择日期" v-model="bformLabelAlign.ei_date" style="width: 200px;"></el-date-picker>    
            </el-form-item>
            <el-form-item label="设备名称：" prop="ei_name">
                <el-input v-model="bformLabelAlign.ei_name"></el-input>
            </el-form-item>
            <el-form-item label="出厂编号：" prop="ei_id">
                <el-input v-model="bformLabelAlign.ei_id"></el-input>
            </el-form-item>
            <el-form-item label="防护等级：" prop="ei_protectionlevel">
                <el-input v-model="bformLabelAlign.ei_protectionlevel"></el-input>
            </el-form-item>
            <el-form-item label="标准代码：" prop="ei_code">
                <el-input v-model="bformLabelAlign.ei_code"></el-input>
            </el-form-item>
            <el-form-item label="制造单位：" prop="ei_company">
                <el-input v-model="bformLabelAlign.ei_company"></el-input>
            </el-form-item>
            <el-form-item label="规格型号：" prop="ei_model">
                <el-input v-model="bformLabelAlign.ei_model"></el-input>
            </el-form-item>
            <el-form-item label="设备组：" prop="ei_group">
                <el-input v-model="bformLabelAlign.ei_group"></el-input>
            </el-form-item>  
            <el-form-item label="主要参数：" prop="ei_parameter">
                <el-input type="textarea" v-model="bformLabelAlign.ei_parameter" style="width: 536px;"></el-input>
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
             this.axios.post('/api/zsyf/addEquipmentInformation.do',defectRecord).then(res => {
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
              this.axios.post('/api/zsyf/updEquipmentInformationByKey.do',defectRecord).then(res => {
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
        var defectRecord = this.qs.stringify(this.bformLabelAlign, {
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
