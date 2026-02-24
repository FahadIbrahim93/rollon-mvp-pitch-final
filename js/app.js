(function () {
    'use strict';

    function sanitize(str) {
        if (!str) return '';
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return str.toString().replace(/[&<>"']/g, (m) => map[m]);
    }

    function renderNavigation() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        const isLoggedIn = window.RollonAuth?.isLoggedIn();
        const isAdmin = window.RollonAuth?.isAdminUser();

        navbar.innerHTML = `
            <div class="nav-container stacked">
                <div class="logo-row">
                    <a href="index.html" class="logo" aria-label="Rollon' Home">
                        ROLLON<span class="accent">'</span>
                        ${isAdmin ? '<span class="admin-tag">ADMIN</span>' : ''}
                    </a>
                </div>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="products.html">Shop</a></li>
                    <li><a href="wishlist.html">Wishlist</a></li>
                    <li><a href="loyalty.html">Rewards</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
                <div class="nav-right-actions">
                    <a href="checkout.html" class="user-link" aria-label="Checkout">🛒<span id="cart-badge">0</span></a>
                    <a href="${isLoggedIn ? 'account.html' : 'login.html'}" class="user-link" aria-label="Account">👤</a>
                </div>
            </div>
        `;

        initNavScroll();
        updateCartBadge();
    }

    function updateCartBadge() {
        const badge = document.getElementById('cart-badge');
        if (!badge || !window.getCart) return;
        const count = window.getCart().reduce((sum, i) => sum + i.qty, 0);
        badge.textContent = String(count);
    }

    function initNavScroll() {
        const nav = document.querySelector('.navbar');
        if (!nav) return;
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    function buildProductCard(product) {
        if (!product) return '';
        const isFav = window.isWishlisted && window.isWishlisted(product.id);

        return `
            <div class="product-card" data-category="${sanitize(product.category)}">
                <div class="card-glass-glow" style="background: ${sanitize(product.gradient)}"></div>
                <div class="product-img-wrapper">
                    ${product.badge ? `<span class="product-badge" style="background:${sanitize(product.badgeColor)}">${sanitize(product.badge)}</span>` : ''}
                    <span class="product-emoji">${product.emoji}</span>
                    <button class="wishlist-toggle ${isFav ? 'active' : ''}" data-wishlist-id="${product.id}" aria-label="Toggle wishlist">♥</button>
                </div>
                <div class="product-info">
                    <h3>${sanitize(product.name)}</h3>
                    <p class="desc">${sanitize(product.desc)}</p>
                    <div class="product-footer">
                        <span class="price">৳${product.price.toLocaleString()}</span>
                        <button class="add-to-cart-btn" data-add-to-cart-id="${product.id}">Buy Now</button>
                    </div>
                </div>
            </div>
        `;
    }

    function attachGlobalHandlers() {
        document.addEventListener('click', (event) => {
            const addBtn = event.target.closest('[data-add-to-cart-id]');
            if (addBtn && window.addToCart) {
                window.addToCart(addBtn.getAttribute('data-add-to-cart-id'));
                return;
            }

            const wishBtn = event.target.closest('[data-wishlist-id]');
            if (wishBtn && window.toggleWishlist) {
                const id = wishBtn.getAttribute('data-wishlist-id');
                const added = window.toggleWishlist(id);
                wishBtn.classList.toggle('active', added);
            }
        });

        window.addEventListener('cartUpdated', updateCartBadge);
        window.addEventListener('storage', updateCartBadge);
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderNavigation();
        attachGlobalHandlers();
        document.body.classList.add('loaded');
    });

    window.RollonUtils = { sanitize, buildProductCard, updateCartBadge };
}());
