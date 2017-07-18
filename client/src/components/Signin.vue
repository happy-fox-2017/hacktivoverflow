<template lang="html">
  <div class="container">
           <form class="form-horizontal">
               <div class="form-group">
                 <label class="control-label col-sm-2" for="username">Username :</label>
                 <div class="col-sm-10">
                   <input type="text" class="form-control" id="username" placeholder="Enter username" v-model="username">
                 </div>
               </div>
                <div class="form-group">
                  <label class="control-label col-sm-2" for="email">Email:</label>
                  <div class="col-sm-10">
                    <input type="email" class="form-control" id="email" placeholder="Enter email" v-model="email">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-2" for="pwd" v-model="password">Password:</label>
                  <div class="col-sm-10">
                    <input type="password" class="form-control" id="pwd" placeholder="Enter password">
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-primary" @click="login" style="width:150px">Submit</button>
                  </div>
                </div>
         </form>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
     name: 'signin',
     data () {
          return {
               username: '',
               email: '',
               password: '',
               message: '',
               status: true
          }
     },
     methods: {
          login() {
          console.log("login  ");
          if(this.validdata()) {
               console.log("validdata  ");
               var self = this
               axios.post('http://localhost:3000/users/signin', {
                    username: self.username,
                    email: self.email,
                    password: self.password
               })
               .then((response)=>{
                    console.log("respon  "+response);
                    self.username = ''
                    self.email = ''
                    localStorage.setItem('token', response.data.token)
                    $('#loginsuccess').fadeIn();
                    self.status = false
                    self.reset()
                    self.$router.push('/home')
               })
               .catch((err) => {
                    self.message = "Try again"
                    $("#loginfailed").fadeIn()
                    self.reset()
               })
          } else {
               this.message = "Input Failed"
               $("#loginfailed").fadeIn()
               self.reset()
          }
     },

     reset() {
          this.username = '';
          this.email = '';
          this.password = '';
          setTimeout(function(){
               $("#loginfailed").hide()
          }, 2000);
          setTimeout(function(){
               $("#loginsuccess").hide()
          }, 2000);
          setTimeout(function(){
               $("#logoutsuccess").hide()
          }, 2000);
     },
     validdata() {
          if(this.username == '' ||  this.email ==  '' ) {
               return false
          } else {
               return true
          }
     }
   }
}

</script>

<style lang="css" scope>
     .container {
         width: 40%;
         /*padding-left: 350px*/
     }
</style>
