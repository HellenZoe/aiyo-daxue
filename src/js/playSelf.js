$('.del').on('click', function(e) {
  e.stopPropagation();
  var pId = $(this).attr('data-pId');
  var info = {
    pId: pId,
    type: "del"
  }
  var that = this;
  $.showPreloader();
  var url = "http://" + location.host + "/play/action";
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
      var cardId = $(this).parent().attr('data-pId');
      var host = location.host;
      location.href = "http://" + host + "/play/detail/" + cardId;
  })
})
