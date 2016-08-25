$.init();

if (!window.utils.getFromLocal('userInfo')) {
  $.alert("没有登录", "登陆之后才能浏览", function() {
    location.href = "http://" + location.host + "/signin";
  });
}
$(function() {
  $(".swiper-container").swiper({
    autoplay: 2000,
    spaceBetween: 15
  })
})
