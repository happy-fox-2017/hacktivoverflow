<template>
<div class="container-fluid">
     <div class="navbar">
       <div class="alert alert-danger" id="registerfailed" role="alert" style="display:none;">
         <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
         <strong>Registes Failed !</strong> {{message}}.
       </div>
       <div class="alert alert-success" id="registersuccess" role="alert" style="display:none;">
         <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
         <strong>Register Success</strong> {{message}}.
       </div>
     </div>

     <!-- Form Register -->
     <div id="register">
          <div class="row">
                <div class="col-lg-10" style="background-color:lightblue">
                     <h1>Form Register</h1>
                     <hr>
                  <!-- <form> -->
                    <div class="form-group">
                      <label for="username">Username:</label>
                      <input v-model="username" type="text" class="form-control" name="username" placeholder="input your username">
                    </div>
                    <div class="form-group">
                      <label for="email">Email:</label>
                      <input v-model="email" type="text" class="form-control" name="email" placeholder="input your email">
                    </div>
                    <div class="form-group">
                      <label for="password">Password:</label>
                      <input v-model="password" type="password" class="form-control" name="password" placeholder="input your password">
                    </div>
                    <br>
                    <button v-on:click="onRegister" type="submit" class="btn btn-success" style="width:250px; height:40px; align:center;"><b>Submit</b></button>
                  <!-- </form> -->
                </div>
          </div>
     </div>
</div>

</template>

<script>
export default {
  name: 'Navbar',
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
       onRegister: function() {
      if (this.validdata()) {
        var self = this;
        axios.post(`http://localhost:3000/users/signup`, {
          username: self.username,
          email: self.email,
          password: self.password
        })
        .then(response => {
        var data = response.data
              if(data.msg){
                   self.message = data.msg
                   self.msgStatus = true
                   self.username = ''
                   self.email = ''
                   self.password = ''
              }
              $("#registersuccess").fadeIn()
              self.status = true
              self.reset()
              self.$router.push('/')
        })
        .catch((err) => {
              console.log(err);
        })
        } else {
             this.message = 'input field.';
             $("#registerfailed").fadeIn();
             self.reset();
      }
       },

       reset() {
            this.username = '';
            this.email = '';
            this.password = '';
            setTimeout(function(){
                 $("#registersuccess").hide()
            }, 2000);
            setTimeout(function(){
                 $("#registerfailed").hide()
            }, 2000);
            setTimeout(function(){
                 $("#logoutsuccess").hide()
            }, 2000);
       },
       login(){
         this.$router.push('/')
       },
       validdata() {
            if(this.username == '' ||  this.password ==  '' || this.email == '') {
                 return false
            } else {
                 return true
            }
       },
       tohome() {
            this.$router.push('/')
       }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #register {
     width: 80%;
     padding-left: 350px
}
</style>
