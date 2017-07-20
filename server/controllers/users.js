const User = require('../models/users');
var jwthelpers = require('../helper/jwtHelpers');
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
require('dotenv').config()

var SignUp = (req,res,next) =>{
     User.findOne({username : req.body.username})
     .then ((docs)=>{
          if(docs) {
               res.send('User name already exists')
          } else {
               User.findOne({email : req.body.email})
               .then((result)=>{
                    console.log(result);
                    if(result) {
                         res.send('This email already exists')
                    } else {
                         var insertUser = new User ({
                              username : req.body.username,
                              email : req.body.email,
                              password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),

                         })
                         insertUser.save((err, response)=>{
                              if(err) {
                                   res.send(err.message)
                              } else {
                                   res.send(response);
                              }
                         })
                    }
               })
               .catch((err) => {
                    res.send(err.message)
               })
          }
     })
     .catch((err) => {
          res.send(err.message);
     })
}

var signinFacebook = (req, res)=>{
          User.findOne({
          email : req.body.email
          })
     .then((response)=>{
     if(response){
               var token = jwt.sign({
                    id : response._id,
                    // username : response.username,
                    email : response.email
               }, process.env.JWT_SECRET, {expiresIn : '1h'})
               res.send({
                    token : token
               })
     }else{
     User.create({
          // username : req.body.username,
          email : req.body.email
     })
     .then((result)=>{
          var token = jwt.sign({
                         id : result._id,
                         // username : result.username,
                         email : result.email
                    }, process.env.JWT_SECRET, {expiresIn : '1h'})
                    res.send({
                         token : token
                    })
               })
          }
     })
}

var SignIn =  (req,res,next)=> {
     console.log('sign coy');
  var getUser = User.findOne({username : req.body.username})
  getUser.exec(function(err, datauser){
    bcrypt.compare(req.body.password, datauser.password)
      .then((value)=>{
        if(value == true){
          var token = jwt.sign({
               id : datauser._id,
               username: datauser.username,
               email : datauser.email
          }, 'process.env.JWT_SECRET')
          res.send({
               success: true,
               token : token,
               message : datauser.message,
               data : datauser
          })
          console.log(token);
        }
        else{
          res.send('password tidak cocok')
        }
      })
      .catch((err) => {
           res.send(err)
      })
  })
}

var validation = (req, res,next)=>{
		jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
      if(decoded == undefined){
        res.send(err)
      }else{
      	res.send(decoded)
       }
	  })
	}

var findAllUsers = (req,res,next)=>{
     User.find({ }, function(err, users) {
      if (err) {
        res.send(err);
      } else {
        res.send(users)
      }
    });
}

var findOneUser = (req,res,next)=>{
     User.findOne({ _id : req.params.id})
     .exec(function(err,result) {
          if(result) {
               res.send(result)
          } else {
               res.send(err)
          }
     })
}

var insertUser = (req,res,next)=>{
     var insert = new User ({
          username : req.body.username,
          email : req.body.email,
          password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

     })
     insert.save((err, docs) =>{
          if (err) {
               res.send(err.message)
          } else {
               res.send(docs)
          }
     })
}

var deleteUser = (req,res,next) =>{
     User.remove({_id:req.params.id}, (err,docs)=>{
          if (err) {
               console.log(err.message);
          } else {
               res.send({
                    docs: docs,
                    msg : `${req.params.id} has been deleted`
               })
          }
     })
}

var updateUser = (req, res,next)=>{
  User.findById(req.params.id, (err, docs) => {
   if (err) res.send(err)
   User.updateOne({
      _id: docs._id
   }, {
      $set: {
           username : req.body.username || docs.username,
           email : req.body.email || docs.email,
           password : req.body.password || docs.password
      }
   }, (err, result) => {
      if (err) res.send(err)
      res.send(result)
   })
  })
}

module.exports = {
     SignUp,
     SignIn,
     findAllUsers,
     findOneUser,
     insertUser,
     updateUser,
     deleteUser,
     validation,
     signinFacebook
}
