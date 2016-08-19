 // 用户点击发送按钮时   通过ajax发送信息

$('.send').on('click', function(e) {
  var content = $('.input-block').val();
  var time = Date.now();
  var crtUserName = window.utils.getFromLocal('userInfo').userName;
  var crtUserAvatarUrl = window.utils.getFromLocal('userInfo').avatarUrl;
  var treeholeId = location.pathname.split('/').pop();

  var commentInfo = {
    time: time,
    content: content,
    authorName: crtUserName,
    authorAvatarUrl: crtUserAvatarUrl,
    treeholeId: treeholeId
  }

  console.log(commentInfo);
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
        $.toast('评论成功', 2000, "toast-success");
        //  把新发布的评论更新上去  让用户有反馈  js不支持多行字符串  还是刷新一下好了
        location.reload();
      }
    },
    error: function (data) {
        // showMessageFail("上传出错, 请重试");
        console.log("上传失败");
    }

  });
})
