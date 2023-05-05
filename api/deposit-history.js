$(document).ready(function () {

    getDepositItems();

    // Start Get Deposit
    function getDepositItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-user-deposits',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
            dataType: 'json',
            success: function (data) {
            },
            error: function () {
            },
        }).done(function (items) {
            let output = `
                <tr style="background-color: black;">
                    <th>Transaction ID</th>
                    <th>Gateway</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Time</th>
                    <th>More</th>
                </tr>
            `;

            var modals = '';
            var state = '';

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
                                <h5>${item.proccess_id}</h5>
                            </td>
                            <td>
                                <h5>${item.method}</h5>
                            </td>
                            <td>
                                <h5>${item.amount} USD</h5>
                            </td>
                            <td>${state}</td>
                            <td>
                                <h5>${item.created_at.substring(0, 10)} ${item.created_at.substring(11, 19)}</h5>
                            </td>
                            <td>
                                <i class="fa fa-list fa-lg" class="btn" type="button" class="btn btn-primary"
                                    data-toggle="modal" data-target=".modal${item.id}"></i>
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
                $('#depositTable').empty().append(output);
                $('body').append(modals);

            } else {

                $('.lodding').remove();

                $('.nodata').remove();
                
                $('#depositTable').parent().append(`<div class="nodata">There Is No Data.</div>`);
            }

        });
    }
    // End Get Deposit
});