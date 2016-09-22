//  展示已经发不过的文章
    $(document).ready(function() {
      var url = "http://" + location.host + "/admin/schoolPrattle";
      $('#dataTables-prattle').DataTable({
          "processing": true,
          "serverSide": true,
          "ajax": {
            url: url,
            type: "GET",
            dataType: "json",
      			contentType: "application/json",
            success: function(data) {
            }
          },
          "columns": [
            {"data": "title"},
            {"data": "author"},
            {"data": "time"},
            {"data": "path"},
            {"data": "view"}
          ]
      });
    });

$('#prattle-submit').on('click',function(e) {
  e.preventDefault();


  var prattleInfo = new FormData();
  prattleInfo.append('file', $('#prattleInputFile')[0].files[0]);
  prattleInfo.append('path', $('.prattle-path')[0].val());
  prattleInfo.append('author', $('.parattle-author')[0].val());
  prattleInfo.append('title', $('.prattle-title')[0].val());
  console.log(prattleInfo);

  var url = "http://" + location.host + "/article/prattle";
  $.ajax({
  	type: 'POST',
  	url: url,
    dataType: "json",
  	data: prattleInfo,
  	contentType: false,
  	processData: false,
  	success: function (data) {
  		if (data.success) {
  			// showMessageSuccess("上传成功");
        console.log("上传成功");
  		}
  	},
  	error: function (data) {
  			// showMessageFail("上传出错, 请重试");
  	}
  });

})

// var prattleInfo = {
//   title: "",
//   author: "",
//   backImgPath: "",
//   articleUrl: ""
// }
//
//
// if (window.File && window.FileReader && window.FormData) {
// 	var $inputField = $('#prattleInputFile');
//
// 	$inputField.on('change', function (e) {
// 		var file = e.target.files[0];
// 		if (file) {
//       console.log(file.type);
// 			if (/^html\//i.test(file.type)) {
//       	var reader = new FileReader();
//
//       	reader.onloadend = function () {
//           prattleInfo.articleUrl = reader.result;
//       	}
//
//       	reader.onerror = function () {
//       		showMessageFail("上传出错，请重试");
//       	}
//
//       	reader.readAsDataURL(file);
//
// 			} else {
// 				alert("只能上传html格式的文件");
// 			}
// 		}
// 	});
// } else {
// 	alert("不支持文件上传");
// }
//
//
// //  点击添加文章按钮　显示表单
// $('#newPrattle').on('click', function(e) {
//   $('.prattle-info-form').css('display', 'block');
//
// })
//
// //  点击提交　ａｊａｘ提交新增文件信息　后台收到后　读取服务器上信息
// $('#prattle-submit').on('click', function(e) {
//   //  阻止默认表单提交事件
//   e.preventDefault();
//
//   //  取到用户信息
//   var title = $('.prattle-title').val().trim();   //  标题
//   var author = $('.parattle-author').val().trim();   //作者
//   var backImgPath = $('.prattle-path').val().trim();
//   prattleInfo.title = title;
//   prattleInfo.author = author;
//   prattleInfo.backImgPath = backImgPath;
//
//   $.ajax({
//       var url = "http://" + location.host + "/admin/schoolPrattle";
//     		type: 'POST',
//     		url: url,
//         dataType: "json",
//     		data: JSON.stringify(prattleInfo),
//   			contentType: "application/json",
//     		processData: false,
//         success: function(data) {
//           if (data.success) {
//             $('.prattle-title').val("");
//             $('.prattle-author').val("");
//             $('.prattle-path').val("");
//
//             prattleInfo.author = "";
//             prattleInfo.title = "";
//             prattleInfo.backImgPath = "";
//             prattleInfo.articleUrl = "";
//             $('.prattle-info-form').css('display', 'none');
//             alert('发布成功');
//           }
//         }
//   })
// })
