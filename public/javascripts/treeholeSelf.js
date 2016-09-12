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

  item.on('click', function(e) {
    location.href="http://" + location.host + "/treehole/detail/" + tId;
  })
})

//  删除树洞
$('.delete').on('click', function(e) {
  //  阻止a标签的默认事件
  e.preventDefault();
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
        $.toast('删除成功', 2000, "toast-success");
        //  点赞数加1
      }
    },
    error: function (data) {
        // showMessageFail("上传出错, 请重试");
        console.log("删除失败");
    }

  });

  //  点击到详情

})
