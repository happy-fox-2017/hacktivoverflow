<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <customfooter></customfooter>
  </div>
</template>

<script>

import Customfooter from'@/components/customFooter'

export default {
  name: 'app',
  components: {
       Customfooter
 }
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
    /*body {
          background-color: #8ac7d8;
    }*/
</style>
