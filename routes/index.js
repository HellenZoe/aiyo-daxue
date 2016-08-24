var treehole = require('./treehole');
var secondHand = require('./secondHand');
var User = require("../model/user");
var lost = require('./lost');
var play = require('./play');
var fun = require('./fun');
var trade = require('./trade');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', {title: "首页", })
  })

  app.get('/test', function(req, res) {
    res.render('test', {
      title: "测试"
    })
  })

  app.get('/signin', function(req, res) {
    res.render('signin', {
      title: "注册"
    })
  })


  app.get('/welcome', function(req, res) {
    res.render('welcome', {
      title: "成功注册",
    })
  })

  app.post('/user', function(req, res) {
    var userName = req.body.userName;
    var avatarUrl = req.body.avatarUrl;
    var gender = req.body.gender;
    var redirectUrl = req.body.redirectUrl;
    var newUser =  new User({
      name: userName,
      gender: gender,
      avatarUrl: avatarUrl,
    });
    console.log("*******************logging from /user************************", newUser);
    newUser.save(function(err, user) {
      if (err) {
        console.log("save user error!");
      }else {
        // 将user存储到session 保持用户登陆
        req.session.user = user;
        console.log("*************************logging from /user*********************", req.session);
        // res.redirect(redirectUrl);
        res.json({
          success: true,
          userInfo: user
        })
      }
    })


  })
  app.use('/treehole', treehole);
  app.use('/secondHand',  secondHand);
  app.use('/lost', lost);
  app.use('/play', play);
  app.use('/fun', fun);
  app.use('/trade', trade);  


}
