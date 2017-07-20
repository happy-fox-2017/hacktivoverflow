<template lang="html">
     <div class="question">
          <h1>Question...</h1>
          <hr>
       <div class="container">
         <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1">
           <div id="confirm" class="modal in" style="display: none;">
             <div class="modal-dialog">
               <div class="modal-content">
                 <div class="modal-header">
                   <h4 class="modal-title">CONFIRM</h4>
                 </div>
                 <div class="modal-body">
                   <p>Are you sure you want to delete question?</p>
                   <div class="row">
                     <div class="col-12-xs text-center">
                       <button @click="deleteQuestion" class="btn btn-success btn-md">Yes</button>
                       <button class="btn btn-danger btn-md" data-dismiss="modal">No</button>
                     </div>
                   </div>
                 </div>

               </div>
               <!-- /.modal-content -->
             </div>
             <!-- /.modal-dialog -->
           </div>
           <!-- /.modal -->
           <div class="panel panel-white post panel-shadow">
             <div class="post-description text-left">
               <h2><b>{{ detail.title }}</b></h2>
               <input v-model="editvalue" v-if="editstatus" type="text" id="edit"> <i @click="updatedesc" v-if="editstatus" class="btn btn-default fa fa-check-square" aria-hidden="true"></i>
               <p v-else="editstatus">{{ editvalue }}</p>
               <div class="title h5">
                 <a href="#"><b>{{ detail.author.username }}</b></a> made a post.
               </div>
               <div class="stats">
                 <a @click="vote(true)" class="btn btn-default stat-item">
                             <i class="fa fa-thumbs-up icon"></i>{{up}}
                         </a>
                 <a @click="vote(false)" class="btn btn-default stat-item">
                                     <i class="fa fa-thumbs-down icon"></i>{{down}}
                                 </a>
                 <a @click="editon" v-if="user._id==detail.author._id" class="btn btn-default">
                                                                       <i  class="fa fa-pencil-square-o icon"></i>
                                                                   </a>
                 <a v-if="user._id==detail.author._id" class="btn btn-default" data-toggle="modal" data-target="#confirm">
                                                       <i  class="fa fa-trash icon"></i>
                                                   </a>
               </div>
             </div>
             <div class="post-footer">
               <div class="input-group">
                 <input v-model="commentvalue" class="form-control" placeholder="Add a comment" type="text">
                 <span class="input-group-addon">
                             <a @click="addComment" ><i class="fa fa-paper-plane"></i></a>
                         </span>
               </div>

               <router-view></router-view>

             </div>
           </div>
         </div>
       </div>
     </div>
</template>

<script>
export default {
     name: 'question',
     data() {
          return {
               detail: {},
               user: {},
               editvalue: '',
               editstatus: false,
               commentvalue: '',
               database: '',
               down: 0,
               up: 0
          }
     },
     methods: {
          vote(params) {
               console.log('Vote nih '+ params);
               let self = this
               axios.post('http://localhost:3000/vote', {
                    id_obj: self.detail._id,
                    author: self.user._id,
                    action: params
               })
               .then(function(response) {
                    console.log(response);
                    console.log('vote respon '+ response.data);
                    if(response.data.result) {
                         console.log('response data ' +response.data.result);
                         self.database.ref('question/' + self.detail._id).set({
                              status: Math.floor((Math.random() * 129999) + 1)
                         })
                    } else {
                         alert('You had voted bro!!')
                    }
               })
               .catch((err) => {
                    console.log(err);
               })
          },
          deleteQuestion() {
               let self = this
               axios.delete('http://localhost:3000/question/' + this.detail._id + '/' + this.user._id)
               .then(function(response) {
                    console.log(response);
                    $("#confirm").modal('toggle')
                    self.$router.push('/home')
               })
               .catch((err) => {
                    console.log(err);
               })
          },
          editon() {
               this.editstatus = true
          },
          updatedesc() {
               let self = this;
               axios.put('http://localhost:3000/question/' + self.detail._id + '/' + self.user._id, {
                    description : self.editvalue
               })
               .then(function(response) {
                    self.database.ref('question/' + self.detail._id).set({
                         status: Math.floor((Math.random() * 123456) + 1)
                    })
                    console.log('status palsu'+status);
                    self.editstatus = false;
               })
               .catch((err) => {
                    console.log(err);
               })
          },
          addComment() {
               if (this.validdata()) {
                    let self = this
                    axios.post('http://localhost:3000/question/sub', {
                         id: self.detail._id,
                         userid: self.user._id,
                         description: self.commentvalue
                    })
                    .then(function(response) {
                         self.commentvalue = ''
                         slef.database.ref('question/' + self.detail._id).set({
                              status: Math.floor((Math.random() * 1000) + 1)
                         })
                    })
                    .catch((err) => {
                         console.log(err);
                    })
               } else {
                    console.log('Cannot Empty');
               }
          },
          validdata() {
               if(this.commentvalue == '') {
                    return false
               } else {
                    return true
               }
          },
          seedvote(params) {
               let sefl = this
               axios.get('http://localhost:3000/vote/' + params)
               .then(function(response) {
                    self.up = response.data.up
                    self.down =  response.data.down
               })
               .catch((err) => {
                    console.log(err);
               })
          },
          cektoken(params) {
               if(!params) {
                    this.$router.push('/')
               }
          }
     },
     created() {
          let token = localStorage.getItem('token');
          this.cektoken(token);
          let temp = localStorage.getItem('data');
          temp = JSON.parse(temp);
          this.user = temp;
          let self = this;
          self.detail = self.$store.state.params.detail;
          self.seedvote(self.detail._id);
          self.editvalue = self.detail.description;
          self.database = firebase.database();
          self.action = self.database.ref('question/' + self.detail._id);
          self.action.on('value', function(snapshot) {
            self.seedvote(self.detail._id);
          });
     }
}
</script>

<style lang="css">
</style>
