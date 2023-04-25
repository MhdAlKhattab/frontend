$(document).ready(function () {

    'use strict';

    // On Modal submit Local Storge
    $('.withdraw-form').submit(function (e) {
        e.preventDefault();

       localStorage.setItem("withdraw-method", $(this).data('method'));
       localStorage.setItem("withdraw-amount", this.children[1].value);

        console.log(this.children[1].value);
        console.log($(this).data('method'));

        $(location).attr('href', 'withdraw-details.html');
    });   
});