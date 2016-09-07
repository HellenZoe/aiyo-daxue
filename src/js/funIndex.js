$('.item-block').on('click', function(e) {
  var fId = $(this).attr("data-fId");
  var host = location.host;
  location.href = "http://" + host + "/fun/detail/" + fId;
})

var imgs = $('.img-wrapper img');
imgs.each(function(index, item) {
  var i = $(item);
  if (!i.attr('src')) {
    i.parent().children('.no-img').css('display', 'block');
  }
})
