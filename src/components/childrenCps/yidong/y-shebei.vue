<template>
    <div class="yzichan">
        <div class="title">{{ei_name}}</div>
        <button class="btn" @click="gofile()">设备档案</button>
        <button class="btn" @click="goweixiu()">水闸维修记录</button>
        <button class="btn" @click="goquexian()">水闸缺陷记录</button>
        <button class="btn" @click="goyanghu()">水闸养护记录</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
           ei_id: '',
           ei_name: ''
        }
    },
    methods: {
        gofile() {
            var id = this.$route.params.id
            var name = this.ei_name
            this.$router.push({path:`/yefile/ ${id}`, query: {einame: name}})
        },
         goweixiu() {
            var id = this.ei_id
            var name = this.ei_name
            this.$router.push({path:`/yweixiu/ ${id}`, query: {einame: name}})
        },
         goquexian() {
            var id = this.ei_id
            var name = this.ei_name
            this.$router.push({path:`/yquexian/ ${id}`, query: {einame: name}})
        },
        goyanghu() {
            var id = this.ei_id
            var name = this.ei_name
            this.$router.push({path:`/yyanghu/ ${id}`, query: {einame: name}})
        },
         getData() {

        this.axios.get('/api/zsyf/findEquipmentInformationByKey.do?id=4').then(res => {
          this.ei_id = res.data.model.mi.ei_id
          this.ei_name = res.data.model.mi.ei_name
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
        font-size: 20px;
        line-height: 24px;
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
    .btn {
        width: 100%;
        height: 1rem;
        background-color: #1d73b0;
        border-radius: 0.2rem;
        color: white;
        margin: 0.2rem 0;
    }
</style>
