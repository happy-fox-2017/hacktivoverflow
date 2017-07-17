<template>
  <div class="row">
    <div class="col-md-9" style="padding-left: 50px;">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">New Question!</h3>
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

            <button type="button" class="btn btn-default btn-primary" @click="create" style="margin-right: 20px;">Create</button>
            <router-link to="/main/questions">Cancel</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NewQuestion',
  data() {
    return {
      title: '',
      content: '',
    };
  },
  methods: {
    create() {
      this.$http.post(`${window.serverUrl}/api/questions`, {
        title: this.title,
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
