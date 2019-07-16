<template>
    <div class="form">
    <h1 class="page-title">日巡查登记记录</h1> 
      
        <el-row>
           <el-col :span="24"><div class="grid-content "> 
            

            <el-radio-group v-model="labelPosition" size="small">
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
            <el-radio-button label="top">顶部对齐</el-radio-button>
            </el-radio-group>
            <div style="margin: 20px;"></div>
            <el-form :label-position="labelPosition" label-width="170px" :model="formLabelAlign" id="myform" ref="formLabelAlign">
            <el-form-item label="记录时间：" prop="I_date">              
                <el-date-picker type="date" placeholder="选择日期" v-model="formLabelAlign.I_date" style="width: 100%;"></el-date-picker>           
            </el-form-item>
            <el-form-item label="水闸名称：" prop="I_name">
                <el-input type="textarea" v-model="formLabelAlign.I_name"></el-input>
            </el-form-item>
            <el-form-item label="工程设施完好情况：" prop="I_facilities">
                <el-input type="textarea" v-model="formLabelAlign.I_facilities"></el-input>
            </el-form-item>
            <el-form-item label="闸门位置有无振动：" prop="I_shock">
                <el-input type="textarea" v-model="formLabelAlign.I_shock"></el-input>
            </el-form-item>
            <el-form-item label="过闸水流形态：" prop="I_flowpattern">
                <el-input v-model="formLabelAlign.I_flowpattern"></el-input>
            </el-form-item>
             <el-form-item label="闸区环境卫生情况：" prop="I_hygiene">
                <el-input v-model="formLabelAlign.I_hygiene"></el-input>
            </el-form-item>
             <el-form-item label="自动监控系统是否正常：" prop="I_monitor">
                <el-input v-model="formLabelAlign.I_monitor"></el-input>
            </el-form-item>
             <el-form-item label="违章情况：" prop="I_violation">
                <el-input v-model="formLabelAlign.I_violation"></el-input>
            </el-form-item>
             <el-form-item label="其它检查情况：" prop="I_other">
                <el-input v-model="formLabelAlign.I_other"></el-input>
            </el-form-item>
             <el-form-item label="巡查人签字：" prop="I_inspectorsignature">
                <el-input v-model="formLabelAlign.I_inspectorsignature"></el-input>
            </el-form-item>
             <el-form-item label="备注：" prop="I_remarks">
                <el-input v-model="formLabelAlign.I_remarks"></el-input>
            </el-form-item>
            
            </el-form>
            <el-divider></el-divider>
            <div class="handle-box">
               <el-button type="primary">保存信息</el-button>
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
      }
    }
    
}
</script>
<style scoped>
   
</style>
