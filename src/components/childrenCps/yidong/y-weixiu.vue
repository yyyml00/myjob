<template>
    <div class="yzichan">
        <div class="title">维修记录</div>
        <div v-if="blog === 0" class="show">暂时没有维修记录</div>
        <el-collapse v-model="activeNames" accordion>
        <el-collapse-item :title="item.r_runtime" :name="index+1" v-for="(item,index) in lists" :key="index">
            <div class="box"><span>水闸名称:</span> {{item.r_name}}</div>
            <div class="box"><span>开始日期:</span> {{item.r_runtime}}</div>
            <div class="box"><span>修理内容:</span> {{item.r_neirong}}</div>
            <div class="box"><span>养护修理实施情况:</span> {{item.r_Implementation}}</div>
            <div class="box"><span>耗用人工物料经费:</span> {{item.r_resources}}</div>
            <div class="box"><span>参与人员签字:</span> {{item.r_staffsignature}}</div>
            <div class="box"><span>分管领导签字:</span> {{item.r_leadersignature}}</div>
            <div class="box"><span>结束时间：</span> {{item.r_endtime}}</div>
            <div class="box"><span>设备编号:</span> {{item.ei_id}}</div>            
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
            blog: 0
        }
    },
    methods: {
        getData() {
        
        this.axios.get('/api/zsyf/findRepairRecordByeid.do?ei_id=123').then(res => {
        this.lists = res.data.model.rr 
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
        this.getData()
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
