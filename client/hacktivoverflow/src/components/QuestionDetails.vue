<template>
  <div class="row">
    <div class="col-md-8 col-md-offset-2" style="padding-left: 50px;">
      <div class="row" style="margin-bottom: 30px;">
        <div class="col-md-12">

          <div class="media">
            <div class="media-left">
              <button type="button" class="btn" aria-label="Left Align" @click="upVote">
                <span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>
              </button>

              <h2 style="margin: 0; margin-left: 10px; color: gray;">{{ question.Votes.length }}</h2>
              <button type="button" class="btn" aria-label="Left Align" @click="downVote">
                <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
              </button>
            </div>
            <div class="media-body">
              <h4 class="media-heading">{{ question.title }}</h4>
              <div style="height: 90px;">

                {{ question.content }}
              </div>

              <hr />
              <div class="media" v-for="answer in question.Answers">
                <div class="media-left">
                  <a href="#">
                    <img class="media-object" />
                  </a>
                </div>
                <div class="media-body">
                  <h4>{{ answer.content }}</h4>
                  <h6>Answered by: {{ answer.User.name }}</h6>
                </div>
              </div>


            </div>

          </div>
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
                  <label for="pwd">Content:</label>
                  <textarea class="form-control" rows="5" v-model="content" ></textarea>
                </div>

                <button type="button" class="btn btn-default btn-primary" @click="postAnswer" style="margin-right: 20px;">Post Answer</button>
                <router-link to="/">Cancel</router-link>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'QuestionDetails',
  data() {
    return {
      content: '',
    };
  },
  methods: {
    postAnswer() {
      this.$store.dispatch('giveAnswer', {
        question: this.question.id,
        content: this.content,
      });
    },
    upVote() {
      this.$store.dispatch('giveVote', {
        question: this.question.id,
        score: 1,
      });
    },
    downVote() {
      this.$store.dispatch('giveVote', {
        question: this.question.id,
        score: -1,
      });
    },
  },
  components: {
  },
  mounted() {
    const questionId = this.$route.params.questionId;
    this.$store.dispatch('getQuestion', { questionId });
  },
  computed: mapState(['question']),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
