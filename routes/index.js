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


  app.get('welcome', function(req, res) {
    req.render('welcome', {
      title: 注册成功
    })
  })
  app.post('login', function(req, res) {

  })
  app.use('/treehole', treehole);
}
