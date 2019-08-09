<template>
   <div id="index">
    <el-row :gutter="6">
    <el-col :span="14"><div class="grid-content left">
    <el-row>
    <el-col :span="24"><div class="grid-content bg-bluedeep">
     <el-tabs v-model="activeName" @tab-click="handleClick" id="mytabs">
        <el-tab-pane label="闸门" name="first">闸门</el-tab-pane>
        <el-tab-pane label="左荷重" name="second">左荷重</el-tab-pane>
        <el-tab-pane label="右荷重" name="third">右荷重</el-tab-pane>
        <el-tab-pane label="闸门开度" name="fourth">闸门开度</el-tab-pane>
        <el-tab-pane label="给定开度" name="five">给定开度</el-tab-pane>
    </el-tabs>   
    </div></el-col>
    <el-col :span="24"><div class="grid-content bg-red"></div></el-col>
    </el-row>      
    </div></el-col>
    <el-col :span="10"><div class="grid-content right">
    <el-row :gutter="6">
    <el-col :span="12"><div class="grid-content bg-blue">
      <div class="fl-left"><i class="icon el-icon-setting"></i></div>
      <div class="fl-right">
          <div class="count">0</div>
          <div class="text">设备数量</div>
      </div>    
    </div></el-col>
    <el-col :span="12"><div class="grid-content bg-blue">
       <div class="fl-left"><i class="icon el-icon-edit"></i></div>
        <div class="fl-right">
            <div class="count">0</div>
            <div class="text">检修记录</div>
        </div>    
    </div></el-col>
    <el-col :span="12"><div class="grid-content bg-red">
       <div class="fl-left"><i class="icon el-icon-refresh"></i></div>
      <div class="fl-right">
          <div class="count">0</div>
          <div class="text">日常巡检</div>
      </div>   
    </div></el-col>
    <el-col :span="12"><div class="grid-content bg-red">
        <div class="fl-left"><i class="icon el-icon-s-operation"></i></div>
      <div class="fl-right">
          <div class="count">0</div>
          <div class="text">交接班管理</div>
      </div>  
    </div></el-col>
    <el-col :span="12"><div class="grid-content bg-orange">
        <div class="fl-left"><i class="icon el-icon-folder-opened"></i></div>
        <div class="fl-right">
            <div class="count">0</div>
            <div class="text">待办事务</div>
        </div> 
    </div></el-col>
    <el-col :span="12"><div class="grid-content bg-orange">
        <div class="fl-left"><i class="icon el-icon-tickets"></i></div>
        <div class="fl-right">
            <div class="count">0</div>
            <div class="text">命令票</div>
        </div> 
    </div></el-col>
    <el-col :span="12"><div class="grid-content deep-bule">
        <div class="fl-left"><i class="icon el-icon-edit-outline"></i></div>
        <div class="fl-right">
            <div class="count">0</div>
            <div class="text">堤坝巡查记录</div>
        </div> 
    </div></el-col>
    <el-col :span="12"><div class="grid-content deep-bule">
        <div class="fl-left"><i class="icon el-icon-coin"></i></div>
        <div class="fl-right">
            <div class="count">0</div>
            <div class="text">固定资产</div>
        </div> 
    </div></el-col>
    </el-row>
    </div></el-col>
    </el-row>   
    </div> 
</template>
<script>
export default {
    name: 'index',
    data() {
        return{
          activeName: 'first',  
        }
    },
     methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
      
}
</script>
<style scoped>
    /* .grid-content {
        padding: 20px 10px;
        box-sizing: border-box;
    } */
    /* #index {
        background-color: #bff0ee;
        width: 100%;
        height: 100%;
    } */
    .bg-blue{
        background-color: #1b99af;
        margin-bottom: 6px;
    }
    .bg-orange{
        background-color: #f07e24;
        margin-bottom: 6px;
    }
     .bg-red{
        background-color: #bb1a47;
        margin-bottom: 6px;
    }
    .deep-bule {
        background-color: #1d73b0;
        margin-bottom: 6px;
    }
    .bg-bluedeep {
        background-color: #114a87;
        color: white;
        margin-bottom: 6px;
        text-align: left;
        padding:0 20px;
    }
    .left .bg-bluedeep,.left .bg-red{
        height: 300px;
        
    }
    .right .bg-blue,.right .bg-red,.right .deep-bule,.right .bg-orange{
        height: 147px;
    }
    .icon{
        font-size: 50px;
        color: white;
        padding: 20px 0 0 20px;
    }
    .fl-left{
        float: left;
        text-align: left;
    }
    .fl-right{
        float: right;
        text-align: right;
    }
    .count {
        font-size: 30px;
        color: white;
        padding: 30px 20px 30px 0;
    }
    .text {
        font-size: 16px;
        color: white;
        padding:10px 20px 0 0;
    }
</style>
