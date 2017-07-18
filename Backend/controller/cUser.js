const db = require('../models');

let User_findbyidorcreate = function(req,res){
  let data = req.body;
  db.User
  .findOrCreate({where: {id:data.id}, defaults: {
    name: data.name,
    gender : data.gender,
    email  : data.email,
    password: data.password,
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
      email: data.email, 
      password: data.password
    }
  })
  .then((result)=>{
    res.status(200).send(result)  
  })
  .catch(err => {
    res.status(501).send(`Something wrong with your Get User : ${err}`);
  })
}

let User_put = function (req,res) {
  let id = req.params.id;
  let data = req.body;
  db.User.update({
    name: data.name,
    gender : data.gender,
    email : data.email,
    password: data.password,
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
  // User_post,
  User_get,
  User_put,
  User_delete,
  User_getById,
  User_findbyidorcreate,
  User_login
};