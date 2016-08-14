var mongoose =require('mongoose');
var Schema = mongoose.Schema

var goodsSchema = new Schema({
  name: String,
  des: String,
  picUrl: [ String ],
  type: Number,
  location: String,
  category: String,
  qq: String,
  tel: String,
  time: {type: Date, default: Date.now}
})

var Goods = mongoose.model('goods', goodsSchema);
module.exports =  Goods;
