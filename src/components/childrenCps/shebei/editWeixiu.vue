<template>
      <el-dialog :visible.sync="dialog" append-to-body width="780px" :title="isAdd ? '新增维修记录' : '编辑维修记录'">
            <el-form :inline="true" size="small" label-width="150px" :model="wformLabelAlign" ref="formLabelAlign">
            <el-form-item label="水闸名称" prop="r_name">
                <el-input v-model="wformLabelAlign.r_name"></el-input>
            </el-form-item>
            <!-- <el-form-item label="防护等级：" prop="R_runtime">
                <el-input v-model="formLabelAlign.R_runtime"></el-input>
            </el-form-item> -->
            <el-form-item label="修理内容：" prop="r_neirong">
                <el-input v-model="wformLabelAlign.r_neirong"></el-input>
            </el-form-item>
            <el-form-item label="养护修理实施情况：" prop="r_Implementation">
                <el-input v-model="wformLabelAlign.r_Implementation"></el-input>
            </el-form-item>
            <el-form-item label="耗用人工物料经费：" prop="r_resources">
                <el-input v-model="wformLabelAlign.r_resources"></el-input>
            </el-form-item>
            
            <el-form-item label="结束时间：" prop="r_endtime">
              
                <el-date-picker type="date" placeholder="选择日期" v-model="wformLabelAlign.r_endtime" style="width: 200px;"></el-date-picker>
            
            </el-form-item>
            <el-form-item label="开始时间：" prop="r_runtime">
              
                <el-date-picker type="date" placeholder="选择日期" v-model="wformLabelAlign.r_runtime" style="width: 200px;"></el-date-picker>
            
            </el-form-item>
            
            <el-form-item label="参与人员签字：" prop="r_staffsignature">
                <el-input type="textarea" v-model="wformLabelAlign.r_staffsignature" style="width: 565px;"></el-input>
            </el-form-item>
            <el-form-item label="分管领导签字：" prop="r_leadersignature">
                <el-input type="textarea" v-model="wformLabelAlign.r_leadersignature" style="width: 565px;"></el-input>
            </el-form-item>
            <el-form-item label="设备编号：" prop="ei_id">
                <el-input v-model="wformLabelAlign.ei_id"></el-input>
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
    name: 'weixiu',
    props: {
        isAdd: {
          type: Boolean,
          default: false
        },
        id: {
          type: Number,
          default: 0
        },
        wformLabelAlign: {
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
            this.axios.post('/api/zsyf/addRepairRecord.do',defectRecord).then(res => {
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
          }else{
             this.axios.post('/api/zsyf/updRepairRecordByKey.do',defectRecord).then(res => {
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
        var defectRecord = this.qs.stringify(this.wformLabelAlign, {
          serializeDate: (date) => {
          return this.moment(date).format("YYYY-MM-DD");
        }
        })
       this.open(defectRecord)
    },
    
},
}
</script>
<style scoped>
   
</style>
