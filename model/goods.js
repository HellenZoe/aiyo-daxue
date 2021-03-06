var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var goodsSchema = new Schema({
  type: String,
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
  view: Number
});


goodsSchema.virtual('category_ch').get(function() {
  switch (this.category) {
    case "other":
      return "其他";
      break;
    case "sport":
      return "运动";
      break;
    case "ele":
      return "数码";
      break;
    case "card":
      return "卡证";
      break;
    default:
      break;
  }
});

goodsSchema.virtual('date').get(function() {
  var d = new Date();
  d.setTime(this.time);
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();
  minute = (minute >= 10) ? minute : "0" +  minute;
  return month + "-" + day + "  " + hour + ":" + minute;
});

var Goods = mongoose.model('goods', goodsSchema);
module.exports =  Goods;
