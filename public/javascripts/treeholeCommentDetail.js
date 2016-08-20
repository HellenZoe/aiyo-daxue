// 用户点击评论按钮  显示评论框
// $('.iconfont-selfComment').on('click', function(e) {
//   $('.input-comment').css('display', 'flex');
//   $('.details-content').css('bottom', "4rem");
// })

$('treehole-back').on('click', function(e) {
  e.preventDefault();
  var treeholeId = $('.facebook-card').attr('data-tid');
  location.href = "http://" + location.host + "/treehole/detail/" + treeholeId;
})
//  点击发送按钮 通过ajax发送 然后刷新页面
$('.send').on('click', function(e) {
  var content = $('.input-block').val();
  var time = Date.now();
  var replyToId = $('.card-info').attr('data-authorId');
  var replyToName = $('.facebook-name').text();
  var replyToContent = $('.card-comment').children('.comment-text').text();
  var crtUserName = window.utils.getFromLocal('userInfo').name;
  var crtUserAvatarUrl = window.utils.getFromLocal('userInfo').avatarUrl;
  var treeholeId = $('.facebook-card').attr('data-tid');

  var commentCount = $('.comment-count').text();

  var commentInfo = {
    time: time,
    content: content,
    authorName: crtUserName,
    authorAvatarUrl: crtUserAvatarUrl,
    treeholeId: treeholeId,
    commentCount: commentCount,
    replyToName: replyToName,
    replyToId: replyToId,
    replyToContent: replyToContent
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
        $('.input-block').val("");
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
