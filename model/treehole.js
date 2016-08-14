var mongoose =require('mongoose');
var Schema = mongoose.Schema

var treeholeSchema = Schema({
  picurl: String,
  title: String,
  text: String,
  author: Schema.Types.ObjectId,
  comment: [ Schema.Types.ObjectId ],
  time: { type: Date, default: Date.now},
  meta: {
    fav: Number,
    comments: Number
  }
})

var TreeHole = mongoose.model('TreeHole', treeholeSchema);
module.exports =  TreeHole;
