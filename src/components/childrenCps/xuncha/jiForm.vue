<template>
    <div class="form">
        <el-row>
           <el-col :span="24"><div class="grid-content "> 
            

            <el-form ref="form" :model="form" label-width="170px">
                    <el-form-item label="水闸名称">
                        <el-input type="text" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="选择记录时间">
                    <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    </el-form-item>
                    <el-form-item label="工程设施完好情况">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="闸门位置，有无振动">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="过闸水流形态">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="闸区环境卫生情况">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="自动监控系统仪表，显示器显示是否正常">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="违章情况">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="其他检查情况">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="检查人签字">
                        <el-input type="text" v-model="form.desc"></el-input>
                    </el-form-item>
            </el-form> 
    </div></el-col>
    </el-row>
        
        
    </div>   
</template>
<script>
export default {
    name: 'jiform',
    data() {
        return {
            form: {
                desc: ''
            }
        }
    }
    
}
</script>
<style scoped>
    .el-form-item__label {
        background-color: aqua;
    } 
    .el-textarea__inner {
        background-color: aqua;
    }
</style>
