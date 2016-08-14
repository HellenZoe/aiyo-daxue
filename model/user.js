var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  name: String,
  password: String,
  avatarUrl: String,
  tel: String,
  qq: String,
  school: String,
  department: String,
  status: Number,
  collection: {
    treeholeID: [ Schema.Types.ObejctId ],
    sellerID: [ Schema.Types.ObejctId ],
    goodsId: [ Schema.types.ObejctId ],
    valuebleId: [ Schema.types.ObejctId ]
  }
})

var User = mongoose.model('User', UserSchema);
module.exports =  User;
