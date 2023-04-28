$(document).ready(function () {

    getAllItems();    
    
    //////////// Start Get All
    function getAllItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/info',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $('#deposit-wallet').empty().append(data.data.Deposit_balance + ' $');
                $('#interest-wallet').empty().append(data.data.interest_balance + ' $');
                $('#total-invest').empty().append(data.data.total_invest + ' $');
                $('#total-deposit').empty().append(data.data.total_deposit + ' $');
                $('#total-withdraw').empty().append(data.data.total_withdraw + ' $');
                $('#referral').empty().append(data.data.referral_earning + ' $');
            },
            error: function () {
            },
        });
    }
    //////////// End Get All

});