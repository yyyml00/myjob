<template>
    <div class="addquexian">
    <h1 class="page-title">设备缺陷登记记录</h1> 
        <el-row>
           <el-col :span="24"><div class="grid-content "> 
            

            <el-radio-group v-model="labelPosition" size="small">
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
            <el-radio-button label="top">顶部对齐</el-radio-button>
            </el-radio-group>
            <div style="margin: 20px;"></div>
            <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" id="myform" ref="formLabelAlign">
            <el-form-item label="流水号：" prop="Dr_pipelinenumber">
                <el-input v-model="formLabelAlign.Dr_pipelinenumber"></el-input>
            </el-form-item>
            <el-form-item label="设备名称：" prop="Dr_name">
                <el-input v-model="formLabelAlign.Dr_name"></el-input>
            </el-form-item>
            <el-form-item label="缺陷类型：" prop="Dr_type">
                <el-input v-model="formLabelAlign.Dr_type"></el-input>
            </el-form-item>
            <el-form-item label="发现人：" prop="Dr_discoverer">
                <el-input v-model="formLabelAlign.Dr_discoverer"></el-input>
            </el-form-item>
            <el-form-item label="记录人：" prop="Dr_reportperson">
                <el-input v-model="formLabelAlign.Dr_reportperson"></el-input>
            </el-form-item>
            
            <el-form-item label="发现时间：" prop="Dr_discoverertime">
              
                <el-date-picker type="date" placeholder="选择日期" v-model="formLabelAlign.Dr_discoverertime" style="width: 100%;"></el-date-picker>
            
            </el-form-item>
            <el-form-item label="记录时间：" prop="Dr_reporttime">
              
                <el-date-picker type="date" placeholder="选择日期" v-model="formLabelAlign.Dr_reporttime" style="width: 100%;"></el-date-picker>
            
            </el-form-item>
            
            <el-form-item label="缺陷表述：" prop=" Dr_content">
                <el-input type="textarea" v-model="formLabelAlign. Dr_content"></el-input>
            </el-form-item>
            <el-form-item label="后续处理情况记录：" prop="Dr_processing">
                <el-input type="textarea" v-model="formLabelAlign.Dr_processing"></el-input>
            </el-form-item>
            <el-form-item label="设备编号：" prop="El_id">
                <el-input v-model="formLabelAlign.El_id"></el-input>
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
          Dr_pipelinenumber: '',
          Dr_name: '',
          Dr_type: '',
          Dr_content: '',
          Dr_discoverer: '',
         Dr_discoverertime: '',
          Dr_reportperson: '',
          Dr_reporttime: '',
          Dr_processing: '',
          El_id: ''
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
