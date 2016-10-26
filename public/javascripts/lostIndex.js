if (window.utils.getFromLocal('lost') == "found") {
  // alert('here');
  window.utils.removeFromLocal('lost');
  location.reload();
}
//  切换失物和招领
function gotoLost(){
  $('.gotoLost').on('click', function(e) {

    e.preventDefault();

    // 切换内容
    $('#lost').toggle(true);  //显示
    $('#found').toggle(false);   //隐藏

    //  切换当前标签
    $('.lost span').removeClass('active');  //删除active类
    $('.found span ').removeClass('active'); // 删除active类
    $('.lost span').addClass('active');  //添加active类

    // 激活第一个标签
    $('#lost .button').removeClass('active');
    $('#lost .button:first-child').addClass('active').trigger('click');
  });

}

function gotoFound(){
  $('.gotoFound').on('click', function(e) {

    e.preventDefault();

    // 切换内容
    $('#lost').toggle(false);  //显示
    $('#found').toggle(true);   //隐藏

    //  切换当前标签
    $('.lost span').removeClass('active');  //删除active类
    $('.found span').removeClass('active'); // 删除active类
    $('.found span').addClass('active');  //添加active类


    // 激活第一个标签
    $('#found .button').removeClass('active');
    $('#found .button:first-child').addClass('active').trigger('click');

  });

}
