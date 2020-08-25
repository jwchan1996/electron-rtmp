<!--
 * @Author: jwchan1996
 * @Date: 2019-07-25 14:45:36
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-07-25 14:45:36
 -->
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
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/*滚动条整体部分,必须要设置*/
/* ::-webkit-scrollbar{
   width: 6px;
   height: 10px;
   background-color: #fff;
} */
/*滚动条的轨道*/
/* ::-webkit-scrollbar-track{
   box-shadow: inset 0 0 5px #fff;
   background-color: #fff;
} */
/*滚动条的滑块按钮*/
/* ::-webkit-scrollbar-thumb{
   border-radius: 10px;
   background-color: #ddd;
   box-shadow: inset 0 0 5px #fff;
} */
/*滚动条的上下两端的按钮*/
/* ::-webkit-scrollbar-button{
   height: 0;
   background-color: #009688;
} */
</style>
