$(document).ready(function () {

    'use strict';

    $('.center').fadeOut(2000);
    
    ///Show The Scroll Top And Hide It
    var scrollButton = $("#scroll-top");

     //Calculater 
    var inputcal = document.getElementById('inputcal'),
        resultcal =document.getElementById('resultcal'),
        selectcal = document.getElementById('selectcal');

    selectcal.onchange = function(){
        'use strict';
        resultcal.value = inputcal.value * selectcal.value;
    }

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

    ///////Click on NavBar And Go To The Correct Place
    $('#home').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active')
        $("html , body").animate({
            scrollTop: $('.home').offset().top
        }, 2000);

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
