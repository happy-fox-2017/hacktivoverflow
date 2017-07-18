const db = require('../models');

let thread_vote_post = function(req,res) {
  let data = req.body;
  db.Thread_vote.create({
    id_thread: data.id_thread,
    id_vote: data.id_vote
  })
  .then(data =>{
    res.status(200).send(data)
  }).catch(err => {
    res.status(502).send(`Something Wrong with your Thread_vote_post, Err : ${err}`)
  })
}

let thread_vote_get = function(req,res) {
  db.Thread_vote.findAll()
  .then(data =>{
    res.status(200).send(data);
  }).catch(err => {
    res.status(502).send(`Something Wrong with your Thread_vote_get, Err : ${err}`)
  })
}

module.exports = {
  thread_vote_post,
  thread_vote_get
};