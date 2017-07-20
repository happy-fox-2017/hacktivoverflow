const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

let User_findbyidorcreate = function(req,res){
  let data = req.body;
  var hash = bcrypt.hashSync(data.password, saltRounds);
  db.User
  .findOrCreate({where: {id:data.id}, defaults: {
    name: data.name,
    gender : data.gender,
    email  : data.email,
    password: hash,
    dob    : data.dob
  }})
  .then(data =>{
    res.send(data);
  })
  .catch(err => {
    res.status(501).send(`Something wrong with your Post User : ${err}`);
  })
}

let User_get = function(req,res){
  let data = req.body
  db.User.findAll()
  .then((result)=>{
    res.status(200).send(result)  
  })
  .catch(err => {
    res.status(501).send(`Something wrong with your Get User : ${err}`);
  })
}

let User_login = function(req,res){
  let data = req.body
  db.User.findAll({
    where: {
      email: data.email
    }
  })
  .then((result)=>{
    console.log(result)
    if (result != null) {
      let resultpassword = bcrypt.compareSync(data.password, result[0].password)
      if (resultpassword) {
        jwt.sign({
          id: result[0].id,
          name: result[0].name,
          gender: result[0].gender,
          email: result[0].email
        }, 'secret', function(err,token) {
          res.status(200).send(token)
        })
      } else {
        res.status(502).send(`Password False please write your password well`)
      }
    } else {
      res.status(501).send(`Email False please write your email well`)
    }
    
  })
  .catch(err => {
    res.status(501).send(`Email False please write your email well : ${err}`);
  })
}

let User_put = function (req,res) {
  let id = req.params.id;
  let data = req.body;
  var hash = bcrypt.hashSync(data.password, salt);
  db.User.update({
    name: data.name,
    gender : data.gender,
    email : data.email,
    password: hash,
    dob : data.dob
  }, {
    where:{id:id}
  })
  .then((result)=>{
    res.status(200).send(result)
  })
  .catch(err => {
    res.status(501).send(`Something wrong with your Update User : ${err}`);
  })
}

let User_delete = function(req,res) {
  let id = req.params.id;
  db.User.destroy({
    where:{id:id}
  })
  .then(()=>{
    res.status(200).send(`Delete User 1 Rows`)
  })
  .catch(err => {
    res.status(501).send(`Something wrong with your Delete User : ${err}`);
  })
}

let User_getById = function(req,res) {
  let id = req.params.id;
  db.User.findOne({
    where : {id:id}
  })
  .then(result=>{
    res.status(200).send(result)
  })
  .catch(err => {
    res.status(501).send(`Something wrong with your get by id User : ${err}`)
  })
}

module.exports = {
  User_get,
  User_put,
  User_delete,
  User_getById,
  User_findbyidorcreate,
  User_login
};