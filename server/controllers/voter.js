const Vote = require('../models/vote');

var createVoter = (req, res, next) => {
   Vote.findOne({
     id_obj: req.body.id_obj,
     author: req.body.author,
   }).exec((err, result) => {
     if (err) {
       res.send(err);
     } else {
       if (result) {
         if (result.action == req.body.action) {
          res.send({
            result: false
          });
         } else {
          Vote.update({
            _id: result._id
          }, {
            $set: {
               action: req.body.action
            }
          }, function(err, result) {
            if (result) {
               res.send({
                 result: true
               });
            } else {
               res.send(err);
            }
          });
         }
       } else {
         Vote.create({
          id_obj: req.body.id_obj,
          author: req.body.author,
          action: req.body.action
         }, function(err, result) {
          if (result) {
            res.send({
               result: true
            });
          } else {
            res.send(err);
          }
         });
       }
     }
   });
 }

var showAllVoter = function(req, res) {
    Vote.find().populate('author').exec((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }


 var  showOneVoter = function(req, res) {
    Vote.find({
      id_obj: req.params.id
    }).exec((err, result) => {
      if (err) {
        res.send(err);
      } else {
        let down = 0,
           up = 0;
        result.forEach(arr => {
          if (arr.action) {
            up++;
          } else {
            down++;
          }
        })
        res.send({
          down: down,
          up: up,
          data: result
        });
      }
    });
  }

 var  updateVoter = (req, res, next) => {
    let id = req.params.id;
    Vote.findOne({
      _id: id
    }).exec(function(err, result) {
      if (result) {
        Vote.update({
          _id: id
        }, {
          $set: {
            action: req.body.action || result.action
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


var  deleteVoter = function(req, res) {
    Vote.findByIdAndRemove(req.params.id, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }


module.exports = {
     createVoter,
     showAllVoter,
     showOneVoter,
     updateVoter,
     deleteVoter
}
