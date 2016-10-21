var config = require('./db.config.js');

var mongoose = require('mongoose');
var db = null;

//  数据库连接  在app.js调用connect函数创建连接  返回实例
module.exports = {
  connect: function() {
    db = mongoose.connect(config.uri).connection;
    console.log("now connecting to mongodb");
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log('mongodb has been connected!')
    });
    return db;
      
  }
};
