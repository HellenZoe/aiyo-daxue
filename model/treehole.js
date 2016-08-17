var mongoose =require('mongoose');
var Schema = mongoose.Schema

var treeholeSchema = Schema({
  picurl: String,
  title: String,
  content: String,
  author: String,
  comment: [{
    author: String,
    reply: String,
    time: {type: Date, default: Date.now},

  }],
  time: { type: Date, default: Date.now},
  meta: {
    fav: Number,
    comments: Number
  }
})

var TreeHole = mongoose.model('TreeHole', treeholeSchema);
module.exports =  TreeHole;
