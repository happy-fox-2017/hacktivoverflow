<template>
  <header>
    <nav class="navbar">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img src="../assets/logo.png" alt="logo" width="112" height="28">
        </a>

        <div class="navbar-burger burger" data-target="navMenuExample">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end" v-if="isLogin==false">
          <div class="navbar-item">
            <input class="input" type="text" placeholder="username" v-model="login.username">
          </div>
          <div class="navbar-item">
            <input class="input" type="password" placeholder="password" v-model="login.password" @keyup.enter="loginGoGo">
          </div>
          <div class="navbar-item">
            <p class="control">
              <a class="button is-warning" @click="loginGoGo">
                <span class="icon">
                  <i class="fa fa-user"></i>
                </span>
                <span>Login</span>
              </a>
            </p>
          </div>
        </div>
        <div class="navbar-end" v-else-if="isLogin==true">
          <div class="navbar-item">
            <p>Hi, {{ currUser }} </p>
          </div>
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a class="button is-warning" @click="logoutGoGo()">
                  <span>Logout</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'navbarku',
  props: ["isLogin"],
  data () {
    return {
      login: {
        username: "",
        password: "",
      }
    }
  },
  methods: {
    loginGoGo () {
      alert("login!")
    },
    logoutGoGo () {
      alert("this")
    }
  }
}
</script>

<style scoped>
  header {
    width: 100%;
    border-bottom: solid 1px #c6c6c6;
  }

  nav {
    max-width: 1060px;
    margin: 0 auto;
  }
</style>
