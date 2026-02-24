(function () {
    'use strict';

    const WISHLIST_KEY = window.ROLLON_CONFIG?.STORAGE_KEYS.WISHLIST || 'rollon_wishlist';

    function getWishlist() {
        try {
            const raw = localStorage.getItem(WISHLIST_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    }

    function saveWishlist(items) {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
        window.dispatchEvent(new CustomEvent('wishlistUpdated'));
    }

    function isWishlisted(productId) {
        return getWishlist().includes(productId);
    }

    function toggleWishlist(productId) {
        const items = getWishlist();
        const index = items.indexOf(productId);
        if (index >= 0) items.splice(index, 1);
        else items.push(productId);
        saveWishlist(items);
        return index < 0;
    }

    window.getWishlist = getWishlist;
    window.isWishlisted = isWishlisted;
    window.toggleWishlist = toggleWishlist;
}());
