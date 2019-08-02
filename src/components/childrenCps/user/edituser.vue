<template>
        <el-dialog :visible.sync="dialog" append-to-body width="350px" :title="isAdd ? '新增人员信息' : '编辑人员信息'">
            <el-form label-width="100px" :rules="rules" :model="uformLabelAlign" ref="uformLabelAlign" :inline="true" size="small">
            <el-form-item label="用户编号：" prop="user_id">
                <el-input v-model="uformLabelAlign.user_id"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="user_name">
                <el-input v-model="uformLabelAlign.user_name"></el-input>
            </el-form-item>
            <el-form-item label="号码：" prop="user_phone">
                <el-input v-model="uformLabelAlign.user_phone"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="user_sex">
                <el-radio-group v-model="uformLabelAlign.user_sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄：" prop="user_age">
                <el-input v-model="uformLabelAlign.user_age"></el-input>
            </el-form-item>
            <el-form-item label="地址：" prop="user_addr">
                <el-input v-model="uformLabelAlign.user_addr"></el-input>
            </el-form-item>
            <el-form-item label="所属部门：" prop="user_department">
                <el-input v-model="uformLabelAlign.user_department"></el-input>
            </el-form-item>
             <el-form-item label="职位：" prop="user_role">
                <el-input v-model="uformLabelAlign.user_role"></el-input>
            </el-form-item>  
            <el-form-item style="text-align: right;width: 100%;">
               <el-button type="primary" @click="addData()">保存信息</el-button>
                <el-button @click="resetForm('uformLabelAlign')" type="danger">清除信息</el-button>
            </el-form-item>
           </el-form>
         </el-dialog>  
</template>
<script>
export default {
    name: 'user',
     props: {
        isAdd: {
          type: Boolean,
          default: false
        },
        id: {
          type: Number,
          default: 0
        },
        uformLabelAlign: {
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
        rules: {
          user_name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
          user_id: [{ required: true, message: '用户编号不能为空', trigger: 'blur' }],
          user_sex: [{ required: true, message: '性别不能为空', trigger: 'blur' }],
          user_age: [{required: true, message: '年龄不能为空', trigger: 'blur' }],
          user_phone: [{required: true, message: '号码不能为空', trigger: 'blur' }],
          user_email: [{required: true, message: '请输入正确的邮箱地址', trigger: 'blur' },]
        }
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
           this.axios.post('/api/zsyf/addUser.do',defectRecord).then(res => {
              this.dialog = false
             this.$emit('handleUp',this.currPage)
              this.$message({
                type: 'success',
                message: '保存成功!'
              });
            }).catch(err => {
              this.$message({
                type: 'success',
                message: '保存失败!'
              });
            })
            
        }else{
          this.axios.post('/api/zsyf/updUserByKey.do',defectRecord).then(res => {
             this.dialog = false
          this.$emit('handleUp',this.currPage)
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
        }).catch(err => {
          this.$message({
            type: 'success',
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
        var defectRecord = this.qs.stringify(this.uformLabelAlign, {
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
