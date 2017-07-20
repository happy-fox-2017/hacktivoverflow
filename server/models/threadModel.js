var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var threadSchema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    threadContent: {
      type: String,
      required: true
    },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    replies: [{type: Schema.Types.ObjectId, ref: 'Response' }],
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: Date,
    updatedAt: Date
});

var Thread  = mongoose.model('Thread', threadSchema);

module.exports = Thread;
