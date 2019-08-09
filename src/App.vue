<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header,
menu, nav, output, ruby, section, summary,
time, mark, audio, video, input, button {
    margin: 0;
    padding: 0;
    /*font-size: 100%;*/
    font-weight: normal;
    vertical-align: baseline;
}

/* custom */
a {
    text-decoration: none;

}

li {
    list-style: none;
}
html, body {
    width: 100%;
}
#app {width: 100%;
      height: 100%;
     }
#fisrt-container{
  height: 100%;
}

.el-row {
        margin-top: 10px;
    }
.page-title {
        font-size: 36px;
        background-color: rgb(87, 174, 255);
        color: white;   
    }
    /* 表单样式 */
#myform input {
        border: 1px solid rgb(10, 10, 10);
}
#myform textarea {
        border: 1px solid rgb(10, 10, 10);
}
/* 搜索处理框样式设置 */
 .handle-box {
      text-align: right;
    }
    #my-aside i {
      color: white;
    }
    #mytable {
      margin-top: 20px;
    }
    /* 表格样式设置 */
    #mytable table {border-collapse:collapse;margin: 0 auto;border-top: 1px solid #ccc}
    /* .el-table th{background:rgb(87, 174, 255);color: rgb(255, 255, 255);}
    .el-table tr td{border: 1px solid rgb(87, 174, 255);}
    .el-table{color: rgb(3, 3, 3);} */
    .el-table th>.cell{font-size: 14px; font-weight: 700}
    .el-table tr td .cell{line-height: 14px;}
    .el-table tr td .cell{font-size: 12px;font-weight: 500}
    .feiye-box {
      text-align: center;
    }
  .el-aside .el-submenu__title{
    width: 180px;
  }
  #mytabs .is-top{
    color: white;
  }
  #mytabs .is-top .is-active {
    color: rgb(231, 206, 65);
    
  }
  
</style>
