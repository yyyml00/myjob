<template>
  <el-container>
  <el-header>
    <h1>水库管理系统</h1>
    <div class="loginStatu">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">

        <el-menu-item index="1" ><i class="el-icon-user-solid"></i>已登录</el-menu-item>
        <el-menu-item index="2" >个人中心</el-menu-item>
        <el-menu-item index="3" >退出登录</el-menu-item>

        </el-menu>
    </div>
  </el-header>
  <el-container >
    <el-aside width="200px">
        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff">
        <router-link to="/index">
        <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
        </el-menu-item>
        </router-link>
         <el-submenu index="1">
        <template slot="title">
        <i class="el-icon-location"></i>
        <span>设备管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">设备维修记录</el-menu-item>
          <el-menu-item index="1-2">设备电子档案</el-menu-item>
          <el-menu-item index="1-3">设备缺陷登记</el-menu-item>
          <el-menu-item index="1-4">设备养护记录</el-menu-item>
        </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
        <template slot="title">
        <i class="el-icon-location"></i>
        <span>人员管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="/index/userinfo">
            <el-menu-item index="3-1">用户信息档案</el-menu-item>
          </router-link>
          <router-link to="/index/jiform">
          <el-menu-item index="3-2">日巡查记录信息</el-menu-item>
          </router-link>
        </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
        <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
        <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        </el-submenu>
        </el-menu>
    </el-aside>
    <el-container>
      <el-main>
      <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</el-container>
</template>

<script>



export default {

    data() {
      return {
        activeIndex2:''
      }
    },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* .grid-content {
        box-shadow: 0 0 20px rgb(168, 162, 162);
    } */

  .el-header{
    background-color: #545c64;
    height: 60px;
    line-height: 60px;
    margin-bottom: 6px;
    box-shadow: 0 0 4px #545c64;
  }
  .el-header > h1 {
    color: rgb(255, 255, 255);
    width: 200px;
    float: left;
    /* display: inline-block; */
  }
  .el-header > div {
    /* width: 200px; */
    height: 100%;
    float: right;
    
  }
  
  .el-aside {
    background-color: #D3DCE6;
    text-align: left;
    min-height: 600px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    min-height: 600px;
  }
  .el-icon-user-solid {
    color: rgb(252, 252, 253);
  }
  


 
</style>
