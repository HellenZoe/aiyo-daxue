var mongoose =require('mongoose');
var Schema = mongoose.Schema

var commentSchema = new Schema({
  content: String,
  reply: Schema.Types.ObjectId,
  time: {type: Date, default: Date.now},
  type: String
})

var Comment = mongoose.model('Comment', commentSchema);

module.exports =  Comment;
