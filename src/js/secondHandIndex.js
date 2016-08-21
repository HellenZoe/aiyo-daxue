$('.facebook-card').on('click', function(e) {
  var vid = $(this).attr("data-vId");
  var host = location.host;
  location.href = "http://" + host + "/secondHand/detail/" + vid;
})
