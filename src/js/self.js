$(function() {

  var userInfo = {
    name: "",
    gender: "",
    tel: "",
    qq: "",
    school: "",
    department: ""
  }

  $('.finishPost').on('click', function(e) {

    //  阻止默认点击事件
    e.preventDefault();

    //  显示进度图标
    $.showPreloader();

    //  获取用户输入内容
    var name = $('.name > input').val();
    if (!name) {
      $.hidePreloader();
      $.toast("还没有填写名称哦~");
      return;
    }


    var gender = $('.gender > input').val();
    if (!gender) {
      $.hidePreloader();
      $.toast("还没有填写名称哦~");
      return;
    }

    var tel = $('.gender > input').val();
    if (!gender) {
      $.hidePreloader();
      $.toast("还没有填写名称哦~");
      return;
    }

    var qq = $('.qq > input').val();
    if (!qq) {
      $.hidePreloader();
      $.toast("还没有填写名称哦~");
      return;
    }

    var school = $('.school > input').val();
    if (!school) {
      $.hidePreloader();
      $.toast("还没有填写名称哦~");
      return;
    }

    var department = $('.department > input').val();
    if (!department) {
      $.hidePreloader();
      $.toast("还没有填写名称哦~");
      return;
    }


    userInfo.name  = name;
    userInfo.gender  = gender;
    userInfo.tel  = tel;
    userInfo.qq  = qq;
    userInfo.school  = school;
    userInfo.department  = department;

    //  发送用户信息
    sendInfo(userInfo);

    function sendFile(info) {
      var url = "http://" + location.host + "/self"
    	$.ajax({
    		type: 'POST',
    		url: url,
        dataType: "json",
    		data: JSON.stringify(userInfo),
  			contentType: "application/json",
    		processData: false,
    		success: function (data) {
    			if (data.sucess) {
    				// showMessageSuccess("上传成功");
            console.log("上传成功");
            console.log(data.userInfo);
    			}
    		},
    		error: function (data) {
    				// showMessageFail("上传出错, 请重试");
    		}
    	});
    }


  })
})
