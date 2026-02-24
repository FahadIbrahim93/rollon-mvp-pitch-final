(function () {
    'use strict';

    function getOrders() {
        const key = window.ROLLON_CONFIG?.STORAGE_KEYS.ORDERS || 'rollon_orders';
        try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const session = window.RollonAuth?.getSession();
        if (!session) {
            window.location.href = 'login.html';
            return;
        }

        document.getElementById('account-name').textContent = session.name || session.email;
        document.getElementById('account-email').textContent = session.email;

        const orders = getOrders().filter((o) => o.email === session.email);
        const list = document.getElementById('orders-list');
        if (!orders.length) {
            list.innerHTML = '<li>No orders yet.</li>';
        } else {
            list.innerHTML = orders.map((o) => `<li>#${o.id} — ৳${o.total.toLocaleString()} — ${o.createdAt}</li>`).join('');
        }

        document.getElementById('logout-btn')?.addEventListener('click', () => window.RollonAuth.logout());
    });
}());
