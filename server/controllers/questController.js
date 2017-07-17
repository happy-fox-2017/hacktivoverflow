const Question = require('../models/questions');

function getAll(req, res) {
  Question.find({}, function(err, response) {
    if (err) {
      res.send(err)
    } else {
      let questionsnyaAja = response.filter(function(x) {
        if (x.parent == "") {
          return x
        } else {
          return
        }
      })
      res.send(questionsnyaAja)
    }
  })
}

function getAllLiterally(req, res) {
  Question.find({}, function(err, response) {
    if (err) {
      res.send(err)
    } else {
      res.send(response)
    }
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
      questAndAnswer.answers = (rezponse)
      res.send(questAndAnswer)
    })
  })
}

function getByUser(req, res) {
  Question.find({
    username: req.params.username
  }, function(err, response) {
    let questionsnyaAja = response.filter(x=> {
      if (x.parent == "") {
        return x
      } else {
        return
      }
    })
    res.send(questionsnyaAja)
  })
}

function create(req, res) {
  Question.create({
    title: req.body.title,
    desc: req.body.desc,
    username: req.body.username,
    upVote: [],
    downVote: [],
    createdAt: new Date(),
    parent: req.body.parent,
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
    if (err) {
      console.log(err)
    } else {
      Question.remove({
        parent: req.params.id
      }, function(erro, rezponse) {
        if (erro) {
          console.log(erro)
        } else {
          let data = {
            questions: response,
            answers: rezponse
          }
          res.send(data)
        }
      })
    }
  })
}

function upVote(req, res) {
  Question.findOne({
    _id: req.params.id
  }, function(err, response) {
    let indexNya = response.upVote.indexOf(req.body.userId)
    if ( indexNya == -1) {
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
      response.upVote.splice(indexNya, 1)
      Question.findOneAndUpdate({
        _id: req.params.id
      }, {
        upVote: response.upVote
      }, function(err, rezponse) {
        if (err) res.send(err)
        else res.send(rezponse)
      })
    }
  })
}

function downVote(req, res) {
  Question.findOne({
    _id: req.params.id
  }, function(err, response) {
    let indexNya = response.downVote.indexOf(req.body.userId)
    if ( indexNya == -1) {
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
      response.downVote.splice(indexNya, 1)
      Question.findOneAndUpdate({
        _id: req.params.id
      }, {
        downVote: response.downVote
      }, function(err, rezponse) {
        if (err) res.send(err)
        else res.send(rezponse)
      })
    }
  })
}

module.exports = {
  getAll,
  getAllLiterally,
  getOne,
  getByUser,
  create,
  update,
  deleteOne,
  upVote,
  downVote
}
