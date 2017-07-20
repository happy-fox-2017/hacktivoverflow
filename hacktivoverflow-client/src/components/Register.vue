<template lang="html">
  <div class="container">
    <div class="row">
        <h3 class="col-sm-offset-3 col-sm-6">Signup</h3>
    </div
    <div class="row">
        <div class="col-sm-offset-1 col-sm-2">
        </div>
        <div class="col-sm-6">
          <div class="row">
              <div class="col-xs-12 col-md-12">
                  <input type="text" name="Full Name" v-model="register.name" class="form-control input-lg" placeholder="First Name"  />
              </div>
          </div>
          <input type="text" name="email" value="" class="form-control input-lg" v-model="register.email" placeholder="Your Email"  /><input type="password" name="password" value="" class="form-control input-lg" v-model="register.password" placeholder="Password"  />
              <label>Birth Date</label>
              <div class="row">
                <input type="date" v-model="register.dob" name="Tanggal-lahir" class="tanggal-lahir">
              </div>
              <label>Gender : </label>
              <label class="radio-inline">
                  <input type="radio" name="gender" value="Male" v-model="register.gender" id="male">Male
              </label>
              <label class="radio-inline">
                  <input type="radio" name="gender" value="Female" v-model="register.gender" id="female">Female
              </label>
              <br />
              <br>
          <button class="btn btn-lg btn-primary btn-block signup-btn" type="submit" @click="doSignup">Create my account</button>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Register',
  data: function () {
    return {
      register: {
        name: null,
        email: null,
        dob: null,
        gender: null
      }
    }
  },
  methods: {
    doSignup () {
      var self = this
      this.$http.post('http://localhost:3000/user', {
        name: self.register.name,
        email: self.register.email,
        password: self.register.password,
        dob: self.register.dob,
        gender: self.register.gender
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data[0].name !== '' && response.data[0].email !== '' && response.data[0].dob !== '' && response.gender !== '' && response.password !== '') {
            alert('Create Account Done')
            this.$router.push('/')
          } else {
            alert('Create Account Failed Please Check Your Input')
          }
        }
      })
      .catch(err => {
        alert('Please Try Again', err)
      })
    }
  }
}
</script>

<style scoped>
legend{
	color:#141823;
	font-size:25px;
	font-weight:bold;
}

.tanggal-lahir{
  margin-left: 18px;
}

.signup-btn {
  background: #79bc64;
  background-image: -webkit-linear-gradient(top, #79bc64, #578843);
  background-image: -moz-linear-gradient(top, #79bc64, #578843);
  background-image: -ms-linear-gradient(top, #79bc64, #578843);
  background-image: -o-linear-gradient(top, #79bc64, #578843);
  background-image: linear-gradient(to bottom, #79bc64, #578843);
  -webkit-border-radius: 4;
  -moz-border-radius: 4;
  border-radius: 4px;
  text-shadow: 0px 1px 0px #898a88;
  -webkit-box-shadow: 0px 0px 0px #a4e388;
  -moz-box-shadow: 0px 0px 0px #a4e388;
  box-shadow: 0px 0px 0px #a4e388;
  font-family: Arial;
  color: #ffffff;
  font-size: 20px;
  padding: 10px 20px 10px 20px;
  border: solid #3b6e22  1px;
  text-decoration: none;
}

.signup-btn:hover {
  background: #79bc64;
  background-image: -webkit-linear-gradient(top, #79bc64, #5e7056);
  background-image: -moz-linear-gradient(top, #79bc64, #5e7056);
  background-image: -ms-linear-gradient(top, #79bc64, #5e7056);
  background-image: -o-linear-gradient(top, #79bc64, #5e7056);
  background-image: linear-gradient(to bottom, #79bc64, #5e7056);
  text-decoration: none;
}
.navbar-default .navbar-brand{
		color:#fff;
		font-size:30px;
		font-weight:bold;
	}
.form .form-control { margin-bottom: 10px; }
@media (min-width:768px) {
	#home{
		margin-top:50px;
	}
	#home .slogan{
		color: #0e385f;
		line-height: 29px;
		font-weight:bold;
	}
}
</style>
