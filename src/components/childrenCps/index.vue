<template>
   <div id="index">
    <el-row :gutter="6">
    <el-col :span="14"><div class="grid-content left">
    <el-row>
    <el-col :span="24"><div class="grid-content bg-blue"></div></el-col>
    <el-col :span="24"><div class="grid-content bg-red"></div></el-col>
    </el-row>      
    </div></el-col>
    <el-col :span="10"><div class="grid-content right">
    <el-row :gutter="6">
    <el-col :span="12"><div class="grid-content bg-blue"></div></el-col>
    <el-col :span="12"><div class="grid-content bg-red"></div></el-col>
    <el-col :span="12"><div class="grid-content bg-blue"></div></el-col>
    <el-col :span="12"><div class="grid-content bg-red"></div></el-col>
    <el-col :span="24"><div class="grid-content bg-blue"></div></el-col>
    <el-col :span="12"><div class="grid-content bg-red"></div></el-col>
    <el-col :span="12"><div class="grid-content bg-blue"></div></el-col>
    </el-row>
    </div></el-col>
    </el-row>   
    </div> 
</template>
<script>
export default {
    name: 'index',
      
}
</script>
<style scoped>
    .bg-blue{
        background-color: #e57373;
        margin-bottom: 6px;
    }
     .bg-red{
        background-color: #ba68c8;
        margin-bottom: 6px;
    }
    .left .bg-blue,.left .bg-red{
        height: 300px;
        
    }
    .right .bg-blue,.right .bg-red{
        height: 147px;
    }
</style>
