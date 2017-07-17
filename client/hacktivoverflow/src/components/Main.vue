<template>
    <div class="main">
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">{{title}}</a>
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
              <li><router-link to="/main/newquestion">New Question!</router-link></li>
              <li>
                <button type="button" class="btn" @click="logout" style="margin-top: 7px;">Logout</button>
              </li>

            </ul>
          </div><!-- /.navbar-collapse -->

        </div><!-- /.container-fluid -->
      </nav>
      <div>
        <router-view></router-view>
      </div>
    </div>
</template>

<script>

export default {
  name: 'main',
  data() {
    return {
      title: 'HacktivOverflow',
    };
  },
  components: {
  },
  methods: {
    logout() {
      sessionStorage.removeItem('token');
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
