$(function() {
  // FastClick.attach(document.body);

  //  把用户已经点过赞的图标换成红色
  var allCard = $('.facebook-card');
  allCard.forEach(function(item, index) {
    // window.utils.saveToLocal("test", "hahaahh");
    // alert(window.utils.getFromLocal("test"));
    // if (window.localStorage) {
    //   if (window.utils) {
    //     alert('fuck');
    //     alert(window.utils.getFromLocal("userInfo"));
    //   }
    // }else {
    //   alert('you');
    // }
    var crtUserId = window.utils.getFromLocal('userInfo')._id;
    // alert(crtUserId);
    item = $(item);
    var favId  = item.attr('data-favId');
    alert(favId);
    alert(crtUserId);
    if (window.utils.contains(favId, crtUserId)) {
      alert("yeah");
      item.children('.topic-card-footer').children('#enjoy').children('.iconfont-nullEnjoy').css('display', 'none')
      item.children('.topic-card-footer').children('#enjoy').children('.iconfont-selfEnjoy').css('display', 'inline')
    }
  })


  //   点击图片的时候  跳转到相应的详情页去
  // $('.card-content').on('click', function(e) {
  //   var cardId = $(this).parent().attr('data-tId');
  //   var host = location.host;
  //   location.href = "http://" + host + "/treehole/detail/" + cardId;
  // })
  // alert("you");
  // var card = document.getElementsByClassName('card-content')[0];
  var card = document.getElementById("fuck");
  // alert("fuck");
  // alert(card);
  card.addEventListener('click', function(e) {
    var cardId = $(this).parent().attr('data-tId');
    var host = location.host;
    location.href = "http://" + host + "/treehole/detail/" + cardId;
  });
  //  点赞
  $('.iconfont-nullEnjoy').on('click', function(e) {
    console.log("点赞");
    var enjoyCount = $(this).parent().children('.enjoy-count');
    var treehole = $(this).parent().parent().parent();
    var parent = $(this).parent();
    var that = $(this);
    var selfEnjoy = parent.children('.iconfont-selfEnjoy');
    var countInfo = {
      fav: enjoyCount.text(),
      treeholeId: treehole.attr('data-tid'),
      action: "up"
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

          $.toast('点赞成功', 2000, "toast-success");
          //  点赞数加1
          enjoyCount.text(data.c);
          that.css('display', 'none');
          selfEnjoy.css('display', 'inline');

          $.hidePreloader();
        }
      },
      error: function (data) {
          // showMessageFail("上传出错, 请重试");
          console.log("上传失败");
      }

    });

  })


  //  取消点赞
  $('.iconfont-selfEnjoy').on('click', function(e) {
    console.log("取消点赞");
    var enjoyCount = $(this).parent().children('.enjoy-count');
    var treehole = $(this).parent().parent().parent();
    var parent  = $(this).parent();
    var that = $(this);
    var nullEnjoy = parent.children('.iconfont-nullEnjoy');
    var countInfo = {
      fav: enjoyCount.text(),
      treeholeId: treehole.attr('data-tid'),
      action: "down"
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

          $.toast('取消点赞', 2000, "toast-success");
          //  点赞数加1
          enjoyCount.text(data.c);
          that.css('display', 'none');
          nullEnjoy.css('display', 'inline');

          $.hidePreloader();
        }
      },
      error: function (data) {
          // showMessageFail("上传出错, 请重试");
          console.log("上传失败");
      }

    });

  })


  //  点击评论图标跳转到评论页面
  $('#comment').on('click', function(e) {
    e.preventDefault();
    var treeholeId = $(this).parent().parent().attr('data-tid');
    console.log(treeholeId);
    location.href = "http://" + location.host + "/treehole/detail/" + treeholeId;
  })

  // 点击seach框跳转到search页面
  $('#search').on('focus', function(e) {
    $('.gotoSearch').trigger('click');
  })

});
