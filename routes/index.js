var treehole = require('./treehole');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', {title: "首页", })
  })

  app.use('/treehole', treehole);
}
