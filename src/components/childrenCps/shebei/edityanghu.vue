<template>
        <el-dialog :visible.sync="dialog" append-to-body width="760px" :title="isAdd ? '新增养护记录' : '编辑养护记录'">
            <el-form :inline="true" size="small" label-width="140px" :model="yformLabelAlign" ref="formLabelAlign">
            <el-form-item label="设备编号：" prop="ei_id">
                <el-input v-model="yformLabelAlign.ei_id"></el-input>
            </el-form-item>
            <el-form-item label="水闸名称：" prop="em_name">
                <el-input v-model="yformLabelAlign.em_name"></el-input>
            </el-form-item>
            <el-form-item label="养护修理实施情况：" prop="em_Implementation">
                <el-input v-model="yformLabelAlign.em_Implementation"></el-input>
            </el-form-item>
            <el-form-item label="耗用人工物料经费：" prop="em_resources">
                <el-input v-model="yformLabelAlign.em_resources"></el-input>
            </el-form-item>
            <el-form-item label="参与人员签字：" prop="em_staffsignature">
                <el-input v-model="yformLabelAlign.em_staffsignature"></el-input>
            </el-form-item>
            
            <el-form-item label="开始日期：" prop="em_runtime">
              
                <el-date-picker type="date" placeholder="选择日期" v-model="yformLabelAlign.em_runtime" style="width: 200px;"></el-date-picker>
            
            </el-form-item>
            <el-form-item label="结束日期：" prop="em_endtime">
              
                <el-date-picker type="date" placeholder="选择日期" v-model="yformLabelAlign.em_endtime" style="width: 200px;"></el-date-picker>
            
            </el-form-item>
            <el-form-item label="养护内容：" prop="em_neirong">
                <el-input type="textarea" v-model="yformLabelAlign.em_neirong" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="分管领导签字：" prop="em_leadersignature">
                <el-input type="textarea" v-model="yformLabelAlign.em_leadersignature" style="width: 200px;"></el-input>
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
    name: 'yanghu',
    props: {
        isAdd: {
          type: Boolean,
          default: false
        },
        id: {
          type: Number,
          default: 0
        },
        yformLabelAlign: {
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
            this.axios.post('/api/zsyf/addEquipmentMaintenance.do',defectRecord).then(res => {
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
         this.axios.post('/api/zsyf/updEquipmentMaintenanceByKey.do',defectRecord).then(res => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
        }).catch(err => {
          this.$message({
            type: 'info',
            message: '保存失败!'
          });
        })}
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存'
          });          
        });
      },  
      addData() {
        let id = this.$route.params.id
        var defectRecord = this.qs.stringify(this.yformLabelAlign, {
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
