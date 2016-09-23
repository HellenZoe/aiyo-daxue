var mongoose =require('mongoose');
var Schema = mongoose.Schema

var funSchema = Schema({
  picUrl: [ String ],
  title: String,
  content: String,
  author: String,
  authorAvatarUrl: String,
  authorName: String,
  authorSchool: String,
  time: { type: Date, default: Date.now},
  wantUserId: [String],
})

funSchema.virtual('date').get(function() {
  var d = new Date();
  d.setTime(this.time);
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();
  minute = (minute >= 10) ? minute : "0" +  minute;
  return month + "-" + day + "  " + hour + ":" + minute;
})


var Fun = mongoose.model('Fun', funSchema);
module.exports =  Fun;
