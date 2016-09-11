$(function() {

  var userInfo = {
    // name: "",
    // gender: "",
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
    // var name = $('.name > input').val();
    // if (!name) {
    //   $.hidePreloader();
    //   $.toast("还没有填写名称哦~");
    //   return;
    // }
    //
    //
    // var gender = $('.gender > input').val();
    // if (!gender) {
    //   $.hidePreloader();
    //   $.toast("还没有填写性別哦~");
    //   return;
    // }

    var tel = $('.gender > input').val();
    if (!tel) {
      $.hidePreloader();
      $.toast("还没有填写电话哦~");
      return;
    }

    var qq = $('.qq > input').val();
    if (!qq) {
      $.hidePreloader();
      $.toast("还没有填写qq哦~");
      return;
    }

    var school = $('.school > input').val();
    if (!school) {
      $.hidePreloader();
      $.toast("还没有填写学校哦~");
      return;
    }

    var department = $('.department > input').val();
    if (!department) {
      $.hidePreloader();
      $.toast("还没有填写宿舍地址哦~");
      return;
    }


    // userInfo.name  = name;
    // userInfo.gender  = gender;
    userInfo.tel  = tel;
    userInfo.qq  = qq;
    userInfo.school  = school;
    userInfo.department  = department;

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


  $('.school input').on('click', function(e) {
    //  阻止默认事件
    e.preventDefault();

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
              li.addEventListener('click', function(e) {
                var schoolName = $(this).innerHTML;
                $('.school input').val(schoolName);
                console.log(schoolName);
                //  返回编辑页面
                $('.backEdit').trigger('click');

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



// 用户点击任何一个学校的item，就返回信息编辑页面， 并且自动填充选择字段
// var schoolList = $('#schoolListContainer li');
// schoolList.forEach(function(item, index) {
//   console.log(item, index);
//   var school = $(item);
//   school.on('click', function(e) {
//     e.preventDefault();
//
//     var schoolName = $(this).html();
//     console.log(schoolName);
//     $('.school input').val(schoolName);
//
//     //  返回编辑页面
//     $('.backEdit').trigger('click');
//   })
// })
