var utils = {

  contains: function(o, s) {
    var length = o.length;
    while (length--) {
      if (o[length] == s) {
        return true;
      }
    }

    return false;
  }

}


module.exports = utils
