var mongoose =require('mongoose');
var Schema = mongoose.Schema

var singletonSchema = new Schema({
  name: String,
  price: String,
  picUrl: [String]
})

var Singleton = mongoose.model('Singleton', singletonSchema);
module.exports =  Singleton;
