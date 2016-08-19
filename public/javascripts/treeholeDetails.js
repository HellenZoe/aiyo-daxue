//  用户点击发送按钮时   通过ajax发送信息
$('.send').on('click', function(e) {
  var content = $('.input-block').val();
  var time = Date.now();
  var crtUserName = window.utils.getFromLocal('userInfo').userName;
  var crtUserAvatarUrl = window.utils.getFromLocal('userInfo').avatarUrl;
  var crtUserSchool = window.utils.getFromLocal('userInfo').school;
  var treeholeId = location.pathname.split('/').pop();

  var commentInfo = {
    time: time,
    content: content,
    authorName: crtUserName,
    authorAvatarUrl: crtUserAvatarUrl,
    authorSchool: crtUserSchool,
    treeholeId: treeholeId
  }

  var url = "http://" + location.host + "/treehole/comment";

  //  显示加载指示器
  $.showPreloader();

  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
		contentType: "application/json",
    data: JSON.stringify(commentInfo),
    processData: false,
    success: function (data) {
      if (data.success) {
        console.log("上传成功");
        $.hidePreloader();
        $.toast('评论成功', 2000);
      }
    },
    error: function (data) {
        // showMessageFail("上传出错, 请重试");
        console.log("上传失败");
    }


})
