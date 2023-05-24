$(document).ready(function () {

    'use strict';

    // Input File To Show An Image I Chosse It
    const input = document.getElementById('image_uploads');
    const preview = document.querySelector('.preview');

    input.addEventListener('change', updateImageDisplay);
    function updateImageDisplay() {
        while (preview.firstChild) {
            preview.removeChild(preview.firstChild);
        }
        const curFiles = input.files;
        if (curFiles.length === 0) {
        } else {
            const list = document.createElement('p');
            preview.appendChild(list);

            for (const file of curFiles) {
                if (validFileType(file)) {
                    const image = document.createElement('img');
                    image.src = URL.createObjectURL(file);

                    list.appendChild(image);
                }
            }
        }
    }
    const fileTypes = [
        "image/apng",
        "image/bmp",
        "image/gif",
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/svg+xml",
        "image/tiff",
        "image/webp",
        "image/x-icon"
    ];
    function validFileType(file) {
        return fileTypes.includes(file.type);
    }

    // Set Amount
    var amount = parseInt(localStorage.getItem('deposit-amount'));
    var total_amount = amount + (amount * 2) / 100;
    $('#deposit-amount').text(amount).next().text(total_amount);

    // Set Image
    $('#QR').attr('src', 'image/' + localStorage.getItem('deposit-image'));

    // Set Address
    $('#Address').text(localStorage.getItem('deposit-address'));

});