

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
