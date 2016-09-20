$(function() {
  $(".swiper-container").swiper({
    autoplay: 2000
  })
})


$.init();



if (!window.utils.getFromLocal('userInfo')) {
  $.alert("登陆之后才能浏览", "没有登陆", function() {
    window.utils.saveToLocal('crt-service', '/');
    location.href = "http://" + location.host + "/signin";
  });
}


$('more').on('click', function(e) {
  e.preventDefault();

  $.alert("功能正在完善中.敬请期待!")
})
