(function () {
    'use strict';

    const USERS_KEY = window.ROLLON_CONFIG?.STORAGE_KEYS.USERS || 'rollon_users';
    const SESSION_KEY = window.ROLLON_CONFIG?.STORAGE_KEYS.SESSION || 'rollon_session';
    const ORDERS_KEY = window.ROLLON_CONFIG?.STORAGE_KEYS.ORDERS || 'rollon_orders';
    const SALT_PREFIX = 'rollon_v1_';

    const ADMIN_EMAIL = window.ROLLON_CONFIG?.ADMIN.FALLBACK_EMAIL || 'admin@rollon.com';

    async function sha256(str) {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    async function hashPassword(password, salt) {
        return sha256(SALT_PREFIX + salt + password);
    }

    function generateSalt() {
        return crypto.getRandomValues(new Uint8Array(16)).reduce((s, b) => s + b.toString(16).padStart(2, '0'), '');
    }

    function generateToken() {
        return [...crypto.getRandomValues(new Uint8Array(24))].map(b => b.toString(36)).join('');
    }

    function getUsers() {
        try { 
            const data = localStorage.getItem(USERS_KEY);
            return data ? JSON.parse(data) : []; 
        } catch (e) { return []; }
    }

    function saveUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    function findUser(email) {
        const users = getUsers();
        return users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    }

    function getSession() {
        try {
            const data = sessionStorage.getItem(SESSION_KEY);
            return data ? JSON.parse(data) : null;
        } catch (e) { return null; }
    }

    function setSession(payload) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload));
    }

    async function register({ name, email, phone, password }) {
        if (findUser(email)) return { ok: false, error: 'User exists.' };
        const salt = generateSalt();
        const hash = await hashPassword(password, salt);
        const user = { email, name, phone, passwordHash: hash, salt, loyaltyPoints: 0, tier: 'Rookie Roller', orderIds: [], joinDate: new Date().toISOString() };
        const users = getUsers();
        users.push(user);
        saveUsers(users);
        setSession({ email, name, isAdmin: false, token: generateToken() });
        return { ok: true };
    }

    async function login(email, password) {
        const user = findUser(email);
        if (!user) return { ok: false, error: 'No account.' };
        const hash = await hashPassword(password, user.salt);
        if (hash !== user.passwordHash) return { ok: false, error: 'Incorrect password.' };
        setSession({ email, name: user.name, isAdmin: false, token: generateToken() });
        return { ok: true };
    }

    function logout() {
        sessionStorage.removeItem(SESSION_KEY);
        window.location.href = 'index.html';
    }

    window.RollonAuth = {
        login, register, logout, getSession,
        isLoggedIn: () => !!getSession(),
        isAdminUser: () => !!(getSession()?.isAdmin)
    };
}());
