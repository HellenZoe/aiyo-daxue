var mongoose =require('mongoose');
var Schema = mongoose.Schema

var commentSchema = new Schema({
  treeholeId: String,
  authorName: String,
  authorAvatarUrl: String,
  authorSchool: String,
  content: String,
  replyToName: String,
  replyToContent: String,
  time: {type: Date, default: Date.now},
  type: String
})

var Comment = mongoose.model('Comment', commentSchema);

module.exports =  Comment;
