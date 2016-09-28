$(function() {

  var userInfo = {
    // name: "",
    // gender: "",
    tel: "",
    qq: "",
    school: "",
    department: ""
  }

  $('.done').on('click', function(e) {

    //  阻止默认点击事件
    e.preventDefault();



    // var tel = $('.tel  input').val();
    // if (!tel) {
    //   $.toast("还没有填写电话哦~");
    //   return;
    // }else if (!/^1[3|4|5|7|8]\d{9}$/.test(tel)) {
    //   $.toast("电话格式错误~");
    //   return;
    // }
    //
    // var qq = $('.qq  input').val();
    // if (!qq) {
    //   $.toast("还没有填写qq哦~");
    //   return;
    // }else if (!/^\d{4,11}$/.test(qq)) {
    //   $.toast("qq格式错误~");
    //   return;
    // }

    var school = $('.school  input').val();
    if (!school) {
      $.toast("还没有填写学校哦~");
      return;
    }

    // var department = $('.department  input').val();
    // if (!department) {
    //   $.toast("还没有填写宿舍地址哦~");
    //   return;
    // }else if (!/^[\u4e00-\u9fa5|0-9]{0,10}$/.test(department) ) {
    //   $.toast("十个字以内就好啦~");
    //   return;
    // }
    //

    // userInfo.name  = name;
    // userInfo.gender  = gender;
    // userInfo.tel  = tel;
    // userInfo.qq  = qq;
    userInfo.school  = school;
    // userInfo.department  = department;

    //  显示进度图标
    $.showPreloader();
    //  发送用户信息
    sendInfo(userInfo);

    function sendInfo(info) {
      var url = "http://" + location.host + "/self"
    	$.ajax({
    		type: 'POST',
    		url: url,
        dataType: "json",
    		data: JSON.stringify(userInfo),
  			contentType: "application/json",
    		processData: false,
    		success: function (data) {
    			if (data.success) {
    				// showMessageSuccess("上传成功");
            $.hidePreloader();
            var nowUserInfo = window.utils.getFromLocal('userInfo');
            // nowUserInfo.qq = info.qq;
            // nowUserInfo.tel = info.tel;
            nowUserInfo.school = info.school;
            // nowUserInfo.department = info.department;
            window.utils.saveToLocal('userInfo', nowUserInfo);
            console.log("学校切换成功");
            var crtService = window.utils.getFromLocal('crtService');
            location.href="http://" + location.host + crtService;
    			}
    		},
    		error: function (data) {
    				// showMessageFail("上传出错, 请重试");
    		}
    	});
    }


  })


  $('.school input').on('click', function(e) {
    //  阻止默认事件
    e.preventDefault();

    //  清除
    $('#schoolListContainer ul').remove();
    $.showPreloader();

    var url = "http://" + location.host + "/school";

    $.ajax({
    		type: 'GET',
    		url: url,
        dataType: "json",
  			contentType: "application/json",
    		processData: false,
    		success: function (data) {
    			if (data.success) {
            $.hidePreloader();

            var list = document.createElement('ul');
            data.data.forEach(function(item, index) {
              var li = document.createElement('li');
              li.innerHTML = item.name;

              //  添加点击事件
              $(li).on('click', function(e) {
                console.log($(this));
                var schoolName = $(this).html();
                console.log(schoolName);
                $('.school input').val(schoolName);
                //  返回编辑页面
                // $('.backEdit').trigger('click');
                location.href="http://" + location.host + "/changeSchool#editInfo";
                console.log('fuck');

              })
              list.appendChild(li);
            })

            var container = document.getElementById("schoolListContainer");
            container.appendChild(list);
    			}
    		},
    		error: function (data) {
    				// showMessageFail("上传出错, 请重试");
    		}
    })
  })
})
