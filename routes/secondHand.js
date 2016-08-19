var express =require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var multer= require('multer');
var upload = multer();
var uploadToQiniu = require("../utils/uploadImage");
var User = require('../model/user');
var Treehole  = require('../model/treehole');
var Valueble = require('../model/valuable');
//   二手交易首页
router.get('/', function(req, res) {
  res.render('secondHandIndex', {
    title: "二手交易"
  })
})

// 二手交易发布
router.get('/post', function(req, res) {
  res.render('secondHandPost', {
    title: "发布"
  })
})


//  二手交易


router.get('/self', function(req, res) {
  if (req.session.user) {
    console.log("*************************log from /secondHand/self--req.session.user**********************", req.session.user);
    Valueble.find({author: req.session.user._id}, function(err, vs) {
      if (err) {
        console.log("取出用户对应的树洞出错", err);
      }else {
        console.log("*******************logging from /secondHand/self--valuebles***************", vs);
        if (vs) {
          res.render("secondHandSelf", {
            title: "个人中心",
            valuebles: vs,
            user: req.session.user
          })
        }else {
          res.render("secondHandSelf", {
            title: "个人中心",
            user: req.session.user,
            valuebles: null
          })
        }
      }
    })
  }else {
    res.render("secondHandSelf", {
      title: "个人中心",
      user: null,
      treeholes: null
    })
  }
})


module.exports = router;
