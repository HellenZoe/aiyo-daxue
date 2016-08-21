var paras = {};

// 错误处理  日后完善  目前没有发现会出错
// function showHint(string) {
//   $(".hint .message").innerHTML = string;
//   switch (status) {
//     case "success":
//       $(".hint .message").addClass('success');
//       $(".actionRow a").innerHTML = "去完善";
//       break;
//     case "fail":
//       $(".hint .message").addClass('fail');
//       $(".actionRow a").innerHTML = "再登陆";
//     default:
//   }
// }

$.showPreloader();

QC.api("get_user_info", paras)
	//指定接口访问成功的接收函数，s为成功返回Response对象
	.success(function(s){
		//成功回调，通过s.data获取OpenAPI的返回数据
    $.hidePreloader();
    // showHint("获取信息成功", "success");


      // 获取参数
    var userName = s.data.nickname;
    var avatarUrl = s.data.figureurl_qq_1;
    var gender = s.data.gender;
		// 通过localStorage 获取当前用户所在服务,  确保用户登陆之后返回到该服务模块的个人中心
    var redirectUrl = "/" + window.utils.getFromLocal('crt-service') + "/self";
    var userInfo = {
      userName: userName,
      avatarUrl: avatarUrl,
      gender: gender,
      redirectUrl: redirectUrl
    }

		$('.gotoSelf').attr('href', redirectUrl);
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
						alert(JSON.stringify(data.userInfo));
						alert(window.localStorage);
						window.localStorage.setItem("userInfo", data.userInfo);
						alert(window.localＳtorage.getItem("userInfo"));
						console.log("save userInfo success", window.getFromLocal("userInfo"));
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
