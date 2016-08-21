var mongoose =require('mongoose');
var Schema = mongoose.Schema

var valuebleSchema = new Schema({
  name: String,
  desc: String,
  picUrl: [ String ],
  status: Number,
  location: String,
  category: String,
  qq: String,
  tel: String,
  time: {type: Date, default: Date.now},
  author: String,
  authorName: String,
  authorSchool: String,
  authorAvatarUrl: String,
  price: Number,
  view: Number
})

valuebleSchema.virtual('date').get(function() {
  var d = new Date();
  d.setTime(this.time);
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();
  minute = (minute >= 10) ? minute : "0" +  minute;
  return month + "-" + day + "  " + hour + ":" + minute;
})

var Valueble = mongoose.model('Valueble', valuebleSchema);
module.exports =  Valueble;
