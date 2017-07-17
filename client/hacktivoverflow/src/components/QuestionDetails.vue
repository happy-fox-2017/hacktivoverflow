<template>
  <div class="row">
    <div class="col-md-9" style="padding-left: 50px;">
      <div class="row" style="margin-bottom: 30px;">
        <div class="col-md-12">
          <h2>{{ question.title }}</h2>
          <h4>{{ question.content }}</h4>
          <h5><hr/></h5>
          <h5>Answers: </h5>
          <h5><hr/></h5>

          <ul class="list-group">
            <li v-for="answer in question.Answers">
              <h4>{{ answer.content }}</h4>
            </li>
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Answer</h3>
            </div>
            <div class="panel-body">
              <form>
                <div class="form-group">
                  <label for="email">Title</label>
                  <input type="text" v-model="title" class="form-control" id="email">
                </div>
                <div class="form-group">
                  <label for="pwd">Content:</label>
                  <textarea class="form-control" rows="5" v-model="content" ></textarea>
                </div>

                <button type="button" class="btn btn-default btn-primary" @click="postAnswer" style="margin-right: 20px;">Post Answer</button>
                <router-link to="/main/questions">Cancel</router-link>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'QuestionDetails',
  data() {
    return {
      question: {},
      content: '',
    };
  },
  methods: {
    postAnswer() {
      this.$http.post(`${window.serverUrl}/api/questions/${this.question.id}/answer`, {
        question: this.question.id,
        content: this.content,
        user: sessionStorage.getItem('userId'),
      })
      .then(() => {
        this.$router.push({ path: '/main/questions' });
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },
  components: {
  },
  mounted() {
    const questionId = this.$route.params.questionId;
    this.$http.get(`${window.serverUrl}/api/questions/${questionId}`)
    .then((response) => {
      this.question = response.data;
    })
    .catch((error) => {
      throw error;
      // console.log(error);
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
