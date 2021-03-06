var express =require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var multer= require('multer');
var upload = multer();
var uploadToQiniu = require("../utils/uploadImage");
var User = require('../model/user');
var Goods = require('../model/goods');

//   失物招领首页
router.get('/', function(req, res) {
    var crtUser = req.session.user;
    // console.log(JSON.stringify(crtUser));
    var queryGoods = Goods.find({'authorSchool': crtUser.school});
    queryGoods.sort([['_id', -1]]).exec(function(err, gs) {
        if (err) {
            console.log(err);
        }else {
            if (gs.length != 0) {
                res.render("lostIndex", {
                    goods: gs.map(function(item){
                        return item.toObject({getters: true, virtuals: true});
                    }),
                    cardGoods: gs.map(function(item){
                        return item.toObject({getters: true, virtuals: true});
                    }).filter(function(item, index) {
                        return item.category == "card";
                    }),
                    sportGoods: gs.map(function(item){
                        return item.toObject({getters: true, virtuals: true});
                    }).filter(function(item, index) {
                        return item.category == "sport"
                    }),
                    eleGoods: gs.map(function(item){
                        return item.toObject({getters: true, virtuals: true});
                    }).filter(function(item, index) {
                        return item.category == "ele"
                    }),
                    otherGoods: gs.map(function(item){
                        return item.toObject({getters: true, virtuals: true});
                    }).filter(function(item, index) {
                        return item.category == "other"
                    }),
                    user: crtUser
                });
            }else {
                res.render("lostIndex", {
                    title: "失物招领首页",
                    goods: null,
                    user: crtUser
                });
            }
        }
    })
});

// 失物招领发布页面
router.get('/post', function(req, res) {
    console.log("\n ======================lost get/post res.session.user=================\n", req.session.user);
    User.findOne({openId: req.session.user.openId}, function(err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("\n ======================lost get/post doc=================\n", JSON.stringify(doc));
        res.render('lostPost', {
            title: "发布",
            userInfo: doc
        })
    })
});


//  操作
router.post('/action', function(req, res) {
    var lId = req.body.lId;
    switch (req.body.type) {
        case "found":
            Goods.remove({_id: lId}, function(err, l) {
                if (err) {
                    console.log(err);
                }else {
                    res.json({
                        success: true
                    });
                }
            });
            break;
        default:

    }
});

//  发布新的失物
router.post('/new', upload.single('test'), function(req, res) {
    console.log("\n ======================lost  post/new =================\n",
        'req.session.user:\n',
        req.session.user,
        'req.body:\n',
        req.body
    );
    if (req.body.status == "wrong") {
        console.log("\n=============================fuck===================\n");
    }
    var imageData = JSON.parse(req.body['imageData']);
    var type = req.body['type'];
    var name = req.body['name'];
    var desc = req.body['desc'];
    var location = req.body['location'];
    var category = req.body['category'];
    var qq = req.body['qq'];
    var tel = req.body['tel'];
    var authorId = req.session.user.openId;
    var time = Date.now();
    User.findOne({openId: authorId}, "name school avatarUrl", function(err, user) {
        if (err) {
            console.log(err);
        }else {
            console.log("\n ======================lost  post/new --find user =================\n",JSON.stringify(user));
            var newLost = new Goods({
                author: authorId,
                authorName: user.name,
                authorAvatarUrl: user.avatarUrl,
                authorSchool: user.school,
                name: name,
                desc: desc,
                status: 0,
                location: location,
                category: category,
                qq: qq,
                tel: tel,
                time: time,
                view: 0,
                type: type
            });
            console.log("\n ======================lost  post/new --newLost =================\n", JSON.stringify(newLost));
            newLost.save(function(err, lost) {
                if (err) {
                    console.log("save treehole error");
                    return;
                }
                console.log("\n ======================lost  post/new --save =================\n", JSON.stringify(lost));
                imageData.forEach(function(item, index) {
                    var base64Data = item.split(',')[1];
                    var fileType = item.split(';')[0].split('/')[1];
                    var dataBuffer = new Buffer(base64Data, 'base64');
                    var picUrl = "http://obzokcbc0.bkt.clouddn.com/lost/" + time + "-" + index + "." + fileType;
                    console.log("\n ======================lost  post/new --picUrl =================\n", picUrl);
                    Goods.update({time: time}, {$push: {"picUrl": picUrl}}, function(err, raw) {
                        if (err) {
                            console.log("保存lost url出错", err);
                        }else {
                            console.log(JSON.stringify(raw));
                        }
                    });
                    var tmpFilePath = "./upload/tmp/" + time + "-" + index + "." + fileType;
                    fs.writeFile(tmpFilePath, dataBuffer, function(err) {
                        if(err){
                            console.log(err);
                        }else{
                            uploadToQiniu(res, tmpFilePath, "lost");
                            console.log("success upload");
                        }
                    });
                })

            })

        }
    })

});


// 查看失物详情
router.get('/detail/:id', function(req, res) {
    Goods.find({_id: req.params.id}, function(err, gs) {
        if (gs.length > 0) {
            console.log("***********************logging from /secondhand/detai/:id--view", gs);
            Goods.update({_id: req.params.id}, {$set: {view: gs[0].view + 1}}, function(err, row) {
                if (err) {
                    console.log(err);
                }else {
                    res.render("lostDetail", {
                        title: "详情",
                        good: gs[0].toObject({getters: true, virtuals: true})
                    })
                }
            })
        }else {
            res.render('lostDetail', {
                title: "详情",
                good: null
            })
        }
    })
})

// 个人中心
// router.get('/self', function(req, res) {
//   if (req.session.user) {
//     console.log("*************************log from /secondHand/self--req.session.user**********************", req.session.user);
//     Valueble.find({author: req.session.user._id}, function(err, gs) {
//       if (err) {
//         console.log("取出用户对应的商品出错出错", err);
//       }else {
//         console.log("*******************logging from /secondHand/self--valuebles***************", gs);
//         if (gs) {
//           res.render("secondHandSelf", {
//             title: "个人中心",
//             valuebles: gs,
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

//个人中心（胡博）
router.get('/self', function(req, res) {
    if (req.session.user) {
        console.log("*************************log from /lost/self--req.session.user**********************", req.session.user);
        var q = Goods.find({author: req.session.user._id});
        q.sort([['_id', -1]]).exec(function(err, gs) {
            if (err) {
                console.log("取出用户对应的商品出错出错", err);
            }else {
                console.log("*******************logging from /lost/self--goods***************", gs);
                if (gs) {
                    res.render("lostSelf", {
                        title: "个人中心",
                        goods: gs.map(function(item){
                            return item.toObject({getters: true, virtuals: true});
                        }),
                        user: req.session.user
                    })
                }else {
                    res.render("lostSelf", {
                        title: "个人中心",
                        user: req.session.user,
                        goods: null
                    })
                }
            }
        })
    }else {
        res.render("lostSelf", {
            title: "个人中心",
            user: null,
            goods: null
        })
    }
})


module.exports = router;
