(function () {
    'use strict';

    function renderWishlist() {
        const target = document.getElementById('wishlist-grid');
        if (!target) return;
        const ids = window.getWishlist?.() || [];
        const items = (window.PRODUCTS || []).filter((p) => ids.includes(p.id));
        target.innerHTML = items.length
            ? items.map((p) => window.RollonUtils.buildProductCard(p, true)).join('')
            : '<p>Your wishlist is empty.</p>';
    }

    document.addEventListener('DOMContentLoaded', renderWishlist);
    window.addEventListener('wishlistUpdated', renderWishlist);
}());
