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


commentSchema.virtual('date').get(function() {
  var n = Date.now();
  var d = new Date();
  var p = new Date();
  d.setTime(this.time);
  p.setTime(n);
  var month = p.getMonth()  -d.getMonth();
  var hour = p.getHours() - d.getHours();
  var minute = p.getMinutes() - d.getMinutes();
  if (month > 1) {
    return "超久了"
  }else {
    return minute + "分钟之前";
  }
})

var Comment = mongoose.model('Comment', commentSchema);

module.exports =  Comment;
