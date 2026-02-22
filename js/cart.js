(function () {
    'use strict';

    const CART_KEY = window.ROLLON_CONFIG?.STORAGE_KEYS.CART || 'rollon_cart';

    function getCart() {
        try {
            const data = localStorage.getItem(CART_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) { return []; }
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    }

    function addToCart(productId) {
        const cart = getCart();
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;
        
        const existing = cart.find(i => i.id === productId);
        if (existing) { existing.qty++; } 
        else { cart.push({ id: productId, qty: 1, name: product.name, price: product.price, emoji: product.emoji }); }
        
        saveCart(cart);
        alert(`✅ ${product.name} added to cart!`);
    }

    window.addToCart = addToCart;
    window.getCart = getCart;
}());
