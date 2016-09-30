var qiniu = require('qiniu');
var qiniuConfig = require('../config/qiniu.config');

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = qiniuConfig.ACCESS_KEY
qiniu.conf.SECRET_KEY = qiniuConfig.SECRET_KEY;



//构造上传函数
function uploadFile(res, uptoken, key, localFile) {
  var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId);
      } else {
        // 上传失败， 处理返回代码
        console.log("in here");
        res.json({
          success: true
        })
      }
  });
}



module.exports = function uploadToQiniu(res, path, module) {
  //要上传的空间
  var bucket = 'aiyodaxue';

  //上传到七牛后保存的文件名
  var fileNameArr = path.split('/');
  var key = module + "/" + fileNameArr[fileNameArr.length - 1];

  //构建上传策略函数
  function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    return putPolicy.token();
  }

  //生成上传 Token
  var token = uptoken(bucket, key);


  //调用uploadFile上传
  uploadFile(res, token, key, path);
}
