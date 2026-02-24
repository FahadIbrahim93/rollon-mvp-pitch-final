(function () {
    'use strict';

    function renderTiers() {
        const wrap = document.getElementById('tiers-grid');
        if (!wrap) return;
        const tiers = window.ROLLON_CONFIG?.LOYALTY_TIERS || {};
        wrap.innerHTML = Object.entries(tiers).map(([name, data]) => `
            <article class="glass-card tier-card">
                <h3 style="color:${data.color}">${name}</h3>
                <p><strong>Multiplier:</strong> ${data.multiplier}x</p>
                <p><strong>Unlock at:</strong> ${data.minPoints} points</p>
            </article>
        `).join('');
    }

    function bindEstimator() {
        const form = document.getElementById('points-estimator');
        const out = document.getElementById('points-result');
        if (!form || !out) return;

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const spend = Number(document.getElementById('spend-amount').value || 0);
            const tierName = document.getElementById('tier-name').value;
            const tier = window.ROLLON_CONFIG?.LOYALTY_TIERS?.[tierName];
            if (!tier || spend <= 0) {
                out.textContent = 'Enter a valid spend and tier.';
                return;
            }
            const points = Math.floor(spend * tier.multiplier);
            out.textContent = `Estimated points earned: ${points}`;
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderTiers();
        bindEstimator();
    });
}());
