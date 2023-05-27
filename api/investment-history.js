$(document).ready(function () {

    getInvestmentItems();

    // Start Get Investment
    function getInvestmentItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-user-investments',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
            dataType: 'json',
            success: function (data) {
            },
            error: function () {
            },
        }).done(function (items) {
            var maxVal = 0;
            var nowVal = 0;
            var state = '';

            let output = `
                <tr style="background-color: black;">
                    <th>Plan</th>
                    <th>Return</th>
                    <th>Receved</th>
                    <th>State</th>
                    <th>Next Payment</th>
                </tr>
            `;

            if (items.data.length !== 0) {

                $.each(items.data, function (key, item) {

                    if (item.state == 0) {
                        state = `<span class="Panding">Pending</span>`;
                    } else if (item.state == 1) {
                        state = `<span class="Progress">In Progress</span>`;
                    } else if (item.state == 2) {
                        state = `<span class="Canceled">Canceled</span>`;
                    } else {
                        state = `<span class="Complete">Complete</span>`;
                    }

                    if (item.return_period == 'week') {
                        maxVal = 604800;
                    } else if (item.return_period == 'month') {
                        maxVal = 2628288;
                    } else if (item.return_period == '6 month') {
                        maxVal = 15778463;
                    } else if (item.return_period == 'year') {
                        maxVal = 31536000;
                    }

                    nowVal = (item.spending_time / maxVal) * 100;

                    output += `
                        <tr>
                            <td>
                                <p>${item.plan_name}</p>
                                <p>${item.amount}$</p>
                            </td>
                            <td>
                                <p>${item.return_amount}$ Every ${item.return_period}</p>
                                <p>For ${item.total_returned} ${item.return_period}</p>
                            </td>

                            <td><span>${item.number_returned}$ x ${item.return_amount} = ${item.number_returned * item.return_amount}$</span></td>
                            <td>${state}</td>
                            <td class="nextPayment">
                                <span>0d: 0h: 0m: 0s</span>
                                <div class="progress">
                                    <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"
                                        data-valuenow="${item.spending_time}" data-valuemin="0" data-valuemax="${maxVal}" data-state="${item.state}" style="width:${nowVal}%">
                                    </div>
                                </div>
                            </td>
                        </tr>
                    `;
                });
                $('#investmentTable').empty().append(output);

                checkProgress();
            } else {

                $('.lodding').remove();

                $('.nodata').remove();
                
                $('#investmentTable').parent().append(`<div class="nodata">There Is No Data.</div>`);
            }
        });
    }
    // End Get Investment

    // Check Progress
    function checkProgress() {
        var elements = $('.nextPayment');
        var nowVal = 0;
        var maxVal = 0;
        var state = 0;
        var progressWidth = 0;

        var interval = setInterval(function () {

            $.each(elements, function (key, element) {
                nowVal = parseInt(element.children[1].children[0].getAttribute('data-valuenow'));
                maxVal = parseInt(element.children[1].children[0].getAttribute('data-valuemax'));
                state = parseInt(element.children[1].children[0].getAttribute('data-state'));

                if (state == 1 && nowVal < maxVal) {
                // if(nowVal < maxVal){
                    nowVal += 1;
                    element.children[1].children[0].setAttribute('data-valuenow', nowVal);
                    progressWidth = (nowVal / maxVal) * 100;
                    element.children[1].children[0].style.width = progressWidth + '%';

                    changeDate(element.children[0], nowVal);
                }
            });
        }, 1000);
    }

    // Change Date Of NextPayment
    function changeDate(element, nowVal) {

        // calculate (and subtract) whole days
        var days = Math.floor(nowVal / 86400);
        nowVal -= days * 86400;

        // calculate (and subtract) whole hours
        var hours = Math.floor(nowVal / 3600) % 24;
        nowVal -= hours * 3600;

        // calculate (and subtract) whole minutes
        var minutes = Math.floor(nowVal / 60) % 60;
        nowVal -= minutes * 60;

        // what's left is seconds
        var seconds = nowVal % 60;

        // console.log("Day:", days);
        // console.log("Hours:", hours);
        // console.log("Minutes:", minutes);
        // console.log("Seconds:", seconds);

        element.textContent = days + 'd: ' + hours + 'h: ' + minutes + 'm: ' + seconds + 's';
    }
});