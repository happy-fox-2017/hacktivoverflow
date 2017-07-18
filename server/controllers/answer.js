const Answerquetionquetion = require('../models/answer');

 var  showAll_Answer = function(req, res) {
    Answerquetion.find().populate('author').exec((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }

 var  showOneAnswer = function(req, res) {
    Answerquetion.findOne({
      _id: req.params.id
    }).exec((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }

  var updateAnswer = (req, res, next) => {
    let id = req.params.id;
    Answerquetion.findOne({
      _id: id
    }).exec(function(err, result) {
      if (result) {
        Answerquetion.update({
          _id: id
        }, {
          $set: {
            description: req.body.description || result.description
          }
        }, function(err, result) {
          if (result) {
            res.send(result);
          } else {
            res.send(err);
          }
        });
      } else {
        res.send(err);
      }
    });
  }

  var createAnswer = (req, res, next) => {
    Answerquetion.create({
      description: req.body.description,
      author: req.body.author,
      created: new Date
    }, function(err, result) {
      if (result) {
        res.send(result);
      } else {
        res.send(err);
      }
    });
  }

  var deleteAnswer = function(req, res) {
    Answerquetion.findByIdAndRemove(req.params.id, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }


module.exports = {
     showAll_Answer,
     showOneAnswer,
     updateAnswer,
     createAnswer,
     deleteAnswer
}
