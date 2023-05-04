$(document).ready(function () {

    // Start Add Withdraw
    $('body').on('submit', '#withdrawForm', function (e) {
        e.preventDefault();

        var data = new FormData(this);
        data.append('method', localStorage.getItem('withdraw-method'));
        data.append('amount', localStorage.getItem('withdraw-amount'));

        $.ajax({
            url: "http://127.0.0.1:8000/api/add-withdraw",
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
    // End Add Withdraw
});