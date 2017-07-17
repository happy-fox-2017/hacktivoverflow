<template>
  <div id="start-page-container" class="columns">
    <div class="column is-one-third">
      <h1 class="title is-3">Create New User</h1>
      <h3 class="title is-5">and join our lost community</h3>
      <h3 class="title is-5">{{ msg }}</h3>
    </div>
    <div class="column is-one-third">
      <div class="field">
        <label class="label">Name</label>
        <p class="control">
          <input class="input" type="text" placeholder="Full Name" v-model="signup.name">
        </p>
      </div>
      <div class="field">
        <label class="label">Username</label>
        <p class="control">
          <input class="input" type="text" placeholder="Username" v-model="signup.username">
        </p>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <p class="control">
          <input class="input" type="password" placeholder="Password" v-model="signup.password" @keyup.enter="signUpGoGo">
        </p>
      </div>
      <div class="field" style="margin-top: 30px;">
        <span>
          <button class="button is-warning" @click="signUpGoGo()" style=" width: 50%">Sign Up</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      signup: {
        name: "",
        username: "",
        password: ""
      },
      msg: ""
    }
  },
  methods: {
    signUpGoGo () {
      let self = this
      if (this.signup.name == "" || this.signup.username == "" || this.signup.password == "") {
        alert("Please fill all the data before signing up")
      } else {
        axios.post('http://localhost:3000/api/users', {
          name: self.signup.name,
          username: self.signup.username,
          password: self.signup.password,
        })
        .then(function(response) {
          if (response.data == "failUsername") {
            self.msg = "Username already taken!"
            self.signup.username = ""
          } else {
            self.msg = "User created, please login to enjoy our lost community"
            self.signup.name = ""
            self.signup.username = ""
            self.signup.password = ""
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.label {
  text-align: left;
  color: white;
}

.column {
  margin-left: 11%;
}

h1 {
  color: white
}

h3 {
  color: white
}

.button.is-warning {
  background-color: #d10808;
  color: white;
}

#start-page-container {
  margin-top: 0px;
  padding:20px 0;
}
</style>
