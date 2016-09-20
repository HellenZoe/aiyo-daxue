$('.found').on('click', function(e) {
  e.preventDefault();
  var lId = $(this).attr('data-lId');
  var info = {
    lId: lId,
    type: "found"
  }
  var that = this;
  $.showPreloader();
  var url = "http://" + location.host + "/lost/action";
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
        $.toast('操作成功', 2000, "toast-success");

        //  隐藏加载
        $.hidePreloader();
      }
    },
    error: function (data) {
        // showMessageFail("上传出错, 请重试");
        console.log("上传失败");
    }

  });

})


//  点击跳到详情页
var plays = $(".item-content");
plays.forEach(function(item, index) {
  console.log(item, index);
  var t = $(item);
  t.on('click', function(e) {
      var cardId = $(this).parent().attr('data-lId');
      var host = location.host;
      location.href = "http://" + host + "/lost/detail/" + cardId;
  })
})


// 如果用户没有发布图片显示提示
var imgs = $('.img-wrapper img');
imgs.each(function(index, item) {
  var i = $(item);
  if (!i.attr('src')) {
    i.parent().children('.no-img').css('display', 'block');
  }
})
