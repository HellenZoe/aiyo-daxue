// $('.headers').on('click', function(e) {
//   var pId = $(this).attr("data-pId");
//   var host = location.host;
//   location.href = "http://" + host + "/play/detail/" + pId;
// })

// 点击头部和内容都跳到详情页
var fucks = $(".fuck-content");
var headers = $(".card-header");

fucks.forEach(function(item, index) {
  console.log(item, index);
  var t = $(item);
  t.on('click', function(e) {
      var cardId = $(this).parent().attr('data-pId');
      var host = location.host;
      location.href = "http://" + host + "/play/detail/" + cardId;
  })
});
headers.forEach(function(item, index) {
  console.log(item, index);
  var t = $(item);
  t.on('click', function(e) {
      var cardId = $(this).parent().attr('data-pId');
      var host = location.host;
      location.href = "http://" + host + "/play/detail/" + cardId;
  })
});
