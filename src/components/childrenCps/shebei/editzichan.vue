<template>
         <el-dialog :visible.sync="dialog" append-to-body width="740px" :title="isAdd ? '新增固定资产' : '编辑固定资产'">
            <el-form :inline="true" :model="bformLabelAlign" ref="formLabelAlign" size="small" label-width="120px">
            <el-form-item label="资产编号：" prop="fa_id">
                <el-input v-model="bformLabelAlign.fa_id"></el-input>
            </el-form-item>
            <el-form-item label="资产名称：" prop="fa_name">
                <el-input v-model="bformLabelAlign.fa_name"></el-input>
            </el-form-item>
            <el-form-item label="实有数量/面积：" prop="fa_exnumber">
                <el-input v-model="bformLabelAlign.fa_exnumber"></el-input>
            </el-form-item>
            <el-form-item label="实有原值：" prop="fa_value">
                <el-input v-model="bformLabelAlign.fa_value"></el-input>
            </el-form-item>
            <el-form-item label="盘点结果：" prop="fa_result">
                <el-input v-model="bformLabelAlign.fa_result"></el-input>
            </el-form-item>
            <el-form-item label="使用状况：" prop="fa_situation">
                <el-input v-model="bformLabelAlign.fa_situation"></el-input>
            </el-form-item>
            <el-form-item label="账面数量/面积：" prop="fa_bknumber">
                <el-input v-model="bformLabelAlign.fa_bknumber"></el-input>
            </el-form-item>
            <el-form-item label="账面价值：" prop="fa_bookvalue">
                <el-input v-model="bformLabelAlign.fa_bookvalue"></el-input>
            </el-form-item>
             <el-form-item label="规格型号：" prop="fa_model">
                <el-input v-model="bformLabelAlign.fa_model"></el-input>
            </el-form-item>
            <el-form-item label="使用部门：" prop="fa_department">
                <el-input v-model="bformLabelAlign.fa_department"></el-input>
            </el-form-item>
            <el-form-item label="使用人：" prop="fa_people">
                <el-input v-model="bformLabelAlign.fa_people"></el-input>
            </el-form-item>
            <el-form-item label="存放地点：" prop="fa_addr">
                <el-input v-model="bformLabelAlign.fa_addr"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right;width: 100%;">
               <el-button type="primary" @click="addData()">保存信息</el-button>
                <el-button @click="resetform('formLabelAlign')" type="danger">清除信息</el-button>
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
      resetform(formLabelAlign) {
        this.$refs[formLabelAlign].resetfields();
      },
     open(defectRecord) {
        this.$confirm('你是否要保存此编辑内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.id === 0) {
            console.log(defectRecord)
             this.axios.post('/api/zsyf/addFixedAssets.do',defectRecord).then(res => {
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
              this.axios.post('/api/zsyf/updFixedAssetsByKey.do',defectRecord).then(res => {
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
