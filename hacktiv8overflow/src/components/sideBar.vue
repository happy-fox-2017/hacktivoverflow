<template>
  <div class="column is-one-quarter">
    <div class="box" style="background-color: #d10808; padding: 10px; height: 100%;">
      <div class="box">
        <a @click="goToHome()">Home</a>
        <hr>
        <a @click="goToMyQuestion()">My Question</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sideBar',
  methods: {
    goToHome() {
      this.$router.push('/home')
    },
    goToMyQuestion () {
      this.$router.push('/your-questions')
    }
  }
}
</script>

<style scoped>

  a {
    color: grey;
  }

</style>
