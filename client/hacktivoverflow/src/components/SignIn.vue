<template>
  <div class="row article-list" style="margin-top: 60px;">
    <div class="col-md-4 col-md-offset-4">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Sign In</h3>
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
            <div class="checkbox">
              <label><input type="checkbox"> Remember me</label>
            </div>
            <button type="button" class="btn btn-default btn-primary" @click="signIn" style="margin-right: 20px;">Sign In</button>
            <router-link to="/signup">SignUp</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signIn() {
      this.$http.post(`${window.serverUrl}/api/users/signin`, {
        email: this.email,
        password: this.password,
      })
      .then((result) => {
        const token = result.data.token;
        const userId = result.data.userId;
        console.log(token);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', userId);
        this.$router.push({ path: '/main/questions' });
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
