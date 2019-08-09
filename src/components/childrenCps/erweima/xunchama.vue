<template>
    <el-dialog :visible.sync="dialog" append-to-body width="200px" title="日巡查二维码">
        <vue-qr  :text="config.value" :colorDark="config.BYTE_POS" :size="160" :dotScale="0.8"></vue-qr>

    </el-dialog>  
</template>
<script>
import VueQr from 'vue-qr'
export default {
    components: { VueQr },
    name: 'xuncha',
    props: {
        id: {
          type: Number,
          default: 0
        },  
      },
    data() {
      return {
          dialog: false,
          config: {
            value: 'http://118.25.193.51:8080',　//显示的值、跳转的地址
    　　　　　BYTE_POS: 'black'
            　　},
      };
    },
}
</script>
<style scoped>
   
</style>
