<template>
  <div class="column">
    <img src="../assets/your.png" style="width:21%">
    <img src="../assets/question.png" style="width: 50%">
    <div class="box" style="background-color: #d10808; padding: 10px;">
      <div class="box">
        <div class="field">
          <label class="label">Title</label>
          <input type="text" class="input" placeholder="Title" v-model="quest.title">
        </div>
        <div class="field">
          <label class="label">Desc</label>
          <textarea class="textarea" rows="8" cols="80" placeholder="Question's Description" v-model="quest.desc"></textarea>
        </div>
        <div class="field" style="text-align: left;">
          <button class="button" type="button" style="background-color: #d10808; color: white" @click="updateQuestion()">Update</button>
          <button class="button" type="button" style="background-color: #7c7c7c; color: white" @click="cancelEditQuest()">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comp-edit-quest',
  props: ["questId"],
  data () {
    return {
      quest: {}
    }
  },
  methods: {
    getQuestionData() {
      let self = this
      axios.get('http://localhost:3000/api/questions/'+self.questId)
      .then(function(response) {
        self.quest = response.data.questionnya
      })
      .catch(function(err) {
        alert(err)
      })
    },
    updateQuestion() {
      let self = this
      axios.put('http://localhost:3000/api/questions/'+self.quest._id, {
        title: self.quest.title,
        desc: self.quest.desc
      }).then(function(response) {
        self.$router.push('/questions/'+self.quest._id)
      }).catch(function(err) {
        alert(err)
      })
    },
    cancelEditQuest() {
      this.$router.push('/questions/'+this.quest._id)
    }
  },
  mounted() {
    this.getQuestionData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.label {
  text-align: left;
}
</style>
