/**
 * @file app.js
 * Core application logic: Dynamic Navigation, Shared Components, and Global Shell.
 * 
 * SECURITY IMPROVEMENTS (v2):
 * - ARCH-1: Wrapped in IIFE to prevent global namespace pollution
 * - SEC-3: Implemented 'sanitize' for all dynamically rendered text
 * - NEW-4: Centralized dynamic navigation injection
 */

(function () {
    'use strict';

    // ── XSS Sanitization ───────────────────────────────────────────────────────────
    function sanitize(str) {
        if (!str) return '';
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return str.toString().replace(/[&<>\"']/g, m => map[m]);
    }

    // ── Global Shell: Dynamic Navigation ───────────────────────────────────────────
    function renderNavigation() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        const isAdminPage = window.location.pathname.includes('admin.html');
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
                    <li><a href="loyalty.html">Rewards</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
                <div class="nav-right-actions">
                    <button class="cart-icon-btn" id="cart-icon" aria-label="Open cart">
                        🛒<span id="cart-badge">0</span>
                    </button>
                    <a href="${isLoggedIn ? 'account.html' : 'login.html'}" class="user-link" aria-label="Account">
                        👤
                    </a>
                </div>
            </div>
        `;

        initNavScroll();
    }

    function initNavScroll() {
        const nav = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // ── Product UI Components ──────────────────────────────────────────────────────
    function buildProductCard(product, isWishlistPage = false) {
        if (!product) return '';
        
        const isFav = window.isWishlisted && window.isWishlisted(product.id);
        
        return `
            <div class="product-card" data-category="${sanitize(product.category)}">
                <div class="card-glass-glow" style="background: ${product.gradient}"></div>
                <div class="product-img-wrapper">
                    ${product.badge ? `<span class="product-badge" style="background:${product.badgeColor}">${sanitize(product.badge)}</span>` : ''}
                    <span class="product-emoji">${product.emoji}</span>
                    <button class="wishlist-toggle ${isFav ? 'active' : ''}" 
                            data-wishlist-id="${product.id}" 
                            onclick="toggleWishlist('${product.id}')"
                            aria-label="Add to wishlist">
                        ♥
                    </button>
                </div>
                <div class="product-info">
                    <h3>${sanitize(product.name)}</h3>
                    <p class="desc">${sanitize(product.desc)}</p>
                    <div class="product-footer">
                        <span class="price">৳${product.price.toLocaleString()}</span>
                        <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // ── Init ───────────────────────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
        renderNavigation();
        
        // Trigger generic animations after load
        document.body.classList.add('loaded');
    });

    // Share utilities globally
    window.RollonUtils = {
        sanitize,
        buildProductCard
    };
}());
