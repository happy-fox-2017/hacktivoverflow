'use strict'
const mongoose = require('mongoose');
const answerSchema = require('./answers');
const Schema = mongoose.Schema;

let questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: [answerSchema],
  likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  dislikes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  overall: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

let Question = mongoose.model('Question', questionSchema);

module.exports = Question;