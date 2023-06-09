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

    // On Modal submit Local Storge
    $('.deposit-form').submit(function (e) {
        e.preventDefault();

       localStorage.setItem("deposit-amount", this.children[1].value);
       localStorage.setItem("deposit-method", $(this).data('method'));
       localStorage.setItem("deposit-image", $(this).data('image'));
       localStorage.setItem("deposit-address", $(this).data('address'));

        console.log(this.children[1].value);
        console.log($(this).data('method'));
        console.log($(this).data('image'));
        console.log($(this).data('address'));

        $(location).attr('href', 'deposit-details.html');
    });   
});