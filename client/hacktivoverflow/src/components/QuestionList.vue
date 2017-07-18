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
          Answer <span class="badge">{{ question.Answers.length }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'QuestionList',
  data() {
    return {
    };
  },
  methods: {
    showDetails(questionId) {
      this.$router.push({ path: `/main/questiondetails/${questionId}` });
    },
  },
  mounted() {
    this.$store.dispatch('getQuestions');
  },
  computed: mapState(['questions']),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
