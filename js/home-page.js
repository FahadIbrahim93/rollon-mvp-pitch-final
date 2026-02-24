(function () {
    'use strict';

    function renderFeatured() {
        const target = document.getElementById('featured-grid');
        if (!target || !window.PRODUCTS || !window.RollonUtils) return;
        const featured = PRODUCTS.slice(0, 4);
        target.innerHTML = featured.map((p) => window.RollonUtils.buildProductCard(p)).join('');
    }

    document.addEventListener('DOMContentLoaded', renderFeatured);
}());
