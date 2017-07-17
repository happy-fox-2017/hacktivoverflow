const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
    content: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    like: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

var Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;