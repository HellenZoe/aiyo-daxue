$(function() {
  $(".swiper-container").swiper({
    autoplay: 2000
  })
})






if (!window.utils.getFromLocal('userInfo')) {
  alert(window.utils.getFromLocal('userInfo'));
  $.alert("登陆之后才能浏览", "没有登陆", function() {
    window.utils.saveToLocal('crt-service', '/');
    location.href = "http://" + location.host + "/signin";
  });
}


$('.more').on('click', function(e) {
  e.preventDefault();

  $.alert("功能正在完善中.敬请期待!")
})


//  校园情话
$('.activity-card').on('click', function(e) {
  console.log($(this));
  var pId = $(this).attr('data-pId');
  var url = "http://" + location.host + "/article/prattle/" + pId;
  location.href=url;
})


$(document).on("pageInit", "#page-infinite-scroll-bottom", function(e, id, page) {
  // body...
// 加载flag
var loading = false;
// 最多可加载的条目
var maxItems = 50;

// 每次加载添加多少条目
var itemsPerLoad = 5;

function addItems(data) {
        // 生成新条目的HTML
        var html = '';
        var length = data.length;
        data.forEach(function(item, index) {
          html += '<li class="item-content"><div class="item-inner"><div class="activity-card prattle" data-pId=' + item._id + '><div class="card-content"><img src=' + item.backImgPath + '><div class="img-desc"><span>' + item.title+ '</span></div></div></div></div></li>';
        })

        // 添加新条目
        $('.infinite-scroll-bottom .list-container').append(html);

}


$.ajax({
  url: "http://" + location.host + "/activity?lastIndex=0&num=" + itemsPerLoad,
	type: 'GET',
  dataType: "json",
	contentType: "application/json",
	processData: false,
  success: function(data) {
    if (data.success) {
      // 重置加载flag
      loading = false;


      // 添加新条目
      addItems(data.data);
      // // 加载完毕，则注销无限加载事件，以防不必要的加载
      // $.detachInfiniteScroll($('.infinite-scroll'));
      // // 删除加载提示符
      // $('.infinite-scroll-preloader').remove();


      // 更新最后加载的序号
      lastIndex = $('.list-container li').length;
      //容器发生改变,如果是js滚动，需要刷新滚动
      console.log(lastIndex);
      // $.refreshScroller();

    }
  }
})


// 上次加载的序号

var lastIndex = 5;


console.log(lastIndex);
// 注册'infinite'事件处理函数
$(page).on('infinite', function() {

    console.log(loading);
    // 如果正在加载，则退出
    if (loading) return;

    // 设置flag
    loading = true;
    $.ajax({
      url: "http://" + location.host + "/activity?lastIndex=" + lastIndex + "&num=" + itemsPerLoad,
  		type: 'GET',
      dataType: "json",
			contentType: "application/json",
  		processData: false,
      success: function(data) {
        if (data.success) {
          // 重置加载flag
          loading = false;


          // 添加新条目
          addItems(data.data);
          if (lastIndex >= maxItems || data.data.length < itemsPerLoad) {
              // 加载完毕，则注销无限加载事件，以防不必要的加载
              $.detachInfiniteScroll($('.infinite-scroll'));
              // 删除加载提示符
              $('.infinite-scroll-preloader').remove();
              $.toast("没有更多数据了");
              return;
          }

          // 更新最后加载的序号
          lastIndex = $('.list-container li').length;
          //容器发生改变,如果是js滚动，需要刷新滚动
          $.refreshScroller();

        }
      }
    })
});

})


$.init();
