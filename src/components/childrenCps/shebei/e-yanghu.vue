<template>
         <el-dialog :visible.sync="dialog" append-to-body width="1200px" title="设备养护记录">
             <el-table
                    id="mytable"
                    ref="multipleTable"
                    :data="yhtableData"
                    style="width: 100%"
                    >
                    <el-table-column
                    label="设备编号"
                    prop="ei_id"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="水闸名称"
                    prop="em_name"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="开始日期"
                    prop="em_runtime"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="结束日期"
                    prop="em_endtime"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="养护内容"
                    prop="em_neirong"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="养护修理实施情况"
                    prop="em_Implementation"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    label="耗用人工物料经费"
                    prop="em_resources"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    label="参与人员签字"
                    prop="em_staffsignature"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="分管领导签字"
                    prop="em_leadersignature"
                    width="120">
                    </el-table-column>
                </el-table>
         </el-dialog>
</template>
<script>
export default {
    name: 'e-yanghu',
     props: {
        yhid: {
          type: String,
           default: ""
        }
      },
    data() {
      return {
        dialog: false,
        yhtableData: []
      };
    },
    methods: {
      getdata(id) {
         this.axios.get('/api/zsyf/findEquipmentMaintenanceByeid.do?ei_id='+id).then(res => {
          if (res.status === 200) {
          this.yhtableData = res.data.model.em
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