$('.item-block').on('click', function(e) {
  var sId = $(this).attr("data-sId");
  var host = location.host;
  location.href = "http://" + host + "/trade/detail/" + sId;
})
