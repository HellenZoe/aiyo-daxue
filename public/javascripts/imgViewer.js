var imgWrappers = $('.picsWrapper');
imgWrappers.forEach(function(item, index) {
  console.log(item, index);

  //  给每个图片容器都绑定一个点击大图预览事件
  var wrapper = $(item);
  wrapper.on('click', function(e) {
    //  默认事件
    e.preventDefault();

    //  拿到图片链接
    var urls = [];
    var images = $(this).children('img');
    images.forEach(function(item, index) {
      console.log($(item));
      urls.push($(item).attr('href'))
    })
    console.log(urls);
    var myPhotoBrowserStandalone = new $.photoBrowser({
      photo: urls
    })

    // 打开图片浏览器
    myPhotoBrowserStandalone.open();
  })
})
