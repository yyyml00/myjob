<template>
    <el-dialog :visible.sync="dialog" append-to-body width="780px" :title="isAdd ? '新增堤坝日巡查记录' : '编辑堤坝日巡查记录'">
        <el-form label-width="130px" :inline="true" size="small" :model="xformLabelAlign" ref="formLabelAlign">
            <el-form-item label="记录时间：" prop="dp_date">              
                <el-date-picker type="date" placeholder="选择日期" v-model="xformLabelAlign.dp_date" style="width: 200px;"></el-date-picker>           
            </el-form-item>
            <el-form-item label="堤坝名称：" prop="dp_name">
                <el-input v-model="xformLabelAlign.dp_name"></el-input>
            </el-form-item>
            <el-form-item label="巡查情况：" prop="dp_situation">
                <el-input type="textarea" v-model="xformLabelAlign.dp_situation" style="width: 540px;"></el-input>
            </el-form-item>
            <el-form-item label="处理意见：" prop="dp_opinion">
                <el-input type="textarea" v-model="xformLabelAlign.dp_opinion" style="width: 540px;"></el-input>
            </el-form-item>
            <el-form-item label="巡查人（签字）：" prop="dp_sign">
                <el-input v-model="xformLabelAlign.dp_sign"></el-input>
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
             this.axios.post('/api/zsyf/addDikePatrol.do',defectRecord).then(res => {
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
              this.axios.post('/api/zsyf/updDikePatrolByKey.do',defectRecord).then(res => {
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
