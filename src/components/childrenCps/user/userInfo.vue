<template>
    <div class="userinfo">
      <h1 class="page-title">人员档案信息一览</h1> 
       <el-divider></el-divider>
        <el-row>
           <el-col :span="24"><div class="grid-content "> 
             <div class="handle-box">
               <el-button type="primary">新增人员信息</el-button>
             </div>
             <el-divider></el-divider>
              <el-table
                    border
                    ref="multipleTable"
                    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    label="用户编号"
                    prop="User_id"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    label="姓名"
                    prop="User_name"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="密码"
                    prop="User_pwd"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="邮箱"
                    prop="User_email"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="电话"
                    prop="User_phone"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="性别"
                    prop="User_sex"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="年龄"
                    prop="User_age"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="部门"
                    prop="User_department"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="职位"
                    prop="User_role"
                    width="120">
                    </el-table-column>
                     <el-table-column
                    label="地址"
                    prop="User_addr"
                    width="120">
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
    name: 'userinfo',
     data() {
      return {
        tableData: [{
          User_id: '2016-05-02',
          User_name: '王小虎',
          User_addr: '上海市普陀区金沙江路 1518 弄',
          User_pwd: '123445',
          User_email: '12434',
          User_phone: '133455666',
          User_sex: '男',
          User_age: '14',
          User_department: '调度部',
          User_role: '指挥'
        },{
          User_id: '2016-05-02',
          User_name: '王小虎',
          User_addr: '上海市普陀区金沙江路 1518 弄',
          User_pwd: '123445',
          User_email: '12434',
          User_phone: '133455666',
          User_sex: '男',
          User_age: '14',
          User_department: '调度部',
          User_role: '指挥'
        },{
          User_id: '2016-05-02',
          User_name: '王小虎',
          User_addr: '上海市普陀区金沙江路 1518 弄',
          User_pwd: '123445',
          User_email: '12434',
          User_phone: '133455666',
          User_sex: '男',
          User_age: '14',
          User_department: '调度部',
          User_role: '指挥'
        },{
          User_id: '2016-05-02',
          User_name: '王小虎',
          User_addr: '上海市普陀区金沙江路 1518 弄',
          User_pwd: '123445',
          User_email: '12434',
          User_phone: '133455666',
          User_sex: '男',
          User_age: '14',
          User_department: '调度部',
          User_role: '指挥'
        },{
          User_id: '2016-05-02',
          User_name: '王小虎',
          User_addr: '上海市普陀区金沙江路 1518 弄',
          User_pwd: '123445',
          User_email: '12434',
          User_phone: '133455666',
          User_sex: '男',
          User_age: '14',
          User_department: '调度部',
          User_role: '指挥'
        },{
          User_id: '2016-05-02',
          User_name: '王小虎',
          User_addr: '上海市普陀区金沙江路 1518 弄',
          User_pwd: '123445',
          User_email: '12434',
          User_phone: '133455666',
          User_sex: '男',
          User_age: '14',
          User_department: '调度部',
          User_role: '指挥'
        },{
          User_id: '2016-05-02',
          User_name: '王小虎',
          User_addr: '上海市普陀区金沙江路 1518 弄',
          User_pwd: '123445',
          User_email: '12434',
          User_phone: '133455666',
          User_sex: '男',
          User_age: '14',
          User_department: '调度部',
          User_role: '指挥'
        },{
          User_id: '2016-05-02',
          User_name: '王小虎',
          User_addr: '上海市普陀区金沙江路 1518 弄',
          User_pwd: '123445',
          User_email: '12434',
          User_phone: '133455666',
          User_sex: '男',
          User_age: '14',
          User_department: '调度部',
          User_role: '指挥'
        },{
          User_id: '2016-05-02',
          User_name: '王小虎',
          User_addr: '上海市普陀区金沙江路 1518 弄',
          User_pwd: '123445',
          User_email: '12434',
          User_phone: '133455666',
          User_sex: '男',
          User_age: '14',
          User_department: '调度部',
          User_role: '指挥'
        }
        ],
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
      },
       handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
}      
   


</script>
<style scoped>

</style>
