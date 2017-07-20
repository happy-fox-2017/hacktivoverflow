<template>
  <div class="column">
    <img src="../assets/new-question.png" style="width: 50%">
    <div class="box" style="background-color: #d10808; padding: 10px;">
      <div class="box">
        <div class="field">
          <label class="label">Title</label>
          <input type="text" class="input" placeholder="New Title" v-model="newQuest.title">
        </div>
        <div class="field">
          <label class="label">Desc</label>
          <textarea class="textarea" rows="8" cols="80" placeholder="Question's Description" v-model="newQuest.desc"></textarea>
        </div>
        <div class="field" style="text-align: left;">
          <button class="button" type="button" style="background-color: #d10808; color: white" @click="postNewQuestion()">Create</button>
          <button class="button" type="button" style="background-color: #7c7c7c; color: white" @click="cancelMakeNewQuest()">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comp-new-quest',
  data () {
    return {
      newQuest: {
        title: "",
        desc: ""
      }
    }
  },
  methods: {
    postNewQuestion() {
      let self = this
      axios.post('http://localhost:3000/auth/users/verify-token', {
        token: localStorage.token
      }).then(function(response) {
        axios.post('http://localhost:3000/api/questions', {
          title: self.newQuest.title,
          desc: self.newQuest.desc,
          username: response.data.username,
          parent: ""
        }).then(function(rezponse) {
          alert("Create Question Success")
          self.$router.push('/home')
        }).catch(function(err) {
          alert("ERR")
          console.log(err);
        })
      })
      .catch(function(err) {
        alert("ERR")
        console.log(err);
      })
    },
    cancelMakeNewQuest() {
      this.newQuest.title = ""
      this.newQuest.desc = ""
      this.$router.push('/home')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.label {
  text-align: left;
}
</style>
