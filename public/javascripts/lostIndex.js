//  点击到详情页
$('.facebook-card').on('click', function(e) {
  var lId = $(this).attr("data-lId");
  var host = location.host;
  location.href = "http://" + host + "/lost/detail/" + lId;
})

//  切换失物和招领
$('.gotoLost').on('click', function(e) {

  e.preventDefault();

  $('#lost').toggle(true);  //显示
  $('#found').toggle(false);   //隐藏
  $('.lost span').removeClass('active');  //删除active类
  $('.found span ').removeClass('active'); // 删除active类
  $('.lost span').addClass('active');  //添加active类

});

$('.gotoFound').on('click', function(e) {

  e.preventDefault();

  $('#lost').toggle(false);  //显示
  $('#found').toggle(true);   //隐藏
  $('.find span').removeClass('active');  //删除active类
  $('.found span ').removeClass('active'); // 删除active类
  $('.found span').addClass('active');  //添加active类  

});
