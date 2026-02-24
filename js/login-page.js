(function () {
    'use strict';

    function setStatus(message, isError = false) {
        const el = document.getElementById('auth-status');
        if (!el) return;
        el.textContent = message;
        el.style.color = isError ? '#ff6b6b' : '#00ff9f';
    }

    function getValue(id) {
        return document.getElementById(id)?.value?.trim() || '';
    }

    async function onLoginSubmit(event) {
        event.preventDefault();
        const email = getValue('login-email');
        const password = getValue('login-password');
        if (!email || !password) return setStatus('Email and password are required.', true);
        const result = await window.RollonAuth.login(email, password);
        if (!result.ok) return setStatus(result.error, true);
        window.location.href = 'account.html';
    }

    async function onRegisterSubmit(event) {
        event.preventDefault();
        const payload = {
            name: getValue('register-name'),
            email: getValue('register-email'),
            phone: getValue('register-phone'),
            password: getValue('register-password')
        };
        if (!payload.name || !payload.email || !payload.phone || !payload.password) {
            return setStatus('Please complete all registration fields.', true);
        }
        if (payload.password.length < 8) return setStatus('Password must be at least 8 characters.', true);
        const result = await window.RollonAuth.register(payload);
        if (!result.ok) return setStatus(result.error, true);
        window.location.href = 'account.html';
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('login-form')?.addEventListener('submit', onLoginSubmit);
        document.getElementById('register-form')?.addEventListener('submit', onRegisterSubmit);
    });
}());
