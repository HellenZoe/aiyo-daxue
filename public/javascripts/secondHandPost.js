$.init();

$(function() {
  // FastClick.attach(document.body);
  //
  // autosize(document.querySelectorAll("textarea"));


  var formInfo  = {
    name: "",
    desc: "",
    price: "",
    location: "",
    qq: "",
    tel: "",
    pics: [],
  }
  var picCount = 0;

  // hack 默认的上传文件的样式  然后用另外一个图标的点击来触发
  var newFileIcon = $('.iconfont-treeholePost');
  newFileIcon.on('click', function() {
    if (formInfo.pics.length >= 4) {
      $.hidePreloader();
      $.toast("最多添加四张照片");
      return false;
    }

    $('#fileToUpload').trigger('click');
    return false;
  })




  var categoryBoxes = $('.category input[type=checkbox]');
  console.log(categoryBoxes);
  categoryBoxes.on('click', function() {
    if (this.checked) {
      categoryBoxes.prop('checked', false);
      $(this).prop("checked", true);
    }
  })


  //  当用户点击分类的checkbox的时候  检测是否超过一个
  // var checkboxs = $('.category label');
  // checkboxs.on('click', function(e) {
  //   console.log("clicked checkbox");
  //   var num = $('.category input:checked').length;
  //   console.log(num);
  //   if (num >= 1) {
  //     $.toast('只能选择一个分类', 2000, 'toast-success');
  //     e.preventDefault();
  //   }
  // })
  //  点击右上角完成按钮时  先通过ajax提交， 然后再重定向到/treehole页面

  var finishButton = $('.finishPost');
  finishButton.on('click', function(e) {
    //  阻止默认的链接事件
    e.preventDefault();

    //  显示进度图标
    $.showPreloader();

    //  获取用户输入内容
    var name = $('.name > input').val();
    if (!name) {
      $.hidePreloader();
      $.toast("还没有写名称哟～");
      return;
    }else if (!/^[\u4e00-\u9fa5|0-9|A-Za-z]{0,25}$/.test(name)) {
      $.hidePreloader();
      $.toast("名称超过字数了亲~");
      return;
    }
    var desc = $('.desc > input').val();
    if (!desc) {
      $.hidePreloader();
      $.toast("还没有写描述哟～");
      return;
    }else if (!/^[\u4e00-\u9fa5|0-9|A-Za-z|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]{0,25}$/.test(desc)) {
      $.hidePreloader();
      $.toast("描述超过字数了亲~");
      return;
    }
    var price = $('.price > input').val();
    if (!price) {
      $.hidePreloader();
      $.toast("还没有写价格哟～");
      return;
    }else if (!/^\d{0,4}$/.test(price)) {
      $.hidePreloader();
      $.toast("再贵就买不起啦~");
      return;
    }
    var address = $('.location input').val();
    if (!address) {
      $.hidePreloader();
      $.toast("还没有写地址哟～");
      return;
    }else if (!/^[\u4e00-\u9fa5|0-9|A-Za-z]{0,25}$/.test(desc)) {
      $.hidePreloader();
      $.toast("地址超过字数了亲~");
      return;
    }

    var category = $('.category input:checked')
    if (category.length == 0) {
      $.hidePreloader();
      $.toast("还没有选分类哟");
    }else if (category.length > 1) {
      $.hidePreloader();
      $.toast("只能选一个哦~~");
      return;
    }else {
      formInfo.category = category.attr('name');
    }
    var qq = $('.qq input').val();
    if (!qq) {
      $.hidePreloader();
      $.toast("还没有写qq哟～");
      return;
    }else if (!/^\d{4,11}$/.test(qq)) {
      $.hidePreloader();
      $.toast("qq格式错误~");
      return;
    }
    var tel = $('.tel input').val();
    if (!tel) {
      $.hidePreloader();
      $.toast("还没有写电话哟～");
      return;
    }else if (!/^1[3|4|5|7|8]\d{9}$/.test(tel)) {
      $.hidePreloader();
      $.toast("电话格式错误~");
      return;
    }

    // 最多添加四张照片
    // if (formInfo.pics.length > 4) {
    //   $.hidePreloader();
    //   $.toast("最多添加四张照片");
    //   return;
    // }

    formInfo.name = name;
    formInfo.desc = desc;
    formInfo.price = price;
    formInfo.location = address;
    formInfo.qq = qq;
    formInfo.tel = tel;

    //  发送所有信息
    sendFile(formInfo);
    // formInfo.pics.forEach(function(item, index) {
    //   sendFile(item);
    //   console.log("上传 ", item);
    // })

    // 发送完请求之后隐藏
    $.hidePreloader();

    //  提醒用户已经发布成功  然后回到树洞首页
    $.alert("现在返回主页", "发布成功", function() {
      var host = location.host;
      console.log("http://" + host + "/secondHand");
      location.href= "http://" + host + "/secondHand";
      return;
    })

  })


  // 点击删除小图标的时候
  function bindDeleteAction(node) {
    $(node).on('click', function(e) {
      var index = $(this).parent('div').attr('data-index');
      formInfo.pics.pop(index);
      console.log("delete", formInfo.pics);
      $(this).parent('div').remove();
    })



  }

  // 提醒用户他的手机不支持上传图片
  function showMessageFail(string) {
    $.alert(string, "出错");
  }

  function showMessageSuccess(string) {
    $.toast(string, 2000, "successToast");
  }
  //  测试浏览器是否支持文件上传
  function isUploadSupported() {
      if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
          return false;
      }
      var elem = document.createElement('input');
      elem.type = 'file';
      return !elem.disabled;
  };



  //读取文件
  if (window.File && window.FileReader && window.FormData) {
  	var $inputField = $('#fileToUpload');

  	$inputField.on('change', function (e) {
  		var file = e.target.files[0];
  		if (file) {
        console.log(file.type);
  			if (/^image\//i.test(file.type)) {
  				readFile(file);
  			} else {
  				showMessageFail("只能上传jpg/png格式的图片");
  			}
  		}
  	});
  } else {
  	showMessageFail("不支持图片上传");
  }

  function readFile(file) {
  	var reader = new FileReader();

  	reader.onloadend = function () {
  		processFile(reader.result, file.type);
  	}

  	reader.onerror = function () {
  		showMessageFail("上传出错，请重试");
  	}

  	reader.readAsDataURL(file);
  }

  // 处理文件
  function processFile(dataURL, fileType) {
  	// var maxWidth = 100;
  	// var maxHeight = 100;
  	var image = new Image();
  	image.onload = function () {
      // var previewContainer = document.getElementById("previewformInfo");
      // var div = document.createElement('div');
      // div.appendChild(image);
      // previewContainer.appendChild(div);
  		var width = image.width;
  		var height = image.height;
      // console.log(width + "ahahh" + height);
  		// var shouldResize = (width > maxWidth) || (height > maxHeight);

      var canvas = document.createElement("canvas");

  		// if (!shouldResize) {
      //   var ctx =  canvas.getContext("2d");
      //   ctx.drawImage(this, 0, 0, width, height);
      //   addCanvasToPreview(canvas, fileType);
  		// 	return;
  		// }
      //
      //
  		// var newWidth;
  		// var newHeight;
      //
  		// if (width > height) {
  		// 	newHeight = height * (maxWidth / width);
  		// 	newWidth = maxWidth;
  		// } else {
      //   newWidth = width * (maxHeight / height);
  		// 	newHeight = maxHeight;
  		// }
  		canvas.width = width;
  		canvas.height = height;

  		var context = canvas.getContext('2d');
  		context.drawImage(this, 0, 0, width, height);
      addCanvasToPreview(canvas, fileType);
  	};


  	image.onerror = function () {
  		showMessageFail("处理出错，请重试");
  	};

    image.src = dataURL;
  }


  function addCanvasToPreview(canvas, fileType) {
    var wrapper = document.createElement("div");
    var deleteIcon = document.createElement("i");
    deleteIcon.className = "iconfont-postDelete";
    deleteIcon.innerHTML = "&#xe607;"
    bindDeleteAction(deleteIcon);
    wrapper.appendChild(deleteIcon);
    wrapper.appendChild(canvas);
    wrapper.setAttribute('data-index', picCount);
    var previewContainer = document.getElementById("previewAllPic");
    previewContainer.appendChild(wrapper);


    dataURL = canvas.toDataURL(fileType);
    formInfo.pics.push(dataURL);
    console.log("new ", formInfo.pics);
    picCount = picCount + 1;

    // 隐藏加载图标
    $.hidePreloader();

  }


  //  上传文件
  function sendFile(info) {
  	var formData = new FormData();
    console.log("post信息", info);
  	formData.append('imageData', JSON.stringify(info.pics));
    formData.append('name', info.name);
    formData.append('desc', info.desc);
    formData.append('price', info.price);
    formData.append('location', info.location);
    formData.append('category', info.category);
    formData.append('qq', info.qq);
    formData.append('tel', info.tel);
    // alert(JSON.stringify(info));
    // alert(JSON.stringify(formData));

    var url = "http://" + location.host + "/secondHand/new";
  	$.ajax({
  		type: 'POST',
  		url: url,
      dataType: "json",
  		data: formData,
  		contentType: false,
  		processData: false,
  		success: function (data) {
  			if (data.sucess) {
  				// showMessageSuccess("上传成功");
          console.log("上传成功");
  			}
  		},
  		error: function (data) {
  				// showMessageFail("上传出错, 请重试");
  		}
  	});
  }

});
