var treehole = require('./treehole');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', {title: "首页", })
  })

  app.get('/signin', function(req, res) {
    res.render('signin', {
      title: "注册"
    })
  })
  app.use('/treehole', treehole);
}
