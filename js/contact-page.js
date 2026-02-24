(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('contact-form');
        const status = document.getElementById('contact-status');
        if (!form || !status) return;

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();

            if (!name || !email || !message) {
                status.textContent = 'Please complete all fields before sending.';
                status.style.color = '#ff6b6b';
                return;
            }

            const ticketId = `T-${Date.now()}`;
            status.textContent = `Thanks ${name}! We received your request. Ticket: ${ticketId}`;
            status.style.color = '#00ff9f';
            form.reset();
        });
    });
}());
