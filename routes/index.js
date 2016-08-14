var treehole = require('../model/treehole');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', {title: "首页", })
  })

}
