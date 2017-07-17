<template>
  <div class="row question-list">
    <div class="panel panel-default" v-for="question in questions">
      <div class="panel-body">
        <a style="font-weight: bold;" @click="showDetails(question.id)">{{ question.title }}</a>
        <p>
          {{ question.content }}
        </p>
        <p>
          Asked by : {{ question.User ? question.User.name : '' }}
        </p>

        <button class="btn btn-info" type="button">
          Votes <span class="badge">4</span>
        </button>
        <button class="btn btn-primary" type="button">
          Answer <span class="badge">4</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionList',
  data() {
    return {
      questions: [{
        title: 'Hello',
      }],
    };
  },
  methods: {
    showDetails(questionId) {
      console.log('details..');
      this.$router.push({ path: `/main/questiondetails/${questionId}` });
    },
    getQuestions() {
      this.$http.get(`${window.serverUrl}/api/questions`)
      .then((response) => {
        this.questions = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
  mounted() {
    this.getQuestions();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
