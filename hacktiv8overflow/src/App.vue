<template>
  <div id="app">
    <navbar-ku :is-login="isLogin"
    :curr="curr"
    @login-go-go="loginGoGo()"
    @logout-go-go="logoutGoGo()"></navbar-ku>
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
      isLogin: false,
      curr: {
        name: ""
      }
    }
  },
  methods: {
    loginGoGo () {
      this.isLogin = true
      this.$router.push('/home')
    },
    logoutGoGo () {
      this.isLogin = false
      this.curr.name = ""
      this.$router.push('/')
    },
    checkLogin () {
      if (localStorage.token != null || localStorage.token != undefined) {
        let self = this
        axios.post('http://localhost:3000/auth/users/verify-token', {
          token: localStorage.token
        })
        .then(function(response) {
          console.log(response.data);
          self.curr.name = response.data.name
          self.isLogin = true
          self.$router.push('/home')
        })
      } else {
        this.isLogin = false
      }
    }
  },
  mounted() {
    this.checkLogin()
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
  overflow: hidden;
  background-color: #565656;
  min-height: 100vh;
}
</style>
