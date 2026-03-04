/**
 * @file products-data.js
 * Central product catalog. Update here to change all product displays site-wide.
 */

const PRODUCTS = [
    {
        id: 'classic-design-grinder',
        name: 'Classic Design Four-Layer 65mm Aluminium Grinder',
        category: 'Grinders',
        desc: 'Premium 4-layer 65mm aluminium grinder with high-quality metal teeth that never dull. Features a strong magnetic cover that stays firm even when upside down. Excellent durability for grinding spices and herbs.',
        price: 2500,
        emoji: '⚙️',
        image: 'assets/products/classic-grinder.jpg',
        gradient: 'linear-gradient(135deg, #1a0a2e, #3a155a)',
        badge: 'Premium',
        badgeColor: '#a020f0'
    },
    {
        id: 'space-case-grinder',
        name: 'Space Case 4-Part 60mm Aluminum Grinder',
        category: 'Grinders',
        desc: 'An investment built to last a lifetime. Features grinding teeth that never dull and a screen that never clogs. Sets itself apart from the competition with superior craftsmanship and durability.',
        price: 3200,
        emoji: '🚀',
        image: 'assets/products/space-case-grinder.jpg',
        gradient: 'linear-gradient(135deg, #0a2d1a, #154d3a)',
        badge: 'Top Seller',
        badgeColor: '#00ff9f'
    },
    {
        id: 'plants-vs-zombies-bong',
        name: 'Silicone Water Bong Plants vs. Zombies',
        category: 'Water Pipes',
        desc: 'Vibrant 8-inch silicone water bong featuring colorful Plants vs. Zombies cartoon design. Heat-resistant and flexible silicone construction. Includes removable clear downstem and matching glass bowl. Unbreakable and portable.',
        price: 3800,
        emoji: '🧟',
        image: 'assets/products/pvz-bong.jpg',
        gradient: 'linear-gradient(135deg, #2d0a0a, #4d1515)',
        badge: 'New Arrival',
        badgeColor: '#ff6b9d'
    },
    {
        id: 'silicone-color-print-pipe',
        name: 'Silicone Colour Print Pipe with Glass Bowl',
        category: 'Pipes',
        desc: 'Durable silicone pipe with vibrant colour print design. Includes glass bowl and protective cap. Easy to clean and maintain. Perfect for travel and daily use.',
        price: 1350,
        emoji: '🎨',
        image: 'assets/products/color-pipe.jpg',
        gradient: 'linear-gradient(135deg, #1a0a2e, #3a155a)',
        badge: 'Popular',
        badgeColor: '#00ffff'
    },
    {
        id: 'premium-water-bong',
        name: 'Premium Silicone Water Bong with Downstem',
        category: 'Water Pipes',
        desc: 'High-quality silicone water bong with detachable components. Features smooth filtration system with included glass downstem and bowl. Built for years of reliable use.',
        price: 4200,
        emoji: '💧',
        image: 'assets/products/water-bong.jpg',
        gradient: 'linear-gradient(135deg, #0a1a2d, #152a4d)',
        badge: 'Best Value',
        badgeColor: '#00ff9f'
    },
    {
        id: 'deluxe-grinder-set',
        name: 'Deluxe 3-Piece Aluminium Grinder Set',
        category: 'Grinders',
        desc: 'Professional-grade 3-piece aluminium grinder set. Includes keif catcher for maximum efficiency. Diamond-cut grinding surface for consistent results. Perfect for regular users.',
        price: 2800,
        emoji: '✨',
        image: 'assets/products/deluxe-grinder.jpg',
        gradient: 'linear-gradient(135deg, #2d200a, #4d3a15)',
        badge: 'Premium',
        badgeColor: '#ff9900'
    },
    {
        id: 'compact-travel-pipe',
        name: 'Compact Travel Pipe Set',
        category: 'Pipes',
        desc: 'Portable silicone pipe designed for travelers. Lightweight, durable, and easy to pack. Includes cleaning brushes and protective carrying case.',
        price: 1200,
        emoji: '🎒',
        image: 'assets/products/travel-pipe.jpg',
        gradient: 'linear-gradient(135deg, #0a2d1a, #154d3a)',
        badge: 'Portable',
        badgeColor: '#88ff00'
    },
    {
        id: 'merchants-choice-box',
        name: 'Merchants Choice Grinder Display',
        category: 'Wholesale',
        desc: 'Professional wholesale display box containing 12 assorted premium grinders. Ideal for retail setups and resellers. Bulk pricing for business customers.',
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
