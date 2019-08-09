<template>
    <div class="yzichan">
        <div class="title">{{ei_name}}</div>
        <el-collapse v-model="activeNames">
        <el-collapse-item title="设备基本信息" name="1">
            <div class="box"><span>设备编号:</span> {{file.ei_id}}</div>
            <div class="box"><span>设备名称:</span> {{file.ei_name}}</div>
            <div class="box"><span>生产日期:</span> {{file.ei_date}}</div>
            <div class="box"><span>规格型号:</span> {{file.ei_model}}</div>
            <div class="box"><span>防护等级：</span> {{file.ei_protectionlevel}}</div>
            <div class="box"><span>标准代号：</span> {{file.ei_code}}</div>
            <div class="box"><span>制造单位：</span> {{file.ei_company}}</div>
            <div class="box"><span>主要参数：</span> {{file.ei_parameter}}</div>
            <div class="box"><span>设备组：</span> {{file.ei_group}}</div>            
        </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
export default {
    data() {
        return {
           activeNames: ['1'] ,
            file: {},
            ei_name: ''
        }
    },
    methods: {
        getData() {
 

        this.axios.get('/api/zsyf/findEquipmentInformationByKey.do?id=4').then(res => {
        console.log(res)
        this.file = res.data.model.mi   
      }).catch(err => {
        
      })
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
        this.fnResize(),
        this.getData(),
        this.ei_name = this.$route.query.einame
    }
}
</script>
<style scoped>
    .yzichan{
        text-align: left;
        margin: 0.2rem;
        line-height: 28px;
    }
    .title{
        font-size: 22px;
        text-align: center;
        line-height: 1rem;
        color: #1d73b0;
        font-weight: 700;
        width: 100%;
        height: 1rem;
    }
    span {
        color: #1d73b0;
        font-weight: 600;
    }
    .btn {
        width: 100%;
        height: 1rem;
        background-color: #1d73b0;
        border-radius: 0.2rem;
        color: white;
        margin: 0.2rem 0;
    }
    .box {
        font-size: 16px;
        border-bottom: 1px solid #1d73b0;
    }
</style>
