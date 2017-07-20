const db = require('../models');

let Reply_get = function (req,res) {
  db.Reply.findAll()
  .then(result => {
    res.status(200).send(result)
  })
  .catch(err => {
    res.status(501).send('Something Wrong with your reply',err)
  })
}

let Reply_post = function (req,res) {
  let data = req.body
  db.Reply.create({
    comment : data.comment,
    tags : data.tags,
    id_thread: data.id_thread,
    id_user : data.id_user
  }).then((result)=>{
    res.status(200).send(result);
  })
  .catch(err => {
    res.status(501).send(`Something wrong with your Post Reply : ${err}`);
  })
}

module.exports = {
  Reply_get,
  Reply_post
};