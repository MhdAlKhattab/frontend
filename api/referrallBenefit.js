
$(document).ready(function () {

    getAllUsersBenfit();

    function getAllUsersBenfit() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-user-benfit-referrals',
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
                        <th>Email</th>
                        <th>Benefit</th>
                        <th>Date</th>
                    </tr>
                `;

            if (items.data.length !== 0) {

                $.each(items.data, function (key, item) {

                    output += `
                            <tr>
                                <td><h5>${item.first_name} ${item.last_name}</h5></td>
                                <td><h5>${item.email}</h5></td>
                                <td><h5>${item.benefit}</h5></td>
                                <td><h5>${item.updated_at.substring(0, 10)}</h5></td>
                            </tr>
                        `;

                });
                $('#benfit-ref').empty().append(output);

            } else {
                $('.lodding').remove();

                $('.nodata').remove();

                $('#benfit-ref').parent().append(`<div class="nodata">There Is No Data.</div>`);
            }

        });
    }

    // End AllUsersBenfit

});