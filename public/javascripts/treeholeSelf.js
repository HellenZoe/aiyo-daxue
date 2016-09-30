//  当前服务是树洞
if (window.utils) {
  window.utils.saveToLocal('crt-service', "treehole");
}

//  如果自己给自己点赞了 也是显示红心
var allCard = $('.topic-block');
allCard.forEach(function(item, index) {
  item = $(item);
  var crtUserId = window.utils.getFromLocal('userInfo')._id;
  var favId  = item.attr('data-favId');
  var tId = item.attr('data-tid');
  console.log(favId);
  if (window.utils.contains(favId, crtUserId)) {
    item.children('.topic-card-footer').children('#enjoy').children('.iconfont-nullEnjoy').css('display', 'none')
    item.children('.topic-card-footer').children('#enjoy').children('.iconfont-selfEnjoy').css('display', 'inline')
  }

  // item.on('click', function(e) {
  //   location.href="http://" + location.host + "/treehole/detail/" + tId;
  // })
})

//  删除树洞
$('.delete').on('click', function(e) {
  //  停止冒泡
  e.stopPropagation();
  var that = this;
  var id = $(this).attr('data-tid');
  var info = {
    tId: id
  }
  $.showPreloader();
  var url = "http://" + location.host + "/treehole/del";
  $.ajax({
    type: "POST",
    url: url,
    dataType: "json",
  	contentType: "application/json",
    data: JSON.stringify(info),
    processData: false,
    success: function (data) {
      if (data.success) {
        $.hidePreloader();
        $(that).parent().parent().parent().parent().remove();
        $.toast('删除成功', 1000, "toast-success");
        window.utils.saveToLocal('treehole', 'action');
        //  刷新
        setTimeout(location.replace(location.href), 1000);
      }
    },
    error: function (data) {
        // showMessageFail("上传出错, 请重试");
        console.log("删除失败");
    }

  });

  //  点击到详情
  //
  // var treeholes = $(".topic-content");
  // treeholes.forEach(function(item, index) {
  //   console.log(item, index);
  //   var t = $(item);
  //   t.on('click', function(e) {
  //       var cardId = $(this).parent().parent().attr('data-tId');
  //       var host = location.host;
  //       location.href = "http://" + host + "/treehole/detail/" + cardId;
  //   })
  // })


})


// 如果用户没有发布图片显示提示
var imgs = $('.my-topic img');
imgs.each(function(index, item) {
  var i = $(item);
  if (!i.attr('src')) {
    i.parent().children('.no-img').css('display', 'block');
  }
})
