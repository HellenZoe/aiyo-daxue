var express =require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var multer= require('multer');
var upload = multer();
var uploadToQiniu = require("../utils/uploadImage");
var User = require('../model/user');
var Goods = require('../model/goods');
var Play = require('../model/play');

//   去约首页
router.get('/', function(req, res) {
  res.render("playIndex", {
    title: "去约"
  })
})

// 去约发布页面
router.get('/post', function(req, res) {
  res.render('playPost', {
    title: "发布"
  })
})


//  发布新的去约
router.post('/new', upload.single('test'), function(req, res) {
    console.log("*************logging from /play/new--user***************", req.session.user);
    console.log("*************logging from /play/new--req.body***************", req.body);
    var imageData = JSON.parse(req.body['imageData']);
    var type = req.body['type'];
    var name = req.body['name'];
    var desc = req.body['desc'];
    var address = req.body['address'];
    var qq = req.body['qq'];
    var tel = req.body['tel'];
    var price = req.body['price'];
    var authorId = req.session.user._id;
    var time = Date.now();
    User.find({_id: authorId}, "name school avatarUrl", function(err, us) {
      if (err) {
        console.log(err);
      }else {
        var newPlay = new Play({
            author: authorId,
            authorName: us[0].name,
            authorAvatarUrl: us[0].avatarUrl,
            authorSchool: us[0].school,
            name: name,
            desc: desc,
            status: 0,
            location: location,
            qq: qq,
            tel: tel,
            time: time,
            type: type,
            price: price
        })
        console.log("logging from ******************logging from /lost/new --losttosave", newPlay);
        newPlay.save(function(err, l) {
          if (err) {
            console.log("save treehole error");
          }
          console.log("*******************logging from /lost/new--lost", l);
          imageData.forEach(function(item, index) {
            var base64Data = item.split(',')[1];
            var fileType = item.split(';')[0].split('/')[1];
          	var dataBuffer = new Buffer(base64Data, 'base64');
            var picUrl = "http://obzokcbc0.bkt.clouddn.com/secondHand/" + time + "." + fileType;
            console.log("*****************logging from /secondHand/new--picUrl**************", picUrl);
            newPlay.update({time: time}, {$push: {"picUrl": picUrl}}, function(err, raw) {
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
                uploadToQiniu(tmpFilePath, "lost");
                res.json({success: true})
                console.log("success upload");
              }
          	});
          })

        })

      }
    })

})


// 查看去约详情
router.get('/detail/:id', function(req, res) {
  res.render('playDetail', {
    title: "商品详情"
  })
})

//  操作
router.post('/action', function(req, res) {
  var pId = req.body.pId;
  switch (req.body.type) {
    case "del":
      Play.remove({_id: pId}, function(err, p) {
        if (err) {
          console.log(err);
        }else {
          res.json({
            success: true
          });
        }
      })
      break;
    default:

  }
})


// 个人中心
// router.get('/self', function(req, res) {
//   if (req.session.user) {
//     console.log("*************************log from /secondHand/self--req.session.user**********************", req.session.user);
//     Valueble.find({author: req.session.user._id}, function(err, vs) {
//       if (err) {
//         console.log("取出用户对应的商品出错出错", err);
//       }else {
//         console.log("*******************logging from /secondHand/self--valuebles***************", vs);
//         if (vs) {
//           res.render("secondHandSelf", {
//             title: "个人中心",
//             valuebles: vs,
//             user: req.session.user
//           })
//         }else {
//           res.render("secondHandSelf", {
//             title: "个人中心",
//             user: req.session.user,
//             valuebles: null
//           })
//         }
//       }
//     })
//   }else {
//     res.render("secondHandSelf", {
//       title: "个人中心",
//       user: null,
//       treeholes: null
//     })
//   }
// })

//个人中心
router.get('/self', function(req, res) {
  res.render('playSelf', {
    title: "个人中心"
  })
})


module.exports = router;
