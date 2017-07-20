<template lang="html">
  <div class="container section">
    <div class="columns" v-for="question in questionLists">
      <div class="column is-8 is-offset-2" >
        <router-link :to="{ path: 'question/'+question._id }">
          <header class="card-header">
            <p class="card-header-title">
              {{question.title}}
            </p>
          <!-- <a class="card-header-icon">
            <span class="icon">
              <i class="fa fa-angle-down"></i>
            </span>
          </a> -->
          </header>
        </router-link>
        <div class="card-content">
          <div class="content">
            {{question.content}}
            <br>
            <br>
            <small>author: {{question.author.name}}</small>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      questionLists: []
    }
  },
  created () {
    var self = this
    axios.get('http://localhost:3000/questions/')
    .then(response => {
      // console.log(response.data);
      self.questionLists = response.data
    })
    .catch(err => {
      console.log(err);
    })
  }
}
</script>

<style lang="css" scoped>
.columns {
  margin-bottom: 30px;
}
</style>
