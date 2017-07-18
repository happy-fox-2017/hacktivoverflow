const db = require('../models');

let reply_get = function (req,res) {
  db.Reply.findAll()
  .then(result =>{
    res.status(200).send(result)
  })
  .catch(err => {
    res.status(501).send(`Something wrong with your Get Reply : ${err}`)
  })
}

let reply_post = function (req,res) {
  let data = req.body;
  db.Reply.create({
    comment: data.comment,
    tags: data.tags,
    id_thread: data.id_thread,
    id_user: data.id_user
  })
  .then(data =>{
    res.status(200).send(data);
  }) .catch(err => {
    res.status(501).send(`Something wrong with your Post Reply : ${err}`);
  })
}

let reply_delete = function (req,res) {
  let id = req.params.id;
  db.Reply.destroy({
    where : {id:id}
  }) .then(() =>{
    res.status(200).send(`Delete 1 Reply Done`);
  })
  .catch(err => {
    res.status(501).send(`Something wrong with your Delete Reply : ${err}`);
  })
}

let reply_put = function (req,res) {
  let id = req.params.id;
  let data = req.body;
  db.Reply.update({
    comment: data.comment,
    tags: data.tags,
    id_thread: data.id_thread,
    id_user: data.id_user
  }, {
    where: {id:id}
  })
  .then(result =>{
    res.status(200).send(result)
  })
  .catch(err => {
    res.status(501).send(`Something wrong with your Update Reply : ${err}`);
  })
}

module.exports = {
  reply_get,
  reply_post,
  reply_delete,
  reply_put
};