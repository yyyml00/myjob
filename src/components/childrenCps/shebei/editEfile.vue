<template>
    <div class="addE-file">
    <h1 class="page-title">电子档案登记表</h1> 
        <el-row>
           <el-col :span="24"><div class="grid-content "> 
            

            <el-radio-group v-model="labelPosition" size="small">
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
            <el-radio-button label="top">顶部对齐</el-radio-button>
            </el-radio-group>
            <div style="margin: 20px;"></div>
            <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" id="myform" ref="formLabelAlign">
            <el-form-item label="出厂编号：" prop="ei_id">
                <el-input v-model="formLabelAlign.ei_id"></el-input>
            </el-form-item>
            <el-form-item label="防护等级：" prop="ei_protectionlevel">
                <el-input v-model="formLabelAlign.ei_protectionlevel"></el-input>
            </el-form-item>
            <el-form-item label="标准代码：" prop="ei_code">
                <el-input v-model="formLabelAlign.ei_code"></el-input>
            </el-form-item>
            <el-form-item label="制造单位：" prop="ei_company">
                <el-input v-model="formLabelAlign.ei_company"></el-input>
            </el-form-item>
            <el-form-item label="规格型号：" prop="ei_model">
                <el-input v-model="formLabelAlign.ei_model"></el-input>
            </el-form-item>
            
            <el-form-item label="生产日期：" prop="ei_date">
              
                <el-date-picker type="date" placeholder="选择日期" v-model="formLabelAlign.ei_date" style="width: 100%;"></el-date-picker>
            
            </el-form-item>
            <!-- <el-form-item label="记录时间：" prop="Dr_reporttime">
              
                <el-date-picker type="date" placeholder="选择日期" v-model="formLabelAlign.Dr_reporttime" style="width: 100%;"></el-date-picker>
            
            </el-form-item> -->
            
            <el-form-item label="主要参数：" prop="ei_parameter">
                <el-input type="textarea" v-model="formLabelAlign.ei_parameter"></el-input>
            </el-form-item>
            <el-form-item label="设备名称：" prop="ei_name">
                <el-input type="textarea" v-model="formLabelAlign.ei_name"></el-input>
            </el-form-item>
            <!-- <el-form-item label="出厂编号：" prop="El_id">
                <el-input v-model="formLabelAlign.El_id"></el-input>
            </el-form-item> -->
            </el-form>
            <el-divider></el-divider>
            <div class="handle-box">
               <el-button type="primary" @click="addData()">保存信息</el-button>
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
      },
       getData() {
        let id = this.$route.params.id
        console.log(11)
        this.axios.get('/api/zsyf/findEquipmentInformationByKey.do?id='+id).then(res => {
        console.log(res)    
        this.formLabelAlign = res.data.model.mi
        }).catch(err => {
        // this.resetForm(data)
         this.formLabelAlign = {}
      })
     }, 
      addData() {
          let id = this.$route.params.id
        var defectRecord = this.qs.stringify(this.formLabelAlign, {
          serializeDate: (date) => {
          return this.moment(date).format("YYYY-MM-DD");
        }
        })
        if(confirm('是否确定保存')){
           this.axios.post('/api/zsyf/updEquipmentInformationByKey.do',defectRecord).then(res => {
        // console.log(111)
        confirm('保存成功')
      }).catch(err => {
        // this.resetForm(data)
        confirm('保存失败')
      })
        }

    }
},
    created(){
        this.getData()
    }
    
    
}
</script>
<style scoped>
   
</style>
