const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var questionSchema = new Schema({
  title: String,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  answer: [{
    id: String,
    description: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    created: Date
  }],
  created: Date
});

let Question = mongoose.model('Question', questionSchema);

module.exports = Question;
