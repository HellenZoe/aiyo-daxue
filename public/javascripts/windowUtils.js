var utils = {
  saveToLocal: function(obj) {
    var s = JSON.stringify(obj);
    if (window.localstorage) {
      localstorage.setItem("userInfo", s);
    }else {
      console.log("不支持localstorage");
    }
  }
}


if (window) {
  window.utils = utils;
}
