if (window.utils) {
  window.utils.saveToLocal('crt-service', "secondHand");
}

//  删除
$('del').on('click', function(e) {
  e.preventDefault();
  var vId = $(this).attr('data-favId');
  var info = {
    vId: vId,
    type: "del"
  };
  var that = this;
  $.showPreloader();
  var url = "http://" + location.host + "/secondHand/action";
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
        $.hidePreloader();
      }
    },
    error: function (data) {
        // showMessageFail("上传出错, 请重试");
        console.log("上传失败");
    }

  });

})

// 下架
$('down').on('click', function(e) {
  e.preventDefault();
  var vId = $(this).attr('data-favId');
  var info = {
    vId: vId,
    type: "down"
  };
  var that = this;
  $.showPreloader();
  var url = "http://" + location.host + "/secondHand/action";
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
        $.hidePreloader();
      }
    },
    error: function (data) {
        // showMessageFail("上传出错, 请重试");
        console.log("上传失败");
    }

  });

})

// 确认售出
$('sold').on('click', function(e) {
  e.preventDefault();
  var vId = $(this).attr('data-favId');
  var info = {
    vId: vId,
    type: "sold"
  };
  var that = this;
  $.showPreloader();
  var url = "http://" + location.host + "/secondHand/action";
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
        $.hidePreloader();
      }
    },
    error: function (data) {
        // showMessageFail("上传出错, 请重试");
        console.log("上传失败");
    }

  });

})

// 编辑
$('edit').on('click', function(e) {
  e.preventDefault();
  var vId = $(this).attr('data-favId');
  var info = {
    vId: vId,
    type: "edit"
  };
  var that = this;
  $.showPreloader();
  var url = "http://" + location.host + "/secondHand/action";
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
        $.hidePreloader();
      }
    },
    error: function (data) {
        // showMessageFail("上传出错, 请重试");
        console.log("上传失败");
    }

  });

})
