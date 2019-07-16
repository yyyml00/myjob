<template>
    <div class="edityanghu">
    <h1 class="page-title">编辑养护记录</h1> 
        <el-row>
           <el-col :span="24"><div class="grid-content "> 
            <el-radio-group v-model="labelPosition" size="small">
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
            <el-radio-button label="top">顶部对齐</el-radio-button>
            </el-radio-group>
            <div style="margin: 20px;"></div>
            <el-form :label-position="labelPosition" label-width="140px" :model="formLabelAlign" id="myform" ref="formLabelAlign">
            <el-form-item label="设备编号：" prop="ei_id">
                <el-input v-model="formLabelAlign.ei_id"></el-input>
            </el-form-item>
            <el-form-item label="水闸名称：" prop="em_name">
                <el-input v-model="formLabelAlign.em_name"></el-input>
            </el-form-item>
            <el-form-item label="养护修理实施情况：" prop="em_Implementation">
                <el-input v-model="formLabelAlign.em_Implementation"></el-input>
            </el-form-item>
            <el-form-item label="耗用人工物料经费：" prop="em_resources">
                <el-input v-model="formLabelAlign.em_resources"></el-input>
            </el-form-item>
            <el-form-item label="参与人员签字：" prop="em_staffsignature">
                <el-input v-model="formLabelAlign.em_staffsignature"></el-input>
            </el-form-item>
            
            <el-form-item label="开始日期：" prop="em_runtime">
              
                <el-date-picker type="date" placeholder="选择日期" v-model="formLabelAlign.em_runtime" style="width: 100%;"></el-date-picker>
            
            </el-form-item>
            <el-form-item label="结束日期：" prop="em_endtime">
              
                <el-date-picker type="date" placeholder="选择日期" v-model="formLabelAlign.em_endtime" style="width: 100%;"></el-date-picker>
            
            </el-form-item>
            <el-form-item label="养护内容：" prop="em_neirong">
                <el-input type="textarea" v-model="formLabelAlign.em_neirong"></el-input>
            </el-form-item>
            <el-form-item label="分管领导签字：" prop="em_leadersignature">
                <el-input type="textarea" v-model="formLabelAlign.em_leadersignature"></el-input>
            </el-form-item>
            
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
        this.axios.get('/api/zsyf/findEquipmentMaintenanceByKey.do?id='+id).then(res => {
         console.log(res)
        this.formLabelAlign = res.data.model.em
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
           this.axios.post('/api/zsyf/updEquipmentMaintenanceByKey.do',defectRecord).then(res => {
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
