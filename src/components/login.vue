<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">智慧水闸后台管理系统</span>
                <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="80px" class="loginForm">
                     <el-form-item label="用户名:" prop="user_name">
                        <el-input v-model="loginUser.user_name" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:" prop="user_pwd">
                        <el-input type='password' v-model="loginUser.user_pwd" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type='primary' class="submit_btn" @click="subdata()">登录</el-button>
                    </el-form-item>
                    <div class="tiparea">
                        <p>还没有账号？现在<router-link to='/register'>注册</router-link> </p>
                    </div>
                </el-form>
            </div>
        </section>
    </div>
</template>
<script>
import jwt_decode from 'jwt-decode'
export default {
    name:'login',
    data(){
        return{
            loginUser:{
                user_name:'',
                user_pwd:'',
            },
            rules:{
                user_name:[
                    {required:true,message:'请输入用户名',trigger:'blur'}
                ],
                user_pwd:[
                    {required:true,message:'密码不能为空',trigger:'blur'}
                ],
            },
            mesg: ''
        }
    },
    methods:{
        // submitForm(formName){
        //     this.$refs[formName].validate((valid) => {
        //     if (valid) {
        //         this.axios.post('/api/zsyf/login.do',this.loginUser)
        //                 .then(res=>{
        //                     console.log(res)
        //                     // //登录成功，拿到token
        //                     // const { token } = res.data;
        //                     // localStorage.setItem('eleToken',token)
        //                     // //解析token
        //                     // const decode = jwt_decode(token)
        //                     // //token存储到VueX中
        //                     // this.$store.dispatch("setAuthenticated",!this.isEmpty(decode))
        //                     // this.$store.dispatch("setUser",decode)
        //                     // this.$router.push('/index')
        //                 })
        //         }    
        //     })
        // },
        subdata(){
             var defectRecord = this.qs.stringify(this.loginUser)
            
             this.axios.post('/api/zsyf/login.do',defectRecord).then(res => {
             if (res.data.model.userbean === undefined) {
                 this.mess = res.data.model.error
                 console.log(333)
                 this.$message({
                  type: 'warning',
                  message: this.mess
             });
             return false
             }else{
                 console.log(res)
                 localStorage.setItem('username', res.data.model.userbean.user_name)
                 localStorage.setItem('id', res.data.model.userbean.id)
                 console.log(this.$store.state.id)
                 this.$store.commit('login')
                 this.$router.push('/index')
             } 
             })
        },
        isEmpty(value){
            return (
                value === undefined ||
                value === null ||
                (typeof value === 'object' && Object.keys(value).length===0) ||
                (typeof value === 'string' && value.trim().length===0)
            );
        },
    },
    created() {
        console.log(this.$store.state.username)
    }
}
</script>
<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  /* background: url(../assets/bg.jpg) no-repeat center center; */
  background-color: #0f1c29;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 50%;
  left: 34%;
  margin-top: 200px;
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
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
   border: 1px solid #409eff;
  box-shadow: 0px 5px 10px #cccc;
}
.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>
