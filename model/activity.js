var mongoose =require('mongoose');
var Schema = mongoose.Schema


var activitySchema  = new Schema({
  title: String,
  des: String,
  id: Number,
  picUrl: String
})

var Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
