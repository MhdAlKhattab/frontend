$(document).ready(function () {

    // Start Add Deposit
    $('body').on('submit', '#depositForm', function(e){
        e.preventDefault();

        var data = new FormData(this);
        data.append('method', localStorage.getItem('deposit-method'));
        data.append('amount', localStorage.getItem('deposit-amount'));

        $.ajax({
            url: "http://127.0.0.1:8000/api/add-deposit",
            type: "POST",
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
            data: data,
            dataType: "json",
            processData: false,
            contentType: false,
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
    // End Add Deposit
});