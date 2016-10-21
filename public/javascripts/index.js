$(function() {
    /*
     轮播图
     */
    $(".swiper-container").swiper({
        autoplay:2000
    });
    _checkUserInfo();
    _bindEvent();
    $.init();
});

//查看本地是有userInfo缓存,如果无，触发登陆弹框
var _checkUserInfo=function () {
    var _userInfo=window.utils.getFromLocal('userInfo');
    if (!_userInfo) {
        if(QC.Login.check()){
            QC.api("get_user_info")
                .success(function(s){
                    /*成功回调，通过s.data获取OpenAPI的返回数据
                     获取用户唯一的openId保存本地*/
                    QC.Login.getMe(function(openId){
                        var userInfo={
                            name:s.data.nickname,
                            openId:openId,
                            avatarUrl: s.data.figureurl_qq_1
                        };
                        window.utils.saveToLocal("userInfo", userInfo);
                        console.log('userInfo',JSON.stringify(userInfo));
                        var url = "http://" + location.host + "/user";
                        $.ajax({
                            type: "POST",
                            url: url,
                            dataType: "json",
                            contentType: "application/json",
                            data: JSON.stringify(userInfo),
                            success: function (data) {
                                console.log('save user success',data);
                            }
                        });
                    });
                    // 隐藏加载
                    $.hidePreloader();
                })
                //指定接口访问失败的接收函数，f为失败返回Response对象
                .error(function(f){
                    //失败回调
                    // showHint("获取信息失败,麻烦重新登陆", "fail");
                    console.log('login error:',f);
                })
                //指定接口完成请求后的接收函数，c为完成请求返回Response对象
                .complete(function(c){
                    //完成请求回调
                    console.log('login complete:',c);
                });
        }else{
            $.alert("登陆后才能浏览", "没有登陆", function() {
                QC.Login.showPopup({
                    appId: "101351420",
                    redirectURI: "http://s-289167.abc188.com/welcome"
                });
            });
        }
    }
};

/**
 * 添加栏目
 * @param data
 */
var addItems=function(data) {
    // 生成新条目的HTML
    var html = '';
    $.ecah(data,function(index,item) {
        html += '<li class="item-content">' +
            '<div class="item-inner">' +
            '<div class="activity-card prattle" data-pId=' + item._id + '>' +
            '<div class="card-content"><img src=' + item.backImgPath + '>' +
            '<div class="img-desc">' +
            '<span>' + item.title+ '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</li>';
    });
    // 添加新条目
    $('.infinite-scroll-bottom .list-container').append(html);
};
/**
 * 事件绑定
 * @private
 */
var _bindEvent=function () {
    $('.check').on('click', function() {
        var crtService = $(this).attr('href');
        window.utils.saveToLocal('crtService', crtService);
        //  查看是否已经有学校信息
        var _userInfo=window.utils.getFromLocal('userInfo')||{};
        if (!_userInfo.school) {
            location.href = "http://" + location.host + "/changeSchool";
            return false;
        }
        return true;
    });
    $('.more').on('click', function(e) {
        e.preventDefault();
        $.alert("功能正在完善中.敬请期待!");
    });
//  校园情话
    $('.activity-card').on('click', function() {
        console.log($(this));
        var pId = $(this).attr('data-pId');
        location.href = "http://" + location.host + "/article/prattle/" + pId;
    });
    $(document).on("pageInit", "#page-infinite-scroll-bottom", function(e, id, page) {
        var loading = false;    // 加载flag
        var maxItems = 50;  // 最多可加载的条目
        var itemsPerLoad = 5;   // 每次加载添加多少条目
        var lastIndex;
        $.ajax({
            url: "http://" + location.host + "/activity?lastIndex=0&num=" + itemsPerLoad,
            type: 'GET',
            dataType: "json",
            contentType: "application/json",
            success: function(json) {
                if (json.success) {
                    // 重置加载flag
                    loading = false;
                    // 添加新条目
                    addItems(json.data);
                    lastIndex = $('.list-container li').length;
                    console.log('init lastIndex',lastIndex);
                }
            }
        });
        lastIndex=5;    // 上次加载的序号
        console.log(lastIndex);
        /* 注册'infinite'事件处理函数*/
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
    });
};

