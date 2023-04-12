$(document).ready(function () {

    'use strict';

    $('.center').fadeOut(2000);


    var scrollButton = $("#scroll-top");


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

    // Input File To Show An Image I Chosse It
    const input = document.getElementById('image_uploads');
    const preview = document.querySelector('.preview');

    // input.addEventListener('change', updateImageDisplay);
    function updateImageDisplay() {
        while (preview.firstChild) {
            preview.removeChild(preview.firstChild);
        }
        const curFiles = input.files;
        if (curFiles.length === 0) {
        } else {
            const list = document.createElement('p');
            preview.appendChild(list);

            for (const file of curFiles) {
                if (validFileType(file)) {
                    const image = document.createElement('img');
                    image.src = URL.createObjectURL(file);

                    list.appendChild(image);
                }
            }
        }
    }
    const fileTypes = [
        "image/apng",
        "image/bmp",
        "image/gif",
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/svg+xml",
        "image/tiff",
        "image/webp",
        "image/x-icon"
    ];
    function validFileType(file) {
        return fileTypes.includes(file.type);
    }

    // On Modal submit
    $('.deposit-form').submit(function (e) {
        e.preventDefault();

        console.log(this.serialize());
        $(location).attr('href', 'deposit-details.html');
    });

});
