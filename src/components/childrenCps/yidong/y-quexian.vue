<template>
    <div class="yzichan">
        <div class="title">{{ei_name}}缺陷记录</div>
        <div v-if="blog === 0" class="show">暂时没有维修记录</div>
        <el-collapse v-model="activeNames" accordion>
        <el-collapse-item :title="item.dr_discoverertime" :name="index+1" v-for="(item,index) in lists" :key="index">
            <div class="box"><span>设备编号:</span> {{item.ei_id}}</div> 
            <div class="box"><span>流水号:</span> {{item.dr_pipelinenumber}}</div>
            <div class="box"><span>设备名称:</span> {{item.dr_name}}</div>
            <div class="box"><span>缺陷类型:</span> {{item.dr_type}}</div>
            <div class="box"><span>缺陷表述:</span> {{item.dr_content}}</div>
            <div class="box"><span>发现人:</span> {{item.dr_discoverer}}</div>
            <div class="box"><span>发现时间:</span> {{item.dr_discoverertime}}</div>
            <div class="box"><span>记录人:</span> {{item.dr_reportperson}}</div>
            <div class="box"><span>记录时间:</span> {{item.dr_reporttime}}</div>
            <div class="box"><span>后续处理情况记录:</span> {{item.dr_processing}}</div>           
        </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
export default {
    data() {
        return {
           activeNames: ['1'] ,
            lists: [],
            blog: 0,
            ei_name: ''
        }
    },
    methods: {
        getData() {
 

        this.axios.get('/api/zsyf/findDefectRecordByeid.do?ei_id=123').then(res => {
        this.lists = res.data.model.dr 
        this.blog = this.lists.length  
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
        console.log(this.ei_name)
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
    .show{
       font-size: 14px;

    }
</style>
