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
    var images = $(this).children('img');
    images.forEach(function(item, index) {
      console.log($(item));
      urls.push($(item).attr('src'))
    })
    console.log(urls);
    var myPhotoBrowserStandalone = $.photoBrowser({
      photos: urls
    })

    // 打开图片浏览器
    myPhotoBrowserStandalone.open();

    // myPhotoBrowserStandalone.attachEvents(true);
    // if (myPhotoBrowserStandalone.params.type === 'standalone') {
    //   pb.container.removeClass('photo-browser-in').addClass('photo-browser-out').transitionEnd(function () {
    //   pb.container.removeClass('photo-browser-in').addClass('photo-browser-out').animationEnd(function () { pb.container.remove(); });
    // }
  })
})
