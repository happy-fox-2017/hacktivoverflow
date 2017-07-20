const question = require('../models/questions');
var jwt = require('jsonwebtoken')
require('dotenv').config()
var ObjectId = require('mongodb').ObjectID;

let postQuestion = (req, res) => {
  console.log(req.body.author);
  var decoded = jwt.verify(req.body.author, process.env.SECRET);
  question.create({
    title: req.body.title,
    content: req.body.content,
    author: decoded.id,
    answers: [],
    likes: [],
    dislikes: [],
    overall: 0
  }, (err, posted) => {
    if (err) {
      res.send(err);
    } else {
      res.send(posted);
    }
  })
}

let getAllQuestions = (req, res) => {
  question.find({})
    .populate('author')
    .populate('answers.author')
    .exec((err, results) => {
      if (err) {
        res.send(err)
      } else {
        res.send(results)
      }
    })
}

let getBestQuestions = (req, res) => {
  question.find({})
    .sort({'overall': -1})
    .limit(5)
    // .populate('author')
    // .populate('answers.author')
    .then((err, results) => {
      if (err) {
        res.send(err)
      } else {
        res.send(results)
      }
    })
}

let getOneQuestion = (req, res) => {
  console.log(req.params.question_id);
  question.findById(req.params.question_id)
    .populate('author')
    .populate('answers.author')
    .exec((err, resultQuestion) => {
      if (err) {
        res.send(err);
      } else {
        res.send(resultQuestion);
      }
    })
}

let editQuestion = (req, res) => {
  question.findByIdAndUpdate(req.params.question_id, req.body, {
      new: true
    },
    (err, new_question) => {
      if (err) {
        res.send(err);
      } else {
        res.send(new_question);
      }
    })
}

let destroyQuestion = (req, res) => {
  question.remove({
    _id: req.params.question_id
  }, (err, old_Question) => {
    if (err) {
      res.send(err);
    } else {
      res.send(old_Question);
    }
  })
}

let likeQuestion = (req, res) => {
  var decoded = jwt.verify(req.body.author, 'itssecret');
  question.findById(req.params.question_id)
  .populate('author')
  .populate('answers.author')
  .then(onlyQuestion => {
    for (var i = 0; i < onlyQuestion.likes.length; i++) {
      console.log('ngulang', decoded.id, onlyQuestion.likes.length);
      if (onlyQuestion.likes[i] === decoded.id) {
        console.log('dapet');
        res.send('you have done that')
      }
    }
    console.log('kesini dia');
    question.update({
      _id: ObjectId(req.params.id)
    },{
      $push: {
        'likes': req.body.user_id
      },
      $inc: {
        'overall': 1
      }
    }, {
      safe: true,
      upsert: true,
      new: true
    }, (err, toLikeQuestion) => {
      if (err) {
        console.log('err banget');
        res.send(err)
      } else {
        console.log('err ngg ad');
        res.send(toLikeQuestion)
      }
    })
  })
}

let dislikeQuestion = (req, res) => {
  var decoded = jwt.verify(req.body.author, 'itssecret');
  question.findById(req.params.question_id)
  .populate('author')
  .populate('answers.author')
  .then(onlyQuestion => {
    for (var i = 0; i < onlyQuestion.likes.length; i++) {
      if (onlyQuestion.likes[i] === decoded.id) {
        res.send('you have done that')
      }
    }
    question.findByIdAndUpdate(req.params.question_id, {
      $push: {
        'dislikes': req.body.user_id
      },
      $inc: {
        'overall': -1
      }
    }, {
      safe: true,
      upsert: true,
      new: true
    }, (err, toDislikeQuestion) => {
      if (err) {
        res.send(err)
      } else {
        res.send(toDislikeQuestion)
      }
    })
  })
}

// Answers Sections

let postAnswer = (req, res) => {
  question.findByIdAndUpdate(req.params.question_id, {
    $push: {
      'answers': {
        author: req.body.author,
        content: req.body.content,
        likes: [],
        dislikes: [],
        overall: 0
      }
    }
  }, {
    safe: true,
    upsert: true,
    new: true
  }, (err, answer) => {
    if (err) {
      res.send(err);
    } else {
      res.send(answer);
    }
  })
}

let findAllAnswers = (req, res) => {
  question.findById(req.params.question_id, (err, questionFound) => {
    if (err) {
      res.send(err)
    } else {
      res.send(questionFound.answers)
    }
  })
}

let likeAnswers = (req, res) => {
  question.findOne({
    _id: req.params.question_id
  }, {
    answers: { $elemMatch: { _id: req.params.answers_id } }
  })
  // .populate('author')
  .populate('answers.author')
  .exec((err, specificAnswer) => {
    if (err) {
      console.log('sdfsdfsdfs');
      res.send(err);
    } else {
      console.log('ambil satu',specificAnswer);
      // console.log('sdfsdfsdfsmasuk');
      // question.answers[0].likes.push(req.body.author)
      // console.log(question.answers);
      question.update({
        $push: {
          'answers[0].likes': req.body.author
        }
      }, {
        safe: true,
        upsert: true,
        new: true
      }, (err, result) => {
        if (err) {
          res.send(err)
        }
        console.log('results', question.answers);
        res.send(result)
      })
    }
  })
}

let likeAnswerss = (req, res) => {
  question.findByIdAndUpdate(req.params.question_id, {
    $push: {
      'answers.likes': req.body.user_id
    }
  }, {
    safe: true,
    upsert: true,
    new: true
  }, (err, toLikeQuestion) => {
    if (err) {
      res.send(err)
    } else {
      res.send(toLikeQuestion)
    }
  })
}

let dislikeAnswers = (req, res) => {
  question.findByIdAndUpdate(req.params.question_id, {
    $push: {
      'answers.dislikes': req.body.user_id
    }
  }, {
    safe: true,
    upsert: true,
    new: true
  }, (err, toLikeQuestion) => {
    if (err) {
      res.send(err)
    } else {
      res.send(toLikeQuestion)
    }
  })
}

module.exports = {
  getOneQuestion,
  getBestQuestions,
  postQuestion,
  getAllQuestions,
  editQuestion,
  destroyQuestion,
  likeQuestion,
  dislikeQuestion,
  postAnswer,
  findAllAnswers,
  likeAnswers,
  dislikeAnswers
};


// NANTI DIBUAT EDIT ANSWERNYA
// let editAnswer = (req, res) => {
//   question.findById(req.params.question_id)
//   .populate('answers.author')
//   .exex((err, result) => {
//     result.answers.forEach()
//   })
// }