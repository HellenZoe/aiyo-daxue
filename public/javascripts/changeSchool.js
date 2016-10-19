$(function() {

    var userInfo = {
        school: ""
    };

    $('.done').on('click', function(e) {

        var _school = $('.school div').html();
        if (!_school) {
            $.toast("还没有填写学校哦~");
            return;
        }

        userInfo.school  = _school;

        //  显示进度图标
        $.showPreloader();
        sendInfo(userInfo);

    });
    //  发送用户信息
    var sendInfo = function(info) {
        var url = "http://" + location.host + "/self";
        $.ajax({
            type: 'POST',
            url: url,
            dataType: "json",
            data: JSON.stringify(info),
            contentType: "application/json",
            success: function (data) {
                console.log(data);
                $.hidePreloader();
                var nowUserInfo = window.utils.getFromLocal('userInfo')||{};
                nowUserInfo.school = info.school;
                window.utils.saveToLocal('userInfo', nowUserInfo);
                console.log("学校切换成功");
                var crtService = window.utils.getFromLocal('crtService');
                location.href="http://" + location.host + crtService;
            }
        });
    };

    $('.school div').on('click', function(e) {
        //  清除
        $('#school_list').empty();
        $.showPreloader();
        $('#selectSchool').show();
        var url = "http://" + location.host + "/school";
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success:function (json) {
                if(json.success){
                    $.hidePreloader();
                    var _strHtml='<ul id="school_list"></ul>';
                    $('#schoolListContainer').append(_strHtml);
                    $.each(json.data,function (index, item) {
                        var _liHtml='<li class="school_item">' +item.name+ '</li>';
                        $('#school_list').append(_liHtml);
                    });
                    $('.school_item').on('click',function () {
                        var schoolName = $(this).html();
                        $('.school div').html(schoolName)
                            .removeClass('c_gray');
                        $('#selectSchool').hide();
                    })

                }
            }
        });
    })
});
