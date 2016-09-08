$.init();

//  slider初始化
$(function() {
  $(".swiper-container").swiper({
    autoplay: 2000,
  })
})

// 点击详情页
$('.item-block').on('click', function(e) {
  var fId = $(this).attr("data-fId");
var host = location.host;
  location.href = "http://" + host + "/fun/detail/" + fId;
})

// 如果用户没有发布图片显示提示
var imgs = $('.img-wrapper img');
imgs.each(function(index, item) {
  var i = $(item);
  if (!i.attr('src')) {
    i.parent().children('.no-img').css('display', 'block');
  }
})
