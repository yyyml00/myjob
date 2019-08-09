<template>
         <el-dialog :visible.sync="dialog" append-to-body width="1200px" title="设备缺陷记录">
              <el-table
                    id="mytable"
                    ref="multipleTable"
                    :data="qxtableData"
                    style="width: 100%"
                    >
                    <el-table-column
                    label="设备编号"
                    prop="ei_id"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="流水号"
                    prop="dr_pipelinenumber"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="设备名称"
                    prop="dr_name"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="缺陷类型"
                    prop="dr_type"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="缺陷表述"
                    prop="dr_content"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="发现人"
                    prop="dr_discoverer"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="发现时间"
                    prop="dr_discoverertime"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="记录人"
                    prop="dr_reportperson"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="记录时间"
                    prop="dr_reporttime"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="后续处理情况记录"
                    prop="dr_processing"
                    width="140">
                    </el-table-column>
                </el-table>
         </el-dialog>
</template>
<script>
export default {
    name: 'e-weixiu',
     props: {
        qxid: {
          type: String,
           default: ""
        }
      },
    data() {
      return {
        dialog: false,
        qxtableData: []
      };
    },
    methods: {
      getdata(id) {
         this.axios.get('/api/zsyf/findDefectRecordByeid.do?ei_id='+id).then(res => {
          if (res.status === 200) {
          this.qxtableData = res.data.model.dr
          }
      }).catch(err => {
        if (err.status === 500) {
          confirm('数据请求失败')
        }
      })
      },
},
  
}
</script>
<style scoped>
   
</style>