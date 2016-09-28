var express =require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var multer= require('multer');
var upload = multer();
var uploadToQiniu = require("../utils/uploadImage");
var User = require('../model/user');
var Treehole  = require('../model/treehole');
var Comment = require('../model/comment');

router.get('/', function(req, res) {

  // console.log("*********************logging from /treehole--user************************", req.session.user);
  var crtUser = req.session.user;
  var queryTreehole = Treehole.find({});
  queryTreehole.sort([['_id', -1]]).exec(function(err, ts) {
    if (err) {
      console.log(err);
    }else {
      if (ts.length != 0) {
        // console.log("*******************logging from /treehole--treeeholesTransformed***************", ts.map(function(item) {
        //     return item.toObject({getters: true, virtuals: true});
        // }));
        // console.log("+++++++++++++++", ts.map(function(item){
        //     return item.toObject({getters: true, virtuals: true});
        //   }).filter(function(item, index) {
        //     console.log(req.session.user.school, item.authorSchool);
        //     if (req.session.user.school && item.authorSchool) {
        //       return item.authorSchool == req.session.user.school;
        //     }
        //     return false;
        //   }));
        var schoolTreeholes = [];
        ts.map(function(item) {
            return item.toObject({getters: true, virtuals: true});
        }).forEach(function(item, index) {
            User.find({_id: item.author}, function(err, u) {
              if (err) {
                console.log(err);
              }else {
                // console.log(u[0].school, req.session.user.school);
                console.log(JSON.stringify(u));
                console.log(JSON.stringify(req.session.user));
                if (u.length != 0 && req.session.user && req.session.user.school && u[0].school) {
                  if (u[0].school == req.session.user.school) {
                      console.log("***********logging schoolTreeholes item", item);
                      schoolTreeholes.push(item);
                  }
                }
                if (index == ts.length - 1) {
                  res.render("treeholeIndex", {
                    title: "树洞首页",
                    allTreeholes: ts.map(function(item){
                      return item.toObject({getters: true, virtuals: true});
                    }),
                    schoolTreeholes: schoolTreeholes,
                    user: crtUser
                  });
                }

              }
            });
        })
      }else {
        res.render("treeholeIndex", {
          title: "树洞首页",
          allTreeholes: null,
          schoolTreeholes: null
        });
      }
    }
  })

})

