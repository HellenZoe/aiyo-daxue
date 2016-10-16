var utils = {

  //  检查数组时候包含某个元素  没有用underscore之类的库  没必要
  contains: function(o, s) {
    var length = o.length;
    while (length--) {
      if (o[length] == s) {
        return true;
      }
    }

    return false;
  },


  //  通过js执行bash命令
  run_cmd: function(cmd, args, callback) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";
    console.log("runcmd");
    child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
    child.stdout.on('end', function() { callback (resp) });
  }

}


module.exports = utils
