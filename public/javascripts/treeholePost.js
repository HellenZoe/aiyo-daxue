$.init();

$(function() {
  FastClick.attach(document.body);

  autosize(document.querySelectorAll("textarea"));


  var allPic  = {
    postText: "",
    name: "",
    pics: []
  }
  var picCount = 0;

  // hack 默认的上传文件的样式  然后用另外一个图标的点击来触发
  var newFileIcon = $('.iconfont-treeholePost');
  newFileIcon.on('click', function() {
    $('#fileToUpload').trigger('click');
    return false;
  })


  //  点击右上角完成按钮时  先通过ajax提交， 然后再重定向到/treehole页面

  var finishButton = $('.finishPost');
  finishButton.on('click', function(e) {
    //  阻止默认的链接事件
    e.preventDefault();

    //  显示进度图标
    $.showPreloader();

    //  获取用户输入内容
    var postText = $('.treehole-content > textarea').val();
    console.log(postText);
    allPic.postText = postText;

    var name = $('.name input').val();
    console.log(name);
    allPic.name = name;

    //  发送所有信息
    sendFile(allPic);
    // allPic.pics.forEach(function(item, index) {
    //   sendFile(item);
    //   console.log("上传 ", item);
    // })

    // 发送完请求之后隐藏
    $.hidePreloader();

    //  提醒用户已经发布成功  然后回到树洞首页
    $.alert("现在返回主页", "发布成功", function() {
      var host = location.host;
      location.href= "http://" + host  + "/treehole";
      return;
    })

  })


  // 点击删除小图标的时候
  function bindDeleteAction(node) {
    $(node).on('click', function(e) {
      var index = $(this).parent('div').attr('data-index');
      allPic.pics.pop(index);
      console.log("delete", allPic.pics);
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
  	// var maxWidth = 400;
  	// var maxHeight = 400;
  	var image = new Image();
  	image.onload = function () {
      // var previewContainer = document.getElementById("previewAllPic");
      // var div = document.createElement('div');
      // div.appendChild(image);
      // previewContainer.appendChild(div);
  		var width = image.width;
  		var height = image.height;
      // console.log(width,  "--", height);
  		// var shouldResize = (width > maxWidth) || (height > maxHeight);
      //
      var canvas = document.createElement("canvas");
      //
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
    wrapper.className = "picsWrapper";
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
    allPic.pics.push(dataURL);
    console.log("new ", allPic.pics);
    picCount = picCount + 1;



// 大图预览
var imgWrappers = $('.picsWrapper');
imgWrappers.forEach(function(item, index) {
  console.log(item, index);

  //  给每个图片容器都绑定一个点击大图预览事件
  var wrapper = $(item);
  wrapper.on('click', function(e) {
    //  默认事件
    e.preventDefault();

    //  清楚之前的图片浏览器

    $('.photo-browser').remove();


    //  拿到图片链接
    var urls = [];
    var images = $(this).children('canvas');
    images.forEach(function(item, index) {
      urls.push(item.toDataURL());
    })
    console.log(urls);
    var myPhotoBrowserPopup = $.photoBrowser({
      photos: urls,
      type: "popup"
    })

    // 打开图片浏览器
    myPhotoBrowserPopup.open();

    // myPhotoBrowserStandalone.attachEvents(true);
    // if (myPhotoBrowserStandalone.params.type === 'standalone') {
    //   pb.container.removeClass('photo-browser-in').addClass('photo-browser-out').transitionEnd(function () {
    //   pb.container.removeClass('photo-browser-in').addClass('photo-browser-out').animationEnd(function () { pb.container.remove(); });
    // }
  })
})

  }


  //  上传文件
  function sendFile(info) {
  	var formData = new FormData();
    console.log("post信息", info);
  	formData.append('imageData', JSON.stringify(info.pics));
    formData.append('postText', info.postText);
    formData.append('name', info.name);
    var url = "http://" + location.host + "/treehole/new"
  	$.ajax({
  		type: 'POST',
  		url: url,
      dataType: "json",
  		data: formData,
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
  }

});
