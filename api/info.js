$(document).ready(function () {

    getAllItems();
    getDepositItems();

    //////////// Start Get All
    function getAllItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/info',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
            dataType: 'json',
            success: function (data) {
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

    //////////// Start Table
    $('#depositHistory').click(function (e) {
        e.preventDefault();
        getDepositItems();
    });

    $('#withdrawHistory').click(function (e) {
        e.preventDefault();
        getWithdrawItems();
    });



    //  Start Get Deposit
    function getDepositItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-panel-deposits',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
            dataType: 'json',
            success: function (data) {
            },
            error: function () {
            },
        }).done(function (items) {
            let output = `
                <tr style="background-color: black;">
                    <th>Name</th>
                    <th>Date</th>
                    <th>Quantity</th>
                    <th>Way</th>
                </tr>
            `;

            if (items.data.length !== 0) {

                $.each(items.data, function (key, item) {

                    output += `
                        <tr>
                            <td><h5>${item.user.first_name} ${item.user.last_name}</h5></td>
                            <td><h5>${item.created_at.substring(0,10)}</h5></td>
                            <td><h5>${item.amount}$</h5></td>
                            <td><h5>${item.method}</h5></td>
                        </tr>
                    `;

                });
                $('#controlPanel').empty().append(output);

            } else {

                $('#controlPanel').parent().append(`<div class="nodata">There Is No Data.</div>`);
            }

        });
    }
    //  End Get Deposit

    //  Start Get Withdraw
    function getWithdrawItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-panel-withdraws',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
            dataType: 'json',
            success: function (data) {
            },
            error: function () {
            },
        }).done(function (items) {
            let output = `
                <tr style="background-color: black;">
                    <th>Name</th>
                    <th>Date</th>
                    <th>Quantity</th>
                    <th>Way</th>
                </tr>
            `;

            if (items.data.length !== 0) {

                $.each(items.data, function (key, item) {

                    output += `
                        <tr>
                            <td><h5>${item.user.first_name} ${item.user.last_name}</h5></td>
                            <td><h5>${item.created_at.substring(0,10)}</h5></td>
                            <td><h5>${item.amount}$</h5></td>
                            <td><h5>${item.method}</h5></td>
                        </tr>
                    `;

                });
                $('#controlPanel').empty().append(output);

            } else {

                $('#controlPanel').parent().append(`<div class="nodata">There Is No Data.</div>`);
            }

        });
    }
    //  End Get Withdraw

    //////////// Start Table


});