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
    }
.el-row {
        margin-top: 10px;
    }

</style>
