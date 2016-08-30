var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require("multer");
var session = require("express-session");
var mongoStore = require("connect-mongo")(session);

var app = express();


//连接数据库
var dbConnect = require('./config/db.js');
var connection = dbConnect.connect();


// 设置模板和模板目录
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//  设置中间件
app.use(logger('dev'));
// app.use(multer({dest: "../public/uploads/"}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  store: new mongoStore({mongooseConnection: connection}),
  secret: "aiyodaxue",
  key: "aiyodaxue",//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  resave: true,
  saveUninitialized: true,
}))
 //设置静态目录
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  var url  = req.originalUrl;
  if (url != "/signin" && !req.session.user) {
    return res.redirect('/signin');
  }
  next();
})
// 设置路由
var routes = require('./routes/index');
routes(app);


// 处理404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
