var express =require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var multer= require('multer');
var upload = multer();
var uploadToQiniu = require("../utils/uploadImage");
var User = require('../model/user');
var Fun = require('../model/fun');
//   商圈首页
router.get('/', function(req, res) {
  res.render('tradeIndex', {
    title: "商圈首页"
  })
})

// 商品发布页面
router.get('/post', function(req, res) {
  res.render('tradePost', {
    title: "发布"
  })
})


//  发布新的商品
router.post('/new', upload.single('test'), function(req, res) {
    console.log("*************logging from /fun/new--user***************", req.session.user);
    var imageData = JSON.parse(req.body['imageData']);
    var title = req.body['postTitle'];
    var content = req.body['postText'];
    var authorId = req.session.user._id;
    var time = Date.now();
    User.find({_id: authorId}, "name school avatarUrl", function(err, us) {
      if (err) {
        console.log(err);
      }else {
        var newFun = new Fun({
            author: authorId,
            authorName: us[0].name,
            authorAvatarUrl: us[0].avatarUrl,
            authorSchool: us[0].school,
            content: content,
            title: title,
            time: time
        })
        console.log("logging from ******************logging from /fun/new --funToSave", newFun);
        newFun.save(function(err, fun) {
          if (err) {
            console.log("save fun error");
          }
          console.log("*******************logging from /fun/new--fun", fun);
          imageData.forEach(function(item, index) {
            var base64Data = item.split(',')[1];
            var fileType = item.split(';')[0].split('/')[1];
          	var dataBuffer = new Buffer(base64Data, 'base64');
            var picUrl = "http://obzokcbc0.bkt.clouddn.com/fun/" + time + "." + fileType;
            console.log("*****************logging from /fun/new--picUrl**************", picUrl);
            Fun.update({time: time}, {$push: {"picUrl": picUrl}}, function(err, raw) {
              if (err) {
                console.log("保存fun url出错", err);
              }else {
                console.log(raw);
              }
            });
            var tmpFilePath = "./upload/tmp/" + time + "." + fileType;
          	fs.writeFile(tmpFilePath, dataBuffer, function(err) {
          		if(err){
          		  console.log(err);
          		}else{
                uploadToQiniu(tmpFilePath, "fun");
                res.json({success: true})
                console.log("success upload");
              }
          	});
          })

        })

      }
    })

})


// 查看商家详情
router.get('/detail/:id', function(req, res) {
  Fun.find({_id: req.params.id}, function(err, fs) {
      console.log("***********************logging from /secondhand/detai/:id--view", gs);
      res.render("funDetail", {
        title: "详情",
        fun: fs[0].toObject({getters: true, virtuals: true})
      })


  })
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
//       funs: null
//     })
//   }
// })

//个人中心
router.get('/self', function(req, res) {
  res.render('tradeSelf', {
    title: "个人中心"
  })

})


module.exports = router;
