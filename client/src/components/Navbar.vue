<template>
<div class="">
     <div class="navbar">
       <nav class="navbar navbar-light" style="background-color:#2f4c54; color:white; font-size:22px; " >
         <div class="container-fluid">
           <div class="navbar-header">
             <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
               <span class="icon-bar"></span>
               <span class="icon-bar"></span>
               <span class="icon-bar"></span>
             </button>
             <a @click="tohome()" class="navbar-brand" style="color:#ffffff;"><b>Fullstack Overflow</b></a>
             <ul class="nav navbar-nav">
                     <li>
                          <router-link to="/home" style="color:#ffffff;">Question</router-link>
                     </li>
              </ul>
           </div>
           <div class="collapse navbar-collapse" id="myNavbar">
             <ul class="nav navbar-nav navbar-right">
               <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                 <div v-if="status" class="navbar-form navbar-right" role="form">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                        <input id="username" type="text" class="form-control" name="username" v-model="username" value="" placeholder="Username">
                      </div>
                   <div class="input-group">
                     <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                     <input id="password" type="password" class="form-control" name="password" v-model="password" value="" placeholder="Password">
                   </div>
                   <button type="submit" class="btn btn-primary" @click="login">Login</button>
                   <button type="submit" class="btn btn-primary" ><router-link to="register" style="color:white">Register</router-link></button>
                 </div>
                 <div v-else class="navbar-form navbar-right" role="form">
                   <a style="color:#ffffff;">Welcome : <b> {{ message }}   &nbsp&nbsp</b></a>
                   <button type="submit" class="btn btn-warning" @click="logout">Logout</button>
                 </div>
               </div>
             </ul>
           </div>
         </div>
       </nav>
       <div class="alert alert-danger" id="loginfailed" role="alert" style="display:none;">
         <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
         <strong>Login Failed!</strong> {{message}}.
       </div>
       <div class="alert alert-success" id="loginsuccess" role="alert" style="display:none;">
         <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <strong>Welcome at Fullstack Overflow!</strong> {{message}}.
       </div>
       <div class="alert alert-success" id="logoutsuccess" role="alert" style="display:none;">
         <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
         <strong>Good Bye!</strong> {{message}}.
       </div>
       <div class="alert alert-success" id="registersuccess" role="alert" style="display:none;">
         <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
         <strong>Register Success</strong> {{message}}.
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
       login() {
         if (this.validdata()) {
           var self = this;
           axios.post('http://localhost:3000/users/signin', {
               username: self.username,
               email: self.email,
               password: self.password
             })
             .then(function(response) {
               if (response) {
                    console.log('response 123');
                    console.log(response);
                    self.username = ''
                    self.email = ''
                 localStorage.setItem('data', JSON.stringify(response.data.data));
                 console.log('respons+data '+response.data);
                 console.log('data+data '+response.data.data);

                 localStorage.setItem('token', response.data.token);
                 self.message = response.data.data.username;
                 console.log('username '+response.data.data.username);
                 $("#loginsuccess").fadeIn();
                 self.status = false;
                 self.reset();
                 self.$router.push('/home')
               } else {
                    console.log("ini err else "+error);

                 self.message = response.data.message;
                 $("#loginfailed").fadeIn();
                 self.reset();
               }
             })
             .catch(function(error) {
                  console.log("ini err "+error);
               self.message = 'Try again.';
               $("#loginfailed").fadeIn();
               self.reset();
             });
         } else {
           this.message = 'input field.';
           $("#loginfailed").fadeIn();
           self.reset();
         }

       },
       logout() {
            $("#logoutsuccess").fadeIn()
            this.status = true
            localStorage.removeItem('data')
            localStorage.removeItem('token')
            this.$router.push('/')
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
            if(this.username == '' ||  this.password ==  '' ) {
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

</style>
