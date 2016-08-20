//   点击图片的时候  跳转到相应的详情页去
$('.card-content').on('click', function(e) {
  var cardId = $(this).parent().attr('data-tId');
  var host = location.host;
  location.href = "http://" + host + "/treehole/detail/" + cardId;
})

//  点赞
$('.iconfont-nullEnjoy').on('click', function(e) {
  var enjoyCount = $(this).parent().parent().children('#enjoy').children('.enjoy-count').text();
  var treeholeId = $(this).parent().parent().parent().attr('data-tid');
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
        $('.iconfont-nullEnjoy').removeClass('iconfont-nullEnjoy').addClass('iconfont-selfEnjoy');
        $('.iconfont-selfEnjoy').html('&#xe611;'); 

      }
    },
    error: function (data) {
        // showMessageFail("上传出错, 请重试");
        console.log("上传失败");
    }

  });

})


// 点击seach框跳转到search页面
$('#search').on('focus', function(e) {
  $('.gotoSearch').trigger('click');
})
