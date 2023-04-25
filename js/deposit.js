$(document).ready(function () {

    'use strict';

    // On Modal submit Local Storge
    $('.deposit-form').submit(function (e) {
        e.preventDefault();

       localStorage.setItem("deposit-amount", this.children[1].value);
       localStorage.setItem("deposit-method", $(this).data('method'));

        console.log(this.children[1].value);
        console.log($(this).data('method'));

        $(location).attr('href', 'deposit-details.html');
    });   
});