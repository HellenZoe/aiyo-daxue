var config = require('./db.config.js');

var mongoose = require('mongoose');

var db = null;

module.exports = {
  connect: function() {
    db = mongoose.connect(config.uri).connection;
    console.log("now connecting to mongodb");
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log('mongodb has been connected!')
    })
  }

  db: db
}
