<template>
<div class="groupquestion">
  <div v-for="question in list_question">
    <hr>
    <div class="post-preview text-left" style="background-color:#e5e580">
      <a @click="setparam(question)">
        <h2 class="post-title">{{question.title}}</h2>
      </a>
      <h3 class="post-subtitle">{{ question.description }}</h3>
      <p class="post-meta">Posted by <b>{{ question.author.username }}</b> on <b>{{ converDate(question.created) }}</b></p>

    </div>
    <hr>
  </div>
</div>
</template>

<script>
export default {
  name: 'groupquestion',
  data() {
    return {
      list_question: []
    }
  },
  methods: {
    seedData() {
      let self = this;
      axios.get('http://localhost:3000/question', {
      })
        .then(function(response) {
          self.list_question = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    converDate(params) {
      var mydate = new Date(params);
      var month = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ][mydate.getMonth()];
      var str = mydate.getDate() + ' ' + month + ' ' + mydate.getFullYear();
      return str;
    },
    setparam(params) {
      this.$store.state.params.detail = params;
      this.$router.push('/question')
    }
  },
  created() {
    this.seedData();
    let self = this;
    self.database = firebase.database();
    var question = self.database.ref('question/');
    question.on('value', function(snapshot) {
      self.seedData();
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
