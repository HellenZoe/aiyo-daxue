//  当前服务是树洞
if (window.utils) {
  window.utils.saveToLocal('crt-service', "treehole");
}

//  如果自己给自己点赞了 也是显示红心
var allCard = $('.topic-block');
allCard.forEach(function(item, index) {
  var crtUserId = window.utils.getFromLocal('userInfo')._id;
  item = $(item);
  var favId  = item.attr('data-favId');
  console.log(favId);
  if (favId.contains(crtUserId)) {
    item.children('.topic-card-footer').children('#enjoy').children('.iconfont-nullEnjoy').css('display', 'none')
    item.children('.topic-card-footer').children('#enjoy').children('.iconfont-selfEnjoy').css('display', 'inline')
  }
})


$('.delete').on('click', function(e) {
  //  阻止a标签的默认事件
  e.preventDefault();
  var that = this;
  var id = $(this).attr('data-tid');
  var info = {
    tid: id
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


})
