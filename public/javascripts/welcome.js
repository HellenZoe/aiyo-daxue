var paras = {};

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
