(function () {
    'use strict';

    function renderProducts() {
        const grid = document.getElementById('product-grid');
        if (!grid || !window.PRODUCTS || !window.RollonUtils) return;
        grid.innerHTML = PRODUCTS.map((p) => RollonUtils.buildProductCard(p)).join('');
    }

    document.addEventListener('DOMContentLoaded', renderProducts);
}());
