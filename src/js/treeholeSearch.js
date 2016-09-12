  $('#search-action').on('keydown', function(e) {
    var searchKey = $(this).val();
    if (e.keyCode == 13 && $(this).val()) {
      // 显示缓冲
      $.showPreloader();

      var url = "http://" + location.host + "/treehole/search";
      $.ajax({
      type: "POST",
      url: url,
      dataType: "json",
  		contentType: "application/json",
      data: JSON.stringify({key: searchKey}),
      processData: false,
      success: function (data) {
        if (data.success) {
          console.log("上传成功");
          if (data.ts) {

            //  先清楚上一次添加的
            $('#treeholeListContainer ul').remove();
            //  添加搜索到的信息
            var list = document.createElement('ul');
            data.ts.forEach(function(item, index) {
                var li = document.createElement('li');
                li.innerHTML = item.title;
                li.setAttribute('data-tId', item._id);
                $(li).on('click', function(e) {
                  var tid = $(this).attr("data-tid");
                  location.href = "http://" + location.host + "/treehole/detail/" + tid;
                })
                list.appendChild(li);
            })

            var container = document.getElementById("treeholeListContainer");
            container.appendChild(list);
            //  隐藏
            $.hidePreloader();
          }else {
            $.hidePreloader();
            $.toast("没有搜索到相关树洞~");
          }
        }
      },
      error: function (data) {
          // showMessageFail("上传出错, 请重试");
          console.log("上传失败");
      }
      })
    }
  })
