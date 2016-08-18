var treehole = require('./treehole');
var User = require("../model/user");

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', {title: "首页", })
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
    })
    console.log("*******************logging from /user************************", newUser);
    newUser.save(function(err, user) {
      if (err) {
        console.log("save user error!");
      }
      // 将user存储到session 保持用户登陆状态
      req.session.user = user;
      console.log("*************************logging from /user*********************", req.session);
      res.redirect('/treehole/self');
    })


  })
  app.use('/treehole', treehole);
}
