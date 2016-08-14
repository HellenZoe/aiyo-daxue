var treeholeRoute = require('./treehole');
var User = require('../model/user');
var treehole = require('../model/treehole');

module.exports = function(app) {
  app.get('/' function(req, res) {

  })

  app.use('treehole', treehole);
}
