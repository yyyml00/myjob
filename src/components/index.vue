<template>

  <el-container id="fisrt-container">
  <self ref="self"/>
  <el-header>
    <img src="../assets/img/logo1.jpg" class="logo">
    <h1>智慧水闸管理系统</h1>
    <div class="loginStatu" >
      <i class="el-icon-s-custom"></i>
      <span>欢迎：</span>
      <span>{{username}}</span>
       <el-dropdown>
       <i class="el-icon-arrow-down el-icon--right" style="color: white;"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-user" @click.native="goself()">个人中心</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-close" @click.native="logout()">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
  </el-header>
  <el-container id="second-container">
    <el-aside width="180px" id="my-aside">
        <el-menu
        :default-active="depath"
        class="el-menu-vertical-demo"
        router
        unique-opened
        background-color="#00456b"
        text-color="#fff"
        >
      <el-menu-item index="/index">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>设备管理</span>
        </template>
          <el-menu-item index="/index/zichan">固定资产统计</el-menu-item>
          <el-menu-item index="/index/weixiu">水闸维修记录</el-menu-item>
          <el-menu-item index="/index/e-file">设备电子档案</el-menu-item>
          <el-menu-item index="/index/quexian">水闸缺陷记录</el-menu-item>
          <el-menu-item index="/index/yanghu">水闸养护记录</el-menu-item>
          <el-menu-item index="/index/dayyanghu">水闸日养护记录</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-operation"></i>
          <span>运行管理</span>
        </template>
        <el-menu-item index="/index/dayxuncha">水闸日巡查</el-menu-item>
        <el-menu-item index="/index/diba">堤坝日巡查</el-menu-item>
        <el-menu-item index="/index/diaodu">水闸调度令</el-menu-item>
        <el-menu-item index="/index/jiaojieban">交接班管理</el-menu-item> 
        <!-- <el-menu-item index="/index/gzliu">流程管理</el-menu-item> -->
         <el-submenu index="1-4">
          <template slot="title">流程管理</template>
          <el-menu-item index="/index/gzliu">部署管理</el-menu-item>
          <el-menu-item index="/index/renwu">任务管理</el-menu-item>
        </el-submenu>
      </el-submenu><el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>人员管理</span>
        </template>
          <el-menu-item index="/index/userinfo">人员信息档案</el-menu-item>   
      </el-submenu> 
    </el-menu>
    </el-aside>
    <el-container>
      <el-main :class="{elmainindex:depath=='/index'}">
       <div class="tianqi">
          <el-row style="margin-top:0px;">
            <el-col :span="14"><div class="grid-content"></div></el-col>
            <el-col :span="10"><div class="grid-content">
              <iframe scrolling="no" src="https://tianqiapi.com/api.php?style=tz&skin=pitaya" frameborder="0" width="100%" height="30" allowtransparency="true"></iframe>
            </div></el-col>
          </el-row>
      </div>
      <div class="view"> 
       <transition name="main" mode="out-in">
      <router-view></router-view>
       </transition>
       </div>
      </el-main>
    </el-container>
  </el-container>
</el-container>
</template>

<script>
import self from './self'
export default {
    components:{ self },
    data() {
      return {
        username: "",
        // isCollapse: true
        depath: '/index',
      }
    },
    methods: {
      goself(){
        this.$refs.self.dialog = true
         this.$refs.self.getdata()
      }, 
      logout() {
        localStorage.removeItem("username");
        localStorage.removeItem("id");
        this.$store.commit('logout')
        console.log(this.$store.state.id)
        this.$router.push('/login')
      },
      getWeather () {
      this.axios.get('https://www.tianqiapi.com/api/?version=v1&city=合肥' ).then(function(reponse){
			}).catch(() => {})
    },
      getRouter () {
        return this.depath = this.$route.path
      }
    },
    created() {
      this.getWeather()
      this.getRouter ()
      this.username = this.$store.state.username
    },
     watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'getRouter'
  },
  
}
</script>

<style scoped>
  /* .grid-content {
        box-shadow: 0 0 20px rgb(168, 162, 162);
    } */

  .el-header{
    background-color:#00456b;
    position: relative;
    height: 10%;
    margin-bottom: 2px;
    box-shadow: 0 0 4px rgb(87, 174, 255);
  }
  .el-header > h1 {
    color: rgb(255, 255, 255);
    padding-left: 20px;
    font-size: 28px;
    width: 300px;
    float: left;
    line-height: 60px;
    /* display: inline-block; */
  }
  .el-header .loginStatu {
    /* width: 200px; */
    height: 100%;
    float: right; 
    box-sizing: border-box;
    padding-top: 20px;
    text-align: left;
    color: white;
    font-size: 14px;
  }
  /* .el-header .loginStatu i{
    
  } */
  .el-aside {
    background-color: #00456b;
    text-align: left;
    overflow: hidden;
    min-height: 600px;
  }
  .el-aside .el-menu-item{
    padding: 0 30px;
  }
  
  .el-main { 
    padding: 0px;
  }
  .elmainindex{
    /* background-color: rgb(199, 245, 243); */
    background: -webkit-radial-gradient(rgb(153, 235, 231),rgb(226, 245, 243)); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(rgb(153, 235, 231),rgb(226, 245, 243)); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(rgb(153, 235, 231),rgb(226, 245, 243)); /* Firefox 3.6 - 15 */
    background: radial-gradient(rgb(153, 235, 231),rgb(226, 245, 243)); /* 标准的语法 */
  }
  .el-main .view{
    padding: 10px;
  }
  .el-icon-user-solid {
    color: rgb(252, 252, 253);
  }
  .main-enter, .main-leave-to {
    opacity: 0;
    transform: translateY(10px);

  }
  .main-enter-active {
    transition: all 0.2s;
  }
  /* .main-leave-active {
    position: absolute;
    transition: all 0.2s;
  } */
  .tianqi {
    height: 40px;
    width: 100%;
    padding: 10px 20px;;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(228, 228, 228);
    /* background-color: rgb(121, 159, 207); */
  }
  .logo{
    height: 60px;
    position: absolute;
    left: 10px;
    width: 60px;
  }
 
 
</style>
