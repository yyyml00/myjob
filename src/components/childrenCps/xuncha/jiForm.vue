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
            <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" id="myform" ref="formLabelAlign">
            <el-form-item label="巡查时间：" prop="date">
              
                <el-date-picker type="date" placeholder="选择日期" v-model="formLabelAlign.date" style="width: 100%;"></el-date-picker>
            
            </el-form-item>
            
            <el-form-item label="巡查情况：" prop="name">
                <el-input type="textarea" v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="处理意见：" prop="region">
                <el-input type="textarea" v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item label="巡查人签字：" prop="type">
                <el-input v-model="formLabelAlign.type"></el-input>
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
          date: '',
          name: '',
          region: '',
          type: ''
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
