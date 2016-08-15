var express =require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('treeholeIndex', {title: "树洞"})
})

module.exports = router;
