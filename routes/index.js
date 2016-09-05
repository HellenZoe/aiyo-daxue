var treehole = require('./treehole');
var secondHand = require('./secondHand');
var User = require("../model/user");
var lost = require('./lost');
var play = require('./play');
var fun = require('./fun');
var trade = require('./trade');

module.exports = function(app) {
  //  首页
  app.get('/', function(req, res) {
    res.render('index', {title: "首页", })
  })

  app.get('/test', function(req, res) {
    res.render('test', {
      title: "测试"
    })
  })

  //  登陆页面
  app.get('/signin', function(req, res) {
    res.render('signin', {
      title: "注册"
    })
  })

  //  登陆成功页面
  app.get('/welcome', function(req, res) {
    res.render('welcome', {
      title: "成功注册",
    })
  })


  app.post('/admin/login')
  //  个人中心页面
  app.get('/self', function(req, res) {
    res.render('self', {
      title: "个人信息"
    })
  })


  app.post('/admin/login', function(req, res) {
    var name = req.body.name;
    var password = req.body.password;

    if (name == "heiheihei" && password == "hahaha") {
        res.json({
          success: true
        })
    }
  })
  //  个人中心信息完善
  app.post('/self', function(req, res) {
    var name = req.body.name;
    var gender = req.body.gender;
    var tel = req.body.tel;
    var qq = req.body.qq;
    var school = req.body.school;
    var department = req.body.department;
    console.log("*********logging from /self*****req.body", req.body);
    console.log("*********logging from /self*****req.session.user", req.session.user);
    User.update({_id: req.session.user._id}, {
      name: name,
      gender: gender,
      tel: tel,
      qq: qq,
      school: school,
      department: department
    }, function(err, u) {
      if (err) {
        console.log(err);
      }else {
        res.json({
          success: true,
        })
      }
    })
  })

  //  新增用户
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
