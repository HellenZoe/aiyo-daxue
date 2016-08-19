//   点击图片的时候  跳转到相应的详情页去
$('.facebook-card').on('click', function(e) {
  var cardId = $(this).attr('data-tId');
  var host = location.host;
  location.href = "http://" + host + "/treehole/detail/" + cardId;
})
