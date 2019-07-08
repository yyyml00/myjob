<template>
   <div class="weixiu">
       <h1 class="page-title">设备维修记录统计表</h1> 
        
        <el-row>
           <el-col :span="24"><div class="grid-content ">
             <div class="handle-box">
               <el-button type="primary">新增维修记录</el-button>
             </div>
             <el-divider></el-divider> 
              <el-table
                    border
                    ref="multipleTable"
                    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    label="水闸名称"
                    prop="department"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="日期"
                    prop="date"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="内容"
                    prop="name"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    label="养护修理实施情况"
                    prop="password"
                    width="220">
                    </el-table-column>
                    <el-table-column
                    label="耗时人工，物料，经费情况"
                    prop="email"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    label="参加人员签字"
                    prop="sex"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    label="分管领导签字"
                    prop="age"
                    width="100">
                    </el-table-column>
                    
                    <el-table-column
                    align="right">
                    <template slot="header" slot-scope="">
                        <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table> 
                <el-divider></el-divider>
                <el-pagination
                  @current-change="handleCurrentChange"
                  background
                  layout="prev, pager, next"
                  :total="1000">
                </el-pagination>
            </div></el-col>
        </el-row>
       
    </div> 
</template>
<script>
export default {
     data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          password: '123445',
          email: '12434',
          phone: '133455666',
          sex: '男',
          age: '14',
          department: '调度部',
          role: '指挥'
          
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          password: '123445',
          email: '12434',
          phone: '133455666',
          sex: '男',
          age: '14',
          department: '调度部',
          role: '指挥熟地黄撒谎iOS阿活动阿斯顿那是滴还能带洒出男生女生擦后地上看就安排冬季黁金克斯U盾有黄沙古渡压缩包还不熟BBC'
          
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          password: '123445',
          email: '12434',
          phone: '133455666',
          sex: '男',
          age: '14',
          department: '调度部',
          role: '指挥'
          
        }, {
          date: '2016-05-02',
          name: '吃的',
          address: '上海市普陀区金沙江路 1518 弄',
          password: '123445',
          email: '12434',
          phone: '133455666',
          sex: '男',
          age: '14',
          department: '调度部',
          role: '指挥'
          
        }, {
          date: '2016-05-02',
          name: '发热发个',
          address: '上海市普陀区金沙江路 1518 弄',
          password: '123445',
          email: '12434',
          phone: '133455666',
          sex: '男',
          age: '14',
          department: '调度部',
          role: '指挥'
          
        }, {
          date: '2016-05-02',
          name: '收到货',
          address: '上海市普陀区金沙江路 1518 弄',
          password: '123445',
          email: '12434',
          phone: '133455666',
          sex: '男',
          age: '14',
          department: '调度部',
          role: '指挥'
          
        }, {
          date: '2016-05-02',
          name: '哥哥',
          address: '上海市普陀区金沙江路 1518 弄',
          password: '123445',
          email: '12434',
          phone: '133455666',
          sex: '男',
          age: '14',
          department: '调度部',
          role: '指挥'
          
        }],
        multipleSelection: [],
        search: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
        handleSelectionChange(val) {
        this.multipleSelection = val;
        // console.log(this.multipleSelection)
      },handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
}
</script>
<style scoped>

</style>
