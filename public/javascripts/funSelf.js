//  删除自己想去的
$('.del-wanto').on('click', function(e) {
  e.preventDefault();
  var fId = $(this).attr('data-fid');
  var info = {
    fId: fId,
    type: "del-wanto"
  }
  var that = this;
  $.showPreloader();
  var url = "http://" + location.host + "/fun/action";
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



//  删除自己分享的
$('.del-share').on('click', function(e) {
  e.preventDefault();
  var fId = $(this).attr('data-fid');
  var info = {
    fId: fId,
    type: "del-share"
  }
  var that = this;
  $.showPreloader();
  var url = "http://" + location.host + "/fun/action";
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
