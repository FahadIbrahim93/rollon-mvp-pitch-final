/**
 * @file config.js
 * Application-wide configuration and environmental constants.
 * This file centralizes all business rules and identifiers.
 */

(function () {
    'use strict';

    const CONFIG = {
        APP_NAME: "Rollon'",
        STORAGE_KEYS: {
            USERS: 'rollon_users_v2',
            SESSION: 'rollon_session_v2',
            CART: 'rollon_cart_v2',
            ORDERS: 'rollon_orders_v2',
            WISHLIST: 'rollon_wishlist_v2'
        },
        DELIVERY: {
            CHARGE: 100, // BDT
            ESTIMATED_TIME: "24-48 Hours",
            REGION: "Dhaka Metro"
        },
        LOYALTY_TIERS: {
            'Rookie Roller': { multiplier: 1, minPoints: 0, color: '#888' },
            'Seasoned Smoker': { multiplier: 1.5, minPoints: 500, color: '#cd7f32' },
            'Stash Master': { multiplier: 2, minPoints: 2000, color: '#ffd700' },
            'Paaka Ustad': { multiplier: 3, minPoints: 5000, color: '#e5e4e2' }
        },
        PROMO_CODES: {
            'ROLLON10': { type: 'percent', value: 10, label: '10% Launch Discount' },
            'DHAKAFREE': { type: 'flat', value: 100, label: 'Free Delivery' }
        },
        ADMIN: {
            FALLBACK_EMAIL: 'admin@rollon.com',
            USE_SERVER_AUTH: false // Set true once backend is integrated
        }
    };

    // Make immutable
    Object.freeze(CONFIG);
    window.ROLLON_CONFIG = CONFIG;
}());
