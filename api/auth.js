$(document).ready(function () {
    
    // Sign Up
    $("#signForm").submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: "http://127.0.0.1:8000/api/register",
            type: "POST",
            data: $("#signForm").serialize(),
            dataType: 'JSON',
            success: function (data) {
                console.log(data);
                localStorage.setItem('access_token', data.access_token);
                console.log(localStorage.getItem('access_token'));
                $(location).attr('href', 'control.html');
            },
            error: function () {
                $('.error-message').empty().append('<span class="badge badge-danger">You Have Some Errors in Your Information</span>');
            }
        });
    });

    // Login
    $("#loginForm").submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: "http://127.0.0.1:8000/api/login",
            type: "POST",
            data: $("#loginForm").serialize(),
            dataType: 'JSON',
            success: function (data) {
                localStorage.setItem('access_token', data.access_token);
                console.log(localStorage.getItem('access_token'));
                $(location).attr('href', 'control.html');
            },
            error: function () {
                $('.error-message').empty().append('<span class="badge badge-danger">You Have Some Errors in Your Information</span>');
            }
        });
    });
});