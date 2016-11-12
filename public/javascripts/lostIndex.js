(function ($) {
    $.lostIndex=function () {
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
            $lostContainer=$('#lost');
            $foundContainer=$('#found');
        };
        var _bindEvent=function () {
            $('.create-actions').on('click', function () {
                var buttons1 = [
                    {
                        text: '请选择',
                        label: true
                    },
                    {
                        text: '失物',
                        onClick: function() {
                            $('#menu_item').html('失物');
                            $lostContainer.show();
                            $foundContainer.hide();
                            $lostContainer.find('.button').removeClass('active');
                            $lostContainer.find('.button').eq(0)
                                .addClass('active')
                                .click();
                            $('.title').html('失物');
                        }
                    },
                    {
                        text: '招领',
                        onClick: function() {
                            $('#menu_item').html('招领');
                            $lostContainer.hide();
                            $foundContainer.show();
                            $foundContainer.find('.button').removeClass('active');
                            $foundContainer.find('.button').eq(0)
                                .addClass('active')
                                .click();
                            $('.title').html('招领');
                        }
                    }
                ];
                var buttons2 = [
                    {
                        text: '取消',
                        bg: 'danger'
                    }
                ];
                var groups = [buttons1,buttons2];
                $.actions(groups);
            });
        }

    }
})(Zepto);
$(function () {
    var lostIndex=new $.lostIndex();
    lostIndex.init();

    $.init();
});
