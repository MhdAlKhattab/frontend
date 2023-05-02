$(document).ready(function () {

    'use strict';

    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();

        // these IDs from the previous steps
        emailjs.sendForm('service_bba79bo', 'forex_template', this)
            .then(function() {
                console.log('SUCCESS!');
            }, function(error) {
                console.log('FAILED...', error);
            });
    });
});