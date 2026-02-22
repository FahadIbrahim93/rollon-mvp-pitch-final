/**
 * @file cart.js
 * Persistent shopping cart backed by localStorage.
 */
const CART_KEY = 'rollon_cart';

function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch { return []; }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId, qty = 1) {
    const cart = getCart();
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const existing = cart.find(i => i.id === productId);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id: productId, qty, name: product.name, price: product.price, emoji: product.emoji });
    }
    saveCart(cart);
}
