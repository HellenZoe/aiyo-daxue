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
