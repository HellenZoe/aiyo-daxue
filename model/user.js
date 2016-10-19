var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: String,
    openId: String,
    token: String,
    avatarUrl:String,
    redirectUrl:String,
    tel: String,
    qq: String,
    school: String,
    department: String,
    status: Number
});


var User = mongoose.model('User', UserSchema);
module.exports =  User;
