const Question = require('../models/question')

var sowAllQuestion = (req,res,next) =>{
     Question.find().populate(['author', 'answer.author']).exec((err,result) =>{
          if(err) {
               res.send(err)
          } else {
               res.send(result.reverse());
          }
     })
}

var sowOneQuestion = (req,res,next) =>{
     Question.findOne({
          _id:req.params.id
     })
     .populate(['author', 'answer.author'])
     .exec((err, result) =>{
          if(err) {
               res.send(err)
          } else {
               res.send(result)
          }
     })
}

var createQuestion = (req,res,next) =>{
     Question.create({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      created: new Date()
     }, function(err, result) {
      if (result) {
         res.send(result);
      } else {
         res.send(err);
      }
     });
}


var updateQuestion = (req,res,next) =>{
     var author_id = req.params.userid;
     var question_id = req.params.id
     Question.findOne({
          _id: question_id,
          author : author_id
     }).exec(function(err, result) {
          if(result) {
               Question.update({
                    _id : question_id
               }, {
                    $set: {
                         title : req.body.title || result.body,
                         description : req.body.description || result.description
                    }
               }, function(err, result) {
                    if(result) {
                         res.send(result)
                    } else {
                         res.send(err)
                    }
               })
          } else {
               res.send({
                    success: false,
                    err: true,
                    message: 'Err Update'
               })
          }
     })
}

var deleteQuestion = (req,res,next) =>{
     var author_id = req.params.userid;
     var question_id = req.params.id
     Question.findOne({
          _id: question_id,
          author: author_id
     }).exec(function(err, result) {
          if(result) {
               Question.findByIdAndRemove(question_id, (err, result) =>{
                    if(err) {
                         res.send(err)
                    } else {
                         res.send(result)
                    }
               })
          } else {
               res.json({
                    success : false,
                    err: true,
                    message: 'Err Delete'
               })
          }
     })
}

var updateQuestion_sub = (req, res, next) => {
  let question_id = req.body.id;
  let answer_id = req.body.answerid;
  let author_id = req.body.userid;
  Question.findOne({
   _id: question_id
  }).exec(function(err, result) {
   if (result) {
      var idx;
      var temp = result.answer.filter(function(answer, index) {
        if (answer.id == answer_id) {
          idx = index;
          return answer.id;
        }
      })
      if (temp.length == 1) {
        if (temp[0].author == author_id) {
          var arrtemp = result.answer;
          arrtemp[idx].description = req.body.description;
          Question.update({
            _id: question_id
          }, {
            $set: {
              answer: arrtemp
            }
          }, function(err, result) {
            if (result) {
              res.send(result);
            } else {
              res.send(err);
            }
          });
        } else {
          res.json({
            success: false,
            err: true,
            message: 'Err Sub Update : You havent access'
          });
        }
      } else {
        res.json({
          success: false,
          err: true,
          message: 'Err Sub Update : Answer not found'
        });
      }
   } else {
      res.json({
        success: false,
        err: true,
        message: 'Err Sub Update : Question not found'
      });
   }
  })
}

 var createQuestion_sub = (req, res, next) => {
     let question_id = req.body.id;
     let author_id = req.body.userid;
     Question.findOne({
       _id: question_id
     }).exec(function(err, result) {
       if (result) {
         var obj = {};
         obj.id = Math.floor((Math.random() * 1234) + 1);
         obj.description = req.body.description;
         obj.author = author_id;
         obj.created = new Date;
         result.answer.push(obj);
         Question.update({
           _id: question_id
         }, {
           $set: {
             answer: result.answer
           }
         }, function(err, result) {
           if (result) {
             res.send(result);
           } else {
             res.send(err);
           }
         });
       } else {
         res.json({
           success: false,
           err: true,
           message: 'Err Answer : Authorized failed'
         });
       }
     });
   }

 var  deleteQuestion_sub = function(req, res) {
    let question_id = req.params.id;
    let answer_id = req.params.answerid;
    let author_id = req.params.userid;
    Question.findOne({
      _id: question_id
    }).exec(function(err, result) {
      if (result) {
        var idx;
        var temp = result.answer.filter(function(answer, index) {
          if (answer.id == answer_id) {
            idx = index;
            return answer.id;
          }
        })
        if (temp.length == 1) {
          if (temp[0].author == author_id || result.author == author_id) {
            var arrtemp = result.answer.filter(function(answer, index) {
              if (idx != index) {
                return answer;
              }
            })
            Question.update({
              _id: question_id
            }, {
              $set: {
                answer: arrtemp
              }
            }, function(err, result) {
              if (result) {
                res.send(result);
              } else {
                res.send(err);
              }
            });
          } else {
            res.json({
              success: false,
              err: true,
              message: 'Err Delete : Not can Access'
            });
          }
        } else {
          res.json({
            success: false,
            err: true,
            message: 'Err Delete : Answer not found'
          });
        }
      } else {
        res.json({
          success: false,
          err: true,
          message: 'Err Delete : Question not found'
        });
      }
    });
  }


module.exports = {
     sowAllQuestion,
     sowOneQuestion,
     createQuestion,
     updateQuestion,
     deleteQuestion,
     updateQuestion_sub,
     createQuestion_sub,
     deleteQuestion_sub
}
