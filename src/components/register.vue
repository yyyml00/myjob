<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">智慧水闸后台管理系统</span>
                <el-form :model="uformLabelAlign" :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
                    <el-form-item label="用户名" prop="user_name">
                        <el-input v-model="uformLabelAlign.user_name" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="user_pwd">
                        <el-input type='password' v-model="uformLabelAlign.user_pwd" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="user_pwd2">
                        <el-input type='password' v-model="uformLabelAlign.user_pwd2" placeholder="请再次输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="号码：" prop="user_phone">
                        <el-input v-model="uformLabelAlign.user_phone"></el-input>
                    </el-form-item>
                     <el-form-item label="邮箱：" prop="user_email">
                        <el-input v-model="uformLabelAlign.user_email"></el-input>
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
                    <el-form-item>
                        <el-button type='primary' class="submit_btn" @click="submitForm('registerForm')">立即注册</el-button>
                        <el-button type='primary' class="submit_btn" @click="gologin()" style="margin: 10px 0 0 0">返回登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name:'register',
    data(){
        var validatePass2 = (rule, value, callback) => {
            if (value !== this.uformLabelAlign.user_pwd) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return{
            uformLabelAlign:{},
            rules:{
                user_name:[
                    {required:true,message:'用户名不能为空',trigger:'blur'},
                    {min:2,max:30,message:'长度在2-30个字符之间',trigger:'blur'}
                ],
                user_pwd:[
                    {required:true,message:'密码不能为空',trigger:'blur'},
                    {min:3,max:30,message:'长度在6-30之间',trigger:'blur'}
                ],
                 user_pwd2:[
                    {required:true,message:'密码不能为空',trigger:'blur'},
                    {min:3,max:30,message:'长度在6-30之间',trigger:'blur'},
                    {validator:validatePass2,trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                // this.$http.post('/api/users/register',this.registerUser)
                //         .then(res=>{
                //             this.$message({
                //                 message:'注册成功',
                //                 type:'success'
                //             })
                //         })
                 var defectRecord = this.qs.stringify(this.uformLabelAlign, {
                    serializeDate: (date) => {
                    return this.moment(date).format("YYYY-MM-DD");
                    }
                    })
                this.axios.post('/api/zsyf/addUser.do',defectRecord).then(res => {
                this.$router.push('/login')
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
                this.$router.push('/login')
                }    
            })
        },
        gologin(){
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100px;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #409eff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.submit_btn {
  width: 100%;
}
</style>