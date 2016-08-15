var express =require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

router.get('/', function(req, res) {
  res.render('treeholeIndex', {title: "树洞"})
})

router.get('/post', function(req, res) {
  res.render('treeholePost', {title: "发布"})
})

router.post('/new', function(req, res) {
    var cacheFolder = "../public/upload/cache/"
    var userDirPath =cacheFolder+ "test";
    if (!fs.existsSync(userDirPath)) {
        fs.mkdirSync(userDirPath);
    }
    console.log("here");
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = userDirPath; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
    form.type = true;
    var displayUrl;
    console.log("in here");
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.send(err);
            return;
        }
        var extName = ''; //后缀名
        switch (files.upload.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        if (extName.length === 0) {
          res.send({
               code: 202,
               msg: '只支持png和jpg格式图片'
           });
           return;
       } else {
           var avatarName = '/' + Date.now() + '.' + extName;
           var newPath = form.uploadDir + avatarName;
           displayUrl = "/upload/cache" + avatarName;
           fs.renameSync(files.upload.path, newPath); //重命名
           res.send({
               code: 200,
               msg: displayUrl
           });
       }
   });
})
module.exports = router;
