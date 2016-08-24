$('.wantTo').on('click', function(e) {
  var fId = $(this).attr('data-fId');
  var info = {
    fId: fId
  }
  $.showPreloader();
  var url = "http://" + location.host + "/fun/follow";
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
