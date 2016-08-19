var mongoose =require('mongoose');
var Schema = mongoose.Schema

var commentSchema = new Schema({
  treeholeId: String,
  authorName: String,
  authorAvatarUrl: String,
  authorSchool: String,
  content: String,
  replyToId: String,
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
  var year = p.getYear() - d.getYear();
  var month = p.getMonth()  -d.getMonth();
  var date = p.getDate() - d.getDate();
  var hour = p.getHours() - d.getHours();
  var minute = p.getMinutes() - d.getMinutes();
  if (year > 1) {
    return "超久了"
  }else {
    if ( (month = 1 && date > 0) || (month >= 2)) {
      return "一个月以前"
    }else{
      if (mon =1 && date < 0) {
        return 30 + date + "天之前";
      }else {
        if (date >= 1) {
          return date + "天之前";
        }else{
          if (hour >= 1) {
            return hour + "小时之前";
          }else {
              return minute + "分钟之前";
          }

        }
      }
    }
    return minute + "分钟之前";
  }
})

var Comment = mongoose.model('Comment', commentSchema);

module.exports =  Comment;
