var express =require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var multer= require('multer');
var upload = multer();
var uploadToQiniu = require("../utils/uploadImage");
var User = require('../model/user');
var Valueble = require('../model/valuable');
//   二手交易首页
router.get('/', function(req, res) {
  res.render('secondHandIndex', {
    title: "二手交易"
  })
})

// 二手交易发布页面
router.get('/post', function(req, res) {
  res.render('secondHandPost', {
    title: "发布"
  })
})


//  发布新的商品
router.post('/new', upload.single('test'), function(req, res) {
    console.log("*************logging from /secondHand/new--user***************", req.session.user);
    console.log("*************logging from /secondHand/new--req.body***************", req.body);
    var imageData = JSON.parse(req.body['imageData']);
    var name = req.body['name'];
    var desc = req.body['desc'];
    var price = req.body['desc'];
    var location = req.body['location'];
    var category = req.body['category'];
    var qq = req.body['qq'];
    var tel = req.body['tel'];
    var authorId = req.session.user._id;
    var time = Date.now();
    User.find({_id: authorId}, "name school avatarUrl", function(err, us) {
      if (err) {
        console.log(err);
      }else {
        var newValueble = new Valueble({
            author: authorId,
            authorName: us[0].name,
            authorAvatarUrl: us[0].avatarUrl,
            authorSchool: us[0].school,
            name: name,
            desc: desc,
            status: 0,
            location: location,
            category: category,
            qq: qq,
            tel: tel,
            time: time
        })
        console.log("logging from ******************logging from /valueble/new --valuebltosave", newValueble);
        newValueble.save(function(err, treehole) {
          if (err) {
            console.log("save treehole error");
          }
          console.log("*******************logging from /treehole/new--treehole", treehole);
          imageData.forEach(function(item, index) {
            var base64Data = item.split(',')[1];
            var fileType = item.split(';')[0].split('/')[1];
          	var dataBuffer = new Buffer(base64Data, 'base64');
            var picUrl = "http://obzokcbc0.bkt.clouddn.com/secondHand/" + time + "." + fileType;
            console.log("*****************logging from /secondHand/new--picUrl**************", picUrl);
            Valueble.update({time: time}, {$push: {"picUrl": picUrl}}, function(err, raw) {
              if (err) {
                console.log("保存secondHand url出错", err);
              }else {
                console.log(raw);
              }
            });
            var tmpFilePath = "./upload/tmp/" + time + "." + fileType;
          	fs.writeFile(tmpFilePath, dataBuffer, function(err) {
          		if(err){
          		  console.log(err);
          		}else{
                uploadToQiniu(tmpFilePath, "secondHand");
                console.log("success upload");
              }
          	});
          })

        })

      }
    })

})

// 个人中心
router.get('/self', function(req, res) {
  if (req.session.user) {
    console.log("*************************log from /secondHand/self--req.session.user**********************", req.session.user);
    Valueble.find({author: req.session.user._id}, function(err, vs) {
      if (err) {
        console.log("取出用户对应的商品出错出错", err);
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
