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

//  点击添加文章按钮　显示表单
$('#newPrattle').on('click', function(e) {
  $('.prattle-info-form').css('display', 'block');

})

//  点击提交　ａｊａｘ提交新增文件信息　后台收到后　读取服务器上信息
$('#prattle-submit').on('click', function(e) {
  //  阻止默认表单提交事件
  e.preventDefault();

  //  取到用户信息
  var title = $('.prattle-title').val();
  var author = $('.parattle-author').val();
  var fileName = $('.prattle-path').val();

  var prattleInfo = {
    title: title,
    author: author,
    fileName: fileName
  }


  $.ajax({
      var url = "http://" + location.host + "/admin/schoolPrattle";
    		type: 'POST',
    		url: url,
        dataType: "json",
    		data: JSON.stringify(prattleInfo),
  			contentType: "application/json",
    		processData: false,
        success: function(data) {
          if (data.success) {
            $('.prattle-title').val("");
            $('.prattle-author').val("");
            $('.prattle-path').val("");

            $('.prattle-info-form').css('display', 'none');
            alert('发布成功');
          }
        }
  })
})
