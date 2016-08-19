//   点击图片的时候  跳转到相应的详情页去
$('.facebook-card').on('click', function(e) {
  var cardId = $(this).attr('data-tId');
  var host = location.host;
  location.href = "http://" + host + "/treehole/detail/" + cardId;
})

$('.iconfont-nullEnjoy').on('click', function(e) {
  var enjoyCount = $(this).parent().parent().children('#enjoy').children('enjoy-count').text();
  var treeholeId = $(this).parent().parent().parent().attr(data-tId);
  var countInfo = {
    fav: enjoyCount,
    treeholeId: treeholeId
  }

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
      }
    },
    error: function (data) {
        // showMessageFail("上传出错, 请重试");
        console.log("上传失败");
    }

  });

})
