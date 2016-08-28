var express =require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var multer= require('multer');
var upload = multer();
var uploadToQiniu = require("../utils/uploadImage");
var User = require('../model/user');
var Seller = require('../model/seller');
var Singleton = require('../model/singleton');

//   商圈首页
router.get('/', function(req, res) {
  var querySeller = Seller.find({});
  querySeller.exec(function(err,ss) {
    if (err) {
      console.log(err);
    }else {
      if (ss.length != 0) {
        console.log("*******************logging from /trade--sellerTransformed***************", ss.map(function(item) {
            return item.toObject({getters: true, virtuals: true});
        }));
        res.render("tradeIndex", {
          title: "商圈首页",
          sellers: ss.map(function(item){
            return item.toObject({getters: true, virtuals: true});
          }),
        });
    }else {
        res.render("tradeIndex", {
          title: "商圈首页",
          ssellers: null
        });
      }
    }
  })
})

// 商品发布页面
router.get('/post', function(req, res) {
  res.render('selectPost', {
    title: "发布"
  })
})

router.get('/postSeller', function(req, res) {
  res.render('postSeller', {
    title: "发布"
  })
})


router.get('/postSingleton', function(req, res) {
  res.render('postSingleton', {
    title: "发布"
  })
})


//  新的商家信息录入
router.post('/newSeller', upload.single('test'), function(req, res) {
    console.log("*************logging from /trade/new--user***************", req.session.user);
    console.log("*************logging from /trade/new--req.body***************", req.body);
    var imageData = JSON.parse(req.body['imageData']);
    var name = req.body['name'];
    var desc = req.body['desc'];
    var address = req.body['address'];
    var category = req.body['category'];
    var qq = req.body['qq'];
    var tel = req.body['tel'];
    var advertisement = req.body['advertisement'];
    var authorId = req.session.user._id;
    var time = Date.now();
    var newSeller = new Seller({
        name: name,
        desc: desc,
        status: 0,
        address: address,
        category: category,
        qq: qq,
        tel: tel,
        advertisement: advertisement,
        time: time,
        view: 0
    })
    console.log("logging from ******************logging from /trade/new --Sellertosave", newSeller);
    newSeller.save(function(err, s) {
      if (err) {
        console.log("save treehole error");
      }
      console.log("*******************logging from /trade/new--valueble", s);
      imageData.forEach(function(item, index) {
        var base64Data = item.split(',')[1];
        var fileType = item.split(';')[0].split('/')[1];
      	var dataBuffer = new Buffer(base64Data, 'base64');
        var picUrl = "http://obzokcbc0.bkt.clouddn.com/trade/" + time + "." + fileType;
        console.log("*****************logging from /trae/new--picUrl**************", picUrl);
        Seller.update({_id: s._id}, {$push: {"picUrl": picUrl}}, function(err, raw) {
          if (err) {
            console.log("保存seller url出错", err);
          }else {
            console.log(raw);
          }
        });
        var tmpFilePath = "./upload/tmp/" + time + "." + fileType;
      	fs.writeFile(tmpFilePath, dataBuffer, function(err) {
      		if(err){
      		  console.log(err);
      		}else{
            uploadToQiniu(tmpFilePath, "trade");
            res.json({success: true, sellerId: s._id})
            console.log("success upload");
          }
      	});
      })

    })
})

// 录入商品信息
router.post('/newSingleton', upload.single('test'), function(req, res) {
    console.log("*************logging from /trade/newSingleton--user***************", req.session.user);
    console.log("*************logging from /trade/newSingleton--req.body***************", req.body);
    var imageData = JSON.parse(req.body['imageData']);
    var name = req.body['name'];
    var price = parseInt(req.body['price']);
    var sellerId = req.body['sellerId'];
    var time = Date.now();
    var newSingleton = new Singleton({
        name: name,
        price: price,
        sellerId: sellerId
    })
    console.log("logging from ******************logging from /trade/newSingleton --singletontosave", newSingleton);
    newSingleton.save(function(err, s) {
      if (err) {
        console.log("save treehole error");
      }
      console.log("*******************logging from /trade/newSingleton", s);
      imageData.forEach(function(item, index) {
        var base64Data = item.split(',')[1];
        var fileType = item.split(';')[0].split('/')[1];
      	var dataBuffer = new Buffer(base64Data, 'base64');
        var picUrl = "http://obzokcbc0.bkt.clouddn.com/trade/" + time + "." + fileType;
        console.log("*****************logging from /trae/new--picUrl**************", picUrl);
        Singleton.update({_id: s._id}, {$push: {"picUrl": picUrl}}, function(err, raw) {
          if (err) {
            console.log("保存seller url出错", err);
          }else {
            console.log(raw);
          }
        });
        var tmpFilePath = "./upload/tmp/" + time + "." + fileType;
      	fs.writeFile(tmpFilePath, dataBuffer, function(err) {
      		if(err){
      		  console.log(err);
      		}else{
            uploadToQiniu(tmpFilePath, "trade");
            res.json({success: true, sellerId: s._id})
            console.log("success upload");
          }
      	});
      })

    })
})


// 查看商家详情
router.get('/detail/:id', function(req, res) {
  Seller.find({_id: req.params.id}, function(err, ss) {
      console.log("***********************logging from /secondhand/detai/:id--view", ss);
      Singleton.find({sellerId: req.params.id}, function(err, st) {
          if (err) {
            console.log(err);
          }else {
            console.log("***********************logging from /secondhand/detai/:id--singletons", st);
            res.render("tradeDetail", {
              title: "详情",
              seller: ss[0].toObject({getters: true, virtuals: true}),
              singletons: st
            })
          }
      })


  })
})

//  操作
router.post('/action', function(req, res) {
  var sId = req.body.sId;
  switch (req.body.type) {
  case "cancel":
      Seller.update({_id:sId}, {$pull: { collectUserId: req.session.user._id}}, function(err, s) {
        if (err) {
          console.log(err);
        }else {
          res.json({
            success: true
          });
        }
      })
      break;
  case "collect":
      Seller.update({_id:sId}, {$push: { collectUserId: req.session.user._id}}, function(err, s) {
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
//       funs: null
//     })
//   }
// })

//个人中心
router.get('/self', function(req, res) {
  if (req.session.user) {
    console.log("*************************log from /trade/self--req.session.user**********************", req.session.user);
    Seller.find({collectUserId : req.session.user._id}, function(err, ss) {
      if (err) {
        console.log("取出用户对应的商家出错", err);
      }else {
        console.log("*******************logging from /trade/self--sellers***************", ss);
        res.render("tradeSelf", {
          title: "个人中心",
          sellers: fs.length == 0 ? null : ss,
          user: req.session.user
        })

      }
    })
  }else {
    res.render("tradeSelf", {
      title: "个人中心",
      user: null,
      sellers: null,
    })
  }

})


module.exports = router;
