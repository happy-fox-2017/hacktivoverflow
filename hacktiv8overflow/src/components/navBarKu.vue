<template>
  <header>
    <nav class="navbar">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img src="../assets/logo.png" alt="logo">
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
              <a class="button" @click="loginGoGo">
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
  props: ["isLogin", "curr"],
  data () {
    return {
      login: {
        username: "",
        password: "",
      }
    }
  },
  computed: {
    currUser () {
      return this.curr.name
    }
  },
  methods: {
    loginGoGo () {
      let self= this
      axios.post('http://localhost:3000/auth/users/login', {
        username: self.login.username,
        password: self.login.password
      })
      .then(function(response) {
        if (response.data == "failUsername") {
          self.login.username = ""
          self.login.password = ""
          alert("username did'nt exist")
        } else if (response.data == "failPassword") {
          alert("Wrong password")
          self.login.password = ""
        } else {
          localStorage.setItem("token", response.data.token)
          self.curr.name = response.data.name
          self.login.username = ""
          self.login.password = ""
          self.$emit("login-go-go")
        }
      })
      .catch(function(err) {
        alert(err)
      })
    },
    logoutGoGo () {
      localStorage.clear()
      this.$emit("logout-go-go")
    }
  }
}
</script>

<style scoped>
  header {
    width: 100%;
    background: #d10808;
    /*border-bottom: solid 1px #c6c6c6;*/
  }

  p {
    color: white;
  }

  nav {
    max-width: 1060px;
    background: #d10808;
    margin: 0 auto;
  }

  .button {
    color: #7c7c7c;
  }

  .button.is-warning {
    background-color: #7c7c7c;
    color: white;
  }
</style>
