$(document).ready(function () {

    'use strict';

    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();

        // these IDs from the previous steps
        emailjs.sendForm('service_0xfumsf', 'template_tbskdxe', this)
            .then(function() {
                console.log('SUCCESS!');
                location.reload();
            }, function(error) {
                console.log('FAILED...', error);
            });
    });
});