//  树洞详情页
router.get('/detail/:id', function(req, res) {
  var id = req.params.id;
  Treehole.find({_id: id}, function(err, ts) {

    console.log("************************logging from /detail/:id--treehole", ts);
    Comment.find({treeholeId: id}, function(err, cs) {
      console.log("******************logging from /detail/:id--comments", cs);
      if (cs.length) {
        res.render("treeholeDetails", {
          title: "详情",
          tInfo: ts[0].toObject({getters: true, virtuals: true}),
          comments: cs
        })
      }else {
        res.render("treeholeDetails", {
          title: "详情",
          tInfo: ts[0].toObject({getters: true, virtuals: true}),
          comments: null
        })
      }
    })
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
  if (req.session.user) {
    console.log("*************************log from /treehole/self--req.session.user**********************", req.session.user);
    Treehole.find({author: req.session.user._id}, function(err, ts) {
      if (err) {
        console.log("取出用户对应的树洞出错", err);
      }else {
        console.log("*******************logging from /treehole/self--treeholes***************", ts);
        if (ts) {
          res.render("treeholeSelf", {
            title: "个人中心",
            treeholes: ts,
            user: req.session.user
          })
        }else {
          res.render("treeholeSelf", {
            title: "个人中心",
            user: req.session.user,
            treeholes: null
          })
        }
      }
    })
  }else {
    res.render("treeholeSelf", {
      title: "个人中心",
      user: null,
      treeholes: null
    })
  }
})


//  发布新的树洞
router.post('/new', upload.single('test'), function(req, res) {
    console.log("*************logging from /treehole/new--user***************", req.session.user);
    console.log("*************logging from /treehole/new--body***************", req.session.body);
    var imageData = JSON.parse(req.body['imageData']);
    var content = req.body['postText'];
    var title = req.body['name'];
    var authorId = req.session.user._id;
    var ifAnonymous = req.body['ifAnonymous'];
    var time = Date.now();
    User.find({_id: authorId}, "name school avatarUrl gender", function(err, us) {
      if (err) {
        console.log(err);
      }else {
        var baseUrl = "http://obzokcbc0.bkt.clouddn.com/logo";
        var gender = us[0].gender ? us[0].gender : "男";
        var logoUrl = ( gender == "男" ) ? (baseUrl + "/logo01.png") : (baseUrl + "/logo02.png");
        var newTreehole = new Treehole({
            author: authorId,
            authorName: ifAnonymous == "true" ? "匿名小马甲" : us[0].name,
            authorAvatarUrl: logoUrl,
            authorSchool: ifAnonymous == "true" ? "哈佛" : us[0].school,
            content: content,
            title: title,
            time: time
        })
        console.log("logging from ******************logging from /treehole/new --treeholeToSave", JSON.stringify(newTreehole));
        newTreehole.save(function(err, treehole) {
          if (err) {
            console.log("save treehole error");
          }
          console.log("*******************logging from /treehole/new--treehole", treehole);
          imageData.forEach(function(item, index) {
            var base64Data = item.split(',')[1];
            var fileType = item.split(';')[0].split('/')[1];
          	var dataBuffer = new Buffer(base64Data, 'base64');
            var picUrl = "http://obzokcbc0.bkt.clouddn.com/treehole/" + time + "-" + index + "." + fileType;
            console.log("*****************logging from /treehole/new--picUrl**************", picUrl);
            Treehole.update({time: time}, {$push: {"picUrl": picUrl}}, function(err, raw) {
              if (err) {
                console.log("保存treehole url出错", err);
              }else {
                var tmpFilePath = "./upload/tmp/" + time + "-" + index + "." + fileType;
              	fs.writeFile(tmpFilePath, dataBuffer, function(err) {
              		if(err){
              		  console.log(err);
              		}else{
                    uploadToQiniu(tmpFilePath, "treehole");
                    console.log("success upload");
                  }
              	});
                console.log(raw);
              }
            });
          })

        })

      }
    })

})

//  发布新的评论
router.post('/comment', function(req, res) {
  console.log("***************************logging from /treehole/comment--req.body", req.body);
  var nowCommentCount = parseInt(req.body.commentCount);
  var enjoyCount = parseInt(req.body.enjoyCount);
  var cInfo = {
    content: req.body.content,
    time: req.body.time,
    authorId: req.session.user._id,
    authorName: req.body.authorName,
    authorAvatarUrl: req.body.authorAvatarUrl,
    treeholeId: req.body.treeholeId,
    replyToId: req.body.replyToId,
    replyToContent: req.body.replyToContent,
    replyToAuthorId: req.body.replyToAuthorId,
    replyToAuthorName: req.body.replyToAuthorName,
    authorSchool: "",
    type: "treehole"
  }

  var c = new Comment(cInfo);


  c.save(function(err, c) {
    if (err) {
      console.log(err);
    }else{
      console.log("***************************logging from /treehole/comment-newcomment", c);
      //  更新treehole的评论数量
      Treehole.update({_id: req.body.treeholeId}, {comments: nowCommentCount + 1}, function(err, t) {
        if (err) {
          console.log(err);
        }else {
          res.json({
            success: true
          })
        }
      })
    }
  })
})

// 点赞
router.post('/fav', function(req, res) {
  console.log("logging from /treehole/fav--req.session.user", req.session.user);
  var action = req.body.action;
  console.log("***************************logging from /treehole/comment--req.body", req.body);
  var favCount = parseInt(req.body.fav);
  //  更新treehole的评论数量
  if (action == "up") {
    Treehole.update({_id: req.body.treeholeId}, {fav: favCount + 1, $push: { "favUserId": req.session.user._id}}, function(err, t) {
      if (err) {
        console.log(err);
      }else {
        res.json({
          success: true,
          c: favCount + 1
        })
      }
    });
  }else if(action == "down"){
    Treehole.update({_id: req.body.treeholeId}, {fav: favCount - 1, $pull: {"favUserId": req.session.user._id}}, function(err, t) {
      if (err) {
        console.log(err);
      }else {
        res.json({
          success: true,
          c: favCount - 1
        })
      }
    });
  }
})


//  查看对话
router.get('/comment/:id', function(req, res) {
  var commentId = req.params.id;
  console.log("****************logging from /treeehole/comment/:id--commentId", commentId);
  Comment.find({_id: commentId}, function(err, c) {
    if (err) {
      console.log(err);
    }else {
      console.log("****************logging from /treeehole/comment/:id--comment", c);
      var tId = c[0].treeholeId;
      console.log("****************logging from /treeehole/comment/:id--comment", tId);
      Treehole.find({_id: tId}, function(err, t) {
        if (err) {
          console.log(err);
        }else {
          console.log("****************logging from /treeehole/comment/:id--treehole commments", t);
          Comment.find({replyToId: commentId}, function(err, cs) {
            if (err) {
              console.log(err);
            }else {
              if (cs.length != 0) {
                res.render("treeholeCommentDetail", {
                  title: "查看对话",
                  comments: cs,
                  comment: c[0].toObject({getters: true, virtuals: true}),
                  commentCount: t[0].comments
                })
              }else {
                res.render("treeholeCommentDetail", {
                  title: "查看对话",
                  comments: null,
                  comment: c[0].toObject({getters: true, virtuals: true}),
                  commentCount: t[0].comments
                })
              }
            }
          })

        }
      })

    }
  })
})



//   删除某个树洞
router.post('/del', function(req, res) {
  var id = req.body.tId;
  console.log("*************************logging from treehole/del--req.body", req.body);
  Treehole.remove({_id: id}, function(err, doc) {
      if (err) {
        console.log(err);
      }else {
        res.json({success: true})
      }
  })
})


// 搜索 返回搜索页面
router.get('/search', function(req, res) {
    Treehole.find({title: new RegExp(req.query.key)}, "title _id", function(err, t) {
    if (t.length > 0) {
      res.render("treeholeSearch", {
        success: true,
        ts: t
      })
    }else {
      res.render("treeholeSearch", {
        success: true,
        ts: null
      })
    }
  })
})

// 搜索  返回搜索结果
router.post('/search', function(req, res) {
  Treehole.find({title: new RegExp(req.body.key)}, "title _id", function(err, t) {
    if (t.length > 0) {
      res.json({
        success: true,
        ts: t
      })
    }else {
      res.json({
        success: true,
        ts: null
      })
    }
  })
})
module.exports = router;
