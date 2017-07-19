<template>
  <div class="row article-list" style="margin-top: 60px;">
    <div class="col-md-4 col-md-offset-4">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Sign Up</h3>
        </div>
        <div class="panel-body">
          <form>
            <div class="form-group">
              <label for="email">Email address:</label>
              <input type="email" v-model="email" class="form-control" id="email">
            </div>
            <div class="form-group">
              <label for="pwd">Password:</label>
              <input type="password" v-model="password" class="form-control" id="pwd">
            </div>
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" v-model="name" class="form-control" id="name">
            </div>
            <button type="button" class="btn btn-default btn-primary" @click="signUp" style="margin-right: 20px;">Sign Up</button>
            <router-link to="/signin">Cancel</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
      name: '',
    };
  },
  methods: {
    signUp() {
      this.$http.post(`${window.serverUrl}/api/users/signup`, {
        email: this.email,
        password: this.password,
        name: this.name,
      })
      .then(() => {
        this.$router.push({ path: '/signin' });
      })
      .catch((err) => {
        console.log(err);
        alert(`Sign Up Error: ${err.message}`);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
