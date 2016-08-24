$('.activity-card').on('click', function(e) {
  var pId = $(this).attr("data-pId");
  var host = location.host;
  location.href = "http://" + host + "/fun/detail/" + fId;
})
