'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let answerSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: true
  },
  likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  dislikes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  overall: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

module.exports = answerSchema;