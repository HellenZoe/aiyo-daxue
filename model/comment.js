var mongoose =require('mongoose');
var Schema = mongoose.Schema

var commentSchema = new Schema({
  commentToAuthor: String,
  commentToTime: String,
  author: String,
  content: String,
  reply: String,
  time: {type: Date, default: Date.now},
  type: String
})

var Comment = mongoose.model('Comment', commentSchema);

module.exports =  Comment;
