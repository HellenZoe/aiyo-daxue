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

  // console.log("*********************logging from /treehole--user************************", req.session.user);
  // var crtUser = req.session.user;
  var queryTreehole = Treehole.find({});
  queryTreehole.exec(function(err, ts) {
    if (err) {
      console.log(err);
    }else {
      if (ts.length != 0) {
        res.render("treeholeIndex", {
          title: "树洞首页",
          treeholes: ts
        });
      }else {
        res.render("treeholeIndex", {
          title: "树洞首页",
          treeholes: null
        });
      }
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
  //
  //
  Treehole.find({author: req.session.user._id}, function(err, ts) {
    if (err) {
      console.log("取出用户对应的树洞出错", err);
    }else {
      console.log("*******************logging from /treehole/self--treeholes***************", ts);
      res.render({
        title: "个人中心",
        treeholes: ts,
        user: req.session.user
      })
    }
  })
})

router.get('/details', function(req, res) {
  res.render('treeholeDetails', {
    title: "详情",
    //user: user
  });
})

//  发布新的树洞
router.post('/new', upload.single('test'), function(req, res) {
    console.log("*************logging from /treehole/new--user***************", req.session.user);
    var imageData = JSON.parse(req.body['imageData']);
    var content = req.body['postText'];
    var authorId = req.session.user._id;
    User.find({_id: authorId}, "name school avatarUrl", function(err, us) {
      if (err) {
        console.log(err);
      }else {
        var newTreehole = new Treehole({
            author: authorId,
            authorName: us[0].name,
            authorAvatarUrl: us[0].avatarUrl,
            authorSchool: us[0].school,
            content: content,
            title: "测试",
        })
        console.log("logging from ******************logging from /treehole/new --treeholeToSave", newTreehole);
        newTreehole.save(function(err, treehole) {
          if (err) {
            console.log("save treehole error");
          }
          console.log("*******************logging from /treehole/new--treehole", treehole);
          imageData.forEach(function(item, index) {
            var base64Data = item.split(',')[1];
            var fileType = item.split(';')[0].split('/')[1];
          	var dataBuffer = new Buffer(base64Data, 'base64');
            var cmp = Date.now();
            var picUrl = "http://obzokcbc0.bkt.clouddn.com/treehole/" + cmp + "." + fileType;
            console.log("*****************logging from /treehole/new--picUrl**************", picUrl);
            Treehole.update({author: authorId}, {$push: {"picUrl": picUrl}}, function(err, raw) {
              if (err) {
                console.log("保存treehole url出错", err);
              }else {
                console.log(raw);
              }
            });
            var tmpFilePath = "./upload/tmp/" + cmp + "." + fileType;
          	fs.writeFile(tmpFilePath, dataBuffer, function(err) {
          		if(err){
          		  console.log(err);
          		}else{
                uploadToQiniu(tmpFilePath, "treehole");
                console.log("success upload");
              }
          	});
          })

        })

      }
    })

})


module.exports = router;
