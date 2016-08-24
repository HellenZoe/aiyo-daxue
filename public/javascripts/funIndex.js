$('.item-block').on('click', function(e) {
  var fId = $(this).attr("data-fId");
  var host = location.host;
  location.href = "http://" + host + "/fun/detail/" + fId;
})
