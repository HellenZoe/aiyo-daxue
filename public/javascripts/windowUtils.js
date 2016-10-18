var utils = {
  saveToLocal: function(name, obj) {
    var s = JSON.stringify(obj);
    if (window.localStorage) {
      localStorage.setItem(name, s);
    }else {
      console.log("不支持localStorage");
    }
  },

  getFromLocal: function(name) {
    return JSON.parse(localStorage.getItem(name));
  },

  removeFromLocal: function(name) {
    localStorage.removeItem(name);
  },
  contains: function(o, s) {
    var length = o.length;
    while (length--) {
      if (o[length] == s) {
        return true;
      }
    }

    return false;
  }

};


if (window) {
  window.utils = utils;
}
