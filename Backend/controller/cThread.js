const db = require('../models');

let Thread_post = function (req,res) {
  let data = req.body;
  db.Thread.create({
    subject : data.subject,
    desc : data.desc,
    tags : data.tags,
    id_user : data.id_user
  }).then((result)=>{
    res.status(200).send(result);
  })
  .catch(err => {
    res.status(501).send(`Something wrong with your Post Thread : ${err}`);
  })
}

let Thread_get = function(req,res){
  db.Thread.findAll()
  .then((result)=>{
    res.status(200).send(result)  
  })
  .catch(err => {
    res.status(501).send(`Something wrong with your Get Thread : ${err}`);
  })
}

let Thread_put = function (req,res) {
  let id = req.params.id;
  let data = req.body;
  db.Thread.update({
    subject : data.subject,
    desc : data.desc,
    tags : data.tags,
    id_user : data.id_user
  }, {
    where:{id:id}
  })
  .then((result)=>{
    res.status(200).send(result)
  })
  .catch(err => {
    res.status(501).send(`Something wrong with your Update Thread : ${err}`);
  })
}

let Thread_delete = function(req,res) {
  let id = req.params.id;
  let data = req.body;
  db.Thread.destroy({
    where:{id:id}
  })
  .then(()=>{
    res.status(200).send(`One Thread Deleted`)
  })
  .catch(err => {
    res.status(501).send(`Something wrong with your Update Thread : ${err}`);
  })
}

let Thread_getById = function(req,res) {
  let id = req.params.id;
  db.Thread.findOne({
    where : {id:id}
  })
  .then(result=>{
    res.status(200).send(result)
  })
  .catch(err => {
    res.status(501).send(`Something wrong with your get by id Thread : ${err}`)
  })
}

module.exports = {
  Thread_post,
  Thread_get,
  Thread_put,
  Thread_delete,
  Thread_getById
};