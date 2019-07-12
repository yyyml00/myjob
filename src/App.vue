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
    border: 0;
    /*font-size: 100%;*/
    font-weight: normal;
    vertical-align: baseline;
}table {
    border-collapse: collapse;
    border-spacing: 0;
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
.grid-content {
        box-shadow: 0 0 20px rgb(168, 162, 162);
        padding: 10px;
        background-color: white;
        text-align: left;
    }
.el-row {
        margin-top: 10px;
    }
.page-title {
        font-size: 36px;
        background-color: rgb(87, 174, 255);
        color: white;
        height: 60px;
        
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
    #search-box {
      width: 300px;
      border: 1px solid rgb(87, 174, 255);
      display: inline-block;
    }
   
    .fl {
      float: right;
    }
    .flo {
      float: left;
      height: 65px;
      padding-top: 8PX;
    }
    #my-aside i {
      color: white;
    }
    /* #mytable {
      margin: 0 auto;
    } */
    /* 表格样式设置 */
    #mytable table {border-collapse:collapse;margin: 0 auto;}
    .el-table th{background:rgb(87, 174, 255);color: rgb(255, 255, 255);}
    .el-table tr td{border: 1px solid rgb(87, 174, 255);}
    .el-table{color: rgb(3, 3, 3);}

    .feiye-box {
      text-align: center;
    }
</style>
