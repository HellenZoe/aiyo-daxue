var treehole = require('./treehole');
var secondHand = require('./secondHand');
var User = require("../model/user");
var Seller = require("../model/seller");
var Singleton = require("../model/singleton");
var Fun = require('../model/fun');
var Play = require('../model/play');
var lost = require('./lost');
var play = require('./play');
var fun = require('./fun');
var trade = require('./trade');
var schoolList = require('../data/school');
var fs = require('fs');
var multer= require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/root/app/aiyo-daxue/upload/tmp')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage })
var Prattle = require('../model/prattle');
var repairInfo = require('../data/repair');

module.exports = function(app) {
    //  首页
    app.get('/', function(req, res) {
        var queryPrattle = Prattle.find({});
        queryPrattle.sort([['_id', -1]]).limit(2).exec(function(err, doc) {
            if (err) {
                console.log(err);
                return;
            }
            res.render('index',
                {
                    title: "哎哟大学",
                    prattles: doc,
                    l: doc.length
                }
            )

        })
    });

    app.get('/test', function(req, res) {
        var html = fs.readFileSync('/root/app/aiyo-daxue/test/test.html', 'utf-8');
        res.send(html);
    });

    //  登陆页面
    app.get('/signin', function(req, res) {
        res.render('signin', {
            title: "注册"
        })
    });

    //  登陆成功页面
    app.get('/welcome', function(req, res) {
        res.render('index', {
            title: "首页"
        })
    });


    //  修改个人信息页面
    app.get('/self', function(req, res) {
        if (req.session.user) {
            User.findOne({_id: req.session.user._id}, function(err, doc) {
                if (err) {
                    console.log('get /self findOne error:',err);
                }else {
                    console.log("=======================get /self userInfo====================\n", JSON.stringify(doc));
                    res.render('self', {
                        title: "个人信息",
                        userInfo: doc
                    })
                }
            })
        }else {
            console.log('=======================get /self userInfo==================== \n no req.session.user');
            res.render('self', {
                title: "个人信息",
                userInfo: {}
            })
        }
    });
    //  切换学校页面
    app.get('/changeSchool', function(req, res) {
        if (req.session.user) {
            User.findOne({_id: req.session.user._id}, function(err, doc) {
                if (err) {
                    console.log('get /changeSchool findOne error:',err);
                }else {
                    console.log("=======================get /changeSchool userInfo==================== \n",JSON.stringify(doc));
                    res.render('changeSchool', {
                        title: "切换学校",
                        userInfo: doc
                    })
                }
            })
        }else {
            console.log("=======================get /changeSchool userInfo==================== \n no req.session.user");
            res.render('changeSchool', {
                title: "切换学校",
                userInfo: {}
            })
        }
    });


    // app.get('/admin', function(req, res) {
    //   res.sendFile('login.html');
    // })

    //  登陆信息校验
    app.post('/admin/login', function(req, res) {
        console.log("=======================post /admin/login==================== \n", req.body);
        var name = req.body.name;
        var password = req.body.password;
        if (name == "heiheihei" && password == "hahaha") {
            res.json({
                success: true
            })
        }else {
            res.json({
                success: false
            })
        }
    });

    //  后台审核商圈  获取当前数据
    app.get('/admin/verify/trade', function(req, res) {
        var querySingleton = Singleton.find({});
        querySingleton.sort([['_id', -1]]).exec(function(err, doc) {
            var draw =  parseInt(req.query.draw);
            var info = {
                "draw": draw,
                "recordsTotal": doc.length,
                "recordsFiltered": doc.length,
                "data": doc.map(function(item) {
                    return item.toObject({getters: true, virtuals: true})
                })
            }
            res.json(info);
        })
    })

    //  去约审核
    app.get('/admin/verify/play', function(req, res) {
        var queryPlay = Play.find({});
        queryPlay.sort([['_id', -1]]).exec(function(err, doc) {
            console.log(JSON.stringify(doc));
            var draw =  parseInt(req.query.draw);
            var info = {
                "draw": draw,
                "recordsTotal": doc.length,
                "recordsFiltered": doc.length,
                "data": doc.map(function(item) {
                    return item.toObject({getters: true, virtuals: true})
                })
            };
            res.json(info);
        })
    })

    //  后台 情话模块文章数据
    app.get('/admin/schoolPrattle', function(req, res) {
        var  queryPrattle = Prattle.find({});
        queryPrattle.sort([['_id', -1]]).exec(function(err, doc) {
            var draw =  parseInt(req.query.draw);
            var info = {
                "draw": draw,
                "recordsTotal": doc.length,
                "recordsFiltered": doc.length,
                "prattles": doc.map(function(item) {
                    console.log(item);
                    return item.toObject({getters: true, virtuals: true});
                })
            };
            res.json(info);
        })
    });


    //  趣玩模块文章数据
    app.get('/admin/fun', function(req, res) {
        var queryFun = Fun.find({});
        queryFun.sort([['_id', -1]]).exec(function(err, doc) {
            var draw =  parseInt(req.query.draw);
            var info = {
                "draw": draw,
                "recordsTotal": doc.length,
                "recordsFiltered": doc.length,
                "funs": doc.map(function(item) {
                    console.log(item);
                    return item.toObject({getters: true, virtuals: true});
                })
            };
            res.json(info);
        })
    });

    //  删除校园情话文章
    app.post('/admin/schoolPrattle/action', function(req, res) {
        var pId = req.body.pId;
        var action = req.body.type;
        console.log(req.body);
        switch (action) {
            case "del":
                Prattle.remove({_id: pId}, function(err, doc) {
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

    //  删除趣玩文章
    app.post('/admin/fun/action', function(req, res) {
        var fId = req.body.fId;
        var action = req.body.type;
        console.log(req.body);
        switch (action) {
            case "del":
                Fun.remove({_id: fId}, function(err, doc) {
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
    });

    //  查看情话详情
    app.get('/article/prattle/:id', function(req, res) {
        var pId = req.params.id;
        Prattle.find({_id: pId}, function(err, doc) {
            if (err) {
                console.log(err);
            }else {
                res.send(doc[0].content);
            }
        })
    });


    //  后台 情话模块 发布新的文章

    app.post('/article/prattle', upload.single('file'), function(req, res) {
        console.log("*************logging from /article/prattle--body***************", req.body);
        // var articleUrl = JSON.parse(req.body['articleUrl']);
        console.log("*************logging from /article/prattle--file***************", req.file);
        var path = "/root/app/aiyo-daxue/upload/tmp/" + req.file.originalname;
        var content = fs.readFileSync(path, "utf-8")
        var title = req.body['title'];
        var author = req.body['author'];
        var backImgPath = req.body['path'];
        var time = Date.now();
        var newPrattle = new Prattle({
            title: title,
            author: author,
            backImgPath: backImgPath,
            path: path,
            content: content,
            view: 0,
            time: time
        });
        newPrattle.save(function(err, doc) {
            if (err) {
                console.log(err);
            }else {
                res.json({
                    success: true
                })
            }

        })
    });



    //  后台 趣玩模块 发布新的文章

    app.post('/article/fun', upload.single('file'), function(req, res) {
        console.log("*************logging from /article/fun--body***************", req.body);
        // var articleUrl = JSON.parse(req.body['articleUrl']);
        console.log("*************logging from /article/fun--file***************", req.file);
        var path = "/root/app/aiyo-daxue/upload/tmp/" + req.file.originalname;
        var content = fs.readFileSync(path, "utf-8")
        var title = req.body['title'];
        var author = req.body['author'];
        var backImgPath = req.body['path'];
        var time = Date.now();
        var newFun = new Fun({
            title: title,
            author: author,
            backImgPath: backImgPath,
            path: path,
            content: content,
            view: 0,
            time: time
        });
        newFun.save(function(err, doc) {
            if (err) {
                console.log(err);
            }else {
                res.json({
                    success: true
                })
            }

        })
    });



    //  个人中心信息完善
    app.post('/self', function(req, res) {
        // var name = req.body.name;
        // var gender = req.body.gender;
        var tel = req.body.tel;
        var qq = req.body.qq;
        var school = req.body.school;
        // var department = req.body.department;
        console.log("=======================post /self req.body==================== \n", JSON.stringify(req.body));
        console.log(
            "=======================post /self req.session.user==================== \n", JSON.stringify(req.session.user));
        User.findOneAndUpdate({_id: req.session.user._id}, {
            tel: tel,
            qq: qq,
            school: school
        }, {
            new: true
        }, function(err, u) {
            if (err) {
                console.log(err);
            }else {
                req.session.user = u;
                console.log("=======================post /self u==================== \n",JSON.stringify(u));
                res.json(u)
            }
        })
    });

    //  新增用户
    app.post('/user', function(req, res) {

        /*var newUser =  new User({
            name: req.body.name,
            openId: req.body.openId,
            token: req.body.token,
            avatarUrl: req.body.avatarUrl,
            redirectUrl: req.body.redirectUrl
        });
        console.log("=======================post /user newUser==================== \n", JSON.stringify(newUser));
        newUser.save(function(err, user) {
            if (err) {
                console.log("save user error!");
                return;
            }
            // 将user存储到session 保持用户登陆
            req.session.user = user;
            console.log("=======================post /user user==================== \n", req.session.cookie,
                '\n',
                JSON.stringify(req.session.user)
            );
            // res.redirect(redirectUrl);
            res.json(user)

        });*/
        User.findOneAndUpdate(
            {
                openId:req.body.openId
            },
            {
                name: req.body.name,
                openId: req.body.openId,
                avatarUrl: req.body.avatarUrl
            },{
                new: true,
                upsert:true
            },function (err,user) {
                if(err){
                    console.log(err);
                    return;
                }
                console.log("=======================post /user user==================== \n",
                    JSON.stringify(user)
                );
                res.json(user);
            })
    });

    // 返回学校信息
    app.get('/school', function(req, res) {
        res.json({
            data: schoolList,
            success: true
        })
    });



    app.get('/activity', function(req, res) {
        var lastIndex = req.query.lastIndex;
        var num = req.query.num;
        var queryPrattle = Prattle.find({});
        queryPrattle.sort([['_id', -1]]).skip(lastIndex).limit(num).exec(function(err, doc) {
            if (err) {
                return;
            }
            res.json({
                success: true,
                data: doc
            })

        })
    });


    //  公务报修
    app.get('/repair', function(req, res) {
        var info = {};
        repairInfo.forEach(function(item, index) {
            console.log(item);
            if (item.school == req.session.user.school) {
                info = item;
            }
        });
        res.render('repair',{
            title: "公物报修",
            info: repairInfo
        })
    });
    app.use('/treehole', treehole);
    app.use('/secondHand',  secondHand);
    app.use('/lost', lost);
    app.use('/play', play);
    app.use('/fun', fun);
    app.use('/trade', trade);


}
