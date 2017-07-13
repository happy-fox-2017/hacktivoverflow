const Question = require('../models/questions');

function getAll(req, res) {
  Question.find({}, function(err, response) {
    if (err) res.send(err);
    else res.send(response)
  })
}

function getOne(req, res) {
  let questAndAnswer = {
    questionnya: {},
    answers: []
  }
  Question.findOne({
    _id: req.params.id
  }, function(err, response) {
    questAndAnswer.questionnya = response
    Question.find({
      parent: response._id
    }, function(erro, rezponse) {
      questAndAnswer.answers.push(rezponse)
      res.send(questAndAnswer)
    })
  })
}

function create(req, res) {
  Question.create({
    title: req.body.title,
    desc: req.body.desc,
    userId: req.body.userId,
    upVote: 0,
    downVote: 0,
    createdAt: new Date(),
    parent: req.body.parent
  }, function(err, response) {
    if (err) res.send(err)
    else res.send(response)
  })
}

function update(req, res) {
  Question.findOneAndUpdate({
    _id: req.params.id
  }, {
    title: req.body.title,
    desc: req.body.desc
  }, function(err, response) {
    if (err) console.log(err);
    else res.send(response)
  })
}

function deleteOne(req, res) {
  Question.remove({
    _id: req.params.id
  }, function(err, response) {
    if (err) console.log(err);
    else res.send(response)
  })
}

function upVote(req, res) {
  Question.findOne({
    _id: req.params.id
  }, function(err, response) {
    if (response.upVote.indexOf(req.body.userId)  == -1) {
      let newVote = response.upVote
      newVote.push(req.body.userId)
      Question.findOneAndUpdate({
        _id: req.params.id
      }, {
        upVote: newVote
      }, function(err, rezponse) {
        if (err) res.send(err)
        else res.send(rezponse)
      })
    } else {
      res.send("udah ada")
    }
  })
}

function downVote(req, res) {
  Question.findOne({
    _id: req.params.id
  }, function(err, response) {
    if (response.downVote.indexOf(req.body.userId)  == -1) {
      let newVote = response.downVote
      newVote.push(req.body.userId)
      Question.findOneAndUpdate({
        _id: req.params.id
      }, {
        downVote: newVote
      }, function(err, rezponse) {
        if (err) res.send(err)
        else res.send(rezponse)
      })
    } else {
      res.send("udah ada")
    }
  })
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  upVote,
  downVote
}
