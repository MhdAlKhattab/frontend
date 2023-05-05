$(document).ready(function () {

    getWithdrawItems();

    // Start Get Withdraw
    function getWithdrawItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-user-withdraws',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
            dataType: 'json',
            success: function (data) {
            },
            error: function () {
            },
        }).done(function (items) {
            let output = `
                <tr style="background-color: black;">
                    <th>Amount</th>
                    <th>Rate</th>
                    <th>Charge</th>
                    <th>Recervable</th>
                    <th>Status</th>
                    <th>More</th>
                </tr>
            `;
            
            var state = '';
            var modals = '';

            if (items.data.length !== 0) {

                $.each(items.data, function (key, item) {

                    if(item.state == 0){
                        state = `<span class="Panding">Panding</span>`;
                    }else if(item.state == 1){
                        state = `<span class="Complete">Complete</span>`;
                    }else{
                        state = `<span class="Canceled">Canceled</span>`;
                    }

                    output += `
                        <tr>
                            <td>
                                <p>${item.amount} USD</p>
                                <p>Via ${item.method}</p>
                            </td>
                            <td>
                                <p>1 USD = 1 USD</p>
                                <p>${item.amount} USD = ${item.amount} USD</p>
                            </td>
                            <td>
                                <p>${item.charge} USD</p>
                            </td>
                            <td><span>${item.receivable} USD</span></td>
                            <td>
                                ${state}
                            </td>
                            <td><i class="fa fa-list fa-lg" class="btn" type="button" class="btn btn-primary"
                                    data-toggle="modal" data-target=".modal${item.id}"></i></td>
                            </td>
                        </tr>
                    `;

                    modals += `
                    <div class="modal fade modal${item.id}" id="modal${item.id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <h4>More Information:</h4>
                                <div class="modal-body">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                            aria-hidden="true">&times;</span></button>
                                    <div class="row">
                                        <div class="col-sm-12 text-center col-xs-height">
                                            <div class="signup-popup deposit-form">
                                                <p>${item.message}</p>
                                                <div class="modal-footer">
                                                    <button class="btn btn-danger button delete" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;

                });
                $('#withdrawTable').empty().append(output);
                $('body').append(modals);

            } else {

                $('#withdrawTable').parent().append(`<div class="nodata">There Is No Data.</div>`);
            }

        });
    }
    // End Get Withdraw
});