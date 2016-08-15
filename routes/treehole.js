var express =require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('treeholeIndex', {title: "树洞"})
})

router.get('/post', function(req, res) {
  res.render('treeholePost', {title: "发布"})
})
module.exports = router;
