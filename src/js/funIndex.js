$('.item-block').on('click', function(e) {
  var fId = $(this).attr("data-fId");
  var host = location.host;
  location.href = "http://" + host + "/fun/detail/" + fId;
})

var imgs = $('.no-img');
imgs.each(function(item, index) {
  var i = $(item);
  if (!i.attr('src')) {
    i.parent().children('no-img').css('display', 'inline-block');
  }
})
