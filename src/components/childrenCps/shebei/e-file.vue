<template>
   <div class="e-file">
      <h1 class="page-title">设备电子档案综合表</h1> 
       
       <el-row>
           <el-col :span="24"><div class="grid-content "> 
             <div class="handle-box">
               <router-link to="/index/addquexian">
               <el-button type="primary" >新增设备缺陷记录</el-button>
               </router-link>
               <div class="flo" >
               <el-button type="primary" size="mini">输入查询</el-button>
               <div class="fl">
                 <el-input
                        id="search-box"
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/>
               </div>
               </div>
               <el-divider></el-divider>
             </div>
              <el-table
                    border
                    ref="multipleTable"
                    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="40">
                    </el-table-column>
                    <el-table-column
                    label="Date"
                    prop="date"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="姓名"
                    prop="name"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="密码"
                    prop="password"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="邮箱"
                    prop="email"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="性别"
                    prop="sex"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="年龄"
                    prop="age"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="部门"
                    prop="department"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    label="职位"
                    prop="role"
                    width="300">
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
