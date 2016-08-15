$.init();


autosize(document.querySelectorAll("textarea"));

// hack 默认的上传文件的样式  然后用另外一个图标的点击来触发
var newFileIcon = $('.iconfont-treeholePost');
newFileIcon.on('click', function() {
  $('#fileToUpload').trigger('click');
  return false;
})

// 点击删除小图标的时候
function bindDeleteAction(node) {
  $(node).on('click', function(e) {
    $(this).parent('div').remove();
  })

}

// 提醒用户他的手机不支持上传图片
function showMessageFail(string) {
  console.log(string);
}

function showMessageSuccess(string) {
  console.error(string);
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
	var maxWidth = 100;
	var maxHeight = 100;

	var image = new Image();
	image.onload = function () {
    // var previewContainer = document.getElementById("previewAllPic");
    // var div = document.createElement('div');
    // div.appendChild(image);
    // previewContainer.appendChild(div);
		var width = image.width;
		var height = image.height;
    // console.log(width + "ahahh" + height);
		var shouldResize = (width > maxWidth) || (height > maxHeight);

    var canvas = document.createElement("canvas");

		if (!shouldResize) {
      var ctx =  canvas.getContext("2d");
      ctx.drawImage(this, 0, 0, width, height);
      var wrapper = document.createElement("div");
      var deleteIcon = document.createElement("i");
      deleteIcon.className = "iconfont-postDelete";
      deleteIcon.innerHTML = "&#xe607;"
      bindDeleteAction(deleteIcon);
      wrapper.appendChild(deleteIcon);
      wrapper.appaendChild(canvas);
      var previewContainer = document.getElementById("previewAllPic");
      previewContainer.appendChild(wrapper);

			// sendFile(dataURL);
			return;
		}


		var newWidth;
		var newHeight;

		if (width > height) {
			newHeight = height * (maxWidth / width);
			newWidth = maxWidth;
		} else {
      newWidth = width * (maxHeight / height);
			newHeight = maxHeight;
		}
		canvas.width = newWidth;
		canvas.height = newHeight;

		var context = canvas.getContext('2d');
    console.log(newHeight, newWidth);
		context.drawImage(this, 0, 0, newWidth, newHeight);
    var wrapper = document.createElement("div");
    var deleteIcon = document.createElement("i");
    deleteIcon.className = "iconfont-postDelete";
    deleteIcon.innerHTML = "&#xe607;"
    bindDeleteAction(deleteIcon);
    wrapper.appendChild(deleteIcon);
    wrapper.appendChild(canvas);
    var previewContainer = document.getElementById("previewAllPic");
    previewContainer.appendChild(wrapper);


		dataURL = canvas.toDataURL(fileType);
		// sendFile(dataURL);
	};


	image.onerror = function () {
		showMessageFail("处理出错，请重试");
	};

  image.src = dataURL;
}

//  上传文件
function sendFile(fileData) {
	var formData = new FormData();

	formData.append('imageData', fileData);

	$.ajax({
		type: 'POST',
		url: '/treehole/new',
		data: formData,
		contentType: false,
		processData: false,
		success: function (data) {
      console.log("上传成功");
			if (data.success) {
				showMessageSuccess("上传成功");
			} else {
				showMessageFail("上传出错, 请重试");
			}
		},
		error: function (data) {
				showMessageFail("上传出错, 请重试");
        console.log("这里错了");
		}
	});
}


// $("#fileToUpload").on("change", function(e) {
//   if($("#fileToUpload").val().length){
//     var fileName = $("#fileToUpload").val();
//     console.log(fileName);
//     var extension = fileName.substring(fileName.lastIndexOf("."), fileName.length).toLowerCase();
//     if (extension == ".jpg" || extension == ".png") {
//       console.log($("#fileToUpload").files);
//       var data = new FormData();
//       data.append("upload", $("#fileToUpload").files[0]);
//       $.ajax({
//         url: "/treehole/new",
//         type: "POST",
//         data: data,
//         cache: false,
//         contentType: false,
//         success: function(data) {
//           var displayUrl = data.displayUrl;
//           var imgPreview = $("<img />", {
//             src: displayUrl,
//             class: "imgPreview"
//           })
//           $(".previewAllPic").css("display", "block");
//           $(imgPreview).insertAfter('.previewAllPic > p');
//         },
//         error: function(xhr) {
//           console.log("上传失败");
//         }
//       })
//
//     }
//   }
// })
