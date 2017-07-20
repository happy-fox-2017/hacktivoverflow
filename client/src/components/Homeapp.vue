<template>
<div class="home">
  <div class="container">
    <div class="row">
      <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1">
        <div class="alert alert-success" id="createsuccess" role="alert" style="display:none;">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <strong>Success create!</strong>
        </div>
        <div class="alert alert-warning" id="createwarning" role="alert" style="display:none;">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <strong>Warning!</strong> input field.
        </div>
        <div class="panel panel-default">
          <div class="panel-body">
            <input v-model="title" type="text" class="form-control" placeholder="Title">
            <br>
            <textarea v-model="question" class="form-control" rows="3" placeholder="Create question?"></textarea>
          </div>
          <div class="panel-footer">
            <button @click="createQuestion" type="button" class="btn btn-success">Create</button>
          </div>
        </div>
        <br>
        <br>
        <router-view></router-view>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      question: '',
      title: '',
      database: ''
    }
  },
  methods: {
    createQuestion() {
         console.log('create quest than home');
      if (this.validdata()) {
           console.log('iff   create quest than home');

        var self = this;
        let temp = localStorage.getItem('data');
        console.log('temp   temp  quest than home' + temp);
        temp = JSON.parse(temp);
        axios.post('http://localhost:3000/question', {
            title: self.title,
            description: self.question,
            author: temp._id
          })
          .then(function(response) {
            console.log(response);
            self.database.ref('question/' + response.data._id).set({
              status: Math.floor((Math.random() * 123456) + 1)
            });
            $("#createsuccess").fadeIn();
            self.reset();
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        $("#createwarning").fadeIn();
      }
    },
    reset() {
      this.question = '';
      this.title = '';
      setTimeout(function() {
        $("#createsuccess").hide();
      }, 2000);
      setTimeout(function() {
        $("#createwarning").hide();
      }, 2000);
    },
    validdata() {
      if (this.question == '' || this.title == '') {
        return false;
      } else {
        return true;
      }
    },
    cektoken(params) {
      if (!params) {
        this.$router.push('/')
      }
    }
  },
  created() {
    let token = localStorage.getItem('token');
    this.cektoken(token);
    this.database = firebase.database();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
