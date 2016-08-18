var mongoose =require('mongoose');
var Schema = mongoose.Schema

var treeholeSchema = Schema({
  picUrl: [ String ],
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
    fav: {type: Number, default: 0},
    comments: {type: Number, default: 0}
  }
})

var TreeHole = mongoose.model('TreeHole', treeholeSchema);
module.exports =  TreeHole;
