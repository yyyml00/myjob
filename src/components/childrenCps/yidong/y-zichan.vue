<template>
    <div class="yzichan">
        <div class="title">固定资产详情</div>
        <table class="table" border="1" height='580px'>
             <tr>
                <td width='33%'>资产编号：</td>
                <td >{{tablelist.fa_id}}</td>
            </tr>
             <tr>
                <td width='33%'>规格型号：</td>
                <td >{{tablelist.fa_model}}</td>
            </tr>
             <tr>
                <td width='33%'>资产名称：</td>
                <td >{{tablelist.fa_name}}</td>
            </tr>
            <tr>
                <td width='33%'>使用人：</td>
                <td >{{tablelist.fa_people}}</td>
            </tr>
            <tr>
                <td width='33%'>存放地点：</td>
                <td >{{tablelist.fa_addr}}</td>
            </tr>
             <tr>
                <td width='33%'>账面数量/面积：</td>
                <td >{{tablelist.fa_bknumber}}</td>
            </tr>
             <tr>
                <td width='33%'>账面价值：</td>
                <td >{{tablelist.fa_bookvalue}}</td>
            </tr> 
            <tr>
                <td width='33%'>使用部门：</td>
                <td >{{tablelist.fa_department}}</td>
            </tr> 
            <tr>
                <td width='33%'>实有数量/面积：</td>
                <td >{{tablelist.fa_exnumber}}</td>
            </tr> 
             <tr>
                <td width='33%'>盘点结果：</td>
                <td >{{tablelist.fa_result}}</td>
            </tr>
             <tr>
                <td width='33%'>使用状况：</td>
                <td >{{tablelist.fa_situation}}</td>
            </tr>
            <tr>
                <td width='33%'>实有原值：</td>
                <td >{{tablelist.fa_value}}</td>
            </tr>
            </table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tablelist: {}
        }
    },
    methods: {
        getData() {
        this.axios.get('/api/zsyf/findFixedAssetsByKey.do?id=1').then(res => {
          console.log(res)
          this.tablelist = res.data.model.fa
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
        font-size: 16px;
        line-height: 24px;
    }
    .title{
        font-size: 28px;
        text-align: center;
        line-height: 1rem;
        color: white;
        font-weight: 700;
        width: 100%;
        height: 1rem;
        background-color: #1d73b0;
    }
    .table{ 
        width: 7.1rem;
        border-collapse:collapse;
        border-color:black;
        }
</style>
