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
    return localStorage.Item(name);
  }

}


if (window) {
  window.utils = utils;
}
