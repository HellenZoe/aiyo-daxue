var treehole = require('./treehole');
var secondHand = require('./secondHand');
var User = require("../model/user");
var Seller = require("../model/seller");
var lost = require('./lost');
var play = require('./play');
var fun = require('./fun');
var trade = require('./trade');
var schoolList = require('../data/school');
var fs = require('fs');


module.exports = function(app) {
  //  首页
  app.get('/', function(req, res) {
    res.render('index', {title: "哎哟大学", })
  })

  app.get('/test', function(req, res) {
    var html = fs.readFileSync('/root/app/aiyo-daxue/test/test.html', 'utf-8');
    res.send(html);
    // fs.readFile('/root/files/test.html', function(err, data) {
    //   if (err) {
    //     console.log(err);
    //   }
    //   res.send(data);
    // })
    // res.render('test', {
    //   title: "测试"
    // })
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


  //  个人中心页面
  app.get('/self', function(req, res) {
    console.log("*************logging from /self************res.session.user", req.session.user);
    User.find({_id: req.session.user._id}, function(err, doc) {
      if (err) {
        console.log(err);
      }else {
        console.log("*************logging from /self************userinfo", doc[0]);
        res.render('self', {
          title: "个人信息",
          userInfo: doc[0]
        })
      }
    })
  })


  // app.get('/admin', function(req, res) {
  //   res.sendFile('login.html');
  // })

  //  登陆信息校验
  app.post('/admin/login', function(req, res) {
    console.log("************logging from /admin/login*********--req.body", req.body);
    var name = req.body.name;
    var password = req.body.password;

    if (name == "heiheihei" && password == "hahaha") {
        res.json({
          success: true
        })
    }else {
      res.json({
        success: false
      })
    }
  })

  //  后台审核商圈  获取当前数据
  app.get('/admin/verify/trade', function(req, res) {
    Seller.find({}, function(err, doc) {
      var draw =  parseInt(req.query.draw);
      var info = {
        "draw": draw,
        "recordsTotal": doc.length,
        "recordsFiltered": doc.length,
        "data": doc
      }
      res.json(info);
    })
  })

  //  后台 情话模块文章数据
  app.get('/admin/schoolPrattle', function(req, res) {
    Prattle.find({}, function(err, doc) {
      var draw =  parseInt(req.query.draw);
      var info = {
        "draw": draw,
        "recordsTotal": doc.length,
        "recordsFiltered": doc.length,
        "data": doc
      }
      res.json(info);
    })
  })

  //  后台 情话模块 发布新的文章



  //  个人中心信息完善
  app.post('/self', function(req, res) {
    // var name = req.body.name;
    // var gender = req.body.gender;
    var tel = req.body.tel;
    var qq = req.body.qq;
    var school = req.body.school;
    // var department = req.body.department;
    console.log("*********logging from /self*****req.body", req.body);
    console.log("*********logging from /self*****req.session.user", req.session.user);
    User.findByIdAndUpdate({_id: req.session.user._id}, {
      // name: name,
      // gender: gender,
      tel: tel,
      qq: qq,
      school: school,
      // department: department
    }, function(err, u) {
      if (err) {
        console.log(err);
      }else {
        req.session.user = u;
        console.log("+++++++++++++++++req.session.user", req.session.user);
        console.log("+++++++++++++++++u", u);
        res.json({
          success: true,
          newUserInfo: u
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

  // 返回学校信息
  app.get('/school', function(req, res) {
    res.json({
      data: schoolList,
      success: true
    })
  })



  app.use('/treehole', treehole);
  app.use('/secondHand',  secondHand);
  app.use('/lost', lost);
  app.use('/play', play);
  app.use('/fun', fun);
  app.use('/trade', trade);


}
