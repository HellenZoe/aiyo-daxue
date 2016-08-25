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
        time: time,
        view: 0
    })
    console.log("logging from ******************logging from /trade/new --Sellertosave", newSeller);
    newSeller.save(function(err, s) {
      if (err) {
        console.log("save treehole error");
      }
      console.log("*******************logging from /treehole/new--valueble", v);
      imageData.forEach(function(item, index) {
        var base64Data = item.split(',')[1];
        var fileType = item.split(';')[0].split('/')[1];
      	var dataBuffer = new Buffer(base64Data, 'base64');
        var picUrl = "http://obzokcbc0.bkt.clouddn.com/trade/" + time + "." + fileType;
        console.log("*****************logging from /trae/new--picUrl**************", picUrl);
        Seller.update({time: time}, {$push: {"picUrl": picUrl}}, function(err, raw) {
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
            res.json({success: true})
            console.log("success upload");
          }
      	});
      })

        })

      }

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
