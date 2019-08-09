<template>
    <div class="yzichan">
        <div class="title">水闸日巡查记录</div>
         <el-form label-width="170px" label-position="top" size="small" :model="tablelist" ref="formLabelAlign">
            <el-form-item label="记录时间：" prop="i_date">              
                <el-date-picker type="date" placeholder="选择日期" v-model="tablelist.i_date" style="width:100%;"></el-date-picker>           
            </el-form-item>
            <el-form-item label="水闸名称：" prop="i_name">
                <el-select v-model="tablelist.i_name" placeholder="请选择水闸名称"  style="width:100%;">
                <el-option label="阜阳一闸" value="阜阳一闸"></el-option>
                <el-option label="阜阳二闸" value="阜阳二闸"></el-option>
                <el-option label="阜阳三闸" value="阜阳三闸"></el-option>
                <el-option label="阜阳四闸" value="阜阳四闸"></el-option>
                <el-option label="阜阳五闸" value="阜阳五闸"></el-option>
                <el-option label="阜阳六闸" value="阜阳六闸"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工程设施完好情况：" prop="i_facilities">
                 <el-radio-group v-model="tablelist.i_facilities">
                    <el-radio label="工程完好，无异常"></el-radio>
                    <el-radio label="工程损坏严重，需要及时处理"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="闸门位置有无振动：" prop="i_shock">
                <el-radio-group v-model="tablelist.i_shock">
                    <el-radio label="有"></el-radio>
                    <el-radio label="没有"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="过闸水流形态：" prop="i_flowpattern">
                 <el-radio-group v-model="tablelist.i_flowpattern">
                    <el-radio label="水流速度过快"></el-radio>
                    <el-radio label="水流速度缓慢"></el-radio>
                </el-radio-group>
            </el-form-item>
             <el-form-item label="闸区环境卫生情况：" prop="i_hygiene">
                  <el-radio-group v-model="tablelist.i_hygiene">
                    <el-radio label="卫生情况良好"></el-radio>
                    <el-radio label="卫生较差"></el-radio>
                </el-radio-group>
            </el-form-item>
             <el-form-item label="自动监控系统是否正常：" prop="i_monitor">
                 <el-radio-group v-model="tablelist.i_monitor">
                    <el-radio label="正常"></el-radio>
                    <el-radio label="不正常"></el-radio>
                </el-radio-group>
            </el-form-item>
             <el-form-item label="其它检查情况：" prop="i_other">
                <el-input type="textarea" v-model="tablelist.i_other"></el-input>
            </el-form-item>
             <el-form-item label="违章情况：" prop="i_violation">
                <el-input v-model="tablelist.i_violation"></el-input>
            </el-form-item>
             <el-form-item label="巡查人签字：" prop="i_inspectorsignature">
                <el-input v-model="tablelist.i_inspectorsignature"></el-input>
            </el-form-item>
             <el-form-item label="备注：" prop="i_remarks">
                <el-input type="textarea" v-model="tablelist.i_remarks"></el-input>
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
             this.axios.post('/api/zsyf/addinspectionRecords.do',defectRecord).then(res => {
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
        line-height: 18px;
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
