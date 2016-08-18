var express =require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var multer= require('multer');
var upload = multer();
var uploadToQiniu = require("../utils/uploadImage");
var User = require('../model/user');


router.get('/', function(req, res) {
  console.log("*********************8logging from /treehole************************"，req.session.user);
  res.render('treeholeIndex', {title: "树洞"})
})

// 发布树洞页
router.get('/post', function(req, res) {
  res.render('treeholePost', {title: "发布"})
})

// 个人中心页
router.get('/self', function(req, res) {
  //  如果请求参数有  那么去除对应的user   返回
  // console.log("*************************log from /treehole/self--req.query.avatarUrl**********************", req.query.avatarUrl);
  // if (req.query.avatarUrl) {
  //   User.find({avatarUrl: req.query.avatarUrl}, function(err, docs) {
  //     console.log("******************************log from /treehole/self--docs*******************", docs);
  //     return res.render('treeholeSelf', {
  //       title: "个人中心",
  //       user: docs[0]
  //     })
  //   })
  // }else{
  //   // 如果没有 说明没有登陆
  //   res.render('treeholeSelf', {
  //     title: "个人中心",
  //     user: ''
  //   })
  // }
  var user = req.session.user;
  console.log("********************logging from /treehole/self***********************", req.session);
  res.render('treeholeSelf', {
    title: "个人中心",
    user: user
  });
})

//  发布新的树洞
router.post('/new', upload.single('test'), function(req, res) {
    var imageData= req.body['imageData'];
    var base64Data = imageData.split(',')[1];
    var fileType = imageData.split(';')[0].split('/')[1];
  	var dataBuffer = new Buffer(base64Data, 'base64');
    var tmpFilePath = "./upload/tmp/" + Date.now() + "." + fileType;
  	fs.writeFile(tmpFilePath, dataBuffer, function(err) {
  		if(err){
        console.log("创建临时文件出错");
  		  res.send(err);
  		}else{
        uploadToQiniu(tmpFilePath, "treehole");
        console.log("success upload");
        res.send(JSON.stringify({url: "tmp/out.png"}));
      }
  	});

})


module.exports = router;
