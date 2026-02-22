/**
 * @file app.js
 * Main site controller.
 */
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initMobileNav();
});

function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = PRODUCTS.map(p => `
        <div class="product-card">
            <div class="product-info">
                <h3>${p.emoji} ${p.name}</h3>
                <p>${p.desc}</p>
                <div class="price">৳${p.price.toLocaleString()}</div>
                <button onclick="addToCart('${p.id}')" class="cta-button">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('open');
        });
    }
}
