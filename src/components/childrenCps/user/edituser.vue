<template>
    <div class="edituser">
    <h1 class="page-title">编辑用户信息</h1> 
        <el-row>
           <el-col :span="24"><div class="grid-content "> 
            

            <el-radio-group v-model="labelPosition" size="small">
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
            <el-radio-button label="top">顶部对齐</el-radio-button>
            </el-radio-group>
            <div style="margin: 20px;"></div>
            <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" id="myform" ref="formLabelAlign">
            <el-form-item label="用户编号：" prop="user_id">
                <el-input v-model="formLabelAlign.user_id"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="user_name">
                <el-input v-model="formLabelAlign.user_name"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="user_pwd">
                <el-input v-model="formLabelAlign.user_pwd"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="user_email">
                <el-input v-model="formLabelAlign.user_email"></el-input>
            </el-form-item>
            <el-form-item label="号码：" prop="user_phone">
                <el-input v-model="formLabelAlign.user_phone"></el-input>
            </el-form-item>
            
            <el-form-item label="性别：" prop="user_sex">
                <el-radio-group v-model="formLabelAlign.user_sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            
            <el-form-item label="年龄：" prop="user_age">
                <el-input type="textarea" v-model="formLabelAlign.user_age"></el-input>
            </el-form-item>
            <el-form-item label="地址：" prop="user_addr">
                <el-input type="textarea" v-model="formLabelAlign.user_addr"></el-input>
            </el-form-item>
            <el-form-item label="所属部门：" prop="user_department">
                <el-input v-model="formLabelAlign.user_department"></el-input>
            </el-form-item>
             <el-form-item label="职位：" prop="user_role">
                <el-input v-model="formLabelAlign.user_role"></el-input>
            </el-form-item>
            </el-form>
            <el-divider></el-divider>
            <div class="handle-box">
               <el-button type="primary" @click="addData()">保存信息</el-button>
                <el-button @click="resetForm('formLabelAlign')" type="danger">清除信息</el-button>
             </div>
    </div></el-col>
    </el-row>
        
        
    </div>   
</template>
<script>
export default {
    name: 'jiform',
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
         
        }
      };
    },
    methods: {
      resetForm(formLabelAlign) {
        this.$refs[formLabelAlign].resetFields();
      },
      getData() {
        let id = this.$route.params.id
        this.axios.get('/api/zsyf/findUserByKey.do?id='+id).then(res => {
         console.log(res)
        this.formLabelAlign = res.data.model.user
        }).catch(err => {
        // this.resetForm(data)
         this.formLabelAlign = {}
      })
     }, 
      addData() {
        let id = this.$route.params.id
        var defectRecord = this.qs.stringify(this.formLabelAlign, {
          serializeDate: (date) => {
          return this.moment(date).format("YYYY-MM-DD");
        }
        })
        if(confirm('是否确定保存')){
           this.axios.post('/api/zsyf/updUserByKey.do',defectRecord).then(res => {
        // console.log(111)
        confirm('保存成功')
      }).catch(err => {
        // this.resetForm(data)
        confirm('保存失败')
      })
        }
    }
},
    created() {
        this.getData()
    }
    
}
</script>
<style scoped>
   
</style>
