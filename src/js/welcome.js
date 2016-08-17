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

    // 用户点击去完善的时候  就发送post请求把用户信息发送到路由/user   然后跳转到相应模块的个人中心
    $(".gotoSelf").on("click", function(e) {

      // 获取参数
      var userName = s.data.nickname;
      var avatarUrl = s.data.figureurl_qq_1;
      var gender = s.data.gender;
      var redirectUrl = "/treehole/self";
      var userInfo = {
        userName: userName,
        avatarUrl: avatarUrl,
        gender: gender,
        redirectUrl: redirectUrl
      }

			alert(userInfo);
		  var url = "http://" + location.host + "/user"
      $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: userInfo,
        contentType: false,
        processData: false,
        success: function (data) {
          if (data) {

            console.log("上传成功");
          }
        },
        error: function (data) {
            // showMessageFail("上传出错, 请重试");
        }
      })


    })



	})
	//指定接口访问失败的接收函数，f为失败返回Response对象
	.error(function(f){
		//失败回调
    $.hidePreloader();
    // showHint("获取信息失败,麻烦重新登陆", "fail");
	})
	//指定接口完成请求后的接收函数，c为完成请求返回Response对象
	.complete(function(c){
		//完成请求回调
	});
