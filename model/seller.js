var mongoose =require('mongoose');
var Schema = mongoose.Schema

var sellerSchema = new Schema({
  name: String,
  desc: String,
  address: String,
  picUrl: [ String ],
  category: String,
  advertisement: String,
  singletonId: [ String ],
  tel: String,
  qq: String,
  collectUserId: [ String ],
  view: Number
})

sellerSchema.virtual('category_ch').get(function() {
  switch (this.category) {
    case "other":
      return "其他"
      break;
    case "food":
      return "美食"
      break;
    case "sport":
      return "运动健身"
      break;
    case "hotel":
      return "酒店"
      break;
    case "fun":
      return "休闲娱乐"
      break;
    case "beauty":
      return "丽人美妆"
      break;
    case "book":
      return "图书教材"
      break;
    case "movie":
      return "电影"
      break;

    default:

  }
})
sellerSchema.virtual('date').get(function() {
  var d = new Date();
  d.setTime(this.time);
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();
  minute = (minute >= 10) ? minute : "0" +  minute;
  return month + "-" + day + "  " + hour + ":" + minute;
})

var Seller = mongoose.model('Seller', sellerSchema);
module.exports =  Seller;
