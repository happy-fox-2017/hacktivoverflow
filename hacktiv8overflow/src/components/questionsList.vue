<template>
  <div class="column">
    <div class="field" style="text-align: left;">
      <!-- <img src="../assets/your.png" style="width: 20%"> -->
      <img src="../assets/question-list.png" alt="question-list" style="width: 50%;">
    </div>
    <div class="box" style="background-color: #d10808; padding: 10px;">
      <div class="box">
        <div class="field" style="text-align: right;">
          <button type="button" class="button" style="background-color: #7c7c7c; color: white;" @click="createNew()">Create New</button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th style="width: 2%"><abbr></abbr></th>
              <th style="width: 58%">Question</th>
              <th style="width: 20%"><abbr>Author</abbr></th>
              <th style="width: 20%; text-align: center"><abbr>Vote</abbr></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="quest in questions">
              <th style="width: 2%"></th>
              <td style="width: 58%" @click="detailQuest(quest._id)"><a>{{quest.title}}</a></td>
              <td style="width: 20%;">{{quest.username}}</td>
              <td style="width: 20%; text-align: center;">
                <span class="icon" style="color: #d10808"><i @click="upVoteGoGo(quest._id)" class="fa fa-caret-up"></i></span>
                {{quest.upVote.length - quest.downVote.length}}
                <span class="icon"><i class="fa fa-caret-down" @click="downVoteGoGo(quest._id)"></i></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'questionsList',
  props: [],
  data () {
    return {
      questions: ""
    }
  },
  computed: {
  },
  methods: {
    createNew() {
      this.$router.push('/new-question')
    },
    getAllQuestions() {
      let self = this
      axios.get('http://localhost:3000/api/questions')
      .then(function(response) {
        self.questions = response.data
      })
    },
    detailQuest(str) {
      this.$router.push('/questions/'+str)
    },
    upVoteGoGo(id) {
      let self = this
      axios.post('http://localhost:3000/auth/users/verify-token', {
        token: localStorage.token
      }).then(function(response) {
        axios.put(`http://localhost:3000/api/questions/${id}/vote/up`, {
          userId: response.data.userId
        }).then(function(response) {
          self.getAllQuestions()
        })
      })
    },
    downVoteGoGo(id) {
      let self = this
      axios.post('http://localhost:3000/auth/users/verify-token', {
        token: localStorage.token
      }).then(function(response) {
        axios.put(`http://localhost:3000/api/questions/${id}/vote/down`, {
          userId: response.data.userId
        }).then(function(response) {
          self.getAllQuestions()
        })
      })
    }
  },
  mounted() {
    this.getAllQuestions()
  }
}
</script>

<style scoped>

  td a {
    color: #d10808;
    font-weight: 700;
    font-size: 25px;
  }

  nav {
    max-width: 1060px;
    background: #d10808;
    margin: 0 auto;
  }

  .button {
    color: #7c7c7c;
  }

  .button.is-warning {
    background-color: #7c7c7c;
    color: white;
  }
</style>
