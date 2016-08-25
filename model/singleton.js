var mongoose =require('mongoose');
var Schema = mongoose.Schema

var singletonSchema = new Schema({
  name: String,
  price: String,
  picUrl: [String],
  time: {type: Date, default: Date.now},
  sellerId: [ String ]
})

var Singleton = mongoose.model('Singleton', singletonSchema);
module.exports =  Singleton;
