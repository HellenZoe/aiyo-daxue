var express =require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var multer= require('multer');
var upload = multer();
var uploadToQiniu = require("../utils/uploadImage");
var User = require('../model/user');
var Treehole  = require('../model/treehole');

router.get('/', function(req, res) {

  console.log("*********************logging from /treehole--user************************", req.session.user);
  // var crtUser = req.session.user;
  Treehole.find(function(err, docs) {
    if (err) {
      console.log("取出用户对应的树洞出错", err);
    }else {
      console.log("*******************logging from /treehole--treeholes***************", docs);
      res.render('treeholeIndex', {title: "树洞", treeholes: docs});
    }
  })

})

// 发布树洞页
router.get('/post', function(req, res) {
  res.render('treeholePost', {title: "发布"});
})

// 个人中心页
router.get('/self', function(req, res) {
  //  这是之前的实现方式   现在已经改用session实现
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
    console.log("*************logging from /treehole/new--user***************", req.session.user);
    console.log("*************logging from /treehole/new--req.body**************", req.body['postInfo']);
    console.log("*************logging from /treehole/new--req.body**************", JSON.parse(req.body['postInfo']));
    var imageData= req.body['postInfo'].pics;
    var content = req.body['postInfo'].postText;
    var author = req.body['postInfo'].author;
    var avatarUrl = req.session.user.avatarUrl;
    var newTreehole = new Treehole({
        author: avatarUrl,
        content: content,
        title: "测试",
    })
    newTreehole.save(function(err, treehole) {
      if (err) {
        console.log("save treehole error");
      }
      console.log("*******************logging from /treehole/new--treehole", treehole);
    })
    console.log("******************logging from /treehole/new--imageData*************", imageData);
    imageData.forEach(function(item, index) {
      var base64Data = item.split(',')[1];
      var fileType = item.split(';')[0].split('/')[1];
    	var dataBuffer = new Buffer(base64Data, 'base64');
      var cmp = Date.now();
      var picUrl = "obzokcbc0.bkt.clouddn.com/treehole/" + cmp + "." + fileType;
      Treehole.update({author: author}, {"$push": {"picUrl": picUrl}}, function(err, raw) {
        if (err) {
          console.log("保存treehole url出错", err);
        }else {
          console.log(raw);
        }
      });
      var tmpFilePath = "./upload/tmp/" + cmp + "." + fileType;
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

})


module.exports = router;
