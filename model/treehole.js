var mongoose =require('mongoose');
var Schema = mongoose.Schema

var treeholeSchema = Schema({
  picUrl: [ String ],
  title: String,
  content: String,
  author: String,
  authorAvatarUrl: String,
  authorName: String,
  authorSchool: String,
  comment: [{
    author: String,
    reply: String,
    time: {type: Date, default: Date.now},

  }],
  time: { type: Date, default: Date.now},
  meta: {
    fav: {type: Number, default: 0},
    comments: {type: Number, default: 0}
  }
})

treeholeSchema.virtual('date').get(function() {
  var d = new Date();
  d.setTime(this.time);
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();
  minute = (minute >= 10) ? minute : minute + "0";
  return month + "-" + day + "  " + hour + ":" + minute;
})


var TreeHole = mongoose.model('TreeHole', treeholeSchema);
module.exports =  TreeHole;
