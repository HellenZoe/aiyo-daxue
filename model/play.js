var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaySchema = new Schema({
  title: String,   //  文章的标题
  time: { type: Date, default: Date.now},  // 发布的时间  要格式化
  author: String,   //  文章的作者
  view: Number,    // 浏览次数
  content: String,   //  文章的内容　　由stackEdit生成的html字符串
  path: String,    //储存在服务器的路径
  backImgPath: String
})


PlaySchema.virtual('date').get(function() {
  var d = new Date();
  d.setTime(this.time);
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();
  minute = (minute >= 10) ? minute : "0" +  minute;
  return month + "-" + day + "  " + hour + ":" + minute;
})


var Play = mongoose.model('Play', PlaySchema);
module.exports =  Play;
