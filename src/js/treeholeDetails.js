$(function() {
  // FastClick.attach(document.body);

  //  textarea  换行
  autosize(document.querySelectorAll("textarea"));

  // 加上红心儿
  var card = $('#treeholeCard');
  var crtUserId = window.utils.getFromLocal('userInfo')._id;
  var favId  = JSON.parse(card.attr('data-favId'));
  if (window.utils.contains(favId,crtUserId)) {
    card.children('.topic-card-footer').children('#enjoy').children('.iconfont-nullEnjoy').css('display', 'none')
    card.children('.topic-card-footer').children('#enjoy').children('.iconfont-selfEnjoy').css('display', 'inline')
  }

  // 用户点击发送按钮时   通过ajax发送信息

  $('.send').on('click', function(e) {
    var content = $('.input-block').val();
    var time = Date.now();
    var crtUserName = window.utils.getFromLocal('userInfo').name;
    var crtUserAvatarUrl = window.utils.getFromLocal('userInfo').avatarUrl;
    var treeholeId = location.pathname.split('/').pop();

    var commentCount = $('.comment-count').text();

    var commentInfo = {
      time: time,
      content: content,
      authorName: crtUserName,
      authorAvatarUrl: crtUserAvatarUrl,
      treeholeId: treeholeId,
      commentCount: commentCount
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

  //  用户点赞
  $('.iconfont-nullEnjoy').on('click', function(e) {
    var enjoyCount = $('.enjoy-count').text();
    var that = $(this);
    var selfEnjoy = $(this).parent().children('.iconfont-selfEnjoy');
    var treeholeId = location.pathname.split('/').pop();
    var countInfo = {
      fav: enjoyCount,
      treeholeId: treeholeId,
      action: "up"
    }

    console.log(countInfo);
    var url = "http://" + location.host + "/treehole/fav";

    //  显示加载指示器
    $.showPreloader();


    $.ajax({
      type: "POST",
      url: url,
      dataType: "json",
  		contentType: "application/json",
      data: JSON.stringify(countInfo),
      processData: false,
      success: function (data) {
        if (data.success) {
          console.log("上传成功");

          $.hidePreloader();
          $.toast('点赞成功', 2000, "toast-success");
          //  点赞数加1
          $('.enjoy-count').text(data.c);
          that.css('display', 'none');
          selfEnjoy.css('display', 'inline');
        }
      },
      error: function (data) {
          // showMessageFail("上传出错, 请重试");
          console.log("上传失败");
      }

    });

  })

  //  取消点赞
  $('.iconfont-selfEnjoy').on('click', function(e) {
    var enjoyCount = $('.enjoy-count').text();
    var that = $(this);
    var nullEnjoy = $(this).parent().children('.iconfont-nullEnjoy');
    var treeholeId = location.pathname.split('/').pop();
    var countInfo = {
      fav: enjoyCount,
      treeholeId: treeholeId,
      action: "down"
    }

    console.log(countInfo);
    var url = "http://" + location.host + "/treehole/fav";

    //  显示加载指示器
    $.showPreloader();


    $.ajax({
      type: "POST",
      url: url,
      dataType: "json",
  		contentType: "application/json",
      data: JSON.stringify(countInfo),
      processData: false,
      success: function (data) {
        if (data.success) {
          console.log("上传成功");

          $.hidePreloader();
          $.toast('取消点赞', 2000, "toast-success");
          //  点赞数加1
          $('.enjoy-count').text(data.c);
          that.css('display', 'none');
          nullEnjoy.css('display', 'inline');
        }
      },
      error: function (data) {
          // showMessageFail("上传出错, 请重试");
          console.log("上传失败");
      }

    });

  })




  //  用户查看评论
  $('.check-session a').on('click',  function(e) {
    location.href = "http://" + location.host + "/treehole/comment/" + $(this).attr('data-commentid');
  })

});
