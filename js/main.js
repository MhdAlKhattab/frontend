$(document).ready(function () {
    var scrollButton = $("#scroll-top");
    buyButton = $('#buy')
    //////Show The Scroll Top When I Down

    $(window).scroll(function () {

        if ($(this).scrollTop() >= 500) {

            scrollButton.show();

        } else {

            scrollButton.hide();
        }
    });
        ///////Click on Scroll Top To Move Up
        scrollButton.click(function () {

            $("html,body").animate({ scrollTop: 0 }, 2000);
    
        });
        $('#about-us').click(function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active')
            $("html , body").animate({
                scrollTop: $('.about-us').offset().top 
            }, 2000);
    
        });
        $('#plans').click(function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active')
            $("html , body").animate({
                scrollTop: $('.plans').offset().top 
            }, 2000);
    
        });
        $('#notes').click(function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active')
            $("html , body").animate({
                scrollTop: $('.notes').offset().top 
            }, 2000);
    
        });
});



