$('.facebook-card').on('click', function(e) {
  var lId = $(this).attr("data-lId");
  var host = location.host;
  location.href = "http://" + host + "/lost/detail/" + lId;
})
