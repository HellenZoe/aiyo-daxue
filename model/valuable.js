var mongoose =require('mongoose');
var Schema = mongoose.Schema

var valuebleSchema = new Schema({
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

var Valueble = mongoose.model('Valueble', valuebleSchema);
module.exports =  Valueble;
