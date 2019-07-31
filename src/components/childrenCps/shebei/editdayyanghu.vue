<template>
         <el-dialog :visible.sync="dialog" append-to-body width="780px" :title="isAdd ? '新增电子档案' : '编辑电子档案'">
            <el-form :inline="true" :model="bformLabelAlign" ref="formLabelAlign" size="small" label-width="140px">
             <el-form-item label="水闸名称：" prop="mr_name">
                <el-input v-model="bformLabelAlign.mr_name"></el-input>
            </el-form-item>
            <el-form-item label="养护日期：" prop="mr_date">
                <el-date-picker type="date" placeholder="选择日期" v-model="bformLabelAlign.mr_date" style="width: 200px;"></el-date-picker>
            </el-form-item>
            <el-form-item label="技术负责人签字：" prop="mr_technology">
                <el-input v-model="bformLabelAlign.mr_technology"></el-input>
            </el-form-item> 
            <el-row :gutter="10">
            <el-col :span="6"><div class="grid-content">项目内容</div></el-col>
            <el-col :span="12"><div class="grid-content">养护实施情况</div></el-col>
            <el-col :span="6"><div class="grid-content">养护人员签字</div></el-col>
            <el-col :span="6"><div class="grid-content">机房内保洁</div></el-col>
            <el-col :span="12"><div class="grid-content">
            <el-input v-model="bformLabelAlign.mr_cleaning"></el-input>    
            </div></el-col>
            <el-col :span="6"><div class="grid-content">
            <el-input v-model="bformLabelAlign.mr_sign_1"></el-input>   
            </div></el-col>
            <el-col :span="6"><div class="grid-content">启闭机养护</div></el-col>
            <el-col :span="12"><div class="grid-content">
            <el-input v-model="bformLabelAlign.mr_hoist" style="width: 100%;height: 100%;border: 0px"></el-input>    
            </div></el-col>
            <el-col :span="6"><div class="grid-content">
            <el-input v-model="bformLabelAlign.mr_sign_2" style="width: 100%;height: 100%;"></el-input>   
            </div></el-col>
            <el-col :span="6"><div class="grid-content">钢丝绳养护</div></el-col>
            <el-col :span="12"><div class="grid-content">
            <el-input v-model="bformLabelAlign.mr_rope" style="width: 100%;height: 100%;"></el-input>    
            </div></el-col>
            <el-col :span="6"><div class="grid-content">
            <el-input v-model="bformLabelAlign.mr_sign_3" style="width: 100%;height: 100%;"></el-input>   
            </div></el-col>
            <el-col :span="6"><div class="grid-content">电气设备养护</div></el-col>
            <el-col :span="12"><div class="grid-content">
            <el-input v-model="bformLabelAlign.mr_electric" style="width: 100%;height: 100%;"></el-input>    
            </div></el-col>
            <el-col :span="6"><div class="grid-content">
            <el-input v-model="bformLabelAlign.mr_sign_4" style="width: 100%;height: 100%;"></el-input>   
            </div></el-col>
            <el-col :span="6"><div class="grid-content">闸门养护</div></el-col>
            <el-col :span="12"><div class="grid-content">
            <el-input v-model="bformLabelAlign.mr_sluicegate" style="width: 100%;height: 100%;"></el-input>    
            </div></el-col>
            <el-col :span="6"><div class="grid-content">
            <el-input v-model="bformLabelAlign.mr_sign_5" style="width: 100%;height: 100%;"></el-input>   
            </div></el-col>
            <el-col :span="6"><div class="grid-content">闸门上下游漂浮物清除</div></el-col>
            <el-col :span="12"><div class="grid-content">
            <el-input v-model="bformLabelAlign.mr_float" style="width: 100%;height: 100%;"></el-input>    
            </div></el-col>
            <el-col :span="6"><div class="grid-content">
            <el-input v-model="bformLabelAlign.mr_sign_6" style="width: 100%;height: 100%;"></el-input>   
            </div></el-col>
            <el-col :span="6"><div class="grid-content">闸区卫生</div></el-col>
            <el-col :span="12"><div class="grid-content">
            <el-input v-model="bformLabelAlign.mr_hygiene" style="width: 100%;height: 100%;"></el-input>    
            </div></el-col>
            <el-col :span="6"><div class="grid-content">
            <el-input v-model="bformLabelAlign.mr_sign_7" style="width: 100%;height: 100%;"></el-input>   
            </div></el-col>
            <el-col :span="6"><div class="grid-content">堤防养护</div></el-col>
            <el-col :span="12"><div class="grid-content">
            <el-input v-model="bformLabelAlign.mr_dykes" style="width: 100%;height: 100%;"></el-input>    
            </div></el-col>
            <el-col :span="6"><div class="grid-content">
            <el-input v-model="bformLabelAlign.mr_sign_8" style="width: 100%;height: 100%;"></el-input>   
            </div></el-col>
            <el-col :span="6"><div class="grid-content">其他养护项目</div></el-col>
            <el-col :span="12"><div class="grid-content">
            <el-input v-model="bformLabelAlign.mr_project" style="width: 100%;height: 100%;"></el-input>    
            </div></el-col>
            <el-col :span="6"><div class="grid-content">
            <el-input v-model="bformLabelAlign.mr_sign_9" style="width: 100%;height: 100%;"></el-input>   
            </div></el-col>
            </el-row>
            
            <el-form-item style="text-align: right;width: 100%;padding-top: 10px;">
               <el-button type="primary" @click="addData()">保存信息</el-button>
                <el-button @click="resetForm('formLabelAlign')" type="danger">清除信息</el-button>
            </el-form-item>
            </el-form>
         </el-dialog>
</template>
<script>
export default {
    name: 'jiform',
     props: {
        isAdd: {
          type: Boolean,
          default: false
        },
        id: {
          type: Number,
          default: 0
        },
        bformLabelAlign: {
          type: Object,
          default: {}
        },
        tableData: {
          type: Array,
          tableData: []
        },
        currPage: {
          type: Number,
          currPage: 1
        }
      },
    data() {
      return {
        dialog: false,
      };
    },
    methods: {
      resetForm(formLabelAlign) {
        this.$refs[formLabelAlign].resetFields();
      },
     open(defectRecord) {
        this.$confirm('你是否要保存此编辑内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.id === 0) {
            console.log(defectRecord)
             this.axios.post('/api/zsyf/addMaintenanceRecords.do',defectRecord).then(res => {
                // this.$parent.getData()
                this.$emit('handleUp',this.currPage)
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                });
              }).catch(err => {
                this.$message({
                  type: 'info',
                  message: '保存失败!'
                });
              })
              return false
              }else{
              this.axios.post('/api/zsyf/updMaintenanceRecordsByKey.do',defectRecord).then(res => {
                this.$emit('handleUp',this.currPage)
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                });
              }).catch(err => {
                this.$message({
                  type: 'info',
                  message: '保存失败!'
                });
              })
              }
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消保存'
                });          
              });
            },
      addData() {
        var defectRecord = this.qs.stringify(this.bformLabelAlign, {
          serializeDate: (date) => {
          return this.moment(date).format("YYYY-MM-DD");
        }
        })
       this.open(defectRecord)
       
    }
},
}
</script>
<style scoped>
    .grid-content {
        min-height: 36px;
        text-align: left;
        padding-top: 10px;
    }
</style>
