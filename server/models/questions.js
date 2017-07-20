const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    title: String,
    question: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer'}],
    like: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

var Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;