<template>
  <div id="app">
    <Navbar :user="user"></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import ThreadList from '@/components/ThreadList'
export default {
  components: {
    Navbar,
    ThreadList
  },
  name: 'app',
  data () {
    return {
      token: null,
      user: {
        id: '',
        name: ''
      }
    }
  },
  methods: {
    getToken () {
      this.token = localStorage.getItem('token')
    },
    getUserData () {
      var self = this
      this.axios.post('http://localhost:3000/getdata', {
        token: self.token
      })
      .then(function (response) {
        self.user = response.data
      })
    }
  },
  created () {
    this.getToken()
    this.getUserData()
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1a7ada;
}
</style>
