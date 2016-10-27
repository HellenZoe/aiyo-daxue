(function ($) {
    $.lostIndex=function () {
        var $lostSpan;
        var $foundSpan;
        var $lostContainer;
        var $foundContainer;
        this.init=function () {
            if (window.utils.getFromLocal('lost') == "found") {
                window.utils.removeFromLocal('lost');
                location.reload();
            }
            _domInit();
            _bindEvent();
        };
        var _domInit=function () {
            $lostSpan=$('.lost span');
            $foundSpan=$('.found span');
            $lostContainer=$('#lost');
            $foundContainer=$('#found');
        };
        var _bindEvent=function () {
            $('.lost').on('click',function () {
                $lostContainer.show();
                $foundContainer.hide();
                $foundSpan.removeClass('active');
                $lostSpan.removeClass('active').addClass('active');
                $lostContainer.find('.button').removeClass('active');
                $lostContainer.find('.button').eq(0)
                    .addClass('active')
                    .click();

            });
            $('.found').on('click',function () {
                $lostContainer.hide();
                $foundContainer.show();
                $foundSpan.removeClass('active').addClass('active');
                $lostSpan.removeClass('active');
                $foundContainer.find('.button').removeClass('active');
                $foundContainer.find('.button').eq(0)
                    .addClass('active')
                    .click();
            })
        }

    }
})(Zepto);
$(function () {
    var lostIndex=new $.lostIndex();
    lostIndex.init();
    $.init();
});
