const test = require('node:test');
const assert = require('node:assert/strict');
const { PRODUCTS } = require('../js/products-data.js');

test('products catalog has required fields', () => {
    assert.ok(Array.isArray(PRODUCTS));
    assert.ok(PRODUCTS.length > 0);

    for (const product of PRODUCTS) {
        assert.equal(typeof product.id, 'string');
        assert.equal(typeof product.name, 'string');
        assert.equal(typeof product.price, 'number');
        assert.ok(product.price > 0);
    }
});
