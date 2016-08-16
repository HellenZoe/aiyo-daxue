var express =require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var multer= require('multer');
var upload = multer({dest: "../public/uploads"});

router.get('/', function(req, res) {
  res.render('treeholeIndex', {title: "树洞"})
})

router.get('/post', function(req, res) {
  res.render('treeholePost', {title: "发布"})
})

router.post('/new', upload.single('test'), function(req, res) {
    var imageData= req.body['imageData'];
    var base64Data = imageData.split(',')[1];
  	var dataBuffer = new Buffer(base64Data, 'base64');
  	fs.writeFile("./public/tmp/out.png", dataBuffer, function(err) {
  		if(err){
  		  res.send(err);
        console.log(err);
  		}else{
        res.send(JSON.stringify({url: "tmp/out.png"}));
      }
  	});

})


module.exports = router;
