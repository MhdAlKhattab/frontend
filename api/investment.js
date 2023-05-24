$(document).ready(function () {

    getInvestState();

    // Get Invest State
    function getInvestState(){
        $.ajax({
            url: "http://127.0.0.1:8000/api/get-invest-state",
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
            dataType: "json",
            success: function (data) {
                console.log(data.data);

                if(data.data == 0){
                    $('#cards').empty().append('<div class="col-12 youcanot">Sorry, You Can Not Invest Now !</div>');
                }
            },
            error: function () {
                console.log("Error");
            }
        });
    }

    // Start Add Investment
    $('body').on('submit', '.investment-form', function (e) {
        e.preventDefault();

        var minVal = $(this).data('min');
        var maxVal = $(this).data('max');
        var amount = parseInt(this.children[7].value);

        if (amount < minVal || amount > maxVal){
            $('.error-message').empty().append('<span class="badge badge-danger">The Amount Must Be Between ' + minVal + '-' + maxVal + '.</span>');

        }else {
            $.ajax({
                url: "http://127.0.0.1:8000/api/add-investment",
                type: "POST",
                headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
                data: $(this).serialize(),
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
        }

        
    });
    // End Add Investment
});