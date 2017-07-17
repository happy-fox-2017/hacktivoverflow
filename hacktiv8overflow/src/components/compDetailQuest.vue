<template>
  <div class="column">
    <img src="../assets/question.png" style="width: 50%">
    <div class="box" style="background-color: #d10808; padding: 10px;">
      <div class="box">
        <div class="field">
          <h1 class="title is-3" style="color:  #d10808">{{quest.title}}</h1>
        </div>
        <hr>
        <div class="field">
          <p>{{quest.desc}}</p>
        </div>
        <div class="field">
          <p class="subtitle is-6">by: <b>{{quest.username}}</b></p>
        </div>
        <div class="field" style="text-align: left; color: #2c3e50;">
          <span  @click="addReply()"><a style="color: #2c3e50"><i class="fa fa-reply"></i> Reply</a></span>
          <span v-if="quest.username == currUser" @click="deleteGoGo(quest._id)"><a style="color: #2c3e50"><i class="fa fa-trash"></i> Delete</a></span>
          <span @click="editGoGo(quest._id)" v-if="quest.username == currUser"><a style="color: #2c3e50"><i class="fa fa-pencil"></i> Edit</a></span>
        </div>
        <div :style="newAnswerStyle">
          <div class="field">
            <label class="label">Answer Title</label>
            <input class="input" type="text" placeholder="Answer's title" v-model="newAnswer.title">
          </div>
          <div class="field">
            <label class="label">Description</label>
            <textarea class="textarea" type="text" placeholder="Description" rows="8" cols="80" v-model="newAnswer.desc"></textarea>
          </div>
          <div class="field">
            <button type="button" class="button" style="background-color:  #d10808; color: white;" @click="postNewAnswer()">Submit</button>
            <button type="button" class="button" @click="cancelAddNewAnswer()">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <h1 class="title is-3">Answers</h1>
      <hr>
      <div class="columns" v-for="answer in answersList">
        <div class="column">
          <p class="title is-3"><b>{{answer.title}}</b></p>
          <p>{{answer.desc}}</p>
          <br>
          <p>by: <b>{{answer.username}}</b>, {{(new Date(answer.createdAt)).toString()}}</p>
          <div class="columns" v-if="currUser == answer.username">
            <div class="column is-6">
              <span @click="deleteGoGo(answer._id)"><a style="color: #2c3e50"><i class="fa fa-trash"></i> Delete</a></span>
            </div>
            <div class="column is-6">
              <span @click="editGoGo(answer._id)"><a style="color: #2c3e50"><i class="fa fa-pencil"></i>Edit</a></span>
            </div>
          </div>
        </div>
        <div class="column is-1">
          <div class="columns">
            <span><i @click="upVoteGoGo(answer._id)" class="fa fa-caret-up title is-3" style="color: #d10808; margin-right: 3px"></i>{{answer.upVote.length}}</span>
          </div>
          <div class="columns">
            <p class="title is-3">{{answer.upVote.length - answer.downVote.length}}</p>
          </div>
          <div class="columns">
            <span><i @click="downVoteGoGo(answer._id)" class="fa fa-caret-down title is-3" style="margin-right: 3px"></i>{{answer.downVote.length}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comp-detail-quest',
  props: ["questId"],
  data () {
    return {
      quest: {},
      answersList: [],
      newAnswerStyle: "display: none",
      newAnswer: {
        title: "",
        desc: ""
      },
      currUser: ""
    }
  },
  methods: {
    getDetail() {
      let self = this
      axios.get('http://localhost:3000/api/questions/'+self.questId)
      .then(function(response) {
        self.quest = response.data.questionnya
        self.answersList = response.data.answers
        self.checkOwned()
      })
    },
    addReply() {
      if (this.newAnswerStyle == "display: inherit") {
        this.newAnswerStyle = "display: none"
        this.newAnswer.title = ""
        this.newAnswer.desc = ""
      } else {
        this.newAnswerStyle = "display: inherit"
      }
    },
    cancelAddNewAnswer() {
      this.addReply()
      this.newAnswer.title = ""
      this.newAnswer.desc = ""
    },
    postNewAnswer() {
      let self = this
      axios.post(`http://localhost:3000/auth/users/verify-token`, {
        token: localStorage.token
      }).then(function(rezponse) {
        if (self.newAnswer.title == "" || self.newAnswer.desc == "" ) {
          alert("please fill title and description before posting")
        } else {
          axios.post(`http://localhost:3000/api/questions`, {
            title: self.newAnswer.title,
            desc: self.newAnswer.desc,
            username: rezponse.data.username,
            parent: self.questId
          }).then(function(response) {
            console.log("response abis bikin answers");
            console.log(response.data);
            self.cancelAddNewAnswer()
            self.getDetail()
          }).catch(function(err) {
            alert(err)
          })
        }
      }).catch(function(erro) {
        alert(erro)
      })
    },
    upVoteGoGo(id) {
      let self = this
      axios.post('http://localhost:3000/auth/users/verify-token', {
        token: localStorage.token
      }).then(function(response) {
        axios.put(`http://localhost:3000/api/questions/${id}/vote/up`, {
          userId: response.data.userId
        }).then(function(response) {
          self.getDetail()
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
          self.getDetail()
        })
      })
    },
    checkOwned() {
      let self = this
      axios.post('http://localhost:3000/auth/users/verify-token', {
        token: localStorage.token
      }).then(function(response) {
        self.currUser = response.data.username
      })
    },
    deleteGoGo(id) {
      if (confirm("Are you sure want to delete this post?")){
        let self = this
        axios.delete('http://localhost:3000/api/questions/'+id)
        .then(function(response) {
          self.$router.push('/home')
        })
      }
    },
    editGoGo(id) {
      alert(`Edit question dengan id: ${id}`)
    }
  },
  mounted() {
    this.getDetail()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  text-align: left;
}

p {
  text-align: left;
}

.label {
  text-align: left;
}
</style>
