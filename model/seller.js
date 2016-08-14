var mongoose =require('mongoose');
var Schema = mongoose.Schema

var sellerSchema = new Schema({
  name: String,
  des: String,
  location: String,
  picUrl: [ String ],
  category: String,
  advertisement: String,
  singletonInfo: [ Schema.Types.ObjectId],
  contaction: {
    tel: String,
    qq: String,
    message: String
  },
  hot: Number
})
