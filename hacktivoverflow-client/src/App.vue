<template>
    <router-view :islogin="islogin" @checkLogin="checkLogin()"></router-view>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      islogin: false
    }
  },
  methods: {
    checkLogin () {
      if (localStorage.token) {
        this.islogin = true
      } else {
        this.islogin = false
        this.$router.push('/')
      }
    }
  },
  created () {
    this.checkLogin()
  }
}
</script>
