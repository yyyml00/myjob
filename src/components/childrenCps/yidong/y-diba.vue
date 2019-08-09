<template>
    <div class="yzichan">
        <div class="title">堤坝日巡查记录</div>
        <el-form label-width="170px" label-position="top" size="small" :model="tablelist" ref="formLabelAlign">
            <el-form-item label="记录时间：" prop="dp_date">              
                <el-date-picker type="date" placeholder="选择日期" v-model="tablelist.dp_date" style="width:100%;"></el-date-picker>           
            </el-form-item>
            <el-form-item label="堤坝名称：" prop="dp_name">
                <el-input v-model="tablelist.dp_name"></el-input>
            </el-form-item>
            <el-form-item label="巡查情况：" prop="dp_situation">
                <el-radio-group v-model="tablelist.dp_situation">
                    <el-radio label="工程设施及标志无缺损，其他正常"></el-radio>
                    <el-radio label="闸管区无违章活动，工程设施无异常"></el-radio>
                    <el-radio label="堤防及相关设施经检查无异常"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="处理意见：" prop="dp_opinion">
                <el-input type="textarea" v-model="tablelist.dp_opinion"></el-input>
            </el-form-item>
            <el-form-item label="巡查人（签字）：" prop="dp_sign">
                <el-input v-model="tablelist.dp_sign"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right;width: 100%;">
               <el-button type="primary" @click="addData()">保存信息</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tablelist: {}
        }
    },
    methods: {
      open(defectRecord) {
             this.axios.post('/api/zsyf/addDikePatrol.do',defectRecord).then(res => {
                this.dialog = false
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
            },
      addData() {
        var defectRecord = this.qs.stringify(this.tablelist, {
          serializeDate: (date) => {
          return this.moment(date).format("YYYY-MM-DD");
        }
        })
       this.open(defectRecord)
    },
        fnResize() {
        var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
        if (deviceWidth >= 750) {
            deviceWidth = 750;
        }
        if (deviceWidth <= 320) {
            deviceWidth = 320;
        }
        document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px';
        }
    },
    created() {
        this.fnResize()
    }
}
</script>
<style scoped>
    .yzichan{
        text-align: left;
        margin: 0.2rem;
        font-size: 16px;
        line-height: 24px;
    }
    .title{
        font-size: 28px;
        text-align: center;
        line-height: 1rem;
        color: white;
        font-weight: 700;
        width: 100%;
        height: 1rem;
        background-color: #1d73b0;
    }
</style>
