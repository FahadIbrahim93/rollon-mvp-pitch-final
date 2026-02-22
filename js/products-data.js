/**
 * @file products-data.js
 * Central product catalog. Update here to change all product displays site-wide.
 */

const PRODUCTS = [
    {
        id: 'strawberry-dream-bong',
        name: 'Strawberry Dream Silicone Bong',
        category: 'Water Pipes',
        desc: '10-inch heat-resistant medical-grade silicone bong with vibrant strawberry print. Durable and travel-friendly.',
        price: 3500,
        emoji: '🍓',
        image: 'assets/products/strawberry-bong.jpg',
        gradient: 'linear-gradient(135deg, #2d0a0a, #4d1515)',
        badge: 'Top Seller',
        badgeColor: '#ff0055'
    },
    {
        id: 'street-viper-bong',
        name: 'Street Viper Graffiti Bong',
        category: 'Water Pipes',
        desc: 'Matte-finish black silicone bong featuring custom shark and street-art patterns. High-impact durability.',
        price: 3800,
        emoji: '🦈',
        image: 'assets/products/shark-bong.jpg',
        gradient: 'linear-gradient(135deg, #0a0a1a, #15153a)',
        badge: 'New Arrival',
        badgeColor: '#00ccff'
    },
    {
        id: 'quantum-eye-grinder',
        name: 'Quantum Eye 4-Piece Grinder',
        category: 'Grinders',
        desc: 'Heavy-duty 4-piece alloy grinder with trippy UFO eye art. Diamond-cut teeth for effortless grinding.',
        price: 1800,
        emoji: '👁️',
        image: 'assets/products/eye-grinder.jpg',
        gradient: 'linear-gradient(135deg, #1a0a2e, #3a155a)',
        badge: 'Premium',
        badgeColor: '#df00ff'
    },
    {
        id: 'neon-hive-set',
        name: 'Neon Hive 3-Piece Session Set',
        category: 'Water Pipes',
        desc: 'Complete matching set including Honeycomb silicone bong, rolling tray, and 4-piece grinder. Best value pack.',
        price: 5500,
        emoji: '🍯',
        image: 'assets/products/honeycomb-set.jpg',
        gradient: 'linear-gradient(135deg, #0a2d1a, #154d3a)',
        badge: 'Best Value',
        badgeColor: '#00ff9f'
    },
    {
        id: 'pickle-rick-pipes',
        name: 'Dimension C-137 Glass Pipe Collection',
        category: 'Pipes',
        desc: 'Exclusive hand-crafted glass pipes featuring various Rick & Morty character designs. Collectors edition.',
        price: 2200,
        emoji: '🧪',
        image: 'assets/products/rick-morty-pipes.jpg',
        gradient: 'linear-gradient(135deg, #1a2e0a, #3a5a15)',
        badge: 'Limited',
        badgeColor: '#88ff00'
    },
    {
        id: 'raw-classic-tray',
        name: 'RAW Classic Organic Tray',
        category: 'Accessories',
        desc: 'Official RAW metal rolling tray. Non-stick surface with high-walled design for the perfect roll.',
        price: 1200,
        emoji: '📋',
        image: 'assets/products/raw-tray.jpg',
        gradient: 'linear-gradient(135deg, #2d200a, #4d3a15)',
        badge: 'Authentic',
        badgeColor: '#ff9900'
    },
    {
        id: 'zion-guardian-ashtray',
        name: 'Zion Guardian Rasta Ashtray',
        category: 'Accessories',
        desc: 'Hand-painted resin ashtray featuring a classic Rasta figure. Heavy base for stability and style.',
        price: 1500,
        emoji: '🌿',
        image: 'assets/products/rasta-ashtray.jpg',
        gradient: 'linear-gradient(135deg, #2d0a0a, #154d15)',
        badge: 'Handcrafted',
        badgeColor: '#00cc00'
    },
    {
        id: 'merchants-choice-box',
        name: 'Merchants Choice Grinder Display',
        category: 'Grinders',
        desc: 'Professional wholesale display box containing 12 assorted premium grinders. Ideal for retail setups.',
        price: 9500,
        emoji: '📦',
        image: 'assets/products/grinder-display.jpg',
        gradient: 'linear-gradient(135deg, #0a0a0a, #222222)',
        badge: 'Wholesale',
        badgeColor: '#ffffff'
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PRODUCTS };
}
