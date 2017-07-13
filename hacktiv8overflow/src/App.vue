<template>
  <div id="app">
    <navbar-ku :is-login="isLogin"></navbar-ku>
    <router-view></router-view>
  </div>
</template>

<script>
import navbarKu from '@/components/navBarKu'


export default {
  name: 'app',
  components: {
    navbarKu
  },
  data () {
    return {
      isLogin: false
    }
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
</style>
