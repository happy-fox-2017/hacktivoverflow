const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var voteSchema = new Schema({
  id_vote: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  action: Boolean
});

let Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
