(function () {
    'use strict';

    const BOXES = [
        { id: 'mystery-starter-box', name: 'Starter Mystery Box', price: 1999, desc: '1 pipe + 1 accessory + stickers', emoji: '🎁', badge: 'Best for Newcomers' },
        { id: 'mystery-session-box', name: 'Session Mystery Box', price: 3499, desc: 'Premium mix for weekly sessions', emoji: '🔥', badge: 'Most Popular' },
        { id: 'mystery-collector-box', name: 'Collector Mystery Box', price: 5999, desc: 'Limited pieces + premium tray + surprise drop', emoji: '💎', badge: 'Limited Edition' }
    ];

    function render() {
        const wrap = document.querySelector('.mystery-boxes');
        if (!wrap) return;
        wrap.innerHTML = BOXES.map((box) => `
            <article class="glass-card mystery-card">
                <span class="product-badge">${box.badge}</span>
                <h2>${box.emoji} ${box.name}</h2>
                <p>${box.desc}</p>
                <p class="price">৳${box.price.toLocaleString()}</p>
                <button class="cta-button primary" data-mystery-box-id="${box.id}">Buy Mystery Box</button>
            </article>
        `).join('');
    }

    function installBoxProducts() {
        const known = new Set((window.PRODUCTS || []).map((p) => p.id));
        BOXES.forEach((box, idx) => {
            if (!known.has(box.id)) {
                window.PRODUCTS.push({
                    id: box.id,
                    name: box.name,
                    category: 'Mystery Box',
                    desc: box.desc,
                    price: box.price,
                    emoji: box.emoji,
                    gradient: idx % 2 ? 'linear-gradient(135deg, #220a2d, #40144f)' : 'linear-gradient(135deg, #0a2d2d, #154545)',
                    badge: box.badge,
                    badgeColor: '#a020f0'
                });
            }
        });
    }

    document.addEventListener('click', (event) => {
        const btn = event.target.closest('[data-mystery-box-id]');
        if (!btn || !window.addToCart) return;
        window.addToCart(btn.getAttribute('data-mystery-box-id'));
    });

    document.addEventListener('DOMContentLoaded', () => {
        installBoxProducts();
        render();
    });
}());
