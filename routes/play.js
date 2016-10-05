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
  var crtUser = req.session.user;
  var queryPlay = Play.find({});
  queryPlay.sort([['_id', -1]]).exec(function(err,ps) {
    if (err) {
      console.log(err);
    }else {
      if (ps.length != 0) {
        console.log("*******************logging from /play--playTransformed***************", ps.map(function(item) {
            return item.toObject({getters: true, virtuals: true});
        }));
        res.render("playIndex", {
          title: "去约首页",
          plays: ps.map(function(item){
            return item.toObject({getters: true, virtuals: true});
          }),
          user: crtUser
        });
    }else {
        res.render("playIndex", {
          title: "去约首页",
          plays: null,
          user: crtUser
        });
      }
    }
  })
})

// 去约发布页面
router.get('/post', function(req, res) {
    console.log("*************logging from /self************res.session.user", req.session.user);
    User.find({_id: req.session.user._id}, function(err, doc) {
      if (err) {
        console.log(err);
      }else {
        console.log("*************logging from /self************userinfo", doc[0]);
        res.render('playPost', {
          title: "发布",
          userInfo: doc[0]
        })
      }
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
    var price = parseInt(req.body['price']);
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
            address: address,
            qq: qq,
            tel: tel,
            time: time,
            type: type,
            price: price,
            view: 0
        })
        console.log("logging from ******************logging from /play/new --newPlaytosave", JSON.stringify(newPlay));
        newPlay.save(function(err, p) {
          if (err) {
            console.log("save treehole error");
          }
          console.log("*******************logging from /play/new--lost", JSON.stringify(p));
          imageData.forEach(function(item, index) {
            var base64Data = item.split(',')[1];
            var fileType = item.split(';')[0].split('/')[1];
          	var dataBuffer = new Buffer(base64Data, 'base64');
            var picUrl = "http://obzokcbc0.bkt.clouddn.com/play/" + time + "-" + index  + "." + fileType;
            console.log("*****************logging from /play/new--picUrl**************", picUrl);
            Play.update({time: time}, {$push: {"picUrl": picUrl}}, function(err, raw) {
              if (err) {
                console.log("保存secondHand url出错", err);
              }else {
                console.log(raw);
              }
            });
            var tmpFilePath = "./upload/tmp/" + time + "-" + index + "." + fileType;
          	fs.writeFile(tmpFilePath, dataBuffer, function(err) {
          		if(err){
          		  console.log(err);
          		}else{
                console.log("fuck");
                uploadToQiniu(res, tmpFilePath, "play");
              }
          	});
          })

        })

      }
    })

})


// 查看去约详情
router.get('/detail/:id', function(req, res) {
  Play.find({_id: req.params.id}, function(err, ps) {
    if (ps.length > 0) {
      console.log("***********************logging from /play/detai/:id--view", ps);
      Play.update({_id: req.params.id}, {$set: {view: ps[0].view + 1}}, function(err, row) {
        if (err) {
          console.log(err);
        }else {
          res.render("playDetail", {
            title: "详情",
            play: ps[0].toObject({getters: true, virtuals: true})
          })
        }
      })
    }else {
      res.render('playDetail', {
        title: "详情",
        play: null
      })
    }
  })
})

//  操作
router.post('/action', function(req, res) {
  var pId = req.body.pId;
  console.log(pId);
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
  if (req.session.user) {
    console.log("*************************log from /play/self--req.session.user**********************", req.session.user);
    var q = Play.find({author: req.session.user._id});
    q.sort([['_id', -1]]).exec(function(err, ps) {
      if (err) {
        console.log("取出用户对应的树洞出错", err);
      }else {
        console.log("*******************logging from /play/self--plays***************", ps);
        res.render("playSelf", {
          title: "个人中心",
          plays: fs.length == 0 ? null : ps,
          user: req.session.user
        })

      }
    })
  }else {
    res.render("playSelf", {
      title: "个人中心",
      user: null,
      plays: null,
    })
  }
})


module.exports = router;
