var express =require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var multer= require('multer');
var upload = multer();
var uploadToQiniu = require("../utils/uploadImage");
var User = require('../model/user');
var Fun = require('../model/fun');
var utils = require('../utils/severUtil');


//   趣玩首页
router.get('/', function(req, res) {
  var crtUser = req.session.user;
  var queryFun = Fun.find({});
  queryFun.exec(function(err, fs) {
    if (err) {
      console.log(err);
    }else {
      if (fs.length != 0) {
        console.log("*******************logging from /fun--funTransformed***************", fs.map(function(item) {
            return item.toObject({getters: true, virtuals: true});
        }));
        res.render("funIndex", {
          title: "趣玩首页",
          funs: fs.map(function(item){
            return item.toObject({getters: true, virtuals: true});
          }),
          user: crtUser
        });
      }else {
        res.render("funIndex", {
          title: "趣玩首页",
          funs: null
        });
      }
    }
  })
})

// 趣玩发布页面
router.get('/post', function(req, res) {
  res.render('funPost', {
    title: "发布"
  })
})


//  发布新的趣玩
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


//  操作
router.post('/action', function(req, res) {
  console.log("*******************logging from /fun/action--req.body", req.body);
  var fId = req.body.fId;
  switch (req.body.type) {
    case "del-share":
      Fun.remove({_id: fId}, function(err, l) {
        if (err) {
          console.log(err);
        }else {
          res.json({
            success: true
          });
        }
      })
      break;
    case "del-wanto":
      Fun.update({_id: fId}, {$pull: {"wantUserId": req.session.user._id}}, function(err, l) {
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


// 查看趣玩详情
router.get('/detail/:id', function(req, res) {
  Fun.find({_id: req.params.id}, function(err, fs) {
      console.log("***********************logging from /secondhand/detai/:id--view", fs);
      res.render("funDetail", {
        title: "详情",
        fun: fs[0].toObject({getters: true, virtuals: true}),
        notYet: utils.contains(fs[0].wantUserId, req.session.user._id) ? false : true;

      })


  })
})


//  我想去
router.post('/follow', function(req, res) {
  var id = req.session.user._id;
  var fId = req.body.fId;
  Fun.update({_id: fId}, {$push: {wantUserId: id}}, function(err, row) {
    if (err) {
      console.log(err);
    }else {
      res.json({
        success: true
      })
    }
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
  if (req.session.user) {
    console.log("*************************log from /treehole/self--req.session.user**********************", req.session.user);
    Fun.find({author: req.session.user._id}, function(err, fs) {
      if (err) {
        console.log("取出用户对应的树洞出错", err);
      }else {
        console.log("*******************logging from /fun/self--funs***************", fs);
        Fun.find({wantUserId: req.session.user._id}, function(err, ws) {
          res.render("funSelf", {
            title: "个人中心",
            funs: fs.length == 0 ? null : fs,
            wantToFuns: ws.length  == 0 ? null : ws,
            user: req.session.user
          })
        })

      }
    })
  }else {
    res.render("funSelf", {
      title: "个人中心",
      user: null,
      funs: null,
      wantToFuns: null,
    })
  }
})


module.exports = router;
