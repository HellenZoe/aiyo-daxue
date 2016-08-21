if (window.utils) {
  window.utils.saveToLocal('crt-service', "treehole");
}


var allCard = $('.topic-block');
allCard.forEach(function(item, index) {
  var crtUserId = window.utils.getFromLocal('userInfo')._id;
  item = $(item);
  var favId  = item.attr('data-favId');
  console.log(favId);
  if (favId.contains(crtUserId)) {
    item.children('.topic-card-footer').children('#enjoy').children('.iconfont-nullEnjoy').css('display', 'none')
    item.children('.topic-card-footer').children('#enjoy').children('.iconfont-selfEnjoy').css('display', 'inline')
  }
})
