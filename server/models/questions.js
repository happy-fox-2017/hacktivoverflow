const mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  upVote: [{
    type: String,
    required: true
  }],
  downVote: [{
    type: String,
    required: true
  }],
  createdAt: {
    type: Date,
    required: true
  },
  parent: {
    type: String
  }
})

var Question = mongoose.model("Question", questionSchema)

module.exports = Question;
