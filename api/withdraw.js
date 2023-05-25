$(document).ready(function () {

    getWithdrawState();

    // Get Withdraw State
    function getWithdrawState(){
        $.ajax({
            url: "http://127.0.0.1:8000/api/get-withdraw-state",
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
            dataType: "json",
            success: function (data) {
                console.log(data.data);

                if(data.data == 0){
                    $('#cards').empty().append('<div class="col-12 youcanot">Sorry, You Can Not Withdraw Now !</div>');
                }
            },
            error: function () {
                console.log("Error");
            }
        });
    }

    // Start Add Withdraw
    $('body').on('submit', '#withdrawForm', function (e) {
        e.preventDefault();

        var data = new FormData(this);
        data.append('method', localStorage.getItem('withdraw-method'));
        data.append('amount', localStorage.getItem('withdraw-amount'));

        $.ajax({
            url: "http://127.0.0.1:8000/api/add-withdraw",
            type: "POST",
            headers: {"Authorization": "Bearer " + localStorage.getItem('access_token') },
            data: data,
            dataType: "json",
            processData: false,
            contentType: false,
            success: function (data) {
                localStorage.removeItem('withdraw-method');
                localStorage.removeItem('withdraw-amount');

                $(location).attr('href', 'control.html');
            },
            error: function (error) {
                output = '';
                if (error.responseJSON.errors) {
                    for (var er in error.responseJSON.errors) {
                        output += `
                            ${error.responseJSON.errors[er][0]}
                            <br>
                        `;
                    }
                }else{
                    output = error.responseJSON.data;
                }

                $('.error-message').empty().append('<span class="badge badge-danger">' + output + '</span>');
            }
        });
    });
    // End Add other Withdraw
    $('body').on('submit', '#withdrawOtherForm', function (e) {
        e.preventDefault();

        $.ajax({
            url: "http://127.0.0.1:8000/api/add-withdraw",
            type: "POST",
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
            data: $("#withdrawOtherForm").serialize(),
            dataType: "json",
            success: function (data) {

                $(location).attr('href', 'control.html');
            },
            error: function (error) {
                output = '';
                if (error.responseJSON.errors) {
                    for (var er in error.responseJSON.errors) {
                        output += `
                            ${error.responseJSON.errors[er][0]}
                            <br>
                        `;
                    }
                }else{
                    output = error.responseJSON.data;
                }

                $('.error-message').empty().append('<span class="badge badge-danger">' + output + '</span>');
            }
        });
    });
});