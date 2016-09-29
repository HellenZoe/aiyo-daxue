if (window.utils) {
  window.utils.saveToLocal('crt-service', "secondHand");
}

//  删除
$('.del').on('click', function(e) {
  e.stopPropagation();
  var vId = $(this).attr('data-vid');
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

// 下架
$('.down').on('click', function(e) {
  e.stopPropagation();
  var vId = $(this).attr('data-vid');
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
        $.toast('操作成功', 2000, "toast-success");

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


// 上架
$('.up').on('click', function(e) {
  e.stopPropagation();
  var vId = $(this).attr('data-vid');
  var info = {
    vId: vId,
    type: "up"
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
        $.toast('操作成功', 2000, "toast-success");

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
$('.sold').on('click', function(e) {
  e.stopPropagation();
  var vId = $(this).attr('data-vid');
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
        $.toast('操作成功', 2000, "toast-success");

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
$('.edit').on('click', function(e) {
  e.stopPropagation();
  var vId = $(this).attr('data-vid');
  location.href = "http://" + location.host + "/secondHand/edit/" + vId;
})

//  点击跳到详情页
//
// var plays = $(".item-block");
// plays.forEach(function(item, index) {
//   console.log(item, index);
//   var t = $(item);
//   t.on('click', function(e) {
//       var cardId = $(this).attr('data-sId');
//       var host = location.host;
//       location.href = "http://" + host + "/secondHand/detail/" + cardId;
//   })
// })

// 如果用户没有发布图片显示提示
var imgs = $('.img-wrapper img');
imgs.each(function(index, item) {
  var i = $(item);
  if (!i.attr('src')) {
    i.parent().children('.no-img').css('display', 'block');
  }
})
