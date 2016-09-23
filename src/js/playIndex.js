// $('.headers').on('click', function(e) {
//   var pId = $(this).attr("data-pId");
//   var host = location.host;
//   location.href = "http://" + host + "/play/detail/" + pId;
// })

// 点击头部和内容都跳到详情页
  //   点击图片的时候  跳转到相应的详情页去
$('.facebook-card').on('click', function(e) {
  console.log(this);
  var pid = $(this).attr("data-pId");
  var host = location.host;
  location.href = "http://" + host + "/play/detail/" + pid;
})
