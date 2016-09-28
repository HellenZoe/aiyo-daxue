$(function() {
  $(".swiper-container").swiper({
    autoplay: 2000
  })
})



console.log(QC.Login.check());
//  已经登陆
// if (QC.Login.check()) {
  // alert(QC.Login.check());
  QC.api("get_user_info", {})
  	//指定接口访问成功的接收函数，s为成功返回Response对象
  	.success(function(s){
  		//成功回调，通过s.data获取OpenAPI的返回数据
      $.hidePreloader();
      // showHint("获取信息成功", "success");


        // 获取参数
      var userName = s.data.nickname;
      var avatarUrl = s.data.figureurl_qq_1;
      var gender = s.data.gender;
  		var redirectUrl = "";
  		// 通过localStorage 获取当前用户所在服务,  确保用户登陆之后返回到该服务模块的个人中心
  		if (window.utils.getFromLocal('crt-service') == '/') {
  			redirectUrl = "/";
  		}else {
  	    var redirectUrl = "/" + window.utils.getFromLocal('crt-service') + "/self";
  		}
      var userInfo = {
        userName: userName,
        avatarUrl: avatarUrl,
        gender: gender,
        redirectUrl: redirectUrl
      }

  		// $('.gotoSelf').attr('href', redirectUrl);
  		//  把用户登陆信息提交到服务端 存储到数据库
  	  var url = "http://" + location.host + "/user"
      $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
  			contentType: "application/json",
        data: JSON.stringify(userInfo),
        processData: false,
        success: function (data) {
          if (data) {
  					if (window.utils) {
  						// window.utils.saveToLocal("userInfo", data.userInfo);
  						// alert(JSON.stringify(data.userInfo));
  						// window.localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
  						// alert(window.localStorage.getItem("userInfo"));
  						// console.log("save userInfo success", window.getFromLocal("userInfo"));
  						window.utils.saveToLocal("userInfo", data.userInfo);
  						// alert(window.utils.getFromLocal("userInfo"));
  					}

            console.log("上传成功");
          }
        },
        error: function (data) {
            // showMessageFail("上传出错, 请重试");
        }
      })

  		//  之前的实现方式  现在已经改用session实现
  		//  让去完善的按钮带上相应用户的参数
  		// var oldHref = $('.gotoSelf').attr('href');
  		// var newHref = oldHref + "?avatarUrl=" + avatarUrl
  		// $('.gotoSelf').attr('href', newHref);


  		//  将用户信息存储到localstorage 每次进入到首页用ajax获取数据


  		// 隐藏加载
      $.hidePreloader();




  	})
  	//指定接口访问失败的接收函数，f为失败返回Response对象
  	.error(function(f){
  		//失败回调

      // showHint("获取信息失败,麻烦重新登陆", "fail");
  	})
  	//指定接口完成请求后的接收函数，c为完成请求返回Response对象
  	.complete(function(c){
  		//完成请求回调
  	});


// }


if (!QC.Login.check()) {
  QC.Login.showPopup({
    appId: "101351420",
    redirectUrl: "http://s-289167.abc188.com/welcome"
  });
}

$('.check').on('click', function(e) {
    var crtService = $(this).attr('href');
    window.utils.saveToLocal('crtService', crtService);
    //  查看是否已经有学校信息
    if (!window.utils.getFromLocal('userInfo').school) {
      location.href = "http://" + location.host + "/changeSchool";
      return false;
    }
    return true;
})
$('.more').on('click', function(e) {
  e.preventDefault();

  $.alert("功能正在完善中.敬请期待!")
})


//  校园情话
$('.activity-card').on('click', function(e) {
  console.log($(this));
  var pId = $(this).attr('data-pId');
  var url = "http://" + location.host + "/article/prattle/" + pId;
  location.href=url;
})


$(document).on("pageInit", "#page-infinite-scroll-bottom", function(e, id, page) {
  // body...
// 加载flag
var loading = false;
// 最多可加载的条目
var maxItems = 50;

// 每次加载添加多少条目
var itemsPerLoad = 5;

function addItems(data) {
        // 生成新条目的HTML
        var html = '';
        var length = data.length;
        data.forEach(function(item, index) {
          html += '<li class="item-content"><div class="item-inner"><div class="activity-card prattle" data-pId=' + item._id + '><div class="card-content"><img src=' + item.backImgPath + '><div class="img-desc"><span>' + item.title+ '</span></div></div></div></div></li>';
        })

        // 添加新条目
        $('.infinite-scroll-bottom .list-container').append(html);

}


$.ajax({
  url: "http://" + location.host + "/activity?lastIndex=0&num=" + itemsPerLoad,
	type: 'GET',
  dataType: "json",
	contentType: "application/json",
	processData: false,
  success: function(data) {
    if (data.success) {
      // 重置加载flag
      loading = false;


      // 添加新条目
      addItems(data.data);
      // // 加载完毕，则注销无限加载事件，以防不必要的加载
      // $.detachInfiniteScroll($('.infinite-scroll'));
      // // 删除加载提示符
      // $('.infinite-scroll-preloader').remove();


      // 更新最后加载的序号
      lastIndex = $('.list-container li').length;
      //容器发生改变,如果是js滚动，需要刷新滚动
      console.log(lastIndex);
      // $.refreshScroller();

    }
  }
})


// 上次加载的序号

var lastIndex = 5;


console.log(lastIndex);
// 注册'infinite'事件处理函数
$(page).on('infinite', function() {

    console.log(loading);
    // 如果正在加载，则退出
    if (loading) return;

    // 设置flag
    loading = true;
    $.ajax({
      url: "http://" + location.host + "/activity?lastIndex=" + lastIndex + "&num=" + itemsPerLoad,
  		type: 'GET',
      dataType: "json",
			contentType: "application/json",
  		processData: false,
      success: function(data) {
        if (data.success) {
          // 重置加载flag
          loading = false;


          // 添加新条目
          addItems(data.data);
          if (lastIndex >= maxItems || data.data.length < itemsPerLoad) {
              // 加载完毕，则注销无限加载事件，以防不必要的加载
              $.detachInfiniteScroll($('.infinite-scroll'));
              // 删除加载提示符
              $('.infinite-scroll-preloader').remove();
              return;
          }

          // 更新最后加载的序号
          lastIndex = $('.list-container li').length;
          //容器发生改变,如果是js滚动，需要刷新滚动
          $.refreshScroller();

        }
      }
    })
});

})


$.init();
