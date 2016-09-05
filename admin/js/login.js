$('.admin-login').on('click', function(e) {
  //  阻止默认点击事件
  e.preventDefault();

  //  验证用户名和密码
  var name = $('#userName').val();
  var password  = $('#password').val();
  var loginInfo = {
    name: name,
    password: password
  }
  var url = "http://" + location.host + "/admin/login"
  $.ajax({
    type: 'POST',
    contentType: "application/json",
    dataType: "JSON",
    url: url,
    success: function(data) {
      if (data.success) {
        location.href="index.html"
      }else {
        alert('账号或者密码错误');
        return;
      }
    }
  })


})
