<template>
  <div class="hello">
          <div class="container-fluid" >
            <div class="jumbotron" style="background-color: lightblue;">
              <h1>Fullstack Overflow</h1>
              <p>
                   Fullstack Overflow is a community of 10 million programmers, just like you, pleace helping each other to upgrade your skill.
                  Join with big Community Programmers. <b>Javascript, HTML, CSS, and jQuery</b>
              </p>
              <hr>
              <div class="">
                   <br>
                   <br>
                   <br>
              </div>
              <button type="button" class="btn btn-primary btn-lg" role="button" ><router-link to="register" style="color:white">Getstarted</router-link></button>
            </div>
          </div>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  data () {
    return {
      msg: 'Welcom Full Stack Overflow'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
