(function ($) {
    //1.外观模式扩展
    $.extend($.easing, tween);

    //2.
    var nav = $('.nav');
    var line = $('.line');
    var mLeft = nav.offset().left;


    //1.获取URl地址
    var url = location.href;
    //通过字符串截取，最后一个/出现的位置就是开始的位置
    url = url.substr(url.lastIndexOf('/') + 1);
    //根据URL地址匹配指定的URL连接
    var li = nav.find('a[href="' + url + '"]').parent();

    //设置线条默认到li的位置，并且宽和li一致
    line.css({left: li.offset().left - mLeft, width: li.width()});


    //设置导航移入移出事件
    nav.children('li').hover(function () {
        //获取当前元素的宽度和left值
        var cursor = $(this);
        var width = cursor.width();
        var left = cursor.offset().left;

        //如果使用的运动方式第二个参数是json数据
        line.stop().animate({width: width, left: left - mLeft}, {
            easing: 'back_easeInOut',
            duration: 2000
        });

    }, function () {
        line.stop().animate({
            left: li.offset().left - mLeft,
            width: li.width()
        }, {easing: 'bounce_easeInOut', duration: 2000});
    });


})(jQuery);