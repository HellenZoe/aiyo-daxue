/*!
 * Start Bootstrap - SB Admin 2 v3.3.7+1 (http://startbootstrap.com/template-overviews/sb-admin-2)
 * Copyright 2013-2016 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap/blob/gh-pages/LICENSE)
 */
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
        {"data": "view"},
        {
          "data": "_id",
          "render": function(data, type, row) {
            return "<button class='btn btn-primary'>删除</button>"
          }
        }
      ]
  });
});

$('#prattle-submit').on('click',function(e) {
  e.preventDefault();


  var prattleInfo = new FormData();
  prattleInfo.append('file', $('#prattleInputFile')[0].files[0]);
  prattleInfo.append('path', $('.prattle-path').val());
  prattleInfo.append('author', $('.prattle-author').val());
  prattleInfo.append('title', $('.prattle-title').val());
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
        $('.prattle-info-form input').val("");
        $('.prattle-info-form').css("display", "none");
        alert("添加成功");

  		}
  	},
  	error: function (data) {
  			// showMessageFail("上传出错, 请重试");
  	}
  });

})


//  点击新文章 显示表格
$('#newPrattle').on('click', function(e) {
  $('.prattle-info-form').css("display", "block");
})
