(function () {
    'use strict';

    function getOrders() {
        const key = window.ROLLON_CONFIG?.STORAGE_KEYS.ORDERS || 'rollon_orders';
        try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
    }

    function saveOrders(orders) {
        const key = window.ROLLON_CONFIG?.STORAGE_KEYS.ORDERS || 'rollon_orders';
        localStorage.setItem(key, JSON.stringify(orders));
    }

    function renderCartSummary() {
        const cart = window.getCart?.() || [];
        const list = document.getElementById('checkout-cart-items');
        const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
        const delivery = window.ROLLON_CONFIG?.DELIVERY.CHARGE || 0;
        const total = subtotal + delivery;

        list.innerHTML = cart.length
            ? cart.map((i) => `<li>${i.emoji} ${i.name} × ${i.qty} — ৳${(i.price * i.qty).toLocaleString()}</li>`).join('')
            : '<li>Your cart is empty.</li>';

        document.getElementById('checkout-total').textContent = `৳${total.toLocaleString()}`;
        return { cart, total };
    }

    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('checkout-form');
        const status = document.getElementById('checkout-status');
        const summary = renderCartSummary();

        form?.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!summary.cart.length) {
                status.textContent = 'Cannot place an order with an empty cart.';
                status.style.color = '#ff6b6b';
                return;
            }

            const fullName = document.getElementById('full-name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const address = document.getElementById('address').value.trim();
            const paymentMethod = document.getElementById('payment-method').value;
            const session = window.RollonAuth?.getSession();

            if (!fullName || !phone || !address || !paymentMethod) {
                status.textContent = 'Please complete all fields.';
                status.style.color = '#ff6b6b';
                return;
            }

            const orders = getOrders();
            const order = {
                id: `R-${Date.now()}`,
                email: session?.email || 'guest@rollon.local',
                fullName,
                phone,
                address,
                paymentMethod,
                total: summary.total,
                items: summary.cart,
                createdAt: new Date().toISOString()
            };
            orders.push(order);
            saveOrders(orders);
            localStorage.removeItem(window.ROLLON_CONFIG?.STORAGE_KEYS.CART || 'rollon_cart');
            status.textContent = `Order placed successfully. Order ID: ${order.id}`;
            status.style.color = '#00ff9f';
            form.reset();
            renderCartSummary();
        });
    });
}());
