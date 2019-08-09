<template>
         <el-dialog :visible.sync="dialog" append-to-body width="1200px" title="设备维修记录">
             <el-table
                    id="mytable"
                    :data="wxtableData"
                    ref="multipleTable"
                    style="width: 100%"
                    >
                    <el-table-column
                    label="水闸名称"
                    prop="r_name"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="开始日期"
                    prop="r_runtime"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="修理内容"
                    prop="r_neirong"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="养护修理实施情况"
                    prop="r_Implementation"
                    width="140">
                    </el-table-column>
                    <!-- <el-table-column
                    label="缺陷表述"
                    prop="dr_content"
                    width="200">
                    </el-table-column> -->
                    <el-table-column
                    label="耗用人工物料经费"
                    prop="r_resources"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    label="参与人员签字"
                    prop="r_staffsignature"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="分管领导签字"
                    prop="r_leadersignature"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="结束时间"
                    prop="r_endtime"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="设备编号"
                    prop="ei_id"
                    width="120">
                    </el-table-column>
                </el-table>
         </el-dialog>
</template>
<script>
export default {
    name: 'e-weixiu',
     props: {
        wxid: {
          type: String,
           default: ""
        }
      },
    data() {
      return {
        dialog: false,
        wxtableData: []
      };
    },
    methods: {
      getdata(id) {
        console.log(id)
         this.axios.get('/api/zsyf/findRepairRecordByeid.do?ei_id='+id).then(res => {
          if (res.status === 200) {
          this.wxtableData = res.data.model.rr
          console.log(this.wxtableData)
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