<template>
        <el-dialog :visible.sync="dialog" append-to-body width="350px" title="个人中心">
            <ul>
                <li>姓名：<span>{{uformLabelAlign.user_id}}</span></li>
                <li>编号：<span>{{uformLabelAlign.user_id}}</span></li>
                <li>性别：<span>{{uformLabelAlign.user_sex}}</span></li>
                <li>电话：<span>{{uformLabelAlign.user_phone}}</span></li>
                <li>年龄：<span>{{uformLabelAlign.user_age}}</span></li>
                <li>邮箱：<span>{{uformLabelAlign.user_email}}</span></li>
                <li>部门：<span>{{uformLabelAlign.user_department}}</span></li>
                <li>职位：<span>{{uformLabelAlign.user_role}}</span></li>
                <li>地址：<span>{{uformLabelAlign.user_addr}}</span></li>
            </ul>
         </el-dialog>  
</template>
<script>
export default {
    name: 'self',
     props: {
        id: {
          type: String,
          default: ''
        },
      },
    data() {
      return {
        dialog: false,
        uformLabelAlign: {}
      };
    },
    methods: {
        getdata(){
            let id = this.$store.state.id
             this.axios.get('/api/zsyf/findUserByKey.do?id='+id).then(res => {
                 this.uformLabelAlign = res.data.model.user
            }).catch(err => {
              
            })
        },
    }
}
</script>
<style scoped>
   li{
       font-size: 16px;
       padding: 10px;
   }

</style>
