
$(document).ready(function () {

    getAllUsersRefferal();

        //  Start Get All Users Referral
        function getAllUsersRefferal() {
            $.ajax({
                url: 'http://127.0.0.1:8000/api/get-user-referrals',
                headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
                dataType: 'json',
                success: function (data) {
                },
                error: function () {
                },
            }).done(function (items) {
                let output = '';
    
                if (items.data.length !== 0) {
    
                    $.each(items.data, function (key, item) {
    
                        output += `
                        <div class="user">
                            <i class="fa fa-user"></i>
                            <h2>${item.first_name} ${item.last_name}</h2>
                            <td><h5>${item.email}</h5></td>
                            <h3>${item.created_at.substring(0,10)}</h3>
                         </div>
                        `;
    
                    });
                    $('#user-ref').empty().append(output);
    
                } else {
                    $('.lodding').remove();
    
                    $('.nodata').remove();
    
                    $('#user-ref').parent().append(`<div class="nodata">There Is No Data.</div>`);
                }
    
            });
        }
        //  End Get All Users Referral

});